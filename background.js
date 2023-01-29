class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.game.speed * this.speedModifier;
        if (this.x < -this.width) this.x = 0;
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer1Image = document.getElementById('layer1');
        this.layer2Image = document.getElementById('layer2');
        this.layer3Image = document.getElementById('layer3');
        this.layer4Image = document.getElementById('layer4');
        this.layer5Image = document.getElementById('layer5');
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image);
        this.layer2 = new Layer(this.game, this.width, this.height, .2, this.layer2Image);
        this.layer3 = new Layer(this.game, this.width, this.height, .4, this.layer3Image);
        this.layer4 = new Layer(this.game, this.width, this.height, .8, this.layer4Image);
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image);
        this.layerImages = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
    }

    draw(ctx) {
        this.layerImages.forEach(image => {
            image.draw(ctx);
        })
    }

    update() {
        this.layerImages.forEach(image => {
            image.update();
        })
    }
}