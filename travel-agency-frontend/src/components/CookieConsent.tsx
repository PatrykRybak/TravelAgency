import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-4">
          <div className="p-2 bg-yellow-50 rounded-full shrink-0 hidden md:block">
            <Cookie className="w-6 h-6 text-[#E8A628]" />
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-bold text-gray-900 mb-1">Cookies 🍪</p>
            <p>
              We use cookies strictly for technical purposes essential for the
              website's operation (such as maintaining your login session). We
              do not collect, process, or share your personal data for marketing
              or analytics.
            </p>
          </div>
        </div>

        <Button
          onClick={handleAccept}
          className="bg-[#1B4965] hover:bg-[#153a52] text-white whitespace-nowrap min-w-[100px] shadow-sm"
        >
          OK
        </Button>
      </div>
    </div>
  );
}
