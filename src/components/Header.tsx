import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import oyrialLogo from "@/assets/oyrial-logo.png";
import { ShoppingBag, Menu, X, Heart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user } = useAuth();
  const location = useLocation();
  const count = items.reduce((a, b) => a + b.quantity, 0);
  const wishCount = wishlistItems.length;

  const links = [
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/customize", label: "Customize" },
    { to: "/contact", label: "Contact" },
  ];

  const isDark = location.pathname === "/" || location.pathname === "/contact";

  const iconColor = isDark ? "text-oyrial-offwhite" : "text-oyrial-charcoal";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isDark ? "bg-oyrial-charcoal/90 backdrop-blur-sm" : "bg-oyrial-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className={`flex items-center gap-2 font-serif text-2xl md:text-3xl tracking-wider ${isDark ? "text-oyrial-offwhite" : "text-oyrial-charcoal"}`}>
            <img src={oyrialLogo} alt="Oyrial logo" className={`h-7 md:h-8 w-auto ${isDark ? "" : "invert"}`} />
            Oyrial
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm tracking-widest uppercase transition-opacity hover:opacity-60 ${
                  isDark ? "text-oyrial-offwhite" : "text-oyrial-charcoal"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {/* Account */}
            {user ? (
              <Link to="/account" className={`${iconColor} text-sm tracking-widest uppercase hover:opacity-60 transition-opacity`}>
                {user.name.split(" ")[0]}
              </Link>
            ) : (
              <button onClick={() => setAuthOpen(true)} className={iconColor}>
                <User size={20} />
              </button>
            )}
            {/* Wishlist */}
            <Link to="/wishlist" className={`relative ${iconColor}`}>
              <Heart size={20} />
              {wishCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] flex items-center justify-center bg-oyrial-charcoal text-oyrial-offwhite rounded-full">
                  {wishCount}
                </span>
              )}
            </Link>
            {/* Cart */}
            <Link to="/cart" className={`relative ${iconColor}`}>
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] flex items-center justify-center bg-oyrial-charcoal text-oyrial-offwhite rounded-full">
                  {count}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            {user ? (
              <Link to="/account" className={iconColor}>
                <User size={20} fill="currentColor" />
              </Link>
            ) : (
              <button onClick={() => setAuthOpen(true)} className={iconColor}>
                <User size={20} />
              </button>
            )}
            <Link to="/wishlist" className={`relative ${iconColor}`}>
              <Heart size={20} />
              {wishCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] flex items-center justify-center bg-oyrial-charcoal text-oyrial-offwhite rounded-full">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className={`relative ${iconColor}`}>
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] flex items-center justify-center bg-oyrial-charcoal text-oyrial-offwhite rounded-full">
                  {count}
                </span>
              )}
            </Link>
            <button onClick={() => setOpen(!open)} className={iconColor}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className={`md:hidden pb-6 ${isDark ? "bg-oyrial-charcoal" : "bg-oyrial-white"}`}>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-6 py-3 text-sm tracking-widest uppercase ${
                  isDark ? "text-oyrial-offwhite" : "text-oyrial-charcoal"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

export default Header;
