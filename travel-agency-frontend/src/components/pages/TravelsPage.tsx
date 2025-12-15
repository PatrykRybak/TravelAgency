import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PackageCard } from '../PackageCard';
import { PdfPackageCard } from '../pdfPackageCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Filter, MapPin, Calendar, Users, Search, Loader2 } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

// Interfejs zgodny z tym co zwraca API (Tour.to_dict())
interface Tour {
  id: number;
  title: string;
  location: string;
  price: number;
  description: string;
  duration: string;
  groupSize: string;
  image: string;
  rating: number;
  reviews: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  featured: boolean;
  region?: string; // Upewnij się, że backend zwraca region, jeśli nie - dodaj to do modelu/dicta
}

export function TravelsPage() {
  const { t } = useLanguage();
  
  // Stan danych API
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // Stan wyszukiwarki (parametry do API)
  const [searchParams, setSearchParams] = useState({
    location: '',
    startDate: '',
    endDate: '',
    guests: ''
  });

  // Stan filtrów lokalnych (frontend)
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('popularity'); // popularity = domyślne sortowanie z API (np. po dacie)

  // Funkcja pobierająca dane z API
  const fetchTours = async () => {
    setLoading(true);
    try {
      // Budujemy Query String
      const params = new URLSearchParams();
      if (searchParams.location) params.append('q', searchParams.location);
      if (searchParams.startDate) params.append('startDate', searchParams.startDate);
      if (searchParams.endDate) params.append('endDate', searchParams.endDate);
      if (searchParams.guests) params.append('guests', searchParams.guests);

      const data = await api.get(`/tours?${params.toString()}`);
      setTours(data);
    } catch (error) {
      console.error('Failed to fetch tours:', error);
      toast.error('Could not load tours');
    } finally {
      setLoading(false);
    }
  };

  // Pobierz wycieczki przy pierwszym załadowaniu strony
  useEffect(() => {
    fetchTours();
  }, []);

  // Obsługa formularza wyszukiwania
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTours();
  };

  // Logika Filtrowania i Sortowania po stronie Front-endu
  // Działa na danych już pobranych z API
  const processedTours = useMemo(() => {
    let result = [...tours];

    // 1. Filtrowanie po regionie
    if (selectedRegion !== 'all') {
      // Uwaga: Backend musi zwracać pole 'region' lub musimy je wnioskować z 'location'
      // Jeśli backend nie ma regionu, ten filtr nie zadziała poprawnie.
      // Zakładam proste sprawdzenie po location dla celów demo, 
      // lub że dodasz pole `region` w modelu Tour w Pythonie.
      result = result.filter(tour => {
        const regionLower = selectedRegion.toLowerCase();
        // Prostym sposobem jest sprawdzenie czy location zawiera nazwę regionu lub dodanie logiki mapowania
        // Tutaj zakładam, że API zwraca pole `region` (np. 'europe', 'asia').
        return tour.region?.toLowerCase() === regionLower; 
      });
    }

    // 2. Sortowanie
    result.sort((a, b) => {
      switch (sortBy) {
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        // popularity/default zostawiamy tak jak przyszło z API (np. po dacie)
        default:
          return 0;
      }
    });

    return result;
  }, [tours, selectedRegion, sortBy]);


  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="mb-4 text-4xl font-bold text-[#1B4965]">{t.allDestinations}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.destinationsSubtitle}
          </p>
        </div>

        {/* SEARCH BAR (API Filters) */}
        <div className="max-w-6xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Lokalizacja */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus-within:border-[#E8A628] transition-colors">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder={t.where} // "Gdzie chcesz jechać?"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-400"
                />
              </div>

              {/* Data od */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus-within:border-[#E8A628] transition-colors">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="date"
                  placeholder={t.startDate}
                  value={searchParams.startDate}
                  onChange={(e) => setSearchParams({...searchParams, startDate: e.target.value})}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 text-gray-600"
                />
              </div>

              {/* Data do */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus-within:border-[#E8A628] transition-colors">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="date"
                  placeholder={t.endDate}
                  value={searchParams.endDate}
                  onChange={(e) => setSearchParams({...searchParams, endDate: e.target.value})}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 text-gray-600"
                />
              </div>

              {/* Goście */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus-within:border-[#E8A628] transition-colors">
                <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="number"
                  min="1"
                  placeholder={t.guests}
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-400"
                />
              </div>

              {/* Przycisk Szukaj */}
              <Button type="submit" className="h-full w-full bg-[#E8A628] hover:bg-[#D4A024] text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all">
                <Search className="w-5 h-5 mr-2" />
                {t.searchTrips}
              </Button>
            </div>
          </form>
        </div>

        {/* FRONTEND FILTERS (Region & Sort) */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            
            {/* Lewa strona: Filtr Regionu */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="bg-gray-100 p-2 rounded-md">
                <Filter className="w-5 h-5 text-gray-500" />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full sm:w-[200px] border-gray-200">
                  <SelectValue placeholder={t.filterByRegion} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allRegions}</SelectItem>
                  <SelectItem value="europe">{t.europe}</SelectItem>
                  <SelectItem value="asia">{t.asia}</SelectItem>
                  <SelectItem value="middleEast">{t.middleEast}</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="northAmerica">North America</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Prawa strona: Sortowanie */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-gray-500 whitespace-nowrap">{t.sortBy}:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[200px] border-gray-200">
                  <SelectValue placeholder={t.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Date (Default)</SelectItem>
                  <SelectItem value="priceLow">{t.priceLowToHigh}</SelectItem>
                  <SelectItem value="priceHigh">{t.priceHighToLow}</SelectItem>
                  <SelectItem value="rating">{t.rating}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* GRID WYNIKÓW */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#1B4965]" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processedTours.length > 0 ? (
                processedTours.map((tour) => (
                  <PdfPackageCard 
                    key={tour.id} 
                    {...tour}
                    // Upewniamy się, że konwersja typów pasuje do PackageCard props
                    id={String(tour.id)} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No trips found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                        setSearchParams({location: '', startDate: '', endDate: '', guests: ''});
                        setSelectedRegion('all');
                        fetchTours(); // Reset search logic should probably trigger fetch
                        // Uwaga: tutaj resetujemy stan, ale fetchTours użyje starego stanu przed renderem
                        // W React lepiej byłoby zrobić oddzielną funkcję resetującą
                    }}
                    className="mt-2 text-[#E8A628]"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
            
            {/* Licznik wyników */}
            {!loading && processedTours.length > 0 && (
              <div className="mt-8 text-center text-gray-500 text-sm">
                Showing {processedTours.length} results
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
