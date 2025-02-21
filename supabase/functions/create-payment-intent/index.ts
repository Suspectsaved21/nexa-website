
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

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
    console.log('Starting create-payment-intent function');
    const { items } = await req.json();
    
    if (!items || !Array.isArray(items)) {
      console.error('Invalid items array received:', items);
      throw new Error('Invalid items data');
    }

    console.log('Processing items:', JSON.stringify(items, null, 2));

    // Create line items for Stripe checkout
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
          description: `High-quality ${item.name.toLowerCase()}`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    console.log('Created line items:', JSON.stringify(lineItems, null, 2));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${req.headers.get('origin')}/checkout?success=true`,
      cancel_url: `${req.headers.get('origin')}/checkout?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
      metadata: {
        order_id: `order_${Date.now()}`,
      },
    });

    console.log('Created checkout session:', session.id);

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in create-payment-intent:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create checkout session'
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
