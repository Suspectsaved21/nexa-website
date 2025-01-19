import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export const FounderStory = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-12">
      <Link to="/founder">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <UserRound className="h-4 w-4" />
          {t("about.meetFounder")}
        </Button>
      </Link>
    </div>
  );
};