// Get the canvas element and context
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Set the size of the canvas cells (in pixels)
const cellSize = 20;

// Set the initial position and velocity of the snake (in cells)
let snakePos = [{x: 9, y: 10}, {x: 8, y: 10}, {x: 7, y: 10}];
let snakeVel = {x: 1, y: 0};

// Set the initial position of the food (in cells)
let foodPos = {x: 15, y: 15};

// Function to draw a cell at a given position
function drawCell(x, y) {
  ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

// Function to draw the snake
function drawSnake() {
  // Set the fill color of the snake cells
  ctx.fillStyle = '#00b33c';

  // Loop through the snake's position and draw each cell
  for (let i = 0; i < snakePos.length; i++) {
    drawCell(snakePos[i].x, snakePos[i].y);
  }
}

// Function to draw the food
function drawFood() {
  // Set the fill color of the food cell
  ctx.fillStyle = '#e60000';

  // Draw the food cell
  drawCell(foodPos.x, foodPos.y);
}

// Function to move the snake by updating its position based on its velocity
function moveSnake() {
  // Get the next position of the snake's head based on its velocity
  const nextPos = {
    x: snakePos[0].x + snakeVel.x,
    y: snakePos[0].y + snakeVel.y
  };

  // Add the new position to the front of the snake's position array
  snakePos.unshift(nextPos);

   // If the snake has collided with the food, generate a new food position
  // and increase the score
  foodPos = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };
} else {
  // If the snake has not collided with the food, remove the last element
  // of the snake's position array to keep its length constant
  snakePos.pop();
}

// Check if the snake has collided with the wall or itself
if (nextPos.x < 0 || nextPos.x > 19 || nextPos.y < 0 || nextPos.y > 19 || snakePos.slice(1).some(cell => cell.x === nextPos.x && cell.y === nextPos.y)) {
  // If the snake has collided, stop the game loop and display a game over message
  clearInterval(gameLoop);
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
}
}

// Function to draw the game state
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake and food
  drawSnake();
  drawFood();
}

// Function to update the game state and draw the game
function update() {
  moveSnake();
  draw();
}

// Set the game update interval (in milliseconds)
const gameSpeed = 100;

// Start the game loop
const gameLoop = setInterval(update, gameSpeed);

// Add event listeners for keyboard arrow keys to control the snake's velocity
document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 37: // left arrow
      snakeVel = {x: -1, y: 0};
      break;
    case 38: // up arrow
      snakeVel = {x: 0, y: -1};
      break;
    case 39: // right arrow
      snakeVel = {x: 1, y: 0};
      break;
    case 40: // down arrow
      snakeVel = {x: 0, y: 1};
      break;
  }
});
