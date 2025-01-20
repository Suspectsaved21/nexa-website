import { useLanguage } from "@/contexts/LanguageContext";

export const FooterLinks = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        {t("footer.quickLinks")}
      </h3>
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
  );
};