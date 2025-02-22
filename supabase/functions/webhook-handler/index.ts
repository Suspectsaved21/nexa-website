
import { serve } from "https://deno.fresh.runtime.dev";
import { stripe } from "../_shared/stripe.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const handler = async (req: Request) => {
  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response("No signature provided", { status: 400 });
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Check if we've already processed this event
    const { data: existingEvent } = await supabaseClient
      .from('stripe_webhook_events')
      .select()
      .eq('id', event.id)
      .single();

    if (existingEvent) {
      return new Response("Event already processed", { status: 200 });
    }

    // Store the event
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
      
      // Update order status
      await supabaseClient
        .from('orders')
        .update({ status: 'completed', payment_status: 'paid' })
        .eq('payment_intent_id', paymentIntent.id);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }
};

serve(handler);
