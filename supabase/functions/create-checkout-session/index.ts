
import { serve } from "https://deno.land/std@0.177.1/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { corsHeaders } from "../_shared/cors.ts";
import Stripe from "https://esm.sh/stripe@12.1.1?target=deno";

// Initialize Stripe
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  // CORS preflight handler
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { items, userId, successUrl, cancelUrl, webhookUrl, productName, productImage, price, priceId } = await req.json();
    
    console.log("Request received:", { userId, items: items?.length || 0, priceId });

    // Validate required parameters
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    // Handle single product checkout (Buy Now)
    if (priceId) {
      console.log("Creating checkout session for single product:", priceId);
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          }
        ],
        mode: 'payment',
        success_url: successUrl || `${new URL(req.url).origin}/success`,
        cancel_url: cancelUrl || `${new URL(req.url).origin}/checkout`,
        client_reference_id: userId,
        metadata: {
          userId,
          productName: productName || 'iPhone 14',
          productId: '101',
        },
      });

      return new Response(
        JSON.stringify({ url: session.url }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }
    
    // Handle cart checkout
    else if (items && items.length > 0) {
      console.log("Creating checkout session for multiple items:", items.length);
      
      // Create line items for checkout
      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      }));
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl || `${new URL(req.url).origin}/success`,
        cancel_url: cancelUrl || `${new URL(req.url).origin}/checkout`,
        client_reference_id: userId,
        metadata: {
          userId,
        },
      });
      
      return new Response(
        JSON.stringify({ url: session.url }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } 
    
    else {
      throw new Error('No items provided for checkout');
    }
  } 
  catch (error) {
    console.error("Error creating checkout session:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create checkout session',
        details: error.stack || 'No stack trace available'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
