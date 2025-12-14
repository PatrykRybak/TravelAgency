import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DestinationCard } from '../DestinationCard';
import { PackageCard } from '../PackageCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Filter, MapPin, Calendar, Users, Search } from 'lucide-react';

export function TravelsPage() {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const allDestinations = [
    {
      id: 'paris',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MTkwNzU3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.paris,
      location: t.france,
      rating: 4.8,
      tours: 15,
      price: 899,
      region: 'europe'
    },
    {
      id: 'santorini',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2V8ZW58MXx8fHwxNzYxOTMzNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.santorini,
      location: t.greece,
      rating: 4.9,
      tours: 12,
      price: 1299,
      region: 'europe'
    },
    {
      id: 'dubai',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmV8ZW58MXx8fHwxNzYxOTYxMDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.dubai,
      location: t.uae,
      rating: 4.7,
      tours: 18,
      price: 1599,
      region: 'middleEast'
    },
    {
      id: 'bali',
      image: 'https://images.unsplash.com/photo-1604394089666-6d365c060c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhJTIwdGVtcGxlfGVufDF8fHx8MTc2MTk4NzM2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.bali,
      location: t.indonesia,
      rating: 4.8,
      tours: 20,
      price: 999,
      region: 'asia'
    }
  ];

  const packages = [
    {
      id: 'swiss-alps',
      image: 'https://images.unsplash.com/photo-1633942515749-f93dddbbcff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzYxOTIwODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.swissAlps,
      duration: `7 ${t.days}`,
      groupSize: `${t.upTo} 12`,
      rating: 4.9,
      reviews: 234,
      price: 2499,
      description: t.swissAlpsDesc,
      featured: true
    },
    {
      id: 'mountain-explorer',
      image: 'https://images.unsplash.com/photo-1609373066983-cee8662ea93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjB0cmF2ZWwlMjBoaWtpbmd8ZW58MXx8fHwxNzYyMDA4ODgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.mountainExplorer,
      duration: `5 ${t.days}`,
      groupSize: `${t.upTo} 8`,
      rating: 4.7,
      reviews: 156,
      price: 1799,
      description: t.mountainExplorerDesc
    },
    {
      id: 'luxury-beach',
      image: 'https://images.unsplash.com/photo-1722409195473-d322e99621e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBwb29sfGVufDF8fHx8MTc2MTk5NDI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.luxuryBeach,
      duration: `10 ${t.days}`,
      groupSize: t.private,
      rating: 5.0,
      reviews: 298,
      price: 3999,
      description: t.luxuryBeachDesc,
      featured: true
    }
  ];

  const christmasPackages = [
    {
      id: 'christmas-lapland',
      image: 'https://images.unsplash.com/photo-1732213031042-2c9a88de6406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXBsYW5kJTIwY2hyaXN0bWFzJTIwd2ludGVyfGVufDF8fHx8MTc2MjA4NjUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.christmasInLapland,
      duration: `6 ${t.days}`,
      groupSize: `${t.upTo} 15`,
      rating: 5.0,
      reviews: 189,
      price: 2899,
      description: t.christmasInLaplandDesc,
      featured: true
    },
    {
      id: 'christmas-markets-germany',
      image: 'https://images.unsplash.com/photo-1544212415-8e3d2a27a944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBtYXJrZXQlMjBnZXJtYW55fGVufDF8fHx8MTc2MjI0NDQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.christmasMarketsGermany,
      duration: `5 ${t.days}`,
      groupSize: `${t.upTo} 20`,
      rating: 4.9,
      reviews: 312,
      price: 1699,
      description: t.christmasMarketsGermanyDesc,
      featured: true
    },
    {
      id: 'new-york-christmas',
      image: 'https://images.unsplash.com/photo-1703292938964-12599ba2a3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2hyaXN0bWFzJTIwbGlnaHRzfGVufDF8fHx8MTc2MjI0NDQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.newYorkChristmas,
      duration: `5 ${t.days}`,
      groupSize: t.private,
      rating: 4.8,
      reviews: 421,
      price: 2499,
      description: t.newYorkChristmasDesc,
      featured: true
    },
    {
      id: 'iceland-winter',
      image: 'https://images.unsplash.com/photo-1642362932918-e06b87fc185b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGljZWxhbmQlMjB3aW50ZXJ8ZW58MXx8fHwxNzYyMjQ0NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.icelandWinterWonderland,
      duration: `7 ${t.days}`,
      groupSize: `${t.upTo} 12`,
      rating: 5.0,
      reviews: 256,
      price: 3299,
      description: t.icelandWinterWonderlandDesc,
      featured: true
    },
    {
      id: 'prague-fairytale',
      image: 'https://images.unsplash.com/photo-1649855414146-df1647cf66f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmFndWUlMjBjaHJpc3RtYXMlMjBzbm93fGVufDF8fHx8MTc2MjI0NDQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.pragueFairyTale,
      duration: `4 ${t.days}`,
      groupSize: `${t.upTo} 18`,
      rating: 4.9,
      reviews: 298,
      price: 1399,
      description: t.pragueFairyTaleDesc,
      featured: true
    },
    {
      id: 'vienna-christmas',
      image: 'https://images.unsplash.com/photo-1566827833194-2e4b5626bd1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMG5ldyUyMHllYXIlMjBlaWZmZWwlMjB0b3dlcnxlbnwxfHx8fDE3NjIwODY1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: t.viennaChristmas,
      duration: `4 ${t.days}`,
      groupSize: `${t.upTo} 16`,
      rating: 4.8,
      reviews: 187,
      price: 1599,
      description: t.viennaChristmasDesc,
      featured: true
    }
  ];

  const filteredDestinations = allDestinations
    .filter(dest => selectedRegion === 'all' || dest.region === selectedRegion)
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return b.tours - a.tours;
      }
    });

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section with Search */}
        <div className="text-center mb-12">
          <h1 className="mb-4">{t.allDestinations}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {t.destinationsSubtitle}
          </p>

          {/* Search Form */}
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6 mb-12">
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
                {t.searchTrips}
              </Button>
            </div>
          </div>
        </div>

        {/* Christmas Holiday Packages Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="mb-4">{t.christmasHolidayPackages}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.christmasHolidayPackagesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {christmasPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="mb-4">{t.packagesTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.packagesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 flex-1">
            <Filter className="w-5 h-5 text-gray-400" />
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t.filterByRegion} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allRegions}</SelectItem>
                <SelectItem value="europe">{t.europe}</SelectItem>
                <SelectItem value="asia">{t.asia}</SelectItem>
                <SelectItem value="middleEast">{t.middleEast}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t.sortBy} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">{t.popularity}</SelectItem>
                <SelectItem value="priceLow">{t.priceLowToHigh}</SelectItem>
                <SelectItem value="priceHigh">{t.priceHighToLow}</SelectItem>
                <SelectItem value="rating">{t.rating}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* All Destinations Grid */}
        <div className="mb-12">
          <h2 className="mb-8 text-center">{t.destinationsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredDestinations.map((destination) => (
              <DestinationCard 
                key={destination.id}
                image={destination.image}
                title={destination.title}
                location={destination.location}
                rating={destination.rating}
                tours={destination.tours}
                price={destination.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
