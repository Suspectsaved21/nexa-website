
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
}

export interface CheckoutResponse {
  url: string;
  error?: string;
}

export interface CheckoutRequestBody {
  items?: CartItemWithDetails[];
  priceId?: string;
  returnUrl: string;
  cancelUrl?: string;
}
