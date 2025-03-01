
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MarketHeader } from "@/components/market/MarketHeader";
import { MarketFooter } from "@/components/market/MarketFooter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartTotal } = useCart();

  useEffect(() => {
    // Clear the cart on successful checkout
    localStorage.removeItem("cart");
    toast.success("Payment successful! Thank you for your purchase.");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <MarketHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        totalCartCount={getCartTotal()}
      />
      <main className="flex-grow flex items-center justify-center py-16 px-4 mt-16">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
          <div className="space-y-4">
            <Button 
              onClick={() => navigate("/market")} 
              className="w-full bg-[#721244] hover:bg-[#5d0f37]"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
      <MarketFooter />
    </div>
  );
};

export default CheckoutSuccessPage;
