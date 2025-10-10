import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Zap, Target } from "lucide-react";

interface BenefitsSectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    title: "O que você ganha",
    benefits: [
      {
        icon: TrendingUp,
        text: "Mais receita com prospecção e ofertas orientadas por dados",
      },
      {
        icon: TrendingDown,
        text: "Menos custo com automações e agentes que executam tarefas",
      },
      {
        icon: Target,
        text: "Decisões rápidas com Power BI bem modelado e KPIs claros",
      },
      {
        icon: Zap,
        text: "Velocidade de entrega: containers, CI/CD e infraestrutura enxuta",
      },
    ],
  },
  en: {
    title: "What you gain",
    benefits: [
      {
        icon: TrendingUp,
        text: "More revenue with data-driven prospecting and offers",
      },
      {
        icon: TrendingDown,
        text: "Lower costs with automations (n8n) and task-executing agents",
      },
      {
        icon: Target,
        text: "Fast decisions with well-modeled Power BI and clear KPIs",
      },
      {
        icon: Zap,
        text: "Delivery speed: containers, CI/CD and lean infrastructure",
      },
    ],
  },
};

export const BenefitsSection = ({ language }: BenefitsSectionProps) => {
  const t = content[language];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {t.benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border hover:border-primary transition-colors duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg flex-1">{benefit.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
