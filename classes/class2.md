---
title : Cours 2 <br> Le Document Object Model
subtitle : Une interface JavaScript avec le HTML
layout : slideshow
---

<section>

## Plan du cours

### Les Web APIs : <br>des interfaces entre JavaScript et les pages Web

1. Le Web 2.0

2. Le Document Object Model

3. Les événements en JavaScript

</section>
<section>

# Le Web 2.0

</section>
<section>

## Le rôle du JavaScript

<div class="centered">
<img src="{{site.baseurl}}/assets/RoleJavaScript.png" alt="Rôle du JavaScript" style="width:600px;"/>
</div>

</section>
<section>

## L'évolution du Web

<!-- **Quelques évolutions du Web :** -->

* Web 1.0 : Pages statiques  
  Une adresse = une page qui ne bouge pas

* Web 1.5 : Pages dynamiques 
  * Génération de page côté serveur (ex: PHP)  
    Mais une page ne varie pas entre deux requêtes
  * Script côté client  (ex: JavaScript)  
    Permet des applications côté client (des calculs ...)  
    Permet des activités sur la page sans la recharger  
    (changement de la page, de son style ...)  
  
* Web 2.0 (*Cours prochain*)  
  Communications asynchrones (non liés au chargement des pages) entre le serveur et le client  
  XMLHttpRequest, Ajax, WebSocket ...
{:.incremental}

</section>
<section>

## Insertion de JavaScript dans un document HTML

### Différentes syntaxes

1. Chargement d'un script JavaScript externe

   ```html
   <script src="code/hello.js"></script>
   ```

2. Script directement dans le HTML (peu conseillé)

   ```html
   <script>alert("hello!");</script>
   ```

3. Actions directement dans le HTML (déconseillé)

<div style="font-size:90%">
```html
<button onclick="alert('Boom!');">DO NOT PRESS</button>
```
</div>	

</section>
<section>

# Le Document Object Model

</section>
<section>

## Le DOM

Le modèle objet de document DOM (*Document Object Model*) est une interface de programmation (API) avec le document HTML.

Le DOM JavaScript est accessible via l'objet `document`.

### Exemples

<div style="font-size:90%">
```javascript
// Renvoie le HTML de la page Web, son en-tête, son corps
document.documentElement;
document.body;
document.head;
// Renvoie l'adresse et les cookies de la page Web
document.URL;
document.cookie;
```
</div>


</section>
<section>

## La structure d'arbre du HTML

Les documents HTML ont une structure d'arbre

```html
<!doctype html>
<html>
  <head>
    <title>Ma page d'accueil</title>
  </head>
  <body>
    <h1>Ma page d'accueil</h1>
    <p>Bonjour, je m'appelle Romain.</p>
    <p>Allez voir mon cours de JavaScript à 
      <a href="http://romainlebreton.github.io">
        cette adresse</a>.</p>
  </body>
</html>
```

</section>
<section>

## La structure d'arbre du HTML

Ce code HTML correspond à l'arbre suivant

<div class="centered">
![Structure d'arbre du HTML]({{ site.baseurl }}/assets/html-tree.png)
</div>

</section>
<section>

## La structure d'arbre du HTML

Dans le DOM, on retrouve cette structure d'arbre. Chaque nœud a une propriété `nodeType`. Les plus courants sont :

* les nœuds *balise* : `ELEMENT_NODE`   
  Leur valeur interne `document.ELEMENT_NODE` est `1`

* les nœuds *texte* `TEXT_NODE` 

* les nœuds *commentaires* `COMMENT_NODE`.

**Exemple:**

```javascript
// var li correspond à l'une des balises <li>
console.log(li.nodeType); // → 1
```

</section>
<!-- Remettre createElement, setAttribute, classList, style du TD vers ici -->
<section>

## Navigation dans l'arbre

<div>
<div style="display:inline-block; width:50%; margin-right:2%; vertical-align:top">
Les méthodes de bases pour naviguer dans l'arbre :

* `childNodes`, `parentNode`,
* `firstChild`, `lastChild`,
* `previousSibling`, `nextSibling`

</div>

<div style="display:inline-block; width:40%">
<p style="margin:0">
![Navigation dans l'arbre]({{ site.baseurl }}/assets/html-links.png)
</p>
</div>
</div>

**Problème :** Trouver un élément particulier n'est pas très pratique

<!-- Cela nécessiterait un parcours de l'arbre -->

</section>
<section>

## Recherche dans le DOM

<!-- Souvent, on veut trouver un élément en particulier (un bouton, une zone de texte). -->
Les méthodes de recherche sont:

* `getElementById`,
* `getElementsByTagName`
* `getElementsByClassName`.

Elles renvoient un tableau de nœuds, sauf `getElementById` qui ne renvoie qu'un nœud (un identifiant est unique).


**Exemple :**

```javascript
document.getElementsById("id1");
// Identifiant unique donc on renvoie qu'un élément
document.getElementsByTagName("button");
document.getElementsByClassName("myclass");
// Renvoient un tableau d'éléments
```

</section>
<section>

## Les sélecteurs

Les *sélecteurs* en CSS permettent de faire des recherches avancées par nom de balise, classe ...

**Sélecteurs simples (`tag` est toujours optionnel)**

<div style="font-size:80%">
~~~
*                   /* Sélectionne tout                         */
tag                 /* Toute balise <tag>                       */
tag.class           /* Tout <tag> de classe class               */
#id                 /* La balise identifiée par id              */
tag:pseudoclass     /* Sélection de contenu spécial             */
tag[att=val]        /* Tout <tag> ayant attribut att égal à val */
~~~
{:.css}
</div>

**Exemples:**

* `li:nth-child(2*n)` -- Éléments pairs d'une liste
* `a:hover` -- Lien survolé
* `p::first-letter` -- Première lettre d'un paragraphe

</section>
<section>

## Rappels sur les sélecteurs 

**Combinateurs de sélecteurs**

<div style="font-size:80%">
~~~
sel1, sel2        /* Chacun des sélecteurs                   */
parent child      /* child s'il est un fils de parent        */
parent > child    /* child seulement s'il est un fils direct */
sister ~ brother  /* brother s'il suit sister                */
sister + brother  /* brother s'il suit immédiatement sister  */
~~~
{:.css}
</div>

**Exemples:**


* **Q.** Que sélectionne `body > * > p` ?
* **R.** Les paragraphes qui sont des petit-fils exact de `<body>`

* **Q.** Que sélectionne `ul > * li` ?
* **R.** Les `<li>` qui sont au moins petit-fils d'un `<ul>`
{:.incremental}

<div class="myfootnote">
**Références :** 
[W3schools](http://www.w3schools.com/cssref/css_selectors.asp), [le standard CSS2](http://www.w3.org/TR/CSS2/selector.html) et le [brouillon CSS3](http://www.w3.org/TR/css3-selectors/)
</div>

</section>
<section>

## Recherche avancée

La fonction `document.querySelectorAll(sel)` permet de trouver tous les éléments satisfaisant le sélecteur CSS `sel`.

**Note :** 

* `document.querySelectorAll` a deux raccourcis :  
  `document.$$` et `$$`

* `document.querySelector` sélectionne la première balise.  
   Deux raccourcis `document.$` et `$`

</section>
<section>

# Les événements en JavaScript

</section>
<section>

## Gestionnaires d'événements

Les systèmes modernes gèrent les événements à l'aide de gestionnaire d'événements (*event handler*).

**Principe :**
On donne au système sous-jacent une fonction qu'il essayera de lancer dès que l'événement associé se produit.

</section>
<section>

## Gestionnaires d'événements

### 3 manières d'associer une action à un événement

<!-- Il y a plusieurs façons d'associer une action à un événement sur un élément. -->
Par exemple, pour exécuter la fonction `act()` lors d'un clic sur un `<button>`, on peut :

1. Si la variable JavaScript `b` pointe sur le bouton `<button>`
   1. ```javascript
      b.addEventListener('click',act);
      ```

   2. ```javascript
      b.onclick = act;
      ```

2. ```html
   <button onclick='act()'>
   ```

</section>
<section>

## Gestionnaires d'événements

**Utilisez la première syntaxe**

```javascript
b.addEventListener('click',act);
```

car

* on peut associer plusieurs actions au même événement
* on peut supprimer une action d'un événement

  ```javascript
  b.removeEventListener('click',act);
  ```

</section>
<section>

## L'objet événement

La fonction donnée au gestionnaire reçoit un paramètre : l'*objet événement*.

**Exemple:** La propriété `which` indique le bouton cliqué de la souris

<div style="font-size:80%">

```html
<button>Cliquez-moi de toutes les manières</button>
<script>
  var button = document.querySelector("button");
  button.addEventListener("mousedown", function(event) {
    if (event.which == 1)
      console.log("Left button");
    else if (event.which == 2)
      console.log("Middle button");
    else if (event.which == 3)
      console.log("Right button");
  });
</script>
```
</div>

<div class="codeexample">
<button class="eventwhich" style="font-size:large">Cliquez-moi de toutes les manières</button>
</div>
<script>
  var button = document.querySelector("button.eventwhich");
  button.addEventListener("mousedown", function(event) {
    if (event.which == 1)
      console.log("Left button");
    else if (event.which == 2)
      console.log("Middle button");
    else if (event.which == 3)
      console.log("Right button");
  });
</script>

</section>
<section>

## Des événements courants

* Clavier : 
  * `keydown` : À chaque appui ou répétition d'une touche
  * `keyup` : À chaque relâchement d'une touche
  <!-- * `keypress` : Comme `keydown` mais pour les touches *écrivant* quelque chose -->
* Souris : 
  * `mousedown`, `mouseup`, `click` : Clics de souris
  * `mousemove`, `mouseenter`, `mouseout` : Déplacements
* Défilement d'écran : `scroll`
* Élément actif : `focus`, `blur`
* Chargement terminé : 
  * `load` : chargement terminé d'une ressource et de ses dépendances
  * `DOMContentLoaded` : chargement terminé du DOM

<!--
The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. A very different event - load - should be used only to detect a fully-loaded page. It is an insanely popular mistake for people to use load where DOMContentLoaded would be much more appropriate, so be cautious.
-->


<div class="myfootnote">
**Références :** [Liste complète des événements](https://developer.mozilla.org/en-US/docs/Web/Events)
</div>

</section>
<section>

## Propagation des événements

Un gestionnaire d'événement va recevoir les événements qui se produisent sur ses fils.

<!--
En fait, un événement déclenche d'abord le nœud sur lequel il s'est déroulé, puis il déclenche son nœud parent, son nœud grand-parent et ainsi de suite jusqu'à la racine de l'événement.

Par exemple, un clic sur le bouton va déclencher les deux gestionnaires. 
-->

<div style="font-size:90%">

```html
<p>Un paragraphe avec un <button>bouton</button>.</p>
<script>
  var par = document.querySelector("p");
  var button = document.querySelector("button");

  par.addEventListener("mousedown", function() {
    console.log("Gestionnaire du paragraphe.");
  });
  button.addEventListener("mousedown", function() {
    console.log("Gestionnaire du bouton.");
  });
</script>
```
</div>

<div class="codeexample">
<p class="propagation">Un paragraphe avec un <button class="propagation" style="font-size:large">bouton</button>.</p>
</div>
<script>
  var par = document.querySelector("p.propagation");
  var button = document.querySelector("button.propagation");
  par.addEventListener("mousedown", function() {
    console.log("Gestionnaire du paragraphe.");
  });
  button.addEventListener("mousedown", function() {
    console.log("Gestionnaire du bouton.");
  });
</script>

</section>
<section>

## Propagation des événements

`event.stopPropagation()` arrête la propagation vers la racine.  
La propriété `target` contient la cible réelle de l'événement.

<!--
Sauf si on clique avec le bouton droit, car on stoppe alors la propagation
-->

<div style="font-size:80%">

```html
<p>Un paragraphe avec un <button>bouton</button>.</p>
<script>
  var par = document.querySelector("p");
  var button = document.querySelector("button");
  par.addEventListener("mousedown", function(event) {
    console.log("Gestionnaire du paragraphe : ", event.target);
  });
  button.addEventListener("mousedown", function(event) {
    console.log("Gestionnaire du bouton : ", event.target);
    if (event.which == 3)
      event.stopPropagation();
  });
</script>
```
</div>

<div class="codeexample">
<p class="propagation2">Un paragraphe avec un <button class="propagation2" style="font-size:large">bouton</button>.</p>
</div>
<script>
  var para = document.querySelector("p.propagation2");
  var button = document.querySelector("button.propagation2");
  para.addEventListener("mousedown", function(event) {
    console.log("Gestionnaire du paragraphe : ", event.target);
  });
  button.addEventListener("mousedown", function(event) {
    console.log("Gestionnaire du bouton : ", event.target);
    if (event.which == 3)
      event.stopPropagation();
  });
</script>

**Remarque :** `event.preventDefault()` stoppe l'action par défaut.

Plus de détails sur la gestion du clavier, les mouvements de la souris, le déroulement de la page et les actions par défaut sur le [site de *Eloquent JavaScript*](http://eloquentjavascript.net/14_event.html).


</section>
<section>

## Compte à rebours

<!-- HERE ICI -->

La fonction `setTimeout` permet de lancer une fonction après un intervalle de temps donné en millisecondes. On peut arrêter le compte à rebours à l'aide de `clearTimeout`.


```html
function boom () {console.log("BOOM!");}
var bombTimer = setTimeout(boom, 500);

if (Math.random() < 0.5) {  // 50% chance
  console.log("Defused.");
  clearTimeout(bombTimer);
}
```

<div class="codeexample">
<button class="cleartimeout" style="font-size:large">Bombe</button>
</div>
<script>
  var b = document.querySelector("button.cleartimeout");
  b.addEventListener("click", function () {
    function boom () {console.log("BOOM!");}
    var bombTimer = setTimeout(boom, 500);
    
    if (Math.random() < 0.5) {  // 50% chance
      console.log("Defused.");
      clearTimeout(bombTimer);
    }
  });
</script>



`setInterval` permet de répéter une fonction indéfiniment après un laps de temps. On l'interrompt avec `clearInterval`.

</section>
<!--
<section>

## Summary

Event handlers make it possible to detect and react to events we have no direct control over. The addEventListener method is used to register such a handler.

Each event has a type ("keydown", "focus", and so on) that identifies it. Most events are called on a specific DOM element and then propagate to that element’s ancestors, allowing handlers associated with those elements to handle them.

When an event handler is called, it is passed an event object with additional information about the event. This object also has methods that allow us to stop further propagation (stopPropagation) and prevent the browser’s default handling of the event (preventDefault).

Only one piece of JavaScript program can run at a time. Thus, event handlers and other scheduled scripts have to wait until other scripts finish before they get their turn.

</section>
-->

<section>

## Structure du code

De la même manière que nous séparons le style CSS du document HTML, nous voulons séparer les actions JavaScript du document HTML.


**Question :** Pourquoi séparait-on le style du document HTML ?

* *Clarté :* Cela donne de la structure au code.
   * Le document HTML décrit la structure du document et son sens (sa *sémantique*). Par exemple tel élément est un titre `<h1>`, tel élément est un menu `class=menu`. 
   * Le CSS associe un style à chaque élément en fonction de son sens.
* *Maintenabilité :* Le style étant regroupé dans les feuilles CSS, il est plus simple de le retrouver et l'éditer. De plus, on évite les répétitions en associant plusieurs fois le même style à des éléments différents.
{:.incremental}

**Structuration du code JavaScript :**

* Dans un fichier JavaScript séparé
   * Définition des actions
   * Association des actions aux éléments HTML à l'aide des sélecteurs CSS.

* Ainsi, nous séparons le style, les action et le contenu.
</section>
<section>

## Chargement des pages Web

<!-- Reprendre le stack overflow
** Spécifique à Chrome - V8 ** ?
-->

1. Récupération de la page HTML
2. Lecture du document HTML au fur et à mesure
   1. On crée les nœuds *balise*, *texte*, ... du DOM au fur et à mesure
   2. En cas de feuille CSS, on charge la feuille et ses règles en parallèle du DOM
   3. En cas de balise `<script>`, on charge le JavaScript et on l'exécute immédiatement
      **Attention :** Bloque la construction du DOM et du CSS !
   4. En cas de chargement d'image, vidéo, le fichier est chargé de manière non bloquante

<!-- 

Impossibilité d'interagir avec un document si JavaScript est occupé (bloquant)

lier explication avec l'affichage Network de Chrome Voir "load event" de Eloquent JavaScript 

https://developer.chrome.com/devtools/docs/network#resource-network-timing
DOMContentLoad event marker ... 

http://stackoverflow.com/questions/1795438/load-and-execution-sequence-of-a-web-page 
http://wprof.cs.washington.edu/tests/
https://developers.google.com/web/fundamentals/performance/critical-rendering-path/
http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/
-->

</section>
<section>

## Exemples de chargement

<a href="{{site.baseurl}}/assets/DOMLoadingError.html">Erreur en cas d'interaction trop tôt</a>.

<a href="{{site.baseurl}}/assets/DOMLoading.html">Page montrant le chargement progressif</a>.

**Conséquences :**

* Ne pas interagir avec le document avant qu'il soit chargé
* Attendre l'événement `DOMContentLoaded` pour interagir.  
  Voir l'onglet *Network* pour une visualisation.


</section>
<section>

## Sources

* [Eloquent javascript](http://fr.eloquentjavascript.net)
* [MDN (Mozilla Developer network)](https://developer.mozilla.org/fr/)
* [You don't know JavaScript](https://github.com/getify/You-Dont-Know-JS)
* [Google developers](https://developers.google.com/web/fundamentals/)

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
