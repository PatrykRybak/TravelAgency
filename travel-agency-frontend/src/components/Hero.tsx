import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import heroImage from 'figma:asset/c397f7c42a3845d70d50a4bda08cf94b8dfb1a8f.png';

export function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-screen flex items-center justify-center shadow-xl" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroImage}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B4965]/50 via-black/30 to-[#1B4965]/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="mb-6 max-w-4xl mx-auto text-4xl font-bold">
          {t.heroTitle}
        </h1>
        <p className="mb-12 max-w-3xl mx-auto text-xl md:text-xl">
          {t.heroSubtitle}
        </p>

        {/* Search form */}
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <Input
                type="text"
                placeholder={t.where}
                className="border-0 bg-transparent p-0 focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <Input
                type="date"
                placeholder={t.startDate}
                className="border-0 bg-transparent p-0 focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <Input
                type="date"
                placeholder={t.endDate}
                className="border-0 bg-transparent p-0 focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <Input
                type="number"
                min="1"
                placeholder={t.guests}
                className="border-0 bg-transparent p-0 focus-visible:ring-0"
              />
            </div>
            <Button className="h-full bg-[#E8A628] hover:bg-[#D4A024] text-white">
              <Search className="w-5 h-5 mr-2" />
              {t.search}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
