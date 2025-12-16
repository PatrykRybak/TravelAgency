import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { PdfPackageCard } from "../pdfPackageCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Filter, MapPin, Calendar, Users, Search, Loader2 } from "lucide-react";
import { api } from "../../lib/api";
import { toast } from "sonner";

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
  region?: string;
}

export function TravelsPage() {
  const { t } = useLanguage();
  const [urlParams, setUrlParams] = useSearchParams();

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useState({
    location: urlParams.get("location") || "",
    startDate: urlParams.get("startDate") || "",
    endDate: urlParams.get("endDate") || "",
    guests: urlParams.get("guests") || "",
  });

  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const fetchTours = async (overrideParams?: typeof searchParams) => {
    setLoading(true);
    try {
      const paramsToUse = overrideParams || searchParams;

      const params = new URLSearchParams();
      if (paramsToUse.location) params.append("q", paramsToUse.location);
      if (paramsToUse.startDate)
        params.append("startDate", paramsToUse.startDate);
      if (paramsToUse.endDate) params.append("endDate", paramsToUse.endDate);
      if (paramsToUse.guests) params.append("guests", paramsToUse.guests);

      const data = await api.get(`/tours?${params.toString()}`);
      setTours(data);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
      toast.error("Could not load tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTours();

    const newUrlParams = new URLSearchParams();
    if (searchParams.location)
      newUrlParams.set("location", searchParams.location);
    if (searchParams.startDate)
      newUrlParams.set("startDate", searchParams.startDate);
    if (searchParams.endDate) newUrlParams.set("endDate", searchParams.endDate);
    if (searchParams.guests) newUrlParams.set("guests", searchParams.guests);
    setUrlParams(newUrlParams);
  };

  const handleClearFilters = async () => {
    setSearchParams({ location: "", startDate: "", endDate: "", guests: "" });
    setSelectedRegion("all");
    setUrlParams({});

    setLoading(true);
    try {
      const data = await api.get("/tours");
      setTours(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to reset list");
    } finally {
      setLoading(false);
    }
  };

  const processedTours = useMemo(() => {
    let result = [...tours];

    if (selectedRegion !== "all") {
      result = result.filter((tour) => {
        const regionLower = selectedRegion.toLowerCase();
        return tour.region?.toLowerCase() === regionLower;
      });
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "priceLow":
          return a.price - b.price;
        case "priceHigh":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return result;
  }, [tours, selectedRegion, sortBy]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="mb-4 text-4xl font-bold text-[#1B4965]">
            {t.allDestinations}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.destinationsSubtitle}
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-6xl mx-auto mb-8">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl shadow-lg p-4 md:p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus-within:border-[#E8A628] transition-colors">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder={t.where}
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus-within:border-[#E8A628] transition-colors">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type={searchParams.startDate ? "date" : "text"}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  placeholder={t.startDate}
                  value={searchParams.startDate}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      startDate: e.target.value,
                    })
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 text-gray-600 placeholder:text-gray-400 [&::-webkit-calendar-picker-indicator]:hidden cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus-within:border-[#E8A628] transition-colors">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type={searchParams.endDate ? "date" : "text"}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  placeholder={t.endDate}
                  value={searchParams.endDate}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      endDate: e.target.value,
                    })
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 text-gray-600 placeholder:text-gray-400 [&::-webkit-calendar-picker-indicator]:hidden cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus-within:border-[#E8A628] transition-colors">
                <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <Input
                  type="number"
                  min="1"
                  placeholder={t.guests}
                  value={searchParams.guests}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, guests: e.target.value })
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-400"
                />
              </div>

              <Button
                type="submit"
                className="h-full w-full bg-[#E8A628] hover:bg-[#D4A024] text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all"
              >
                <Search className="w-5 h-5 mr-2" />
                {t.searchTrips}
              </Button>
            </div>
          </form>
        </div>

        {/* FRONTEND FILTERS */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
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
                  <SelectItem value="southAmerica">South America</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {t.sortBy}:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[200px] border-gray-200">
                  <SelectValue placeholder={t.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Date (Default)</SelectItem>
                  <SelectItem value="priceLow">{t.priceLowToHigh}</SelectItem>
                  <SelectItem value="priceHigh">{t.priceHighToLow}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* RESULTS GRID */}
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
                    id={String(tour.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No trips found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search criteria or filters.
                  </p>
                  <Button
                    variant="link"
                    onClick={handleClearFilters}
                    className="mt-2 text-[#E8A628]"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>

            {!loading && processedTours.length > 0 && (
              <div className="mt-8 flex justify-center items-center gap-2 text-sm text-gray-500">
                <span>Showing {processedTours.length} results</span>
                <span>•</span>
                <Button
                  variant="link"
                  onClick={handleClearFilters}
                  className="h-auto p-0 text-[#E8A628] hover:text-[#d49622] hover:no-underline font-medium"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
