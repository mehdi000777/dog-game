export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = document.getElementById('collisionAnimation');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifire = Math.random() + .5;
        this.width = this.spriteWidth * this.sizeModifire;
        this.height = this.spriteHeight * this.sizeModifire;
        this.x = x - this.width * .5;
        this.y = y - this.height * .5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) {
                this.markForDeletion = true;
                this.frameX = 0;
            } else this.frameX++;

            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        this.x -= this.game.speed;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}