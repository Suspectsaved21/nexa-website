import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const FounderStory = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-12">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <UserRound className="h-4 w-4" />
            {t("about.meetFounder")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t("about.founderStoryTitle")}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-lg">
              <img
                src="/lovable-uploads/c5c6c645-396c-4ebd-ad5b-237d295eb2d9.png"
                alt={t("about.founderImageAlt")}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-gray-600">
              {t("about.founderStory")}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="italic text-gray-600">
                "{t("about.founderQuote")}"
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};