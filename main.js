/*----- constants -----*/
const PLAYERS = {
    '1': 'Puppy',
    '-1': 'Kitten',
    '0': 'white'
};

const cells = document.getElementsByClassName('cell');

const pickDog = document.getElementById('puppy-intro')

const pickCat = document.getElementById('kitten-intro')

const button = document.getElementById('reset')

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

button.addEventListener('click', reset)

/*----- functions -----*/
init();

function reset() { 
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("kitten", "puppy")
    }
    msgEl.innerHTML = "Play Game!"
    pickDog.addEventListener('click', startGame1)
    pickCat.addEventListener('click', startGame2)

}

// Finds winner


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
    render();
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