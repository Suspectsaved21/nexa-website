
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { CartSummaryProps } from "@/types/checkout";
import { BuyNowButton } from "./BuyNowButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect } from "react";

const stripePromise = loadStripe('pk_test_51OdAmJDm3zF6RmDdXlp6zMoSlOCHLFIDEaRgVu6eE3LNzpeGuYwYnxzaU8TjmcKLMEOBvrZUyH8lAHJvZcadgpkk00TRDtMw3g');

export const CartSummary = ({ items, clientSecret, checkoutUrl }: CartSummaryProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Find iPhone 14 item if present
  const iphone14Item = items.find(item => 
    item.name.toLowerCase().includes("iphone 14") && item.product_id === 101
  );

  const handleCheckoutRedirect = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      toast.error("Checkout URL not available. Please try again or use the Buy Now button.");
    }
  };

  useEffect(() => {
    if (items.length > 0 && !clientSecret && !checkoutUrl) {
      console.log("Waiting for checkout session to be created...");
    }
  }, [items, clientSecret, checkoutUrl]);

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-xl font-bold">
          ${total.toFixed(2)}
        </span>
      </div>

      {iphone14Item && (
        <div className="mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Quick Checkout - iPhone 14</h3>
          <p className="text-sm text-gray-600 mb-3">Purchase just the iPhone 14 with our express checkout</p>
          <BuyNowButton 
            productName={iphone14Item.name}
            productImage={iphone14Item.image}
            price={iphone14Item.price}
            priceId="price_1OpRQyDm3zF6RmDdQFbEKVzJ"
          />
        </div>
      )}

      {checkoutUrl && (
        <div className="mt-4 mb-4">
          <Button 
            onClick={handleCheckoutRedirect}
            className="w-full bg-[#721244] hover:bg-[#5d0f37]"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}

      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div className="text-center p-4">
          {checkoutUrl ? (
            <p className="text-gray-600 mb-2">Click "Proceed to Checkout" for a secure payment experience.</p>
          ) : (
            <>
              <p className="text-gray-600 mb-2">Express checkout is recommended for a better experience.</p>
              <p className="text-sm text-gray-500">The payment form is temporarily unavailable.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
