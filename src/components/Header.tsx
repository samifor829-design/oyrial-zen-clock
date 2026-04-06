import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const location = useLocation();
  const count = items.reduce((a, b) => a + b.quantity, 0);

  const links = [
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/customize", label: "Customize" },
    { to: "/contact", label: "Contact" },
  ];

  const isDark = location.pathname === "/" || location.pathname === "/contact";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isDark ? "bg-oyrial-charcoal/90 backdrop-blur-sm" : "bg-oyrial-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className={`font-serif text-2xl md:text-3xl tracking-wider ${isDark ? "text-oyrial-offwhite" : "text-oyrial-charcoal"}`}>
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
          <Link to="/cart" className={`relative ${isDark ? "text-oyrial-offwhite" : "text-oyrial-charcoal"}`}>
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
          <Link to="/cart" className={`relative ${isDark ? "text-oyrial-offwhite" : "text-oyrial-charcoal"}`}>
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] flex items-center justify-center bg-oyrial-charcoal text-oyrial-offwhite rounded-full">
                {count}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className={isDark ? "text-oyrial-offwhite" : "text-oyrial-charcoal"}>
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
  );
};

export default Header;
