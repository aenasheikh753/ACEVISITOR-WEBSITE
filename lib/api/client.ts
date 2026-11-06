/**
 * Content loader. Returns local content today; when NEXT_PUBLIC_API_URL is set
 * it asks the CMS first and falls back to the local copy on any failure.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loadContent<T>(key: string, fallback: T): Promise<T> {
  if (!API_URL) return fallback;
  try {
    const res = await fetch(`${API_URL.replace(/\/$/, "")}/content/${key}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}
