"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function ProjectForm({ initialData, onSave, isEdit = false }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    longDescription: initialData?.longDescription || "",
    tag: initialData?.tag || "",
    tech: initialData?.tech?.join(", ") || "",
    featured: initialData?.featured || false,
    liveUrl: initialData?.liveUrl || "",
    githubUrl: initialData?.githubUrl || "",
    features: initialData?.features?.join("\n") || "",
    images: initialData?.images || [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const project = {
        slug: initialData?.slug || slugify(form.title),
        title: form.title,
        description: form.description,
        longDescription: form.longDescription,
        tag: form.tag,
        tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
        featured: form.featured,
        liveUrl: form.liveUrl,
        githubUrl: form.githubUrl,
        features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
        images: form.images,
        accent: "bg-gradient-to-br from-black to-zinc-800",
      };
      await onSave(project);
      router.push("/admin/projects");
    } catch (err) {
      setError(err.message || "Kaydetme sırasında bir hata oluştu");
      setSaving(false);
    }
  };

  const update = (key, value) => setForm({ ...form, [key]: value });

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const newImages = [...form.images];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) {
          newImages.push(data.url);
        }
      } catch {
        setError("Resim yüklenirken hata oluştu");
      }
    }

    update("images", newImages);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index) => {
    update("images", form.images.filter((_, i) => i !== index));
  };

  const moveImage = (index, direction) => {
    const imgs = [...form.images];
    const target = index + direction;
    if (target < 0 || target >= imgs.length) return;
    [imgs[index], imgs[target]] = [imgs[target], imgs[index]];
    update("images", imgs);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {error && (
        <div className="bg-red-50 border-2 border-red-600 p-4 text-red-700 text-sm font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/40">
              Proje Adı *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-black/15 text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
              placeholder="Proje başlığı"
              required
            />
            {form.title && (
              <span className="text-black/20 text-xs">
                Slug: {slugify(form.title)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/40">
              Kısa Açıklama *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={2}
              className="w-full px-4 py-3 bg-white border-2 border-black/15 text-black font-medium focus:outline-none focus:border-red-600 transition-colors resize-none"
              placeholder="Kartlarda görünecek kısa açıklama"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/40">
              Detaylı Açıklama
            </label>
            <textarea
              value={form.longDescription}
              onChange={(e) => update("longDescription", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white border-2 border-black/15 text-black font-medium focus:outline-none focus:border-red-600 transition-colors resize-none"
              placeholder="Proje detay sayfasında görünecek uzun açıklama"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/40">
              Özellikler (her satıra bir tane)
            </label>
            <textarea
              value={form.features}
              onChange={(e) => update("features", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white border-2 border-black/15 text-black font-medium focus:outline-none focus:border-red-600 transition-colors resize-none font-mono text-sm"
              placeholder={"Özellik 1\nÖzellik 2\nÖzellik 3"}
            />
          </div>
        </div>

        {/* Sağ */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/40">
                Kategori *
              </label>
              <input
                type="text"
                value={form.tag}
                onChange={(e) => update("tag", e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-black/15 text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                placeholder="Fullstack, Mobile..."
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/40">
                Teknolojiler *
              </label>
              <input
                type="text"
                value={form.tech}
                onChange={(e) => update("tech", e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-black/15 text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                placeholder="React, Node.js, ..."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/40">
                Canlı Demo URL
              </label>
              <input
                type="url"
                value={form.liveUrl}
                onChange={(e) => update("liveUrl", e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-black/15 text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/40">
                GitHub URL
              </label>
              <input
                type="url"
                value={form.githubUrl}
                onChange={(e) => update("githubUrl", e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-black/15 text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-4 bg-white border-2 border-black/15 hover:border-black/30 transition-colors">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="w-5 h-5 accent-red-600 cursor-pointer"
            />
            <div>
              <span className="text-black font-bold text-sm uppercase tracking-wide">Featured Proje</span>
              <p className="text-black/30 text-xs mt-0.5">Ana sayfada geniş kart olarak gösterilir</p>
            </div>
          </label>

          {/* Resim Yükleme */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-black/40">
              Proje Görselleri
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full p-6 border-2 border-dashed border-black/20 hover:border-red-600 transition-colors cursor-pointer flex flex-col items-center gap-2 bg-white disabled:opacity-50"
            >
              {uploading ? (
                <div className="w-6 h-6 border-2 border-black/10 border-t-red-600 rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/30">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              )}
              <span className="text-xs font-bold uppercase tracking-widest text-black/30">
                {uploading ? "Yükleniyor..." : "Resim Yükle"}
              </span>
              <span className="text-[10px] text-black/20">Birden fazla seçebilirsin</span>
            </button>

            {form.images.length > 0 && (
              <div className="flex flex-col gap-2">
                {form.images.map((img, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border-2 border-black/10 p-2">
                    <img src={img} alt={`Görsel ${i + 1}`} className="w-16 h-10 object-cover border border-black/10 shrink-0" />
                    <span className="text-xs text-black/50 truncate flex-1 min-w-0">
                      {i === 0 ? "📌 Ana görsel" : `Görsel ${i + 1}`}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveImage(i, -1)}
                        disabled={i === 0}
                        className="w-7 h-7 flex items-center justify-center text-black/30 hover:text-black border border-black/10 disabled:opacity-20 cursor-pointer disabled:cursor-default"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(i, 1)}
                        disabled={i === form.images.length - 1}
                        className="w-7 h-7 flex items-center justify-center text-black/30 hover:text-black border border-black/10 disabled:opacity-20 cursor-pointer disabled:cursor-default"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="w-7 h-7 flex items-center justify-center text-black/30 hover:text-red-500 border border-black/10 cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Aksiyonlar */}
      <div className="flex items-center justify-between pt-6 border-t-2 border-black/10">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="font-bold text-xs uppercase tracking-widest px-6 py-3 border-2 border-black/20 text-black/50 hover:text-black hover:border-black/40 transition-all cursor-pointer"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-8 py-3 border-2 border-red-600 hover:bg-red-700 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none cursor-pointer disabled:opacity-50"
        >
          {saving ? "Kaydediliyor..." : isEdit ? "Kaydet" : "Oluştur"}
        </button>
      </div>
    </form>
  );
}
