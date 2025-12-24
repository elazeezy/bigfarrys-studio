// src/utils/upload.js
import { supabase } from "../lib/supabaseClient.js";

const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || "orders";

function sanitizeFileName(name) {
  return name.replace(/[^\w.\-]+/g, "_");
}

export async function uploadSingleFile({ orderId, file, kind = "file" }) {
  if (!file) return null;

  const safe = sanitizeFileName(file.name);
  const path = `${orderId}/${kind}-${Date.now()}-${safe}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: false });

  if (error) throw new Error(error.message || "Upload failed");

  // Public URL (bucket must be Public)
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return {
    path,
    url: data.publicUrl,
    name: file.name,
    type: file.type,
    size: file.size,
  };
}

export async function uploadMultipleFiles({ orderId, files = [], kind = "file" }) {
  const list = Array.from(files || []);
  const results = [];
  for (let i = 0; i < list.length; i++) {
    const uploaded = await uploadSingleFile({ orderId, file: list[i], kind });
    if (uploaded) results.push(uploaded);
  }
  return results;
}
