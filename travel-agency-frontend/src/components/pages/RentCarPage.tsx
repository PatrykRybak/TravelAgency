import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Car, Users, Gauge, Check, MapPin, Calendar, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function RentCarPage() {
  const { t } = useLanguage();

  const cars = [
    {
      id: 'economy-1',
      name: 'Toyota Yaris',
      category: t.economy,
      image: 'https://images.unsplash.com/photo-1721994234246-45087e5aca16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWx8ZW58MXx8fHwxNzYyMDE4OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 35,
      seats: 5,
      transmission: t.automatic,
      features: [t.airConditioning, t.bluetooth, t.insuranceIncluded]
    },
    {
      id: 'compact-1',
      name: 'Volkswagen Golf',
      category: t.compact,
      image: 'https://images.unsplash.com/photo-1721994234246-45087e5aca16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWx8ZW58MXx8fHwxNzYyMDE4OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 45,
      seats: 5,
      transmission: t.automatic,
      features: [t.airConditioning, t.gps, t.bluetooth, t.insuranceIncluded]
    },
    {
      id: 'suv-1',
      name: 'BMW X3',
      category: t.suv,
      image: 'https://images.unsplash.com/photo-1721994234246-45087e5aca16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWx8ZW58MXx8fHwxNzYyMDE4OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 85,
      seats: 5,
      transmission: t.automatic,
      features: [t.airConditioning, t.gps, t.bluetooth, t.insuranceIncluded]
    },
    {
      id: 'luxury-1',
      name: 'Mercedes-Benz E-Class',
      category: t.luxury,
      image: 'https://images.unsplash.com/photo-1721994234246-45087e5aca16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWx8ZW58MXx8fHwxNzYyMDE4OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 120,
      seats: 5,
      transmission: t.automatic,
      features: [t.airConditioning, t.gps, t.bluetooth, t.insuranceIncluded]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="mb-4">{t.rentCarTitle}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {t.rentCarSubtitle}
          </p>

          {/* Car Rental Search Form */}
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder={t.pickupLocation}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder={t.returnLocation}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="date"
                  placeholder={t.pickupDate}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="time"
                  placeholder={t.pickupTime}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="date"
                  placeholder={t.returnDate}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="time"
                  placeholder={t.returnTime}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
            </div>
            <Button className="w-full mt-4 bg-[#E8A628] hover:bg-[#D4A024] text-white">
              <Car className="w-5 h-5 mr-2" />
              {t.searchCars}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-[#E8A628] text-white">
                  {car.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>{car.name}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {car.seats} {t.seats}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge className="w-4 h-4" />
                    {car.transmission}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-semibold text-gray-700">{t.carFeatures}:</p>
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#E8A628]" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#1B4965]">€{car.price}</span>
                  <span className="text-gray-500">/ {t.perDay}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#E8A628] hover:bg-[#D4A024] text-white">
                  <Car className="w-4 h-4 mr-2" />
                  {t.rentNow}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
