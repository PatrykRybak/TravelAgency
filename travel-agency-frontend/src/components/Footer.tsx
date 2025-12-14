import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 pb-4">

          {/* Quick links */}
          <div className="flex-1 flex flex-col text-center">
            <h4 className="mb-4 text-lg font-bold text-[#E8A628]">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/travels" className="text-gray-400 hover:text-[#E8A628] transition-colors">
                  {t.travels}
                </Link>
              </li>
              <li>
                <Link to="/rent-car" className="text-gray-400 hover:text-[#E8A628] transition-colors">
                  {t.rentCar}
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="text-gray-400 hover:text-[#E8A628] transition-colors">
                  {t.travelInsurance}
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="text-gray-400 hover:text-[#E8A628] transition-colors">
                  {t.ourStory}
                </Link>
              </li>
              <li>
                <Link to="/newsletter" className="text-gray-400 hover:text-[#E8A628] transition-colors">
                  {t.newsletter}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1 flex flex-col">
            <h4 className="mb-4 text-lg font-bold text-[#E8A628]">{t.contactTitle}</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Via Muscati, 25/29, 70056 Molfetta BA, Italia</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+39 080 334 7928</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>info@pinguino.it</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Pinguino &bull; Luci sul Mondo &bull; {t.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
}
