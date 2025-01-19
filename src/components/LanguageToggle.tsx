import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="w-10 h-10"
      aria-label="Toggle language"
    >
      <Globe className="h-5 w-5" />
      <span className="ml-2 text-sm">{language.toUpperCase()}</span>
    </Button>
  );
};