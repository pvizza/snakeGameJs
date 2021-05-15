let papel = document.querySelector('canvas');
let context = papel.getContext('2d');

//directions snake
const Direction = {
  s: [0, 1],
  w: [0, -1],
  d: [1, 0],
  a: [-1, 0],
  goDown: [0, 1],
  goUp: [0, -1],
  goRight: [1, 0],
  goLeft: [-1, 0],
};
let controls = {
  directions: { x: 1, y: 0 },
  snake: [{ x: 0, y: 50 }],
  point: { x: 0, y: 250 },
  growth: 0,
  play: false,
};

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
    controls.growth += 10;
    eating();
  }

  if (controls.growth > 0) {
    controls.snake.push(bodySnake);
    controls.growth -= 1;
  }

  requestAnimationFrame(snakeColor);

  setTimeout(move, 80);
};

// compare whether the shock of the wall of the snake or against itself
const lostGame = function () {
  const init = controls.snake[0];
  if (init.x < 0 || init.x >= 500 / 5 || init.y < 0 || init.y >= 500 / 5) {
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
  context.clearRect(0, 0, 500, 500);
  for (let idx = 0; idx < controls.snake.length; idx++) {
    const { x, y } = controls.snake[idx];
    players('green', x, y);
  }

  const point = controls.point;

  players('white', point.x, point.y);
};

const players = function (color, x, y) {
  context.fillStyle = color; //color snake
  context.fillRect(x * 8, y * 8, 5, 5); // position x, y and width, heigth
};

const eating = function () {
  const dam = newPoint();
  const food = controls.point;
  food.x = dam.x;
  food.y = dam.y;
};

// this sum one px in bodySnake
const newPoint = function () {
  const directionSnake = Object.values(Direction);
  return {
    x: parseInt((Math.random() * 500) / 8),
    y: parseInt((Math.random() * 500) / 8),
    j: directionSnake[parseInt(Math.random() * 7)],
  };
};

const newGame = function () {
  controls = {
    directions: { x: 1, y: 0 },
    snake: [{ x: 0, y: 50 }],
    point: { x: 0, y: 250 },
    growth: 0,
    play: false,
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
};

window.onload = function () {
  newGame();
  move();
};
