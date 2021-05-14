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
  snake: [{ x: 50, y: 50 }],
  point: { x: 20, y: 50 },
  growth: 0,
  play: false,
};

const move = function () {
  const init = controls.snake[0];
  const food = init.x === controls.point.x && init.y === controls.point.y;
  const controlX = controls.directions.x;
  const controlY = controls.directions.y;
  init.x += controlX;
  init.y += controlY;

  const size = controls.snake.length - 1;

  for (let i = size; size < size - 1; size--)
    if (food) {
      eating();
    }

  requestAnimationFrame(snakeColor);

  setTimeout(move, 80);
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
  const init = controls.snake[0];
  const point = controls.point;
  players('green', init.x, init.y);
  players('white', point.x, point.y);
};

const players = function (color, x, y) {
  context.fillStyle = color; //color snake
  context.fillRect(x * 5, y * 5, 10, 10); // position x, y and width, heigth
};

const eating = function () {
  const dam = newPoint();
  const food = controls.point;
  food.x = dam.x;
  food.y = dam.y;
};

const newPoint = function () {
  const directionSnake = Object.values(Direction);
  return {
    x: parseInt((Math.random() * 500) / 5),
    y: parseInt((Math.random() * 500) / 5),
    j: directionSnake[parseInt(Math.random() * 3)],
  };
};

window.onload = function () {
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

  move();
};
