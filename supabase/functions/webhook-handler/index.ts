
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

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    console.log("Received webhook with signature:", signature);
    
    let webhookEvent;
    
    // Get the webhook secret from environment variables
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (signature && webhookSecret) {
      // If we have both signature and secret, verify the signature
      try {
        webhookEvent = stripe.webhooks.constructEvent(
          body,
          signature,
          webhookSecret
        );
        console.log("Signature verified successfully");
      } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(
          JSON.stringify({ error: `Signature verification failed: ${err.message}` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } else {
      // For testing, if no signature or secret, parse the body directly
      console.log("No signature or webhook secret provided, parsing body directly");
      webhookEvent = JSON.parse(body);
    }

    console.log(`Processing webhook event: ${webhookEvent.type}`);
    
    // Store the event in the database for auditing purposes
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
      
      // Make sure this is for our specific product
      const productId = session.metadata?.productId;
      
      // Store payment record for the purchase
      const { error: paymentError } = await supabase
        .from("payments")
        .insert({
          amount: session.amount_total ? session.amount_total / 100 : 0,
          name: session.metadata?.productName || "iPhone 14",
          email: session.customer_details?.email || "",
          payment_status: "paid",
          payment_intent_id: session.payment_intent,
          product_id: productId ? parseInt(productId) : 101, // Default to iPhone 14 product ID
        });

      if (paymentError) {
        console.error("Error storing payment record:", paymentError);
        throw new Error(`Error storing payment record: ${paymentError.message}`);
      }
      
      console.log("Payment record created successfully");
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return new Response(
      JSON.stringify({ error: `Webhook error: ${err.message}` }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
