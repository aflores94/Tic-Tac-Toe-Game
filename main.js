/*----- constants -----*/
const PLAYERS = {
    '1': 'Puppy',
    '-1': 'Kitten',
    '0': 'white'
};

const cells = document.getElementsByClassName('cell');

const pickDog = document.getElementById('puppy-intro')

const pickCat = document.getElementById('kitten-intro')

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
]

/*----- app's state (variables) -----*/
var board, winner, turn;

/*----- cached element references -----*/
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
for (var i = 0; i < cells.length; i++) {
cells[i].addEventListener('click', handleClick)
}

pickDog.addEventListener('click', startGame1)

pickCat.addEventListener('click', startGame2)


/*----- functions -----*/
init();

/*
// Finds winner
function checkCol(colIdx) {
    let winner = null;
    for (let rowIdx = 0; rowIdx < board[colIdx].length; rowIdx++) {
        winner = checkUp(colIdx, rowIdx) || checkRight(colIdx, rowIdx) || checkDiag(colIdx, rowIdx, 1) || checkDiag(colIdx, rowIdx, -1);
        if (winner) break;
    }
    return winner;
}

function checkUp(colIdx, rowIdx) {
    if (rowIdx > 2) return null;
    const colArr = board[colIdx];
    return (Math.abs(colArr[rowIdx] + colArr[rowIdx + 1] + colArr[rowIdx + 2] + colArr[rowIdx + 3]) === 4) ? colArr[rowIdx] : null;
}

function checkRight(colIdx, rowIdx) {
    if (colIdx > 3) return null;
    return (Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx] + board[colIdx + 2][rowIdx] + board[colIdx + 3][rowIdx]) === 4) ? board[colIdx][rowIdx] : null;
}

function checkDiag(colIdx, rowIdx, vertOffset) {
    if (colIdx > 3 || (vertOffset > 0 && rowIdx > 2) || (vertOffset < 0 && rowIdx < 3)) return null;
    return (Math.abs(board[colIdx][rowIdx] + board[colIdx + 1][rowIdx + vertOffset] + board[colIdx + 2][rowIdx + (vertOffset * 2)] + board[colIdx + 3][rowIdx + (vertOffset * 3)]) === 4) ? board[colIdx][rowIdx] : null;
}
*/

//Controls board click and swtiches turn
function handleClick(evt) {
    if (turn === 1) {
        evt.target.classList.add('puppy')
    } else if (turn === -1) {
        evt.target.classList.add('kitten')
    } else {
        return
    }
    turn *= -1;
    render()
}


//Picks player 
function startGame1() {
    turn = 1
    msgEl.innerHTML = "Puppy's Turn"
    pickDog.removeEventListener('click', startGame1)
    pickCat.removeEventListener('click', startGame2)
}

function startGame2() {
    turn = -1
    msgEl.innerHTML = "Kitten's Turn"
    pickDog.removeEventListener('click', startGame1)
    pickCat.removeEventListener('click', startGame2)
}


//Displays board
function render() {
    board.forEach(function (colArr, colIdx) {
        colArr.forEach(function (cell, rowIdx) {
            const div = document.getElementById(`c${colIdx}r${rowIdx}`)
            div.style.backgroundColor = [cell];
        });

    });

    // Displays messages
if (winner) {
    if (winner === 'T') {
        msgEl.textContent = "It's a Tie!";
    } else {
        msgEl.innerHTML = `<span style="color:${PLAYERS[winner]}">${PLAYERS[winner].toUpperCase()}</span> Wins!`;
    }
} else if (turn === 0) {
    msgEl.innerHTML = "Play Game!";
}
else {
    msgEl.innerHTML = `<span style="color:${PLAYERS[turn]}">${PLAYERS[turn]}</span>'s Turn`;
}
}


//Initializes game board
function init() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    winner = null;
    turn = 0;
    render();
}