// Fighting game JS Script File
// Nate Stearley

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")  // Represents the 2d context of the canvas and creates a CanvasRenderingContext2d object


// 16 x 9 ratio
canvas.width = 1024
canvas.height = 576

// Background
c.fillRect(0, 0, canvas.width, canvas.height)

// Player info
const playerHeight = 150
const playerWidth = 50
const gravity = 0.3

// Player Class
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = playerHeight
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, playerWidth, playerHeight)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        // If the player is about to hit the bottom stop the sprite
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}

// Player and Enemy Instantiation
const player = new Sprite({
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0}
})

const enemy = new Sprite({
    position: {x: 400, y: 100},
    velocity: {x: 0, y: 0}
})

console.log(player)


// This const represents possible pressed keys in order to more effectivly handle accurate player input
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}
let lastKey

// Animate Function
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height) // Background of arena
    player.update()
    enemy.update()

    // Trigger velocity changes when keys are pressed
    player.velocity.x = 0
    if (keys.a.pressed && lastKey == "a") {
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey == "d") {
       player.velocity.x = 1
    }
}

animate()

// Event Listeners
// Key Down
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            keys.w.pressed = true
            lastKey = "w"
            break
        case "a":
            keys.a.pressed = true
            lastKey = "a"
            break
        case "s":
            keys.s.pressed = true
            lastKey = "s"
            break
        case "d":
            keys.d.pressed = true
            lastKey = "d"
            break

        // Arrow Keys - For player 2
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            lastKey = "ArrowLeft"
            break
        case "ArrowRight":
            keys.ArrowRight.pressed = true
            lastKey = "ArrowRight"
            break
        case "ArrowUp":
            keys.ArrowUp.pressed = true
            lastKey = "ArrowUp"
            break
        case "ArrowDown":
            keys.ArrowDown.pressed = true
            lastKey = "ArrowDown"
        
    }
    console.log(event)
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
        case 'd':
            keys.d.pressed = false
            break
        
    }
    console.log(event)
})



