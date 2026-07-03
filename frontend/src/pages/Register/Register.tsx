import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/auth.module.css";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (loading) return;
    setError(null);

    if (password.length < 6) {
      setError("A senha precisa ter ao menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
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
          <h1 className={styles.title}>Criar conta</h1>
          <p className={styles.subtitle}>Seu Navi será criado automaticamente.</p>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.fields}>
            <Input
              id="name"
              label="Nome"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="voce@zerion.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              placeholder="mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <div className={styles.actions}>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Criando..." : "Cadastrar"}
            </Button>
            <p className={styles.switch}>
              Já tem conta? <Link to="/login">Entrar</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Register;
