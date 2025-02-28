
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the cart or perform any other post-purchase actions here
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been processed successfully.
        </p>
        <Button
          onClick={() => navigate("/market")}
          className="bg-[#721244] hover:bg-[#5d0f37]"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
