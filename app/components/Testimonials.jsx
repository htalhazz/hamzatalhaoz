"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const values = [
  {
    name: "Zamanında Teslimat",
    role: "Çalışma Prensibi",
    text: "Her projeyi belirlenen süre içinde teslim etmeyi taahhüt ediyorum. Proje boyunca ilerlemeyi şeffaf biçimde paylaşır, gecikme riski varsa önceden bildiririm.",
  },
  {
    name: "Temiz & Sürdürülebilir Kod",
    role: "Teknik Standart",
    text: "Okunabilir, modüler ve ölçeklenebilir kod yazmak benim için standart. Teknik borç bırakmadan, ileride kolayca geliştirilebilecek yapılar kuruyorum.",
  },
  {
    name: "Açık İletişim",
    role: "İş Birliği Anlayışı",
    text: "Proje süresince her adımı düzenli olarak paylaşıyorum. Geri bildirimlere hızlı dönüş yapar, her kararı birlikte alırız. Sürpriz yok, netlik var.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden border-b-2 border-black">
      {/* Dikey "Değerler" yazısı - SAĞ */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none"
      >
        <span
          className="font-[family-name:var(--font-sora)] text-[7rem] font-bold uppercase tracking-widest text-white/[0.03] select-none whitespace-nowrap block"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Değerler
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-16 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-red-600" />
            <span className="font-[family-name:var(--font-sora)] text-red-600 font-bold text-sm uppercase tracking-widest">
              Çalışma Prensipleri
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white">
            Değerlerim
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Aktif içerik */}
          <div
            className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] overflow-y-auto max-h-[420px] md:max-h-none"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-600 mb-6"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-black mb-8">
                  &ldquo;{values[active].text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-600 border-2 border-black flex items-center justify-center">
                    <span className="font-[family-name:var(--font-sora)] text-xl font-bold text-white">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-sora)] font-bold text-black uppercase tracking-wide">
                      {values[active].name}
                    </div>
                    <div className="text-sm text-black/50">{values[active].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Seçim listesi */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
            className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-red"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
          >
            {values.map((v, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left p-4 md:p-5 border-2 transition-all duration-200 shrink-0 w-[200px] lg:w-[240px] cursor-pointer ${
                  active === i
                    ? "bg-red-600 border-red-600 text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                    : "bg-white/5 border-white/20 text-white/60 hover:border-white/50"
                }`}
              >
                <div className="font-[family-name:var(--font-sora)] font-bold text-sm uppercase tracking-wide">
                  {v.name}
                </div>
                <div className={`text-xs mt-1 ${active === i ? "text-white/70" : "text-white/30"}`}>
                  {v.role}
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
