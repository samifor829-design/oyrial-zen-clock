import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import oyrialLogoWhite from "@/assets/oyrial-logo.png";
import oyrialLogoDark from "@/assets/oyrial-logo-dark.png";
import { ShoppingBag, Menu, X, Heart, User, Search, Moon, Sun } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import AuthModal from "@/components/AuthModal";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const count = items.reduce((a, b) => a + b.quantity, 0);
  const wishCount = wishlistItems.length;

  const links = [
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/customize", label: "Customize" },
    { to: "/contact", label: "Contact" },
  ];

  const isDark = theme === "dark" && (location.pathname === "/" || location.pathname === "/contact");

  const iconColor = isDark ? "text-oyrial-offwhite" : "text-foreground";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isDark ? "bg-oyrial-charcoal/90 backdrop-blur-sm" : "bg-background/90 backdrop-blur-sm"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center pl-5 md:pl-7 hover:opacity-80 hover:scale-105 transition-all duration-200 ease-out">
            <img src={isDark ? oyrialLogoWhite : oyrialLogoDark} alt="Oyrial logo" className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm tracking-widest uppercase transition-opacity hover:opacity-60 ${
                  isDark ? "text-oyrial-offwhite" : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)} className={iconColor}>
              <Search size={20} />
            </button>
            {/* Theme toggle */}
            <button onClick={toggleTheme} className={iconColor}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
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
            <button onClick={toggleTheme} className={iconColor}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
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
          <div className={`md:hidden pb-6 ${isDark ? "bg-oyrial-charcoal" : "bg-background"}`}>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-6 py-3 text-sm tracking-widest uppercase ${
                  isDark ? "text-oyrial-offwhite" : "text-foreground"
                }`}
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
