import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { LogOut, Car, Plane, Shield, Mail, MessageSquare } from 'lucide-react'; // <--- Dodano MessageSquare

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/backoffice/tours', label: 'Tours', icon: Plane },
    { path: '/backoffice/cars', label: 'Cars', icon: Car },
    // { path: '/backoffice/insurance', label: 'Insurance', icon: Shield },
    { path: '/backoffice/newsletter', label: 'Newsletter', icon: Mail },
    { path: '/backoffice/reviews', label: 'Reviews', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-[#1B4965]">Pinguino Admin</h1>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link to={item.path} key={item.path}>
                <Button 
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className={`gap-2 ${isActive(item.path) ? "bg-[#1B4965]/10 text-[#1B4965]" : "text-gray-600"}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <Button variant="outline" onClick={handleLogout} className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 container mx-auto max-w-7xl">
        <Outlet /> 
      </main>
    </div>
  );
}
