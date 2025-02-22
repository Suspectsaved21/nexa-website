
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plus, Minus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { supabase } from "@/integrations/supabase/client";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CartItemWithDetails {
  id: string;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/market`,
        },
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <PaymentElement />
      <Button 
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full mt-4 bg-[#721244] hover:bg-[#5d0f37]"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}

const CheckoutPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [itemsWithDetails, setItemsWithDetails] = useState<CartItemWithDetails[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get the current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const demoProducts = {
      1: { name: "Intermediate size basketball for men", price: 29.99, image: "/lovable-uploads/60120fed-7730-46e6-8340-5f0f49df8aa2.png" },
      2: { name: "Unisex Loudon Lite Backpack", price: 32.95, image: "/lovable-uploads/af68aec7-4213-409b-9e64-6ac17ade8a4b.png" },
      3: { name: "iPhone 14", price: 399, image: "/lovable-uploads/54a95ad7-85b3-4455-a167-c94194096831.png" },
      4: { name: "Long sleeves shirt for women", price: 32.95, image: "/lovable-uploads/2e1336e4-f9d9-4456-9b43-b0d6d4f2386f.png" },
    };

    const items = cartItems.map(item => ({
      ...item,
      ...demoProducts[item.product_id as keyof typeof demoProducts]
    }));

    setItemsWithDetails(items);
    setIsLoading(false);
  }, [cartItems]);

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
      }
    };

    createPaymentIntent();
  }, [user, itemsWithDetails]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">{t("Checkout")}</h1>
      
      {itemsWithDetails.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Button onClick={() => navigate("/market")} className="bg-[#721244] hover:bg-[#5d0f37]">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {itemsWithDetails.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={!stripe}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={!stripe}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  disabled={!stripe}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-right min-w-[100px]">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-xl font-bold">
                ${itemsWithDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </span>
            </div>

            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
