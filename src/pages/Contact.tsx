import { useState, useRef, useEffect } from "react";
import FadeUp from "@/components/FadeUp";
import { MessageCircle, Mail, Instagram, Send } from "lucide-react";
import { toast } from "sonner";

const FloatingInput = ({ label, type = "text", required = false }: { label: string; type?: string; required?: boolean }) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const active = focused || filled;

  return (
    <div className="relative pt-5">
      <label
        className={`absolute left-0 transition-all duration-300 ease-out pointer-events-none ${
          active
            ? "top-0 text-xs tracking-widest text-oyrial-charcoal/60"
            : "top-[26px] text-sm text-[#999]"
        }`}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); setFilled(!!inputRef.current?.value); }}
        className="w-full bg-transparent border-0 border-b border-[#ccc] py-2 text-sm text-oyrial-charcoal outline-none transition-colors duration-300 focus:border-oyrial-charcoal min-h-[44px]"
        style={{ borderImage: focused ? "linear-gradient(to right, #1a1a1a 100%, #ccc 0%) 1" : undefined }}
      />
    </div>
  );
};

const FloatingTextarea = ({ label, rows = 4, required = false }: { label: string; rows?: number; required?: boolean }) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const active = focused || filled;

  return (
    <div className="relative pt-5">
      <label
        className={`absolute left-0 transition-all duration-300 ease-out pointer-events-none ${
          active
            ? "top-0 text-xs tracking-widest text-oyrial-charcoal/60"
            : "top-[26px] text-sm text-[#999]"
        }`}
      >
        {label}
      </label>
      <textarea
        ref={ref}
        rows={rows}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); setFilled(!!ref.current?.value); }}
        className="w-full bg-transparent border-0 border-b border-[#ccc] py-2 text-sm text-oyrial-charcoal outline-none resize-none transition-colors duration-300 focus:border-oyrial-charcoal"
        style={{ borderImage: focused ? "linear-gradient(to right, #1a1a1a 100%, #ccc 0%) 1" : undefined }}
      />
    </div>
  );
};

const contactCards = [
  {
    href: "https://wa.me/8801609573884?text=Hi%20Oyrial!",
    icon: MessageCircle,
    label: "Chat on WhatsApp",
    external: true,
  },
  {
    href: "mailto:oyriall@gmail.com",
    icon: Mail,
    label: "oyriall@gmail.com",
    external: false,
  },
  {
    href: "https://instagram.com/oyrial",
    icon: Instagram,
    label: "@oyrial",
    external: true,
  },
];

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [flying, setFlying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFlying(true);
    setTimeout(() => {
      setFlying(false);
      setSent(true);
      toast.success("Message sent! We'll respond within 24 hours.");
      setTimeout(() => setSent(false), 3000);
    }, 600);
  };

  return (
    <main className="bg-oyrial-offwhite pt-32 pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <FadeUp>
          <div className="text-left md:text-left text-center">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-oyrial-charcoal leading-[0.95] tracking-tight">
              Let's Talk.
            </h1>
            <div className="mx-auto md:mx-0 mt-6 w-20 h-px bg-oyrial-charcoal" />
            <p className="mt-6 text-sm tracking-[0.2em] text-[#666] font-light">
              WHETHER IT'S A QUESTION, A CUSTOM ORDER, OR JUST A HELLO — WE'RE HERE.
            </p>
          </div>
        </FadeUp>

        {/* Contact Cards */}
        <FadeUp delay={150}>
          <div className="mt-20 grid sm:grid-cols-3 gap-4">
            {contactCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 bg-white border border-oyrial-charcoal text-oyrial-charcoal px-5 py-4 text-sm transition-all duration-200 hover:bg-oyrial-charcoal hover:text-white min-h-[52px]"
              >
                <card.icon size={18} className="transition-colors duration-200 shrink-0" />
                <span className="transition-colors duration-200">{card.label}</span>
              </a>
            ))}
          </div>
        </FadeUp>

        {/* Form */}
        <FadeUp delay={300}>
          <form onSubmit={handleSubmit} className="mt-20 space-y-8">
            <FloatingInput label="Your name" required />
            <FloatingInput label="Email address" type="email" />
            <FloatingTextarea label="Your message" required />

            <button
              type="submit"
              disabled={sent}
              className="relative w-full bg-oyrial-charcoal text-white text-sm tracking-[0.15em] uppercase py-4 rounded-sm hover:bg-oyrial-black transition-colors min-h-[52px] disabled:opacity-60 overflow-hidden"
            >
              <span className={`inline-flex items-center gap-2 transition-all duration-300 ${flying ? "translate-x-[200%] -translate-y-[200%] opacity-0" : ""}`}>
                {sent ? "Message Sent ✓" : (
                  <>
                    <Send size={14} className="rotate-[-30deg]" />
                    Send
                  </>
                )}
              </span>
            </button>
          </form>
        </FadeUp>

        {/* Bottom text */}
        <FadeUp delay={400}>
          <p className="mt-16 text-center text-xs tracking-[0.25em] text-[#999] italic">
            We respond within 24 hours.
          </p>
        </FadeUp>
      </div>
    </main>
  );
};

export default Contact;
