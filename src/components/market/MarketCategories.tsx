
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
  name: string;
  link: string;
  image: string;
}

interface MarketCategoriesProps {
  categories: Category[];
}

export const MarketCategories = ({ categories }: MarketCategoriesProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">{t("categories")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={`/shop?category=${category.link}`}
              className="transform transition-transform hover:scale-105"
            >
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:bg-purple-600 hover:text-white transition-colors">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-32 md:h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg md:text-xl font-semibold text-center">{t(category.link)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
