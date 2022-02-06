// PART 1
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

let word = "magnolia";// to be reassigned
//PART 2
const guessedLetters =[];
//PART 4
let remainingGuesses = 8;

const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    //console.log(data);
    //convert data into an array 
    const wordList = data.split("\n");
    //console.log(wordList);
    const randomIndex = Math.floor(Math.random() * wordList.length);
    word = wordList[randomIndex].trim();
    initialiseWordInProgress(word);
};

getWord();


//function to update word guessing progress
const initialiseWordInProgress = function(){
    const len = word.length;
    wordInProgress.innerText = "";
    for(i = 0; i< len; i++){
        wordInProgress.innerText = wordInProgress.innerText + "●";
    }
};


guessButton.addEventListener("click", function(e){
    e.preventDefault();
    let val = letter.value;
    //console.log(val);
    letter.value = "";//clear the input space
    message.innerText = "";// clear message 
    let validatedInput = validateLetter(val);// make sure it is a letter
    if(validatedInput!== undefined){
        makeGuess(validatedInput);// add to guess list if not already present
    }
});

//PART 2
const validateLetter = function(input){
    //console.log("validating input....");
    const alphabetRegPattern = /[a-zA-z]/;
    if(input === "")
        message.innerText = "Please enter an alphabet from A to Z.";
    else if(input.length > 1)
        message.innerText = "Please enter one alphabet only.";
    else if(!input.match(alphabetRegPattern))
    message.innerText = "Please enter an alphabet from A to Z.";
    else
        return input;
};

const makeGuess = function(letter){
    if(guessedLetters.includes(letter.toUpperCase()))
        message.innerText = "You already guessed that letter, silly. Try again.";
    else{
        guessedLetters.push(letter.toUpperCase());
        //console.log(guessedLetters);
        updateGuessList(); // add alphabet if not already present and display in the guessed list of alphabets
        updateRemainingGuesses(letter); //Update remaining guesses
        updateWordInProgress(guessedLetters) // check if alphabet entered is there in the word and update progress
        winOrNot();// check if user has guessed the complete word
    }
};

//PART 3
const updateGuessList = function(){
    guessList.innerHTML = "";
    for(let alphabet of guessedLetters){
        const letterItem = document.createElement("li");
        letterItem.innerText = alphabet;
        guessList.append(letterItem);
    }
};

const updateWordInProgress = function(guessedLetters){
    wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const wordProgress = wordInProgress.innerText.split("");
    //creates array as ['●', '●', '●', '●', '●', '●', '●', '●']
    //console.log(wordProgress);
    //console.log(wordInProgress.innerText);
    guessedLetters.forEach(function(alphabet,index) {
        //for each alphabet guessed, if word Array has it,
        if(wordArray.includes(alphabet)){
            //find every occurance of alphabet  
            for(i = 0; i< wordArray.length; i++){
                if(wordArray[i] === alphabet){
                    //replace every corresponding circle with the alphabet
                    wordProgress[i] = alphabet;
                }
                    
            }
        }
        
    });

    wordInProgress.innerText = wordProgress.join("");
    //join(separator to be used while returning string)
    //returns "MAGNOLIA"
};

// PART 4
const updateRemainingGuesses = function(guess){
    const wordUpper = word.toUpperCase();
    if(!wordUpper.includes(guess.toUpperCase())){
        message.innerText = `The word does not contain the letter ${guess}`;
        --remainingGuesses;
        //decrement happens only for an incorrect guess
    }
    else if(wordUpper.includes(guess))
        message.innerText = `Very Good!The word does contain the letter ${guess}.`;
    if(remainingGuesses === 0){
        message.innerText = `Game Over!The word is ${wordUpper}`;
    }
    else if(remainingGuesses === 1){
        remainingSpan.innerText = "You have 1 guess remaining";
    }
    else{
        remainingSpan.innerText = `You have ${remainingGuesses} guesses remaining`;
    }
};

//PART 3
const winOrNot = function(){
    if(wordInProgress.innerText === word.toUpperCase()){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

