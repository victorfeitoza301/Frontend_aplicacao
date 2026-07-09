import { useEffect, useState } from "react";

import { api } from "../../services/api";
import type { Mission } from "../../types/models";
import styles from "./Missions.module.css";
import { useApp } from "../../app/providers/useApp";

function formatMissionStatus(status: Mission["status"]): string {
  const labels = {
    disponivel: "Disponível",
    em_andamento: "Em andamento",
    concluida: "Concluída",
    conclusao: "Concluída",
  };

  return labels[status];
}

function Missions(){

  const { setZerion } = useApp();

  const [missions, setMissions] = useState<Mission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<number | null>(null);
  

  useEffect(() => {
    api
      .getMissions()
      .then(setMissions)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCompleteMission(id: number) {
  try {
    setCompletingId(id);
    setError(null);

    const result = await api.completeMission(id);

    setZerion(result.zerion);

    setMissions((currentMissions) =>
  currentMissions.map((mission) =>
    mission.id === id ? result.mission : mission
  )
);

  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Erro ao concluir missão";

    setError(message);
  } finally {
    setCompletingId(null);
  }
}

  if (loading) {
    return <div className={styles.page}>Carregando missões...</div>;
  }

  if (error) {
    return <div className={styles.page}>Erro ao carregar missões: {error}</div>;
  }

  return (
    <div className={styles.page}>
      <h1>Missões</h1>

      <div className={styles.list}>
        {missions.map((mission) => (
          <article key={mission.id} className={styles.card}>
            <div>
              <h2>{mission.title}</h2>
              <p>{mission.description}</p>
            </div>

            <div className={styles.meta}>
             <span>Status: {formatMissionStatus(mission.status)}</span>
              <strong>+{mission.rewardExp} EXP</strong>
            </div>
            {mission.status === "disponivel" && (
  <button
  type="button"
  className={styles.completeButton}
  onClick={() => handleCompleteMission(mission.id)}
  disabled={completingId === mission.id}
>
  {completingId === mission.id ? "Concluindo..." : "Concluir"}
</button>
)}
          </article>
        ))}
      </div>
    </div>
  );
}

export default Missions;