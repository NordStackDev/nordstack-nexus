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
      role="dialog"
      aria-live="polite"
      aria-label="Cookie samtykke"
      className="fixed z-50 w-[95vw] max-w-sm card-modern p-4 flex flex-col gap-4 items-start border border-border bg-background/95 text-foreground shadow-elegant backdrop-blur-md animate-in fade-in slide-in-from-bottom-4"
      style={{
        left: "50%",
        right: "auto",
        transform: "translateX(-50%)",
      }}
    >
      <span className="text-sm" id="cookie-banner-desc">
        Vi bruger cookies til at forbedre din oplevelse. Læs vores{" "}
        <a href="/cookiepolicy" className="underline">
          cookiepolitik
        </a>
        .
      </span>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-[#FFD700] text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={handleAccept}
          aria-label="Acceptér cookies"
        >
          Acceptér
        </button>
        <button
          className="bg-gray-200 text-black px-4 py-2 rounded font-semibold hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleReject}
          aria-label="Afvis cookies"
        >
          Afvis
        </button>
      </div>
    </div>
  );
}
