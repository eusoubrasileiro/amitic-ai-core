import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessagesSquare, ArrowRight } from "lucide-react";

interface WahubFeatureSectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    title: "WaHub",
    headline: "Seu time inteiro atendendo no mesmo número do WhatsApp",
    body: "O CRM WhatsApp-first para PMEs. Um agente de IA qualifica cada lead que chega, organiza no funil e passa o bastão para o vendedor — que responde pelo navegador, junto com o resto do time, no mesmo número que a empresa já usa. Você não troca de número: o WhatsApp Business continua funcionando no celular.",
    cta: "Conhecer o WaHub",
  },
  en: {
    title: "WaHub",
    headline: "Your whole team, answering on one WhatsApp number",
    body: "The WhatsApp-first CRM for small and mid-sized businesses. An AI agent qualifies every inbound lead, files it in the pipeline, and hands it to a salesperson — who replies from the browser, alongside the rest of the team, on the number the company already uses. No number change: your WhatsApp Business app keeps working on the phone.",
    cta: "Meet WaHub",
  },
};

export const WahubFeatureSection = ({ language }: WahubFeatureSectionProps) => {
  const t = content[language];
  const wahubUrl = "https://wahub.amiticia.cc";

  return (
    <section id="wahub" className="py-20 relative scroll-mt-20">
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
                <MessagesSquare className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold">{t.headline}</h3>
                <p className="text-lg text-muted-foreground">{t.body}</p>
                <div className="pt-2">
                  <Button asChild size="lg" className="gap-2 glow-effect">
                    <a href={wahubUrl} target="_blank" rel="noopener noreferrer">
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
