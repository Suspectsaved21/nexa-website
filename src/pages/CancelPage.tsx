
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your payment was cancelled. If you experienced any issues, please try again or contact our support team.
        </p>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => navigate("/checkout")}
            className="bg-[#721244] hover:bg-[#5d0f37]"
          >
            Return to Checkout
          </Button>
          <Button
            onClick={() => navigate("/market")}
            variant="outline"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
