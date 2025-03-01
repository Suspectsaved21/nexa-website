
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
      if (!user || itemsWithDetails.length === 0) return;

      try {
        const response = await supabase.functions.invoke('create-payment-intent', {
          body: { 
            items: itemsWithDetails,
            userId: user.id
          }
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast.error('Failed to initialize payment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [user, itemsWithDetails]);

  return {
    isLoading,
    setIsLoading,
    clientSecret,
    user,
    navigate
  };
};
