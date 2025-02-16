
import { useLanguage } from "@/contexts/LanguageContext";

export const MarketFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#232f3e] text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>{t("footerText")}</p>
      </div>
    </footer>
  );
};
