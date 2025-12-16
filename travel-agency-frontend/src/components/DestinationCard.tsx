import { MapPin, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  id: string | number;
  image: string;
  title: string;
  location: string;
  price: number;
  duration?: string;
}

export function DestinationCard({
  id,
  image,
  title,
  location,
  price,
  duration = "7 days",
}: DestinationCardProps) {
  return (
    <Link to={`/travels`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border-none shadow-md cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <span className="text-[#1B4965] font-bold">€{price}</span>
          </div>
        </div>

        <CardContent className="p-5 flex flex-col flex-grow bg-white relative">
          <div className="flex items-center gap-1.5 text-[#E8A628] mb-2 text-sm font-medium uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1B4965] transition-colors">
            {title}
          </h3>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-1 text-[#1B4965] text-sm font-semibold group-hover:translate-x-1 transition-transform">
              Explore <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
