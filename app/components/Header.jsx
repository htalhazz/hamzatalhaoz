"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header({ onQuoteOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Anasayfa", href: "#home" },
    { label: "Hizmetler", href: "#packages" },
    { label: "Projeler", href: "#projects" },
    { label: "Hakkımda", href: "#profile" },
    { label: "İletişim", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link
          href="/"
          className="font-[family-name:var(--font-sora)] font-bold uppercase tracking-widest text-sm md:text-base text-white"
        >
          HAMZA<span className="text-red-600">DEV</span>
        </Link>

        <nav className="font-[family-name:var(--font-sora)] hidden md:flex space-x-8 font-semibold text-sm uppercase tracking-tight">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/60 hover:text-red-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onQuoteOpen}
            className="hidden sm:block bg-red-600 text-white font-[family-name:var(--font-sora)] font-bold text-xs uppercase tracking-wide px-5 py-2.5 hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            Teklif Al
          </button>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü aç/kapat"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-md px-6 py-6 flex flex-col gap-4 border-t border-white/10 mt-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-bold uppercase text-white/70 hover:text-red-600 transition-colors font-[family-name:var(--font-sora)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onQuoteOpen(); }}
            className="bg-red-600 text-white px-5 py-3 font-[family-name:var(--font-sora)] font-bold text-sm uppercase w-full cursor-pointer mt-2 hover:bg-white hover:text-black transition-all"
          >
            Teklif Al
          </button>
        </div>
      </div>
    </header>
  );
}
