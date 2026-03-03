"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-center flex flex-col items-center max-w-lg"
            >
                <h1 className="font-[family-name:var(--font-sora)] text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-red-900 mb-4 select-none">
                    404
                </h1>
                <h2 className="font-[family-name:var(--font-inter)] text-3xl md:text-4xl font-bold uppercase tracking-widest text-white neon-white mb-6">
                    Sayfa Bulunamadı
                </h2>
                <p className="text-white/60 mb-10 text-lg">
                    Aradığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
                </p>

                <Link
                    href="/"
                    className="bg-red-600 text-white font-[family-name:var(--font-sora)] font-bold uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-black transition-all group flex items-center gap-3 border-2 border-transparent hover:border-black"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:-translate-x-1 transition-transform"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Ana Sayfaya Dön
                </Link>
            </motion.div>

            {/* Arkaplan Dekorasyon */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                    backgroundSize: "40px 40px",
                }}
            />
        </div>
    );
}
