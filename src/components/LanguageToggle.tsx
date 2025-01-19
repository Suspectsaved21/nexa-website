import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const toggleLanguage = () => {
    // This will be implemented once we have the language context set up
    console.log("Language toggle clicked");
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
    </Button>
  );
};