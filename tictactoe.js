// Get references to HTML elements
const cells = document.querySelectorAll('.cell'); // Get all elements with class 'cell'
const status1 = document.querySelector('.status1'); // Get the element with class 'status'
const resetButton = document.querySelector('.reset-button'); // Get the element with class 'reset-button'

// Initialize game variables
let currentPlayer = 'X'; // Set the initial player to X
let gameActive = true; // Game is active (not over)
let gameState = ['', '', '', '', '', '', '', '', '']; // Initialize the state of each cell

// Define winning combinations
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to handle cell clicks
function handleCellClick(cellIndex) {
    if (!gameActive || gameState[cellIndex] !== '') return; // If game is not active or cell is already filled

    gameState[cellIndex] = currentPlayer; // Update game state
    cells[cellIndex].innerText = currentPlayer; // Display player's symbol in the clicked cell
    cells[cellIndex].classList.add(currentPlayer); // Add player's class to the cell for styling

    if (checkWin()) {
        status1.innerText = `Player ${currentPlayer} wins!`; // Display win message
        gameActive = false; // Game is no longer active
    } else if (checkDraw()) {
        status1.innerText = "It's a draw!"; // Display draw message
        gameActive = false; // Game is no longer active
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
        status1.innerText = `Player ${currentPlayer}'s turn`; // Update status message
    }
}

// Function to check for a win
function checkWin() {
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            cells[a].classList.add('win'); // Add 'win' class for styling
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            return true; // Return true if a winning combination is found
        }
    }
    return false; // Return false if no winning combination is found
}

// Function to check for a draw
function checkDraw() {
    return gameState.every(cell => cell !== ''); // Return true if all cells are filled
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X'; // Reset player to X
    gameActive = true; // Reactivate the game
    gameState = ['', '', '', '', '', '', '', '', '']; // Clear cell states
    cells.forEach(cell => {
        cell.innerText = ''; // Clear cell contents
        cell.classList.remove('X', 'O', 'win'); // Remove player and win classes
    });
    status1.innerText = `Player ${currentPlayer}'s turn`; // Reset status message
}

// Attach click event listener to reset button
resetButton.addEventListener('click', resetGame);
