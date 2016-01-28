---
title : Cours 3 <br> Asynchronisme en Javascript
subtitle : Ajax, JSON... et les concepts
layout : slideshow
---

<section>

## Plan du cours

1. Chargement des pages Web

1. Bref rappel sur le protocole *HTTP*

2. Requête synchrone avec XMLHttpRequest (XHR) et ses défauts

3. Requête asynchrone avec XHR

</section>
<section>

<!--
http://stackoverflow.com/questions/436411/where-is-the-best-place-to-put-script-tags-in-html-markup
https://developers.google.com/speed/docs/insights/BlockingJS
async
defer
-->

## Chargement des pages Web

<!-- Reprendre le stack overflow
** Spécifique à Chrome - V8 ** ?
-->

1. Récupération de la page HTML
2. Lecture du document HTML au fur et à mesure
   1. Nœuds *balise*, *texte* :  
      rajoutée au DOM au fur et à mesure
   2. Feuille CSS externe :  
      chargement de la feuille et application de ses règles **en
      parallèle** du DOM (non bloquant)
   3. JavaScript :  
      chargement du fichier JS puis exécution  
      **Attention :** Bloque la construction du DOM et du CSS !
   4. Balises images, vidéos :  
      le fichier est chargé **en parallèle** (non bloquant)

<!-- 

Impossibilité d'interagir avec un document si JavaScript est occupé (bloquant)

lier explication avec l'affichage Network de Chrome Voir "load event" de Eloquent JavaScript

Seulement un bout de JS peut s'exécuter en même temps. Donc n'importe quel
script, gestionnaire d'évènement, rafraîchissement de la page ... peut bloquer
la page Et les gestionaires d'évènements (et le rafraichissement de la page)
doive attendre que le script courant ai fini !

https://developer.chrome.com/devtools/docs/network#resource-network-timing
DOMContentLoad event marker ... 

http://stackoverflow.com/questions/1795438/load-and-execution-sequence-of-a-web-page 
http://wprof.cs.washington.edu/tests/
https://developers.google.com/web/fundamentals/performance/critical-rendering-path/
http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/
-->

</section>
<section>

<!--
Record
Throttle
DOMContentLoaded & load event fired
https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/resource-loading#resource-network-timing
-->

## Exemples de chargement

<br>
<a href="{{site.baseurl}}/assets/DOMLoadingError.html">Erreur en cas d'interaction trop tôt</a>.

<br>
<br>

<a href="{{site.baseurl}}/assets/DOMLoading.html">Page montrant le chargement progressif</a>.

</section>
<section>

## Solutions

* Attendre la fin de la chargement du `DOM` avant d'interagir avec lui

  **Rappel :** L'événement `DOMContentLoaded` est lancé quand le document a été
  chargé et analysé, sans attendre le chargement des CSS, images, ...

* `<script src="..." async></script>` :  
  Le script est chargé en paralèlle de la lecture du DOM. Une fois chargé, le
  script est exécuté (ce qui met en pause le reste).  
  <!--
  Du coup, on ne perd plus le temps de chargement
  
  On ne peut pas couper au fait que l'exécution du JS bloque le reste puisque le
  JS classique (synchrone) ne fait qu'un truc à la fois
  
  Attention, l'ordre d'exécution des scripts n'est plus garanti
  -->

* `<script src="..." defer></script>` :  
   Le script est chargé en paralèlle de la lecture du DOM. Il ne sera exécuté
   qu'après la lecture du document.
{:.incremental}

<!--
Voir l'onglet *Network* pour une visualisation :
Décocher tout, afficher juste name & timeline, Throttling GPRS
Montrer DOMContentLoaded & load
On voit que DOMContentLoaded n'attend pas les images (ni le CSS??)
Contrairement à load (qui n'attend pas les fontes externes)

-->


</section>


<section>

## Bref rappel sur *HTTP*

Demander une page Web, c'est envoyer une requête HTTP à un serveur HTTP :

~~~
GET /page.html HTTP/1.1 
Host: truc.net
~~~
{:.http}

Le serveur renvoie alors sa réponse HTTP, qui contient la page Web demandée dans
son *corps* :

~~~
HTTP/1.1 200 OK
Content-Length: 65585
Content-Type: text/html
Last-Modified: Wed, 09 Apr 2014 10:48:09 GMT

<!doctype html>
<html>...
~~~
{:.http}

<!-- Quand on saisit une URL sur un navigateur, une requête HTTP est envoyée au -->
<!-- serveur pour renvoyer au client une page Web. Techniquement, si on se souvient -->
<!-- des cours de réseaux de l'an dernier : -->

<!--  - Un message TCP  est envoyé du client au serveur (domaine) sur le port 80.   -->
<!-- Le message contient des lignes du genre : -->

<!--  - Un message TCP est renvoyé du serveur vers le client. -->

<!--    ~~~ -->
<!--    HTTP/1.1 200 OK -->
<!--    Content-Length: 65585 -->
<!--    Content-Type: text/html -->
<!--    Last-Modified: Wed, 09 Apr 2014 10:48:09 GMT -->
<!--    <!doctype html> -->
<!--    ... -->
<!--    ~~~ -->
<!--    {:.http} -->

</section>
<section>
## Remarques

*Requête :*

- la *méthode* de la requête (GET, POST, DELETE, PUT)
  <!-- GET : requête sans effet de bord sur le serveur -->
  <!-- POST : requête pouvant modifier le serveur -->
- le chemin de la ressource
- la version du protocole HTTP
- le *Host*, càd le serveur HTTP

*Réponse :*

- la version du protocole HTTP
- l'état (*status*) de la réponse sous forme numérique et texte  (erreur si &ge; 400) :
  - 200 OK
  - 304 Not Modified
  - 404 Not Found
  - 500 Internal Server Error

</section>
<section>

## Encodage d'une URL

Une URI ne contient que des caractères ASCII.  
D'où un encodage/décodage grâce aux fonctions `encodeURIComponent` et
`decodeURIComponent`.

**Exemple :**

<div style="font-size:80%">
~~~
console.log(encodeURIComponent("Black & White")); 
 // -> affiche Black%20%26%20White
console.log(decodeURIComponent("Black%20%26%20White")); 
 // -> affiche Black & White
~~~
{:.javascript}
</div>

**Remarque :**

- `0x20` est le code ASCII (hexadécimal) du caractère espace
- `0x26` est le code ASCII (hexadécimal) du caractère &

</section>
<section>

# `XMLHttpRequest`

</section>
<section>

## Requête synchrone avec `XHR` 
Il suffit de :

- créer une instance de la classe `XMLHttpRequest`
- initialiser la requête et écriture son en-tête avec `open`
- écrire le corps de la requête et l'envoyer avec `send`

Après `send`, la réponse HTTP (le *status*, le document ...) est écrit dans ce
même objet.

<div style="font-size:80%">
~~~
var req = new XMLHttpRequest();
req.open('GET', 'http://romainlebreton.github.io/', false); 
req.send(null); // null: corps de la requête vide si GET

console.log(req.status, req.statusText); // -> 200 OK
console.log(req.getResponseHeader("content-type")); //->text/html
if (req.status == 200)
   console.log(req.responseText); // -> page Web retournée
~~~
{:.javascript}
</div>

<!-- **Remarque :** pas terrible d'un point de vue du génie logiciel de récupérer le -->
<!--   résultat dans le même objet ! -->

<!--
Faire la démo mais attention :

XHR ne permet que de faire des requêtes sur le même domaine pour des questions
de sécurité

-->

</section>
<section>

## Format d'échange

Donc `XMLHttpRequest` permet de lancer une communication avec le serveur à tout
moment.

**Quelles informations échanger entre le serveur et le client ?**

Naturellement, des pages Web. Mais pas que !

Si je veux que le serveur m'échange des informations plus simples (nombres,
tableaux, chaînes de caractères), il me faut une langue commune au serveur et au
JavaScript (client) :

1. Historiquement, le format XML (mais très proche du HTML)

1. Plus récemment, le format JSON

</section>
<section>

## Informations échangées au format XML

Exemple d'un fichier *fruits.xml* :

<div style="font-size:80%">
~~~
<fruits >
    <fruit name="banana" color="yellow"/>
    <fruit name="lemon" color="yellow"/>
    <fruit name="cherry" color="red"/>
</fruits>
~~~
{:.xml}
</div>

Récupération de l'information auprès du serveur :

<div style="font-size:80%">
~~~
var req = new XMLHttpRequest();
req.open("GET", "../assets/fruit.xml", false);
req.send(null);
req.responseXML.querySelectorAll("fruit").length;
// → 3
~~~
{:.javascript}
</div>

L'objet *req.responseXML* contient le document structuré
(un peu comme le DOM).

</section>
<section>

## Le format JSON

**Qu'est-ce que JSON ?**

**JSON** signifie *JavaScript Object Notation*. C'est un format d'échange de
données (nombres, tableaux, objets ...) qui reprend la syntaxe du JavaScript.

**Exemple :**
<!-- La chaîne de caractères `{banana: "yellow", lemon: "yellow", -->
<!-- cherry: "red"}` encode un objet avec trois attributs ... -->

<div style="font-size:80%">
~~~
JSON.parse('{"banana":"yellow","lemon":"yellow","cherry":"red"}');
// transforme le texte précédent en l'objet JavaScript
// {banana: "yellow", lemon: "yellow", cherry: "red"}
~~~
{:.javascript}
</div>

<br>

**Remarque :** PHP sait aussi lire et écrire le JSON
<!-- Comment envoyer l'info à partir du serveur Web, en PHP par exemple : -->

~~~
echo JSON_encode($var_php);
~~~
{:.javascript}

Donc JSON permet à PHP et JS de communiquer !


</section>
<section>

## Informations échangées au format JSON

Exemple d'un fichier *fruits.json* :

~~~
{"banana":"yellow","lemon":"yellow","cherry":"red"}
~~~
{:.json}

<br>

Récupération de l'information auprès du serveur :

<div style="font-size:80%">
~~~
var req = new XMLHttpRequest();
req.open("GET", "../assets/fruit.json", false); 
req.send(null); 
console.log(JSON.parse(req.responseText));
// → {banana: "yellow", lemon: "yellow", cherry: "red"}
~~~
{:.javascript}
</div>

</section>
<section>

## Défaut d'une requête synchrone

<!-- C'est le `false` en dernier argument de la méthode `open` de l'objet XHR qui indique que la requête n'est *pas* asynchrone  -->
<!-- et est donc synchrone.  -->

Inconvénients d'une requête synchrone :

- **Le `send` est bloquant**, c'est-à-dire que le JavaScript reste bloqué sur
`send` tant que l'on a pas reçu la réponse du serveur.

- C'est d'autant plus gênant que la connexion est mauvaise, le serveur est lent
  ou le fichier renvoyé est gros !

<div class="myfootnote">
**Remarque :** C'est le `false` de `req.open('GET', url, false)` qui fait que la
  requête est asynchrone.
</div>

</section>
<section>

## Défaut d'une requête synchrone

<br>

[Exemple de blocage avec une requête synchrone](http://www.lirmm.fr/~lebreton/PWCR/ExempleBlocageAJAX/)

<br>

<div style="font-size:80%">
~~~
url = "cityRequest.php?name=Vi";
var httpRequest = new XMLHttpRequest();
// false désactive l'asynchronisme
httpRequest.open("GET", url, false);
httpRequest.send(null);
console.log(httpRequest.response);
~~~
{:.javascript}

<!-- ~~~ -->
<!-- function myajax(url, callBack) { -->
<!--     var httpRequest = new XMLHttpRequest(); -->
<!--     // false désactive l'asynchronisme -->
<!--     httpRequest.open("GET", url, false); -->
<!--     httpRequest.send(null); -->
<!--     callBack(httpRequest); -->
<!-- } -->
<!-- ~~~ -->
<!-- {:.javascript} -->

</div>


</section>
<section>

## Défaut d'une requête synchrone

Même les événements ne se déclenchent pas sur le navigateur ! **Pourquoi ??**

<br>

<div class="incremental">
<div>

**Parce que les événements en Javascript ne sont déclenchés que lorsque la pile des appels de fonctions est vide !**

[Visualisation de la queue des événements avec l'outil Loupe](http://sameoldmadness.github.io/loupe/)

</div>
</div>

<!--
Ancien lien :
(http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

Autre demo :
function a() { b(); }
function b() { c(); }
function c() { d(); }
function d() { console.log('hi'); }
document.body.addEventListener('click',
  function () {
    setTimeout(function () {
    a();
  }, 1000);
});

-->

</section>
<section>

## Requête `a`synchrone avec `XHR`

On active l'`a`synchronisme avec `req.open('GET', url, true)`

<br>

Mais il faut un mécanisme pour notifier au client que la requête est terminée :

<div class="centered">
Écoute de l'événement `"load"`
</div>

<br>

**Exemple :**
<div style="font-size:90%">
~~~
var req = new XMLHttpRequest(); 
req.open ("GET", "http://romainlebreton.github.io", true); 
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

- XML (ou JSON ou ...) structure les informations transmises entre le serveur Web et le navigateur.

</section>
<section>

## Un dernier exemple montrant la différence entre appels synchrones et asynchrones

[3 boutons pour 3 comportements différents](http://www.lirmm.fr/~lebreton/PWCR/JavaScriptAsynchrone/)

</section>
<section>

## Sources

* [Eloquent javascript](http://fr.eloquentjavascript.net)
* [Outil Loupe par Philip Roberts](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

</section>
<!--
<script>
// document.addEventListener("load",function() {Dz.play(); });
setTimeout(function () {Dz.play();}, 1500);
</script>
-->

<!--
Action de JavaScript pour réafficher la page 

Regarder aussi requestAnimationFrame (et repaint (loupe)), preventDefault, load event, debouncing (en td - 2 façons) et autres trucs exotiques

Sources :
Eloquent JavaScript (et pour les images)
You don't know JavaScript
Loupe (latentflip)
Stackoverflow pour chargement page (meilleure rèf ?)
-->
