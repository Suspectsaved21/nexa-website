
import { useState } from "react";
import { CartSummaryProps } from "@/types/checkout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const CartSummary = ({ items }: CartSummaryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          items, 
          returnUrl: window.location.origin
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Unable to proceed to checkout. Please try again later.');
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
