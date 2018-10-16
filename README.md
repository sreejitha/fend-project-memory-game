## Memory Game Project

With this project an attempt to re-create the Memory Game for a single user play has been made. In this game, the user clicks on any of the unopened cards and tries to find its matching pair from the rest of the unopened cards, based on memory of the location of previously opened cards. If a matching pair is found, the 2 cards stay open, if not both of them are closed back. Once the game completes (that is all matching pairs of cards are found), game statistics are displayed namely 1>no of moves 2>no of stars 3>time taken

## Instructions to run the project
Clone this repository into a folder and cd into that folder. In that folder you will find several other sub-folders such as "css" (houses the css file for the project), "img"(houses the images for the project) & "js"(houses the javascript file for the project) and an html file named "index.html". Open index.html using a browser application such as Google Chrome. The game will commence on this html file.

## About the solution
Implemented several event listeners to meet game logic and for progressing the game based on user actions and milestones:-
1> Start Timer: Fired when the user begins the game (body onload)
2> Stop Timer: Fired when all cards are matched
3> Checking for game end: Fired when user begins the game, and checks condition at interval of 1000ms
4> Game restart: When the game restart img icon is clicked (Resets no of stars, no of moves and timer and shuffles cards)
5> Play Again: Similar to Game restart, but this happens when the button of the Game Summary modal is clicked

Important functions in the game:-
1> checkMatch(cardArray): checks whether the last 2 opened cards are a match (last 2 cards are stored in an array. These 2 cards are deleted from the array at the end of the check regardless of result)
2>hideCard(cardArray): visually hides the cards passed in the card array. Called when the last 2 cards are not a match and on game reset and new game start.
3>checkForGameEnd() This function is called at intervals of 1000ms to check whether user has finished playing the game. If true, it displays the Game Summary Modal.
4>restartGame(): Several important things happen with this function
  a> stars are reset back to 5 (max number of stars a user can earn in the game)
  b> all cards are closed back
  c> cards are shuffled
  d> Moves set back to 0
  e> Timer set back to 0.
