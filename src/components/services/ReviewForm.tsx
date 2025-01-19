import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ReviewForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({
        title: t("services.reviewError"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: t("services.signInRequired"),
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("reviews").insert([
        {
          user_id: user.id,
          rating,
          comment,
        },
      ]);

      if (error) throw error;

      toast({
        title: t("services.reviewSuccess"),
        description: t("services.reviewThankYou"),
      });

      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: t("services.reviewError"),
        description: t("services.tryAgain"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-8 w-8 cursor-pointer ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <Textarea
        placeholder={t("services.shareFeedback")}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px]"
      />
      <Button
        onClick={handleSubmitReview}
        className="w-full bg-nexa-600 hover:bg-nexa-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("services.submitting") : t("services.submitReview")}
      </Button>
    </div>
  );
};