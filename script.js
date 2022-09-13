'use strict'

const maxNumber = 20
let secretNumber = Math.trunc(Math.random() * maxNumber) + 1;
let userScore = 20
let highScore = 0
// console.log(secretNumber);

document.querySelector('.check').addEventListener('click', function() {
  const guessValue = Number(document.querySelector(".guess").value)

  // console.log("guessValue", typeof guessValue);

  // when there is no input
  if (!guessValue) {
    document.querySelector('.message').textContent = '⛔️ No number'
  } 

  // when number is WRONG
  else if (guessValue !== secretNumber) {
    if (userScore > 1) {
      document.querySelector(".message").textContent =
        guessValue < secretNumber ? "⏬ Too low" : "⏫ Too high";
      userScore--;
      document.querySelector(".score").textContent = userScore;
    } else {
      document.querySelector(".message").textContent = "🙁 Game over!";
      document.querySelector(".score").textContent = 0;
    }
  }

  // when number is too low
  // else if (guessValue < secretNumber) {
  //   if (userScore > 1) {
  //     document.querySelector(".message").textContent = "⏬ Too low";
  //     userScore--;
  //     document.querySelector(".score").textContent = userScore;
  //   } else {
  //     document.querySelector(".message").textContent = "🙁 Game over!";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // }
  // // when number is too high
  // else if (guessValue > secretNumber) {
  //   if (userScore > 1) {
  //     document.querySelector(".message").textContent = "⏫ Too high";
  //     userScore--;
  //     document.querySelector(".score").textContent = userScore;
  //   } else {
  //     document.querySelector(".message").textContent = "🙁 Game over!";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // }
  // when number is CORRECT
  else if (guessValue === secretNumber) {
    if (userScore > highScore) {
      highScore = userScore;
      document.querySelector(".high_score").textContent = highScore;
    }

    document.querySelector(".message").textContent = "🥳 Correct Number";
    document.querySelector(".secret_number").textContent = guessValue;
    document.querySelector(".main_container").style.backgroundColor = "green";
  }
})

document.querySelector('.reset').addEventListener('click', function() {
  userScore = 20;
  secretNumber = Math.trunc(Math.random() * maxNumber) + 1;
  // console.log("secretNumber", secretNumber);

  document.querySelector(".score").textContent = userScore;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".secret_number").textContent = "?";
  document.querySelector('.guess').value = ''
  document.querySelector(".main_container").style.backgroundColor = 'black';
})

let maxBorder = 1000;
let minBorder = maxBorder / 2
let botNumber = 1000;
let usedNumbers = []

document.querySelector('.find').addEventListener('click', function() {
  // console.log("secretNumber", secretNumber);
  
  while (botNumber !== secretNumber) {
    console.log("AI GUESS", botNumber);
    if(botNumber < secretNumber) {
      maxBorder = Math.trunc(botNumber + (botNumber / 2));
      minBorder = botNumber
      botNumber = Math.trunc(minBorder + (maxBorder - minBorder) / 2);

      if(usedNumbers.includes(botNumber)) {
        botNumber++
      }
    } else if (botNumber > secretNumber) {
      maxBorder = Math.trunc(botNumber - botNumber / 2);
      minBorder = botNumber
      botNumber = Math.trunc(minBorder + (maxBorder - minBorder) / 2);

      if (usedNumbers.includes(botNumber)) {
        botNumber++;
      }
    }
    usedNumbers.push(botNumber);
    // console.log(usedNumbers);
  }

  console.log(`Answer is ${botNumber}. I found it in ${usedNumbers.length}th try!`);
  document.querySelector(".secret_number").textContent = botNumber;
})