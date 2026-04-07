import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import FadeUp from "@/components/FadeUp";

interface OrderFormProps {
  defaultQuantity?: number;
  showQuantity?: boolean;
  onSubmit?: () => void;
}

const OrderForm = ({ defaultQuantity = 1, showQuantity = false, onSubmit }: OrderFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: defaultQuantity,
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit?.();
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <FadeUp>
          <CheckCircle className="mx-auto text-oyrial-charcoal" size={48} strokeWidth={1.5} />
          <h3 className="mt-4 font-serif text-2xl text-oyrial-charcoal">Order Received!</h3>
          <p className="mt-2 text-sm text-oyrial-muted">
            Our team member will call you soon to confirm your order.
          </p>
          <p className="mt-1 text-xs text-oyrial-muted">
            Expected delivery: 3–5 business days.
          </p>
          <p className="mt-1 text-xs text-oyrial-muted">
            We typically call within 1–2 hours. Please keep your phone available.
          </p>
          <a
            href="https://wa.me/8801609573884?text=Hi%20Oyrial!%20I%20just%20placed%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm tracking-wide rounded hover:bg-[#1fb855] transition-colors min-h-[48px]"
          >
            In a hurry? Chat with us →
          </a>
        </FadeUp>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Full Name *</label>
        <Input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your full name"
          className="border-oyrial-charcoal/20 bg-transparent text-oyrial-charcoal"
        />
      </div>
      <div>
        <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Phone Number *</label>
        <Input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="01XXXXXXXXX"
          className="border-oyrial-charcoal/20 bg-transparent text-oyrial-charcoal"
        />
      </div>
      <div>
        <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Delivery Address *</label>
        <Input
          required
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Full delivery address"
          className="border-oyrial-charcoal/20 bg-transparent text-oyrial-charcoal"
        />
      </div>
      {showQuantity && (
        <div>
          <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Quantity</label>
          <Input
            type="number"
            min={1}
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
            className="border-oyrial-charcoal/20 bg-transparent text-oyrial-charcoal w-24"
          />
        </div>
      )}
      <div>
        <p className="text-sm text-oyrial-charcoal">
          <span className="text-xs text-oyrial-muted uppercase tracking-wider">Payment:</span>{" "}
          Cash on Delivery
        </p>
      </div>
      {showQuantity && (
        <div>
          <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Order Note (optional)</label>
          <Input
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Any special instructions"
            className="border-oyrial-charcoal/20 bg-transparent text-oyrial-charcoal"
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase py-4 hover:bg-oyrial-black transition-colors min-h-[48px]"
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
