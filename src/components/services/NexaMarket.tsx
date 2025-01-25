import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const NexaMarket = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-20 text-center">
      <div className="flex justify-center mb-6">
        <ShoppingBag className="h-12 w-12 text-nexa-600" />
      </div>
      <h3 className="text-2xl font-bold mb-4">{t("services.nexaMarket.title")}</h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        {t("services.nexaMarket.description")}
      </p>
      <Button
        className="bg-nexa-600 hover:bg-nexa-700 text-white"
        onClick={() => window.open("https://market.nexabelgium.xyz", "_blank")}
      >
        {t("services.nexaMarket.visitButton")}
      </Button>
    </div>
  );
};