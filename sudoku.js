const sudokuBoard = document.getElementById("sudoku-board");

// Helper function to shuffle numbers
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check if a number can be placed in a given cell
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
}

// Recursively fill the board with numbers
function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (let num of numbers) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (fillBoard(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Remove cells to create the puzzle based on difficulty
function removeCells(board, difficulty) {
    let cellsToRemove = difficulty;
    while (cellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            cellsToRemove--;
        }
    }
}

// Display the puzzle on the page
function displayBoard(board) {
    sudokuBoard.innerHTML = ''; // Clear any existing cells
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";

            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "9";
            if (board[row][col] !== 0) {
                input.value = board[row][col];
                input.disabled = true; // Disable cells with initial numbers
            }
            cell.appendChild(input);
            sudokuBoard.appendChild(cell);
        }
    }
}

// Generate a new puzzle with a given difficulty
function generateNewPuzzle(difficulty = (41)) {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(board);
    removeCells(board, difficulty);
    displayBoard(board);
}

// Generate a puzzle on page load
generateNewPuzzle();

document.getElementById("check-solution").addEventListener("click", function() {
    const inputs = sudokuBoard.getElementsByTagName("input");
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));

    for(let i = 0; i < inputs.length; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        const value = parseInt(inputs[i].value, 10);
        board[row][col] = value || 0;
    }

    // Check each cell to validate the Sudoku solution
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = board[row][col];
            if (num !== 0) {
                // Temporarily remove the number to check if it can be placed
                board[row][col] = 0;
                if (!isValid(board, row, col, num)) {
                    alert("There's an error in your solution...");
                    return false;
                }
                board[row][col] = num; // Restore the number
            } else {
                alert("Incomplete solution!");
                return false;
            }
        }
    }
    alert("Congratulations! You've solved the Sudoku!")
    return true;
});