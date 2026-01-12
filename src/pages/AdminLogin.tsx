import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

type Mode = "login" | "forgot-password" | "reset-sent";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<Mode>("login");
  
  const { signIn, user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect already authenticated admins
  useEffect(() => {
    const checkAdminRole = async () => {
      if (loading) return;
      if (!user) return;
      
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (data) {
        navigate("/secure-admin/dashboard", { replace: true });
      }
    };
    checkAdminRole();
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Verify admin role before redirecting
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", authUser.id)
            .eq("role", "admin")
            .maybeSingle();

          if (roleData) {
            toast({
              title: "Welcome Back",
              description: "You have been successfully logged in.",
            });
            navigate("/secure-admin/dashboard");
          } else {
            await supabase.auth.signOut();
            toast({
              title: "Access Denied",
              description: "You do not have admin privileges.",
              variant: "destructive",
            });
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/secure-admin/login`,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setMode("reset-sent");
        toast({
          title: "Email Sent",
          description: "Check your inbox for password reset instructions.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderForgotPassword = () => (
    <div className="bg-navy-light rounded-2xl p-8 border border-teal/20 shadow-glow">
      <div className="text-center mb-8">
        <img
          src={logoDark}
          alt="CYBERVIBE"
          className="h-12 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
        <p className="text-white/60 mt-2">
          Enter your email to receive reset instructions
        </p>
      </div>

      <form onSubmit={handleForgotPassword} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-navy border-teal/30 text-white placeholder:text-white/40 focus:border-teal"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full gradient-cta text-white hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setMode("login")}
          className="text-teal hover:text-lime transition-colors text-sm inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>
      </div>
    </div>
  );

  const renderResetSent = () => (
    <div className="bg-navy-light rounded-2xl p-8 border border-teal/20 shadow-glow">
      <div className="text-center mb-8">
        <img
          src={logoDark}
          alt="CYBERVIBE"
          className="h-12 mx-auto mb-4"
        />
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-lime/20 flex items-center justify-center">
          <Mail className="w-8 h-8 text-lime" />
        </div>
        <h1 className="text-2xl font-bold text-white">Check Your Email</h1>
        <p className="text-white/60 mt-2">
          We've sent password reset instructions to:
        </p>
        <p className="text-teal font-medium mt-1">{email}</p>
      </div>

      <div className="space-y-4">
        <p className="text-white/50 text-sm text-center">
          Didn't receive the email? Check your spam folder or try again.
        </p>
        <Button
          onClick={() => setMode("forgot-password")}
          variant="outline"
          className="w-full border-teal/30 text-teal hover:bg-teal/10"
        >
          Try Again
        </Button>
        <Button
          onClick={() => setMode("login")}
          className="w-full gradient-cta text-white hover:opacity-90"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="bg-navy-light rounded-2xl p-8 border border-teal/20 shadow-glow">
      <div className="text-center mb-8">
        <img
          src={logoDark}
          alt="CYBERVIBE"
          className="h-12 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-white">Admin Login</h1>
        <p className="text-white/60 mt-2">
          Sign in to access the admin dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-navy border-teal/30 text-white placeholder:text-white/40 focus:border-teal"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-navy border-teal/30 text-white placeholder:text-white/40 focus:border-teal"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full gradient-cta text-white hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setMode("forgot-password")}
          className="text-teal hover:text-lime transition-colors text-sm"
        >
          Forgot your password?
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/10 rounded-full border border-teal/20">
            <Shield className="w-4 h-4 text-teal" />
            <span className="text-teal text-xs font-medium">Secure Admin Portal</span>
          </div>
        </div>
        {mode === "login" && renderLogin()}
        {mode === "forgot-password" && renderForgotPassword()}
        {mode === "reset-sent" && renderResetSent()}
      </div>
    </div>
  );
};

export default AdminLogin;
