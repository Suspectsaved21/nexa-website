
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
      Buy Now
    </Button>
  );
};
