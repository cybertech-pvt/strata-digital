import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";
import { cn } from "@/lib/utils";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const { token: turnstileToken, isVerified, handleVerify, handleExpire, handleError, reset: resetTurnstile } = useTurnstile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verify CAPTCHA before submission
    if (!isVerified || !turnstileToken) {
      toast({
        variant: "destructive",
        title: "Verification Required",
        description: "Please complete the CAPTCHA verification.",
      });
      return;
    }

    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: result.error.errors[0].message,
      });
      return;
    }

    setIsLoading(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();
      
      // Check rate limit before submission
      const { data: rateLimitData, error: rateLimitError } = await supabase.functions.invoke('rate-limit', {
        body: { formType: 'newsletter', email: trimmedEmail }
      });

      if (rateLimitError) {
        console.error('Rate limit check failed:', rateLimitError);
        // Continue with submission if rate limit check fails (fail-open for UX)
      } else if (rateLimitData && !rateLimitData.allowed) {
        toast({
          variant: "destructive",
          title: "Too Many Requests",
          description: rateLimitData.error || "Please wait before subscribing again.",
        });
        setIsLoading(false);
        return;
      }

      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: trimmedEmail });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        setEmail("");
        resetTurnstile();
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Newsletter subscription error:", error);
      }
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={ref} className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-50" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime/10 rounded-full opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          className={cn(
            "max-w-2xl mx-auto text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay Ahead of the Curve
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Subscribe to our newsletter for the latest insights on cybersecurity, 
            digital transformation, and technology trends delivered to your inbox.
          </p>

          {isSubscribed ? (
            <div
              className={cn(
                "flex items-center justify-center gap-3 text-lime transition-all duration-500",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
            >
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-medium">
                You're subscribed! Watch your inbox for our latest insights.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={cn(
                "flex flex-col sm:flex-row gap-4 max-w-md mx-auto transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: "200ms" }}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/20 text-white placeholder:text-white/50 focus:border-teal h-12"
                disabled={isLoading}
                required
              />
              <Button
                type="submit"
                size="lg"
                className="gradient-cta text-white hover:opacity-90 shadow-glow h-12 px-8"
                disabled={isLoading || !isVerified}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}
          
          {!isSubscribed && (
            <div
              className={cn(
                "flex justify-center mt-4 transition-all duration-700",
                isVisible ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              <Turnstile
                siteKey={TURNSTILE_SITE_KEY}
                onVerify={handleVerify}
                onExpire={handleExpire}
                onError={handleError}
                theme="dark"
                size="compact"
              />
            </div>
          )}

          <p
            className={cn(
              "text-white/50 text-sm mt-4 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
