---
title : Cours 3 <br> Asynchronisme en Javascript
subtitle : Ajax, JSON... et les concepts
layout : slideshow
---

<section>

## Plan du cours

1. Bref rappel sur le protocole *http*

2. Requête synchrone avec XMLHttpRequest (XHR) et ses défauts

3. Requête asynchrone avec XHR
 - via le format XML
 - via le format JSON

</section>
<section>

# Bref rappel sur le protocole *http*

</section>
<section>

Quand on saisit une URL sur un navigateur, une requête HTTP est envoyée au serveur pour renvoyer au client une page web. Techniquement, si on se souvient des cours de réseaux de l'an dernier :

- Un message TCP  est envoyé du client au serveur (domaine) sur le port 80.  
Le message contient des lignes du genre :

<div style="font-size:80%">
~~~
GET /page.html HTTP/1.1 
Host: truc.net
User-Agent: firefox
~~~
{:.http}
</div>

- Un message TCP est renvoyé du serveur vers le client.

<div style="font-size:80%">
~~~
HTTP/1.1 200 OK
Content-Length: 65585
Content-Type: text/html
Last-Modified: Wed, 09 Apr 2014 10:48:09 GMT
<!doctype html>
...
~~~
{:.http}
</div>

</section>
<section>
## Remarques

*Requête :* La première ligne indique :

- la *méthode* de la requête (GET, POST,
  DELETE, PUT)  
  GET : requête sans effet de bord sur le serveur  
  POST : requête pouvant modifier le serveur

- le chemin de la ressource 

- la version du protocole HTTP 
 
Le reste de l'entête fournit diverses informations.

*Réponse :* La première ligne indique :

- la version du protocole HTTP

- l'état (*status*) de la réponse  
  sous forme numérique (erreur si >= 400) et  
  sous forme d'une chaîne de caractères.

</section>
<section>

## Encodage d'une URL

Une URI ne contient que des caractères ASCII.  
D'où un encodage/décodage grâce aux fonctions `encodeURIComponent` et `decodeURIComponent`.

**Exemple**

<div style="font-size:80%">
~~~
console.log(encodeURIComponent("Black & White")); 
 // -> affiche Black%20%26%20White
console.log(decodeURIComponent("Black%20%26%20White")); 
 // -> affiche Black & White
~~~
{:.javascript}
</div>

- 20 est le code ASCII du caractère espace
- 26 est le code ASCII du caractère &

</section>
<section>

# Requête synchrone avec `XMLHttpRequest`

</section>
<section>

## Utilisation de `XMLHttpRequest`  
Il suffit de :  
- créer une instance de cette classe ;  
- configurer la requête (préparer l'ouverture d'une URL) : méthode `open` ;   
- envoyer la requête : méthode `send`.  

Après la requête, le document résultant (ainsi que l'entête, *status*, etc) est disponible dans cet objet.

<div style="font-size:80%">
~~~
var req = new XMLHttpRequest();
req.open('GET', 'http://www.mozilla.org/', false); 
req.send(null); // null: pas de paramètre ajouté à l'URL
console.log(req.status, req.statusText); // -> 200 OK
console.log(req.getResponseHeader("content-type"); // -> text/html
if (req.status == 200)
   console.log(req.responseText); // -> body de la page
~~~
{:.javascript}
</div>

**Remarque :** pas terrible d'un point de vue génie logiciel de récupérer le résultat dans le même objet !

</section>
<section>

## Défauts d'une requête synchrone

C'est le `false` en dernier argument de la méthode `open` de l'objet XHR qui indique que la requête n'est *pas* asynchrone 
et est donc synchrone.  
Autrement dit, le `send` est bloquant.

Inconvénients d'une requête synchrone :

- Programme client bloqué tant que le navigateur et le serveur communiquent.  
D'autant plus gênant que la connexion est mauvaise, le serveur est lent ou le fichier renvoyé est gros !

- Même les événements ne se déclenchent pas sur le navigateur ! **Pourquoi ??**

</section>
<section>

## Défauts d'une requête synchrone

**Parce que les événements en Javascript ne sont déclenchés que lorsque la pile des appels de fonctions est vide !**

[Visualisation de la queue des événements avec l'outil Loupe](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

[Exemple de blocage avec une requête synchrone](http://www.lirmm.fr/~lebreton/PWCR/ExempleBlocageAJAX/)

<div style="font-size:80%">
~~~
function myajax(url, callBack) {
    var httpRequest = new XMLHttpRequest();
    // false désactive l'asynchronisme
    httpRequest.open("GET", url, false);
    httpRequest.send(null);
    callBack(httpRequest);
}
~~~
{:.javascript}
</div>
</section>
<section>

# Requête `a`synchrone avec `XMLHttpRequest` (AJAX)

</section>
<section>

Tout, c'est-à-dire l'`a`synchronisme, est dans le `true` !  
Mais il faut un mécanisme pour notifier au client que la requête est terminée : écoute de l'événement `"load"`

<div style="font-size:80%">
~~~
var req = new XMLHttpRequest(); 
req.open ("GET", "example/data.txt", true); 
req.addEventListener (
      "load", 
      function() { console.log ("Done: ", req.status); }
      );
req.send(null);
~~~
{:.javascript}
</div>

</section>
<section>

## Et AJAX ?

Acronyme de **Asynchronous JavaScript and XML**

C'est globalement ce qu'on vient de voir :

- DOM et JavaScript permettent de modifier l'information présentée dans le navigateur "incrémentalement",
en modifiant un sous-arbre seulement ;

- L'objet XHR sert au dialogue asynchrone avec le serveur Web ;

- XML (ou JSON ou ...) structure les informations transmises entre serveur Web et le navigateur.

</section>
<section>

## Informations échangées au format XML

Exemple d'un fichier *example/fruits.xml* produit par une requête :

<div style="font-size:80%">
~~~
<fruits >
    <fruit name="banana" color="yellow"/> 
    <fruit name="lemon" color="yellow"/> 
    <fruit name="cherry" color="red"/>
</fruits>
~~~
{:.html}
</div>

Récupération de l'information :

<div style="font-size:80%">
~~~
var req = new XMLHttpRequest();
req.open("GET", "example/fruit.xml", false);
req.send(null); 
console.log(req.responseXML.querySelectorAll("fruit").length); 
// → 3
~~~
{:.javascript}
</div>

L'objet *req.responseXML* contient le document structuré  
(un peu comme le DOM).

</section>
<section>

## Informations échangées au format JSON

<div style="font-size:80%">
~~~
var req = new XMLHttpRequest();
req.open("GET", "example/fruit.json", false); 
req.send(null); 
console.log(JSON.parse(req.responseText));
// → {banana: "yellow", lemon: "yellow", cherry: "red"}
~~~
{:.javascript}
</div>

Comment envoyer l'info à partir du serveur Web, en PHP par exemple :

<div style="font-size:80%">
~~~
echo JSON_encode($resultat_requete_sql);
~~~
{:.javascript}
</div>

</section>
<section>

## Un dernier exemple montrant la différence entre appels synchrone et asynchrone

[3 boutons pour 3 comportements différents](http://www.lirmm.fr/~lebreton/PWCR/JavaScriptAsynchrone/)

</section>
<section>

## Sources

* [Eloquent javascript](http://fr.eloquentjavascript.net)
* [Outil Loop par Philip Roberts](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

</section>
<!--
<script>
// document.addEventListener("load",function() {Dz.play(); });
setTimeout(function () {Dz.play();}, 1500);
</script>
-->

<!--
Action de JavaScript pour réafficher la page 

Regarder aussi requestAnimationFrame (et repaint (loupe)), preventDefault, load event, debouncing (en td - 2 façons) et autre trucs exotiques

Sources :
Eloquent JavaScript (et pour les images)
You don't know JavaScript
Loupe (latentflip)
Stackoverflow pour chargement page (meilleure rèf ?)
-->
