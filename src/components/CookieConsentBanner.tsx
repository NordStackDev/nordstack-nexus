import React, { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookieConsent";

// Placeholder for enabling analytics/tracking scripts
function enableCookies() {
  // TODO: Add analytics/tracking script enabling logic here
  // Example: window.gtag('consent', 'update', { ad_storage: 'granted' });
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    enableCookies();
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed z-50 w-[95vw] max-w-sm card-modern p-4 flex flex-col gap-4 items-start border border-border bg-background/95 text-foreground shadow-elegant backdrop-blur-md animate-in fade-in slide-in-from-bottom-4"
      style={{
        left: "50%",
        right: "auto",
        transform: "translateX(-50%)",
        bottom: "5.5rem", // move up above mobile navbar (adjust as needed)
        maxWidth: "95vw",
      }}
    >
  <div className="text-sm md:text-base">
        Vi bruger cookies for at forbedre din oplevelse. Læs vores{" "}
        <a
          href="/cookiepolicy"
          className="underline text-primary hover:text-primary/80 transition-colors font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          cookiepolitik
        </a>
        .
      </div>
  <div className="flex gap-2 self-end">
        <button
          onClick={handleAccept}
          className="btn-primary px-5 py-2 font-semibold shadow-card hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          Accepter
        </button>
        <button
          onClick={handleReject}
          className="btn-cta px-5 py-2 font-semibold hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-border"
        >
          Afvis
        </button>
      </div>
    </div>
  );
}
