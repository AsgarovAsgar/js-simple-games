'use strict';

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const scorePlayer0 = document.getElementById("score--0")
const scorePlayer1 = document.getElementById("score--1")
const currentScorePlayer0 = document.getElementById("current--0");
const currentScorePlayer1 = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

// starting condition
scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
currentScorePlayer0.textContent = 0;
currentScorePlayer1.textContent = 0;
diceEl.classList.add('hidden')

const totalScores = [0, 0]
let currentScore = 0;
let activePlayer = 0



btnRoll.addEventListener('click', function() {
  const dice = Math.trunc(Math.random() * 6) + 1

  // console.log(dice);
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  if(dice !== 1) {
    // add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
  } else {
    // switch to the next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    activePlayer = activePlayer === 0 ? 1 : 0
    
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
  }
}) 

btnHold.addEventListener('click', function() {
  // 1. add current score to active player's score

})