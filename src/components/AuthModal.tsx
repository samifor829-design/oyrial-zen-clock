import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const { login, signup } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirm: "", phone: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(loginForm.email, loginForm.password);
    if (ok) {
      toast.success("Welcome back!");
      onOpenChange(false);
      setLoginForm({ email: "", password: "" });
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (signupForm.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const ok = signup(signupForm.name, signupForm.email, signupForm.password, signupForm.phone);
    if (ok) {
      toast.success("Account created successfully!");
      onOpenChange(false);
      setSignupForm({ name: "", email: "", password: "", confirm: "", phone: "" });
    } else {
      toast.error("An account with this email already exists");
    }
  };

  const inputClasses = "border-oyrial-charcoal/20 bg-transparent text-oyrial-charcoal";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-oyrial-offwhite border-oyrial-charcoal/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-oyrial-charcoal text-center">
            {tab === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b border-oyrial-charcoal/10 mb-4">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 pb-3 text-sm tracking-widest uppercase transition-colors ${
              tab === "login" ? "text-oyrial-charcoal border-b-2 border-oyrial-charcoal" : "text-oyrial-muted"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 pb-3 text-sm tracking-widest uppercase transition-colors ${
              tab === "signup" ? "text-oyrial-charcoal border-b-2 border-oyrial-charcoal" : "text-oyrial-muted"
            }`}
          >
            Create Account
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Email</label>
              <Input required type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Password</label>
              <Input required type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className={inputClasses} />
            </div>
            <button type="submit" className="w-full bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase py-4 hover:bg-oyrial-black transition-colors min-h-[48px]">
              Login
            </button>
            <p className="text-center text-xs text-oyrial-muted">
              Forgot your password?{" "}
              <a href="https://wa.me/8801XXXXXXXXX?text=Hi%20Oyrial!%20I%20forgot%20my%20password." target="_blank" rel="noopener noreferrer" className="underline hover:text-oyrial-charcoal">
                Contact us
              </a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Full Name *</label>
              <Input required value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Email *</label>
              <Input required type="email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Password *</label>
              <Input required type="password" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Confirm Password *</label>
              <Input required type="password" value={signupForm.confirm} onChange={(e) => setSignupForm({ ...signupForm, confirm: e.target.value })} className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs text-oyrial-muted uppercase tracking-wider mb-1">Phone Number *</label>
              <Input required type="tel" value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} className={inputClasses} />
            </div>
            <button type="submit" className="w-full bg-oyrial-charcoal text-oyrial-offwhite text-sm tracking-widest uppercase py-4 hover:bg-oyrial-black transition-colors min-h-[48px]">
              Create My Account
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
