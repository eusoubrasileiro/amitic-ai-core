import { Card } from "@/components/ui/card";
import { Building2, Users } from "lucide-react";

interface AudienceSectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    title: "Para quem é",
    audiences: [
      {
        icon: Building2,
        description:
          "PMEs, E-commerce, SaaS, Indústria e Serviços B2B que querem crescer com IA sem depender de dezenas de ferramentas desconexas.",
      },
      {
        icon: Users,
        description:
          "Times que precisam de dashboards confiáveis (Power BI) e automação do 'trabalho invisível'.",
      },
    ],
  },
  en: {
    title: "Who is it for",
    audiences: [
      {
        icon: Building2,
        description:
          "SMEs, E-commerce, SaaS, Industry and B2B Services that want to grow with AI without depending on dozens of disconnected tools.",
      },
      {
        icon: Users,
        description:
          "Teams that need reliable dashboards (Power BI) and automation of the 'invisible work'.",
      },
    ],
  },
};

export const AudienceSection = ({ language }: AudienceSectionProps) => {
  const t = content[language];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t.title}
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {t.audiences.map((audience, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:border-secondary transition-colors duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-6">
                <div className="p-4 rounded-lg bg-secondary/10 flex-shrink-0">
                  <audience.icon className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-lg flex-1">{audience.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
