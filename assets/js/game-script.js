// Retrieve locally stored variables
const level = window.localStorage.getItem("level");
const cardsOnGrid = window.localStorage.getItem("cards");
const flipsMax = window.localStorage.getItem("flipsMax");
const timeMax = window.localStorage.getItem("timeMax");

// Show elements that were hidden
document.getElementById("game-stats").style.display = "block";
document.getElementById("game-stats").style.textAlign = "center";
document.getElementById("title").style.display = "none";

// Assign time and flipMax based on level selected
document.getElementById("time-remaining").innerText = timeMax;
document.getElementById("flips-remaining").innerText = flipsMax;

// Create a default gamestatus and clickOnCards global counter
let gamestatus = "running";
let clickOnCards = 0;

// Dynamically create card elements 
for (let index = 0; index < cardsOnGrid; index++) {
    addElement();
}

// Get an array of all the cards
let cards = document.querySelectorAll(".card2");

// Create an array containing no / index of cards starting with card no 1 
let numberOfUnassignedCards = [];
for (let index = 0; index < cards.length; index++) {
    numberOfUnassignedCards[index] = index + 1; //card 0 does not exist
}

// Create an array containing images path
let cardImages = [
    "assets/images/game-angry-bird.png",
    "assets/images/game-bee.png",
    "assets/images/game-bird-blue.png",
    "assets/images/game-cloud.png",
    "assets/images/game-cockroach.png",
    "assets/images/game-discoball.png",
    "assets/images/game-eel.png",
    "assets/images/game-fish-2.png",
    "assets/images/game-fish.png",
    "assets/images/game-football.png",
    "assets/images/game-lion.png",
    "assets/images/game-mosquito.png",
    "assets/images/game-mountain-2.png",
    "assets/images/game-mountain.png",
    "assets/images/game-pokemon.png",
    "assets/images/game-star-yellow.png",
    "assets/images/game-star.png",
    "assets/images/game-sun.png",
    "assets/images/game-tiger.png",
    "assets/images/game-tree-2.png",
    "assets/images/game-tree.png",
    "assets/images/whale.png",
];

// Assign a pair of random images to a random pair of cards
assignCards();

function assignCards() {
    let index = 0;
    while (numberOfUnassignedCards.length > 0) {
        // --Select two random cards from the cards array--

        // 1. Select random first card
        let oneOftwo = Math.floor(Math.random() * numberOfUnassignedCards.length); //reading random index
        let cardOnGrid = numberOfUnassignedCards[oneOftwo]; //reading the value against random index i.e. card no on grid.

        // 2. Select a random image and create img element
        let backImg = document.createElement("img");
        backImg.setAttribute("src", cardImages[index]);
        backImg.setAttribute("class", "imgOnCard");

        // 3. Assign random image to first card 
        let backSide = cards[cardOnGrid - 1].lastChild;
        backSide.appendChild(backImg.cloneNode(true)); // send a clone, otherwise node is just moved from previous position.

        // 4. Remove the first selected card from further selection
        numberOfUnassignedCards.splice(oneOftwo, 1);

        // 5. Select second card
        let twoOftwo = Math.floor(Math.random() * numberOfUnassignedCards.length); //reading random index
        cardOnGrid = numberOfUnassignedCards[twoOftwo]; //reading the value against random index i.e. card no on grid.

        // 6. Assign random image to second card 
        backSide = cards[cardOnGrid - 1].lastChild;
        backSide.appendChild(backImg.cloneNode(true)); // send a clone otherwise, node is just move from previous position

        // 7. Remove the second selected card from further selection
        numberOfUnassignedCards.splice(twoOftwo, 1);

        // 8. Pop the image out of the img array, so that it doesn't get reassigned
        delete cardImages[index];

        // 9. Repeat until all cards are assigned.
        index++;
    }
}

function addElement() {
    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "card2");

    // Create two child divs for front and back of card
    const front = document.createElement("div");
    front.setAttribute("class", "front");
    const back = document.createElement("div");
    back.setAttribute("class", "back");

    newDiv.appendChild(front);
    newDiv.appendChild(back);

    // Add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("cards-wrapper");
    currentDiv.appendChild(newDiv);
}

cards.forEach(element => {
    element.addEventListener('click', function () {
        // Run click counter, returns no of cards flipped after reset after counter reset(i.e.1 or 2)
        let cardsFlipped = clickCounter();

        // Check time remaining, returns true if time is remaining
        let isTimeRemaining = checkRemainingTime()

        // Call to game over function if there is no time left
        if (!isTimeRemaining) { gameOver("outOfTime", level) }

        // Check flip remaining, returns true is flips are remaining
        let isFlipsRemaining = checkRemainingFlips()

        // Call game over if there are no flips left
        if (!isFlipsRemaining) { gameOver("outOfFlips", level) }

        // Call game over if all cards are revealed
        let isAllCardsRevealed = checkAllCardsRevealed()
        if (isAllCardsRevealed) { gameOver("success", level) }

        // Flip the card if the card is not already flipped and it is one of the first two cards
        if (isTimeRemaining && isFlipsRemaining && isAllCardsRevealed == false) {
            flipCard(element, cardsFlipped)
        }
        // Call twoCardsFlipped to check conditions when two cards are flipped
        if (cardsFlipped == 2) {
            twoCardsFlipped();
        }
    });
});

/**
 * Flip card after checking necessary conditions
 * @param {Element} element         Individual card container
 * @param {Number}  cardsFlipped    No. of cards flipped to match pairs
 */
function flipCard(element, cardsFlipped) {
    // Check if card is already flipped or not
    const isFlipped = element.classList.contains("flipcard");

    // Check if it is first or second card to be flipped
    const isFirstorSecondCard = (cardsFlipped < 3);

    // Check if user has any flips remaining
    let flipsRemaining = document.getElementById("flips-remaining").innerText;
    let isFlipsRemaining = (flipsRemaining > 0);

    if ((!isFlipped) && (isFirstorSecondCard) && (isFlipsRemaining)) {

        // Flip the card
        element.classList.toggle("flipCard");

        // Deduct 1 from flipsremaining and update on screen
        flipsRemaining--;
        document.getElementById("flips-remaining").innerText = flipsRemaining;

        // Disable click on the flipped card
        element.classList.add("noClick");
    }
}

/**
 * Count clicks on card
 */
function clickCounter() {
    return ++clickOnCards;
}

/**
 * Checks for next action after user flips two cards
 */
function twoCardsFlipped() {

    // Disable clickevents on all cards
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        element.classList.add("noClick");
    }

    //--Check bg images--

    // First, get all cards that are flipped
    let flippedCards = document.getElementsByClassName("flipCard");

    // Second, filter the selection to get only last two cards that are flipped 
    let checkFlippedCards = Array.prototype.filter.call( //returns a shallow copy
        flippedCards,
        (card) => card.classList.contains("revealed") === false
    );
    // Third, get their backgrounds
    let flippedCard1bg = checkFlippedCards[0].lastChild;
    let flippedCard2bg = checkFlippedCards[1].lastChild;

    // Fourth, check if the bg match
    let isMatch = flippedCard1bg.isEqualNode(flippedCard2bg);

    // --Code if the bg matches--
    if (isMatch) {

        // First, increase score
        let scoreElement = document.getElementById("score");
        let score = parseInt(scoreElement.innerText);
        score = score + 10;
        scoreElement.innerText = score;

        // Second, declare cards as reveleaed by addding a revealed class
        checkFlippedCards[0].classList.add("revealed");
        checkFlippedCards[1].classList.add("revealed");

        // Third, set click counter back to zero
        clickOnCards = 0;

        // Fourth, enable click events only on unrevealed cards
        for (let index = 0; index < cards.length; index++) {
            const element = cards[index];

            if (element.classList.contains("revealed") === false) {
                element.classList.remove("noClick");
            }
        }

        // Fifth, check if all cards are flipped , add delay to allow the flipcard animation  
        setTimeout(() => {
            if (flippedCards.length === cards.length) { gameOver("success", level) }
        }, 1000)

    } else {
        // After 4 sec, flip cards back and enable click events
        setTimeout(function () {

            // --Flip back only those cards that are not revealed--

            // First, select unrevealed cards- two of them are flipped and some are unflipped
            const flippedCards = Array.prototype.filter.call( //returns a shallow copy
                cards,
                (card) => card.classList.contains("revealed") === false
            );

            flippedCards.forEach(element => {

                // Second, enable clickevents on all unrevealed cards
                element.classList.remove("noClick");

                // Third, if an unrevealed card was flipped, flip it back because it did not match
                if (element.classList.contains("flipCard")) {
                    element.classList.toggle("flipCard");
                }
            });
        }, 4000);

        // Set click counter back to zero
        clickOnCards = 0;
    }
}

// The timer is taken from https://codepen.io/ishanbakshi/pen/pgzNMv and modified
const a = setInterval(startTimer, 1000);

/**
 * Starts countdown timer along witch checkSecond() function
 * When timer is reaches zero, call to gaveover() function
 */

function startTimer() {

    // Get the current time
    let presentTime = document.getElementById('time-remaining').innerHTML;

    // Split to get minute and hour
    let timeArray = presentTime.split(/[:]+/);
    let m = timeArray[0];
    let s = checkSecond((timeArray[1] - 1));

    // Second countdown timer, which is executed every 1000 ms
    if (s == 59) { m = m - 1 }

    // Update minutes
    if (m < 0) {
        // call runOutofTime
        gameOver("outOfTime", level);
        return //important to terminate the function execution
    }
    // Update time on html element
    document.getElementById('time-remaining').innerHTML =
        m + ":" + s;
}

/**
 * Updates second when it is in single digit and when minutes change
 * @param {number} sec Takes second value from StartTimer() func
 * @returns {number} sec Returns updated value
 */
function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
}
/**
 * 
 * @param {*} gameStatus 
 * @param {*} currentLevel 
 * @param {*} currLevel 
 */
function gameOver(gameStatus, currLevel) {
    alert(gameStatus);
    clearInterval(a); // stop timer

    // Disable clickevents on all cards
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        element.classList.add("noClick");
    }

    if (gameStatus == "outOfTime" || gameStatus == "outOfFlips") {
        let retry = confirm("Would you like to retry?");
        if (retry == true) {
            // Reload game i.e. refresh the page
            window.location.href = "game.html";
        } else {
            debugger;
            //set local variable to current level
            window.localStorage.setItem("level", level);
            // take them back to levels page
            window.location.href = "levels.html";
        }
    }

    if (gameStatus == "success" && currLevel <= 4) {
        let goToNextLevel = confirm("Congratulations! Go to next level?");
        if (goToNextLevel == true) {
            //take them back to levels page with +1 level selected.
            window.localStorage.setItem("level", parseInt(level) + 1);
            window.location.href = "levels.html";
        }
    } else if (gameStatus == "success" && currLevel == 5) {
        // take them back to levels page
        let tryAgain= confirm("you have beat the game. You are smart! May be you just got lucky. Try again?");
        if (tryAgain == true) {
            // Reload game i.e. refresh the page
            window.location.href = "game.html";
        }
    }


}

function checkRemainingTime() {
    //get the current time
    let presentTime = document.getElementById('time-remaining').innerHTML;

    // split to get minute and hour
    let timeArray = presentTime.split(/[:]+/);
    let m = timeArray[0];
    let s = checkSecond((timeArray[1] - 1));

    if (m < 0) {
        return false;
    } else {
        return true;
    }
}

function checkAllCardsRevealed() {
    let NoOfRevealedCards = Array.prototype.filter.call( //returns a shallow copy
        cards,
        (card) => card.classList.contains("card2 flipCard noClick revealed") === false
    );

    if (cards.length = NoOfRevealedCards) {
        return false;
    } else {
        return true;

    }
}

function checkRemainingFlips() {
    let flipsRemaining = document.getElementById("flips-remaining").innerText;
    let isFlipsRemaining = (flipsRemaining > 0);

    if (isFlipsRemaining) {
        return true;
    } else {

        return false;
    }
}

// setting game abort function

let homeBtn = document.getElementById("home");

homeBtn.addEventListener('click', () => {

    let abort = confirm("would you like to abort?");

    if (abort == true) {
        window.location.href = "levels.html";
    }

})

