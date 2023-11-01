// Get references to HTML elements
const cells: HTMLDivElement[] = Array.from(document.querySelectorAll('.cell')) as HTMLDivElement[];
const status1: HTMLDivElement = document.querySelector('.status') as HTMLDivElement;
const resetButton: HTMLButtonElement = document.querySelector('.reset-button') as HTMLButtonElement;

// Initialize game variables
let currentPlayer: 'X' | 'O' = 'X';
let gameActive: boolean = true;
let gameState: Array<'X' | 'O' | ''> = ['', '', '', '', '', '', '', '', ''];

// Define winning combinations
const winCombinations: Array<number[]> = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Function to handle cell clicks
function handleCellClick(cellIndex: number): void {
    if (!gameActive || gameState[cellIndex] !== '') return;

    gameState[cellIndex] = currentPlayer;
    const marker = document.createElement('div'); // Create a child element
    marker.classList.add('marker', currentPlayer); // Apply the marker class
    cells[cellIndex].appendChild(marker); // Append the marker to the cell

    if (checkWin()) {
        status1.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (checkDraw()) {
        status1.innerText = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status1.innerText = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check for a win
function checkWin(): boolean {
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            return true;
        }
    }
    return false;
}

// Function to check for a draw
function checkDraw(): boolean {
    return gameState.every(cell => cell !== '');
}

// Function to reset the game
function resetGame(): void {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear cell contents
        cell.classList.remove('X', 'O', 'win');
    });
    status1.innerText = `Player ${currentPlayer}'s turn`;
}

// Attach click event listener to reset button
resetButton.addEventListener('click', resetGame);
