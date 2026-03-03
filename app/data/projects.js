const API_URL = "/api/projects";

export async function getProjects() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Projeler yüklenemedi");
    return await res.json();
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function addProject(project) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Proje eklenemedi");
  }
  return await res.json();
}

export async function updateProject(slug, data) {
  const res = await fetch(`${API_URL}/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || "Proje güncellenemedi");
  }
  return await res.json();
}

export async function deleteProject(slug) {
  const res = await fetch(`${API_URL}/${slug}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Proje silinemedi");
  }
}
