
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/hooks/useCart";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CartItem } from "@/components/checkout/CartItem";
import { CartSummary } from "@/components/checkout/CartSummary";
import { EmptyCart } from "@/components/checkout/EmptyCart";
import { AuthPrompt } from "@/components/checkout/AuthPrompt";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useProductDetails } from "@/hooks/useProductDetails";

const CheckoutPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user, isLoading: authLoading } = useAuthStatus();
  const { itemsWithDetails, isLoading: productsLoading } = useProductDetails(cartItems);

  const isLoading = authLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <AuthPrompt />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">{t("Checkout")}</h1>
      
      {itemsWithDetails.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {itemsWithDetails.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
          
          <CartSummary 
            items={itemsWithDetails}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
