import { useState } from "react";
import styles from "./StatBar.module.css";

type StatBarProps = {
  label: string;
  value: number;
  max: number;
  /** cor da barra (usa as CSS vars do tema por padrão) */
  color?: string;
};

/**
 * Barra de atributo (HP, MP, EXP, SYNC) com tooltip ao passar o mouse,
 * reproduzindo o comportamento visto no vídeo ("Atual: 72 / 100  72%").
 */
function StatBar({ label, value, max, color }: StatBarProps) {
  const [hover, setHover] = useState(false);
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>
          {value} / {max}
        </span>
      </div>

      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>

      {hover && (
        <div className={styles.tooltip}>
          <strong>{label}</strong>
          <div>
            Atual: {value} / {max}
          </div>
          <div>{pct}%</div>
        </div>
      )}
    </div>
  );
}

export default StatBar;
