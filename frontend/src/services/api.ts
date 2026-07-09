import type {
  Dashboard,
  Zerion,
  Mission,
  ChatMessage,
  SendMessageResponse,
  Operator,
  AuthResponse,
  InventoryItem,
} from "../types/models";

// URL base da API. Configure em .env com VITE_API_URL.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

const TOKEN_KEY = "zerion_token";

// ---- Gerenciamento do token (JWT) ----
export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// Wrapper genérico de fetch: injeta o token e trata erros.
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = tokenStore.get();

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (res.status === 401) {
    // token expirado/ausente: limpa e sinaliza
    tokenStore.clear();
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.error ?? body.details ?? detail;
    } catch {
      // corpo não-JSON
    }
    throw new Error(detail);
  }

  return res.json() as Promise<T>;
}

export const api = {
  // ---- Auth ----
  register: (name: string, email: string, password: string) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),
  login: (email: string, password: string) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<Operator>("/me"),

  // ---- Dados ----
  getDashboard: () => request<Dashboard>("/dashboard"),
  getZerion: () => request<Zerion>("/zerion"),
  getProfile: () =>
  request<{ operator: Operator; zerion: Zerion }>("/profile"),

  getInventory: () => request<InventoryItem[]>("/inventory"),

  getMissions: () => request<Mission[]>("/missions"),
  completeMission: (id: number) =>
    request<{ mission: Mission; zerion: Zerion }>(`/missions/${id}/complete`, {
      method: "POST",
    }),

  getChat: () => request<ChatMessage[]>("/chat"),
  sendMessage: (message: string) =>
    request<SendMessageResponse>("/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    }),
};
