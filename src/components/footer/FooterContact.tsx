import { useLanguage } from "@/contexts/LanguageContext";

export const FooterContact = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        {t("footer.contact")}
      </h3>
      <ul className="mt-4 space-y-4">
        <li className="text-base text-gray-500">
          {t("footer.technicalSupport")}: +32466255891
        </li>
        <li className="text-base text-gray-500">
          {t("footer.email")}: nexsup@nexabelgium.xyz
        </li>
        <li className="text-base text-gray-500">
          {t("footer.location")}: Belgium
        </li>
      </ul>
    </div>
  );
};