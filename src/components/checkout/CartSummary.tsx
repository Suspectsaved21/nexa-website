
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { CartSummaryProps } from "@/types/checkout";
import { BuyNowButton } from "./BuyNowButton";

const stripePromise = loadStripe('pk_test_51OdAmJDm3zF6RmDdXlp6zMoSlOCHLFIDEaRgVu6eE3LNzpeGuYwYnxzaU8TjmcKLMEOBvrZUyH8lAHJvZcadgpkk00TRDtMw3g');

export const CartSummary = ({ items, clientSecret }: CartSummaryProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Find iPhone 14 item if present
  const iphone14Item = items.find(item => 
    item.name.toLowerCase().includes("iphone 14") && item.product_id === 101
  );

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
          />
        </div>
      )}

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};
