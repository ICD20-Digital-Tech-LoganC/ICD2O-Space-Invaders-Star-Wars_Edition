class GameScene extends Phaser.Scene {

  constructor () {
    
    super({ key: 'gameScene' })
    this.gameSceneBackgroundImage = null
    this.player = null
    this.firelaser = false
    
  }

  init (data) {
    
    this.cameras.main.setBackgroundColor('#ffffff')
    
  }

  preload () {
    
    console.log('gameScene')

    // images
    this.load.image('gameSceneBackground', './images/space-background.jpg')
    this.load.image('player', './images/arc170_starfighter.png')
    this.load.image('laser', './images/laser.jpg')
    
  }

  create (data) {

    this.gameSceneBackgroundImage = this.add.image(0, 0, 'gameSceneBackground')
    this.gameSceneBackgroundImage.setOrigin(0, 0)

    this.player = this.physics.add.sprite(1920 / 2, 1080 - 100, 'player')

    // create a group for the lasers
    this.laserGroup = this.physics.add.group()
    
  }

  update (time, delta) {
    
    // player movement
    const keyLeftObj = this.input.keyboard.addKey('A')
    const keyRightObj = this.input.keyboard.addKey('D')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    if (keyLeftObj.isDown === true) {
      this.player.x -= 15
      if (this.player.x < 0) {
        this.player.x = 0
      }

      if (keyRightObj.isDown === true) {
        this.player.x += 15
        if (this.player.x > 1920) {
          this.player.x = 1920
        }
      }

      if (keySpaceObj.isDown === true) {
        if (this.firelaser === false) {
          
          // fire laser
          this.firelaser = true
          const newLaser = this.physics.add.sprite(this.player.x, this.player.y, 'laser')
        }
      }

      if (keySpaceObj.isUp === true) {
        this.firelaser = false
      }
    }
  }
}

export default GameScene
