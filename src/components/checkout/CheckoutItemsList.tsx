
import { CartItem } from "@/components/checkout/CartItem";
import { CartItemWithDetails } from "@/types/checkout";

interface CheckoutItemsListProps {
  items: CartItemWithDetails[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CheckoutItemsList = ({ 
  items, 
  onUpdateQuantity, 
  onRemove 
}: CheckoutItemsListProps) => {
  return (
    <>
      {items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </>
  );
};
