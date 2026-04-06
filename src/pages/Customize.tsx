import { useState } from "react";
import FadeUp from "@/components/FadeUp";
import { MessageCircle, Check } from "lucide-react";

const Customize = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="bg-oyrial-offwhite pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-oyrial-charcoal flex items-center justify-center mx-auto mb-6">
            <Check className="text-oyrial-offwhite" size={28} />
          </div>
          <h1 className="font-serif text-3xl text-oyrial-charcoal">We've Got Your Vision.</h1>
          <p className="mt-4 text-oyrial-muted">
            Our team will review your request and reach out within 24 hours to confirm details and pricing.
          </p>
          <a
            href="https://wa.me/8801XXXXXXXXX?text=Hi%20Oyrial!%20I%20just%20submitted%20a%20custom%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-oyrial-white text-sm tracking-widest uppercase min-h-[48px]"
          >
            <MessageCircle size={16} />
            Or reach us directly →
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-oyrial-offwhite pt-24 pb-20 min-h-screen">
      <div className="container">
        <FadeUp>
          <h1 className="font-serif text-4xl md:text-6xl text-oyrial-charcoal">Build Your Clock</h1>
          <p className="mt-3 text-oyrial-muted">Tell us exactly what you want. We'll craft it for you.</p>
        </FadeUp>

        <div className="mt-12 grid md:grid-cols-5 gap-12">
          {/* Form */}
          <div className="md:col-span-3">
            <FadeUp delay={100}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-oyrial-charcoal mb-2">Clock Size</label>
                  <select className="w-full border border-oyrial-charcoal/20 bg-oyrial-white px-4 py-3 text-sm text-oyrial-charcoal focus:outline-none focus:border-oyrial-charcoal min-h-[48px]">
                    <option>30cm</option>
                    <option>40cm</option>
                    <option>Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-oyrial-charcoal mb-2">Frame Color</label>
                  <div className="flex gap-4">
                    {[
                      { label: "Matte Black", color: "bg-oyrial-charcoal" },
                      { label: "Matte White", color: "bg-oyrial-white border border-oyrial-charcoal/20" },
                      { label: "Custom", color: "bg-gradient-to-r from-oyrial-charcoal to-oyrial-muted" },
                    ].map((c) => (
                      <label key={c.label} className="flex items-center gap-2 cursor-pointer text-sm text-oyrial-muted">
                        <input type="radio" name="frameColor" defaultChecked={c.label === "Matte Black"} className="sr-only peer" />
                        <span className={`w-6 h-6 rounded-full ${c.color} peer-checked:ring-2 peer-checked:ring-oyrial-charcoal peer-checked:ring-offset-2`} />
                        {c.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-oyrial-charcoal mb-2">Dial Style</label>
                  <div className="flex flex-wrap gap-4">
                    {["Minimal Clean", "No Markers", "Roman Numerals"].map((s) => (
                      <label key={s} className="flex items-center gap-2 text-sm text-oyrial-muted cursor-pointer">
                        <input type="radio" name="dialStyle" defaultChecked={s === "Minimal Clean"} className="accent-oyrial-charcoal" />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-oyrial-charcoal mb-2">Hand Color</label>
                  <div className="flex gap-4">
                    {["Black", "Gold", "Silver"].map((c) => (
                      <label key={c} className="flex items-center gap-2 text-sm text-oyrial-muted cursor-pointer">
                        <input type="radio" name="handColor" defaultChecked={c === "Black"} className="accent-oyrial-charcoal" />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-oyrial-charcoal mb-2">Engraving Text</label>
                  <input
                    type="text"
                    placeholder="Optional — e.g. 'Est. 2024' or a name"
                    className="w-full border border-oyrial-charcoal/20 bg-oyrial-white px-4 py-3 text-sm text-oyrial-charcoal placeholder:text-oyrial-muted focus:outline-none focus:border-oyrial-charcoal min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-oyrial-charcoal mb-2">Where will it hang?</label>
                  <select className="w-full border border-oyrial-charcoal/20 bg-oyrial-white px-4 py-3 text-sm text-oyrial-charcoal focus:outline-none focus:border-oyrial-charcoal min-h-[48px]">
                    <option>Bedroom</option>
                    <option>Living Room</option>
                    <option>Office</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-oyrial-charcoal mb-2">Budget Range</label>
                  <select className="w-full border border-oyrial-charcoal/20 bg-oyrial-white px-4 py-3 text-sm text-oyrial-charcoal focus:outline-none focus:border-oyrial-charcoal min-h-[48px]">
                    <option>৳2,000–3,000</option>
                    <option>৳3,000–5,000</option>
                    <option>৳5,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-oyrial-charcoal mb-2">Reference Image (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm text-oyrial-muted file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-oyrial-charcoal file:text-oyrial-offwhite"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-oyrial-charcoal mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-oyrial-charcoal/20 bg-oyrial-white px-4 py-3 text-sm text-oyrial-charcoal focus:outline-none focus:border-oyrial-charcoal min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-oyrial-charcoal mb-2">Your Phone Number</label>
                    <input
                      type="tel"
                      required
                      className="w-full border border-oyrial-charcoal/20 bg-oyrial-white px-4 py-3 text-sm text-oyrial-charcoal focus:outline-none focus:border-oyrial-charcoal min-h-[48px]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase py-4 hover:bg-oyrial-black transition-colors min-h-[48px]"
                >
                  Send My Order
                </button>
              </form>
            </FadeUp>
          </div>

          {/* WhatsApp option */}
          <div className="md:col-span-2">
            <FadeUp delay={200}>
              <div className="bg-oyrial-charcoal p-8 text-center">
                <h3 className="font-serif text-2xl text-oyrial-offwhite">Prefer to Chat?</h3>
                <p className="mt-3 text-sm text-oyrial-muted">
                  Message us on WhatsApp and we'll guide you through every detail personally.
                </p>
                <a
                  href="https://wa.me/8801XXXXXXXXX?text=Hi%20Oyrial!%20I'd%20like%20to%20customize%20a%20clock."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-4 bg-[#25D366] text-oyrial-white text-sm tracking-widest uppercase min-h-[48px]"
                >
                  <MessageCircle size={16} />
                  Chat with Oyrial
                </a>
                <div className="mt-6 space-y-2 text-xs text-oyrial-muted">
                  <p>Usually replies within 2 hours</p>
                  <p>Available 10AM – 9PM, 7 days a week</p>
                  <p className="mt-4 border-t border-oyrial-muted/20 pt-4">
                    Minimum 1 piece. Delivery in 7–10 working days.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Customize;
