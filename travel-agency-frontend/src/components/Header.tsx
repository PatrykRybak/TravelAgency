import { useState } from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
// Pamiętaj, aby ścieżka do logo była poprawna w Twoim projekcie
// Jeśli Vite krzyczy o błędzie importu, przenieś logo do folderu public
import logo from '../assets/2d27b71bc41de3ee10dd995aeef1ddee5fb7ea62.png'; 

interface HeaderProps {
  currentPage: string;
}

export function Header({ currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 border-b border-gray-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#1B4965]" />
              <span className="text-sm">+39 080 334 7928</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#1B4965]" />
              <span className="text-sm">info@pinguino.it</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm hover:text-[#E8A628] transition-colors">
                  <Globe className="w-4 h-4" />
                  <span>{language === 'en' ? 'EN' : 'IT'}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('it')}>
                  Italiano
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Pinguino - Luci sul Mondo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/travels" 
              className={`hover:text-[#E8A628] transition-colors ${currentPage === 'travels' ? 'text-[#E8A628]' : ''}`}
            >
              {t.travels}
            </Link>
            <Link 
              to="/rent-car" 
              className={`hover:text-[#E8A628] transition-colors ${currentPage === 'rent-car' ? 'text-[#E8A628]' : ''}`}
            >
              {t.rentCar}
            </Link>
            {/* <Link 
              to="/insurance" 
              className={`hover:text-[#E8A628] transition-colors ${currentPage === 'insurance' ? 'text-[#E8A628]' : ''}`}
            >
              {t.travelInsurance}
            </Link> */}
            <Link 
              to="/our-story" 
              className={`hover:text-[#E8A628] transition-colors ${currentPage === 'our-story' ? 'text-[#E8A628]' : ''}`}
            >
              {t.ourStory}
            </Link>
            <Link 
              to="/newsletter" 
              className={`hover:text-[#E8A628] transition-colors ${currentPage === 'newsletter' ? 'text-[#E8A628]' : ''}`}
            >
              {t.newsletter}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/newsletter">
              <Button className="bg-[#E8A628] hover:bg-[#D4A024] text-white">
                {t.contactUs}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link 
                to="/travels" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-left hover:text-[#E8A628] transition-colors ${currentPage === 'travels' ? 'text-[#E8A628]' : ''}`}
              >
                {t.travels}
              </Link>
              <Link 
                to="/rent-car" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-left hover:text-[#E8A628] transition-colors ${currentPage === 'rent-car' ? 'text-[#E8A628]' : ''}`}
              >
                {t.rentCar}
              </Link>
              {/* <Link 
                to="/insurance" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-left hover:text-[#E8A628] transition-colors ${currentPage === 'insurance' ? 'text-[#E8A628]' : ''}`}
              >
                {t.travelInsurance}
              </Link> */}
              <Link 
                to="/our-story" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-left hover:text-[#E8A628] transition-colors ${currentPage === 'our-story' ? 'text-[#E8A628]' : ''}`}
              >
                {t.ourStory}
              </Link>
              <Link 
                to="/newsletter" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-left hover:text-[#E8A628] transition-colors ${currentPage === 'newsletter' ? 'text-[#E8A628]' : ''}`}
              >
                {t.newsletter}
              </Link>
              
              <Link to="/newsletter" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-[#E8A628] hover:bg-[#D4A024] text-white">
                  {t.contactUs}
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}