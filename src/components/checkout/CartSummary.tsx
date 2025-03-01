
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CartSummaryProps, CheckoutResponse } from "@/types/checkout";
import { supabase } from "@/integrations/supabase/client";

export const CartSummary = ({ items }: CartSummaryProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // Get the current origin for absolute URLs
      const origin = window.location.origin;
      
      // Create absolute URLs for success and cancel paths
      const successUrl = `${origin}/checkout/success`;
      const cancelUrl = `${origin}/checkout/cancel`;
      
      console.log("Checkout URLs:", { successUrl, cancelUrl });

      // Call the Supabase Edge Function to create a checkout session
      const { data, error } = await supabase.functions.invoke<CheckoutResponse>(
        'create-checkout-session', 
        { 
          body: { 
            items, 
            priceId: 'prod_Rre9tctWLjCkLY',  // Use the product ID provided
            returnUrl: successUrl,
            cancelUrl: cancelUrl
          } 
        }
      );

      if (error || !data) {
        throw new Error(error?.message || 'Failed to create checkout session');
      }

      console.log("Checkout response:", data);

      // Redirect to the Stripe Checkout URL
      if (data.url) {
        // Store the cart items in sessionStorage before redirecting
        sessionStorage.setItem('pending_checkout_items', JSON.stringify(items));
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error(`Checkout failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        onClick={handleCheckout}
        disabled={isProcessing || items.length === 0}
        className="w-full mt-6 bg-[#721244] hover:bg-[#5d0f37]"
      >
        {isProcessing ? "Processing..." : "Proceed to Checkout"}
      </Button>
    </div>
  );
};
