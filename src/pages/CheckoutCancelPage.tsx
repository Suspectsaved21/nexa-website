
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MarketHeader } from "@/components/market/MarketHeader";
import { MarketFooter } from "@/components/market/MarketFooter";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";

const CheckoutCancelPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartTotal } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAuthenticated(!!user);
    });
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
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 mb-6">
            Your payment was cancelled. Your cart items are still saved.
          </p>
          <div className="space-y-4">
            {isAuthenticated ? (
              <>
                <Button 
                  onClick={() => navigate("/checkout")} 
                  className="w-full bg-[#721244] hover:bg-[#5d0f37]"
                >
                  Return to Checkout
                </Button>
                <Button 
                  onClick={() => navigate("/market")} 
                  variant="outline"
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => navigate("/")} 
                  className="w-full bg-[#721244] hover:bg-[#5d0f37]"
                >
                  Return to Home
                </Button>
                <Button 
                  onClick={() => navigate("/auth")} 
                  variant="outline"
                  className="w-full"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
      <MarketFooter />
    </div>
  );
};

export default CheckoutCancelPage;
