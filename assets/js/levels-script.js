//initialise global objects

levelData={
    1:{
        memory:1,
        accuracy:1,
        speed:1,

        cards:16,
        flipsMax:999,
        timeMax:"59:59"
    },
    2:{
        memory:1,
        accuracy:2,
        speed:3,

        cards:16,
        flipsMax:999,
        timeMax:"30:00"
    },
    3:{
        memory:2
    }
}

/**
 * The function resets the background color on level selector and make sure only one level is selected
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
 * The function displays rules according to the selected level
 */
function resetSlider(selectedLevel) {
    
    //Get values
    cards=String(levelData[selectedLevel]["cards"]);
    flipsMax=String(levelData[selectedLevel]["flipsMax"]);
    timeMax=String(levelData[selectedLevel]["timeMax"]);
    
    //Set values
    document.getElementById("no-of-cards").innerText=cards;
    document.getElementById("no-of-max-flips").innerText=flipsMax;
    document.getElementById("time-limit").innerText=timeMax;
}

/**
 * The function resets the slider to represent current level stats
 */
function resetRules(selectedLevel) {
    
    //Get values
    memory=String(levelData[selectedLevel]["memory"]);
    accuracy=String(levelData[selectedLevel]["accuracy"]);
    speed=String(levelData[selectedLevel]["speed"]);

    //Set values
    document.getElementById("memory-slider").setAttribute("value", memory);
    document.getElementById("accuracy-slider").setAttribute("value", accuracy);
    document.getElementById("speed-slider").setAttribute("value", speed);
}

//Get HTMl collection of level selector
let levels = document.getElementsByClassName("level-selector");

//attach event listener
for (let index = 0; index < levels.length; index++) {
    const levelElement = levels[index];
    const levelSelected = parseInt(levelElement.innerText);
    levelElement.addEventListener('click', function () {
        resetBg(levelElement);          //clears bg from other levels and set bg on selected level
        resetSlider(levelSelected);     //set slider level according to selected level
        resetRules(levelSelected);      //set rules according to selected level
        document.getElementById("level-id-text-on-CTA").innerText = levelElement.innerText; //changing innertext of CTA button;
    })
}

//Get HTML collection of slider
sliders = document.getElementsByClassName("slider");

//Disable slider
for (let index = 0; index < sliders.length; index++) {
    sliders[index].disabled = true;
}