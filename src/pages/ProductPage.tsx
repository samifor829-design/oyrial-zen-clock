import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import FadeUp from "@/components/FadeUp";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import OrderForm from "@/components/OrderForm";
import detailFrame from "@/assets/detail-frame.jpg";
import detailHands from "@/assets/detail-hands.jpg";
import detailDial from "@/assets/detail-dial.jpg";


const ProductPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const product = products.find((p) => p.id === id);
  const [addedLabel, setAddedLabel] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const orderFormRef = useRef<HTMLDivElement>(null);

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

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast.success(`${product.name} added to cart`);
    setAddedLabel(true);
    setTimeout(() => setAddedLabel(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    setShowOrderForm(true);
    setTimeout(() => orderFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleToggleWishlist = () => {
    toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <main className="bg-oyrial-offwhite pt-20 min-h-screen">
      {/* Product hero */}
      <div className="md:grid md:grid-cols-2 md:min-h-[calc(100vh-5rem)]">
        {/* Image */}
        <div className="bg-oyrial-grey flex items-center justify-center p-8 md:p-16 relative">
          {!product.inStock && (
            <div className="absolute inset-0 bg-oyrial-charcoal/40 flex items-center justify-center z-10">
              <span className="text-oyrial-offwhite text-sm tracking-widest uppercase">Out of Stock</span>
            </div>
          )}
          <FadeUp>
            <img src={product.image} alt={product.name} width={600} height={600} className="w-full max-w-lg" />
          </FadeUp>
        </div>

        {/* Details */}
        <div className="p-6 md:p-16 flex flex-col justify-center">
          <FadeUp>
            <div className="flex items-start justify-between">
              <h1 className="font-serif text-3xl md:text-5xl text-oyrial-charcoal">{product.name}</h1>
              <button onClick={handleToggleWishlist} className="mt-1 p-2 hover:opacity-70 transition-opacity">
                <Heart size={24} className={wishlisted ? "fill-oyrial-charcoal text-oyrial-charcoal" : "text-oyrial-muted"} />
              </button>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-3 text-oyrial-muted">{product.description}</p>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-4 font-serif text-2xl text-oyrial-charcoal">
              ৳&nbsp;{product.price.toLocaleString()}
            </p>
            {/* Stock status */}
            <div className="mt-2 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`text-xs ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-oyrial-muted">
              {product.features.filter(f => f !== "Matte Finish" && f !== "Gift Box Included").map((f) => (
                <span key={f} className="flex items-center gap-1">
                  {f === "Silent Movement" && "🔇"}
                  {f === "Minimal Design" && "✦"}
                  {f === "Roman Numerals" && "✦"}
                  {" "}{f}
                </span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={350}>
            <p className="mt-3 text-sm text-oyrial-muted">Size: {product.size} diameter</p>
          </FadeUp>
          <FadeUp delay={400}>
            <div className="mt-8 flex gap-3">
              {product.inStock ? (
                <>
                  <button
                    onClick={handleAdd}
                    disabled={addedLabel}
                    className={`flex-1 text-sm tracking-widest uppercase py-4 transition-colors min-h-[48px] ${
                      addedLabel
                        ? "bg-oyrial-charcoal/80 text-oyrial-offwhite cursor-default"
                        : "bg-oyrial-charcoal text-oyrial-offwhite hover:bg-oyrial-black"
                    }`}
                  >
                    {addedLabel ? "✓ Added" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 border border-oyrial-charcoal text-oyrial-charcoal text-sm tracking-widest uppercase py-4 hover:bg-oyrial-charcoal hover:text-oyrial-offwhite transition-colors min-h-[48px]"
                  >
                    Buy Now
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-oyrial-muted/30 text-oyrial-muted text-sm tracking-widest uppercase py-4 cursor-not-allowed min-h-[48px]"
                >
                  Currently Unavailable
                </button>
              )}
            </div>
            {/* Delivery estimate */}
            <p className="mt-3 text-xs text-oyrial-muted text-center">
              🚚 Estimated Delivery: 7–10 business days
            </p>
            <p className="mt-1 text-xs text-oyrial-muted text-center">
              Custom orders via WhatsApp
            </p>
          </FadeUp>

          {/* Buy Now Order Form */}
          <div
            ref={orderFormRef}
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showOrderForm ? "max-h-[800px] opacity-100 mt-8" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-oyrial-charcoal/10 pt-6">
              <h3 className="font-serif text-xl text-oyrial-charcoal mb-4">Complete Your Order</h3>
              <OrderForm showQuantity productName={product.name} productPrice={product.price} onSubmit={() => setShowOrderForm(true)} />
            </div>
          </div>

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

        </div>
      </div>

      {/* You Might Also Like */}
      {relatedProducts.length > 0 && (
        <div className="container pb-16 md:pb-24">
          <FadeUp>
            <h3 className="font-serif text-3xl text-oyrial-charcoal mb-10 text-center">You Might Also Like</h3>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {relatedProducts.map((p, i) => (
              <FadeUp key={p.id} delay={i * 100}>
                <Link to={`/product/${p.id}`} className="group block">
                  <div className="relative bg-oyrial-grey aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {!p.inStock && (
                      <div className="absolute inset-0 bg-oyrial-charcoal/40 flex items-center justify-center">
                        <span className="text-oyrial-offwhite text-xs tracking-widest uppercase">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <h3 className="font-serif text-lg text-oyrial-charcoal">{p.name}</h3>
                    <p className="text-sm text-oyrial-muted mt-0.5">৳&nbsp;{p.price.toLocaleString()}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? "bg-green-500" : "bg-red-500"}`} />
                      <span className={`text-[11px] ${p.inStock ? "text-green-600" : "text-red-500"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;
