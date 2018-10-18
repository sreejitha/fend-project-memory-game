/* Holds last 2 cards that were opened */
let myLastTwoCards = [];
/*Holds all the opened cards so far */
let myOpenedCards = [];
const imageclasses = ["fa-diamond", "fa-paper-plane-o", "fa-anchor",
  "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond",
  "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"
];
let timer;
let seconds;
let mins;

/* Shuffle function from */
/*https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order */
function shuffle() {
  let ul = document.querySelector('.deck');
  for (let i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
  }
}

function addCardsDeck() {
  for (let i = 0; i < imageclasses.length; i++) {
    let li = document.createElement('li');
    li.classList.add("card");
    let img = document.createElement('i');
    img.classList.add("fa");
    img.classList.add(imageclasses[i]);
    li.appendChild(img);
    let ul = document.querySelector('.deck');
    ul.appendChild(li);
  }
}
/*function to open card by adding appropriate classes to class list
and adding card to myLastTwoCards*/
function openCard(card) {
  myOpenedCards.push(card);
  card.classList.add('open');
  card.classList.add('show');
  myLastTwoCards.push(card);
}

/*function to close card by removing appropriate classes from class list */
function hideCard(cardArray) {
  for (let card of cardArray) {
    setTimeout(function() {
      card.classList.remove('open');
      card.classList.remove('show');
      card.classList.remove('match');
      card.classList.remove('apply-shake');
      card.removeAttribute('style');
    }, 500);
  }
}

function deleteFromMyOpenedCards() {
  myOpenedCards = [];
}

function deleteFromMyLastTwoCards() {
  myLastTwoCards = [];
}

function deleteSelectFromMyOpenedCards(cardArray) {
  for (let card of cardArray) {
    let indexOfCard = myOpenedCards.indexOf(card);
    myOpenedCards.splice(indexOfCard, 1);
  }
}

/*function to start and increment timer on the web-page at 1000ms interval*/
function startTimer() {
  seconds = 0;
  mins = 0;
  timer = setInterval(function() {
    if (seconds <= 59)
      seconds++;
    else {
      mins++;
      seconds = 0;
    }
    if (mins >= 1)
      document.querySelector('.timeElapsed').textContent = `${mins} min ${seconds} sec`;
    else {
      document.querySelector('.timeElapsed').textContent = `${seconds} sec`;
    }
  }, 1000);
}

/*to display game over modal and associated game statistics*/
function displayGameOverModal() {
  document.getElementById('gameOverModal').style.display = 'table';
  let moves = document.getElementsByClassName('moves')[0].textContent;
  let noOfStars = document.getElementsByClassName('stars')[0].children.length;
  let timeTaken = document.querySelector('.timeElapsed').textContent;
  document.getElementsByClassName('para2-gameover')[0].textContent = `With ${moves} moves, ${noOfStars} stars and in ${timeTaken}`;
}

/*to check if game is over and take actions on game over*/
function checkForGameEnd() {
  setInterval(function() {
    /*condition for game over*/
    if (myOpenedCards.length === 16) {
      stopTimer();
      displayGameOverModal();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

/*
Increments no of moves by 1 with each valid card click
*/
function incrementNoOfMoves() {
  let noOfMoves = parseInt(document.querySelector('.moves').textContent);
  noOfMoves++;
  manageStars(noOfMoves);
  document.querySelector('.moves').textContent = noOfMoves;
}

/*Function to reduce number of stars based on increasing number or moves played.*/
function manageStars(noOfMoves) {
  if (noOfMoves > 16 && noOfMoves <= 32) {
    let fifthStar = document.getElementsByClassName('stars')[0]
      .getElementsByTagName('li')[4];
    if (fifthStar != null)
      fifthStar.remove();
  }
  if (noOfMoves > 32 && noOfMoves <= 48) {
    let fourthStar = document.getElementsByClassName('stars')[0]
      .getElementsByTagName('li')[3];
    if (fourthStar != null)
      fourthStar.remove();
  }
  if (noOfMoves > 48 && noOfMoves <= 64) {
    let thirdStar = document.getElementsByClassName('stars')[0]
      .getElementsByTagName('li')[2];
    if (thirdStar != null)
      thirdStar.remove();
  }
  if (noOfMoves > 64 && noOfMoves <= 80) {
    let secondStar = document.getElementsByClassName('stars')[0]
      .getElementsByTagName('li')[1];
    if (secondStar != null)
      secondStar.remove();
  }
  if (noOfMoves > 80) {
    let firstStar = document.getElementsByClassName('stars')[0]
      .getElementsByTagName('li')[0];
    if (firstStar != null)
      firstStar.remove();
  }
}

/*Checks if the last 2 opened cards are a match
If Yes-> Animation for matching cards + leave them open
If No-> Close them back
*/
function checkMatch(cardArray) {
  if (cardArray.length == 2) {
    let sameCardValue = true;
    for (let myClass of cardArray[0].querySelector('i').classList) {
      if (!cardArray[1].querySelector('i').classList.contains(myClass))
        sameCardValue = false;
    }

    if (sameCardValue) { //Cards are a match in value, call shake event;
      for (let card of cardArray) {
        card.style.pointerEvents = 'none';
        card.classList.add('apply-shake');
        card.classList.add('match');
      }
    } else {
      hideCard(cardArray);
      deleteSelectFromMyOpenedCards(cardArray);
    }
    cardArray.pop();
    cardArray.pop();
  }
  return false;
}

function resetStars() {
  /*Delete all stars currently present */
  let starsList = document.getElementsByClassName('stars')[0];
  while (starsList.firstChild) {
    starsList.removeChild(starsList.firstChild);
  }
  /*Add back exactly 5 stars*/
  for (let i = 1; i <= 5; i++) {
    let li = document.createElement('li');
    let i = document.createElement('i');
    let ul = document.querySelector('.stars');
    i.setAttribute('class', 'fa fa-star');
    li.appendChild(i);
    ul.appendChild(li);
    n
  }
}

function restartGame() {
  /*Set no of stars back to 5*/
  resetStars();
  /*Reshuffle cards and close all cards*/
  hideCard(myOpenedCards);
  deleteFromMyOpenedCards();
  deleteFromMyLastTwoCards();
  setTimeout(shuffle, 500);
  /*Reset no of moves back to zero*/
  document.querySelector('.moves').textContent = '0';
  /*Reset time elapsed back to 0 seconds*/
  document.querySelector('.timeElapsed').textContent = `0 sec`;
  seconds = 0;
  mins = 0;
}

/* ADDING IN ALL THE EVENT LISTENERS*/

/*Event listener for adding cards to deck */
document.querySelector('.deck').addEventListener('load', addCardsDeck());
/*Event listener for Card Click */
let cardElements = document.getElementsByClassName('card')
for (cardElement of cardElements) {
  cardElement.addEventListener('click', function(event) {
    if (!myOpenedCards.includes(event.target)) {
      incrementNoOfMoves();
      openCard(event.target);
    }
    checkMatch(myLastTwoCards);
  });
}
/*Event listener for starting Timer */
document.querySelector('.deck').addEventListener('load', startTimer());
/*Event listener for stopping Timer */
document.querySelector('.deck').addEventListener('load', checkForGameEnd());
/*Event listener for resetting game */
document.querySelector('.restart').addEventListener('click', restartGame);
/*Event listener for clicking 'Play Again' on Game Summary Modal */
document.getElementById('play-again').addEventListener('click', function() {
  document.getElementById('gameOverModal').style.display = 'none';
  restartGame();
  startTimer();
});
