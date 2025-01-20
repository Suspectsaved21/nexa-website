import { useLanguage } from "@/contexts/LanguageContext";

export const FooterCopyright = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <p className="text-base text-gray-400 text-center">
        © {new Date().getFullYear()} Nexa. {t("footer.rights")}
      </p>
    </div>
  );
};