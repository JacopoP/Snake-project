const container = document.getElementById('game_container');

// creating the table
for (let i = 1; i <= 360; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
}

const table = document.getElementsByClassName('square');

// snake info

let direction = 1;

let snake = [169, 170];

let head = 171;

snake.forEach(snakeSquare => table[snakeSquare].classList.add('snakeBody'));

table[head].classList.add('snakeHead');

// clock

const gameOn = setInterval(function () {
    movement();
}, 500);

// fruit info

let fruit = 185;

table[fruit].classList.add('fruit');

// functions
// movement function

let giveInput = true;

function movement() {
    snake.push(head);
    const newHead = head + direction;
    if (
        snake.length == 360 ||
        snake.includes(newHead) ||
        newHead < 0 ||
        newHead >= 360 ||
        (head % 24 == 0 && direction == -1) ||
        (head % 24 == 23 && direction == 1)
    ) {
        gameOver()
    }
    else {
        if (newHead == fruit) {
            table[fruit].classList.remove('fruit');
            do {
                fruit = Math.floor(Math.random() * 359);
            } while (snake.includes(fruit));
            table[fruit].classList.add('fruit');
        }
        else {
            table[snake[0]].classList.remove('snakeBody');
            snake.shift();
        }
        table[head].classList.remove('snakeHead');
        head += direction;

        snake.forEach(snakeSquare => table[snakeSquare].classList.add('snakeBody'));

        table[head].classList.add('snakeHead');
        giveInput = true;
    }
}

// change direction

document.addEventListener('keydown', function (event) {
    if (giveInput) {
        if (direction != -24 && direction != 24) {
            if (event.key == 'ArrowDown' || event.key == 's') {
                direction = 24;
                giveInput = false;
            }
            else if (event.key == 'ArrowUp' || event.key == 'w') {
                direction = -24;
                giveInput = false;
            }
        }
        if (direction != -1 && direction != 1) {
            if (event.key == 'ArrowRight' || event.key == 'd') {
                direction = 1;
                giveInput = false;
            }
            else if (event.key == 'ArrowLeft' || event.key == 'a') {
                direction = -1;
                giveInput = false;
            }
        }
    }
})

// game over

function gameOver() {
    clearInterval(gameOn);
}