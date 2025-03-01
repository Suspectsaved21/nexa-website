
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CartItemWithDetails } from "@/types/checkout";

export const useCheckout = (itemsWithDetails: CartItemWithDetails[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState<any>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
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

  // Create checkout session when user and items are available
  useEffect(() => {
    const createCheckoutSession = async () => {
      if (!user || itemsWithDetails.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("Creating checkout session for items:", itemsWithDetails);
        
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
          console.error("Checkout session error:", response.error);
          throw new Error(response.error.message);
        }

        if (response.data && response.data.url) {
          setCheckoutUrl(response.data.url);
          // Don't redirect automatically, let the user choose
          console.log("Checkout URL created:", response.data.url);
        } else if (response.data && response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
          console.log("Client secret received for embedded checkout");
        } else {
          console.warn("No checkout URL or client secret returned");
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
        toast.error('Payment processing encountered an issue. Please try the Buy Now button instead.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && itemsWithDetails.length > 0) {
      createCheckoutSession();
    } else {
      setIsLoading(false);
    }
  }, [user, itemsWithDetails]);

  return {
    isLoading,
    setIsLoading,
    clientSecret,
    checkoutUrl,
    user,
    navigate
  };
};
