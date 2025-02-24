"use strict";
let currentPlayer = "X";
let gameActive = true;
let board = [
    "", "", "",
    "", "", "",
    "", "", ""
]
let resetboard = () => {
    currentPlayer = "X";
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    gameActive = true;
    cells.forEach(cell => (cell.textContent = ""));
}
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Center column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return pattern; // return the winning pattern
        }
    }

    return null; // No winner
};
const cells = document.querySelectorAll(".row");
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            const winnerPattern = checkWinner(); 
            if (winnerPattern) {
                document.querySelector(".win").innerHTML = `<h1 class="slightmargin">${currentPlayer} wins!</h1>`;
                gameActive = false;

                setTimeout(() => {
                    resetboard(); // reset the board after 3 seconds
                    document.querySelector(".win").innerHTML = ``;
                }, 3000);
            } else if (!board.includes("")) {
                // draw support
                document.querySelector(".win").innerHTML = "<h1>It's a draw!</h1>";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X"; // switch player after one guy plays lol
            }
        }
    });
});
document.getElementById('resetbutton').addEventListener("click", resetboard); // Reset button