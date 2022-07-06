class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position
    this.height = 150
    this.width = 50
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw() {
    //  Draw background
    c.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw()
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
} // Fighter class
