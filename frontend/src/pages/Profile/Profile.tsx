import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import { useEffect, useState } from "react";

import { api } from "../../services/api";
import type { Operator, Zerion } from "../../types/models";
import styles from "./Profile.module.css";

type ProfileData = {
  operator: Operator;
  zerion: Zerion;
};

function formatDate(iso: string): string {
  const d = new Date(iso);

  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function Profile() {
const { logout } = useAuth();
const navigate = useNavigate();

  const [data, setData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProfile()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function handleLogout() {
  logout();
  navigate("/login");
}

  if (loading) {
    return <div className={styles.page}>Carregando perfil...</div>;
  }

  if (error) {
    return <div className={styles.page}>Erro ao carregar perfil: {error}</div>;
  }

  if (!data) {
    return <div className={styles.page}>Perfil não encontrado.</div>;
  }

  const { operator, zerion } = data;

  return (
  <div className={styles.page}>
    <h1>Perfil</h1>

    <section className={styles.card}>
      <h2>Operador</h2>
      <p>Nome: {operator.name}</p>
      <p>Email: {operator.email}</p>
      <p>Criado em: {formatDate(operator.createdAt)}</p>
    </section>

    <section className={styles.card}>
      <h2>Resumo do Navi</h2>
      <p>Classe: {zerion.class}</p>
      <p>Nível: {zerion.level}</p>
      <p>HP: {zerion.hp}/{zerion.hpMax}</p>
      <p>MP: {zerion.mp}/{zerion.mpMax}</p>
      <p>EXP: {zerion.exp}/{zerion.expMax}</p>
      <p>SYNC: {zerion.sync}/{zerion.syncMax}</p>
    </section>

    <button
      type="button"
      className={styles.logoutButton}
      onClick={handleLogout}
    >
      Sair
    </button>
  </div>
);
}

export default Profile;