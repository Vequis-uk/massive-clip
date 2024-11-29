    /* Get the game canvas */
    const canvas = document.getElementById('gameCanvas');
    /* Set the area to 2D */
    const ctx = canvas.getContext('2d');
    /* Size of each square in the grid */
    const box = 20;
    /* Initial position and direction of the snake */
    let snake = [{ x: 9 * box, y: 10 * box }];
    let direction = 'right';
    /* Initial position of the food */
    let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    /* Declare game variable globally to handle the game loop */
    let game;

    /* Draw the snake on the canvas */
    function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
    /* Head is green, body is light green */
    ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
}
}

    /* Draw the food on the canvas */
    function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
}

    /* Update the snake's position based on the current direction */
    function moveSnake() {
    let head = { ...snake[0] };

    if (direction === 'up') head.y -= box;
    if (direction === 'down') head.y += box;
    if (direction === 'left') head.x -= box;
    if (direction === 'right') head.x += box;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
} else {
    snake.pop();
}
}

    /* Handle keyboard input for snake movement */
    document.addEventListener('keydown', (e) => {
    /* Prevent the snake from reversing direction */
    if ((e.key === 'w' || e.key === 'ArrowUp') && direction !== 'down') direction = 'up';
    if ((e.key === 's' || e.key === 'ArrowDown') && direction !== 'up') direction = 'down';
    if ((e.key === 'a' || e.key === 'ArrowLeft') && direction !== 'right') direction = 'left';
    if ((e.key === 'd' || e.key === 'ArrowRight') && direction !== 'left') direction = 'right';
});

    /* Reset the game state to start over */
    function resetGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = 'right';
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
}

    /* End the game and reset */
    function gameOver() {
    clearInterval(game); // Stop the game loop
    alert('Game Over!'); // Display game over message
    resetGame(); // Reset game state
}

    /* Main game loop: update and render the game */
    function gameLoop() {
    /* Clear the canvas */
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the snake and the food */
    drawSnake();
    drawFood();

    /* Update the snake's position */
    moveSnake();

    /* Check for collisions with the walls or itself */
    let head = snake[0];
    if (
    head.x < 0 || head.x >= canvas.width || // Left and right walls
    head.y < 0 || head.y >= canvas.height || // Top and bottom walls
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y) // Self-collision
    ) {
    gameOver(); // End the game if a collision occurs
}
}

    /* Start the game when the button is clicked */
    document.getElementById('startButton').addEventListener('click', () => {
    if (game) clearInterval(game); // Clear any existing game loop
    game = setInterval(gameLoop, 500); // Start a new game loop
});
