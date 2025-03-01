
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

  // For direct browser access, show a simple message instead of trying to process as webhook
  if (req.method === "GET") {
    return new Response(
      JSON.stringify({ 
        message: "This is a Stripe webhook endpoint. Please use POST requests with proper Stripe signatures." 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }

  try {
    // Only try to parse body for POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed. This endpoint only accepts POST requests." }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if request has a body
    const body = await req.text();
    if (!body || body.trim() === '') {
      return new Response(
        JSON.stringify({ error: "Empty request body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

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
      try {
        console.log("No signature or webhook secret provided, trying to parse body directly");
        webhookEvent = JSON.parse(body);
      } catch (parseError) {
        console.error(`JSON parse error: ${parseError.message}`);
        return new Response(
          JSON.stringify({ error: `Invalid JSON: ${parseError.message}` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    console.log(`Processing webhook event: ${webhookEvent.type}`);
    
    // Handle specific webhook events
    switch(webhookEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(webhookEvent.data.object);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(webhookEvent.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(webhookEvent.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${webhookEvent.type}`);
    }
    
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

// Handler for checkout.session.completed event
async function handleCheckoutSessionCompleted(session) {
  console.log("Processing checkout.session.completed event:", session.id);
  
  try {
    // Make sure this is for our specific product
    const productId = session.metadata?.productId;
    const userId = session.metadata?.userId || session.client_reference_id;
    
    // Store payment record for the purchase
    const { error: paymentError } = await supabase
      .from("payments")
      .insert({
        amount: session.amount_total ? session.amount_total / 100 : 0,
        name: session.metadata?.productName || "Product",
        email: session.customer_details?.email || "",
        payment_status: "paid",
        payment_intent_id: session.payment_intent,
        product_id: productId ? parseInt(productId) : 101, // Default to iPhone 14 product ID
        user_id: userId || "",
      });

    if (paymentError) {
      console.error("Error storing payment record:", paymentError);
      throw new Error(`Error storing payment record: ${paymentError.message}`);
    }
    
    console.log("Payment record created successfully for session", session.id);
  } catch (error) {
    console.error("Error handling checkout.session.completed:", error);
  }
}

// Handler for payment_intent.succeeded event
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log("Processing payment_intent.succeeded event:", paymentIntent.id);
  
  try {
    // Update payment status if it exists
    const { data, error } = await supabase
      .from("payments")
      .update({ payment_status: "succeeded" })
      .eq("payment_intent_id", paymentIntent.id);
    
    if (error) {
      console.error("Error updating payment record:", error);
    } else {
      console.log("Payment record updated successfully");
    }
  } catch (error) {
    console.error("Error handling payment_intent.succeeded:", error);
  }
}

// Handler for payment_intent.payment_failed event
async function handlePaymentIntentFailed(paymentIntent) {
  console.log("Processing payment_intent.payment_failed event:", paymentIntent.id);
  
  try {
    // Update payment status if it exists
    const { data, error } = await supabase
      .from("payments")
      .update({ 
        payment_status: "failed",
        error_message: paymentIntent.last_payment_error?.message || "Payment failed"
      })
      .eq("payment_intent_id", paymentIntent.id);
    
    if (error) {
      console.error("Error updating payment record:", error);
    } else {
      console.log("Payment record updated successfully");
    }
  } catch (error) {
    console.error("Error handling payment_intent.payment_failed:", error);
  }
}
