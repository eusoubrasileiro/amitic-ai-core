import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/5531988963436";

  return (
    <Button
      asChild
      size="lg"
      className="fixed bottom-8 right-8 z-50 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform duration-300 glow-effect"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </Button>
  );
};
