import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent } from "../ui/card";
import { Award, Target, Eye, Heart, Lightbulb } from "lucide-react";
import officeImage from "figma:asset/aabcf01db39c500c3915ed76c978cd8918171ac4.png";

export function OurStoryPage() {
  const { t, language } = useLanguage();

  const values = [
    {
      id: "excellence",
      icon: Award,
      title: t.excellence,
      description: t.excellenceDesc,
    },
    {
      id: "integrity",
      icon: Heart,
      title: t.integrity,
      description: t.integrityDesc,
    },
    {
      id: "innovation",
      icon: Lightbulb,
      title: t.innovation,
      description: t.innovationDesc,
    },
    {
      id: "passion",
      icon: Heart,
      title: t.passion,
      description: t.passionDesc,
    },
  ];

  const storyText =
    language === "en"
      ? "Luci sul mondo was born in Molfetta from the passion for travel and the desire to help people discover the world with new eyes. For years we have guided our customers in choosing the most authentic experiences, whether it is a romantic weekend, a cultural tour or a great adventure abroad. We are an independent travel agency, attentive to every detail and always ready to listen to the needs of those who dream of their next destination. Our only goal is to transform every trip into a special memory, carefully crafted with competence, transparency and a smile. With Pinguino – Luci sul mondo, your next adventure begins here... in the heart of Molfetta, with your eyes on the world."
      : "Luci sul mondo nasce a Molfetta dalla passione per il viaggio e dal desiderio di aiutare le persone a scoprire il mondo con occhi nuovi. Da anni guidiamo i nostri clienti nella scelta delle esperienze più autentiche, che si tratti di un weekend romantico, un tour culturale o una grande avventura all'estero. Siamo un'agenzia di viaggi indipendente, attenta ad ogni dettaglio e sempre pronta ad ascoltare le esigenze di chi sogna la propria prossima destinazione. Il nostro unico obiettivo è trasformare ogni viaggio in un ricordo speciale, costruito con cura, competenza, trasparenza e sorriso. Con Pinguino – Luci sul mondo, la tua prossima avventura inizia qui... nel cuore di Molfetta, con gli occhi sul mondo.";

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="relative h-96 rounded-2xl overflow-hidden mb-16 shadow-xl">
          <img
            src={officeImage}
            alt="Pinguino - Luci sul mondo office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {t.ourStoryTitle}
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl font-medium drop-shadow-md">
              {t.ourStorySubtitle}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-[#1B4965] to-[#2C5F7E] text-white">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-gray-100">
                {storyText}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-[#1B4965] to-[#2C5F7E] text-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-[#E8A628]" />
                <h2 className="text-white font-semibold">{t.ourMission}</h2>
              </div>
              <p className="text-gray-100 leading-relaxed">
                {t.ourMissionText}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#E8A628] to-[#F5B341] text-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-[#1B4965]" />
                <h2 className="text-white font-semibold">{t.ourVision}</h2>
              </div>
              <p className="text-gray-900 leading-relaxed">{t.ourVisionText}</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="mb-4 text-lg font-bold">{t.ourValues}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.id}
                className="text-center hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#E8A628] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-4xl font-bold text-[#1B4965] mb-2">15+</div>
            <div className="text-gray-600">
              {language === "en" ? "Years Experience" : "Anni di Esperienza"}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#1B4965] mb-2">50K+</div>
            <div className="text-gray-600">
              {language === "en" ? "Happy Travelers" : "Viaggiatori Felici"}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#1B4965] mb-2">120+</div>
            <div className="text-gray-600">
              {language === "en" ? "Destinations" : "Destinazioni"}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#1B4965] mb-2">98%</div>
            <div className="text-gray-600">
              {language === "en"
                ? "Satisfaction Rate"
                : "Tasso di Soddisfazione"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
