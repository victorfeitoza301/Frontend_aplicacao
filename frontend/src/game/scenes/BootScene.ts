import Phaser from "phaser";

import landscapeUrl from "../assets/tilesets/landscape.png";
import trainingGroundUrl from "../assets/maps/training-ground/training-ground.json?url";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("landscape", landscapeUrl);

    this.load.tilemapTiledJSON(
      "training-ground",
      trainingGroundUrl
    );
  }

  create() {
    this.scene.start("WorldScene");
  }
}