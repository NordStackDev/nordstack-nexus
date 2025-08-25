import React, { useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-2">
      <div className="w-full max-w-xl bg-background/80 border border-white/10 shadow-xl rounded-2xl p-8 md:p-12 backdrop-blur-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-white drop-shadow">
          Kontakt os
        </h1>
        <p className="mb-2 text-center text-gray-300">
          Har du spørgsmål eller ønsker du at komme i kontakt med os? Udfyld
          formularen nedenfor.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-semibold text-white/80 tracking-wide"
            >
              Navn
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition"
              placeholder="Dit navn"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-white/80 tracking-wide"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition"
              placeholder="din@email.dk"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-1 font-semibold text-white/80 tracking-wide"
            >
              Telefonnummer
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9 +]*"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition"
              placeholder="Dit telefonnummer (valgfrit)"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-1 font-semibold text-white/80 tracking-wide"
            >
              Besked
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition"
              placeholder="Skriv din besked her..."
              disabled={loading}
            />
          </div>
          {error && (
            <div className="text-red-400 text-center font-medium">{error}</div>
          )}
          {success && (
            <div className="text-green-400 text-center font-medium">
              Besked sendt! Tak for din henvendelse, vi vender tilbage til dig
              indefor 24 timer.
            </div>
          )}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#FFD700] text-black font-semibold py-3 rounded-xl shadow hover:bg-yellow-400 transition-colors text-lg mt-2 disabled:opacity-60"
            disabled={loading}
          >
            <Send className="w-5 h-5" />
            {loading ? "Sender..." : "Send besked"}
          </button>
          <div className="mb-8 text-center text-yellow-300 font-medium">
            Vi vender tilbage via angivet telefon eller mail indenfor 24 timer.
          </div>
        </form>
      </div>
    </div>
  );
}
