import { Clock, Users, Star, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

interface PackageCardProps {
  image: string;
  title: string;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  price: number;
  description: string;
  featured?: boolean;
}

export function PackageCard({
  image,
  title,
  duration,
  groupSize,
  rating,
  reviews,
  price,
  description,
  featured = false
}: PackageCardProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {featured && (
          <Badge className="absolute top-4 left-4 bg-[#E8A628]">
            {t.featured}
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
          <span className="text-gray-500">({reviews} reviews)</span>
        </div>
        
        <h3 className="mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{groupSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{t.daily}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-gray-500">{t.from}</span>
            <div className="text-[#1B4965] text-xl">€{price}</div>
          </div>
          <Button className="bg-[#E8A628] hover:bg-[#D4A024] text-white">{t.viewDetails}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
