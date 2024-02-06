<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>


 <style type="text/css">
#blinking {text-decoration: blink;}
.hidden {visibility:hidden;}
</style>

    </head>
    <body>

	<span id="blinking" class="hidden" >Je clignote si la page n'est pas figée!</span>

        <p>
            <button id="sr">Lancer une requête synchrone</button>
        </p>
        <p>
            <button id="ar">Lancer une requête asynchrone</button>
        </p>

	<p>
            <button id="ar-order">Lancer une requête asynchrone ordonnée</button>
        </p>

 	<p>
            <button id="clean-up">Supression des anciens logs</button>
        </p>



        <div id="reponse">
            <p>
                Réponse des requêtes.
            </p>

        </div>
        <script>

            function asyncRequest(url, callBack) {
                let httpRequest = new XMLHttpRequest();
                httpRequest.open("GET", url, true);
                httpRequest.addEventListener("load", function () {
                    callBack(httpRequest);
                });
                httpRequest.send(null);
            }

            function syncRequest(url, callBack) {
                let httpRequest = new XMLHttpRequest();
                httpRequest.open("GET", url, false);
                httpRequest.send(null);
                callBack(httpRequest);
            }

            function writeAnswer(a) {
                let div = document.querySelector("#reponse");
                let p = document.createElement("p");
                p.innerHTML = a;
		console.log(a);
                div.appendChild(p);
            }

            function launchasyncRequest() {
                writeAnswer("Lancement de la requête 1");
                asyncRequest("myRequest.php?order=1", function (req) {
                    writeAnswer("Arrivé de la réponse 1");
                });
                writeAnswer("Lancement de la requête 2");
                asyncRequest("myRequest.php?order=2", function (req) {
                    writeAnswer("Arrivé de la réponse 2");
                });
                writeAnswer("Lancement de la requête 3");
                asyncRequest("myRequest.php?order=3", function (req) {
                    writeAnswer("Arrivé de la réponse 3");
                });
            }

            function launchsyncRequest() {
                writeAnswer("Lancement de la requête 1");
                syncRequest("myRequest.php?order=1", function (req) {
                    writeAnswer("Arrivé de la réponse 1");
                });
                writeAnswer("Lancement de la requête 2");
                syncRequest("myRequest.php?order=2", function (req) {
                    writeAnswer("Arrivé de la réponse 2");
                });
                writeAnswer("Lancement de la requête 3");
                syncRequest("myRequest.php?order=3", function (req) {
                    writeAnswer("Arrivé de la réponse 3");
                });
            }

	function launchRequestAsyncOrdered(){
   		writeAnswer("Lancement de la requête 1");
                asyncRequest("myRequest.php?order=1", function (req) {
			writeAnswer("Arrivé de la réponse 1");
  			writeAnswer("Lancement de la requête 2");
			asyncRequest("myRequest.php?order=2", function (req) {
                    		writeAnswer("Arrivé de la réponse 2");
				writeAnswer("Lancement de la requête 3");
		                asyncRequest("myRequest.php?order=3", function (req) {
                			writeAnswer("Arrivé de la réponse 3");
		                });
	                });
                });

	}


            document.querySelector("#ar").addEventListener("click",launchasyncRequest);
            document.querySelector("#sr").addEventListener("click",launchsyncRequest);
  	    document.querySelector("#ar-order").addEventListener("click",launchRequestAsyncOrdered);
            document.querySelector("#clean-up").addEventListener("click",function()
			{
			 document.querySelector("#reponse").innerHTML = "";
			});


	setInterval(function(){
		document.querySelector("#blinking").classList.toggle("hidden");
	},500);

        </script>
    </body>

</html>
