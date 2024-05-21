

class GameScene extends Phaser.Scene {

  // Create Droids
  createDroids () {
    const droidXLocation = Math.floor(Math.random() * 1920) // This will return a random number between 0 and 1920
    let droidXVelocity = Math.floor(Math.random() * 50 + 1) // This will return a random number between 1 and 50
    droidXVelocity *= Math.round(Math.random()) ? 1 : -1 // This will add minus sign in 50% of cases
    const droid = this.physics.add.sprite(droidXLocation, -100, 'droid')
    droid.body.velocity.y = 200
    droid.body.velocity.x = droidXVelocity
    this.droidGroup.add(droid)
  }

  constructor() {

    super({ key: 'gameScene' })
    
    this.gameSceneBackgroundImage = null
    this.player = null
    this.firelaser = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }

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
    this.load.image('droid', './images/Vulture_droid.png')

    //load sounds
    this.load.audio('laserSound', './sounds/laserShoot.mp3');
    this.load.audio('explosion', './sounds/dead_ship.mp3');
    this.load.audio('explosionPlayer', './sounds/dead_player.mp3');

  }

  create(data) {

    this.gameSceneBackgroundImage = this.add.image(0, 0, 'gameSceneBackground')
    this.gameSceneBackgroundImage.setOrigin(0, 0)

    // Adds score text
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    
    // adds player phyics
    this.player = this.physics.add.sprite(1920 / 2, 1080 - 100, 'player')

    // create a group for the lasers
    this.laserGroup = this.physics.add.group()

    // Create a group for the droids
    this.droidGroup = this.add.group()
    this.createDroids()

    // Add collisions between the lasers and the droids
    this.physics.add.collider(this.laserGroup, this.droidGroup, function (laserCollide, droidCollide) {
      droidCollide.destroy()
      laserCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createDroids()
      this.createDroids()
    }.bind(this))

    // Add collisions between the player and the droids
    this.physics.add.collider(this.player, this.droidGroup, function (playerCollide, droidCollide) {
      this.sound.play('explosionPlayer')
      this.physics.pause()
      droidCollide.destroy()
      playerCollide.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over, You Lose!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }.bind(this))
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
      this.player.setVelocityX(-435)
      if (this.player.x < 0) {
        this.player.x = 0
      }
    }

    // move right if d is pressed
    if (keyRightObj.isDown === true) {
      this.player.setVelocityX(435);
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
        this.laserGroup.add(newLaser)
        this.sound.play('laserSound')
      }
    }

    // if the spacebar is released or not being pressed
    if (keySpaceObj.isUp === true) {
      this.firelaser = false
    }

    this.laserGroup.children.each(function (item) {
      item.setVelocityY(-420)
      if (item.y < 0) {
        item.destroy()
      }
    })

    if (this.droidGroup.x < 0) {
      this.droidGroup.destroy()
    }

    if (this.droidGroup.countActive(true) === 0) {
      this.sound.play('explosionPlayer')
      this.physics.pause()
      droidCollide.destroy()
      playerCollide.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over, You Lose!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }
  }
}

export default GameScene
