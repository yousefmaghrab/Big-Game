"use strict";
// selcting elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const diceEL = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score, currentScore, activeplayer, playing;
// call function to start the Game
init();

// Function Declaration
function init() {
  score = [0, 0];
  playing = true;
  currentScore = 0;
  activeplayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEL.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
}

const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Rolling Game

btnRoll.addEventListener("click", function () {
  if (playing) {
    // generating the rolling
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display the result of rolling
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // check the Number of Rolling
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      // switch to next Player
      switchPlayer();
    }
  }
});

// Hollding Game
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add score
    score[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];

    // check score is >= 100
    if (score[activeplayer] >= 100) {
      // Finish the Game
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    }
    // switch the next player
    else {
      switchPlayer();
    }
  }
});
// new Game the Rolling
btnNew.addEventListener("click", init);
