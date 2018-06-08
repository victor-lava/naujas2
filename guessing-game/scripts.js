var arrayOfWords = ["chair", "ottoman", "pouf", "table", "desk", "cabinet", "bookshelf", "stool", "bench", "chaise", "dresser", "chest", "hanger", "wardrobe", "drawer", "lamp", "rack", "mirror", "swing", "hammock"]

var wordToGuess = arrayOfWords[randomWholeNum()];
var arrayOfLetters = wordToGuess.toUpperCase().split("");
var wordContainer = document.querySelector(".word-container");

var guessedWordLength = arrayOfLetters.length;
var guessedContainer = document.querySelector(".guessed-succesfully-container");
var divGuessedBegin = '<div class="guessed-letter">';
var divClose = '</div>';

var guessedWord = [];
for (var i = 0; i < arrayOfLetters.length; i++) {
    var letterToChange = arrayOfLetters[i];
    letterToChange = "_"
    guessedWord.push(letterToChange)
}

guessedWord[0] = arrayOfLetters[0];
guessedWord[guessedWord.length - 1] = arrayOfLetters[arrayOfLetters.length - 1];




function randomWholeNum() {
    var randomNum = Math.floor(Math.random() * 20);
    return randomNum;
}

function renderGuessedContainer(arr) {
    guessedContainer.innerHTML = "<span>Word to guess:</span>"
    for (var i = 0; i < arr.length; i++) {

        if (arr[i] == "_") {
            var divGuessedLetter = divGuessedBegin + divClose;
            guessedContainer.innerHTML = guessedContainer.innerHTML + divGuessedLetter;
        } else {
            var divGuessedLetter = divGuessedBegin + arr[i] + divClose;
            guessedContainer.innerHTML = guessedContainer.innerHTML + divGuessedLetter;
        }

    }
}
renderGuessedContainer(guessedWord)

function guessLetter() {

    var returnedLetter = document.getElementById("letter").value.toUpperCase();
    // document.getElementById("letter").value="";
    var indexesOfLetter = getAllIndexes(arrayOfLetters, returnedLetter);

    var validationMessage = document.querySelector('.validation-message');
    var successMessage = document.querySelector('.success-message');
    var winnerMessage = document.querySelector('.winner-container');
    var inputDiv = document.querySelector('.input-field-container');

    if (indexesOfLetter.length === 0) {
        if (validationMessage.classList.contains('validation-message-hidden')) {
            toggleValMessage();
        }
        if (!successMessage.classList.contains('validation-message-hidden')) {
            toggleSuccessMessage();
        }
        // validationMessage.innerHTML = "Letter is not found";
    } else {
        document.getElementById("letter").value = "";
        for (var i = 0; i < indexesOfLetter.length; i++) {
            var indexToSplice = indexesOfLetter[i];
            guessedWord.splice(indexToSplice, 1, returnedLetter);
        }
        renderGuessedContainer(guessedWord);
        if (!validationMessage.classList.contains('validation-message-hidden')) {
            toggleValMessage();
        }
        if (successMessage.classList.contains('validation-message-hidden')) {
            toggleSuccessMessage();
        }

        var hasWon = true;
        for (var i = 0; i < guessedWord.length; i++) {
            if (guessedWord[i] == "_") {
                hasWon = false;
            }
        }
        if (hasWon) {
            if (!successMessage.classList.contains('validation-message-hidden')) {
                toggleSuccessMessage();
            }
            if (!validationMessage.classList.contains('validation-message-hidden')) {
                toggleValMessage();
            }
            if (winnerMessage.classList.contains('validation-message-hidden')) {
                toggleWinnerMessage();
            }
            hideInputField();
            addNewWord();

        }

    }
}

function getAllIndexes(arr, val) {
    var indexes = [];
    for (var i = 1; i < arr.length - 1; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

function toggleValMessage() {
    var validationMessage = document.querySelector('.validation-message');
    validationMessage.classList.toggle('validation-message-hidden');
}

function toggleSuccessMessage() {
    var successMessage = document.querySelector('.success-message');
    successMessage.classList.toggle('validation-message-hidden');
}
function toggleWinnerMessage() {
    var winnerMessage = document.querySelector('.winner-container');
    winnerMessage.classList.toggle('validation-message-hidden');
}
function hideInputField() {
    var inputDiv = document.querySelector('.input-field-container');
    inputDiv.classList.add('validation-message-hidden');
}
var input = document.getElementById("letter");
input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});
function addNewWord() {
    var newWord = document.querySelector('.new-word-button');
    newWord.classList.remove('validation-message-hidden');
}

