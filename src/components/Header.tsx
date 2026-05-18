import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Languages, Menu, MessageCircle } from "lucide-react";
import logo from "@/assets/amiticia-logo.svg";

interface HeaderProps {
  language: "pt" | "en";
  onLanguageToggle: () => void;
}

const WHATSAPP_URL = "https://wa.me/5531988963436";

const content = {
  pt: {
    nav: [
      { href: "#quem-somos", label: "Quem somos" },
      { href: "#agendazap", label: "AgendaZap" },
      { href: "#como-trabalhamos", label: "Como trabalhamos" },
      { href: "#para-quem-e", label: "Para quem é" },
    ],
    cta: "Fale conosco",
    menu: "Menu",
  },
  en: {
    nav: [
      { href: "#quem-somos", label: "About" },
      { href: "#agendazap", label: "AgendaZap" },
      { href: "#como-trabalhamos", label: "How we work" },
      { href: "#para-quem-e", label: "Who it's for" },
    ],
    cta: "Talk to us",
    menu: "Menu",
  },
};

export const Header = ({ language, onLanguageToggle }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center flex-shrink-0">
          <img src={logo} alt="AmiticIA" className="h-12" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            onClick={onLanguageToggle}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Languages className="w-4 h-4" />
            {language === "pt" ? "EN" : "PT"}
          </Button>
          <Button asChild size="sm" className="gap-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              {t.cta}
            </a>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            onClick={onLanguageToggle}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Languages className="w-4 h-4" />
            {language === "pt" ? "EN" : "PT"}
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t.menu}>
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background border-border w-72"
            >
              <SheetTitle className="text-left mb-6">{t.menu}</SheetTitle>
              <nav className="flex flex-col gap-2">
                {t.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <Button asChild className="gap-2 w-full mt-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.cta}
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
