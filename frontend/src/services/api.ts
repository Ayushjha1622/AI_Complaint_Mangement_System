const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export interface ApiResponse<T> {
  success: boolean;
  message: str;
  data: T;
}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.statusText}`);
  }

  const json = await response.json();
  if (json && typeof json === "object" && "success" in json && "data" in json) {
    return json.data as T;
  }
  return json as T;
}

export default {
  get: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: "GET" }),
  post: <T>(endpoint: string, data: any) =>
    apiFetch<T>(endpoint, { method: "POST", body: JSON.stringify(data) }),
  put: <T>(endpoint: string, data: any) =>
    apiFetch<T>(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: "DELETE" }),
};
