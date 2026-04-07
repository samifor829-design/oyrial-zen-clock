import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { products } from "@/data/products";

interface SearchBarProps {
  open: boolean;
  onClose: () => void;
}

const SearchBar = ({ open, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const filtered = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      className={`fixed left-0 right-0 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
        open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
      }`}
      style={{ top: "64px" }}
    >
      <div className="bg-background border-b border-border shadow-lg">
        <div className="container flex items-center gap-4 py-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clocks..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none font-sans"
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>
        {query.trim() && (
          <div className="container pb-4">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">No results found.</p>
            ) : (
              <div className="space-y-2">
                {filtered.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 py-2 hover:opacity-70 transition-opacity"
                  >
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover" />
                    <div>
                      <p className="text-sm font-sans text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">৳&nbsp;{p.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
