
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/components/checkout/CartItem";
import { CartSummary } from "@/components/checkout/CartSummary";

interface CartItemWithDetails {
  id: string;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
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

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
          <Button onClick={() => navigate("/auth")} className="bg-[#721244] hover:bg-[#5d0f37]">
            Go to Login
          </Button>
        </div>
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
            <CartItem
              key={item.id}
              {...item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
          
          <CartSummary 
            items={itemsWithDetails}
            clientSecret={clientSecret}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
