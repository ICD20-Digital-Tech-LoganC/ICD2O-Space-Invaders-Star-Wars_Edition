/* Global Phaser */

// This class is the Splash Scene.
class MenuScene extends Phaser.Scene {

  // This method is the constructor.
  constructor() {

    super({ key: "menuScene" })

    this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  /* 
  * This method is called by the Scene Manager when the scene starts,
  * Before preload() and create().
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  init(data) {

    this.cameras.main.setBackgroundColor("#ffffff")

  }


  // Use it to load assets.

  preload() {

    console.log("Menu Scene")
    this.load.image('menuSceneBackground', './assets/rst_main_menu.png')
    this.load.image('play', './assets/play.png')
    
  }

  /* 
  * Use it to create your game objects.
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  create(data) {

    this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground")
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'play')
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())

  }


  /*
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time.
  * @param {number} delta - The delta time in ms since the last frame.
  */
  update(time, delta) {
  }

  clickButton () {
    this.scene.start("gameScene")
  }
}

export default MenuScene
