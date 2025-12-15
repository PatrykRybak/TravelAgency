import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { Loader2 } from 'lucide-react';

// Strony Publiczne
import { HomePage } from './components/pages/HomePage';
import { TravelsPage } from './components/pages/TravelsPage';
import { RentCarPage } from './components/pages/RentCarPage';
import { TravelInsurancePage } from './components/pages/TravelInsurancePage';
import { OurStoryPage } from './components/pages/OurStoryPage';
import { NewsletterPage } from './components/pages/NewsletterPage';

// Strony Admina
import { LoginPage } from './components/admin/LoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { ToursManager } from './components/admin/ToursManager';
import { NewsletterManager } from './components/admin/NewsletterManager';
import { ReviewsManager } from './components/admin/ReviewsManager';
import { CarsManager } from './components/admin/CarsManager';

// Wrapper chroniący trasy (Protected Route)
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // 1. Jeśli trwa sprawdzanie sesji, pokazujemy kręciołek
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1B4965]" />
      </div>
    );
  }

  // 2. Jeśli po sprawdzeniu nadal brak auth -> idź do logowania
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Jeśli OK -> wyświetl panel
  return <Outlet />;
}

// Layout dla strony publicznej (Header + Footer)
function PublicLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.substring(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={getCurrentPage()} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === TRASY PUBLICZNE === */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/travels" element={<PublicLayout><TravelsPage /></PublicLayout>} />
        <Route path="/rent-car" element={<PublicLayout><RentCarPage /></PublicLayout>} />
        <Route path="/insurance" element={<PublicLayout><TravelInsurancePage /></PublicLayout>} />
        <Route path="/our-story" element={<PublicLayout><OurStoryPage /></PublicLayout>} />
        <Route path="/newsletter" element={<PublicLayout><NewsletterPage /></PublicLayout>} />

        {/* === LOGOWANIE (Osobny adres) === */}
        <Route path="/login" element={<LoginPage />} />

        {/* === TRASY ADMINA (Chronione) === */}
        <Route element={<ProtectedRoute />}>
          <Route path="/backoffice" element={<AdminLayout />}>
            {/* Domyślnie przekieruj na wycieczki */}
            <Route index element={<Navigate to="/backoffice/tours" replace />} />
            
            <Route path="tours" element={<ToursManager />} />
            <Route path="reviews" element={<ReviewsManager />} />
            <Route path="cars" element={< CarsManager/>} />
            <Route path="insurance" element={<div className="p-8">Insurance Manager (Coming Soon)</div>} />
            <Route path="newsletter" element={<NewsletterManager />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}