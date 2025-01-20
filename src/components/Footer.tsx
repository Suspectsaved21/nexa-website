import { useLanguage } from "@/contexts/LanguageContext";
import { FooterBrand } from "./footer/FooterBrand";
import { FooterLinks } from "./footer/FooterLinks";
import { FooterContact } from "./footer/FooterContact";
import { FooterCopyright } from "./footer/FooterCopyright";

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};