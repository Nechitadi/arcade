    // document.addEventListener('keyup', function(e) {
    // "use strict";
    // var allowedKeys = {
    //     13: 'enter'
    // };
    // if (allowedKeys = 'enter') {
    //     currentGameState = "inGame";
    //     }
    // });

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
    this.speedMultiplier = 40;
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
    if (this.x >= 505) {
        this.x = -100;
        this.randomSpeed();
    }
    this.checkCollision();
};

// Speed Multiplier, we increase this value to increase difficulty
//var speedMultiplier = 40;

// Random speed generator
Enemy.prototype.randomSpeed = function (){
    "use strict";
    this.speed = this.speedMultiplier * Math.floor(Math.random() * 10 + 1);
};
// Math.floor(Math.random() * (max - min + 1)) + min


// Draw the enemy on the screen, required method for game
// Draw the scoreboard on the screen, credit https://discussions.udacity.com/t/having-trouble-displaying-the-score/26963
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white"
    ctx.font = "16px sans-serif"
    ctx.fillText("Score: " + playerScore, 10, 70)
    ctx.fillText("Lives: " + playerLives, 111, 70)
    ctx.fillText("Difficulty: " + this.speedMultiplier, 212, 70)
};

//Check for collision. Borrowed from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
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
    playerLives -= 1;
    player.characterReset();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Start the player at 200x by 400y
var Player = function() {
    "use strict";
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-horn-girl.png';
};

var playerScore = 0;
var playerLives = 5;

// Required method for game
Player.prototype.update = function() {
    "use strict";
    // document.getElementById("lives").innerHTML = "Lives: " + playerLives;
    // document.getElementById("score").innerHTML = "Score: " + playerScore;
    // document.getElementById("difficulty").innerHTML = "Difficulty: " + speedMultiplier;
    if (playerLives === 0) {
    reset();
    }
};

// Resets the player position to the start position
Player.prototype.characterReset = function() {
    "use strict";
    this.x = 200;
    this.y = 400;
};

Player.prototype.success = function() {
    "use strict";
    playerScore += 20;
    speedMultiplier += 5;
    console.log("speedMultiplier " + speedMultiplier);
    this.characterReset();
}

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
            //check if player reached top of water, if so call success function, otherwise move up
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
        case "enter":
            if (currentGameState = "startGame") {
                currentGameState = "inGame";
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
    //enemys start off canvas (x-100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}

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
