import GameCanvas from "../../components/GameCanvas/GameCanvas";
import styles from "./Game.module.css";

export default function Game() {
  return (
    <main className={styles.container}>
      <GameCanvas />
    </main>
  );
}