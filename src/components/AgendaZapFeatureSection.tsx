import { Card } from "@/components/ui/card";
import { Smartphone } from "lucide-react";

interface AgendaZapFeatureSectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    title: "AgendaZap",
    headline: "Agora você não precisa trocar de número",
    body: "Com o AgendaZap, seu agente de IA atende os clientes no mesmo número que você já usa no WhatsApp Business. O app continua funcionando normalmente e as mensagens se sincronizam automaticamente entre os dois.",
  },
  en: {
    title: "AgendaZap",
    headline: "Keep your number. Add AI.",
    body: "AgendaZap's booking agent runs on the same phone number you already use on WhatsApp Business — no migration, no lost contacts, no lost history. Messages sync both ways.",
  },
};

export const AgendaZapFeatureSection = ({ language }: AgendaZapFeatureSectionProps) => {
  const t = content[language];

  return (
    <section className="py-20 relative">
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
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold">{t.headline}</h3>
                <p className="text-lg text-muted-foreground">{t.body}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
