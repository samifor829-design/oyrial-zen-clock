import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import oyrialLogoDark from "@/assets/oyrial-logo-dark.png";
import { ShoppingBag, Menu, X, Heart, User, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  const iconColor = "text-foreground";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm transition-colors duration-300">
        <div className="w-full flex items-center justify-between h-16 md:h-20 px-3 md:px-4">
          <Link to="/" className="flex items-center ml-0 pl-0 hover:scale-105 transition-transform duration-200 ease-out">
            <img src={oyrialLogoDark} alt="Oyrial logo" className="block w-auto object-contain flex-shrink-0 h-[34px] md:h-[44px]" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm tracking-widest uppercase transition-opacity hover:opacity-60 text-foreground"
              >
                {l.label}
              </Link>
            ))}
            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)} className={iconColor}>
              <Search size={20} />
            </button>
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
                <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                  {wishCount}
                </span>
              )}
            </Link>
            {/* Cart */}
            <Link to="/cart" className={`relative ${iconColor}`}>
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                  {count}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setSearchOpen(!searchOpen)} className={iconColor}>
              <Search size={20} />
            </button>
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
                <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className={`relative ${iconColor}`}>
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 text-[10px] flex items-center justify-center bg-primary text-primary-foreground rounded-full">
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
          <div className="md:hidden pb-6 bg-white">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-6 py-3 text-sm tracking-widest uppercase text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

export default Header;
