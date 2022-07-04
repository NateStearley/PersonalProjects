// Fighting game JS Script File
// Nate Stearley

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d") // Represents the 2d context of the canvas and creates a CanvasRenderingContext2d object

// 16 x 9 ratio
canvas.width = 1024
canvas.height = 576

// Background
c.fillRect(0, 0, canvas.width, canvas.height)

// Player variables
const playerHeight = 150
const playerWidth = 50

// Game variables
let timer = 45
const playerSpeed = 7
const jumpVelocity = 20
const gravity = 0.7

// Player Class
class Sprite {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position
    this.velocity = velocity
    this.height = playerHeight
    this.width = playerWidth
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      height: 50,
      width: 100,
    }
    this.health = 100
    this.color = color
    this.isAttacking = false
  }

  draw() {
    // Draw player
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    // Draw attack box, only if attacking
    if (this.isAttacking) {
      c.fillStyle = "green"
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      )
    }
  }

  update() {
    this.draw()
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    // If the player is about to hit the bottom stop the sprite
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
  }

  attack() {
    this.isAttacking = true

    // Timeout for 100ms
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
  }
} // Sprite class

// Player and Enemy Instantiation
const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  color: "blue",
  offset: { x: 0, y: 0 },
})

const enemy = new Sprite({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 },
})

console.log(player)

// This const represents possible pressed keys in order to more effectivly handle accurate player input
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

function DetermineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  if (document.querySelector("#displayText").style.display != "flex") {
    if (player.health === enemy.health) {
      document.querySelector("#displayText").innerHTML = "Tie"
    } else if (player.health > enemy.health) {
      document.querySelector("#displayText").innerHTML = "Player 1 Wins!"
    } else if (player.health < enemy.health) {
      document.querySelector("#displayText").innerHTML = "Player 2 Wins!"
    }
    document.querySelector("#displayText").style.display = "flex"
  }
}

let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector("#timer").innerHTML = timer
  }

  if (timer == 0) {
    DetermineWinner({ player: player, enemy: enemy, timerId })
  }
}

decreaseTimer()

// Animate Function
function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height) // Background of arena
  player.update()
  enemy.update()

  // Trigger velocity changes when keys are pressed
  // Player movement
  player.velocity.x = 0
  if (keys.a.pressed && player.lastKey == "a") {
    player.velocity.x = -playerSpeed
  } else if (keys.d.pressed && player.lastKey == "d") {
    player.velocity.x = playerSpeed
  }

  // Enemy movement
  enemy.velocity.x = 0
  if (keys.ArrowLeft.pressed && enemy.lastKey == "ArrowLeft") {
    enemy.velocity.x = -playerSpeed
  } else if (keys.ArrowRight.pressed && enemy.lastKey == "ArrowRight") {
    enemy.velocity.x = playerSpeed
  }

  // Detect for attack collision
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false // Ensure that only one hit registers
    console.log("attack hit by player")
    enemy.health -= 20
    document.querySelector("#enemyHealth").style.width = enemy.health + "%"
  }

  // Enemy attack collision
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false // Ensure that only one hit registers
    console.log("attack hit by enemy")
    player.health -= 20
    document.querySelector("#playerHealth").style.width = player.health + "%"
  }

  // Check for a player having zero health

  if (player.health <= 0 || enemy.health <= 0) {
    DetermineWinner({ player: player, enemy: enemy, timerId })
  }
} // Animate function

animate()

// Event Listeners
// Key Down
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = true
      // player.lastKey = "w"
      // console.log(player.position.y)
      if (player.position.y >= canvas.height - player.height) {
        player.velocity.y = -jumpVelocity
      }
      break
    case "a":
      keys.a.pressed = true
      player.lastKey = "a"
      break
    case "s":
      keys.s.pressed = true
      player.lastKey = "s"
      break
    case "d":
      keys.d.pressed = true
      player.lastKey = "d"
      break
    case " ":
      player.attack()
      break

    // Arrow Keys - For player 2
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true
      enemy.lastKey = "ArrowLeft"
      break
    case "ArrowRight":
      keys.ArrowRight.pressed = true
      enemy.lastKey = "ArrowRight"
      break
    case "ArrowUp":
      keys.ArrowUp.pressed = true
      // enemy.lastKey = "ArrowUp"
      if (enemy.position.y >= canvas.height - enemy.height) {
        enemy.velocity.y = -jumpVelocity
      }
      break
    case "ArrowDown":
      keys.ArrowDown.pressed = true
      enemy.lastKey = "ArrowDown"
      break
    case "n":
      enemy.attack()
      break
  }
  // console.log(event)
})

// Key Up
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = false
      break
    case "a":
      keys.a.pressed = false
      break
    case "s":
      keys.s.pressed = false
      break
    case "d":
      keys.d.pressed = false
      break

    // Enemy keys
    case "ArrowUp":
      keys.ArrowUp.pressed = false
      break
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false
      break
    case "ArrowDown":
      keys.ArrowDown.pressed = false
      break
    case "ArrowRight":
      keys.ArrowRight.pressed = false
      break
  }
  console.log(event)
})
