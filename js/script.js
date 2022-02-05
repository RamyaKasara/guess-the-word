//unordered list where the player's guesses will appear
const guessList = document.querySelector(".guessed-letters");
//"Guess" button
const guessButton = document.querySelector(".guess");
//input guess entered by player
const letter = document.querySelector(".letter");
//empty paragraph where the word progress appears
const wordInProgress = document.querySelector(".word-in-progress");
//span in the paragraph where the remaining guesses will display
const remainingSpan = document.querySelector(".remaining span");
//empty paragraph where messages will appear when player guesses
const message = document.querySelector(".message");
//hidden button that prompts the user to play again
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

//function to update word guessing progress
const updateWordInProgress = function(){
    const len = word.length;
    wordInProgress.innerText = "";
    for(i = 0; i< len; i++){
        wordInProgress.innerText = wordInProgress.innerText + " ● ";
    }
};

updateWordInProgress(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    let val = letter.value;
    console.log(val);
    letter.value = "";//clear the input space
    
});