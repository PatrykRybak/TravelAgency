import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLanguage } from "../contexts/LanguageContext";
import heroImage from "figma:asset/c397f7c42a3845d70d50a4bda08cf94b8dfb1a8f.png";

export function Hero() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    location: "",
    startDate: "",
    endDate: "",
    guests: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchParams.location) params.append("location", searchParams.location);
    if (searchParams.startDate)
      params.append("startDate", searchParams.startDate);
    if (searchParams.endDate) params.append("endDate", searchParams.endDate);
    if (searchParams.guests) params.append("guests", searchParams.guests);

    navigate(`/travels?${params.toString()}`);
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center shadow-xl"
      id="home"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B4965]/50 via-black/30 to-[#1B4965]/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="mb-6 max-w-4xl mx-auto text-4xl font-bold text-white">
          {t.heroTitle}
        </h1>
        <p className="mb-12 max-w-3xl mx-auto text-xl md:text-xl text-white">
          {t.heroSubtitle}
        </p>

        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-6">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-transparent focus-within:border-[#E8A628] transition-colors">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <Input
                type="text"
                placeholder={t.where}
                value={searchParams.location}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, location: e.target.value })
                }
                className="border-0 bg-transparent p-0 focus-visible:ring-0 text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-transparent focus-within:border-[#E8A628] transition-colors">
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
                className="border-0 bg-transparent p-0 focus-visible:ring-0 text-gray-800 placeholder:text-gray-400 [&::-webkit-calendar-picker-indicator]:hidden cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-transparent focus-within:border-[#E8A628] transition-colors">
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
                  setSearchParams({ ...searchParams, endDate: e.target.value })
                }
                className="border-0 bg-transparent p-0 focus-visible:ring-0 text-gray-800 placeholder:text-gray-400 [&::-webkit-calendar-picker-indicator]:hidden cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-transparent focus-within:border-[#E8A628] transition-colors">
              <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <Input
                type="number"
                min="1"
                placeholder={t.guests}
                value={searchParams.guests}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, guests: e.target.value })
                }
                className="border-0 bg-transparent p-0 focus-visible:ring-0 text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <Button
              type="submit"
              className="h-full bg-[#E8A628] hover:bg-[#D4A024] text-white text-lg font-medium"
            >
              <Search className="w-5 h-5 mr-2" />
              {t.search}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
