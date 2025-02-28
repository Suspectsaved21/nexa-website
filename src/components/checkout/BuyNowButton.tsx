
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BuyNowButtonProps } from "@/types/checkout";

export const BuyNowButton = ({ productName, productImage, price, priceId }: BuyNowButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    try {
      setIsLoading(true);
      
      console.log("Sending checkout request with:", { productName, productImage, price, priceId });
      
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: {
          productName,
          productImage,
          price,
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        },
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message);
      }

      if (data?.url) {
        console.log("Redirecting to Stripe checkout:", data.url);
        window.location.href = data.url;
      } else {
        console.error("No URL returned from checkout session", data);
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleBuyNow}
      disabled={isLoading}
      className="w-full mt-4 bg-[#721244] hover:bg-[#5d0f37]"
    >
      {isLoading ? "Processing..." : "Buy Now"}
    </Button>
  );
};
