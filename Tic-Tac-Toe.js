let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Load sound effects
const clickSound = new Audio('sound/click.mp3');
const winSound = new Audio('sound/win.mp3');
const drawSound = new Audio('sound/draw.mp3');
const restartSound = new Audio('sound/restart.mp3');

// Background music
const backgroundMusic = document.getElementById('background-music');
let musicPlaying = false;

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerText = cell;
        cellElement.addEventListener('click', () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        clickSound.play(); // Play click sound
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        renderBoard();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById('winner').innerText = `Player ${board[a]} Wins!`;

            // Apply highlight to winning cells
            const cells = document.querySelectorAll('.cell');
            pattern.forEach(index => cells[index].classList.add('winning-cell'));

            // Lighten all other cells
            cells.forEach((cell, index) => {
                if (!pattern.includes(index)) {
                    cell.classList.add('lighten-cell');
                }
            });

            winSound.play(); // Play winning sound
            return;
        }
    }

    if (!board.includes('')) {
        document.getElementById('winner').innerText = "It's a draw!";
        drawSound.play(); // Play draw sound
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('winner').innerText = '';

    renderBoard();

    // Remove winning and lighten styles
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('winning-cell', 'lighten-cell');
    });

    restartSound.play(); // Play restart sound
}

// Toggle background music
function toggleMusic() {
    if (musicPlaying) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
    musicPlaying = !musicPlaying;
}

renderBoard();
