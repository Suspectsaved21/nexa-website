
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/hooks/useCart";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CartSummary } from "@/components/checkout/CartSummary";
import { CheckoutItemsList } from "@/components/checkout/CheckoutItemsList";
import { EmptyCart } from "@/components/checkout/EmptyCart";
import { CheckoutAuthGuard } from "@/components/checkout/CheckoutAuthGuard";
import { useCheckout } from "@/hooks/useCheckout";
import { getCartItemsWithDetails } from "@/services/cartItemsService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const { t } = useLanguage();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [itemsWithDetails, setItemsWithDetails] = useState([]);
  const [showError, setShowError] = useState(false);

  // Load cart items with product details
  useEffect(() => {
    setItemsWithDetails(getCartItemsWithDetails(cartItems));
  }, [cartItems]);

  // Initialize checkout hook
  const { isLoading, user, clientSecret } = useCheckout(itemsWithDetails);

  // Show auth guard if user is not logged in
  if (!isLoading && !user) {
    return <CheckoutAuthGuard user={user} />;
  }

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">{t("Checkout")}</h1>
      
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Error</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            We're experiencing issues with our payment processor. Please try the Buy Now button 
            for a more reliable checkout experience.
          </p>
          <Button onClick={() => setShowError(false)} className="mt-2">Close</Button>
        </DialogContent>
      </Dialog>
      
      {itemsWithDetails.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <CheckoutItemsList 
            items={itemsWithDetails}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
          
          <CartSummary 
            items={itemsWithDetails}
            clientSecret={clientSecret}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
