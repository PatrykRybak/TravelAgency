import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    help: 'Help',
    support: 'Support',
    travels: 'Travels',
    rentCar: 'Rent Car',
    travelInsurance: 'Travel Insurance',
    ourStory: 'Our Story',
    newsletter: 'Newsletter',
    contactUs: 'Contact Us',
    
    // Hero
    heroTitle: 'Your Next Adventure Starts Here',
    heroSubtitle: 'Explore amazing destinations around the world with our curated travel packages and personalized experiences',
    where: 'Where?',
    startDate: 'Start Date',
    endDate: 'End Date',
    guests: 'Guests',
    search: 'Search',
    
    // Search Travels
    searchTrips: 'Search Trips',
    
    // Rent Car Form
    pickupLocation: 'Pickup Location',
    returnLocation: 'Return Location',
    pickupDate: 'Pickup Date',
    pickupTime: 'Pickup Time',
    returnDate: 'Return Date',
    returnTime: 'Return Time',
    searchCars: 'Search Cars',
    
    // Christmas Holiday Packages
    christmasHolidayPackages: 'Christmas Holiday Packages',
    christmasHolidayPackagesSubtitle: 'Celebrate the magic of Christmas with our exclusive holiday packages',
    christmasInLapland: 'Christmas in Lapland',
    christmasInLaplandDesc: 'Experience the magic of Christmas in the Arctic Circle with Santa Claus village visits and Northern Lights.',
    christmasMarketsGermany: 'Christmas Markets of Germany',
    christmasMarketsGermanyDesc: 'Discover the enchanting Christmas markets of Munich, Nuremberg and Rothenburg with mulled wine and festive lights.',
    newYorkChristmas: 'New York Christmas Magic',
    newYorkChristmasDesc: 'Ice skating at Rockefeller Center, Christmas window displays and the iconic Rockettes show.',
    icelandWinterWonderland: 'Iceland Winter Wonderland',
    icelandWinterWonderlandDesc: 'Chase the Northern Lights, relax in geothermal hot springs and explore ice caves during the magical winter season.',
    pragueFairyTale: 'Prague Fairytale Christmas',
    pragueFairyTaleDesc: 'Walk through snowy medieval streets, visit Christmas markets and enjoy traditional Czech holiday festivities.',
    viennaChristmas: 'Vienna Christmas Delight',
    viennaChristmasDesc: 'Experience classical concerts, imperial palaces decorated for the holidays and famous Viennese Christmas markets.',
    
    // Why Choose Us
    whyChooseTitle: 'Why Choose Pinguino',
    whyChooseSubtitle: 'We provide exceptional travel experiences with professional service and attention to detail',
    bestDestinations: 'Top Destinations',
    bestDestinationsDesc: 'Handpicked locations around the world for unforgettable experiences',
    safeSecure: 'Safe & Secure',
    safeSecureDesc: 'Your safety is our priority with comprehensive travel insurance',
    support24: '24/7 Support',
    support24Desc: 'Round-the-clock customer service for your peace of mind',
    awardWinning: 'Award Winning',
    awardWinningDesc: 'Recognized for excellence in travel services',
    
    // Destinations
    destinationsTitle: 'Featured Adventures',
    destinationsSubtitle: 'Explore our most sought-after destinations and start planning your dream vacation',
    from: 'From',
    toursAvailable: 'tours available',
    
    // Packages
    packagesTitle: 'Featured Tour Packages',
    packagesSubtitle: 'Carefully crafted tour packages designed to give you the best travel experience',
    featured: 'Featured',
    daily: 'Daily',
    viewDetails: 'View Details',
    days: 'days',
    upTo: 'Up to',
    private: 'Private',
    
    // Testimonials
    testimonialsTitle: 'What Our Clients Say',
    testimonialsSubtitle: 'Real experiences from travelers who have explored the world with us',
    
    // CTA
    ctaTitle: 'Ready to Start Your Journey?',
    ctaSubtitle: 'Contact us today and let our travel experts help you plan the perfect vacation',
    planMyTrip: 'Plan My Trip',
    contactUs: 'Contact Us',
    
    // Footer
    footerDescription: 'Your trusted partner for unforgettable travel experiences around the world.',
    quickLinks: 'Quick Links',
    aboutUs: 'About Us',
    destinations: 'Destinations',
    ourTeam: 'Our Team',
    careers: 'Careers',
    blog: 'Blog',
    supportTitle: 'Support',
    helpCenter: 'Help Center',
    faqs: 'FAQs',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    contactTitle: 'Get in Touch',
    subscribe: 'Subscribe to our newsletter',
    yourEmail: 'Your email',
    subscribeBtn: 'Subscribe',
    allRightsReserved: 'All rights reserved',
    
    // Locations
    paris: 'Paris',
    france: 'France',
    santorini: 'Santorini',
    greece: 'Greece',
    dubai: 'Dubai',
    uae: 'United Arab Emirates',
    bali: 'Bali',
    indonesia: 'Indonesia',
    
    // Package titles
    swissAlps: 'Swiss Alps Adventure',
    swissAlpsDesc: 'Experience the breathtaking beauty of the Swiss Alps with guided hikes and luxury accommodations.',
    mountainExplorer: 'Mountain Explorer',
    mountainExplorerDesc: 'Trek through stunning mountain landscapes and discover hidden trails with expert guides.',
    luxuryBeach: 'Luxury Beach Resort',
    luxuryBeachDesc: 'Indulge in ultimate relaxation at our exclusive beach resort with world-class amenities.',
    
    // Travels Page
    allDestinations: 'All Destinations',
    filterByRegion: 'Filter by Region',
    allRegions: 'All Regions',
    europe: 'Europe',
    asia: 'Asia',
    middleEast: 'Middle East',
    sortBy: 'Sort by',
    popularity: 'Popularity',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    rating: 'Rating',
    
    // Rent Car Page
    rentCarTitle: 'Rent a Car',
    rentCarSubtitle: 'Choose from our wide selection of vehicles for your journey',
    economy: 'Economy',
    compact: 'Compact',
    suv: 'SUV',
    luxury: 'Luxury',
    perDay: 'per day',
    seats: 'seats',
    automatic: 'Automatic',
    manual: 'Manual',
    rentNow: 'Rent Now',
    carFeatures: 'Features',
    airConditioning: 'Air Conditioning',
    gps: 'GPS Navigation',
    bluetooth: 'Bluetooth',
    insuranceIncluded: 'Insurance Included',
    
    // Insurance Page
    insuranceTitle: 'Travel Insurance',
    insuranceSubtitle: 'Travel with confidence with our comprehensive insurance plans',
    basicPlan: 'Basic Plan',
    standardPlan: 'Standard Plan',
    premiumPlan: 'Premium Plan',
    medicalCoverage: 'Medical Coverage',
    tripCancellation: 'Trip Cancellation',
    baggageProtection: 'Baggage Protection',
    emergencyAssistance: 'Emergency Assistance',
    selectPlan: 'Select Plan',
    included: 'Included',
    
    // Our Story Page
    ourStoryTitle: 'Our Story',
    ourStorySubtitle: 'Passionate about creating unforgettable travel experiences since 2010',
    ourMission: 'Our Mission',
    ourMissionText: 'To provide exceptional travel experiences that inspire and transform our clients, creating memories that last a lifetime.',
    ourVision: 'Our Vision',
    ourVisionText: 'To be the most trusted and innovative travel agency, connecting people with the wonders of the world.',
    ourValues: 'Our Values',
    excellence: 'Excellence',
    excellenceDesc: 'We strive for perfection in every detail',
    integrity: 'Integrity',
    integrityDesc: 'Honest and transparent in all we do',
    innovation: 'Innovation',
    innovationDesc: 'Always finding new ways to serve you better',
    passion: 'Passion',
    passionDesc: 'We love what we do and it shows',
    
    // Newsletter Page
    newsletterTitle: 'Stay Connected',
    newsletterSubtitle: 'Subscribe to get exclusive travel deals and inspiration delivered to your inbox',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    interests: 'Travel Interests',
    adventureTravel: 'Adventure Travel',
    luxuryTravel: 'Luxury Travel',
    culturalTours: 'Cultural Tours',
    beachVacations: 'Beach Vacations',
    cityBreaks: 'City Breaks',
    subscribeNow: 'Subscribe Now',
    subscriptionSuccess: 'Thank you for subscribing!',
    
    // Login Page
    login: 'Login',
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Login to access your bookings and exclusive offers',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    loginBtn: 'Login',
    noAccount: 'Don\'t have an account?',
    createAccount: 'Create account',
    orLoginWith: 'Or login with',
    emailAddress: 'Email Address',
    loginSuccess: 'Welcome back!',
    signUp: 'Sign Up',
    signUpTitle: 'Create Your Account',
    signUpSubtitle: 'Join us and start planning your dream vacation',
    alreadyHaveAccount: 'Already have an account?',
    signUpBtn: 'Sign Up',
  },
  it: {
    // Header
    help: 'Aiuto',
    support: 'Supporto',
    travels: 'Viaggi',
    rentCar: 'Noleggio Auto',
    travelInsurance: 'Assicurazione Viaggio',
    ourStory: 'Chi Siamo',
    newsletter: 'Newsletter',
    bookNow: 'Prenota Ora',
    
    // Hero
    heroTitle: 'La Tua Prossima Avventura Inizia Qui',
    heroSubtitle: 'Esplora destinazioni straordinarie in tutto il mondo con i nostri pacchetti viaggio personalizzati',
    where: 'Dove?',
    startDate: 'Data Inizio',
    endDate: 'Data Fine',
    guests: 'Ospiti',
    search: 'Cerca',
    
    // Search Travels
    searchTrips: 'Cerca Viaggi',
    
    // Rent Car Form
    pickupLocation: 'Luogo di Ritiro',
    returnLocation: 'Luogo di Consegna',
    pickupDate: 'Data di Ritiro',
    pickupTime: 'Ora di Ritiro',
    returnDate: 'Data di Consegna',
    returnTime: 'Ora di Consegna',
    searchCars: 'Cerca Auto',
    
    // Christmas Holiday Packages
    christmasHolidayPackages: 'Pacchetti Vacanze Natalizie',
    christmasHolidayPackagesSubtitle: 'Celebra la magia del Natale con i nostri pacchetti vacanza esclusivi',
    christmasInLapland: 'Natale in Lapponia',
    christmasInLaplandDesc: 'Vivi la magia del Natale nel Circolo Polare Artico con visite al villaggio di Babbo Natale e l\'Aurora Boreale.',
    christmasMarketsGermany: 'Mercatini di Natale in Germania',
    christmasMarketsGermanyDesc: 'Scopri gli incantevoli mercatini di Natale di Monaco, Norimberga e Rothenburg con vin brulé e luci festive.',
    newYorkChristmas: 'Magia del Natale a New York',
    newYorkChristmasDesc: 'Pattinaggio sul ghiaccio al Rockefeller Center, vetrine natalizie e lo spettacolo iconico delle Rockettes.',
    icelandWinterWonderland: 'Islanda Paese delle Meraviglie Invernale',
    icelandWinterWonderlandDesc: 'Caccia all\'Aurora Boreale, relax nelle sorgenti termali geotermiche ed esplora grotte di ghiaccio nella magica stagione invernale.',
    pragueFairyTale: 'Natale da Fiaba a Praga',
    pragueFairyTaleDesc: 'Passeggia per le strade medievali innevate, visita i mercatini di Natale e goditi le tradizionali festività ceche.',
    viennaChristmas: 'Delizie Natalizie a Vienna',
    viennaChristmasDesc: 'Vivi concerti classici, palazzi imperiali decorati per le feste e i famosi mercatini di Natale viennesi.',
    
    // Why Choose Us
    whyChooseTitle: 'Perché Scegliere Pinguino',
    whyChooseSubtitle: 'Offriamo esperienze di viaggio eccezionali con servizio professionale e attenzione ai dettagli',
    bestDestinations: 'Destinazioni Top',
    bestDestinationsDesc: 'Località selezionate in tutto il mondo per esperienze indimenticabili',
    safeSecure: 'Sicuro e Protetto',
    safeSecureDesc: 'La tua sicurezza è la nostra priorità con assicurazione completa',
    support24: 'Supporto 24/7',
    support24Desc: 'Servizio clienti continuo per la tua tranquillità',
    awardWinning: 'Premiati',
    awardWinningDesc: 'Riconosciuti per eccellenza nei servizi di viaggio',
    
    // Destinations
    destinationsTitle: 'Avventure in primo piano',
    destinationsSubtitle: 'Esplora le nostre destinazioni più ricercate e inizia a pianificare la vacanza dei tuoi sogni',
    from: 'Da',
    toursAvailable: 'tour disponibili',
    
    // Packages
    packagesTitle: 'Pacchetti Tour in Evidenza',
    packagesSubtitle: 'Pacchetti viaggio accuratamente progettati per offrirti la migliore esperienza',
    featured: 'In Evidenza',
    daily: 'Giornaliero',
    viewDetails: 'Dettagli',
    days: 'giorni',
    upTo: 'Fino a',
    private: 'Privato',
    
    // Testimonials
    testimonialsTitle: 'Cosa Dicono i Nostri Clienti',
    testimonialsSubtitle: 'Esperienze reali di viaggiatori che hanno esplorato il mondo con noi',
    
    // CTA
    ctaTitle: 'Pronto a Iniziare il Tuo Viaggio?',
    ctaSubtitle: 'Contattaci oggi e lascia che i nostri esperti di viaggi ti aiutino a pianificare la vacanza perfetta',
    planMyTrip: 'Pianifica il Mio Viaggio',
    contactUs: 'Contattaci',
    
    // Footer
    footerDescription: 'Il tuo partner fidato per esperienze di viaggio indimenticabili in tutto il mondo.',
    quickLinks: 'Link Rapidi',
    aboutUs: 'Chi Siamo',
    destinations: 'Destinazioni',
    ourTeam: 'Il Nostro Team',
    careers: 'Lavora con Noi',
    blog: 'Blog',
    supportTitle: 'Supporto',
    helpCenter: 'Centro Assistenza',
    faqs: 'FAQ',
    termsOfService: 'Termini di Servizio',
    privacyPolicy: 'Privacy Policy',
    contactTitle: 'Contattaci',
    subscribe: 'Iscriviti alla newsletter',
    yourEmail: 'La tua email',
    subscribeBtn: 'Iscriviti',
    allRightsReserved: 'Tutti i diritti riservati.',
    
    // Locations
    paris: 'Parigi',
    france: 'Francia',
    santorini: 'Santorini',
    greece: 'Grecia',
    dubai: 'Dubai',
    uae: 'Emirati Arabi',
    bali: 'Bali',
    indonesia: 'Indonesia',
    
    // Package titles
    swissAlps: 'Avventura nelle Alpi Svizzere',
    swissAlpsDesc: 'Vivi la bellezza mozzafiato delle Alpi Svizzere con escursioni guidate e sistemazioni di lusso.',
    mountainExplorer: 'Esploratore di Montagne',
    mountainExplorerDesc: 'Percorri paesaggi montani stupendi e scopri sentieri nascosti con guide esperte.',
    luxuryBeach: 'Resort di Lusso al Mare',
    luxuryBeachDesc: 'Concediti il massimo relax nel nostro resort esclusivo con servizi di classe mondiale.',
    
    // Travels Page
    allDestinations: 'Tutte le Destinazioni',
    filterByRegion: 'Filtra per Regione',
    allRegions: 'Tutte le Regioni',
    europe: 'Europa',
    asia: 'Asia',
    middleEast: 'Medio Oriente',
    sortBy: 'Ordina per',
    popularity: 'Popolarità',
    priceLowToHigh: 'Prezzo: Dal più basso',
    priceHighToLow: 'Prezzo: Dal più alto',
    rating: 'Valutazione',
    
    // Rent Car Page
    rentCarTitle: 'Noleggio Auto',
    rentCarSubtitle: 'Scegli dalla nostra ampia selezione di veicoli per il tuo viaggio',
    economy: 'Economy',
    compact: 'Compatta',
    suv: 'SUV',
    luxury: 'Lusso',
    perDay: 'al giorno',
    seats: 'posti',
    automatic: 'Automatico',
    manual: 'Manuale',
    rentNow: 'Noleggia Ora',
    carFeatures: 'Caratteristiche',
    airConditioning: 'Aria Condizionata',
    gps: 'Navigatore GPS',
    bluetooth: 'Bluetooth',
    insuranceIncluded: 'Assicurazione Inclusa',
    
    // Insurance Page
    insuranceTitle: 'Assicurazione Viaggio',
    insuranceSubtitle: 'Viaggia con tranquillità con i nostri piani assicurativi completi',
    basicPlan: 'Piano Base',
    standardPlan: 'Piano Standard',
    premiumPlan: 'Piano Premium',
    medicalCoverage: 'Copertura Medica',
    tripCancellation: 'Cancellazione Viaggio',
    baggageProtection: 'Protezione Bagagli',
    emergencyAssistance: 'Assistenza Emergenza',
    selectPlan: 'Seleziona Piano',
    included: 'Incluso',
    
    // Our Story Page
    ourStoryTitle: 'La Nostra Storia',
    ourStorySubtitle: 'Appassionati di creare esperienze di viaggio indimenticabili dal 2010',
    ourMission: 'La Nostra Missione',
    ourMissionText: 'Fornire esperienze di viaggio eccezionali che ispirano e trasformano i nostri clienti, creando ricordi che durano per sempre.',
    ourVision: 'La Nostra Visione',
    ourVisionText: 'Essere agenzia di viaggi più affidabile e innovativa, connettendo le persone con le meraviglie del mondo.',
    ourValues: 'I Nostri Valori',
    excellence: 'Eccellenza',
    excellenceDesc: 'Aspiriamo alla perfezione in ogni dettaglio',
    integrity: 'Integrità',
    integrityDesc: 'Onesti e trasparenti in tutto ciò che facciamo',
    innovation: 'Innovazione',
    innovationDesc: 'Sempre alla ricerca di nuovi modi per servirti meglio',
    passion: 'Passione',
    passionDesc: 'Amiamo ciò che facciamo e si vede',
    
    // Newsletter Page
    newsletterTitle: 'Resta Connesso',
    newsletterSubtitle: 'Iscriviti per ricevere offerte esclusive e ispirazione di viaggio nella tua casella di posta',
    firstName: 'Nome',
    lastName: 'Cognome',
    email: 'Email',
    interests: 'Interessi di Viaggio',
    adventureTravel: 'Viaggi Avventura',
    luxuryTravel: 'Viaggi di Lusso',
    culturalTours: 'Tour Culturali',
    beachVacations: 'Vacanze al Mare',
    cityBreaks: 'City Break',
    subscribeNow: 'Iscriviti Ora',
    subscriptionSuccess: 'Grazie per esserti iscritto!',
    
    // Login Page
    login: 'Accedi',
    loginTitle: 'Bentornato',
    loginSubtitle: 'Accedi per visualizzare le tue prenotazioni e offerte esclusive',
    password: 'Password',
    rememberMe: 'Ricordami',
    forgotPassword: 'Password dimenticata?',
    loginBtn: 'Accedi',
    noAccount: 'Non hai un account?',
    createAccount: 'Crea account',
    orLoginWith: 'Oppure accedi con',
    emailAddress: 'Indirizzo Email',
    loginSuccess: 'Bentornato!',
    signUp: 'Registrati',
    signUpTitle: 'Crea il Tuo Account',
    signUpSubtitle: 'Unisciti a noi e inizia a pianificare la vacanza dei tuoi sogni',
    alreadyHaveAccount: 'Hai già un account?',
    signUpBtn: 'Registrati',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
