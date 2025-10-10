import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface CTASectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    title: "Vamos começar?",
    description:
      "Fale conosco para um diagnóstico objetivo: o que ativar primeiro, qual ROI esperar e qual o MVP mais rápido de colocar na rua.",
    cta: "Fale conosco",
  },
  en: {
    title: "Let's get started?",
    description:
      "Talk to us for an objective diagnosis: what to activate first, what ROI to expect and what's the fastest MVP to deploy.",
    cta: "Talk to us on WhatsApp",
  },
};

export const CTASection = ({ language }: CTASectionProps) => {
  const t = content[language];
  const whatsappUrl = "https://wa.me/5531988963436";

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">{t.title}</h2>
          
          <p className="text-xl text-muted-foreground">{t.description}</p>

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
