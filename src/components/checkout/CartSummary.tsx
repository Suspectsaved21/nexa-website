
import { CartSummaryProps } from "@/types/checkout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const CartSummary = ({ items }: CartSummaryProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    toast.success("Your order has been placed!");
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-xl font-bold">
          ${total.toFixed(2)}
        </span>
      </div>

      <Button 
        onClick={handleCheckout}
        className="w-full mt-4 bg-[#721244] hover:bg-[#5d0f37]"
      >
        Complete Order
      </Button>
    </div>
  );
};
