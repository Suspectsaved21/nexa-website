
// This file is kept for reference but is no longer used
// since we've removed the Stripe integration

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CheckoutForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <p className="text-center mb-4">Payment form placeholder</p>
      <Button 
        type="submit"
        className="w-full mt-4 bg-[#721244] hover:bg-[#5d0f37]"
      >
        Complete Order
      </Button>
    </form>
  );
}
