`use strict;`;

const player1Score = document.querySelector(`#player1Score`);
const player2Score = document.querySelector(`#player2Score`);
const player1CurrentScore = document.querySelector(`#player1CurrentScore`);
const player2CurrentScore = document.querySelector(`#player2CurrentScore`);
const restartGame = document.querySelector(`#restartGame`);
const rollDice = document.querySelector(`#rollDice`);
const hold = document.querySelector(`#hold`);
const dice = document.querySelector(`#dice`);
const winplayer = document.querySelector(`#winplayer`);
const win = document.querySelector(`#win`);
const infoButton = document.querySelector(`#infoButton`);
const player1SetName = document.querySelector(`#player1SetName`);
const player2SetName = document.querySelector(`#player2SetName`);
const player1Name = document.querySelector(`#player1Name`);
const player2Name = document.querySelector(`#player2Name`);
const info = document.querySelector(`#info`);
const rollSong = document.querySelector(`#roll`);
const holdSong = document.querySelector(`#holdSong`);
const failSong = document.querySelector(`#failSong`);
const restartSong = document.querySelector(`#restartSong`);
const winSong = document.querySelector(`#winSong`);
const setWinScore = document.querySelector(`#setWinScore`);
let randomRoll;
let score1 = 0;
let score2 = 0;
let score = 0;
let currentPlayer = true;
let infoPressed = true;
let winscore = 100;

// code below will respond to dice roll. At first it will generate random number between 1 and 6. Than checks which one is current player and display corresponding dice image. Finally it will display score to scorediv;

info.addEventListener(`click`, function () {
  if (infoPressed) {
    gameInfo.style.display = `none`;
    infoPressed = !infoPressed;
    document.querySelectorAll(".blurr").forEach(function (x) {
      x.style.filter = "blur(0px)";
    });
  } else {
    gameInfo.style.display = `flex`;
    infoPressed = !infoPressed;
    document.querySelectorAll(".blurr").forEach(function (x) {
      x.style.filter = "blur(5px)";
    });
  }
});

infoButton.addEventListener(`click`, function () {
  if (player1SetName.value !== "" && player2SetName.value !== "") {
    player1Name.textContent = player1SetName.value;
    player2Name.textContent = player2SetName.value;
  }
  gameInfo.style.display = `none`;
  infoPressed = !infoPressed;
  document.querySelectorAll(".blurr").forEach(function (x) {
    x.style.filter = "blur(0px)";
  });
  winscore = setWinScore.value;
  console.log(setWinScore.value);
});

rollDice.addEventListener(`click`, function () {
  randomRoll = Math.trunc(Math.random() * 6) + 1;
  if (currentPlayer) {
    dice.style.backgroundImage = `url(/images/dice${randomRoll}.jpg)`;
    roll1();
    player1CurrentScore.textContent = score;
  } else {
    dice.style.backgroundImage = `url(/images/dice${randomRoll}b.jpg)`;
    roll1();
    player2CurrentScore.textContent = score;
  }
  //rollSong.pause();
  rollSong.currentTime = 0;
  rollSong.play();
});
// this function will respond to dice rolls and assign it's value to score. It will also respond to dice roll 1;
const roll1 = () => {
  if (randomRoll === 1) {
    score = 0;
    currentPlayer = !currentPlayer;
    changeBackground(currentPlayer);
    failSong.play();
  } else {
    score += randomRoll;
  }
};

// this code will respond to hold button click. It wll add current score of player to main score. It also change the current player;
hold.addEventListener(`click`, function () {
  if (currentPlayer) {
    score1 += score;
    player1Score.textContent = score1;
    score = 0;
    player1CurrentScore.textContent = 0;
    currentPlayer = false;
  } else {
    score2 += score;
    player2Score.textContent = score2;
    score = 0;
    player2CurrentScore.textContent = 0;
    currentPlayer = true;
  }
  changeBackground(currentPlayer);
  if (score1 >= winscore) {
    wingame(`${document.querySelector(`#player1Name`).textContent}`);
  } else if (score2 >= winscore) {
    wingame(`${document.querySelector(`#player2Name`).textContent}`);
  }
  dice.style.backgroundImage = `url(/images/question-mark-dice.jpg)`;
  holdSong.play();
});

const wingame = (x) => {
  win.style.display = `flex`;
  winplayer.textContent = `${x} WIN GAME!`;
  document.querySelectorAll(".blurr").forEach(function (x) {
    x.style.filter = "blur(5px)";
  });
  document.querySelector("#info").style.filter = "blur(5px)";
  winSong.play();
};

document.querySelector(`#winRestart`).addEventListener(`click`, function () {
  restartGame.click();
});

restartGame.addEventListener(`click`, function () {
  score1 = 0;
  score2 = 0;
  score = 0;
  currentPlayer = true;
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  changeBackground(currentPlayer);
  dice.style.backgroundImage = `url(/images/question-mark-dice.jpg)`;
  win.style.display = `none`;
  document.querySelectorAll("*").forEach(function (x) {
    x.style.filter = "blur(0px)";
  });
  restartSong.play();
});

// this code below is responsible for background color change in response to player turn:
const changeBackground = (x) => {
  if (x) {
    document.querySelector(
      `#player1div`
    ).style.backgroundColor = `antiquewhite`;
    document.querySelector(
      `#player2div`
    ).style.backgroundColor = `rgb(252, 213, 162)`;
  } else {
    document.querySelector(
      `#player1div`
    ).style.backgroundColor = `rgb(252, 213, 162)`;
    document.querySelector(
      `#player2div`
    ).style.backgroundColor = `antiquewhite`;
  }
};
