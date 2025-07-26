const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export async function fetchFromAPI(endpoint: string, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) throw new Error("API error");
  return res.json();
} 