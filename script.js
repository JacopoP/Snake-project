const container = document.getElementById('game_container');

let gameOn;

// creating the table
for (let i = 1; i <= 360; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
}

const table = document.getElementsByClassName('square');

// snake info

let direction;

let snake = [];

let head;

// fruit info

let fruit;

// ui info

const start_ui = document.getElementById('start_ui');
const end_ui = document.getElementById('end_ui');
const end_ui_result = document.querySelector('#end_ui h2');
const end_ui_score = document.querySelector('#end_ui p');

// engine

//game strart

let playing = false;

document.addEventListener('click', function () {
    start_ui.classList.add('hide');
    if (!playing) {
        for (let i = 0; i < 360; i++) {
            table[i].classList.remove('snakeBody', 'snakeHead', 'fruit');
        }
        direction = 1;
        snake = [169, 170];
        head = 171;
        fruit = 185;
        snake.forEach(snakeSquare => table[snakeSquare].classList.add('snakeBody'));
        table[head].classList.add('snakeHead');
        table[fruit].classList.add('fruit');
        end_ui.classList.add('hide');

        // clock
        gameOn = setInterval(function () {
            movement();
        }, 300);

        playing = true;
    }
})

// functions
// movement function

let giveInput = true;

function movement() {
    snake.push(head);
    const newHead = head + direction;
    let tail = false;
    if (snake[0] != newHead) tail = true;
    if (
        snake.length == 360 ||
        (snake.includes(newHead) && tail) ||
        newHead < 0 ||
        newHead >= 360 ||
        (head % 24 == 0 && direction == -1) ||
        (head % 24 == 23 && direction == 1)
    ) {
        tail = false;
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
    if (snake.length == 360) {
        end_ui_result.style.color = 'green'
        end_ui_result.innerHTML = 'You win!'
    }
    else {
        end_ui_result.style.color = 'red'
        end_ui_result.innerHTML = 'Game Over';
        end_ui_score.innerHTML = `You made ${snake.length - 3} points`;
    }
    end_ui.classList.remove('hide');
    clearInterval(gameOn);
    playing = false;
}