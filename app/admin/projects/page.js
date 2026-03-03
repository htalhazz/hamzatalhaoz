"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, deleteProject } from "../../data/projects";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [deleteSlug, setDeleteSlug] = useState(null);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const handleDelete = async (slug) => {
    await deleteProject(slug);
    const updated = await getProjects();
    setProjects(updated);
    setDeleteSlug(null);
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
            Projeler
          </h1>
          <p className="text-black/40 text-sm mt-1">{projects.length} proje</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 border-2 border-red-600 hover:bg-red-700 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none w-fit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni Proje
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className="group relative overflow-hidden bg-white border-2 border-black transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col h-[300px] md:h-[400px]"
          >
            {/* Arka Plan / Resim Alanı */}
            <div className="absolute inset-0 z-0 bg-white">
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
                  <span className="font-[family-name:var(--font-sora)] text-white/50 text-xl md:text-2xl font-bold uppercase tracking-widest z-10">
                    Görsel Yok
                  </span>
                </div>
              )}
              {(!project.images || project.images.length === 0) && (
                <span className="absolute -right-4 -bottom-6 font-[family-name:var(--font-sora)] text-[8rem] md:text-[10rem] font-black text-white/10 select-none leading-none pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
            </div>

            {/* Tag ve Featured */}
            <div className="absolute top-5 left-5 z-10 flex gap-2">
              <span className="text-xs font-bold uppercase tracking-widest bg-white text-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-black">
                {project.tag}
              </span>
              {project.featured && (
                <span className="text-xs font-bold uppercase tracking-widest bg-yellow-500 text-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-black">
                  Featured
                </span>
              )}
            </div>

            {/* Admin Aksiyonları (Sağ Üstte) */}
            <div className="absolute top-5 right-5 z-20 flex flex-col gap-3">
              <Link
                href={`/projects/${project.slug}`}
                target="_blank"
                className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                title="Önizle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </Link>
              <Link
                href={`/admin/projects/${project.slug}`}
                className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-blue-600 hover:text-white transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                title="Düzenle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </Link>
              <button
                onClick={() => setDeleteSlug(project.slug)}
                className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-red-600 hover:text-white transition-colors cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                title="Sil"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>

            {/* İçerik Alanı (Altta sabit) */}
            <div className="absolute bottom-0 left-0 w-full bg-white border-t-2 border-black p-4 md:p-5 flex flex-col gap-3 z-20">
              <div className="flex flex-col gap-1">
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold uppercase tracking-tight text-black truncate">
                  {project.title}
                </h3>
                <p className="text-black/50 text-xs leading-relaxed truncate">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className="text-[10px] md:text-xs font-bold uppercase tracking-wide bg-black/5 border border-black/10 text-black/70 px-2 md:px-3 py-1">
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide bg-black/5 border border-black/10 text-black/70 px-2 md:px-3 py-1">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-16 text-black/20">
            <p className="text-lg font-bold uppercase tracking-wide">Henüz proje yok</p>
            <Link href="/admin/projects/new" className="text-red-600 text-sm font-bold uppercase tracking-wide mt-2 inline-block hover:underline">
              İlk projeyi ekle →
            </Link>
          </div>
        )}
      </div>

      {deleteSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteSlug(null)} />
          <div className="relative bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] p-8 max-w-sm w-full">
            <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold uppercase text-black mb-2">
              Projeyi Sil?
            </h3>
            <p className="text-black/40 text-sm mb-6">
              Bu işlem geri alınamaz. Proje kalıcı olarak silinecek.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteSlug(null)}
                className="flex-1 font-bold text-xs uppercase tracking-widest px-4 py-3 border-2 border-black/20 text-black/50 hover:text-black hover:border-black/40 transition-all cursor-pointer"
              >
                İptal
              </button>
              <button
                onClick={() => handleDelete(deleteSlug)}
                className="flex-1 font-bold text-xs uppercase tracking-widest px-4 py-3 bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none cursor-pointer"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
