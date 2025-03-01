
import { serve } from "https://deno.land/std@0.177.1/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.1.1?target=deno";

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
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    if (!Deno.env.get('STRIPE_SECRET_KEY')) {
      console.error('STRIPE_SECRET_KEY is not set in the environment variables');
      return new Response(
        JSON.stringify({ error: 'Stripe API key is not configured' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    const { items, priceId, returnUrl } = await req.json();
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid items');
    }

    // If a specific price ID is provided, create a checkout session with just that product
    if (priceId) {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price: priceId, // Using the price ID directly
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${returnUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${returnUrl}`,
        });

        return new Response(
          JSON.stringify({ url: session.url }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      } catch (error) {
        console.error('Stripe Error:', error);
        return new Response(
          JSON.stringify({ error: `Stripe Error: ${error.message}` }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
      }
    } else {
      // Create line items for Stripe from cart items
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : undefined,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      }));

      // Create checkout session
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: `${returnUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${returnUrl}`,
        });

        return new Response(
          JSON.stringify({ url: session.url }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      } catch (error) {
        console.error('Stripe Error:', error);
        return new Response(
          JSON.stringify({ error: `Stripe Error: ${error.message}` }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
      }
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
