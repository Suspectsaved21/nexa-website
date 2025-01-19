import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { LazyImage } from "@/components/LazyImage";

const Founder = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-nexa-600 font-semibold tracking-wide uppercase">
            {t("founder.title")}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t("founder.name")}
          </p>
        </div>
        
        <div className="prose prose-blue mx-auto lg:max-w-3xl">
          <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-lg mb-8">
            <LazyImage
              src="/lovable-uploads/c5c6c645-396c-4ebd-ad5b-237d295eb2d9.png"
              alt={t("founder.imageAlt")}
              className="object-cover w-full h-full"
            />
          </div>
          
          <div className="space-y-6 text-gray-600">
            <p>{t("founder.background")}</p>
            <p>{t("founder.vision")}</p>
            <p>{t("founder.values")}</p>
            <p>{t("founder.future")}</p>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <blockquote className="italic text-gray-600">
              "{t("founder.quote")}"
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;