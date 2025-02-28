
import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
        toast.error(error.message);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMessage("Payment failed. Please try again.");
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md border border-red-200">
          {errorMessage}
        </div>
      )}
      
      <Button 
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full mt-4 bg-[#721244] hover:bg-[#5d0f37] flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" /> Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </Button>
    </form>
  );
}
