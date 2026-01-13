import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff, User, Briefcase } from "lucide-react";
import { z } from "zod";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

const authSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100).optional(),
});

const CandidateLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const { token: captchaToken, isVerified: isCaptchaVerified, handleVerify, handleExpire, handleError, reset: resetCaptcha } = useTurnstile();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user is a candidate
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "candidate")
          .maybeSingle();
        
        if (roleData) {
          navigate("/candidate/dashboard");
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaVerified) {
      toast.error("Please complete the CAPTCHA verification.");
      return;
    }
    
    setIsLoading(true);

    try {
      const validatedData = authSchema.parse({
        email,
        password,
        fullName: mode === "signup" ? fullName : undefined,
      });

      if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/`;
        const { data, error } = await supabase.auth.signUp({
          email: validatedData.email,
          password: validatedData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: validatedData.fullName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          // Assign candidate role
          const { error: roleError } = await supabase.from("user_roles").insert({
            user_id: data.user.id,
            role: "candidate",
          });

          if (roleError && !roleError.message.includes("duplicate")) {
            console.error("Role assignment error:", roleError);
          }
        }

        toast.success("Account created! Please check your email to verify.");
        resetCaptcha();
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: validatedData.email,
          password: validatedData.password,
        });

        if (error) throw error;

        toast.success("Welcome back!");
        resetCaptcha();
        navigate("/candidate/dashboard");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      resetCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-lime rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-navy" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                  {mode === "login" ? "Candidate Login" : "Create Account"}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {mode === "login"
                    ? "Sign in to track your job applications"
                    : "Join us to apply for exciting opportunities"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onVerify={handleVerify}
                    onExpire={handleExpire}
                    onError={handleError}
                    theme="auto"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal to-lime text-navy font-semibold hover:opacity-90"
                  disabled={isLoading || !isCaptchaVerified}
                >
                  {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-primary hover:underline text-sm"
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

export default CandidateLogin;
