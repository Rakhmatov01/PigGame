"use strict";
// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".new");
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
let current0El = document.querySelector("#current--0");
let current1El = document.querySelector("#current--1");

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
let currentScore = 0;
let activePlayer = 0;
let scoresarr = [0, 0];
function changePlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
}

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  let dice = Math.ceil(Math.random() * 6);
  diceEl.classList.remove("hidden");
  diceEl.classList.remove("rotanimation");
  void diceEl.offsetWidth;

  // Show this number as dice
  diceEl.classList.add("rotanimation");
  // Wait for the animation to finish before changing the image
  setTimeout(() => {
    diceEl.src = `images.img/dice-${dice}.png`;

    // Check rolled number : if 1 -> change player ,  else add score
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Change the player
      changePlayer();
    }
  }, 500);
});

// Holding score functionality
btnHold.addEventListener("click", function () {
  // hold current score
  scoresarr[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scoresarr[activePlayer];
  // If score >= 100 player wins
  if (scoresarr[activePlayer] >= 100) {
    document.querySelector(".winner").textContent = `PLAYER ${
      activePlayer + 1
    } WON !🎉`;
    document.querySelector(".winner").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
    document.querySelector(".btn2").classList.remove("hidden");
  }
  // Else change the player
  else {
    changePlayer();
  }
});

document.querySelector(".btn2").addEventListener("click", resetGame2);
// New game functionality
function resetGame() {
  document.querySelectorAll(".score").forEach((el) => (el.textContent = 0));
  document
    .querySelectorAll(".current-score")
    .forEach((el) => (el.textContent = 0));
  if (activePlayer === 1) {
    document.querySelector(`.player--0`).classList.add("player--active");
    document.querySelector(`.player--1`).classList.remove("player--active");
  }
  diceEl.classList.add("hidden");
  currentScore = 0;
  activePlayer = 0;
  scoresarr = [0, 0];
}
function resetGame2() {
  document.querySelector(".winner").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
  document.querySelector(".btn2").classList.add("hidden");
  resetGame();
}
btnNew.addEventListener("click", resetGame);

