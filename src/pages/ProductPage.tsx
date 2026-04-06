import { useParams, Link } from "react-router-dom";
import FadeUp from "@/components/FadeUp";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import detailFrame from "@/assets/detail-frame.jpg";
import detailHands from "@/assets/detail-hands.jpg";
import detailDial from "@/assets/detail-dial.jpg";

const reviews = [
  { name: "Nusrat A.", text: "The quality is unmatched. My living room finally feels complete.", rating: 5 },
  { name: "Rafiq H.", text: "Silent movement is a game-changer. Beautifully minimal.", rating: 5 },
  { name: "Tania S.", text: "Arrived in a beautiful gift box. Looks even better in person.", rating: 5 },
];

const ProductPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="bg-oyrial-offwhite pt-32 pb-20 min-h-screen text-center">
        <h1 className="font-serif text-3xl text-oyrial-charcoal">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-sm text-oyrial-muted underline">
          Back to Shop
        </Link>
      </main>
    );
  }

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <main className="bg-oyrial-offwhite pt-20 min-h-screen">
      {/* Product hero */}
      <div className="md:grid md:grid-cols-2 md:min-h-[calc(100vh-5rem)]">
        {/* Image */}
        <div className="bg-oyrial-grey flex items-center justify-center p-8 md:p-16">
          <FadeUp>
            <img src={product.image} alt={product.name} width={600} height={600} className="w-full max-w-lg" />
          </FadeUp>
        </div>

        {/* Details */}
        <div className="p-6 md:p-16 flex flex-col justify-center">
          <FadeUp>
            <h1 className="font-serif text-3xl md:text-5xl text-oyrial-charcoal">{product.name}</h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-3 text-oyrial-muted">{product.description}</p>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-4 font-serif text-2xl text-oyrial-charcoal">
              ৳ {product.price.toLocaleString()}
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-oyrial-muted">
              {product.features.map((f) => (
                <span key={f} className="flex items-center gap-1">
                  {f === "Silent Movement" && "🔇"}
                  {f === "Matte Finish" && "⬛"}
                  {f === "Minimal Design" && "✦"}
                  {f === "Roman Numerals" && "✦"}
                  {f === "Gift Box Included" && "📦"}
                  {" "}{f}
                </span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={350}>
            <p className="mt-3 text-sm text-oyrial-muted">Size: {product.size} diameter</p>
          </FadeUp>
          <FadeUp delay={400}>
            <button
              onClick={handleAdd}
              className="mt-8 w-full bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase py-4 hover:bg-oyrial-black transition-colors min-h-[48px]"
            >
              Add to Cart
            </button>
            <p className="mt-3 text-xs text-oyrial-muted text-center">
              Free delivery within Dhaka · Custom orders via WhatsApp
            </p>
          </FadeUp>

          <FadeUp delay={450}>
            <div className="mt-10 border-t border-oyrial-charcoal/10 pt-8">
              <h3 className="font-serif text-xl text-oyrial-charcoal mb-6">Craftsmanship</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { img: detailFrame, caption: "Precision frame" },
                  { img: detailHands, caption: "Hand-finished hands" },
                  { img: detailDial, caption: "Clean dial face" },
                ].map((d) => (
                  <div key={d.caption}>
                    <img src={d.img} alt={d.caption} loading="lazy" className="aspect-square object-cover w-full" />
                    <p className="text-xs text-oyrial-muted mt-2 text-center">{d.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Specs & Reviews */}
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <FadeUp>
            <h3 className="font-serif text-2xl text-oyrial-charcoal mb-6">Specifications</h3>
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((s) => (
                  <tr key={s.label} className="border-b border-oyrial-charcoal/5">
                    <td className="py-3 text-oyrial-muted">{s.label}</td>
                    <td className="py-3 text-oyrial-charcoal text-right">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUp>

          <FadeUp delay={150}>
            <h3 className="font-serif text-2xl text-oyrial-charcoal mb-6">Reviews</h3>
            <div className="space-y-6">
              {reviews.map((r) => (
                <div key={r.name} className="border-b border-oyrial-charcoal/5 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{"★".repeat(r.rating)}</span>
                  </div>
                  <p className="text-sm text-oyrial-charcoal italic">"{r.text}"</p>
                  <p className="text-xs text-oyrial-muted mt-1">— {r.name}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
