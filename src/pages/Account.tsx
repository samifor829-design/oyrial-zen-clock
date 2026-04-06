import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import FadeUp from "@/components/FadeUp";

const Account = () => {
  const { user, logout, updateProfile } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [tab, setTab] = useState<"orders" | "wishlist" | "settings">("orders");
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: user?.phone || "" });

  if (!user) return <Navigate to="/" replace />;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: profileForm.name, phone: profileForm.phone });
    toast.success("Profile updated");
  };

  const tabs = [
    { key: "orders", label: "Order History" },
    { key: "wishlist", label: "Saved Wishlist" },
    { key: "settings", label: "Profile Settings" },
  ] as const;

  return (
    <main className="bg-oyrial-offwhite pt-24 pb-20 min-h-screen">
      <div className="container max-w-3xl">
        <FadeUp>
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-oyrial-charcoal">
              Hello, {user.name.split(" ")[0]}
            </h1>
            <button
              onClick={logout}
              className="text-sm text-oyrial-muted hover:text-oyrial-charcoal underline transition-colors"
            >
              Logout
            </button>
          </div>
        </FadeUp>

        {/* Tabs */}
        <FadeUp delay={100}>
          <div className="flex gap-6 border-b border-oyrial-charcoal/10 pb-4 mb-8">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`text-sm tracking-widest uppercase transition-colors pb-1 ${
                  tab === t.key ? "text-oyrial-charcoal border-b-2 border-oyrial-charcoal" : "text-oyrial-muted hover:text-oyrial-charcoal"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {tab === "orders" && (
          <FadeUp>
            <div className="text-center py-16">
              <p className="text-oyrial-muted">No orders yet.</p>
              <Link
                to="/shop"
                className="mt-4 inline-flex items-center px-6 py-3 bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase min-h-[48px]"
              >
                Start Shopping
              </Link>
            </div>
          </FadeUp>
        )}

        {tab === "wishlist" && (
          <FadeUp>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-oyrial-muted">Your wishlist is empty.</p>
                <Link to="/shop" className="mt-4 inline-flex items-center px-6 py-3 bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase min-h-[48px]">
                  Browse Collection
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <Link key={item.id} to={`/product/${item.id}`} className="flex gap-4 border-b border-oyrial-charcoal/10 pb-4 hover:opacity-80 transition-opacity">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-oyrial-grey" />
                    <div>
                      <h3 className="font-serif text-lg text-oyrial-charcoal">{item.name}</h3>
                      <p className="text-sm text-oyrial-muted">৳&nbsp;{item.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </FadeUp>
        )}

        {tab === "settings" && (
          <FadeUp>
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Full Name</label>
                <Input value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="border-oyrial-charcoal/20 bg-transparent text-oyrial-charcoal" />
              </div>
              <div>
                <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Email</label>
                <Input value={user.email} disabled className="border-oyrial-charcoal/20 bg-oyrial-grey/50 text-oyrial-muted" />
              </div>
              <div>
                <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Phone</label>
                <Input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="border-oyrial-charcoal/20 bg-transparent text-oyrial-charcoal" />
              </div>
              <button type="submit" className="px-6 py-3 bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase hover:bg-oyrial-black transition-colors min-h-[48px]">
                Save Changes
              </button>
            </form>
          </FadeUp>
        )}
      </div>
    </main>
  );
};

export default Account;
