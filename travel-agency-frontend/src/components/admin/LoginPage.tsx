import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Pobieramy status logowania z kontekstu
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // 1. OCHRONA: Jeśli trwa sprawdzanie sesji, nie pokazuj jeszcze formularza (unikniesz mignięcia)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#1B4965]" />
      </div>
    );
  }

  // 2. PRZEKIEROWANIE: Jeśli użytkownik jest już zalogowany, wyrzuć go do panelu
  if (isAuthenticated) {
    return <Navigate to="/backoffice/tours" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast.success('Login successful');
      // Tutaj nie musimy robić navigate(), bo zmieni się isAuthenticated na true
      // i powyższy warunek (pkt 2) automatycznie przekieruje.
    } catch (error) {
      toast.error('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <div className="flex justify-center mb-4">
             {/* Możesz tu dodać logo, jeśli chcesz */}
          </div>
          <CardTitle className="text-center text-[#1B4965] text-2xl font-bold">
            Backoffice Login
          </CardTitle>
          <p className="text-center text-gray-500 text-sm">
            Sign in to manage your travel agency
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input 
                placeholder="Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
                className="bg-white"
              />
            </div>
            <Button type="submit" className="w-full bg-[#1B4965] hover:bg-[#153a50] text-white font-semibold py-2">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
