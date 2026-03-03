"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjectBySlug, updateProject } from "../../../data/projects";
import ProjectForm from "../ProjectForm";
import Link from "next/link";

export default function EditProject() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectBySlug(slug).then((p) => {
      setProject(p);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="p-6 md:p-10 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-3 border-black/10 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold uppercase text-black">
          Proje Bulunamadı
        </h2>
        <Link
          href="/admin/projects"
          className="text-red-600 font-bold text-sm uppercase tracking-wide hover:underline"
        >
          Projelere Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
          Düzenle
        </h1>
        <p className="text-black/40 text-sm mt-1">{project.title}</p>
      </div>
      <ProjectForm
        initialData={project}
        onSave={async (updated) => await updateProject(slug, updated)}
        isEdit
      />
    </div>
  );
}
