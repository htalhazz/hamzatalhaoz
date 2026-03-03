"use client";

import { motion } from "framer-motion";

import Image from "next/image";

export default function Hero({ onQuoteOpen }) {
  return (
    <section id="home" className="relative bg-black overflow-hidden h-[70vh] sm:h-[75vh] md:h-[95vh] flex flex-col">
      {/* Profil Fotoğrafı */}
      <div className="absolute inset-0 z-0 flex items-start justify-center">
        <Image
          src="/profil.png"
          alt="Hamza Talha"
          width={800}
          height={800}
          priority
          className="w-auto h-[55vh] sm:h-[65vh] md:h-[95vh] object-contain opacity-50 mt-8 md:-mt-16"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full pb-8 sm:pb-12 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-[family-name:var(--font-inter)] text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black uppercase leading-[1.1] tracking-tight text-white neon-white">
            Dijital Çözümler
          </h1>
          <h1 className="font-[family-name:var(--font-inter)] text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-[1.1] tracking-tight italic text-red-600 neon-red">
            Gerçek Sonuçlar
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={onQuoteOpen}
            className="bg-red-600 text-white font-[family-name:var(--font-sora)] font-bold text-xs sm:text-sm uppercase tracking-wide px-5 sm:px-8 py-2.5 sm:py-4 hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            Teklif Al
          </button>
          <a
            href="#packages"
            className="text-white/50 font-[family-name:var(--font-sora)] font-bold text-xs sm:text-sm uppercase tracking-wide px-5 sm:px-8 py-2.5 sm:py-4 border border-white/20 hover:border-white hover:text-white transition-all"
          >
            Paketleri İncele
          </a>
        </motion.div>
      </div>
    </section>
  );
}
