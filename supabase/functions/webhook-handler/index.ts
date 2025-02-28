
import { serve } from "https://deno.land/std@0.177.1/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.1.1?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("Missing Stripe signature");
    return new Response(JSON.stringify({ error: "Missing stripe signature" }), {
      status: 400,
    });
  }

  try {
    const body = await req.text();
    
    // Store the raw webhook event in the database
    const webhookEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    console.log(`Received webhook event: ${webhookEvent.type}`);
    
    // Store the event in the database
    const { error: storeError } = await supabase
      .from("stripe_webhook_events")
      .insert({
        id: webhookEvent.id,
        type: webhookEvent.type,
        data: webhookEvent.data.object,
      });

    if (storeError) {
      console.error("Error storing webhook event:", storeError);
      throw new Error(`Error storing webhook event: ${storeError.message}`);
    }

    // Process payment-related events
    if (webhookEvent.type === "checkout.session.completed") {
      const session = webhookEvent.data.object;
      
      // Store payment record for the iPhone purchase
      const { error: paymentError } = await supabase
        .from("iphone_payments")
        .insert({
          amount: session.amount_total ? session.amount_total / 100 : 0,
          product_name: "iPhone 14", // Default to iPhone 14 as that's our specific product
          email: session.customer_details?.email || "",
          payment_status: "paid",
          stripe_payment_id: session.payment_intent,
          user_id: session.client_reference_id,
        });

      if (paymentError) {
        console.error("Error storing payment record:", paymentError);
        throw new Error(`Error storing payment record: ${paymentError.message}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return new Response(
      JSON.stringify({ error: `Webhook error: ${err.message}` }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
