import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/auth.module.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Card>
          <h1 className={styles.title}>Zerion</h1>
          <p className={styles.subtitle}>Acesse seu NetNavi.</p>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.fields}>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="voce@zerion.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <div className={styles.actions}>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <p className={styles.switch}>
              Não tem conta? <Link to="/register">Cadastre-se</Link>
            </p>
          </div>

          <p className={styles.demo}>Demo: victor@zerion.app / zerion123</p>
        </Card>
      </div>
    </div>
  );
}

export default Login;
