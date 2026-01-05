import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome Back",
            description: "You have been successfully logged in.",
          });
          navigate("/admin");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created",
            description: "Your account has been created. You can now log in.",
          });
          setMode("login");
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

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen bg-navy">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-navy-light rounded-2xl p-8 border border-teal/20 shadow-glow">
              <div className="text-center mb-8">
                <img
                  src={logoDark}
                  alt="CYBERVIBE"
                  className="h-12 mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-white">
                  {mode === "login" ? "Admin Login" : "Create Account"}
                </h1>
                <p className="text-white/60 mt-2">
                  {mode === "login"
                    ? "Sign in to access the admin dashboard"
                    : "Create a new admin account"}
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
                  {isLoading
                    ? "Please wait..."
                    : mode === "login"
                    ? "Sign In"
                    : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-teal hover:text-lime transition-colors text-sm"
                >
                  {mode === "login"
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
