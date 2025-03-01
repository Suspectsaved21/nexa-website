
import { useState } from "react";
import { CartSummaryProps } from "@/types/checkout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const CartSummary = ({ items }: CartSummaryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);
    setCheckoutError(null);
    
    try {
      // Use the provided price ID for the checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          items,
          priceId: 'prod_Rre9tctWLjCkLY', // Using the price ID provided by the user
          returnUrl: window.location.origin
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else if (data?.error) {
        setCheckoutError(data.error);
        toast.error(data.error);
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const errorMessage = error.message || 'Unable to proceed to checkout. Please try again later.';
      setCheckoutError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-xl font-bold">
          ${total.toFixed(2)}
        </span>
      </div>

      {checkoutError && (
        <div className="my-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          Error: {checkoutError}
        </div>
      )}

      <Button 
        onClick={handleCheckout}
        className="w-full mt-4 bg-[#721244] hover:bg-[#5d0f37]"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Proceed to Checkout'}
      </Button>
    </div>
  );
};
