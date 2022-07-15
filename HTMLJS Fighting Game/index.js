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
const playerSpeed = 7
const jumpVelocity = 20
const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
})

const shop = new Sprite({
  position: {
    x: 620,
    y: 128,
  },
  imageSrc: "./img/shop.png",
  scale: 2.75,
  framesMax: 6,
})

// Player and Enemy Instantiation
const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  color: "blue",
  imageSrc: "./img/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: "./img/samuraiMack/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./img/samuraiMack/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/samuraiMack/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/samuraiMack/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/samuraiMack/Attack1.png",
      framesMax: 6,
    },
    takehit: {
      imageSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/samuraiMack/Death.png",
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 125,
    height: 75,
  },
})

const enemy = new Fighter({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 },
  imageSrc: "./img/kenji/Idle.png",
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 169,
  },
  sprites: {
    idle: {
      imageSrc: "./img/kenji/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./img/kenji/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/kenji/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/kenji/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/kenji/Attack1.png",
      framesMax: 4,
    },
    takehit: {
      imageSrc: "./img/kenji/Take hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/kenji/Death.png",
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -150,
      y: 50,
    },
    width: 125,
    height: 75,
  },
})

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

decreaseTimer()

// Animate Function
function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height) // Background of arena
  background.update()
  shop.update()
  c.fillStyle = "rgba(255, 255, 255, 0.1)"
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  // Trigger velocity changes when keys are pressed
  // Player movement
  player.velocity.x = 0
  if (keys.a.pressed && player.lastKey == "a") {
    player.velocity.x = -playerSpeed
    player.switchSprite("run")
  } else if (keys.d.pressed && player.lastKey == "d") {
    player.velocity.x = playerSpeed
    player.switchSprite("run")
  } else {
    player.switchSprite("idle")
  }

  // Check if jumping for jump animation
  if (player.velocity.y < 0) {
    player.switchSprite("jump")
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall")
  }

  // Enemy movement
  enemy.velocity.x = 0
  if (keys.ArrowLeft.pressed && enemy.lastKey == "ArrowLeft") {
    enemy.velocity.x = -playerSpeed
    enemy.switchSprite("run")
  } else if (keys.ArrowRight.pressed && enemy.lastKey == "ArrowRight") {
    enemy.velocity.x = playerSpeed
    enemy.switchSprite("run")
  } else {
    enemy.switchSprite("idle")
  }

  // Check if jumping for jump animation
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump")
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall")
  }

  // Detect for attack collision
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    player.framesCurrent == 4
  ) {
    player.isAttacking = false // Ensure that only one hit registers
    // console.log("attack hit by player")
    enemy.takeHit()
    // document.querySelector("#enemyHealth").style.width = enemy.health + "%"
    gsap.to("#enemyHealth", {width: enemy.health + "%" })
  }

  // If player misses
  if (player.isAttacking && player.framesCurrent == 4) {
    player.isAttacking = false
  }

  // Enemy attack collision
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking &&
    enemy.framesCurrent == 2
  ) {
    enemy.isAttacking = false // Ensure that only one hit registers
    // console.log("attack hit by enemy")
    player.takeHit()
    // document.querySelector("#playerHealth").style.width = player.health + "%"
    gsap.to("#playerHealth", {width: player.health + "%" })
  }

  // If enemy misses
  if (enemy.isAttacking && enemy.framesCurrent == 2) {
    enemy.isAttacking = false
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
  if (!player.dead) {
    switch (event.key) {
      case "w":
        keys.w.pressed = true
        // player.lastKey = "w"
        // console.log(player.position.y)
        if (player.position.y >= canvas.height - player.height - 96) {
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
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
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
        if (enemy.position.y >= canvas.height - enemy.height - 96) {
          enemy.velocity.y = -jumpVelocity
        }
        break
      case "ArrowDown":
        enemy.attack()
        break
    }
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
})
