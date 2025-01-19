import { Star } from "lucide-react";

interface ReviewCardProps {
  rating: number;
  comment: string;
  author: string;
}

export const ReviewCard = ({ rating, comment, author }: ReviewCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 ${
              index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-gray-600 mb-4">{comment}</p>
      <p className="font-semibold text-nexa-600">{author}</p>
    </div>
  );
};