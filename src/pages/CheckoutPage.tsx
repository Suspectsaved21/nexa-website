
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
      {
        id: 102,
        name: "WHOME T-TOOL Skateboard for Adult/Kids Girls/Boys Beginner 31\" x 8\" Alpine Maple Deck with ABEC-9 Bearings",
        price: 20.00,
        image: "/lovable-uploads/7fca3272-ac16-4b81-ae76-37c9809e20d2.png"
      },
      {
        id: 103,
        name: "Never Lie: From the Sunday Times Bestselling Author of The Housemaid",
        price: 9.99,
        image: "/lovable-uploads/256306c6-e36b-4a6b-a41f-e56b1fa9306d.png"
      },
      {
        id: 104,
        name: "Emotional Intelligence: 25th Anniversary Edition English edition",
        price: 9.99,
        image: "/lovable-uploads/6410deb4-412c-44f4-8418-1990ea9929e0.png"
      },
      {
        id: 105,
        name: "Fishing Hats Wide Brim UV Protection Fishing Hats Windproof Boonie Hat for Men Women",
        price: 12.00,
        image: "/lovable-uploads/242a4c1f-2870-4767-b542-33233992ff0e.png"
      },
      {
        id: 106,
        name: "UOHHBOE Portable Bluetooth Wireless Speaker 24 Hours Runtime Waterproof and Dustproof",
        price: 25.00,
        image: "/lovable-uploads/bb5d09f8-c491-4bcb-b89e-0583aa81f0c5.png"
      },
      {
        id: 107,
        name: "IRON JIA'S Heated Motorcycle Gloves for Men Winter with USB Charging Port 3000mAh",
        price: 80.00,
        image: "/lovable-uploads/9143698c-c6ed-46f6-a9a8-19dd5c2c49cf.png"
      }
    ];

    const deals = [
      {
        id: 1,
        name: "Suddenly Cotton Blue Eau de Parfum for Women 100ml EDP",
        price: 10.00,
        image: "/lovable-uploads/3dcdad9e-de18-4a65-9ca0-427fd3ac2025.png"
      },
      {
        id: 2,
        name: "plex care serum 4",
        price: 9.99,
        image: "/lovable-uploads/22960741-63be-49e8-8387-ced1020d4c2c.png"
      },
      {
        id: 3,
        name: "Nike Homme Air Force 1",
        price: 99.99,
        image: "/lovable-uploads/4239ebcc-9043-43e5-bdb8-d054263822e0.png"
      },
      {
        id: 4,
        name: "TANMESSO Y2K Women's Winter Autumn Fashion Long Sleeve Fleece Oversized Hoodie",
        price: 30.00,
        image: "/lovable-uploads/fe5a3d98-7db7-40cf-a4d2-72cef41789c6.png"
      }
    ];

    const allProducts = [...specials, ...deals];
    
    const items = cartItems.map(item => {
      const product = allProducts.find(p => p.id === item.product_id);
      if (!product) {
        console.error(`Product not found for id: ${item.product_id}`);
      }
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
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
