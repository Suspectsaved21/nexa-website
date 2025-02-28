
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface BuyNowButtonProps {
  productName: string;
  productImage: string;
  price: number;
}

export const BuyNowButton = ({ productName, productImage, price }: BuyNowButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: {
          productName,
          productImage,
          price,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
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
