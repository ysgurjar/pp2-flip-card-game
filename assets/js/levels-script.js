//initialise global objects
let levelData={
    1:{
        memory:1,
        accuracy:1,
        speed:1,

        cards:16,
        flipsMax:99,
        timeMax:"30:00"
    },
    2:{
        memory:1,
        accuracy:2,
        speed:3,

        cards:16,
        flipsMax:70,
        timeMax:"15:00"
    },
    3:{
        memory:3,
        accuracy:3,
        speed:3,

        cards:16,
        flipsMax:40,
        timeMax:"07:00"
    },
    4:{
        memory:5,
        accuracy:4,
        speed:3,

        cards:36,
        flipsMax:99,
        timeMax:"15:00"
    },
    5:{
        memory:5,
        accuracy:5,
        speed:5,

        cards:36,
        flipsMax:99,
        timeMax:"07:00"
    }

};

let predefinedLevel=window.localStorage.getItem("level");
// if user is redirected from the game page then a certain level needs to be selected
if (predefinedLevel=== null || predefinedLevel > 5) {
    window.localStorage.setItem("level",1);
    predefinedLevel=window.localStorage.getItem("level");
} else {
    window.localStorage.setItem("level",predefinedLevel);
    predefinedLevel=window.localStorage.getItem("level");
}

/**
 *  Set the background color on level selector and make sure only one level is selected
 * @param {element} selectedLevelElement 
 */
function resetBg(selectedLevelElement) {

    //First, reset bg color to yellow on all level selectors
    let levels = document.getElementsByClassName("level-selector");

    for (let index = 0; index < levels.length; index++) {
        const element = levels[index];
        element.style.backgroundColor = '#ffdd92'; //resetting color
    }
    // Second, set the light blue color only on selected level
    selectedLevelElement.style.backgroundColor = "#5a9cc6"; //set background for selected level
}

/**
 * Displays rules according to the selected level
 * @param {element} selectedLevel
 */
function resetSlider(selectedLevel) {
    
    //Get values
    let cards=String(levelData[selectedLevel]["cards"]);
    let flipsMax=String(levelData[selectedLevel]["flipsMax"]);
    let timeMax=String(levelData[selectedLevel]["timeMax"]);
    
    //Set values
    document.getElementById("no-of-cards").innerText=cards;
    document.getElementById("no-of-max-flips").innerText=flipsMax;
    document.getElementById("time-limit").innerText=timeMax;
}

/**
 * Resets the slider to represent current level stats
 *  @param {element} selectedLevel
 */
function resetRules(selectedLevel) {
    
    //Get values
    let memory=String(levelData[selectedLevel]["memory"]);
    let accuracy=String(levelData[selectedLevel]["accuracy"]);
    let speed=String(levelData[selectedLevel]["speed"]);

    //Set values
    document.getElementById("memory-slider").setAttribute("value", memory);
    document.getElementById("accuracy-slider").setAttribute("value", accuracy);
    document.getElementById("speed-slider").setAttribute("value", speed);
}

/**
 * Store locally info related to selected level
 *  @param {element} selectedLevel
 */
function setLocalstorage(selectedLevel) {
        
    //Get values
    let cards=String(levelData[selectedLevel]["cards"]);
    let flipsMax=String(levelData[selectedLevel]["flipsMax"]);
    let timeMax=String(levelData[selectedLevel]["timeMax"]);

    //Set local storage
    window.localStorage.setItem("level",selectedLevel);
    window.localStorage.setItem("cards",cards);
    window.localStorage.setItem("flipsMax",flipsMax);
    window.localStorage.setItem("timeMax",timeMax);
}
//Get HTMl collection of level selector
let levels = document.getElementsByClassName("level-selector");

//attach event listener to level selector elements
for (let index = 0; index < levels.length; index++) {
    const levelElement = levels[index];
    const levelSelected = parseInt(levelElement.innerText);
    levelElement.addEventListener('click', function () {
        resetBg(levelElement);          //clears bg from other levels and set bg on selected level
        resetSlider(levelSelected);     //set slider level according to selected level
        resetRules(levelSelected);      //set rules according to selected level
        document.getElementById("level-id-text-on-CTA").innerText = levelElement.innerText; //changing innertext of CTA button;
        
        //set local storage
        setLocalstorage(levelSelected);
       
    });
}

// simulate a click
levels[parseInt(predefinedLevel)-1].click();

//Get HTML collection of slider
let sliders = document.getElementsByClassName("slider");

//Disable slider
for (let index = 0; index < sliders.length; index++) {
    sliders[index].disabled = true;
}

//add event listener to cta btn
let playBtn=document.getElementById("play-btn");

playBtn.addEventListener('click', () => {
    let levelIdTextOnCTA=document.getElementById("level-id-text-on-CTA").innerText;
    if (levelIdTextOnCTA=="?") {
        alert("select level");
        
    } else {
        window.location.href="game.html";
    }
});
