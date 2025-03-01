
import { serve } from "https://deno.land/std@0.177.1/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import Stripe from "https://esm.sh/stripe@12.1.1?target=deno";
import { corsHeaders } from "../_shared/cors.ts";

// Initialize Stripe with the webhook secret
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Webhook handler
serve(async (req) => {
  console.log("Webhook request received");
  
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the signature from the headers
    const signature = req.headers.get('stripe-signature');
    
    if (!signature) {
      console.error("No Stripe signature in request");
      return new Response(
        JSON.stringify({ error: 'No Stripe signature found' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get raw body
    const body = await req.text();
    
    // Log non-sensitive parts of the request for debugging
    console.log("Webhook signature present:", !!signature);
    console.log("Body length:", body.length);
    
    // Verify the event using the webhook secret and signature
    let event;
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(
          JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    } else {
      // If no webhook secret is configured, just parse the event
      try {
        event = JSON.parse(body);
        console.warn("No webhook secret configured, skipping signature verification!");
      } catch (err) {
        console.error(`Error parsing webhook body: ${err.message}`);
        return new Response(
          JSON.stringify({ error: 'Invalid webhook payload' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Log the event type
    console.log(`Processing webhook event: ${event.type}`);

    // Store the event in Supabase for auditability
    await supabase
      .from('stripe_webhook_events')
      .insert({
        id: event.id,
        type: event.type,
        data: event.data,
        processed_at: new Date().toISOString(),
      });

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log("Checkout session completed:", session.id);
        
        // Get the customer email
        const email = session.customer_details?.email || 'unknown@example.com';
        const userId = session.client_reference_id || null;
        
        // Record the payment in the database
        await supabase
          .from('iphone_payments')
          .insert({
            user_id: userId,
            product_name: session.metadata?.productName || 'Checkout',
            email: email,
            amount: session.amount_total / 100, // Convert cents to dollars
            currency: session.currency,
            payment_status: 'completed',
            stripe_payment_id: session.id,
          });

        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log("Payment intent succeeded:", paymentIntent.id);
        
        // If there's a relevant payment record, update it
        if (paymentIntent.metadata?.userId) {
          const { error } = await supabase
            .from('orders')
            .update({ 
              payment_status: 'succeeded',
              status: 'processing'
            })
            .eq('payment_intent_id', paymentIntent.id);
            
          if (error) console.error("Error updating order:", error);
        }
        
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log("Payment intent failed:", paymentIntent.id);
        
        // If there's a relevant payment record, update it
        if (paymentIntent.metadata?.userId) {
          const { error } = await supabase
            .from('orders')
            .update({ 
              payment_status: 'failed',
              status: 'cancelled'
            })
            .eq('payment_intent_id', paymentIntent.id);
            
          if (error) console.error("Error updating order:", error);
        }
        
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a successful response to Stripe
    return new Response(
      JSON.stringify({ received: true }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } 
  catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
