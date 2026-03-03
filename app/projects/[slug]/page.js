"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProjectBySlug } from "../../data/projects";
import Link from "next/link";

export default function ProjectDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    getProjectBySlug(slug).then((p) => {
      setProject(p);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-black border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6">
        <h1 className="font-[family-name:var(--font-sora)] text-4xl font-bold uppercase text-black">
          Proje Bulunamadı
        </h1>
        <Link
          href="/#projects"
          className="bg-black text-white font-bold text-sm uppercase tracking-wide px-8 py-4 border-2 border-black hover:bg-red-600 hover:border-red-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Geri Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Üst bar */}
      <div className="bg-black border-b-2 border-black">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-sora)] text-white font-bold text-lg uppercase tracking-tight"
          >
            HAMZA<span className="text-red-600">DEV</span>
          </Link>
          <button
            onClick={() => router.back()}
            className="text-white/60 hover:text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
            </svg>
            Geri
          </button>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          {/* Tag + Başlık */}
          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-red-600 text-white px-4 py-1.5 mb-6">
            {project.tag}
          </span>

          <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-black mb-6">
            {project.title}
          </h1>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-bold uppercase tracking-wide bg-black text-white px-4 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Resim Galerisi */}
          {project.images && project.images.length > 0 && (
            <div className="mb-12">
              {/* Büyük resim */}
              <div className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] overflow-hidden mb-4">
                <img
                  src={project.images[activeImage]}
                  alt={`${project.title} - ${activeImage + 1}`}
                  className="w-full h-[300px] md:h-[480px] object-cover"
                />
              </div>
              {/* Küçük resimler */}
              {project.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-red pb-2" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}>
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`shrink-0 w-24 h-16 md:w-32 md:h-20 overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === i
                          ? "border-red-600 shadow-[3px_3px_0px_0px_rgba(220,38,38,1)]"
                          : "border-black/15 hover:border-black/40"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
            {/* Sol: Detaylar */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold uppercase tracking-tight text-black mb-4 flex items-center gap-3">
                  <div className="w-8 h-1 bg-red-600" />
                  Proje Hakkında
                </h2>
                <p className="text-black/60 text-base md:text-lg leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold uppercase tracking-tight text-black mb-4 flex items-center gap-3">
                    <div className="w-8 h-1 bg-red-600" />
                    Özellikler
                  </h2>
                  <div className="flex flex-col gap-3">
                    {project.features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="flex items-start gap-3 p-4 border-2 border-black/10 hover:border-black/30 transition-colors"
                      >
                        <div className="w-6 h-6 bg-red-600 shrink-0 flex items-center justify-center mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <span className="text-black/70 text-sm font-medium">{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sağ: Bilgi kartı */}
            <div className="lg:sticky lg:top-8">
              <div className="border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
                <div className="bg-black p-5">
                  <h3 className="font-[family-name:var(--font-sora)] text-white font-bold text-sm uppercase tracking-widest">
                    Proje Bilgileri
                  </h3>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center py-3 border-b border-black/10">
                    <span className="text-xs font-bold uppercase tracking-widest text-black/40">Kategori</span>
                    <span className="font-semibold text-sm text-black">{project.tag}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-black/10">
                    <span className="text-xs font-bold uppercase tracking-widest text-black/40">Teknoloji</span>
                    <span className="font-semibold text-sm text-black">{project.tech.length} araç</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-black/10">
                    <span className="text-xs font-bold uppercase tracking-widest text-black/40">Durum</span>
                    <span className="font-semibold text-sm text-red-600">Tamamlandı</span>
                  </div>

                  <div className="flex flex-col gap-3 mt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 border-2 border-red-600 hover:bg-black hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Canlı Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-black text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 border-2 border-black hover:bg-red-600 hover:border-red-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                      >
                        GitHub
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <div className="text-center text-xs text-black/30 uppercase tracking-widest font-bold py-3">
                        Linkler yakında eklenecek
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/#projects"
                className="mt-6 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors py-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
                </svg>
                Tüm Projeler
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
