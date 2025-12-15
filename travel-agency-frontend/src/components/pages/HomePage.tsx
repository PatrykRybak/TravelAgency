import { useEffect, useState } from 'react';
import { Hero } from '../Hero';
import { DestinationCard } from '../DestinationCard';
import { TestimonialCard } from '../TestimonialCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { Plane, Shield, Headphones, Award, Loader2 } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

interface Tour {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  duration?: string;
}

interface Review {
  id: number;
  username: string;
  city: string;
  country: string;
  rating: number;
  comment: string;
}

export function HomePage() {
  const { t, language } = useLanguage();
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await api.get('/tours?featured=true');
        setFeaturedTours(data);
        const reviewsData = await api.get('/reviews');
        setTestimonials(reviewsData);
      } catch (e) {
        console.error(e);
        toast.error('Could not fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <>
      <Hero />

      {/* Why Choose Us */}
      <section className="py-12" id="featured">
        <div className="container mx-auto px-2">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-extrabold text-[#1B4965] tracking-tight">
              {t.whyChooseTitle}
            </h2>
            <p className="text-gray-600 text-auto max-w-2xl mx-auto">
              {t.whyChooseSubtitle}
            </p>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow border-t-4 border-[#E8A628]">
              <div className="w-16 h-16 bg-[#E8A628]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-[#E8A628]" />
              </div>
              <h3 className="mb-3 font-bold">{t.bestDestinations}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.bestDestinationsDesc}</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow border-t-4 border-[#1B4965]">
              <div className="w-16 h-16 bg-[#1B4965]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#1B4965]" />
              </div>
              <h3 className="mb-3 font-bold">{t.safeSecure}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.safeSecureDesc}</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow border-t-4 border-[#E8A628]">
              <div className="w-16 h-16 bg-[#E8A628]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-[#E8A628]" />
              </div>
              <h3 className="mb-3 font-bold">{t.support24}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.support24Desc}</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow border-t-4 border-[#1B4965]">
              <div className="w-16 h-16 bg-[#1B4965]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#1B4965]" />
              </div>
              <h3 className="mb-3 font-bold">{t.awardWinning}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.awardWinningDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED Section */}
      <section className="py-24" id="featured">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl md:text-4xl font-extrabold text-[#1B4965] tracking-tight">
              {t.destinationsTitle}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.destinationsSubtitle}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-[#E8A628]" />
            </div>
          ) : featuredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTours.map((tour) => (
                <DestinationCard 
                  key={tour.id} 
                  id={tour.id}
                  image={tour.image}
                  title={tour.title}
                  location={tour.location}
                  price={tour.price}
                  duration={tour.duration}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-xl">
              No featured tours available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-24" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl md:text-4xl font-extrabold text-[#1B4965] tracking-tight">
              {t.testimonialsTitle}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.testimonialsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{testimonials.length > 0 ? (
              testimonials.map((review) => (
                <TestimonialCard 
                  key={review.id}
                  id={String(review.id)}
                  name={review.username}
                  location={`${review.city}, ${review.country}`}
                  rating={review.rating}
                  text={review.comment}
                  initials={review.username.substring(0, 2).toUpperCase()}
                />
              ))
            ) : (
              // Fallback gdy brak opinii w bazie
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
