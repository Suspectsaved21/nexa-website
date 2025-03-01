
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { corsHeaders } from "../_shared/cors.ts";
import { stripe } from "../_shared/stripe.ts";

console.log("Create checkout session function started");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      productName, 
      productImage, 
      price, 
      priceId, 
      userId, 
      productId,
      successUrl,
      cancelUrl,
      webhookUrl
    } = await req.json();

    console.log("Request data:", { 
      productName, 
      price, 
      priceId, 
      userId,
      successUrl,
      cancelUrl,
      webhookUrl: webhookUrl || "Not provided"
    });

    if (!productName || !price || !userId) {
      throw new Error("Missing required fields");
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              images: productImage ? [productImage] : [],
            },
            unit_amount: Math.round(price * 100), // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl || `${req.headers.get("origin")}/success`,
      cancel_url: cancelUrl || `${req.headers.get("origin")}/cancel`,
      client_reference_id: userId,
      metadata: {
        userId,
        productId: productId?.toString(),
      },
    });

    console.log("Checkout session created:", session.id);

    // Return the Stripe checkout session URL
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
