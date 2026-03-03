"use client";

import { addProject } from "../../../data/projects";
import ProjectForm from "../ProjectForm";

export default function NewProject() {
  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
          Yeni Proje
        </h1>
        <p className="text-black/40 text-sm mt-1">Portfolyona yeni proje ekle.</p>
      </div>
      <ProjectForm onSave={async (project) => await addProject(project)} />
    </div>
  );
}
