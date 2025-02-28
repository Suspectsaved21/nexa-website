
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

interface IPhonePaymentButtonProps {
  className?: string;
}

export const IPhonePaymentButton: React.FC<IPhonePaymentButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/iphone-payment');
  };
  
  return (
    <Button 
      onClick={handleClick} 
      className={`bg-[#721244] hover:bg-[#5d0f37] ${className}`}
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      Buy iPhone 14
    </Button>
  );
};
