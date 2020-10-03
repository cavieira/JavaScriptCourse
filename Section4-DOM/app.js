/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. 
Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. 
After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. 
After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
(Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores;
let roundScore;
let activePlayer; //0: first player, 1: second player
let gamePlaying;
let previousDiceRoll;
let winningScore = 10;

const min = 1;
const max = 6;

init();

document.getElementById("winningscore").addEventListener("submit", function () {
  event.preventDefault();
  winningScore = document.getElementById("winningscore").elements["wscore"]
    .value;
  console.log(winningScore);
});

function rollDice() {
  if (!gamePlaying) {
    return;
  }

  let dice = Math.floor(Math.random() * (max - min + 1)) + min; // selects a random number between 1 and 6
  let dice2 = Math.floor(Math.random() * (max - min + 1)) + min; // selects a random number between 1 and 6

  // Display the result
  let diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  let dice2DOM = document.querySelector(".dice2");
  dice2DOM.style.display = "block";
  dice2DOM.src = "dice-" + dice2 + ".png";

  //Update the score if it is not 1
  if (dice === 6 && previousDiceRoll === 6) {
    scores[activePlayer] = 0;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    nextPlayer();
  } else if (dice > 1 && dice2 > 1) {
    roundScore += dice + dice2;
    previousDiceRoll = dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    enableClickOnRoll();
  } else {
    nextPlayer();
  }
}

function enableClickOnRoll() {
  document
    .querySelector(".btn-roll")
    .addEventListener("click", rollDice, { once: true });
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (!gamePlaying) {
    return;
  }
  //Add current score to global score
  scores[activePlayer] += roundScore;
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= winningScore) {
    document.querySelector("#name-" + activePlayer).textContent = "WINNER!!!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    gamePlaying = false;
  } else {
    nextPlayer();
  }
});

function nextPlayerAfterInterval() {
  enableClickOnRoll();

  //Change the active player
  roundScore = 0;
  previousDiceRoll = 0;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.toggle("active");
}

function nextPlayer() {
  setTimeout(nextPlayerAfterInterval, 1000);
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  previousDiceRoll = 0;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  enableClickOnRoll();
}
