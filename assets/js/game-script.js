//Get local storage
level=window.localStorage.getItem("level");
cards=window.localStorage.getItem("cards");
flipsMax=window.localStorage.getItem("flipsMax");
timeMax=window.localStorage.getItem("timeMax");

document.getElementById("game-stats").style.display="block";
document.getElementById("game-stats").style.textAlign="center";

document.getElementById("title").style.display="none";

document.body.onload = addElement;

function addElement() {
    // create a new div element
    const newDiv = document.createElement("div");
  
    // and give it some content
    const newContent = document.createTextNode("Hi there and greetings!");
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    debugger;
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("cards-wrapper");
    currentDiv.appendChild(newDiv);
  }