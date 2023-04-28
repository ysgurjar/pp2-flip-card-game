/**
 * The function resets the background color on level selector and make sure only one level is selected
 */

function resetBg() {
    //Get HTMl collection of level selector
    let levels = document.getElementsByClassName("level-selector");

    //reset background color
    for (let index = 0; index < levels.length; index++) {

        const element = levels[index];
        element.style.backgroundColor = '#ffdd92';
    }
}

//Get HTMl collection of level selector
let levels = document.getElementsByClassName("level-selector");

//attach event listener
for (let index = 0; index < levels.length; index++) {

    const element = levels[index];
    element.addEventListener('click', function () {
        debugger;
        resetBg(); //clears backgroun from other selected level
        element.style.backgroundColor = "#5a9cc6";
    })
}


//Get HTML collection of slider
sliders = document.getElementsByClassName("slider");


//Disable slider
for (let index = 0; index < sliders.length; index++) {
    sliders[index].disabled = true;
}