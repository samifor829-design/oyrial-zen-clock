import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, X } from "lucide-react";
import FadeUp from "@/components/FadeUp";
import OrderForm from "@/components/OrderForm";

const Cart = () => {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="bg-oyrial-offwhite pt-32 pb-20 min-h-screen">
        <div className="container text-center">
          <h1 className="font-serif text-3xl text-oyrial-charcoal">Your cart is empty</h1>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center px-8 py-4 bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase min-h-[48px]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-oyrial-offwhite pt-24 pb-20 min-h-screen">
      <div className="container max-w-2xl">
        <FadeUp>
          <h1 className="font-serif text-3xl md:text-4xl text-oyrial-charcoal mb-10">Your Cart</h1>
        </FadeUp>

        <div className="space-y-6">
          {items.map((item) => (
            <FadeUp key={item.id}>
              <div className="flex gap-4 border-b border-oyrial-charcoal/10 pb-6">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-oyrial-grey" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-serif text-lg text-oyrial-charcoal">{item.name}</h3>
                    <button onClick={() => removeItem(item.id)} className="text-oyrial-muted hover:text-oyrial-charcoal">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-oyrial-muted">৳ {item.price.toLocaleString()}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-oyrial-charcoal/20 flex items-center justify-center hover:bg-oyrial-charcoal hover:text-oyrial-offwhite transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-oyrial-charcoal/20 flex items-center justify-center hover:bg-oyrial-charcoal hover:text-oyrial-offwhite transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="mt-8 border-t border-oyrial-charcoal/10 pt-6">
            <div className="flex justify-between font-serif text-xl text-oyrial-charcoal mb-8">
              <span>Total</span>
              <span>৳ {total.toLocaleString()}</span>
            </div>
            <h3 className="font-serif text-xl text-oyrial-charcoal mb-4">Checkout</h3>
            <OrderForm onSubmit={clearCart} />
          </div>
        </FadeUp>
      </div>
    </main>
  );
};

export default Cart;
