"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects } from "../data/projects";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const stats = [
    {
      label: "Toplam Proje",
      value: projects.length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        </svg>
      ),
      color: "bg-red-600",
    },
    {
      label: "Featured",
      value: projects.filter((p) => p.featured).length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      color: "bg-yellow-500",
    },
    {
      label: "Kategoriler",
      value: [...new Set(projects.map((p) => p.tag))].length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      ),
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="mb-10">
        <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
          Dashboard
        </h1>
        <p className="text-black/40 text-sm mt-2">Portfolyo yönetim paneline hoş geldin.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border-2 border-black p-6 flex items-center gap-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className={`${stat.color} w-14 h-14 flex items-center justify-center text-white shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <div className="font-[family-name:var(--font-sora)] text-3xl font-bold text-black">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-black/30">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold uppercase tracking-tight text-black/50 mb-4">
          Hızlı Aksiyonlar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-4 bg-red-600 text-white p-5 border-2 border-red-600 font-bold text-sm uppercase tracking-wide hover:bg-red-700 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Yeni Proje Ekle
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-4 bg-white text-black p-5 border-2 border-black font-bold text-sm uppercase tracking-wide hover:bg-black/5 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            Projeleri Yönet
          </Link>
        </div>
      </div>

      <div>
        <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold uppercase tracking-tight text-black/50 mb-4">
          Projeler
        </h2>
        <div className="bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/admin/projects/${project.slug}`}
              className={`flex items-center justify-between p-5 hover:bg-black/[0.02] transition-colors ${
                i < projects.length - 1 ? "border-b-2 border-black/10" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-[family-name:var(--font-sora)] text-2xl font-bold text-black/10 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-bold text-black text-sm uppercase tracking-wide">
                    {project.title}
                  </div>
                  <div className="text-black/30 text-xs mt-0.5">{project.tag} · {project.tech.length} teknoloji</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {project.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-500 text-black px-2 py-0.5">
                    Featured
                  </span>
                )}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/20">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
