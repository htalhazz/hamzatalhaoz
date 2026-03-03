"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const serviceChoices = [
  "Web Geliştirme",
  "Mobil Uygulama",
  "UI/UX Tasarım",
  "Diğer",
];

const budgetChoices = [
  "₺5.000 - ₺10.000",
  "₺10.000 - ₺25.000",
  "₺25.000 - ₺50.000",
  "₺50.000+",
];

export default function Contact({ onQuoteOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mesajınız gönderildi! En kısa sürede dönüş yapacağım.");
    setFormData({ name: "", email: "", service: "", budget: "", message: "" });
  };

  return (
    <section id="contact" className="relative bg-white py-24 md:py-32 overflow-hidden border-b-2 border-black">
      {/* Dikey "İletişim" yazısı - SOL */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
      >
        <span
          className="font-[family-name:var(--font-sora)] text-[8rem] font-bold uppercase tracking-widest text-black/5 select-none whitespace-nowrap block"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          İletişim
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-red-600" />
              <span className="font-[family-name:var(--font-sora)] text-red-600 font-bold text-sm uppercase tracking-widest">
                İletişim
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-black">
              Projenizi
              <br />
              <span className="text-red-600">Konuşalım</span>
            </h2>

            <p className="text-black/50 text-lg leading-relaxed max-w-md">
              Hızlı teklif almak için wizard&apos;ımızı kullanabilir veya detaylı
              mesajınızı bu form aracılığıyla iletebilirsiniz.
            </p>

            <button
              onClick={onQuoteOpen}
              className="inline-flex items-center gap-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wide px-8 py-4 border-2 border-red-600 hover:bg-black hover:border-black hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-0 w-fit cursor-pointer"
            >
              Hızlı Teklif Al
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <div className="flex flex-col gap-5 mt-4">
              {[
                {
                  label: "E-posta",
                  value: "hamzatalha40681@gmail.com",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ),
                },
                {
                  label: "Konum",
                  value: "Kayseri, Türkiye",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-red-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-black/40">
                      {item.label}
                    </div>
                    <div className="font-[family-name:var(--font-sora)] font-semibold text-black">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                    İsim
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                    placeholder="Adınız"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                    placeholder="E-posta adresiniz"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                    Hizmet Alanı
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Seçiniz</option>
                    {serviceChoices.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                    Bütçe Aralığı
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Seçiniz</option>
                    {budgetChoices.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                  Mesaj
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors resize-none"
                  placeholder="Projeniz hakkında kısaca bilgi verin..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 bg-black text-white font-bold text-sm uppercase tracking-wide px-8 py-4 border-2 border-black hover:bg-red-600 hover:border-red-600 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] active:shadow-none active:translate-y-0 w-full"
              >
                Mesaj Gönder
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
