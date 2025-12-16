import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Car as CarIcon,
  Users,
  Gauge,
  Check,
  Search,
  Filter,
  Loader2,
  MailQuestion,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { api } from "../../lib/api";
import { toast } from "sonner";
import { InquiryDialog } from "../InquiryDialog";

interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  seats: number;
  transmission: string;
  image: string;
  features: string[];
  isActive: boolean;
}

export function RentCarPage() {
  const { t } = useLanguage();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTransmission, setSelectedTransmission] = useState("all");
  const [selectedSeats, setSelectedSeats] = useState("all");

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const data = await api.get("/cars");
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        toast.error("Could not load cars");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesName = car.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        car.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesTransmission =
        selectedTransmission === "all" ||
        car.transmission.toLowerCase() === selectedTransmission.toLowerCase();
      const matchesSeats =
        selectedSeats === "all" || car.seats === parseInt(selectedSeats);
      return (
        matchesName && matchesCategory && matchesTransmission && matchesSeats
      );
    });
  }, [cars, searchName, selectedCategory, selectedTransmission, selectedSeats]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="mb-4 text-4xl font-bold text-[#1B4965]">
            {t.rentCarTitle}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.rentCarSubtitle}</p>
        </div>

        <div className="max-w-7xl mx-auto mb-10">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-[#1B4965] font-semibold">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search car model..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedTransmission}
                onValueChange={setSelectedTransmission}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Transmission</SelectItem>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSeats} onValueChange={setSelectedSeats}>
                <SelectTrigger>
                  <SelectValue placeholder="Seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Seats</SelectItem>
                  <SelectItem value="2">2 Seats</SelectItem>
                  <SelectItem value="4">4 Seats</SelectItem>
                  <SelectItem value="5">5 Seats</SelectItem>
                  <SelectItem value="7">7 Seats</SelectItem>
                  <SelectItem value="9">9 Seats</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#1B4965]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <Card
                  key={car.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-[#E8A628] text-white capitalize shadow-sm">
                      {car.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-[#1B4965]">
                      {car.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded text-xs font-medium text-gray-600">
                        <Users className="w-3.5 h-3.5" />
                        {car.seats} {t.seats}
                      </span>
                      <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded text-xs font-medium text-gray-600 capitalize">
                        <Gauge className="w-3.5 h-3.5" />
                        {car.transmission}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Features
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {car.features.slice(0, 4).map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 text-sm text-gray-600"
                          >
                            <Check className="w-3.5 h-3.5 text-[#E8A628]" />
                            <span className="truncate max-w-[120px]">
                              {feature.trim()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 border-t border-gray-50 p-6">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-[#1B4965]">
                          €{car.price}
                        </span>
                        <span className="text-xs text-gray-400">
                          / {t.perDay}
                        </span>
                      </div>

                      <Button
                        onClick={() => setSelectedCar(car)}
                        className="bg-[#E8A628] hover:bg-[#D4A024] text-white gap-2"
                      >
                        <MailQuestion className="w-4 h-4" />
                        Inquiry
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-200">
                <CarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">
                  No cars found
                </h3>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchName("");
                    setSelectedCategory("all");
                    setSelectedTransmission("all");
                    setSelectedSeats("all");
                  }}
                  className="mt-2 text-[#E8A628]"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        )}

        {selectedCar && (
          <InquiryDialog
            isOpen={!!selectedCar}
            onClose={() => setSelectedCar(null)}
            itemType="car"
            itemId={selectedCar.id}
            itemTitle={selectedCar.name}
          />
        )}
      </div>
    </div>
  );
}
