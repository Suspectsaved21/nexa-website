
import { useNavigate } from "react-router-dom";
import { MarketHeader } from "@/components/market/MarketHeader";
import { MarketFooter } from "@/components/market/MarketFooter";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const CheckoutCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <MarketHeader />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 mb-6">
            Your payment was cancelled. Your cart items are still saved.
          </p>
          <div className="space-y-4">
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
          </div>
        </div>
      </main>
      <MarketFooter />
    </div>
  );
};

export default CheckoutCancelPage;
