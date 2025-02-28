
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

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the raw body as text
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    
    // Parse the event if no signature verification is required
    const event = JSON.parse(body);
    
    console.log(`Webhook received: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log("Processing successful checkout:", session.id);
        
        // Get customer email
        const email = session.customer_details?.email || "unknown";
        
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
        
        console.log("Payment record:", paymentRecord);
        break;
      
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful`);
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(`Webhook error: ${error.message}`);
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400 
    });
  }
});
