import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

export const WhatsAppButton = () => {
  return (
    <Button
      asChild
      size="lg"
      className="fixed bottom-8 right-8 z-50 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform duration-300 glow-effect"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </Button>
  );
};
