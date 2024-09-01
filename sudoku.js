document.addEventListener("DOMContentLoaded", function() {
    const sudokuBoard = document.getElementById("sudoku-board");

    const puzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    const solved = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    // Grid
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "9";

            if(puzzle[row][col] !== 0) {
                input.value = puzzle[row][col];
                input.disabled = true;
            }

            cell.appendChild(input);
            sudokuBoard.appendChild(cell);

            // Borders for 3x3 subgrids
            if(col % 3 == 0) { cell.style.borderLeft = "2px solid black"; }
            if(row % 3 == 0) { cell.style.borderTop = "2px solid black"; }
        }
    }

    // Logic to Check the Solution
    document.getElementById("check-solution").addEventListener("click", function() {
        let currentSolution = [];
        let isCorrect = false;
    

        // Collect Values from the board
        sudokuBoard.childNodes.forEach((cell) => {
            if(cell.nodeType === Node.ELEMENT_NODE) {
                const input = cell.querySelector("input");
                const value = input.value ? parseInt(input.value) : 0;
                currentSolution.push(value);
            }
        });
        const solved1D = solved.flat();
        console.log("Current Solution: ", currentSolution);
        console.log("Solved: ", solved1D);
        console.log(currentSolution.every((value, index) => value === solved1D[index]));

        if(currentSolution.every((value, index) => value === solved1D[index])) { isCorrect = true; };

        if(isCorrect) {
            alert("Congratulations! You've solved the Sudoku!")
        }else{
            alert("There's an error in your solution...");
        }
    });

});

// Function to check if the solution is valid
function isValidSolution(solution) {
    // Check rows and columns
    for(let i = 0; i < 9; i++) {
        let rowSet = new Set();
        let colSet = new Set();

        for(let j = 0; j < 9; j++) {
            let rowVal = solution[i * 9 + j];
            let colVal = solution[j * 9 * i];

            if(rowVal !== 0 && rowSet.has(rowVal)) { return false; }
            if(colVal !== 0 && colSet.has(colVal)) { return false; }

            rowSet.add(rowVal);
            colSet.add(colVal);
        }
    }

    // Check 3x3 subgrids

    return true;
}