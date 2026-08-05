import Phaser from "phaser";

export class WorldScene extends Phaser.Scene {
  private player?: Phaser.GameObjects.Rectangle;
  private playerBody?: Phaser.Physics.Arcade.Body;

  private groundLayer?: Phaser.Tilemaps.TilemapLayer;
  private collisionLayer?: Phaser.Tilemaps.TilemapLayer;

  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private wasd?: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  private readonly playerSpeed = 150;

  private readonly lastValidPosition =
    new Phaser.Math.Vector2();

  constructor() {
    super("WorldScene");
  }

  create() {
    this.cameras.main.setBackgroundColor(
      "#18263d"
    );

    const map = this.make.tilemap({
      key: "training-ground",
    });

    console.log(
      "Camadas:",
      map.layers.map((layer) => ({
        nome: layer.name,
        largura: layer.width,
        altura: layer.height,
      }))
    );

    const tileset = map.addTilesetImage(
      "landscape",
      "landscape"
    );

    if (!tileset) {
      console.error(
        'Não foi possível conectar o tileset "landscape".'
      );

      return;
    }

    /*
     * Camada visual do chão.
     */
    const groundLayer = map.createLayer(
      "ground",
      tileset,
      0,
      0
    );

    if (!groundLayer) {
      console.error(
        'Não foi possível criar a camada "ground".'
      );

      return;
    }

    groundLayer.setVisible(true);
    groundLayer.setAlpha(1);
    groundLayer.setDepth(0);

    this.groundLayer = groundLayer;

    console.log(
      "Tiles na ground:",
      groundLayer
        .getTilesWithin()
        .filter((tile) => tile.index !== -1)
        .length
    );

    /*
     * Camada que demarca os limites.
     */
    const collisionLayer = map.createLayer(
      "collision",
      tileset,
      0,
      0
    );

    if (!collisionLayer) {
      console.error(
        'Não foi possível criar a camada "collision".'
      );

      return;
    }

    collisionLayer.setCollisionByExclusion([
      -1,
    ]);

    collisionLayer.forEachTile((tile) => {
      if (tile.index !== -1) {
        tile.setCollision(
          true,
          true,
          true,
          true
        );
      }
    });

    /*
     * A camada continua existindo para colisões,
     * mas não aparece visualmente no jogo.
     */
    collisionLayer.setVisible(false);
    collisionLayer.setDepth(5);

    this.collisionLayer = collisionLayer;

    /*
     * Tile inicial do jogador.
     */
    const spawnTile = groundLayer.getTileAt(
      50,
      10
    );

    if (
      !spawnTile ||
      spawnTile.index === -1
    ) {
      console.error(
        "O tile escolhido para o jogador está vazio."
      );

      return;
    }

    const spawnX =
      spawnTile.getCenterX();

    const spawnY =
      spawnTile.getCenterY();

    console.log("Spawn do jogador:", {
      tileX: spawnTile.x,
      tileY: spawnTile.y,
      worldX: spawnX,
      worldY: spawnY,
    });

    /*
     * Bounds para o mapa isométrico.
     */
    const boundsWidth =
      (map.width + map.height) *
      (map.tileWidth / 2);

    const boundsHeight =
      (map.width + map.height) *
        (map.tileHeight / 2) +
      tileset.tileHeight;

    this.physics.world.setBounds(
      0,
      0,
      boundsWidth,
      boundsHeight
    );

    this.cameras.main.setBounds(
      0,
      0,
      boundsWidth,
      boundsHeight
    );

    this.createPlayer(
      spawnX,
      spawnY - 32
    );

    if (
      !this.player ||
      !this.playerBody
    ) {
      console.error(
        "O jogador não foi criado corretamente."
      );

      return;
    }

    /*
     * Guarda a primeira posição válida.
     */
    this.lastValidPosition.set(
      this.player.x,
      this.player.y
    );

    /*
     * Colisão física com os tiles da camada
     * collision.
     */
    this.physics.add.collider(
      this.player,
      collisionLayer
    );

    this.createControls();

    this.cameras.main.setZoom(0.8);

    this.cameras.main.centerOn(
      spawnX,
      spawnY
    );

    this.cameras.main.startFollow(
      this.player,
      true,
      0.08,
      0.08
    );

    /*
     * Para visualizar as colisões durante testes,
     * descomente este bloco.
     */

    /*
    this.physics.world.createDebugGraphic();

    if (this.physics.world.debugGraphic) {
      this.physics.world.debugGraphic.setDepth(
        100
      );
    }
    */
  }

  update() {
    if (
      !this.player ||
      !this.playerBody ||
      !this.cursors ||
      !this.wasd ||
      !this.groundLayer ||
      !this.collisionLayer
    ) {
      return;
    }

    /*
     * Ponto usado para verificar onde os pés
     * do personagem estão.
     */
    const feetX =
      this.playerBody.center.x;

    const feetY =
      this.playerBody.bottom - 2;

    const groundTile =
      this.groundLayer.getTileAtWorldXY(
        feetX,
        feetY
      );

    const collisionTile =
      this.collisionLayer.getTileAtWorldXY(
        feetX,
        feetY
      );

    const isOnGround =
      groundTile !== null &&
      groundTile.index !== -1;

    const isOnCollision =
      collisionTile !== null &&
      collisionTile.index !== -1;

    /*
     * Se saiu do chão ou entrou em um tile de
     * colisão, volta para a última posição válida.
     */
    if (
      !isOnGround ||
      isOnCollision
    ) {
      this.player.setPosition(
        this.lastValidPosition.x,
        this.lastValidPosition.y
      );

      this.playerBody.reset(
        this.lastValidPosition.x,
        this.lastValidPosition.y
      );

      this.playerBody.setVelocity(
        0,
        0
      );

      return;
    }

    /*
     * A posição atual é segura.
     */
    this.lastValidPosition.set(
      this.player.x,
      this.player.y
    );

    let directionX = 0;
    let directionY = 0;

    const movingLeft =
      this.cursors.left.isDown ||
      this.wasd.A.isDown;

    const movingRight =
      this.cursors.right.isDown ||
      this.wasd.D.isDown;

    const movingUp =
      this.cursors.up.isDown ||
      this.wasd.W.isDown;

    const movingDown =
      this.cursors.down.isDown ||
      this.wasd.S.isDown;

    if (movingLeft) {
      directionX = -1;
    } else if (movingRight) {
      directionX = 1;
    }

    if (movingUp) {
      directionY = -1;
    } else if (movingDown) {
      directionY = 1;
    }

   const direction =
  new Phaser.Math.Vector2(
    directionX - directionY,
    (directionX + directionY) * 0.5
  );

    if (direction.lengthSq() > 0) {
      direction
        .normalize()
        .scale(this.playerSpeed);
    }

    this.playerBody.setVelocity(
      direction.x,
      direction.y
    );
  }

  private createPlayer(
    positionX: number,
    positionY: number
  ) {
    const player = this.add.rectangle(
      positionX,
      positionY,
      48,
      64,
      0x34d5ff
    );

    player.setStrokeStyle(
      3,
      0xffffff
    );

    player.setDepth(10);

    this.physics.add.existing(player);

    const playerBody =
      player.body as Phaser.Physics.Arcade.Body;

    /*
     * A colisão fica na região dos pés.
     */
    playerBody.setSize(
      40,
      32
    );

    playerBody.setOffset(
      4,
      32
    );

    playerBody.setCollideWorldBounds(
      true
    );

    this.player = player;
    this.playerBody = playerBody;
  }

  private createControls() {
    if (!this.input.keyboard) {
      console.error(
        "O teclado não está disponível."
      );

      return;
    }

    this.cursors =
      this.input.keyboard
        .createCursorKeys();

    this.wasd =
      this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
      }) as {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
      };
  }
}