import { Card } from "@/components/ui/card";
import { Cloud, Code, Cpu } from "lucide-react";

interface StackSectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    title: "Stack & Infra que não te deixa na mão",
    categories: [
      {
        icon: Cloud,
        label: "Self-hosted e Cloud-Hybrid",
      },
      {
        icon: Code,
        label: "Dev & Data",
      },
      {
        icon: Cpu,
        label: "AI Engineering",
      },
    ],
    description:
      "LLMs de mercado, RAG, vetores, avaliação de respostas, observabilidade, segurança e escala. Nós priorizamos modelo certo para o seu caso e arquitetura sob medida.",
  },
  en: {
    title: "Stack & Infrastructure that won't let you down",
    categories: [
      {
        icon: Cloud,
        label: "Self-hosted & Cloud-Hybrid",
      },
      {
        icon: Code,
        label: "Dev & Data",
      },
      {
        icon: Cpu,
        label: "AI Engineering",
      },
    ],
    description:
      "Market LLMs, RAG, vectors, response evaluation, observability, security and scale. We prioritize the right model for your case and custom architecture.",
  },
};

export const StackSection = ({ language }: StackSectionProps) => {
  const t = content[language];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t.title}
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {t.categories.map((category, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border text-center hover:border-secondary transition-colors duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-4 rounded-lg bg-secondary/10 mb-4">
                  <category.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold">{category.label}</h3>
              </Card>
            ))}
          </div>
          
          <Card className="p-8 bg-card border-border animate-fade-in">
            <p className="text-lg text-center">{t.description}</p>
          </Card>
        </div>
      </div>
    </section>
  );
};
