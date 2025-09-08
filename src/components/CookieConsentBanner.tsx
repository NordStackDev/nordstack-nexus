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
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie samtykke"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md p-6 flex flex-col gap-4 items-start border border-border bg-background/95 text-foreground shadow-lg rounded-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4"
      style={{}}
    >
      <span className="text-sm" id="cookie-banner-desc">
        Vi bruger cookies til at forbedre din oplevelse. Læs vores{" "}
        <a
          href="/cookiepolicy"
          className="underline font-semibold hover:text-yellow-500 transition"
        >
          cookiepolitik
        </a>
        .
      </span>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold shadow hover:bg-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={handleAccept}
          aria-label="Acceptér cookies"
        >
          Acceptér
        </button>
        <button
          className="bg-gray-200 text-black px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleReject}
          aria-label="Afvis cookies"
        >
          Afvis
        </button>
      </div>
    </div>
  );
}
