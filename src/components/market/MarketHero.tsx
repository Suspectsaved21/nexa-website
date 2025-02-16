
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const MarketHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[70vh] flex items-center bg-cover bg-center" style={{
      backgroundImage: `url('/lovable-uploads/54a95ad7-85b3-4455-a167-c94194096831.png')`
    }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
          {t("welcome")}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white">
          {t("tagLine")}
        </p>
        <Button size="lg" className="bg-[#721244] hover:bg-[#5d0f37] text-white">
          {t("shopNow")}
        </Button>
      </div>
    </section>
  );
};
