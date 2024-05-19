

class GameScene extends Phaser.Scene {

  constructor() {

    super({ key: 'gameScene' })
    this.gameSceneBackgroundImage = null
    this.player = null
    this.firelaser = false

  }

  init(data) {

    this.cameras.main.setBackgroundColor('#ffffff')

  }

  preload() {

    console.log('gameScene')

    // loads images
    this.load.image('gameSceneBackground', './images/space-background.jpg')
    this.load.image('player', './images/arc170_starfighter.png')
    this.load.image('laser', './images/laser.jpg')

  }

  create(data) {

    
    this.gameSceneBackgroundImage = this.add.image(0, 0, 'gameSceneBackground')
    this.gameSceneBackgroundImage.setOrigin(0, 0)
    
    // adds player phyics
    this.player = this.physics.add.sprite(1920 / 2, 1080 - 100, 'player')

    // create a group for the lasers
    this.laserGroup = this.physics.add.group()

  }

  update(time, delta) {

    // player movement
    const keyLeftObj = this.input.keyboard.addKey('A')
    const keyRightObj = this.input.keyboard.addKey('D')
    const keyDownObj = this.input.keyboard.addKey('S')
    const keyUpObj = this.input.keyboard.addKey('W')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    // set player velocity to zero by default
    this.player.setVelocity(0);

    // move left if a is pressed
    if (keyLeftObj.isDown === true) {
      this.player.setVelocityX(-300)
      if (this.player.x < 0) {
        this.player.x = 0
      }
    }

    // move right if d is pressed
    if (keyRightObj.isDown === true) {
      this.player.setVelocityX(300);
      if (this.player.x > 1920) {
        this.player.x = 1920
      }
    }

    // move down if s is pressed
    if (keyDownObj.isDown === true) {
      this.player.setVelocityY(300);
      if (this.player.y > 1080) {
        this.player.y = 1080
      }
    }

    // move up if w is pressed
    if (keyUpObj.isDown === true) {
      this.player.setVelocityY(-300);
      if (this.player.y < 0) {
        this.player.y = 0
      }
    }
    
    // fire laser using spacebar if the spacebar is not released or being pressed
    if (keySpaceObj.isDown === true) {
      if (this.firelaser === false) {
        this.firelaser = true
        const newLaser = this.physics.add.sprite(this.player.x, this.player.y, 'laser')
      }
    }

    // if the spacebar is released or not being pressed
    if (keySpaceObj.isUp === true) {
      this.firelaser = false
    }
  }
}

export default GameScene
