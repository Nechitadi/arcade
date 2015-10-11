
/*----------------------------------------------------------------------------*/
/*-----------------------------Enemy------------------------------------------*/

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    "use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // Reset the enemy with a new speed after it goes off screen
    this.offScreenX = 505;
    this.startingX = -100;
    if (this.x >= this.offScreenX) {
        this.x = this.startingX;
        this.randomSpeed();
    }
    this.checkCollision();
};

// Speed Multiplier, we increase this value to increase difficulty
var speedMultiplier = 40;

// Random speed generator
Enemy.prototype.randomSpeed = function (){
    "use strict";
    this.speed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
};

// Draw the enemy on the screen, required method for game
// Draw the scoreboard on the screen, credit
// https://discussions.udacity.com/t/having-trouble-displaying-the-score/26963
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = "16px Comic Sans MS";
    ctx.fillText("Score: " + player.playerScore, 40, 70);
    ctx.fillText("Lives: " + player.playerLives, 141, 70);
    ctx.fillText("Difficulty: " + speedMultiplier, 260, 70);
};

// Check for collision. Borrowed from
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollision = function() {
    "use strict";
    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var enemyBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions
    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Collision detected, decrement playerLives and reset the character
Enemy.prototype.collisionDetected = function() {
    "use strict";
    player.playerLives -= 1;
    player.characterReset();
};

/*----------------------------------------------------------------------------*/
/*--------------------------------Gem-----------------------------------------*/

// Gems the player should try to pick up
var Gem = function(x,y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem_Orange.png';
};

Gem.prototype.update = function() {
    "use strict";
    this.checkCollision();
};

Gem.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.checkCollision = function() {
    "use strict";
    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var gemBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions
    if (playerBox.x < gemBox.x + gemBox.width &&
        playerBox.x + playerBox.width > gemBox.x &&
        playerBox.y < gemBox.y + gemBox.height &&
        playerBox.height + playerBox.y > gemBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Gem collision detected, hide the gem off canvas,
// Wait, then reset the gem and increment player score
Gem.prototype.collisionDetected = function() {
    "use strict";
    this.x = 900;
    this.y = 900;
    player.playerScore += 30;
    setTimeout( function() {
        gem.gemReset();
    }, 5000);
};

// Reset the gem to a new location
Gem.prototype.gemReset = function() {
    "use strict";
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    //Gems appear at one of the following Y positions: 60, 145, 230
    this.y = (60 + (85 * Math.floor(Math.random() * 3) + 0));
};
/*----------------------------------------------------------------------------*/
/*--------------------------------Heart---------------------------------------*/

// Hearts the player should try to pick up
var Heart = function(x,y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
};

Heart.prototype.update = function() {
    "use strict";
    this.checkCollision();
};

Heart.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Heart.prototype.checkCollision = function() {
    "use strict";
    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var heartBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions
    if (playerBox.x < heartBox.x + heartBox.width &&
        playerBox.x + playerBox.width > heartBox.x &&
        playerBox.y < heartBox.y + heartBox.height &&
        playerBox.height + playerBox.y > heartBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Heart collision detected, hide the heart off canvas,
// Increment player lives, wait, then reset the heart and
Heart.prototype.collisionDetected = function() {
    "use strict";
    this.x = 900;
    this.y = 900;
    player.playerLives += 1;
    setTimeout( function() {
        heart.gemReset();
    }, 30000);
};

// Reset the heart to a new location
Heart.prototype.gemReset = function() {
    "use strict";
    //Gems appear at one of the following x positions: 0, 101, 202, 303, 404
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    //Gems appear at one of the following Y positions: 60, 145, 230
    this.y = (60 + (85 * Math.floor(Math.random() * 3) + 0));
};

/*----------------------------------------------------------------------------*/
/*------------------------------Player----------------------------------------*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Start the player at 200x by 400y
var Player = function() {
    "use strict";
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
    this.sprite = 'images/char-horn-girl.png';
    this.playerScore = 0;
    this.playerLives = 3;
};

// Required method for game
// Check if playerLives is 0, if so call reset
Player.prototype.update = function() {
    "use strict";
    if (this.playerLives === 0) {
    reset();
    }
};

// Resets the player position to the start position
Player.prototype.characterReset = function() {
    "use strict";
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
};

// Increment score and increase difficulty when player reaches top of water
Player.prototype.success = function() {
    "use strict";
    this.playerScore += 20;
    speedMultiplier += 5;
    //console.log("speedMultiplier " + speedMultiplier);
    this.characterReset();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player according to keys pressed
Player.prototype.handleInput = function(allowedKeys) {
    "use strict";
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
            //check if player reached top of water, if so call success function,
            // otherwise move up
            if (this.y < 0) {
                this.success();
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

/*----------------------------------------------------------------------------*/
/*-------------------------Instantiate Objects--------------------------------*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

//allEnemies array
var allEnemies = [];

// Instantiate all enemies, set to 3, push to allEnemies array
for (var i = 0; i < 3; i++) {
    var startSpeed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
    //enemys start off canvas (x-100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}

// Instantiate Gem
// Gems start at a random spot aligned with one of the gravel tiles
var gem = new Gem (101 * Math.floor(Math.random() * 4) + 0, 60 + (85 * Math.floor(Math.random() * 3) + 0));

// Instantiate heart
// Hearts start at a random spot aligned with one of the gravel tiles
var heart = new Heart (101 * Math.floor(Math.random() * 4) + 0, 60 + (85 * Math.floor(Math.random() * 3) + 0));

/*----------------------------------------------------------------------------*/
/*---------------------------Event Listener-----------------------------------*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    "use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
