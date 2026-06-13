// Upload via Next.js API route (server-side, bypasses Storage RLS issues)
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("files", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Upload failed with status ${res.status}`);
  }

  if (!data.urls || data.urls.length === 0) {
    throw new Error(data.error || "Upload returned no URLs");
  }

  return data.urls[0];
};

// Upload multiple images
export const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Upload failed with status ${res.status}`);
  }

  if (!data.urls || data.urls.length === 0) {
    throw new Error(data.error || "Upload returned no URLs");
  }

  return data.urls;
};
