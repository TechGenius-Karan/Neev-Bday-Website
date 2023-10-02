// Variables
const playButton = document.getElementById("play-button");
const playAgainButton = document.getElementById("playAgainButton");
const game = document.getElementById("game");
const player = document.getElementById("player");
const computer = document.getElementById("computer");
const ball = document.getElementById("ball");
const score = document.getElementById("score");
const h1 = document.querySelector('h1');

let ballX = 290;
let ballY = 190;
let ballSpeedX = 5;
let ballSpeedY = 5;

let playerY = 150;
let computerY = 150;

let playerScore = 0;
let computerScore = 0;

let gameInterval;

// Start the game
playButton.addEventListener("click", startGame);


function startGame() {
    playButton.style.display = "none";
    gameInterval = setInterval(updateGameArea, 20);
}

// Update the game area
function updateGameArea() {
    // Move player paddle
    document.addEventListener("mousemove", movePlayerPaddle);
    
    // Move computer paddle (simple AI)
    moveComputerPaddle();

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collisions
    if (ballY <= 0 || ballY >= 380) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 0) {
        computerScore++;
        resetBall();
    }

    if (ballX >= 580) {
        playerScore++;
        resetBall();
    }

    // Paddle collisions
    if (ballX <= 20 && ballY >= playerY && ballY <= playerY + 80) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= 560 && ballY >= computerY && ballY <= computerY + 80) {
        ballSpeedX = -ballSpeedX;
    }

    // Update scores
    score.innerText = `Player: ${playerScore} - Computer: ${computerScore}`;

    // Update game elements
    player.style.top = playerY + "px";
    computer.style.top = computerY + "px";
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    
    // Check for game over
    if (playerScore >= 5 || computerScore >= 5) {
        clearInterval(gameInterval);
        playAgainButton.addEventListener("click", () => {
            resetBall();
            startGame();
            resetScore();
        });
    }
}

//Reset score
function resetScore() {
    if(0===0) {
        playerScore = 0;
        computerScore = 0;
    }   
}

// Move player paddle with mouse
function movePlayerPaddle(event) {
    playerY = event.clientY - game.offsetTop - 40;
    if (playerY < 0) playerY = 0;
    if (playerY > 320) playerY = 320;
}

// Move computer paddle (simple AI)
function moveComputerPaddle() {
    const computerCenter = computerY + 40;
    if (computerCenter < ballY - 20) {
        computerY += 3.5;
    } else if (computerCenter > ballY + 20) {
        computerY -= 3.5;
    }
}

// Reset the ball
function resetBall() {
    ballX = 290;
    ballY = 190;
    ballSpeedX = 4;
    ballSpeedY = 4;
}

function removeAnimationClass() {
  h1.classList.remove( 'animate__zoomInDown', 'animate__slow');
}

h1.addEventListener('animationend', removeAnimationClass, { once: true });