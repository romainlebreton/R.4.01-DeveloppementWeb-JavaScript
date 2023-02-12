
let b = document.body;
let d = document.querySelector('div');

function positionSouris(event) {
   // récupération des coordonnées de la souris
   let x = event.clientX;
   let y = event.clientY;
   d.innerHTML = 'souris à<br><br>x = ' + x + '<br>y = ' + y;
}

function changePositionDiv(event) {
	d.style.top = event.clientY + 'px';
	d.style.left = event.clientX + 'px';
}

b.addEventListener('mousemove',positionSouris);
b.addEventListener('mousemove',changePositionDiv);


