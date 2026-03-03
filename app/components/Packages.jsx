"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "web", label: "Web Geliştirme" },
  { id: "mobile", label: "Mobil Uygulama" },
  { id: "uiux", label: "UI/UX Tasarım" },
];

const packages = {
  web: [
    {
      name: "Starter",
      description: "Küçük işletmeler ve bireysel projeler için ideal başlangıç paketi.",
      price: "₺8.000'den",
      highlight: false,
      features: [
        "Tek Sayfa (Landing Page)",
        "Responsive Tasarım",
        "SEO Temel Optimizasyon",
        "İletişim Formu",
        "1 Revizyon Hakkı",
        "7 Gün Teslimat",
      ],
    },
    {
      name: "Profesyonel",
      description: "Büyüyen işletmeler için kapsamlı web çözümü.",
      price: "₺20.000'den",
      highlight: true,
      features: [
        "5 Sayfaya Kadar",
        "Özel Tasarım & Animasyonlar",
        "Gelişmiş SEO",
        "Admin Paneli (CMS)",
        "Performans Optimizasyonu",
        "3 Revizyon Hakkı",
        "14 Gün Teslimat",
      ],
    },
    {
      name: "Kurumsal",
      description: "Uçtan uca full-stack web uygulaması geliştirme.",
      price: "Teklif Al",
      highlight: false,
      features: [
        "Sınırsız Sayfa",
        "Full-Stack Geliştirme",
        "API Entegrasyonları",
        "Ödeme Sistemi",
        "Veritabanı Tasarımı",
        "Sınırsız Revizyon",
        "Özel Zaman Planı",
        "1 Ay Ücretsiz Destek",
      ],
    },
  ],
  mobile: [
    {
      name: "Starter",
      description: "MVP veya basit mobil uygulama projeleri için.",
      price: "₺15.000'den",
      highlight: false,
      features: [
        "Tek Platform (iOS veya Android)",
        "5 Ekrana Kadar",
        "Temel UI Tasarımı",
        "Push Bildirimler",
        "1 Revizyon Hakkı",
        "14 Gün Teslimat",
      ],
    },
    {
      name: "Profesyonel",
      description: "Her iki platformda da çalışan profesyonel uygulama.",
      price: "₺35.000'den",
      highlight: true,
      features: [
        "iOS & Android (Cross-Platform)",
        "15 Ekrana Kadar",
        "Özel UI/UX Tasarım",
        "Backend Entegrasyonu",
        "Kullanıcı Yetkilendirme",
        "3 Revizyon Hakkı",
        "21 Gün Teslimat",
      ],
    },
    {
      name: "Kurumsal",
      description: "Ölçeklenebilir, karmaşık mobil uygulama çözümü.",
      price: "Teklif Al",
      highlight: false,
      features: [
        "iOS & Android Native/Cross",
        "Sınırsız Ekran",
        "Gerçek Zamanlı Özellikler",
        "Ödeme & Harita Entegrasyonu",
        "Admin Paneli",
        "App Store Yayın Desteği",
        "Sınırsız Revizyon",
        "2 Ay Ücretsiz Destek",
      ],
    },
  ],
  uiux: [
    {
      name: "Starter",
      description: "Proje başlangıcı için wireframe ve temel tasarım.",
      price: "₺5.000'den",
      highlight: false,
      features: [
        "Wireframe Tasarımı",
        "5 Ekrana Kadar",
        "Temel Renk & Tipografi",
        "Figma Dosyası Teslimi",
        "1 Revizyon Hakkı",
        "5 Gün Teslimat",
      ],
    },
    {
      name: "Profesyonel",
      description: "Tam kapsamlı UI/UX tasarım ve prototipleme.",
      price: "₺12.000'den",
      highlight: true,
      features: [
        "Kullanıcı Araştırması",
        "15 Ekrana Kadar",
        "Tam UI Kit",
        "İnteraktif Prototip",
        "Responsive Varyantlar",
        "3 Revizyon Hakkı",
        "10 Gün Teslimat",
      ],
    },
    {
      name: "Kurumsal",
      description: "Kapsamlı tasarım sistemi ve marka kimliği.",
      price: "Teklif Al",
      highlight: false,
      features: [
        "Tasarım Sistemi (Design System)",
        "Sınırsız Ekran",
        "Component Library",
        "Kullanılabilirlik Testi",
        "Marka Kimliği Uyumu",
        "Geliştirici Handoff",
        "Sınırsız Revizyon",
        "Özel Zaman Planı",
      ],
    },
  ],
};

export default function Packages({ onQuoteOpen }) {
  const [activeCategory, setActiveCategory] = useState("web");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="packages" className="relative bg-white py-24 md:py-32 overflow-hidden border-b-2 border-black">
      {/* Dikey "Paketler" yazısı - SAĞ */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
      >
        <span
          className="font-[family-name:var(--font-sora)] text-[8rem] font-bold uppercase tracking-widest text-black/5 select-none whitespace-nowrap block"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Paketler
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-12 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-red-600" />
            <span className="font-[family-name:var(--font-sora)] text-red-600 font-bold text-sm uppercase tracking-widest">
              Hizmet Paketleri
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-black">
            Paketler & Fiyatlar
          </h2>
          <p className="text-black/50 max-w-xl text-lg">
            İhtiyacınıza uygun paketi seçin, hemen başlayalım.
          </p>
        </motion.div>

        {/* Kategori Tab */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-12 max-w-lg"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-[family-name:var(--font-sora)] font-bold text-[10px] sm:text-sm uppercase tracking-wide px-3 sm:px-6 py-2.5 sm:py-3 border-2 transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
                  : "bg-white text-black border-black/20 hover:border-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Paket Kartları */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {packages[activeCategory].map((pkg, index) => (
              <motion.div
                variants={cardVariants}
                key={`${activeCategory}-${index}`}
                className={`relative flex flex-col border-2 transition-all duration-200 ${
                  pkg.highlight
                    ? "border-red-600 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] -translate-y-2"
                    : "border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] hover:border-red-600"
                }`}
              >
                {pkg.highlight && (
                  <div className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest text-center py-2">
                    En Popüler
                  </div>
                )}

                <div className="p-6 md:p-8 flex flex-col gap-5 flex-1">
                  <div>
                    <h3 className="font-[family-name:var(--font-sora)] text-xl md:text-2xl font-bold uppercase tracking-tight text-black">
                      {pkg.name}
                    </h3>
                    <p className="text-black/45 text-sm mt-2 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="py-4 border-y-2 border-black/10">
                    <span className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold text-black">
                      {pkg.price === "Teklif Al" ? (
                        <span className="text-red-600">{pkg.price}</span>
                      ) : (
                        pkg.price
                      )}
                    </span>
                    {pkg.price !== "Teklif Al" && (
                      <span className="text-black/40 text-sm ml-1">başlayan</span>
                    )}
                  </div>

                  <ul className="flex flex-col gap-3 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-black/70">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 shrink-0 mt-0.5">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={onQuoteOpen}
                    className={`mt-4 inline-flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wide px-6 py-4 border-2 transition-all cursor-pointer w-full ${
                      pkg.highlight
                        ? "bg-red-600 text-white border-red-600 hover:bg-black hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-0.5"
                        : "bg-black text-white border-black hover:bg-red-600 hover:border-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-0.5"
                    }`}
                  >
                    {pkg.price === "Teklif Al" ? "Özel Teklif İste" : "Bu Paketi Seç"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
