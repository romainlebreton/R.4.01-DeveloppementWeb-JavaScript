// Accès au DOM
let sel_cont = document.querySelector("select[name=continent]");
let sel_pays = document.querySelector("select[name=country]");

function initContinents() {
    sel_cont.innerHTML = "<option disabled selected>Choose your country</option>"
    for (let continent in countries) {
        let option = document.createElement("option");
        option.appendChild(document.createTextNode(continent));
        sel_cont.appendChild(option);
    }
}

// Execute this line when document is ready
document.addEventListener("DOMContentLoaded", initContinents);

function loadCountries(cont) {
    let country_list = countries[cont];
    sel_pays.innerHTML = "<option disabled selected>Choose your country</option>"
    for (let i = 0; i < country_list.length; i++) {
        let option = document.createElement("option");
        option.appendChild(document.createTextNode(country_list[i]));
        sel_pays.appendChild(option);
    }
}

// Ajout des gestionnaires d'événements
sel_cont.addEventListener("change", function () {
    console.log("Change in continents :", sel_cont.value);
    loadCountries(sel_cont.value);
});