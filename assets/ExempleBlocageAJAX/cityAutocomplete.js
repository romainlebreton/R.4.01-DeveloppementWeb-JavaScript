function afficheVilles(cities) {
    var ac = document.querySelector("#myac");

    if (cities.length == 0) {
        ac.style.display = "none";
    } else {
        ac.style.display = "";
    }

    while (ac.firstChild) {
        ac.removeChild(ac.firstChild);
    }

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(city))
        ac.appendChild(p);
    }
}

function myajax(url, callBack) {
    var httpRequest = new XMLHttpRequest();
    // false désactive l'asynchronisme
    httpRequest.open("GET", url, false);
    httpRequest.send(null);
    callBack(httpRequest);
}

function cityRequest(c) {
    myajax("cityRequest.php?name=" + c, cityResponse);
}

function cityResponse(hr) {
    var citiessql = JSON.parse(hr.response);
    var cities = [];
    for (var i = 0; i < citiessql.length; i++) {
        cities.push(citiessql[i].name);
    }
    afficheVilles(cities);
}

var sel_ville = document.querySelector("input[name=city]");
sel_ville.addEventListener("input", function () {
    cityRequest(sel_ville.value);
})


function replace(event) {
    console.log("Replace function", event.target, event.target.tagName);
    var text = event.target.firstChild.textContent;
    var input = document.querySelector("#acdiv input");
    input.value = text;

    var ac = document.querySelector("#myac");
    ac.style.display = "none";

    while (ac.firstChild) {
        ac.removeChild(ac.firstChild);
    }
}

document.querySelector("#myac").addEventListener("click", replace);

// Initialisation
function init2() {
    afficheVilles([]);
}

// Execute this line when document is ready
document.addEventListener("DOMContentLoaded", init2);