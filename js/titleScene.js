/* Global Phaser */

// This class is the Splash Scene.
class TitleScene extends Phaser.Scene {

  // This method is the constructor.
  constructor() {

    super({ key: "titleScene" })
    
    this.splashSceneBackgroundImage = null
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

    console.log("Title Scene")
    this.load.image("unrealSceneBackground", "./images/rst_title.png")
    
  }

  /* 
  * Use it to create your game objects.
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
  */
  create(data) {

    this.splashSceneBackgroundImage = this.add.sprite(0, 0, "unrealSceneBackground")
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2

  }


  /*
  * This method is called once per game step while the scene is running.
  * @param {number} time - The current time.
  * @param {number} delta - The delta time in ms since the last frame.
  */
  update(time, delta) {

    if (time > 6200) {

      this.scene.stop("titleScene")
      this.scene.switch("menuScene")

    }
  }
}

export default TitleScene
