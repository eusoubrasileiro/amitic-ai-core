import { Card } from "@/components/ui/card";
import { Brain, Cpu, Quote, Code2 } from "lucide-react";

interface FounderSectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    eyebrow: "Quem somos",
    title: "Engenharia de verdade por trás da IA",
    lead: "A AmiticIA nasceu de uma convicção simples: inteligência artificial só entrega valor quando é construída com arquitetura e engenharia corretas desde o primeiro dia.",
    pitch:
      "Sou geofísico formado pela USP e desenvolvo software há mais de 20 anos — comecei com computação científica e de alto desempenho (HPC), e trabalhei para a Petrobras. Inteligência artificial não é novidade para mim: programei minha primeira rede neural em 2006 na faculdade e trabalho mais intensamente com IA desde 2020, bem antes do ChatGPT. É para isso que existe a AmiticIA: inteligência artificial construída com arquitetura e engenharia corretas desde o início — soluções que funcionam, escalam e não viram dor de cabeça lá na frente.",
    name: "André Ferreira",
    role: "Fundador da AmiticIA",
    initials: "AF",
    highlights: [
      { icon: Code2, value: "+20 anos", label: "desenvolvendo software" },
      { icon: Brain, value: "IA desde 2006", label: "primeira rede neural na faculdade" },
      { icon: Cpu, value: "HPC", label: "computação de alto desempenho — Petrobras" },
    ],
  },
  en: {
    eyebrow: "Who we are",
    title: "Real engineering behind the AI",
    lead: "AmiticIA was born from a simple conviction: artificial intelligence only delivers value when it's built with the right architecture and engineering from day one.",
    pitch:
      "I'm a geophysicist trained at USP and have been developing software for over 20 years — I started in scientific and high-performance computing (HPC), and worked for Petrobras. Artificial intelligence is nothing new to me: I programmed my first neural network in 2006 at university and have worked intensively with AI since 2020, well before ChatGPT. That's exactly why AmiticIA exists: artificial intelligence built with the right architecture and engineering from the start — solutions that work, scale, and don't become a headache down the road.",
    name: "André Ferreira",
    role: "Founder of AmiticIA",
    initials: "AF",
    highlights: [
      { icon: Code2, value: "20+ years", label: "building software" },
      { icon: Brain, value: "AI since 2006", label: "first neural network at university" },
      { icon: Cpu, value: "HPC", label: "high-performance computing — Petrobras" },
    ],
  },
};

export const FounderSection = ({ language }: FounderSectionProps) => {
  const t = content[language];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Left: section intro */}
          <div className="space-y-6 animate-fade-in">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              {t.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.lead}
            </p>

            <div className="space-y-3 pt-2">
              {t.highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 animate-fade-in"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 p-3 rounded-lg bg-secondary/10">
                    <item.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-gradient inline-block">
                      {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: founder card */}
          <Card
            className="p-8 md:p-10 bg-card border-border relative overflow-hidden group hover:border-primary transition-colors duration-300 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full text-background text-lg font-extrabold tracking-wide flex-shrink-0 shadow-lg"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-lg font-bold">{t.name}</div>
                  <div className="text-sm text-primary">{t.role}</div>
                </div>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-5">
                {t.pitch}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
