 import { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Always required
  analytics: false,
  functional: false,
  marketing: false,
};

 const CookieConsentInner = forwardRef<HTMLDivElement>((_, ref) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay before showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleAcceptEssential = () => {
    saveConsent(defaultPreferences);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

   return (
     <AnimatePresence>
      {showBanner && (
        <motion.div
           ref={ref}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {!showPreferences ? (
                /* Main Banner */
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-12 h-12 rounded-xl bg-teal/10 items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-teal" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        We value your privacy
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                        By clicking "Accept All", you consent to our use of cookies. 
                        Read our{" "}
                        <Link to="/cookies" className="text-teal hover:text-lime underline transition-colors">
                          Cookie Policy
                        </Link>{" "}
                        to learn more.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={handleAcceptAll}
                          className="bg-teal hover:bg-teal/90 text-white"
                        >
                          Accept All
                        </Button>
                        <Button
                          onClick={handleAcceptEssential}
                          variant="outline"
                          className="border-border"
                        >
                          Essential Only
                        </Button>
                        <Button
                          onClick={() => setShowPreferences(true)}
                          variant="ghost"
                          className="gap-2"
                        >
                          <Settings className="w-4 h-4" />
                          Manage Preferences
                        </Button>
                      </div>
                    </div>
                    <button
                      onClick={handleAcceptEssential}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Close cookie banner"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Preferences Panel */
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Cookie Preferences
                    </h3>
                    <button
                      onClick={() => setShowPreferences(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {/* Essential Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">Essential Cookies</span>
                          <span className="text-xs px-2 py-0.5 bg-teal/10 text-teal rounded-full">Required</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Necessary for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                      <div className="flex items-center h-6">
                        <div className="w-10 h-5 bg-teal rounded-full relative cursor-not-allowed opacity-70">
                          <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-foreground block mb-1">Analytics Cookies</span>
                        <p className="text-sm text-muted-foreground">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                      <button
                        onClick={() => togglePreference("analytics")}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          preferences.analytics ? "bg-teal" : "bg-muted-foreground/30"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                            preferences.analytics ? "right-0.5" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Functional Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-foreground block mb-1">Functional Cookies</span>
                        <p className="text-sm text-muted-foreground">
                          Enable personalized features and remember your preferences.
                        </p>
                      </div>
                      <button
                        onClick={() => togglePreference("functional")}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          preferences.functional ? "bg-teal" : "bg-muted-foreground/30"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                            preferences.functional ? "right-0.5" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-foreground block mb-1">Marketing Cookies</span>
                        <p className="text-sm text-muted-foreground">
                          Used to deliver relevant advertisements and track campaign effectiveness.
                        </p>
                      </div>
                      <button
                        onClick={() => togglePreference("marketing")}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          preferences.marketing ? "bg-teal" : "bg-muted-foreground/30"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                            preferences.marketing ? "right-0.5" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleSavePreferences}
                      className="bg-teal hover:bg-teal/90 text-white"
                    >
                      Save Preferences
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      variant="outline"
                      className="border-border"
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
 });
 
 CookieConsentInner.displayName = "CookieConsent";
 
 export const CookieConsent = CookieConsentInner;
