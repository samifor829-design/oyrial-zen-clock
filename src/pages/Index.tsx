import { Link } from "react-router-dom";
import FadeUp from "@/components/FadeUp";
import { products } from "@/data/products";
import { Volume2, Paintbrush, MessageCircle, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import HeroClock from "@/components/HeroClock";
import oyrialLogo from "@/assets/oyrial-logo.png";
import insta1 from "@/assets/insta-clock-1.jpg";
import insta2 from "@/assets/insta-clock-2.jpg";
import insta3 from "@/assets/insta-clock-3.jpg";
import insta4 from "@/assets/insta-clock-4.jpg";

const Home = () => {
  const { isInWishlist, toggleItem } = useWishlist();

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-oyrial-charcoal overflow-hidden">
        <div className="relative z-10 text-center px-6">
          <FadeUp>
            <h1 className="font-serif text-5xl md:text-8xl text-oyrial-offwhite tracking-tight flex items-center justify-center gap-3 md:gap-4">
              <img src={oyrialLogo} alt="Oyrial logo" className="h-10 md:h-16 w-auto" />
              Time Gone Wild
            </h1>
          </FadeUp>
          <FadeUp delay={150}>
            <div className="my-8 flex justify-center">
              <HeroClock />
            </div>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-2 text-oyrial-muted text-base md:text-lg max-w-md mx-auto">
              Handcrafted wall clocks for the intentional home.
            </p>
          </FadeUp>
          <FadeUp delay={400}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                className="px-8 py-4 border border-oyrial-offwhite text-oyrial-offwhite text-sm tracking-widest uppercase hover:bg-oyrial-offwhite hover:text-oyrial-charcoal transition-colors min-h-[48px] flex items-center"
              >
                Explore the Collection
              </Link>
              <Link
                to="/shop"
                className="px-8 py-4 bg-oyrial-offwhite text-oyrial-charcoal text-sm tracking-widest uppercase hover:bg-oyrial-white transition-colors min-h-[48px] flex items-center"
              >
                Order Now
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-oyrial-offwhite py-20 md:py-32">
        <div className="container">
          <FadeUp>
            <h2 className="font-serif text-4xl md:text-5xl text-center text-oyrial-charcoal mb-16">
              The Collection
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <FadeUp key={p.id} delay={i * 150}>
                <div className="group block relative">
                  <Link to={`/product/${p.id}`}>
                    <div className="relative bg-oyrial-grey aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {p.isNew && (
                        <span className="absolute top-4 left-4 bg-oyrial-charcoal text-oyrial-offwhite text-[10px] tracking-widest uppercase px-3 py-1">
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
                  <button
                    onClick={() => {
                      toggleItem({ id: p.id, name: p.name, price: p.price, image: p.image });
                      toast.success(isInWishlist(p.id) ? "Removed from wishlist" : "Added to wishlist");
                    }}
                    className="absolute top-4 right-4 z-10 p-1.5 hover:opacity-80 transition-opacity"
                  >
                    <Heart size={20} className={isInWishlist(p.id) ? "fill-oyrial-offwhite text-oyrial-offwhite" : "text-oyrial-offwhite/70"} />
                  </button>
                  <div className="mt-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl text-oyrial-charcoal">{p.name}</h3>
                      <p className="text-sm text-oyrial-muted mt-1">৳&nbsp;{p.price.toLocaleString()}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? "bg-green-500" : "bg-red-500"}`} />
                        <span className={`text-[11px] ${p.inStock ? "text-green-600" : "text-red-500"}`}>
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/product/${p.id}`}
                      className="px-4 py-2 bg-oyrial-charcoal text-oyrial-offwhite text-[11px] tracking-widest uppercase hover:bg-oyrial-black transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-oyrial-charcoal py-20 md:py-32">
        <div className="container max-w-3xl text-center">
          <FadeUp>
            <h2 className="font-serif text-4xl md:text-5xl text-oyrial-offwhite mb-8">
              We Don't Just Make Clocks.
            </h2>
          </FadeUp>
          <FadeUp delay={150}>
            <p className="text-oyrial-muted leading-relaxed">
              Oyrial was built for people who treat their walls as carefully as they treat their wardrobe. Every clock we make is minimal by design, intentional by nature. Time Gone Wild — because time should make a statement.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <p className="mt-8 font-serif italic text-lg text-oyrial-offwhite/70">
              "A clock should feel like it belongs — not just hang."
            </p>
          </FadeUp>
          <FadeUp delay={450}>
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-oyrial-offwhite/5 rounded-lg p-6 flex flex-col items-center gap-3">
                <Volume2 size={28} className="text-oyrial-offwhite/60" />
                <h3 className="font-serif text-xl text-oyrial-offwhite">Silent Movement</h3>
                <p className="text-sm text-oyrial-muted">No tick. Just presence.</p>
              </div>
              <div className="bg-oyrial-offwhite/5 rounded-lg p-6 flex flex-col items-center gap-3">
                <Paintbrush size={28} className="text-oyrial-offwhite/60" />
                <h3 className="font-serif text-xl text-oyrial-offwhite">Handcrafted Finish</h3>
                <p className="text-sm text-oyrial-muted">Every detail, intentional.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CUSTOMIZATION TEASER */}
      <section className="bg-oyrial-black py-20 md:py-32">
        <div className="container max-w-2xl text-center">
          <FadeUp>
            <h2 className="font-serif text-3xl md:text-5xl text-oyrial-offwhite mb-4">
              Make It Yours.
            </h2>
          </FadeUp>
          <FadeUp delay={150}>
            <p className="text-oyrial-muted">
              Every Oyrial clock can be made to your specifications — size, finish, dial, hands, and engraving.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/customize"
                className="px-8 py-4 border border-oyrial-offwhite text-oyrial-offwhite text-sm tracking-widest uppercase hover:bg-oyrial-offwhite hover:text-oyrial-black transition-colors min-h-[48px] flex items-center"
              >
                Design Your Clock →
              </Link>
              <a
                href="https://wa.me/8801XXXXXXXXX?text=Hi%20Oyrial!%20I'd%20like%20to%20customize%20a%20clock."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] text-white text-sm tracking-widest uppercase hover:bg-[#1da851] transition-colors min-h-[48px] flex items-center gap-2"
              >
                <MessageCircle size={18} />
                WhatsApp Us →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* INSTAGRAM TEASER */}
      <section className="bg-oyrial-offwhite py-20 md:py-32">
        <div className="container">
          <FadeUp>
            <h2 className="font-serif text-3xl md:text-4xl text-center text-oyrial-charcoal mb-12">
              Follow the Craft — @oyrial
            </h2>
          </FadeUp>
          <FadeUp delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[insta1, insta2, insta3, insta4].map((img, i) => (
                <a
                  key={i}
                  href="https://instagram.com/oyrial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square overflow-hidden group"
                >
                  <img
                    src={img}
                    alt={`Oyrial wall clock lifestyle ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </a>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="mt-10 text-center">
              <a
                href="https://instagram.com/oyrial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border border-oyrial-charcoal text-oyrial-charcoal text-sm tracking-widest uppercase hover:bg-oyrial-charcoal hover:text-oyrial-offwhite transition-colors min-h-[48px]"
              >
                Follow on Instagram
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
};

export default Home;
