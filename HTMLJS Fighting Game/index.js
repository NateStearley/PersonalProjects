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

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

}

animate()


// Event Listeners
window.addEventListener("keydown", (event) => {
    console.log(event)
})