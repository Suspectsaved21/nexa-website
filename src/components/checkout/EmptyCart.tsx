
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-8">
      <p className="text-gray-600 mb-4">Your cart is empty</p>
      <Button onClick={() => navigate("/market")} className="bg-[#721244] hover:bg-[#5d0f37]">
        Continue Shopping
      </Button>
    </div>
  );
};
