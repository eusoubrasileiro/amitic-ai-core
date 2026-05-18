import { Card } from "@/components/ui/card";

interface FounderSectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    title: "Quem constrói a AmiticIA",
    pitch:
      "Sou geofísico formado pela USP e desenvolvo software há mais de 20 anos — comecei com computação científica e de alto desempenho (HPC), e trabalhei para a Petrobras. Inteligência artificial não é novidade para mim: programei minha primeira rede neural em 2006 na faculdade e trabalho mais intensamente com IA desde 2020, bem antes do ChatGPT. É para isso que existe a AmiticIA: inteligência artificial construída com arquitetura e engenharia corretas desde o início — soluções que funcionam, escalam e não viram dor de cabeça lá na frente.",
    name: "André Ferreira",
    role: "Fundador da AmiticIA",
  },
  en: {
    title: "Who builds AmiticIA",
    pitch:
      "I'm a geophysicist trained at USP and have been developing software for over 20 years — I started in scientific and high-performance computing (HPC), and worked for Petrobras. Artificial intelligence is nothing new to me: I programmed my first neural network in 2006 at university and have worked intensively with AI since 2020, well before ChatGPT. That's exactly why AmiticIA exists: artificial intelligence built with the right architecture and engineering from the start — solutions that work, scale, and don't become a headache down the road.",
    name: "André Ferreira",
    role: "Founder of AmiticIA",
  },
};

export const FounderSection = ({ language }: FounderSectionProps) => {
  const t = content[language];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t.title}
        </h2>

        <Card className="max-w-3xl mx-auto p-8 md:p-12 bg-card border-border relative overflow-hidden group hover:border-primary transition-colors duration-300 animate-fade-in">
          <div className="absolute -top-2 left-6 text-8xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors select-none">
            "
          </div>
          <div className="relative z-10">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {t.pitch}
            </p>
            <div className="mt-8 flex flex-col">
              <span className="text-lg font-bold">{t.name}</span>
              <span className="text-sm text-primary">{t.role}</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
