import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/8801609573884?text=Hi%20Oyrial!%20I'd%20like%20to%20know%20more%20about%20your%20clocks."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={24} className="text-oyrial-white" />
  </a>
);

export default WhatsAppButton;
