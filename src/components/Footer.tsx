import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-oyrial-charcoal text-oyrial-offwhite py-16">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <Link to="/" className="font-serif text-2xl tracking-wider">
          Oyrial
        </Link>
        <div className="flex items-center gap-6 text-sm text-oyrial-muted">
          <a
            href="https://instagram.com/oyrial"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-oyrial-offwhite transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://wa.me/8801XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-oyrial-offwhite transition-colors"
          >
            WhatsApp
          </a>
          <a href="mailto:hello@oyrial.com" className="hover:text-oyrial-offwhite transition-colors">
            hello@oyrial.com
          </a>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-oyrial-muted/20 text-center text-xs text-oyrial-muted">
        © 2025 Oyrial. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
