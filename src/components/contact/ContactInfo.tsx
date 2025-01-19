import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactInfo = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Phone className="h-6 w-6 text-nexa-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t("contact.support")}</h3>
          <p className="mt-1 text-gray-500">+32466255891</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Mail className="h-6 w-6 text-nexa-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t("contact.email")}</h3>
          <p className="mt-1 text-gray-500">support@nexa.com</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <MapPin className="h-6 w-6 text-nexa-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t("contact.office")}</h3>
          <p className="mt-1 text-gray-500">{t("contact.location")}</p>
        </div>
      </div>
    </div>
  );
};