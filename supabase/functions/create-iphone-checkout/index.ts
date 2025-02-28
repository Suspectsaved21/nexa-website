
import { serve } from "https://deno.land/std@0.177.1/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.1.1?target=deno";

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
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const { priceId, customerName, customerEmail, userId } = await req.json();
    
    if (!priceId || !customerName || !customerEmail) {
      throw new Error('Missing required fields');
    }

    console.log(`Creating checkout session for iPhone 14 product: ${priceId}`);

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'iPhone 14',
              description: 'Latest iPhone 14 model',
            },
            unit_amount: 99900, // $999.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/iphone-payment/success?session_id={CHECKOUT_SESSION.ID}&payment_intent={CHECKOUT_SESSION.PAYMENT_INTENT}`,
      cancel_url: `${req.headers.get('origin')}/iphone-payment/cancel`,
      customer_email: customerEmail,
      client_reference_id: userId || undefined,
      metadata: {
        customer_name: customerName,
      },
    });

    console.log(`Checkout session created with ID: ${session.id}`);

    return new Response(
      JSON.stringify({
        url: session.url,
        sessionId: session.id,
        paymentIntentId: session.payment_intent,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      }
    );
  }
});
