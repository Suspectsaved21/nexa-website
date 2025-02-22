
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51OdAmJDm3zF6RmDdXlp6zMoSlOCHLFIDEaRgVu6eE3LNzpeGuYwYnxzaU8TjmcKLMEOBvrZUyH8lAHJvZcadgpkk00TRDtMw3g');

interface CartItemWithDetails {
  id: string;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
}

interface CartSummaryProps {
  items: CartItemWithDetails[];
  clientSecret: string;
}

export const CartSummary = ({ items, clientSecret }: CartSummaryProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-xl font-bold">
          ${total.toFixed(2)}
        </span>
      </div>

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};
