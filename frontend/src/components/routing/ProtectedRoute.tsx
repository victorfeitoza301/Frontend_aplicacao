import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

// Envolve rotas que exigem login. Sem operador -> redireciona para /login.
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { operator, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: 32, color: "#9ca3af" }}>Carregando sessão...</div>;
  }

  if (!operator) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
