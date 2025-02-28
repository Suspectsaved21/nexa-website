
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
      className={cn("bg-[#721244] hover:bg-[#5d0f37] text-white font-semibold", className)}
    >
      Buy iPhone 14
    </Button>
  );
};
