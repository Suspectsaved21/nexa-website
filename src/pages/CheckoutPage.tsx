
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
    const specials = [
      {
        id: 101,
        name: "iPhone 14",
        price: 500.00,
        image: "/lovable-uploads/417323af-6908-4ad4-a593-0471728e8f22.png"
      },
      // Add all your specials here
    ];

    const deals = [
      {
        id: 1,
        name: "Suddenly Cotton Blue Eau de Parfum for Women 100ml EDP",
        price: 10.00,
        image: "/lovable-uploads/3dcdad9e-de18-4a65-9ca0-427fd3ac2025.png"
      },
      // Add all your deals here
    ];

    const allProducts = [...specials, ...deals];
    
    const items = cartItems.map(item => {
      const product = allProducts.find(p => p.id === item.product_id);
      return {
        ...item,
        name: product?.name || "Product not found",
        price: product?.price || 0,
        image: product?.image || ""
      };
    });

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
