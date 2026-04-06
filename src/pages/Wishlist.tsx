import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { toast } from "sonner";
import FadeUp from "@/components/FadeUp";

const Wishlist = () => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <main className="bg-oyrial-offwhite pt-32 pb-20 min-h-screen">
        <div className="container text-center">
          <h1 className="font-serif text-3xl text-oyrial-charcoal">Your wishlist is empty</h1>
          <p className="mt-2 text-sm text-oyrial-muted">Save items you love by clicking the heart icon.</p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center px-8 py-4 bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase min-h-[48px]"
          >
            Browse Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-oyrial-offwhite pt-24 pb-20 min-h-screen">
      <div className="container max-w-3xl">
        <FadeUp>
          <h1 className="font-serif text-3xl md:text-4xl text-oyrial-charcoal mb-10">Your Wishlist</h1>
        </FadeUp>
        <div className="space-y-6">
          {items.map((item) => (
            <FadeUp key={item.id}>
              <div className="flex gap-4 border-b border-oyrial-charcoal/10 pb-6">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-oyrial-grey" />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Link to={`/product/${item.id}`} className="font-serif text-lg text-oyrial-charcoal hover:opacity-70 transition-opacity">
                      {item.name}
                    </Link>
                    <button onClick={() => removeItem(item.id)} className="text-oyrial-muted hover:text-oyrial-charcoal">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-oyrial-muted">৳&nbsp;{item.price.toLocaleString()}</p>
                  <button
                    onClick={() => {
                      addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
                      toast.success(`${item.name} added to cart`);
                    }}
                    className="mt-2 px-4 py-2 bg-oyrial-charcoal text-oyrial-offwhite text-xs tracking-widest uppercase hover:bg-oyrial-black transition-colors min-h-[36px]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
