var greenScreenTime = 0;
var clickTime = 0;
var gameId = 0;

function switchToRedScreen() {
    toggleStartScreen();
    toggleRedScreen();
    setTimeout(switchToGreenScreen, generateRandomMs(2100, 6000))
}

function switchToGreenScreen() {
    var redScreen = document.getElementById('red-screen');
    if (!redScreen.classList.contains('hidden')) {
        toggleRedScreen();
        toggleGreenScreen();
        greenScreenTime = new Date();
        var copyOfGameId = gameId;
        setTimeout(function () {
            toggleEndScreenOnFailure(copyOfGameId);
        }, 2000);
    }
}

function switchToEndScreen() {
    var greenScreen = document.getElementById('green-screen');
    if (!greenScreen.classList.contains('hidden')) {
        clickTime = new Date();
        toggleGreenScreen();
        toggleEndScreen();
        gameId++;

    }
}

function repeatGame() {
    var endScreen = document.getElementById('end-screen');
    if (!endScreen.classList.contains('hidden')) {
        toggleEndScreen();
        toggleRedScreen();
        setTimeout(switchToGreenScreen, generateRandomMs(2100, 6000));
        greenScreenTime = 0;
        clickTime = 0;
    }
}

function toggleRedScreen() {
    var redScreen = document.getElementById('red-screen');
    redScreen.classList.toggle('hidden');
}
function toggleGreenScreen() {
    var greenScreen = document.getElementById('green-screen');
    greenScreen.classList.toggle('hidden');
}
function toggleStartScreen() {
    var startScreen = document.getElementById('start-game');
    startScreen.classList.add('hidden');
}
function toggleEndScreen() {
    var endScreen = document.getElementById('end-screen');
    endScreen.classList.toggle('hidden');
    var reactionTime = timeDifference();
    renderReactionTimeDiv(reactionTime);
}

function generateRandomMs(minInRange, maxInRange) {
    return Math.floor(Math.random() * (maxInRange - minInRange + 1)) + minInRange;
}

function timeDifference() {
    var difference = clickTime - greenScreenTime;
    return difference;
}

function renderReactionTimeDiv(text) {
    var reactionTimeContainer = document.querySelector(".reaction-time-container");
    var spanBegin = '<span class="inter-text end-screen-text reaction-time">';
    var spanClose = '</span>';
    reactionTimeContainer.innerHTML = spanBegin + text + spanClose;
}

function toggleEndScreenOnFailure(callForGameId) {
    if (gameId !== callForGameId) {
        return
    }
    var endScreen = document.getElementById('end-screen');
    endScreen.classList.toggle('hidden');
    toggleGreenScreen();
    renderReactionTimeDiv("Too slow");
}

