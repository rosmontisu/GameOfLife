const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 10;
const numRows = Math.floor(canvas.height / cellSize);
const numCols = Math.floor(canvas.width / cellSize);
let board = createEmptyBoard();

function createEmptyBoard() {
    let newBoard = [];
    for (let i = 0; i < numRows; i++) {
        newBoard.push(Array.from({ length: numCols }, () => 0));
    }
    return newBoard;
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (board[i][j] === 1) {
                ctx.fillStyle = "black";
            } else {
                ctx.fillStyle = "white";
            }
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

function updateBoard() {
    let newBoard = createEmptyBoard();
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const neighbors = countNeighbors(i, j);
            if (board[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                newBoard[i][j] = 0;
            } else if (board[i][j] === 0 && neighbors === 3) {
                newBoard[i][j] = 1;
            } else {
                newBoard[i][j] = board[i][j];
            }
        }
    }
    board = newBoard;
}

function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                count += board[newRow][newCol];
            }
        }
    }
    count -= board[row][col];
    return count;
}

function simulateGame() {
    drawBoard();
    updateBoard();
}

// 초기 상태 설정
function setInitialState() {
    board = createEmptyBoard();
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            board[i][j] = Math.random() > 0.5 ? 1 : 0;
        }
    }
    drawBoard();
}

// 게임 시작
setInitialState();
setInterval(simulateGame, 100); // 매 100ms 마다 게임 업데이트
