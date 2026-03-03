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

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="bg-white border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className={`w-12 h-12 ${project.accent || "bg-black"} shrink-0 flex items-center justify-center`}>
                <span className="text-white/30 font-bold text-xs uppercase">{project.tag?.charAt(0)}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-black text-sm uppercase tracking-wide truncate">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-500 text-black px-2 py-0.5 shrink-0">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-black/40 text-xs truncate mt-0.5">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] font-semibold uppercase tracking-wide text-black/40 bg-black/5 px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/projects/${project.slug}`}
                target="_blank"
                className="w-9 h-9 flex items-center justify-center border-2 border-black/10 text-black/30 hover:text-black hover:border-black/30 transition-colors"
                title="Önizle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </Link>
              <Link
                href={`/admin/projects/${project.slug}`}
                className="w-9 h-9 flex items-center justify-center border-2 border-black/10 text-black/30 hover:text-blue-600 hover:border-blue-600/30 transition-colors"
                title="Düzenle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </Link>
              <button
                onClick={() => setDeleteSlug(project.slug)}
                className="w-9 h-9 flex items-center justify-center border-2 border-black/10 text-black/30 hover:text-red-500 hover:border-red-500/30 transition-colors cursor-pointer"
                title="Sil"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
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
