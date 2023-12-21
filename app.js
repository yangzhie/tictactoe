//== game state (globals)

let currentPlayer = 1;
let p1Wins = 0;
let p2Wins = 0;
let draws = 0;
let isGameActive = true;
const board = ["", "", "", "", "", "", "", "", ""];
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


//== caching DOM element references

const boxes = document.querySelectorAll(".box");
const turnStatus = document.querySelector(".turn-status");
const p1WinsDisplay = document.querySelector(".p1-wins");
const p2WinsDisplay = document.querySelector(".p2-wins");
const drawsDisplay = document.querySelector(".draws");
const restartBtn = document.querySelector(".restart-button");

//== set up event listeners

function handleBoxClickEvent(box) {
    box.addEventListener('click', handleBoxClick);
}

for (let i = 0; i < boxes.length; i++) {
    handleBoxClickEvent(boxes[i]);
}

restartBtn.addEventListener("click", resetGame);

//== event handlers

// checkWin function to determine with every press of a square if
// game ends on a draw, win or keeps going
function checkWin() {
    for (let i = 0; i < winCombos.length; i++) {
        const [x, y, z] = winCombos[i];
        if (board[x] !== "" && board[x] === board[y] && board[x] === board[z]) {
            isGameActive = false;
            return board[x];
        }
    }

    // game keeps going if any one of the squares on the board
    // is empty. i.e square has not yet been clicked by player
    let isADraw = true;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            isADraw = false;
            break;
        }
    }

    // else game ends in a draw
    if (isADraw) {
        isGameActive = false;
        return "draw";
    }

    return null;
}

function handleBoxClick(event) {
    const selectedBox = event.target;
    const boxIndex = Number(selectedBox.dataset.box) - 1;

    if (board[boxIndex] === "" && isGameActive) {
        selectedBox.textContent = currentPlayer === 1 ? "X" : "O"; // condensed if... else statement
        board[boxIndex] = currentPlayer === 1 ? "X" : "O"; // condensed if... else statement

        const result = checkWin();
        // player 1 wins
        if (result === "X") {
            p1Wins++;
            p1WinsDisplay.textContent = p1Wins;
            turnStatus.textContent = "Player 1 wins!";

            // player 2 wins
        } else if (result === "O") {
            p2Wins++;
            p2WinsDisplay.textContent = p2Wins;
            turnStatus.textContent = "Player 2 wins!";

            // draw
        } else if (result === "draw") {
            draws++;
            drawsDisplay.textContent = draws;
            turnStatus.textContent = "The game has ended in a draw!";

            // game keeps going
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            turnStatus.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// reset game function to original state
// does not modify pre-existing wins and draws
function resetGame() {
    for (let i = 0; i < board.length; i++) {
        board[i] = "";
        boxes[i].textContent = "";
    }

    currentPlayer = 1;
    isGameActive = true;
    turnStatus.textContent = "Player 1's Turn";
}



















