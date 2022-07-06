class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
    this.position = position
    this.height = 150
    this.width = 50
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
  }

  draw() {
    //  Draw background
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  update() {
    this.draw()
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold == 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }
} // Sprite class

// Player Class
class Fighter {
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
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
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
} // Fighter class