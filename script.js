const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let cells = [];

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  cell.style.color = currentPlayer === "X" ? "#0072ff" : "#ff4081";

  if (checkWinner()) {
    status.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (isDraw()) {
    status.textContent = "😐 It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    );
  });
}

function isDraw() {
  return cells.every(cell => cell.textContent !== "");
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Player X's turn";
  createBoard();
}

createBoard(); // Initialize on load
