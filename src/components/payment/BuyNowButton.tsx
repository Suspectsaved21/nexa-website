
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

interface BuyNowButtonProps {
  productId: number;
  className?: string;
}

// List of premium product IDs that should have a buy now button
const premiumProductIds = [1, 3, 101, 103, 106, 107]; // Example IDs for premium products

export const BuyNowButton: React.FC<BuyNowButtonProps> = ({ productId, className }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Only show the button for premium products
  if (!premiumProductIds.includes(productId)) {
    return null;
  }
  
  const handleClick = () => {
    // Add the product to cart
    addToCart(productId);
    // Show a success message
    toast.success('Item added to cart');
    // Navigate to the cart page
    navigate('/cart');
  };
  
  return (
    <Button 
      onClick={handleClick} 
      className={`bg-[#721244] hover:bg-[#5d0f37] ${className}`}
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      Buy Now
    </Button>
  );
};
