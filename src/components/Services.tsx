import { useState } from "react";
import { Package, Star, CheckCircle2, ThumbsUp, MessageSquare, RefreshCcw, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Services = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      title: "Dropshipping Solutions",
      description: "Streamlined dropshipping services with reliable suppliers and fast delivery",
      icon: Package,
    },
    {
      title: "Client Satisfaction",
      description: "Dedicated support team ensuring 100% customer satisfaction",
      icon: ThumbsUp,
    },
    {
      title: "Technical Support",
      description: "24/7 technical assistance at +32466255891",
      icon: CheckCircle2,
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality control for all products and services",
      icon: Star,
    },
    {
      title: "Client Complaints",
      description: "Swift resolution of customer issues with dedicated complaint handling",
      icon: MessageSquare,
    },
    {
      title: "Refund Policy",
      description: "Hassle-free refund process with transparent policies",
      icon: RefreshCcw,
    },
    {
      title: "Product Reviews",
      description: "Verified customer reviews and ratings for all products",
      icon: FileText,
    },
  ];

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Please sign in to leave a review",
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
        title: "Review submitted successfully",
        description: "Thank you for your feedback!",
      });

      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error submitting review",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="services" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-nexa-600 font-semibold tracking-wide uppercase">Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What We Offer
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Comprehensive business solutions tailored to your needs
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <service.icon className="h-6 w-6 text-nexa-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Customer Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`h-5 w-5 ${starIndex < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Excellent service! The dropshipping process was seamless and the support team was incredibly helpful."
                </p>
                <p className="font-semibold text-nexa-600">- Happy Customer {index + 1}</p>
              </div>
            ))}
          </div>

          {/* Add Review Dialog */}
          <div className="mt-8 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-nexa-600 hover:bg-nexa-700 text-white">
                  Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
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
                    placeholder="Share your experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button
                    onClick={handleSubmitReview}
                    className="w-full bg-nexa-600 hover:bg-nexa-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};