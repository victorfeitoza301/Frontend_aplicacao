import { useEffect, useState } from "react";

import { useApp } from "../../app/providers/useApp";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import StatBar from "../../components/ui/StatBar";
import { api } from "../../services/api";
import type { Dashboard as DashboardData } from "../../types/models";
import styles from "./Dashboard.module.css";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Dashboard() {
  const { zerion, setZerion } = useApp();

  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  api
    .getDashboard()
    .then((dashboard) => {
      setData(dashboard);
      setZerion(dashboard.zerion);
    })
    .catch((e) => setError(e.message));
}, [setZerion]);

  if (error) {
    return <div className={styles.state}>Erro ao carregar: {error}</div>;
  }

  if (!data) {
    return <div className={styles.state}>Conectando ao Zerion...</div>;
  }

  const z = zerion ?? data.zerion;

  return (
    <div className={styles.page}>
      {/* Card do Navi */}
      <Card>
        <div className={styles.naviHeader}>
          <div className={styles.avatar}>{z.avatar}</div>
          <div>
            <h1 className={styles.naviName}>{z.name}</h1>
            <div className={styles.naviMeta}>Classe: {z.class}</div>
            <div className={styles.naviLevel}>Nível {z.level}</div>
          </div>
        </div>

        <div className={styles.statusRow}>
          <Badge variant={z.status === "ONLINE" ? "success" : "danger"}>
            {z.status}
          </Badge>
        </div>

        <StatBar label="HP" value={z.hp} max={z.hpMax} color="var(--color-danger)" />
        <StatBar label="MP" value={z.mp} max={z.mpMax} color="var(--color-primary)" />
        <StatBar label="EXP" value={z.exp} max={z.expMax} color="var(--color-accent)" />
        <StatBar label="SYNC" value={z.sync} max={z.syncMax} color="#3b82f6" />
      </Card>

      {/* Coluna de painéis */}
      <div className={styles.rightColumn}>
        <Card>
          <div className={styles.welcome}>
            <h2>Bem-vindo, {data.welcome.operatorName}</h2>
            <p>{data.welcome.message}</p>
            <p>
              Último acesso: <strong>{formatDate(data.welcome.lastAccess)}</strong>
            </p>
            <p>
              Status da rede: <strong>{data.welcome.networkState}</strong>
            </p>
            <p>
              Missões disponíveis: <strong>{data.welcome.missionsAvailable}</strong>
            </p>
          </div>
        </Card>

        <Card>
          <p className={styles.panelTitle}>EVENTOS</p>
          <p className={styles.panelValue}>
            {data.events.count} {data.events.label}
          </p>
          <p className={styles.panelHint}>{data.events.hint}</p>
        </Card>

        <Card>
          <p className={styles.panelTitle}>CONQUISTAS</p>
          <p className={styles.panelValue}>
            {data.achievements.count} {data.achievements.label}
          </p>
          <p className={styles.panelHint}>{data.achievements.hint}</p>
        </Card>

        <Card>
          <p className={styles.panelTitle}>AVISOS</p>
          <p className={styles.panelValue}>
            {data.notices.count} {data.notices.label}
          </p>
          <p className={styles.panelHint}>{data.notices.hint}</p>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
