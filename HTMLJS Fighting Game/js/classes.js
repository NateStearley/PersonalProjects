class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
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
    this.offset = offset
  }

  draw() {
    //  Draw background
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold == 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
} // Sprite class

// Player Class
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      imageSrc,
      scale,
      framesMax,
      position,
      offset,
    })

    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5

    this.velocity = velocity
    this.height = playerHeight
    this.width = playerWidth
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      height: attackBox.height,
      width: attackBox.width,
    }
    this.health = 100
    this.color = color
    this.isAttacking = false
    this.sprites = sprites
    this.dead = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  } // Fighter Constructor

  // Needs to use the draw method from sprite
  // draw() {
  //   // Draw player
  //   c.fillStyle = this.color
  //   c.fillRect(this.position.x, this.position.y, this.width, this.height)

  //   // Draw attack box, only if attacking
  //   if (this.isAttacking) {
  //     c.fillStyle = "green"
  //     c.fillRect(
  //       this.attackBox.position.x,
  //       this.attackBox.position.y,
  //       this.attackBox.width,
  //       this.attackBox.height
  //     )
  //   }
  // }

  update() {
    this.draw()
    if (!this.dead) {
      this.animateFrames()
    }

    // Attack box
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    // Temp attackbox rectangle
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // )

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    // gravity function
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0
      this.position.y = 330
    } else {
      this.velocity.y += gravity
    }
  }

  attack() {
    // Prevent spamming the attack button and it registering every time
    if (this.image !== this.sprites.attack1.image) {
      this.switchSprite("attack1")
      this.isAttacking = true
    }
  }

  takeHit() {
    this.health -= 20

    if (this.health <= 0) {
      this.switchSprite("death")
    } else {
      this.switchSprite("takehit")
    }
  }

  switchSprite(sprite) {
    // Override other animations
    // Override for attack
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    ) {
      return
    }

    // Override for takehit
    if (
      this.image === this.sprites.takehit.image &&
      this.framesCurrent < this.sprites.takehit.framesMax - 1
    ) {
      return
    }

    // Override for death
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1) {
        this.dead = true
      }
      return
    }

    // Switch case
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
        }
        break
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.framesCurrent = 0
        }
        break
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.framesCurrent = 0
        }
        break
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.framesMax = this.sprites.fall.framesMax
          this.framesCurrent = 0
        }
        break
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image
          this.framesMax = this.sprites.attack1.framesMax
          this.framesCurrent = 0
        }
        break
      case "takehit":
        if (this.image !== this.sprites.takehit.image) {
          this.image = this.sprites.takehit.image
          this.framesMax = this.sprites.takehit.framesMax
          this.framesCurrent = 0
        }
        break
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.framesMax = this.sprites.death.framesMax
          this.framesCurrent = 0
        }
        break
    }
  }
} // Fighter class
