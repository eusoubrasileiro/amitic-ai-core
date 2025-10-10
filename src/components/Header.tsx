import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

interface HeaderProps {
  language: "pt" | "en";
  onLanguageToggle: () => void;
}

export const Header = ({ language, onLanguageToggle }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-xl font-bold">AmiticIA</span>
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
