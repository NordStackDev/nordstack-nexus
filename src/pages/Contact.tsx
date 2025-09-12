import React, { useState } from "react";
import { Seo } from "@/components/Seo";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error } = await supabase.from("messages").insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      },
    ]);
    setLoading(false);
    if (error) {
      setError("Noget gik galt. Prøv igen senere.");
    } else {
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <Seo
      title="Kontakt | NordStack Nexus"
      description="Kontakt NordStack Nexus for spørgsmål, samarbejde eller support. Udfyld kontaktformularen og vi vender hurtigt tilbage."
      ogImage="/opengraph-image.webp"
      url="https://nordstack.dev/contact"
    >
      <main className="min-h-[60vh] flex items-center justify-center py-16 px-2">
        <section className="w-full max-w-xl bg-background/80 border border-white/10 shadow-xl rounded-2xl p-8 md:p-12 backdrop-blur-lg">
          <h1 className="text-3xl font-bold mb-4 text-center text-white drop-shadow">
            {t("contact.title")}
          </h1>
          <p className="mb-2 text-center text-gray-300">
            {t("contact.intro")}
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-semibold text-white/80 tracking-wide"
              >
                {t("contact.name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition"
                placeholder={t("contact.namePlaceholder")}
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-semibold text-white/80 tracking-wide"
              >
                {t("contact.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition"
                placeholder={t("contact.emailPlaceholder")}
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 font-semibold text-white/80 tracking-wide"
              >
                {t("contact.phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                pattern="[0-9 +]*"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition"
                placeholder={t("contact.phonePlaceholder")}
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-1 font-semibold text-white/80 tracking-wide"
              >
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition"
                placeholder={t("contact.messagePlaceholder")}
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-red-400 text-center font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-400 text-center font-medium">
                {t("contact.success")}
              </div>
            )}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#FFD700] text-black font-semibold py-3 rounded-xl shadow hover:bg-yellow-400 transition-colors text-lg mt-2 disabled:opacity-60"
              disabled={loading}
            >
              <Send className="w-5 h-5" />
              {loading ? t("contact.sending") : t("contact.send")}
            </button>
            <div className="mb-8 text-center text-yellow-300 font-medium">
              {t("contact.info")}
            </div>
          </form>
        </section>
      </main>
    </Seo>
  );
}
