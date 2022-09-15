'use strict';

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const scorePlayer0 = document.getElementById("score--0")
const scorePlayer1 = document.getElementById("score--1")
const currentScorePlayer0 = document.getElementById("current--0");
const currentScorePlayer1 = document.getElementById("current--1");

let currentScore = 0

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");

btnRoll.addEventListener('click', function() {
  const dice = Math.trunc(Math.random() * 6) + 1

  // console.log(dice);
  diceEl.src = `dice-${dice}.png`;

  if(dice !== 1) {
    // currentScore = dice + currentScore
    currentScore += dice;
    currentScorePlayer0.textContent = currentScore;
  }
}) 