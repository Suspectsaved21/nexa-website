
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

interface BuyNowButtonProps {
  productId: number;
  className?: string;
}

export const BuyNowButton: React.FC<BuyNowButtonProps> = ({ productId, className }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/payment/${productId}`);
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
