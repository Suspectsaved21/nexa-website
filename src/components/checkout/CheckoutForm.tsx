
import { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (stripe && elements) {
      setIsReady(true);
    }
  }, [stripe, elements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not been initialized yet");
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
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message || "An unexpected error occurred.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        toast.error(error.message || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMessage("Payment failed. Please try again.");
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isReady) {
    return (
      <div className="text-center p-4">
        <LoadingSpinner />
        <p className="mt-2 text-sm text-gray-500">Initializing payment form...</p>
      </div>
    );
  }

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
        disabled={!stripe || isProcessing || !clientSecret}
        variant={isProcessing ? "loading" : "default"}
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
};
