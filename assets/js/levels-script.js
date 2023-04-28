

//Get HTML collection of slider
sliders=document.getElementsByClassName("slider")

//Disable slider
for (let index = 0; index < sliders.length; index++) {
    sliders[index].disabled=true;
}
