import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface HeroProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    title: "Inteligência e Automação que Escala",
    subtitle: "Inteligência Artificial & Business Intelligence",
    description:
      "para sua dor. Construímos agentes de IA adaptáveis, dashboards que guiam decisões e integrações/automações que eliminam tarefas repetitivas. Entregamos ponta a ponta: do diagnóstico à operação rodando — self-hosted ou cloud, conforme o seu contexto.",
    tagline: "Isso é Data & AI Ops na prática.",
    cta: "Fale com a gente",
  },
  en: {
    title: "Intelligence & Automation that Scales",
    subtitle: "Artificial Intelligence & Business Intelligence",
    description:
      "for your pain points. We build adaptive AI agents, dashboards that guide decisions, and integrations/automations that eliminate repetitive tasks. We deliver end-to-end: from diagnosis to running operations — self-hosted or cloud, according to your context.",
    tagline: "This is Data & AI Ops in practice.",
    cta: "Talk to us",
  },
};

export const Hero = ({ language }: HeroProps) => {
  const t = content[language];
  const whatsappUrl = "https://wa.me/5531988963436";

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-glow-pulse" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {t.title}
          </h1>
          
          <div className="space-y-4">
            <p className="text-xl md:text-2xl">
              <span className="text-gradient font-bold">{t.subtitle}</span>{" "}
              {t.description}
            </p>
            <p className="text-lg md:text-xl font-semibold text-primary">
              {t.tagline}
            </p>
          </div>

          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="gap-2 text-lg px-8 py-6 glow-effect"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                {t.cta}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
