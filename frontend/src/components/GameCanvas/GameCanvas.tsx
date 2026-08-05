import { useEffect } from "react";
import { createGame } from "../../game/core/createGame";

export default function GameCanvas() {
  useEffect(() => {
    const game = createGame("game-container");

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
}