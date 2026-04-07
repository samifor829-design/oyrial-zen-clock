import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Bell, Globe, Lock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import FadeUp from "@/components/FadeUp";

const Settings = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  if (!user) return <Navigate to="/" replace />;

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    toast.success("Password updated successfully");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleDeleteAccount = () => {
    logout();
    toast.success("Account deleted");
  };

  return (
    <main className="bg-background pt-24 pb-20 min-h-screen">
      <div className="container max-w-2xl">
        <FadeUp>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-10">Settings</h1>
        </FadeUp>

        <div className="space-y-8">
          {/* Notifications */}
          <FadeUp delay={50}>
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground font-sans">Order Update Notifications</p>
                  <p className="text-xs text-muted-foreground">{notifications ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setNotifications(!notifications);
                  toast.success(notifications ? "Notifications disabled" : "Notifications enabled");
                }}
                className="relative w-12 h-6 rounded-full bg-muted transition-colors"
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${notifications ? "left-6" : "left-0.5"}`} />
              </button>
            </div>
          </FadeUp>

          {/* Language */}
          <FadeUp delay={100}>
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground font-sans">Language</p>
                  <p className="text-xs text-muted-foreground">{language === "en" ? "English" : "বাংলা"}</p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  toast.success(`Language set to ${e.target.value === "en" ? "English" : "বাংলা"}`);
                }}
                className="bg-muted text-foreground text-sm px-3 py-1.5 border border-border outline-none font-sans"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>
          </FadeUp>

          {/* Change Password */}
          <FadeUp delay={150}>
            <div className="py-4 border-b border-border">
              <div className="flex items-center gap-3 mb-4">
                <Lock size={18} className="text-muted-foreground" />
                <p className="text-sm text-foreground font-sans">Change Password</p>
              </div>
              <form onSubmit={handleChangePassword} className="space-y-3 max-w-sm">
                <Input type="password" placeholder="Current password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="border-border bg-transparent text-foreground" />
                <Input type="password" placeholder="New password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} className="border-border bg-transparent text-foreground" />
                <Input type="password" placeholder="Confirm new password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="border-border bg-transparent text-foreground" />
                <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:opacity-90 transition-opacity min-h-[48px] font-sans">
                  Update Password
                </button>
              </form>
            </div>
          </FadeUp>

          {/* Delete Account */}
          <FadeUp delay={200}>
            <div className="py-4">
              <div className="flex items-center gap-3 mb-3">
                <Trash2 size={18} className="text-destructive" />
                <p className="text-sm text-destructive font-sans">Delete Account</p>
              </div>
              {!deleteConfirm ? (
                <button onClick={() => setDeleteConfirm(true)} className="px-6 py-3 bg-destructive text-destructive-foreground text-sm tracking-widest uppercase min-h-[48px] hover:opacity-90 transition-opacity font-sans">
                  Delete My Account
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-destructive font-sans">This action is permanent and cannot be undone. All your data will be lost.</p>
                  <div className="flex gap-3">
                    <button onClick={handleDeleteAccount} className="px-6 py-3 bg-destructive text-destructive-foreground text-sm tracking-widest uppercase min-h-[48px] font-sans">Confirm Delete</button>
                    <button onClick={() => setDeleteConfirm(false)} className="px-6 py-3 bg-muted text-foreground text-sm tracking-widest uppercase min-h-[48px] font-sans">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </main>
  );
};

export default Settings;
