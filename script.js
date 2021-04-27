'use strict'

// Selecting elements

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score1.textContent = 0;
    score2.textContent = 0;
    current1.textContent = 0;
    current2.textContent = 0;

    dice.classList.add('hidden');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
}
init();

// Switch Player

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const diceNo = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNo}.png`;

        // 3. Check for rolled 1
        if (diceNo !== 1) {
            // Add dice to current score
            currentScore += diceNo;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
})

// Adding the value to the score board

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active Player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 10
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            dice.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);