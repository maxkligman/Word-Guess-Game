
//possible computer selections
var wordList = ["unity", "solidarity", "strength", "brotherhood", 
        "eternity", "power", "sickle", "hammer", "sputnik", "starvation"]

//necessary variables
var wordSelection = "";
var lettersInWordSelection = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];
var playerSelection = "";

var winCounter = 0;
var lossCounter = 0;
var allottedGuesses = 10;


//controls the game setup
function initiationSequence(){
    
    //selects random word and represents it on the document
    allottedGuesses = 9
    wordSelection = wordList[Math.floor(Math.random() * wordList.length)];
    lettersInWordSelection = wordSelection.split("");
    numBlanks = lettersInWordSelection.length;
    blanksAndSuccesses = [];
    wrongGuesses = [];
    console.log(wordSelection);


    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    console.log(blanksAndSuccesses);
    
    document.getElementById("guesses-left").innerHTML = allottedGuesses;
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ")
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ")
    
}


//verifies the player's guess
function verifySelection(letter){

    var letterVerified = false;

    //is it in the word
    for(var i = 0; i < numBlanks; i++){
        if(wordSelection[i] === letter){
        letterVerified = true;
        }
    }

    //find the spot and represent it on the document
    if(letterVerified){
        for(var x = 0; x < numBlanks; x++){
            if(wordSelection[x] === letter){
                blanksAndSuccesses[x] = letter;
            }
        }
    }

    //otherwise you lose
    else{
        wrongGuesses.push(letter);
        allottedGuesses--;
    }

}

//allows player to either run out of guesses or guess the word correctly
function cycle(){

    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + allottedGuesses);

    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
    document.getElementById("guesses-left").innerHTML = allottedGuesses;

    //correct
    if(blanksAndSuccesses.toString() === lettersInWordSelection.toString()){

        alert("SUCCESS");
        winCounter++;
        document.getElementById("win-counter").innerHTML = winCounter;

        initiationSequence();
    }

    //YOU LOSE
    else if(allottedGuesses === 0){

        lossCounter++;
        alert("FAILURE");
        document.getElementById("loss-counter").innerHTML = lossCounter;

        initiationSequence();

    }

}


//running the functions
initiationSequence();

document.onkeyup = function(event){

    playerSelection = String.fromCharCode(event.which).toLowerCase();

    verifySelection(playerSelection);

    cycle();
};