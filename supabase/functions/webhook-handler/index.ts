
import { serve } from "https://deno.land/std@0.177.1/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.1.1?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// Initialize Stripe
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Webhook secret for verifying the event
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  
  if (!signature) {
    console.error("Webhook Error: No Stripe signature included");
    return new Response("Webhook Error: No Stripe signature included", { status: 400 });
  }

  try {
    // Get the raw body as text
    const body = await req.text();
    
    let event;
    
    // Verify the event with the signature
    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
      } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
      }
    } else {
      // If no webhook secret is configured, parse the event without verification
      event = JSON.parse(body);
      console.warn("Webhook received without signature verification");
    }

    console.log(`Webhook received: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await handleCheckoutSessionCompleted(session);
        break;
      
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful`);
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(`Webhook error: ${error.message}`);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
});

async function handleCheckoutSessionCompleted(session) {
  try {
    console.log("Processing successful checkout:", session.id);
    
    // Get customer email
    const email = session.customer_details?.email || "unknown";
    
    // Get payment details
    const paymentIntent = session.payment_intent 
      ? await stripe.paymentIntents.retrieve(session.payment_intent)
      : null;

    // Prepare payment record
    const paymentRecord = {
      id: session.id,
      user_id: session.client_reference_id || "anonymous",
      product_name: session.metadata?.product_name || "Product Purchase",
      email: email,
      amount: session.amount_total / 100, // Convert from cents to dollars
      currency: session.currency,
      payment_status: session.payment_status,
      stripe_payment_id: session.payment_intent || "",
      created_at: new Date().toISOString(),
    };
    
    console.log("Saving payment record:", paymentRecord);
    
    // Store payment information in the database
    const { data, error } = await supabase
      .from('payments')
      .insert([paymentRecord]);
      
    if (error) {
      console.error("Error saving payment record:", error);
      throw error;
    }
    
    console.log("Payment record saved successfully:", data);
    
  } catch (error) {
    console.error("Error processing checkout completion:", error);
    throw error;
  }
}
