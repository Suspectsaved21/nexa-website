
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

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const requestData = await req.json();
    const { priceId, items, returnUrl } = requestData;
    
    if (!returnUrl) {
      throw new Error('Return URL is required');
    }

    let session;
    
    if (priceId) {
      // If a price ID is provided directly, use that
      console.log(`Creating checkout session with product ID: ${priceId}`);
      
      try {
        // For product IDs (starting with prod_), we need to get the associated price first
        if (priceId.startsWith('prod_')) {
          // Get prices for this product
          const prices = await stripe.prices.list({
            product: priceId,
            active: true,
            limit: 1
          });
          
          if (prices.data.length === 0) {
            throw new Error(`No active prices found for product: ${priceId}`);
          }
          
          const actualPriceId = prices.data[0].id;
          console.log(`Found price ID ${actualPriceId} for product ${priceId}`);
          
          session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price: actualPriceId,
                quantity: 1,
              }
            ],
            mode: 'payment',
            success_url: `${returnUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${returnUrl}`,
          });
        } else {
          // It's already a price ID
          session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price: priceId,
                quantity: 1,
              }
            ],
            mode: 'payment',
            success_url: `${returnUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${returnUrl}`,
          });
        }
      } catch (e) {
        console.error('Stripe Error:', e);
        // Fall back to cart items if there's an issue with the price ID
        if (items && Array.isArray(items) && items.length > 0) {
          console.log('Falling back to cart items for checkout');
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

          session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${returnUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${returnUrl}`,
          });
        } else {
          throw e; // Re-throw if we can't use cart items either
        }
      }
    } else if (items && Array.isArray(items) && items.length > 0) {
      // Create line items from cart items
      console.log(`Creating checkout session with ${items.length} items`);
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

      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${returnUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${returnUrl}`,
      });
    } else {
      throw new Error('Either priceId or items array is required');
    }

    console.log('Checkout session created:', session.id);
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
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
