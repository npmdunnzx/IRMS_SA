import { log } from "console";

const env = import.meta as ImportMeta & {
  env?: Record<string, string | undefined>;
};

const API_BASE_URL = env.env?.VITE_API_BASE_URL?.trim() || "/api";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: RequestMethod;
  body?: unknown;
  headers?: HeadersInit;
  auth?: boolean;
};

function buildUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedBase = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
}

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  localStorage.setItem("accessToken", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyYTA4ZTA5MS04NDYyLTRiMDgtOGE3NC1jYWRkNmQ3M2NlYjciLCJ0eXBlIjoiYWNjZXNzIiwicm9sZSI6Ik1BTkFHRVIiLCJpYXQiOjE3NzgzMjk2MzAsImV4cCI6MTc4MDkyMTYzMH0.cZvXkIJjt2IggIstN2hEVEwSoUzz_lmWNEVD0FLVZmQ");
  const token = localStorage.getItem("accessToken");

  if (options.auth !== false && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    if (options.body instanceof FormData) {
      body = options.body;
    } else {
      headers.set("Content-Type", "application/json");
      body = JSON.stringify(options.body);
    }
  }

  const response = await fetch(buildUrl(path), {
    method: options.method ?? "GET",
    headers,
    body,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload?.message ||
          payload?.error ||
          `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}
