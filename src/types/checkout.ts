
export interface CartItem {
  id: string;
  product_id: number;
  quantity: number;
}

export interface CartItemWithDetails extends CartItem {
  name: string;
  price: number;
  image: string;
}

export interface CartItemProps extends CartItemWithDetails {
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export interface CartSummaryProps {
  items: CartItemWithDetails[];
  clientSecret: string;
}

export interface PaymentRecord {
  id: string;
  user_id: string;
  product_name: string;
  email: string;
  amount: number;
  currency: string;
  payment_status: string;
  stripe_payment_id: string;
  created_at: string;
}

export interface BuyNowButtonProps {
  productName: string;
  productImage: string;
  price: number;
  priceId?: string;
}
