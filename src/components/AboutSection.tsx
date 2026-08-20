import { Card } from "@/components/ui/card";
import { Brain, Cpu, Quote, Code2 } from "lucide-react";

interface AboutSectionProps {
  language: "pt" | "en";
}

const content = {
  pt: {
    eyebrow: "Quem somos",
    title: "Engenharia de verdade por trás da IA",
    lead: "A AmiticIA nasceu de uma convicção simples: inteligência artificial só entrega valor quando é construída com arquitetura e engenharia corretas desde o primeiro dia.",
    pitch:
      "A AmiticIA existe porque IA só entrega valor quando é construída com arquitetura e engenharia corretas desde o dia um. Nossa base é computação científica e de alto desempenho — e inteligência artificial não é novidade aqui: trabalhamos com redes neurais desde 2006 e desenvolvemos projetos com IA desde 2020, bem antes do ChatGPT. É isso que entregamos: soluções que funcionam, escalam e não viram dor de cabeça lá na frente.",
    highlights: [
      { icon: Code2, value: "+20 anos", label: "desenvolvendo software" },
      { icon: Brain, value: "IA desde 2006", label: "antes do hype" },
      { icon: Cpu, value: "HPC", label: "computação científica de alto desempenho" },
    ],
  },
  en: {
    eyebrow: "Who we are",
    title: "Real engineering behind the AI",
    lead: "AmiticIA was born from a simple conviction: artificial intelligence only delivers value when it's built with the right architecture and engineering from day one.",
    pitch:
      "AmiticIA exists because AI only delivers value when it's built with the right architecture and engineering from day one. Our foundation is scientific and high-performance computing — and artificial intelligence is nothing new here: we've worked with neural networks since 2006 and have been building AI projects since 2020, well before ChatGPT. That's what we deliver: solutions that work, scale, and don't become a headache down the road.",
    highlights: [
      { icon: Code2, value: "20+ years", label: "building software" },
      { icon: Brain, value: "AI since 2006", label: "before the hype" },
      { icon: Cpu, value: "HPC", label: "high-performance scientific computing" },
    ],
  },
};

export const AboutSection = ({ language }: AboutSectionProps) => {
  const t = content[language];

  return (
    <section id="quem-somos" className="py-20 relative scroll-mt-20">
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

          {/* Right: statement card */}
          <Card
            className="p-8 md:p-10 bg-card border-border relative overflow-hidden group hover:border-primary transition-colors duration-300 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />

            <div className="relative z-10 flex flex-col h-full justify-center">
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
