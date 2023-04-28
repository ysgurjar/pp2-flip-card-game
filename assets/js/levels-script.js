/**
 * The function resets the background color on level selector and make sure only one level is selected
 */

function resetBg(selectedLevel) {

    //First, reset bg color to yellow on all level selectors
    let levels = document.getElementsByClassName("level-selector");

    for (let index = 0; index < levels.length; index++) {
        const element = levels[index];
        element.style.backgroundColor = '#ffdd92'; //resetting color
    }
    // Second, set the light blue color only on selected level
    selectedLevel.style.backgroundColor = "#5a9cc6"; //set background for selected level
}

//Get HTMl collection of level selector
let levels = document.getElementsByClassName("level-selector");

//attach event listener
for (let index = 0; index < levels.length; index++) {
    const levelElement = levels[index];
    const levelSelected = parseInt(levelElement.innerText);
    element.addEventListener('click', function () {
        resetBg(levelElement);          //clears bg from other levels and set bg on selected level
        resetSlider(levelSelected);     //set slider level according to selected level
        resetRules(levelSelected);      //set rules according to selected level
        document.getElementById("level-id-text-on-CTA").innerText = element.innerText; //changing innertext of CTA button;
    })
}

//Get HTML collection of slider
sliders = document.getElementsByClassName("slider");

//Disable slider
for (let index = 0; index < sliders.length; index++) {
    sliders[index].disabled = true;
}