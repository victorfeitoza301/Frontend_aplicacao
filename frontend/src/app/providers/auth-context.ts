import { createContext } from "react";
import type { Operator } from "../../types/models";

export type AuthState = {
  operator: Operator | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthState | null>(null);
