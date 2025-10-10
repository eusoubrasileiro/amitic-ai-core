import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import logo from "@/assets/amiticia-logo.png";

interface HeaderProps {
  language: "pt" | "en";
  onLanguageToggle: () => void;
}

export const Header = ({ language, onLanguageToggle }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="AmiticIA" className="h-12" />
        </div>
        
        <Button
          onClick={onLanguageToggle}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Languages className="w-4 h-4" />
          {language === "pt" ? "EN" : "PT"}
        </Button>
      </div>
    </header>
  );
};
