import FadeUp from "@/components/FadeUp";
import { MessageCircle, Mail, Instagram, ArrowRight } from "lucide-react";

const contactCards = [
  {
    href: "https://wa.me/8801609573884?text=Hi%20Oyrial!",
    icon: MessageCircle,
    label: "Chat with us on WhatsApp",
    sub: "Usually replies within 2 hours",
    external: true,
  },
  {
    href: "mailto:oyriall@gmail.com",
    icon: Mail,
    label: "oyriall@gmail.com",
    sub: "For detailed inquiries and order questions",
    external: false,
  },
  {
    href: "https://instagram.com/oyrial",
    icon: Instagram,
    label: "@oyrial",
    sub: "Follow our craft, DM us anytime",
    external: true,
  },
];

const Contact = () => {
  return (
    <main className="bg-oyrial-offwhite pt-32 pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        {/* Label */}
        <FadeUp>
          <p className="text-xs tracking-[0.3em] uppercase text-[#999] font-normal text-center md:text-left">
            We're always around
          </p>
        </FadeUp>

        {/* Header */}
        <FadeUp delay={50}>
          <div className="text-center md:text-left mt-6">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-oyrial-charcoal leading-[0.95] tracking-tight">
              Let's Talk.
            </h1>
            <div className="mx-auto md:mx-0 mt-6 w-20 h-px bg-oyrial-charcoal" />
            <p className="mt-6 text-sm text-[#666] font-light leading-relaxed max-w-[480px] mx-auto md:mx-0">
              Drop us a message and we'll get back to you shortly. Whether it's a custom order, a question, or just a hello — we're here for all of it.
            </p>
          </div>
        </FadeUp>

        {/* Contact Cards */}
        <FadeUp delay={200}>
          <div className="mt-16 flex flex-col gap-4">
            {contactCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between bg-white border border-oyrial-charcoal text-oyrial-charcoal px-6 py-5 transition-all duration-200 hover:bg-oyrial-charcoal hover:text-white hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <card.icon size={20} className="mt-0.5 shrink-0 transition-colors duration-200" />
                  <div>
                    <span className="text-sm font-medium transition-colors duration-200 block">
                      {card.label}
                    </span>
                    <span className="text-xs text-[#999] group-hover:text-white/60 transition-colors duration-200 block mt-1">
                      {card.sub}
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="shrink-0 transition-colors duration-200" />
              </a>
            ))}
          </div>
        </FadeUp>

        {/* Bottom text */}
        <FadeUp delay={350}>
          <p className="mt-16 text-center text-xs tracking-[0.2em] text-[#999] italic">
            We respond within 24 hours. Available 10AM – 9PM, every day.
          </p>
        </FadeUp>
      </div>
    </main>
  );
};

export default Contact;
