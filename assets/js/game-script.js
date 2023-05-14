//Get local storage
level = window.localStorage.getItem("level");
cards = window.localStorage.getItem("cards");
flipsMax = window.localStorage.getItem("flipsMax");
timeMax = window.localStorage.getItem("timeMax");

document.getElementById("game-stats").style.display = "block";
document.getElementById("game-stats").style.textAlign = "center";

document.getElementById("title").style.display = "none";


// dynamically create card elements and assign a pair of random images to a rendom set of cards
for (let index = 0; index < 10; index++) {
    addElement();
}

// assign a pair of random images to a random pair of cards



function addElement() {
    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "card2");

    // create two child divs for front and back of card
    const front = document.createElement("div");
    front.setAttribute("class", "front");
    const back = document.createElement("div");
    back.setAttribute("class", "back");

    // add text to child divs

    frontText = document.createTextNode("Front side");


    backImg = document.createElement("img");
    backImg.setAttribute("src", "/assets/images/cloud.png");
    backImg.setAttribute("class", "imgOnCard");

    front.appendChild(frontText);


    back.appendChild(backImg);

    // append child divs
    newDiv.appendChild(front);
    newDiv.appendChild(back);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("cards-wrapper");
    currentDiv.appendChild(newDiv);
}

cards = document.querySelectorAll(".card2");

cards.forEach(element => {
    element.addEventListener('click', function () {

        //run click counter, returns no of cards flipped
        let cardsFlipped = clickCounter();
        console.log(cardsFlipped);
        //flip the card if the card is not already flipped and it is one of the first two cards
        flipCard(element, cardsFlipped);

        //flow if two cards are flipped
        if (cardsFlipped == 2) {
            twoCardsFlipped();
        }
    })
});

/**
 * flips card after checking necessary conditions
 */

clickOnCards = 0;

function flipCard(element, cardsFlipped) {


    //check if card already flipped?
    isFlipped = element.classList.contains("flipcard");

    //is it first or second card to be flipped?
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

    //check bg images

    flippedCards = document.getElementsByClassName("flipCard");

    flippedCard1bg = flippedCards[0].lastChild;
    flippedCard2bg = flippedCards[1].lastChild;

    isMatch = flippedCard1bg.isEqualNode(flippedCard2bg);
    console.log(isMatch);

    // if images match, 
    if (!isMatch) {
        //increase score

        //add a revealed class
        flippedCards[0].classList.add("revealed");
        flippedCards[0].classList.add("revealed");
        //set click counter back to zero
        clickOnCards = 0;

    } else {

        // after 4 sec, flip cards back and enable click events
        setTimeout(function () {

            flippedCards[0].classList.toggle("flipCard");
            flippedCards[0].classList.toggle("flipCard"); // using index 0 again because HTML collection was updated after 1st line

            // enable click events only on unrevealed cards
            for (let index = 0; index < cards.length; index++) {
                const element = cards[index];

                if (element.classList.contains("revealed")==false) {
                    element.classList.remove("noClick");
                }
            }

        }, 4000);

        //set click counter back to zero
        clickOnCards = 0;
    }
}