
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

document.addEventListener("mousemove", movePlayerPaddle);
// Start the game
playButton.addEventListener("click", startGame);


function startGame() {
    clearInterval(gameInterval);
    playButton.style.display = "none";
    gameInterval = setInterval(updateGameArea, 20);
    resetBall();
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
        computerScore += 15;
        resetBall();
    }

    if (ballX >= 580) {
        playerScore += 15;
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
    if (playerScore >= 45 || computerScore >= 45) {
        stopGame();
        clearInterval(gameInterval);
        playAgainButton.addEventListener("click", () => {
            resetScore();
            resetBall();
            restartGame();
        });
    }
}

function restartGame() {
    clearInterval(gameInterval);
    playButton.style.display = "none";
    gameInterval = setInterval(reupdateGameArea, 20);
    resetBall();
}

// Update the game area
function reupdateGameArea() {

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
        computerScore += 15;
        resetBall();
    }

    if (ballX >= 580) {
        playerScore += 15;
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
    if (playerScore >= 45 || computerScore >= 45) {
        stopGame();
        clearInterval(gameInterval);
        playAgainButton.addEventListener("click", () => {
            resetScore();
            resetBall();
            startGame();
        });
    }
}

function stopGame() {
    clearInterval(gameInterval);
    document.removeEventListener("mousemove", movePlayerPaddle);
}

//Reset score
function resetScore() {
    playerScore = 0;
    computerScore = 0;   
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
        computerY += 4.5;
    } else if (computerCenter > ballY + 20) {
        computerY -= 4.5;
    }
}

// Reset the ball
function resetBall() {
    ballX = 290;
    ballY = 190;
    // Randomly set ballSpeedX and ballSpeedY to positive or negative values
    ballSpeedX = Math.random() > 0.5 ? 5 : -5;
    ballSpeedY = Math.random() > 0.5 ? 5 : -5;
}

function removeAnimationClass() {
  h1.classList.remove( 'animate__zoomInDown', 'animate__slow');
}

h1.addEventListener('animationend', removeAnimationClass, { once: true });









//Countdown Timer


// Function to update the countdown timer
function updateCountdown() {
    // Set the date of your friend's birthday (Month is 0-based, so October is 9)
    const birthday = new Date(new Date().getFullYear(), 9, 5); // Change the date and month

    // Get the current date and time
    const now = new Date();

    // Check if today is your friend's birthday
    if (now.getDate() === birthday.getDate() && now.getMonth() === birthday.getMonth()) {
        // Today is the birthday, display "Happy Birthday"
        document.getElementById("demo").innerHTML = "Happy Birthday!";
    } else {
        // Calculate the time remaining until the birthday
        let timeUntilBirthday = birthday - now;

        // Check if the birthday has passed for this year
        if (timeUntilBirthday < 0) {
            // Calculate the time remaining until the next year's birthday
            birthday.setFullYear(birthday.getFullYear() + 1);
            timeUntilBirthday = birthday - now;
        }

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeUntilBirthday / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeUntilBirthday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilBirthday % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeUntilBirthday % (1000 * 60)) / 1000);

        // Display the countdown
        const countdownElement = document.getElementById("demo");
        const countdownString = `${days} days ${hours} hr ${minutes} min ${seconds} sec until Birthday`;
        countdownElement.innerHTML = countdownString;
    }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial call to set up the countdown
updateCountdown();









