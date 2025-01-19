import { Package, Star, CheckCircle2, ThumbsUp, MessageSquare, RefreshCcw, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServiceCard } from "./services/ServiceCard";
import { ReviewCard } from "./services/ReviewCard";
import { ReviewForm } from "./services/ReviewForm";

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: "services.dropshipping.title",
      description: "services.dropshipping.description",
      icon: Package,
    },
    {
      title: "services.satisfaction.title",
      description: "services.satisfaction.description",
      icon: ThumbsUp,
    },
    {
      title: "services.support.title",
      description: "services.support.description",
      icon: CheckCircle2,
    },
    {
      title: "services.quality.title",
      description: "services.quality.description",
      icon: Star,
    },
    {
      title: "services.complaints.title",
      description: "services.complaints.description",
      icon: MessageSquare,
    },
    {
      title: "services.refund.title",
      description: "services.refund.description",
      icon: RefreshCcw,
    },
    {
      title: "services.reviews.title",
      description: "services.reviews.description",
      icon: FileText,
    },
  ];

  return (
    <div id="services" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-nexa-600 font-semibold tracking-wide uppercase">
            {t("services.title")}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t("services.subtitle")}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {t("services.description")}
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                Icon={service.icon}
              />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">{t("services.customerReviews")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <ReviewCard
                key={index}
                rating={4}
                comment={t("services.sampleReview")}
                author={`${t("services.happyCustomer")} ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-nexa-600 hover:bg-nexa-700 text-white">
                  {t("services.writeReview")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("services.writeReview")}</DialogTitle>
                </DialogHeader>
                <ReviewForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};