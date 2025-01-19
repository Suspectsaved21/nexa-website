import { useLanguage } from "@/contexts/LanguageContext";

export const About = () => {
  const { t } = useLanguage();
  
  return (
    <div id="about" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-nexa-600 font-semibold tracking-wide uppercase">{t("about.title")}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t("about.subtitle")}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {t("about.description")}
          </p>
        </div>

        <div className="mt-10">
          <div className="prose prose-blue mx-auto lg:max-w-3xl">
            <p className="text-gray-500">
              {t("about.location")}
            </p>
            <p className="text-gray-500 mt-4">
              {t("about.experience")}
            </p>
            <p className="text-gray-500 mt-4">
              {t("about.commitment")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};