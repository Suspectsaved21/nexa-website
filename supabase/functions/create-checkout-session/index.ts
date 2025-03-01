import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.1.1?target=deno";
import { corsHeaders } from "../_shared/cors.ts";

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

console.log("Hello from create-checkout-session function!");

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Make sure we have a Stripe key
    if (!stripeSecretKey) {
      console.error("Missing STRIPE_SECRET_KEY");
      return new Response(
        JSON.stringify({ error: 'Stripe secret key not configured' }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const body = await req.json();
    const { priceId, returnUrl, cancelUrl, items } = body;

    console.log("Request body:", { priceId, returnUrl, items });

    // Validate that we have the required data
    if (!returnUrl) {
      return new Response(
        JSON.stringify({ error: 'Return URL is required' }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Extract origin from request for absolute URLs if needed
    const url = new URL(req.url);
    const origin = url.origin;
    
    // Ensure returnUrl and cancelUrl are absolute
    // If they already start with http/https, keep them as is
    // Otherwise, prepend the origin to make them absolute
    const absoluteReturnUrl = returnUrl.startsWith('http') ? returnUrl : `${origin}${returnUrl.startsWith('/') ? returnUrl : `/${returnUrl}`}`;
    const absoluteCancelUrl = cancelUrl ? 
      (cancelUrl.startsWith('http') ? cancelUrl : `${origin}${cancelUrl.startsWith('/') ? cancelUrl : `/${cancelUrl}`}`) : 
      absoluteReturnUrl;

    console.log("Using absolute URLs:", { absoluteReturnUrl, absoluteCancelUrl });

    let sessionParams;

    // Try to use priceId first if provided
    if (priceId) {
      try {
        // Check if it's a product ID (starts with 'prod_')
        if (priceId.startsWith('prod_')) {
          // If it's a product ID, fetch the prices for this product
          const prices = await stripe.prices.list({
            product: priceId,
            active: true,
            limit: 1,
          });

          if (prices.data.length > 0) {
            // Use the first price for this product
            sessionParams = {
              mode: 'payment',
              success_url: absoluteReturnUrl,
              cancel_url: absoluteCancelUrl,
              line_items: [
                {
                  price: prices.data[0].id,
                  quantity: 1,
                },
              ],
            };
          } else {
            throw new Error(`No active prices found for product: ${priceId}`);
          }
        } else {
          // If it's already a price ID (starts with 'price_')
          sessionParams = {
            mode: 'payment',
            success_url: absoluteReturnUrl,
            cancel_url: absoluteCancelUrl,
            line_items: [
              {
                price: priceId,
                quantity: 1,
              },
            ],
          };
        }
      } catch (error) {
        console.error("Error with provided priceId:", error);
        // Fall back to using items array if priceId fails
        if (!items || items.length === 0) {
          return new Response(
            JSON.stringify({ 
              error: `Price ID invalid and no items provided: ${error.message}` 
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }
      }
    }

    // Fall back to using items if no valid priceId or if priceId processing failed
    if (!sessionParams && items && items.length > 0) {
      sessionParams = {
        mode: 'payment',
        success_url: absoluteReturnUrl,
        cancel_url: absoluteCancelUrl,
        line_items: items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: item.image ? [item.image] : undefined,
            },
            unit_amount: Math.round(item.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        })),
      };
    }

    // If we still don't have session params, we have a problem
    if (!sessionParams) {
      return new Response(
        JSON.stringify({ error: 'Either a valid priceId or cart items are required' }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log("Creating checkout session with params:", sessionParams);
    const session = await stripe.checkout.sessions.create(sessionParams);

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: `Stripe Error: ${error.message}` }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
