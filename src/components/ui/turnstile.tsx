import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    turnstile: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  className?: string;
}

// Use Cloudflare's testing keys for development
const TURNSTILE_TEST_SITEKEY = "1x00000000000000000000AA"; // Always passes

export const Turnstile = ({
  siteKey,
  onVerify,
  onExpire,
  onError,
  theme = "dark",
  size = "normal",
  className = "",
}: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey || TURNSTILE_TEST_SITEKEY,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": onError,
        theme,
        size,
      });
    } catch (error) {
      console.error("Turnstile render error:", error);
    }
  }, [siteKey, onVerify, onExpire, onError, theme, size]);

  useEffect(() => {
    // Check if script already loaded
    if (window.turnstile) {
      setIsLoaded(true);
      return;
    }

    // Load Turnstile script
    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => setIsLoaded(true));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
    script.async = true;
    script.defer = true;

    window.onloadTurnstileCallback = () => {
      setIsLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      renderWidget();
    }
  }, [isLoaded, renderWidget]);

  // Reset function to expose via ref if needed
  const reset = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={className}
      data-turnstile-reset={reset}
    />
  );
};

// Hook for easier integration
export const useTurnstile = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = useCallback((newToken: string) => {
    setToken(newToken);
    setIsVerified(true);
  }, []);

  const handleExpire = useCallback(() => {
    setToken(null);
    setIsVerified(false);
  }, []);

  const handleError = useCallback(() => {
    setToken(null);
    setIsVerified(false);
  }, []);

  const reset = useCallback(() => {
    setToken(null);
    setIsVerified(false);
  }, []);

  return {
    token,
    isVerified,
    handleVerify,
    handleExpire,
    handleError,
    reset,
  };
};
