"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getProjects } from "../data/projects";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="projects" className="relative bg-white py-24 md:py-32 overflow-hidden border-b-2 border-black">
      {/* Dikey "Projeler" yazısı */}
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
          Projeler
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:pl-32 relative">
        {/* Başlık */}
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
              Portfolyo
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-black">
            Projeler
          </h2>
          <p className="text-black/50 max-w-xl text-lg">
            Modern teknolojilerle hayata geçirdiğim projelerden bazıları.
          </p>
        </motion.div>

        {/* Proje kartları */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              variants={cardVariants}
              key={project.slug}
              tabIndex="0"
              className={`group relative overflow-hidden bg-white border-2 border-black hover:-translate-y-2 focus:-translate-y-2 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] hover:border-red-600 focus:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] focus:border-red-600 flex flex-col cursor-pointer ${project.featured ? "h-[350px] md:h-[450px] md:col-span-2" : "h-[300px] md:h-[400px]"
                }`}
            >
              {/* Image / Arka Plan */}
              <div className="absolute inset-0 z-0">
                {project.images && project.images.length > 0 ? (
                  <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${project.accent || "bg-gradient-to-br from-black to-zinc-800"}`}>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <span className="font-[family-name:var(--font-sora)] text-white/50 text-2xl font-bold uppercase tracking-widest z-10">
                      Görsel Yok
                    </span>
                  </div>
                )}

                {/* Sadece yedek numara (görsel varken de hafif opak görünüyordu orijinalde ama artık görsel arkada kalmalı veya istenirse eklenebilir. Şimdilik görsel yoksa numara eklensin) */}
                {(!project.images || project.images.length === 0) && (
                  <span className="absolute -right-4 -bottom-6 font-[family-name:var(--font-sora)] text-[8rem] md:text-[10rem] font-black text-white/10 select-none leading-none pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* Tag - Sol Üstte Sabit */}
              <span className="absolute top-5 left-5 z-10 text-xs font-bold uppercase tracking-widest bg-white text-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-black">
                {project.tag}
              </span>

              {/* Beyaz İçerik Alanı - Aşağıdan Açılır */}
              <div className="absolute bottom-0 left-0 w-full bg-white border-t-2 border-black p-4 md:p-5 flex flex-col gap-3 translate-y-full group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300 ease-in-out z-20">
                <div className={`flex flex-col gap-2 ${project.featured ? "md:flex-1" : ""}`}>
                  <h3 className="font-[family-name:var(--font-sora)] text-lg md:text-xl font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-black/50 text-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] md:text-xs font-bold uppercase tracking-wide bg-black/5 border border-black/10 text-black/70 px-2 md:px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide bg-black/5 border border-black/10 text-black/70 px-2 md:px-3 py-1">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 bg-black text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border-2 border-black hover:bg-red-600 hover:border-red-600 transition-all w-fit mt-1"
                    tabIndex="-1"
                  >
                    İncele
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
