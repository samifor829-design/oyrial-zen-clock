import { useState } from "react";
import FadeUp from "@/components/FadeUp";
import { MessageCircle, Mail, Instagram } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We'll respond within 24 hours.");
  };

  return (
    <main className="bg-oyrial-offwhite pt-24 pb-20 min-h-screen">
      <div className="container max-w-2xl">
        <FadeUp>
          <h1 className="font-serif text-4xl md:text-6xl text-oyrial-charcoal">Let's Talk.</h1>
          <p className="mt-3 text-oyrial-muted">
            Whether it's a question, a custom order, or just a hello — we're here.
          </p>
        </FadeUp>

        {/* Contact options */}
        <FadeUp delay={150}>
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            <a
              href="https://wa.me/8801609573884?text=Hi%20Oyrial!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-4 text-sm min-h-[48px]"
            >
              <MessageCircle size={18} />
              Chat with us
            </a>
            <a
              href="mailto:oyriall@gmail.com"
              className="flex items-center gap-3 border border-oyrial-charcoal/20 text-oyrial-charcoal px-5 py-4 text-sm hover:bg-oyrial-charcoal/5 transition-colors min-h-[48px]"
            >
              <Mail size={18} />
              oyriall@gmail.com
            </a>
            <a
              href="https://instagram.com/oyrial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-oyrial-charcoal/20 text-oyrial-charcoal px-5 py-4 text-sm hover:bg-oyrial-charcoal/5 transition-colors min-h-[48px]"
            >
              <Instagram size={18} />
              @oyrial
            </a>
          </div>
        </FadeUp>

        {/* Contact form */}
        <FadeUp delay={300}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-4">
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full bg-white border border-oyrial-charcoal/20 px-4 py-3 text-sm text-oyrial-charcoal placeholder:text-oyrial-muted focus:outline-none focus:border-oyrial-charcoal min-h-[48px]"
            />
            <textarea
              placeholder="Your message"
              rows={5}
              required
              className="w-full bg-white border border-oyrial-charcoal/20 px-4 py-3 text-sm text-oyrial-charcoal placeholder:text-oyrial-muted focus:outline-none focus:border-oyrial-charcoal resize-none"
            />
            <button
              type="submit"
              disabled={sent}
              className="w-full bg-oyrial-charcoal text-white text-sm tracking-widest uppercase py-4 hover:bg-oyrial-black transition-colors min-h-[48px] disabled:opacity-50"
            >
              {sent ? "Sent ✓" : "Send"}
            </button>
            <p className="text-xs text-oyrial-muted text-center">We respond within 24 hours.</p>
          </form>
        </FadeUp>
      </div>
    </main>
  );
};

export default Contact;
