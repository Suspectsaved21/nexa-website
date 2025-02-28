
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface BuyNowButtonProps {
  productId: number;
  className?: string;
}

export const BuyNowButton: React.FC<BuyNowButtonProps> = ({ productId, className }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleClick = () => {
    // Special handling for iPhone product (ID: 101)
    if (productId === 101) {
      navigate('/iphone-payment');
    } else {
      navigate(`/payment/${productId}`);
    }
  };
  
  return (
    <Button
      onClick={handleClick}
      className={cn("bg-[#721244] hover:bg-[#5d0f37] text-white", className)}
    >
      {t("buyNow")}
    </Button>
  );
};
