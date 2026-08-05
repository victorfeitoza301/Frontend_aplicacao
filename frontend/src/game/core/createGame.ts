import Phaser from "phaser";
import { BootScene } from "../scenes/BootScene";
import { WorldScene } from "../scenes/WorldScene";

export function createGame(parent: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,

    backgroundColor: "#000000",

    width: window.innerWidth,
    height: window.innerHeight,

    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },

    scene: [BootScene, WorldScene],

    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  });
}