import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-nexa-600">Nexa</span>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <a href="#services" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-nexa-600">
              {t("nav.services")}
            </a>
            <a href="#about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-nexa-600">
              {t("nav.about")}
            </a>
            <a href="#contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-nexa-600">
              {t("nav.contact")}
            </a>
            <a href="#faq" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-nexa-600">
              {t("nav.faq")}
            </a>
            <LanguageToggle />
          </div>

          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-nexa-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#services"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-nexa-50 hover:text-nexa-600"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.services")}
            </a>
            <a
              href="#about"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-nexa-50 hover:text-nexa-600"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.about")}
            </a>
            <a
              href="#contact"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-nexa-50 hover:text-nexa-600"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.contact")}
            </a>
            <a
              href="#faq"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-nexa-50 hover:text-nexa-600"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.faq")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};