let papel = document.querySelector('canvas');
let context = papel.getContext('2d');

//directions snake
let Direction = {
  s: [0, 1],
  w: [0, -1],
  d: [1, 0],
  a: [-1, 0],
  ArrowDown: [0, 1],
  ArrowUp: [0, -1],
  ArrowRight: [1, 0],
  ArrowLeft: [-1, 0],
  8: [0, 1],
  2: [0, -1],
  6: [1, 0],
  4: [-1, 0],
};
let controls = {
  directions: { x: 1, y: 0 },
  snake: [{ x: 0, y: 0 }],
  point: { x: 0, y: 0 },
  growth: 0,
  play: false,
  score: 0,
};

const open = document.getElementById('modalLogin');
const close = document.getElementById('modalOver');

function openModal() {
  open.classList.add('desactive');
  close.classList.remove('modalOver');
}

function limit(input) {
  if (input.value < 0) {
    console.log(1);
  }
}
// const limitInput = document.querySelectorAll('player');

let speed = 8;
let space = 500;
let run = 80;

function clickUp() {
  let moves = Direction.ArrowUp;
  const x = moves[0];
  const y = moves[1];
  if (-x !== controls.directions.x && -y !== controls.directions.y) {
    controls.directions.x = x;
    controls.directions.y = y;
  }
}
function clickRight() {
  let moves = Direction.ArrowRight;
  const x = moves[0];
  const y = moves[1];
  if (-x !== controls.directions.x && -y !== controls.directions.y) {
    controls.directions.x = x;
    controls.directions.y = y;
  }
}
function clickLeft() {
  let moves = Direction.ArrowLeft;
  const x = moves[0];
  const y = moves[1];
  if (-x !== controls.directions.x && -y !== controls.directions.y) {
    controls.directions.x = x;
    controls.directions.y = y;
  }
}
function clickDown() {
  let moves = Direction.ArrowDown;
  const x = moves[0];
  const y = moves[1];
  if (-x !== controls.directions.x && -y !== controls.directions.y) {
    controls.directions.x = x;
    controls.directions.y = y;
  }
}

const move = function () {
  const bodySnake = {};
  const init = controls.snake[0];

  // copy last elemnt in init snake

  Object.assign(bodySnake, controls.snake[controls.snake.length - 1]);

  // agree skake point
  const food = init.x === controls.point.x && init.y === controls.point.y;

  // init new game
  if (lostGame()) {
    controls.play = true;
    newGame();
  }

  // body snake
  const controlX = controls.directions.x;
  const controlY = controls.directions.y;

  const size = controls.snake.length - 1;
  if (controls.play) {
    for (let idx = size; idx > -1; idx--) {
      const init = controls.snake[idx];
      if (idx === 0) {
        init.x += controlX;
        init.y += controlY;
      } else {
        init.x = controls.snake[idx - 1].x;
        init.y = controls.snake[idx - 1].y;
      }
    }
  }

  if (food) {
    controls.growth += 1;
    controls.score += 50;
    if (controls.score >= 100) {
      controls.growth += 5;
    }
    if (controls.score >= 300) {
      controls.growth += 10;
    }
    if (controls.score >= 500) {
      controls.growth += 30;
    }
    eating();
  }

  if (controls.growth > 0) {
    controls.snake.push(bodySnake);
    controls.growth -= 1;
  }

  let set = setTimeout(move, run);

  if (controls.pause) {
    clearTimeout(set);
  }

  requestAnimationFrame(snakeColor);

  document.getElementById('score').innerHTML = 'Puntuacion: ' + controls.score;
};

function pause() {
  controls.pause = true;
}

function plays() {
  controls.ploy = true;
}

// compare whether the shock of the wall of the snake or against itself
const lostGame = function () {
  const init = controls.snake[0];
  if (
    init.x < 0 ||
    init.x >= space / speed ||
    init.y < 0 ||
    init.y >= space / speed
  ) {
    return true;
  }
  for (let idx = 1; idx < controls.snake.length; idx++) {
    const bodySnake = controls.snake[idx];
    if (bodySnake.x === init.x && bodySnake.y === init.y) {
      return true;
    }
  }
};

document.onkeydown = (e) => {
  let moves = Direction[e.key];
  const x = moves[0];
  const y = moves[1];

  if (-x !== controls.directions.x && -y !== controls.directions.y) {
    controls.directions.x = x;
    controls.directions.y = y;
  }
};

const snakeColor = function () {
  context.clearRect(0, 0, space, space);
  for (let idx = 0; idx < controls.snake.length; idx++) {
    const { x, y } = controls.snake[idx];
    players('black', x, y);
  }

  const point = controls.point;

  players('black', point.x, point.y);
};

let wh = 5;

const players = function (color, x, y) {
  context.fillStyle = color; //color snake
  context.fillRect(x * speed, y * speed, wh, wh); // position x, y and width, heigth
};

const eating = function () {
  const dam = newPoint();
  const food = controls.point;
  food.x = dam.x;
  food.y = dam.y;
  run -= 3;
};

// this sum one px in bodySnake
const newPoint = function () {
  const directionSnake = Object.values(Direction);
  return {
    x: parseInt((Math.random() * space) / speed),
    y: parseInt((Math.random() * space) / speed),
    j: directionSnake[parseInt(Math.random() * 7)],
  };
};

const newGame = function () {
  controls = {
    directions: { x: 1, y: 0 },
    snake: [{ x: 0, y: 0 }],
    point: { x: 0, y: 250 },
    growth: 0,
    play: false,
    score: 0,
  };
  const position = newPoint();
  const snake = controls.snake[0];
  snake.x = position.x;
  snake.y = position.y;
  controls.directions.x = position.j[0];
  controls.directions.y = position.j[1];
  const dam = newPoint();
  const food = controls.point;
  food.x = dam.x;
  food.y = dam.y;
  controls.play = true;
  run = 80;
};

window.onload = function () {
  newGame();
  move();
};
