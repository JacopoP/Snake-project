const container = document.getElementById('game_container');

for (let i = 1; i <= 360; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
    console.log('ciao');
}

let snake = [169, 170];

let head = 171;

const table = document.getElementsByClassName('square');

snake.forEach(snakeSquare => table[snakeSquare].classList.add('snakeCase'));

table[head].classList.add('snakeHead');

// setInterval(movement)