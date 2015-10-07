"use strict";

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.checkCollision();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // Reset the enemy with a new speed when it goes off screen
    if (this.x >= 505) {
        this.x = -100;
        this.randomSpeed();
    }
    
};

Enemy.prototype.checkCollision = function(){
    // Set bounding boxes for collision detection
    var enemyLeft = this.x - 50;
    var enemyRight = this.x + 50;
    var enemyTop = this.y - 40;
    var enemyBottom = this.y + 40;
    // Check for collisions. If there is one, reset the player to the initial position
    if (player.x > enemyLeft && player.x < enemyRight && player.y > enemyTop && player.y < enemyBottom) {
        player.characterReset();
    }
};

// Speed Multiplier, increases the value we get from random to something challenging
var speedMultiplier = 50;

// Random speed generator
Enemy.prototype.randomSpeed = function (){
    this.speed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Start the player at 200 x 400 
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-horn-girl.png';
};

// Update the players's position, required method for game
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

// Resets the player position to the start position
Player.prototype.characterReset = function() {
    this.x = 200;
    this.y = 400;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case "left":
            //check for wall, otherwise move left
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case "right":
            //check for wall, otherwise move right
            if (this.x < 402) {
                this.x += 101;
            }
            break;
        case "up":
            //check if player reached water, if so reset, otherwise move up
            if (this.y < 70) {
                this.characterReset();
            } else {
                this.y -= 83;
            }
            break;
        case "down":
            //check for bottom, otherwise move down
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

//allEnemies array
var allEnemies = [];

//Instantiate all enemies, set to 3
for (var i = 0; i < 3; i++) {
    var startSpeed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
    allEnemies.push(new Enemy(-100, 60 + 85 * i, startSpeed));
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
