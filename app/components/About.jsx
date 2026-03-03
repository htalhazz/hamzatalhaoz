"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="profile" className="relative bg-white py-24 md:py-32 overflow-hidden border-b-2 border-black">
      {/* Dikey "Hakkımda" yazısı - SOL */}
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
          Hakkımda
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Sol - Fotoğraf */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="relative"
          >
            <div className="absolute -inset-3 bg-red-600 rotate-2 hidden md:block" />
            <div className="relative bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="aspect-square overflow-hidden">
                <img
                  src="/profil2.jpeg"
                  alt="Hamza Talha"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Sağ - İçerik */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-red-600" />
              <span className="font-[family-name:var(--font-sora)] text-red-600 font-bold text-sm uppercase tracking-widest">
                Hakkımda
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl font-bold uppercase tracking-tight text-black">
              Ben Hamza Talha
            </h2>

            <div className="flex flex-col gap-4 text-black/60 text-base md:text-lg leading-relaxed">
              <p>
                Yazılım dünyasına olan tutkumla modern web ve mobil uygulamalar
                geliştiriyorum. Kullanıcı deneyimini ön planda tutan,
                performanslı ve ölçeklenebilir çözümler üretmek benim önceliğim.
              </p>
              <p>
                React, Next.js, Node.js ve React Native gibi teknolojilerle
                çalışıyorum. Her projede temiz kod yazmaya ve en iyi
                uygulamaları takip etmeye özen gösteriyorum.
              </p>
            </div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              href="#contact"
              className="inline-flex items-center gap-3 bg-black text-white font-bold text-sm uppercase tracking-wide px-8 py-4 border-2 border-black hover:bg-red-600 hover:border-red-600 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] active:shadow-none active:translate-y-0 w-fit mt-2"
            >
              İletişime Geç
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
