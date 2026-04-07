import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import FadeUp from "@/components/FadeUp";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

const filters = ["All", "Custom", "Signature", "Classic", "Essential"] as const;

const Shop = () => {
  const [active, setActive] = useState<string>("All");
  const { isInWishlist, toggleItem } = useWishlist();

  const filtered =
    active === "All"
      ? products
      : active === "Custom"
      ? []
      : products.filter((p) => p.tier === active.toLowerCase());

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
                <div className="group block relative">
                  <Link to={`/product/${p.id}`}>
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
                      {!p.inStock && (
                        <div className="absolute inset-0 bg-oyrial-charcoal/40 flex items-center justify-center">
                          <span className="text-oyrial-offwhite text-xs tracking-widest uppercase">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  {/* Wishlist heart */}
                  <button
                    onClick={() => {
                      toggleItem({ id: p.id, name: p.name, price: p.price, image: p.image });
                      toast.success(isInWishlist(p.id) ? "Removed from wishlist" : "Added to wishlist");
                    }}
                    className="absolute top-3 right-3 z-10 p-1.5 hover:opacity-80 transition-opacity"
                  >
                    <Heart
                      size={20}
                      className={isInWishlist(p.id) ? "fill-oyrial-offwhite text-oyrial-offwhite" : "text-oyrial-offwhite/70"}
                    />
                  </button>
                  <Link to={`/product/${p.id}`}>
                    <div className="mt-3">
                      <h3 className="font-serif text-lg text-oyrial-charcoal">{p.name}</h3>
                      <p className="text-sm text-oyrial-muted mt-0.5">৳&nbsp;{p.price.toLocaleString()}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? "bg-green-500" : "bg-red-500"}`} />
                        <span className={`text-[11px] ${p.inStock ? "text-green-600" : "text-red-500"}`}>
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-oyrial-muted">
                        <span>🔇 Silent</span>
                      </div>
                    </div>
                    <span className="mt-3 inline-block text-xs tracking-widest uppercase text-oyrial-muted group-hover:text-oyrial-charcoal transition-colors border-b border-transparent group-hover:border-oyrial-charcoal pb-0.5">
                      View Details
                    </span>
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
