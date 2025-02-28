
import { serve } from "https://deno.land/std@0.177.1/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.1.1?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  
  if (!stripeSecret) {
    console.error('Missing Stripe secret key');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  });

  // Initialize Supabase client
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const signature = req.headers.get('stripe-signature');
    let event;

    if (webhookSecret && signature) {
      // Verify webhook signature if secret is available
      const body = await req.text();
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log(`✅ Webhook signature verified for ${event.type}`);
    } else {
      // If no webhook secret, parse the event directly
      const payload = await req.json();
      event = payload;
      console.log('⚠️ Webhook signature not verified');
    }

    // Check for event duplication
    const { data: existingEvent } = await supabase
      .from('stripe_webhook_events')
      .select()
      .eq('id', event.id)
      .single();

    if (existingEvent) {
      console.log(`Event ${event.id} already processed`);
      return new Response(JSON.stringify({ received: true, processed: false, reason: 'duplicate' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Store the webhook event
    await supabase
      .from('stripe_webhook_events')
      .insert([{
        id: event.id,
        type: event.type,
        data: event.data.object
      }]);

    console.log(`Processing event type: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log(`Checkout session completed: ${session.id}`);
        
        // Update payment record
        if (session.payment_intent) {
          const { error } = await supabase
            .from('iphone_payments')
            .update({ 
              payment_status: 'completed',
              stripe_payment_id: session.payment_intent
            })
            .eq('stripe_payment_id', session.payment_intent);
          
          if (error) {
            console.error('Error updating payment record:', error);
          } else {
            console.log(`Updated payment record for intent: ${session.payment_intent}`);
          }
        }
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
        
        // Update payment status
        const { error } = await supabase
          .from('iphone_payments')
          .update({ payment_status: 'completed' })
          .eq('stripe_payment_id', paymentIntent.id);
        
        if (error) {
          console.error('Error updating payment record:', error);
        } else {
          console.log(`Updated payment record for intent: ${paymentIntent.id}`);
        }
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log(`Payment failed: ${paymentIntent.id}, ${paymentIntent.last_payment_error?.message}`);
        
        // Update payment status to failed
        const { error } = await supabase
          .from('iphone_payments')
          .update({ 
            payment_status: 'failed',
            stripe_payment_id: paymentIntent.id
          })
          .eq('stripe_payment_id', paymentIntent.id);
        
        if (error) {
          console.error('Error updating payment record:', error);
        }
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
