import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                href="https://instagram.com/nexa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-nexa-600"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t("footer.quickLinks")}</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#services" className="text-base text-gray-500 hover:text-nexa-600">
                  {t("nav.services")}
                </a>
              </li>
              <li>
                <a href="#about" className="text-base text-gray-500 hover:text-nexa-600">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-base text-gray-500 hover:text-nexa-600">
                  {t("nav.contact")}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-base text-gray-500 hover:text-nexa-600">
                  {t("nav.faq")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t("footer.contact")}</h3>
            <ul className="mt-4 space-y-4">
              <li className="text-base text-gray-500">
                {t("footer.technicalSupport")}: +32466255891
              </li>
              <li className="text-base text-gray-500">
                {t("footer.email")}: support@nexa.com
              </li>
              <li className="text-base text-gray-500">
                {t("footer.location")}: Belgium
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Nexa. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};