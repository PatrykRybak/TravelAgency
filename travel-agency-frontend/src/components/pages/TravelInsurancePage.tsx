import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, Shield } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function TravelInsurancePage() {
  const { t } = useLanguage();

  const plans = [
    {
      id: 'basic',
      name: t.basicPlan,
      price: 29,
      image: 'https://images.unsplash.com/photo-1650821414031-cf7291ce938c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBpbnN1cmFuY2UlMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc2MjA4NTEwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        { name: t.medicalCoverage, value: '€50,000' },
        { name: t.tripCancellation, value: '€2,000' },
        { name: t.baggageProtection, value: '€1,000' },
        { name: t.emergencyAssistance, value: t.included }
      ]
    },
    {
      id: 'standard',
      name: t.standardPlan,
      price: 59,
      featured: true,
      image: 'https://images.unsplash.com/photo-1650821414031-cf7291ce938c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBpbnN1cmFuY2UlMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc2MjA4NTEwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        { name: t.medicalCoverage, value: '€100,000' },
        { name: t.tripCancellation, value: '€5,000' },
        { name: t.baggageProtection, value: '€2,500' },
        { name: t.emergencyAssistance, value: t.included }
      ]
    },
    {
      id: 'premium',
      name: t.premiumPlan,
      price: 99,
      image: 'https://images.unsplash.com/photo-1650821414031-cf7291ce938c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBpbnN1cmFuY2UlMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc2MjA4NTEwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        { name: t.medicalCoverage, value: '€250,000' },
        { name: t.tripCancellation, value: '€10,000' },
        { name: t.baggageProtection, value: '€5,000' },
        { name: t.emergencyAssistance, value: t.included }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="mb-4">{t.insuranceTitle}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.insuranceSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`overflow-hidden hover:shadow-xl transition-shadow ${
                plan.featured ? 'border-[#E8A628] border-2 scale-105' : ''
              }`}
            >
              {plan.featured && (
                <div className="bg-[#E8A628] text-white text-center py-2">
                  <Badge className="bg-white text-[#E8A628]">{t.featured}</Badge>
                </div>
              )}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5 text-[#E8A628]" />
                  {plan.name}
                </CardTitle>
                <CardDescription className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-[#1B4965]">€{plan.price}</span>
                    <span className="text-gray-500">/ {t.daily}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#E8A628] flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{feature.name}</p>
                        <p className="text-sm text-gray-600">{feature.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${
                    plan.featured 
                      ? 'bg-[#E8A628] hover:bg-[#D4A024]' 
                      : 'bg-[#1B4965] hover:bg-[#153749]'
                  } text-white`}
                >
                  {t.selectPlan}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
