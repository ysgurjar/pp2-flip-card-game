// get local storage
level = window.localStorage.getItem("level");
cards = window.localStorage.getItem("cards");
flipsMax = window.localStorage.getItem("flipsMax");
timeMax = window.localStorage.getItem("timeMax");

document.getElementById("game-stats").style.display = "block";
document.getElementById("game-stats").style.textAlign = "center";

document.getElementById("title").style.display = "none";

// dynamically create card elements 
for (let index = 0; index < 10; index++) {
    addElement();
}

// get all the cards
cards = document.querySelectorAll(".card2");

// create an array containing no / index of cards starting with card no 1 
let numberOfUnassignedCards = [];
for (let index = 0; index < cards.length; index++) {
    numberOfUnassignedCards[index] = index + 1; //card 0 does not exist
}

// create an array containing images patch
cardImages = [
    "/assets/images/game-angry-bird.png",
    "/assets/images/game-bee.png",
    "/assets/images/game-bird-blue.png",
    "/assets/images/game-cloud.png",
    "/assets/images/game-cockroach.png",
    "/assets/images/game-discoball.png",
    "/assets/images/game-eel.png",
    "/assets/images/game-fish-2.png",
    "/assets/images/game-fish.png",
    "/assets/images/game-football.png",
    "/assets/images/game-lion.png",
    "/assets/images/game-mosquito.png",
    "/assets/images/game-mountain-2.png",
    "/assets/images/game-mountain.png",
    "/assets/images/game-pokemon.png",
    "/assets/images/game-star-yellow.png",
    "/assets/images/game-star.png"
];

// assign a pair of random images to a random pair of cards
assignCards();

function assignCards() {
    let index = 0;
    while (numberOfUnassignedCards.length > 0) {
        // --select two random cards from the cards array--

        // select random first card
        let oneOftwo = Math.floor(Math.random() * numberOfUnassignedCards.length); //reading random index
        let cardOnGrid = numberOfUnassignedCards[oneOftwo]; //reading the value against random index i.e. card no on grid.

        // select a random image and create img element
        let backImg = document.createElement("img");
        backImg.setAttribute("src", cardImages[index]);
        backImg.setAttribute("class", "imgOnCard");

        // assigning random image to first card 
        let backSide = cards[cardOnGrid - 1].lastChild;
        backSide.appendChild(backImg.cloneNode(true)); // send a clone, otherwise node is just moved from previous position.

        // remove the first selected card from further selection
        numberOfUnassignedCards.splice(oneOftwo, 1);

        // select second card
        let twoOftwo = Math.floor(Math.random() * numberOfUnassignedCards.length); //reading random index
        cardOnGrid = numberOfUnassignedCards[twoOftwo]; //reading the value against random index i.e. card no on grid.

        // assigning random image to second card 
        backSide = cards[cardOnGrid - 1].lastChild;
        backSide.appendChild(backImg.cloneNode(true)); // send a clone otherwise, node is just move from previous position

        // remove the second selected card from further selection
        numberOfUnassignedCards.splice(twoOftwo, 1);

        // pop the image out of the img array, so that it doesn't get reassigned
        delete cardImages[index];

        // repeat until all cards are assigned.
        index++;
    }

}

function addElement() {
    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "card2");

    // create two child divs for front and back of card
    const front = document.createElement("div");
    front.setAttribute("class", "front");
    const back = document.createElement("div");
    back.setAttribute("class", "back");

    newDiv.appendChild(front);
    newDiv.appendChild(back);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("cards-wrapper");
    currentDiv.appendChild(newDiv);
}



cards.forEach(element => {
    element.addEventListener('click', function () {
        // run click counter, returns no of cards flipped
        let cardsFlipped = clickCounter();

        // flip the card if the card is not already flipped and it is one of the first two cards
        flipCard(element, cardsFlipped);

        // low if two cards are flipped
        if (cardsFlipped == 2) {
            twoCardsFlipped();
        }
    })
});

/**
 * flips card after checking necessary conditions
 */
let clickOnCards = 0;

function flipCard(element, cardsFlipped) {

    // check if card already flipped?
    isFlipped = element.classList.contains("flipcard");

    // is it first or second card to be flipped?
    isFirstorSecondCard = (cardsFlipped < 3)

    if ((!isFlipped) && (isFirstorSecondCard)) {

        // flip the card
        element.classList.toggle("flipCard");

        //disable click on the flipped card
        element.classList.add("noClick");
    }

}


/**
 * counts clicks on card
 */
function clickCounter() {
    return ++clickOnCards;
}

function twoCardsFlipped() {

    //disable clickevents on all cards
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        element.classList.add("noClick");
    }

    //--check bg images--

    // first, get all cards that are flipped
    let flippedCards = document.getElementsByClassName("flipCard");

    // second, filter the selection to get only last two cards that are flipped 
    let checkFlippedCards = Array.prototype.filter.call( //returns a shallow copy
        flippedCards,
        (card) => card.classList.contains("revealed") === false
    );
    // third, get their backgrounds
    let flippedCard1bg = checkFlippedCards[0].lastChild;
    let flippedCard2bg = checkFlippedCards[1].lastChild;

    // fourth, check if the bg match
    isMatch = flippedCard1bg.isEqualNode(flippedCard2bg);

    // --code if the bg matches--
    if (isMatch) {

        // first, increase score

        // second, declar cards as reveleaed by addding a revealed class
        checkFlippedCards[0].classList.add("revealed");
        checkFlippedCards[1].classList.add("revealed");

        // third, set click counter back to zero
        clickOnCards = 0;

        // fourth, enable click events only on unrevealed cards
        for (let index = 0; index < cards.length; index++) {
            const element = cards[index];

            if (element.classList.contains("revealed") === false) {
                element.classList.remove("noClick");
            }
        }
    } else {
        // after 4 sec, flip cards back and enable click events
        setTimeout(function () {

            //--flip back only those cards that are not revealed--

            // first, select unrevealed cards- two of them are flipped and some are unflipped
            const flippedCards = Array.prototype.filter.call( //returns a shallow copy
                cards,
                (card) => card.classList.contains("revealed") === false
            );

            flippedCards.forEach(element => {

                // second, enable clickevents on all unrevealed cards
                element.classList.remove("noClick");

                // third, if an unrevealed card was flipped, flip it back because it did not match
                if (element.classList.contains("flipCard")) {
                    element.classList.toggle("flipCard");
                }

            });
        }, 4000);

        // set click counter back to zero
        clickOnCards = 0;
    }
}