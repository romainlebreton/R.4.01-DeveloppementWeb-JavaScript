
function touche(event){
	console.log(event);
	let p1 = document.getElementById("touche");
	p1.innerHTML = 'touche pressée : ' + event.key;
	let p2 = document.getElementById("code");
	p2.innerHTML = 'le code de cette touche est ' + event.code;
}

let b = document.body;
b.addEventListener('keydown',touche);

