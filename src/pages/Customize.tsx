import { useState, useRef } from "react";
import FadeUp from "@/components/FadeUp";
import { MessageCircle, ArrowRight } from "lucide-react";

const pillOptions = (
  name: string,
  options: string[],
  selected: string,
  onChange: (v: string) => void
) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => (
      <label key={opt} className="cursor-pointer">
        <input
          type="radio"
          name={name}
          value={opt}
          checked={selected === opt}
          onChange={() => onChange(opt)}
          className="sr-only peer"
        />
        <span className="inline-block px-5 py-2.5 text-sm border border-oyrial-charcoal/30 peer-checked:bg-oyrial-charcoal peer-checked:text-oyrial-white transition-all duration-200 select-none">
          {opt}
        </span>
      </label>
    ))}
  </div>
);

interface FloatingFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  note?: string;
  error?: string;
  placeholder?: string;
  textarea?: boolean;
}

const FloatingField = ({ label, required, type = "text", value, onChange, note, error, placeholder, textarea }: FloatingFieldProps) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative pt-5">
      <label
        className={`absolute left-0 transition-all duration-200 pointer-events-none ${
          active
            ? "top-0 text-xs text-oyrial-charcoal"
            : "top-[26px] text-sm text-[#999]"
        }`}
      >
        {label}{required && " *"}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={active ? placeholder : ""}
          rows={5}
          className="w-full bg-transparent border-0 border-b border-[#ccc] focus:border-oyrial-charcoal outline-none text-sm text-oyrial-charcoal py-2 resize-none transition-colors duration-300"
          style={{
            borderImage: focused ? "linear-gradient(to right, #1a1a1a 100%, #ccc 0%) 1" : undefined,
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={active ? placeholder : ""}
          className="w-full bg-transparent border-0 border-b border-[#ccc] focus:border-oyrial-charcoal outline-none text-sm text-oyrial-charcoal py-2 transition-colors duration-300"
          style={{
            borderImage: focused ? "linear-gradient(to right, #1a1a1a 100%, #ccc 0%) 1" : undefined,
          }}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {note && !error && <p className="text-[#888] text-xs mt-1 italic">{note}</p>}
    </div>
  );
};

const Customize = () => {
  const [dialStyle, setDialStyle] = useState("Minimal Clean");
  const [engraving, setEngraving] = useState("");
  const [location, setLocation] = useState("Bedroom");
  const [vision, setVision] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

  const handleSendWhatsApp = () => {
    const newErrors: Record<string, string> = {};
    if (!vision.trim()) newErrors.vision = "Please describe your vision.";
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const msg = encodeURIComponent(
      `Hi Oyrial! Here's my custom clock order:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nDial Style: ${dialStyle}\nEngraving: ${engraving || "None"}\nWhere it hangs: ${location}\nVision: ${vision}`
    );
    window.open(`https://wa.me/8801609573884?text=${msg}`, "_blank");
  };

  return (
    <main className="bg-oyrial-white pt-24 pb-20 min-h-screen">
      <div className="container">
        <FadeUp>
          <h1 className="font-serif text-4xl md:text-6xl text-oyrial-charcoal">Build Your Clock</h1>
          <p className="mt-3 text-oyrial-muted">Tell us exactly what you want. We'll craft it for you.</p>
          <p className="mt-2 text-xs italic text-[#888]">
            All clocks are crafted at 16 inches — our signature size.
          </p>
        </FadeUp>

        <div className="mt-12 grid md:grid-cols-5 gap-12">
          {/* Form */}
          <div className="md:col-span-3" ref={formRef}>
            <FadeUp delay={100}>
              <div className="space-y-8">
                {/* 1. Dial Style */}
                <div>
                  <label className="block text-sm text-oyrial-charcoal mb-3 tracking-wide uppercase">Dial Style</label>
                  {pillOptions("dialStyle", ["Minimal Clean", "No Markers", "Roman Numerals"], dialStyle, setDialStyle)}
                </div>

                {/* 2. Engraving */}

                {/* 3. Engraving */}
                <FloatingField
                  label="Engraving Text"
                  value={engraving}
                  onChange={setEngraving}
                  placeholder="e.g. 'Est. 2024' or a name — optional"
                />

                {/* 4. Location */}
                <div className="relative pt-5">
                  <label className="absolute top-0 left-0 text-xs text-oyrial-charcoal pointer-events-none">Where will it hang?</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-[#ccc] focus:border-oyrial-charcoal outline-none text-sm text-oyrial-charcoal py-2 appearance-none cursor-pointer"
                  >
                    <option>Bedroom</option>
                    <option>Living Room</option>
                    <option>Office</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* 5. Vision */}
                <FloatingField
                  label="Your Vision"
                  required
                  value={vision}
                  onChange={setVision}
                  error={errors.vision}
                  textarea
                  placeholder="Tell us anything — a mood, a room, a color you love, a feeling you want it to give. The more you share, the better we craft."
                />

                {/* 6. Full Name */}
                <FloatingField
                  label="Full Name"
                  required
                  value={fullName}
                  onChange={setFullName}
                  error={errors.fullName}
                />

                {/* 7. Email */}
                <FloatingField
                  label="Email Address"
                  required
                  type="email"
                  value={email}
                  onChange={setEmail}
                  error={errors.email}
                  note="We'll send your order summary here."
                />

                {/* 8. Phone */}
                <FloatingField
                  label="Phone Number"
                  required
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  error={errors.phone}
                  note="We'll call to confirm your order details."
                />

                {/* Pricing Card */}
                <div className="bg-[#f5f5f5] p-6 md:p-8 mt-4">
                  <p className="text-sm text-oyrial-charcoal leading-relaxed">
                    Custom clocks are priced between ৳25,000 – ৳30,000, varying based on materials, resin type, wood grain, and finish. Final price is confirmed before production begins.
                  </p>
                  <p className="text-xs italic text-oyrial-muted mt-3">
                    A 50% advance is required to begin crafting. Our team will share payment details after reviewing your order.
                  </p>
                </div>

                {/* Delivery note */}
                <p className="text-center text-xs italic text-[#888]">
                  Every clock is handcrafted with care. Please allow 15–20 working days for your order to be made, finished, and delivered to you.
                </p>

                {/* WhatsApp Button */}
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full bg-oyrial-charcoal text-oyrial-white text-sm tracking-widest uppercase py-4 flex items-center justify-center gap-2 transition-colors hover:bg-oyrial-black min-h-[52px]"
                >
                  Send to WhatsApp <ArrowRight size={16} />
                </button>
              </div>
            </FadeUp>
          </div>

          {/* Right panel */}
          <div className="md:col-span-2">
            <FadeUp delay={200}>
              <div className="bg-oyrial-charcoal p-8 text-center">
                <h3 className="font-serif text-2xl text-oyrial-offwhite">Prefer to Chat?</h3>
                <p className="mt-3 text-sm text-oyrial-muted">
                  Message us on WhatsApp and we'll guide you through every detail personally.
                </p>
                <a
                  href="https://wa.me/8801609573884?text=Hi%20Oyrial!%20I'd%20like%20to%20customize%20a%20clock."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-4 bg-[#25D366] text-oyrial-white text-sm tracking-widest uppercase min-h-[48px]"
                >
                  <MessageCircle size={16} />
                  Chat with Oyrial
                </a>
                <div className="mt-6 space-y-2 text-xs text-oyrial-muted">
                  <p>Usually replies within 2 hours. Available 10AM – 9PM, every day.</p>
                  <p>50% advance required to begin production.</p>
                  <p className="mt-4 border-t border-oyrial-muted/20 pt-4">
                    Approximately 12–18 working days.
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
