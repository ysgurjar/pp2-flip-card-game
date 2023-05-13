//Get local storage
level = window.localStorage.getItem("level");
cards = window.localStorage.getItem("cards");
flipsMax = window.localStorage.getItem("flipsMax");
timeMax = window.localStorage.getItem("timeMax");

document.getElementById("game-stats").style.display = "block";
document.getElementById("game-stats").style.textAlign = "center";

document.getElementById("title").style.display = "none";


    // dynamically create the card elements
    for (let index = 0; index < 10; index++) {
        addElement();
    }

function addElement() {
    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class","card2");
    
    // create two child divs for front and back of card
    const front=document.createElement("div");
    front.setAttribute("class","front");
    const back=document.createElement("div");
    back.setAttribute("class","back");

    // add text to child divs

    frontText=document.createTextNode("Front side");
    backText=document.createTextNode("Back side")
    
    front.appendChild(frontText);
    back.appendChild(backText);

    // append child divs
    newDiv.appendChild(front);
    newDiv.appendChild(back);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("cards-wrapper");
    currentDiv.appendChild(newDiv);
}

cards=document.querySelectorAll(".card2");

cards.forEach(element => {
    element.addEventListener('click',function () {
        flipCard(element);
    })
});

function flipCard(element) {
    
    element.classList.toggle("flipCard");
}