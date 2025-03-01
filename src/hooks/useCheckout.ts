
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CartItemWithDetails } from "@/types/checkout";

export const useCheckout = (itemsWithDetails: CartItemWithDetails[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Check user authentication
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Create payment intent when user and items are available
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!user || itemsWithDetails.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("Creating payment intent for items:", itemsWithDetails);
        
        const response = await supabase.functions.invoke('create-checkout-session', {
          body: { 
            items: itemsWithDetails,
            userId: user.id,
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/checkout`,
            webhookUrl: "https://ynxbcyuinyzlbsqgtcnd.supabase.co/functions/v1/webhook-handler"
          }
        });

        if (response.error) {
          console.error("Payment intent error:", response.error);
          throw new Error(response.error.message);
        }

        if (!response.data || !response.data.url) {
          // Use BuyNow button instead as fallback
          console.log("No direct checkout available, using BuyNow button instead");
          setClientSecret("");
        } else {
          // If we get a URL directly, redirect to it
          window.location.href = response.data.url;
        }
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast.error('Payment processing is currently unavailable. Please use the Buy Now button instead.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && itemsWithDetails.length > 0) {
      createPaymentIntent();
    } else {
      setIsLoading(false);
    }
  }, [user, itemsWithDetails]);

  return {
    isLoading,
    setIsLoading,
    clientSecret,
    user,
    navigate
  };
};
