
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
  name: string;
  link: string;
  image: string;
}

interface MarketVideoSectionProps {
  categories: Category[];
}

export const MarketVideoSection = ({ categories }: MarketVideoSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 h-full">
        <div className="container mx-auto px-4 py-8 h-full">
          <div className="flex overflow-x-auto gap-4 md:gap-6 h-full items-center scrollbar-thin scrollbar-thumb-[#d7263d] scrollbar-track-transparent snap-x">
            {categories.map((category) => (
              <div key={category.name} className="flex-none w-36 md:w-48 snap-start">
                <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-110">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-24 md:h-32 object-cover rounded-md mb-3"
                  />
                  <p className="text-center font-semibold">{t(`market.${category.link}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
