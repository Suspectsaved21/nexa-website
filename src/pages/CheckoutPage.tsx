
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plus, Minus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

// Define the cart item with additional product details
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

  const calculateTotal = () => {
    return itemsWithDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    // This is where you would implement the actual checkout logic
    toast.success("Thank you for your order!");
    navigate("/market");
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 mt-16">Loading...</div>;
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
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
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
              <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full bg-[#721244] hover:bg-[#5d0f37]">
              Complete Purchase
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
