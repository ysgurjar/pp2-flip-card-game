let demoCard1 = document.getElementById("demo-card-1");
let demoCard2 = document.getElementById("demo-card-2");

let demoCards = [demoCard1, demoCard2];

demoCards.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle("flipCard");
    })
});