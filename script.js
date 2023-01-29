import Player from './player.js';
import InputHandler from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './ui.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 40;
            this.speed = 0;
            this.maxSpeed = 3;
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticle = 100;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.background = new Background(this);
            this.ui = new UI(this);
            this.frameInterval = 1000;
            this.frameTimer = 0;
            this.debug = false;
            this.time = 0;
            this.maxTime = 30000;
            this.winingScore = 40;
            this.gameOver = false;
            this.score = 0;
            this.fontColor = 'black';
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.lives = 5;
        }

        update(deltaTime) {
            this.time += deltaTime;
            if (this.time >= this.maxTime) this.gameOver = true;

            this.player.update(this.input.keys, deltaTime);
            this.background.update()

            //enemies
            if (this.frameTimer > this.frameInterval) {
                this.addEnemy();
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            //check end of screen
            this.enemies = this.enemies.filter(enemy => !enemy.markForDelition);

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });

            //handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markForDeletion) this.particles.splice(index, 1);
            });
            if (this.particles.length > this.maxParticle) {
                this.particles.length = this.maxParticle;
            }

            //handle Collision Animation
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markForDeletion) this.collisions.splice(index, 1);
            })

            //handle Floating Messags
            this.floatingMessages.forEach((message, index) => {
                message.update();
                if (message.markedForDeletion) this.floatingMessages.splice(index, 1);
            });
        }

        draw(ctx) {
            this.background.draw(ctx);
            this.player.draw(ctx);
            this.enemies.forEach(enemy => {
                enemy.draw(ctx);
            });
            this.particles.forEach(particle => {
                particle.draw(ctx);
            });
            this.collisions.forEach(collision => {
                collision.draw(ctx);
            });
            this.floatingMessages.forEach(message => {
                message.draw(ctx);
            });
            this.ui.draw(ctx);
        }

        addEnemy() {
            if (this.speed > 0 && Math.random() < .5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    const animate = (timeStamp) => {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
})