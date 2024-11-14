'use strict';

// Selection Variables
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let newGame = true;
let gameActive = true;
let currentPlayer = 0;
const players = [current0, current1];
const scores = [0, 0];

// Initial conditions for the game
if (newGame) {
  scoreReset();
  dice.classList.add('hidden');
  newGame = false;
}

// Game logic
btnRoll.addEventListener('click', function () {
  if (gameActive) {
    // 1. Generate a random dice roll
    const diceVal = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceVal}.png`;

    // 3. Check for rolled 1: if true, switch to next player and reset the score
    if (diceVal > 1) {
      // Update current score with the dice value
      players[currentPlayer].textContent =
        Number(players[currentPlayer].textContent) + diceVal;
    } else {
      // Reset the score and swith to the other player
      players[currentPlayer].textContent = 0;
      togglePlayer();
    }
  }
});

// Hold score functionality
btnHold.addEventListener('click', function () {
  if (gameActive) {
    // 1. Update the score in an external variable
    scores[currentPlayer] += Number(players[currentPlayer].textContent);

    // 2. Update the score in the HTML element
    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    // 3. Check if the score is a winner score
    if (scores[currentPlayer] >= 20) {
      gameActive = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      // 4. Reset the current score and toggle players
      players[currentPlayer].textContent = 0;
      togglePlayer();
    }
  }
});

// New game functionality
btnNew.addEventListener('click', function () {
  scoreReset();
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
  gameActive = true;
  currentPlayer = 0;
});

// Helper functions
function scoreReset() {
  score0.textContent = 0;
  score1.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  current0.textContent = 0;
  current1.textContent = 0;
}

function togglePlayer() {
  if (player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    currentPlayer = 1;
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    currentPlayer = 0;
  }
}
