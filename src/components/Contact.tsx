import { useLanguage } from "@/contexts/LanguageContext";
import { ContactInfo } from "./contact/ContactInfo";
import { ContactForm } from "./contact/ContactForm";

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <div id="contact" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-nexa-600 font-semibold tracking-wide uppercase">
            {t("contact.title")}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};