
function remplirMonDiv() {
	let contenu = "";
	for(i = 1; i <= 4; i++) {
		contenu += "<p id='p_" + i + "'>";
		contenu += "ceci est le paragraphe " + i;
		contenu += "</p>";  
	}
	document.querySelector('#monDiv').innerHTML = contenu;
}

function viderMonDiv() {
	document.querySelector('#monDiv').innerHTML = "<p>Presque rien dans ce div !</p>";
}



function remplirMonDiv_v2() {
	let monDiv = document.querySelector('#monDiv');
	for(i = 1; i <= 4; i++) {
		let new_p = document.createElement('p');
		new_p.id = 'p_' + i;
		new_p.innerHTML = "ceci est le paragraphe " + i;
		monDiv.appendChild(new_p); 
	}
}


