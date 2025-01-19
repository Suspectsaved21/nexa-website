import { useLanguage } from "@/contexts/LanguageContext";

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