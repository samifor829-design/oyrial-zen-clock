import { useState } from "react";
import { Link } from "react-router-dom";
import FadeUp from "@/components/FadeUp";
import { products } from "@/data/products";

const filters = ["All", "30cm", "40cm", "Custom"] as const;

const Shop = () => {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? products
      : active === "Custom"
      ? []
      : products.filter((p) => p.sizeCategory === active);

  return (
    <main className="bg-oyrial-offwhite pt-24 pb-20 min-h-screen">
      <div className="container">
        <FadeUp>
          <h1 className="font-serif text-4xl md:text-6xl text-oyrial-charcoal mb-12">
            The Collection
          </h1>
        </FadeUp>

        {/* Filter bar */}
        <FadeUp delay={100}>
          <div className="flex gap-6 mb-12 border-b border-oyrial-charcoal/10 pb-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`text-sm tracking-widest uppercase transition-colors pb-1 ${
                  active === f
                    ? "text-oyrial-charcoal border-b-2 border-oyrial-charcoal"
                    : "text-oyrial-muted hover:text-oyrial-charcoal"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeUp>

        {active === "Custom" ? (
          <FadeUp>
            <div className="text-center py-20">
              <h2 className="font-serif text-2xl text-oyrial-charcoal mb-4">Custom Orders</h2>
              <p className="text-oyrial-muted mb-8">Tell us your vision, and we'll craft it.</p>
              <Link
                to="/customize"
                className="inline-flex items-center px-8 py-4 bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase hover:bg-oyrial-black transition-colors min-h-[48px]"
              >
                Design Your Clock
              </Link>
            </div>
          </FadeUp>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((p, i) => (
              <FadeUp key={p.id} delay={i * 100}>
                <Link to={`/product/${p.id}`} className="group block">
                  <div className="relative bg-oyrial-grey aspect-square overflow-hidden group-hover:shadow-xl transition-shadow duration-500">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {p.isNew && (
                      <span className="absolute top-3 left-3 bg-oyrial-charcoal text-oyrial-offwhite text-[10px] tracking-widest uppercase px-2 py-1">
                        New Drop
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <h3 className="font-serif text-lg text-oyrial-charcoal">{p.name}</h3>
                    <p className="text-sm text-oyrial-muted mt-0.5">৳ {p.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-oyrial-muted">
                      <span>🔇 Silent</span>
                    </div>
                  </div>
                  <span className="mt-3 inline-block text-xs tracking-widest uppercase text-oyrial-muted group-hover:text-oyrial-charcoal transition-colors border-b border-transparent group-hover:border-oyrial-charcoal pb-0.5">
                    View Details
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
