import { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const ServiceCard = ({ title, description, Icon }: ServiceCardProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-nexa-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t(title)}</h3>
          <p className="mt-2 text-base text-gray-500">{t(description)}</p>
        </div>
      </div>
    </div>
  );
};