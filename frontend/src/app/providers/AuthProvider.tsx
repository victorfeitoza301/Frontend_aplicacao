import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { api, tokenStore } from "../../services/api";
import type { Operator } from "../../types/models";
import { AuthContext } from "./auth-context";

function AuthProvider({ children }: { children: ReactNode }) {
  const [operator, setOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState(true);

  // Ao montar, se houver token salvo, recupera o operador.
  useEffect(() => {
    if (!tokenStore.get()) {
      setLoading(false);
      return;
    }
    api
      .me()
      .then(setOperator)
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await api.login(email, password);
    tokenStore.set(res.token);
    setOperator(res.operator);
  }

  async function register(name: string, email: string, password: string) {
    const res = await api.register(name, email, password);
    tokenStore.set(res.token);
    setOperator(res.operator);
  }

  function logout() {
    tokenStore.clear();
    setOperator(null);
  }

  return (
    <AuthContext.Provider value={{ operator, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
