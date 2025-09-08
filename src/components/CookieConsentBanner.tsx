import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const COOKIE_CONSENT_KEY = "cookieConsent";

// Placeholder for enabling analytics/tracking scripts
function enableCookies() {
  // TODO: Add analytics/tracking script enabling logic here
  // Example: window.gtag('consent', 'update', { ad_storage: 'granted' });
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

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
      className="fixed z-50 w-[95vw] max-w-sm card-modern p-4 flex flex-col gap-4 items-start border border-border bg-background/95 text-foreground shadow-elegant backdrop-blur-md animate-in fade-in slide-in-from-bottom-4"
      style={{
        left: "50%",
        right: "auto",
        transform: "translateX(-50%)",
        bottom: "5.5rem",
        maxWidth: "95vw",
      }}
    >
    <div className="text-sm md:text-base">
      {t("cookieBanner.text")} {" "}
      <a
        href="/cookiepolicy"
        className="underline text-primary hover:text-primary/80 transition-colors font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("cookieBanner.policyLink")}
      </a>
      .
    </div>
  <div className="flex gap-2 self-end">
        <button
          className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold shadow hover:bg-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={handleAccept}
          aria-label="Acceptér cookies"
        >
          {t("cookieBanner.accept")}
        </button>
        <button
          className="bg-gray-200 text-black px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleReject}
          aria-label="Afvis cookies"
        >
          {t("cookieBanner.reject")}
        </button>
      </div>
    </div>
  );
}
