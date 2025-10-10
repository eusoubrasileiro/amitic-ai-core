import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BenefitsSection } from "@/components/BenefitsSection";
import { StackSection } from "@/components/StackSection";
import { ProcessSection } from "@/components/ProcessSection";
import { AudienceSection } from "@/components/AudienceSection";
import { CTASection } from "@/components/CTASection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <div className="min-h-screen">
      <Header language={language} onLanguageToggle={toggleLanguage} />
      <Hero language={language} />
      <BenefitsSection language={language} />
      <StackSection language={language} />
      <ProcessSection language={language} />
      <AudienceSection language={language} />
      <CTASection language={language} />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
