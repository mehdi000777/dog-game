export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
    }

    draw(ctx) {
        ctx.font = this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign = 'left';


        //Score
        ctx.fillStyle = 'white';
        ctx.fillText('Score : ' + this.game.score, 22, 52);
        ctx.fillStyle = this.game.fontColor;
        ctx.fillText('Score : ' + this.game.score, 20, 50);

        //Timer
        ctx.font = this.fontSize * .8 + 'px ' + this.fontFamily;
        ctx.fillStyle = 'white';
        ctx.fillText('Time : ' + (this.game.time * 0.001).toFixed(1), 22, 82);
        ctx.fillStyle = this.game.fontColor;
        ctx.fillText('Time : ' + (this.game.time * 0.001).toFixed(1), 20, 80);

        //Lives
        for (let i = 0; i < this.game.lives; i++) {
            ctx.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25)
        }

        //Game Over Message
        if (this.game.gameOver) {
            ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            ctx.textAlign = 'center'
            if (this.game.score > this.game.winingScore) {
                ctx.fillStyle = 'white';
                ctx.fillText('Win', this.game.width / 2 + 2, this.game.height / 2 + 2);
                ctx.fillStyle = this.game.fontColor;
                ctx.fillText('Win', this.game.width / 2, this.game.height / 2);
            } else {
                ctx.fillStyle = 'white';
                ctx.fillText('Loos', this.game.width / 2 + 2, this.game.height / 2 + 2);
                ctx.fillStyle = this.game.fontColor;
                ctx.fillText('Loos', this.game.width / 2, this.game.height / 2);
            }
        }
    }
}