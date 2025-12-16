import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { api } from "../../lib/api";
import { toast } from "sonner";

export function NewsletterPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interests: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/newsletter/subscribe", formData);
      setSubmitted(true);
      toast.success("Successfully subscribed!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const interests = [
    { id: "adventure", label: t.adventureTravel },
    { id: "luxury", label: t.luxuryTravel },
    { id: "cultural", label: t.culturalTours },
    { id: "beach", label: t.beachVacations },
    { id: "city", label: t.cityBreaks },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="mb-4">{t.subscriptionSuccess}</h2>
            <p className="text-gray-600 mb-8">
              We'll send you exclusive travel deals and inspiration straight to
              your inbox.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  interests: [],
                });
              }}
              className="bg-[#E8A628] hover:bg-[#D4A024] text-white"
            >
              {t.subscribeNow} Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-72 rounded-2xl overflow-hidden mb-12 shadow-xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzbGV0dGVyJTIwZW1haWx8ZW58MXx8fHwxNzYyMDg1MTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Newsletter"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B4965]/90 to-[#E8A628]/90 flex flex-col items-center justify-center p-6 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {t.newsletterTitle}
              </h1>
              <p className="text-white/95 text-lg max-w-2xl font-medium drop-shadow-md">
                {t.newsletterSubtitle}
              </p>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t.subscribe}</CardTitle>
              <CardDescription>
                Get the latest travel deals, tips, and destination guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t.firstName}</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t.lastName}</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="pb-2">{t.interests}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {interests.map((interest) => (
                      <div
                        key={interest.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={interest.id}
                          checked={formData.interests.includes(interest.id)}
                          onCheckedChange={() => toggleInterest(interest.id)}
                          disabled={isSubmitting}
                        />
                        <label
                          htmlFor={interest.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {interest.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E8A628] hover:bg-[#D4A024] text-white py-6 text-lg"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Mail className="w-5 h-5 mr-2" />
                  )}
                  {t.subscribeNow}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
