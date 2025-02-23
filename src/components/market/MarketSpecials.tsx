
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CartItem } from "@/types/checkout";
import { LazyImage } from "@/components/LazyImage";

interface Special {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface MarketSpecialsProps {
  specials: Special[];
  cartItems: CartItem[];
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
}

export const MarketSpecials = ({ specials, cartItems, incrementItem, decrementItem }: MarketSpecialsProps) => {
  const { t } = useLanguage();

  const getItemQuantity = (specialId: number) => {
    const item = cartItems.find(item => item.product_id === specialId);
    return item?.quantity || 0;
  };

  return (
    <section className="py-8 md:py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">{t("nexaSpecials")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {specials.map((special) => (
            <div 
              key={special.id} 
              className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-xl"
              data-aos="fade-up"
            >
              <div className="aspect-square mb-4 relative overflow-hidden rounded-lg">
                <LazyImage 
                  src={special.image} 
                  alt={special.name}
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2 h-12">{special.name}</h3>
              <p className="text-lg md:text-xl font-bold text-[#721244] mb-4">€{special.price.toFixed(2)}</p>
              <div className="flex items-center justify-between gap-2">
                <button 
                  onClick={() => decrementItem(special.id)}
                  className="p-2 bg-[#530a46] text-white rounded hover:bg-[#3d0733] transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <Button 
                  onClick={() => incrementItem(special.id)}
                  className="flex-1 bg-[#530a46] hover:bg-[#3d0733] text-white transition-colors"
                >
                  {t("addToCart")} ({getItemQuantity(special.id)})
                </Button>
                <button 
                  onClick={() => incrementItem(special.id)}
                  className="p-2 bg-[#530a46] text-white rounded hover:bg-[#3d0733] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
