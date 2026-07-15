import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, ArrowRight } from "lucide-react";

interface PatriciaFeatureSectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    title: "Patrícia",
    headline: "A primeira conversa, organizada para o advogado",
    body: "A Patrícia é a assistente de IA para escritórios de Direito de Família. Ela acolhe o cliente logo no primeiro contato pelo WhatsApp e transforma uma história cheia de emoção em fatos organizados para o advogado — sem dar consultoria jurídica e sem tirar o advogado do centro do atendimento.",
    cta: "Conhecer a Patrícia",
  },
  en: {
    title: "Patrícia",
    headline: "The first conversation, organized for the lawyer",
    body: "Patrícia is the AI intake assistant for family-law practices. She welcomes the client at the very first WhatsApp contact and turns an emotionally-loaded story into organized facts for the attorney — no legal advice, and without taking the lawyer out of the center of care.",
    cta: "Meet Patrícia",
  },
};

export const PatriciaFeatureSection = ({ language }: PatriciaFeatureSectionProps) => {
  const t = content[language];
  const patriciaUrl = "https://patricia.amiticia.cc";

  return (
    <section id="patricia" className="py-20 relative scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t.title}
        </h2>

        <div className="max-w-3xl mx-auto">
          <Card
            className="p-8 bg-card border-border hover:border-primary transition-colors duration-300 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold">{t.headline}</h3>
                <p className="text-lg text-muted-foreground">{t.body}</p>
                <div className="pt-2">
                  <Button asChild size="lg" className="gap-2 glow-effect">
                    <a href={patriciaUrl} target="_blank" rel="noopener noreferrer">
                      {t.cta}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
