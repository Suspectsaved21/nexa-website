
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CartItem } from "@/types/checkout";
import { BuyNowButton } from "@/components/payment/BuyNowButton";

interface Deal {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface MarketDealsProps {
  deals: Deal[];
  cartItems: CartItem[];
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
}

export const MarketDeals = ({ deals, cartItems, incrementItem, decrementItem }: MarketDealsProps) => {
  const { t } = useLanguage();

  const getItemQuantity = (dealId: number) => {
    const item = cartItems.find(item => item.product_id === dealId);
    return item?.quantity || 0;
  };

  return (
    <section className="py-8 md:py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">{t("hotDeals")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
              <div className="aspect-square mb-4 relative">
                <img 
                  src={deal.image} 
                  alt={deal.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2 h-12">{deal.name}</h3>
              <p className="text-lg md:text-xl font-bold text-[#721244] mb-4">€{deal.price.toFixed(2)}</p>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <button 
                    onClick={() => decrementItem(deal.id)}
                    className="p-2 bg-[#530a46] text-white rounded hover:bg-[#3d0733]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <Button 
                    onClick={() => incrementItem(deal.id)}
                    className="flex-1 bg-[#530a46] hover:bg-[#3d0733] text-white"
                  >
                    {t("addToCart")} ({getItemQuantity(deal.id)})
                  </Button>
                  <button 
                    onClick={() => incrementItem(deal.id)}
                    className="p-2 bg-[#530a46] text-white rounded hover:bg-[#3d0733]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <BuyNowButton productId={deal.id} className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
