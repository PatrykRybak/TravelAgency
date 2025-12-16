import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  initials: string;
}

export function TestimonialCard({
  name,
  location,
  rating,
  text,
  initials,
}: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-14 h-14">
            <AvatarFallback className="bg-[#1B4965] text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{name}</p>
            <p className="text-gray-600">{location}</p>
          </div>
        </div>

        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <Quote className="w-8 h-8 text-[#E8A628]/30 mb-2" />
        <p className="text-gray-700 italic">{text}</p>
      </CardContent>
    </Card>
  );
}
