
import { serve } from "https://deno.land/std@0.177.1/http/server.ts";
import { stripe } from "../_shared/stripe.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const handler = async (req: Request) => {
  try {
    const signature = req.headers.get("stripe-signature")!;
    const body = await req.text();
    
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);

    console.log('Processing webhook event:', event.type);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Check if event was already processed
    const { data: existingEvent } = await supabaseClient
      .from('stripe_webhook_events')
      .select()
      .eq('id', event.id)
      .single();

    if (existingEvent) {
      console.log('Event already processed:', event.id);
      return new Response("Event already processed", { status: 200 });
    }

    // Store the webhook event
    await supabaseClient
      .from('stripe_webhook_events')
      .insert([{
        id: event.id,
        type: event.type,
        data: event.data.object
      }]);

    // Handle specific events
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('Payment succeeded for payment intent:', paymentIntent.id);
      
      // Update order status
      const { error: updateError } = await supabaseClient
        .from('orders')
        .update({ 
          status: 'completed', 
          payment_status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('payment_intent_id', paymentIntent.id);

      if (updateError) {
        console.error('Error updating order:', updateError);
        throw updateError;
      }

      console.log('Successfully updated order status for payment intent:', paymentIntent.id);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }
};

serve(handler);
