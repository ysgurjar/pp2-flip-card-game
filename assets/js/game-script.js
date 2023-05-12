//Get local storage
level=window.localStorage.getItem("level");
cards=window.localStorage.getItem("cards");
flipsMax=window.localStorage.getItem("flipsMax");
timeMax=window.localStorage.getItem("timeMax");

document.getElementById("game-stats").style.display="block";
document.getElementById("game-stats").style.textAlign="center";

document.getElementById("title").style.display="none";