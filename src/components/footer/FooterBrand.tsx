import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const FooterBrand = () => {
  const { t } = useLanguage();
  
  return (
    <div className="col-span-2">
      <span className="text-2xl font-bold text-nexa-600">Nexa</span>
      <p className="mt-4 text-gray-500">
        {t("footer.description")}
      </p>
      <div className="mt-6 flex space-x-6">
        <a
          href="https://facebook.com/nexa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-nexa-600"
        >
          <Facebook className="h-6 w-6" />
          <span className="sr-only">Facebook</span>
        </a>
        <a
          href="https://twitter.com/nexa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-nexa-600"
        >
          <Twitter className="h-6 w-6" />
          <span className="sr-only">Twitter</span>
        </a>
        <a
          href="https://linkedin.com/company/nexa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-nexa-600"
        >
          <Linkedin className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a
          href="https://instagram.com/nexaservices2025"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-nexa-600"
        >
          <Instagram className="h-6 w-6" />
          <span className="sr-only">Instagram</span>
        </a>
      </div>
    </div>
  );
};