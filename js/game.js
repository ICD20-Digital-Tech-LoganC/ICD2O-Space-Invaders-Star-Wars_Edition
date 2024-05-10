/* Global Phaser */

// Scene import statements
import SplashScene from "./js/splashScene.js"
import TitleScene from "./js/titleScene.js"

// Create the new scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()

// Start Phaser Game
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },

  // set background colour
  backgroundColor: 0xfff243,
  scale: {
    mode: Phaser.Scale.FIT,
    
    // We place the Game in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)
// console.log(game)

// Load scenes
// Note: remember any "key" is global and CAN NOT be reused
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)

// Start the game
game.scene.start("splashScene")
