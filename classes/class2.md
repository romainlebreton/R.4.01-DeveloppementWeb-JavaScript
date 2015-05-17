---
title : Cours 2 <br> Le DOM
subtitle : Une interface JavaScript avec le HTML
layout : slideshow
---

<section>

# Javascript et le DOM

</section>
<section>

## Plan du cours

Sous-titre : Les WebAPIs, c-à-d les liens entre Javascript et les pages Web

1. Insertion de Javascript dans une page HTML
2. Le Document Object Model
3. La gestion des évènements en Javascript
4. Le processus de chargement d'une page Web (chargement du DOM, lancement des scripts, chargements des liens annexes)
5. JavaScript est asynchone : ordre d'exécution entre la pile et la callback queue

</section>
<section>

## Insertion de Javascript dans un document HTML

### Différentes syntaxes

1. Chargement d'un script JavaScript externe

   ```html
   <script src="code/hello.js "></script>
   ```

2. Du script directement dans le HTML (peu conseillé)

   ```html
   <script> alert("hello!"); </script>
   ```

3. Et aussi des actions associées à des évènements (déconseillé)

   ```html
   <button onclick="alert('Boom !');">DO NOT PRESS</button>
   ```
	
</section>
<section>

## Le DOM

Le DOM (« Document Object Model », ou modèle objet de document) est une interface de programmation (API) avec le document HTML.

Le DOM JavaScript est accessible via l'objet `document`.

### Exemples

```javascript
// Renvoie resp. le HTML de la page Web, son en-tête et son corps
document.documentElement;
document.body;
document.head;
// Renvoie resp. l'adresse et les cookies de la page Web
document.URL;
document.cookie;
```


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
      <a href="http://romainlebreton.github.io">cette adresse</a>.</p>
  </body>
</html>
```

Ce code HTML correspond à l'arbre suivant

![Structure d'arbre du HTML]({{ site.baseurl }}/assets/html-tree.png)

Dans le DOM, on retrouve cette structure d'arbre. Chaque noeud a une propriété `nodeType`. Les plus courants sont :

* les noeuds *balise* : `ELEMENT_NODE`   
  <br>Leur valeur `document.ELEMENT_NODE` est `1`
* les noeuds *texte* `TEXT_NODE` 
* les noeuds *commentaires* `COMMENT_NODE`.

</section>
<section>

## Naviguation dans l'arbre

<div>
<div style="display:inline-block; width=40%; margin-right:5%; vertical-align:top">
Les méthodes de bases pour naviguer dans l'arbre :

* `childNodes`, `parentNode`,
* `firstChild`, `lastChild`,
* `previousSibling`, `nextSibling`

</div>
<div style="display:inline-block; width=40%">

![Naviguation dans l'arbre]({{ site.baseurl }}/assets/html-links.png)

</div>
</div>

**Problème :** Trouver un élément particulier n'est pas très pratique

<!-- Cela nécessiterait un parcours de l'arbre -->

</section>
<section>

## Recherche dans le DOM

Souvent, on veut trouver un élément en particulier (un bouton, une zone de texte).
Les méthodes de recherche sont alors `getElementById`, `getElementsByTagName` et `getElementsByClassName`.

```javascript
document.getElementsById("id1");
// Identifiant unique donc on renvoie qu'un élément
document.getElementsByTagName("button");
document.getElementsByClassName("myclass");
// Renvoient un tableau d'éléments
```

Ces fonctions renvoient un tableau de noeuds, sauf `getElementById` qui ne renvoie qu'un noeud (un identifiant est unique).

</section>
<section>

## Recherche avancée dans le DOM - Sélecteur CSS

Comment faire des recherches avancées par nom de balise, classe ?

Déjà vu dans les feuilles CSS. <!-- pour appliquer du style à des éléments particuliers. -->
Réutilisons donc les *sélecteurs CSS*:

**Rappel sur les sélecteurs CSS :**

 * **Sélecteurs de base**: `#id`, `.className`, `tagName` (nom de balise) et `[attribut]`

 * **Composition de sélecteurs `sel1` et `sel2`**

   * `se1sel2` : mis bout à bout, il faut satisfaire tous les sélecteurs (ET logique)
   * `sel1, sel2` : il faut satisfaire l'un des sélecteurs (OU logique)
   * `sel1 sel2` : les éléments satisfaisants `sel2` qui descendent d'un élément satisfaisant `sel1`

<!--
descendent strictement
>
> * > 
-->



**Références :** [W3schools](http://www.w3schools.com/cssref/css_selectors.asp) et [MDN - TODO]()

</section>
<section>

## Recherche avancée dans le DOM

La fonction `document.querySelectorAll(sel)` permet de trouver tous les éléments satisfaisant le sélecteur CSS `sel`.

**Note :** 

* `document.querySelectorAll` a deux raccourcis : `document.$$` et `$$`
* `document.querySelector` sélectionne la première balise.
   <br> Deux raccourcis `document.$` et `$`

</section>
<section>

# Les évènements en JavaScript

</section>
<section>

## Notes Eloquent à répartir

Gestion des évènements :
Meilleure façon de gérer les évènements actuellement :

Principe :
on donne au système sous-jacent un code qu'il essayera de lancer dès que l'évènement associé se produit.

</section>
<section>

## L'objet événement

La fonction donnée au gestionnaire reçoit un paramètre : l'objet événement.

Par exemple, pour savoir quel bouton de la souris a été cliqué, on peut accéder à la propriété `which` de l'objet événement.

```html
<button>Click me any way you want</button>
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

<div class="codeexample">
<button class="eventwhich">Click me any way you want</button>
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

## Propagation des événements

Un gestionnaire d'événement va recevoir les événements qui se produisent sur ces fils.

En fait, un événement déclenche d'abord le noeud sur lequel il s'est déroulé, puis il déclenche son noeud parent, son noeud grand-parent et ainsi de suite jusqu'à la racine de l'événement.

Cette propagation vers la racine peut être arrétée à l'aide de la fonction `stopPropagation`. La cible réelle de l'événement se récupère dans la propriété `target`.

Par exemple, un clic sur le bouton va déclencher les deux gestionnaires. Sauf si on clique avec le bouton droit, car on stoppe alors la propagation

```html
<p>A paragraph with a <button>button</button>.</p>
<script>
  var para = document.querySelector("p");
  var button = document.querySelector("button");
  para.addEventListener("mousedown", function() {
    console.log("Handler for paragraph.");
  });
  button.addEventListener("mousedown", function(event) {
    console.log("Handler for button.");
    if (event.which == 3)
      event.stopPropagation();
  });
</script>
```

<div class="codeexample">
<p class="propagation">A paragraph with a <button class="propagation">button</button>.</p>
</div>
<script>
  var para = document.querySelector("p.propagation");
  var button = document.querySelector("button.propagation");
  para.addEventListener("mousedown", function() {
    console.log("Handler for paragraph.");
  });
  button.addEventListener("mousedown", function(event) {
    console.log("Handler for button.");
    if (event.which == 3)
      event.stopPropagation();
  });
</script>

Plus de détails sur les gestion du clavier, des mouvements de la souris, du déroulement de la page et des actions par défaut sur le [site de *Eloquent Javascript*]() TODO 

</section>
<section>

## Compte à rebours

La fonction `setTimeout` permet de lancer une fonction après un interval de temps donné en millisecondes. On peut arréter le compte à rebours à l'aide de `clearTimeout`.


```html
var bombTimer = setTimeout(function() {
  console.log("BOOM!");
}, 500);

if (Math.random() < 0.5) {  // 50% chance
  console.log("Defused.");
  clearTimeout(bombTimer);
}
```

<div class="codeexample">
<button class="cleartimeout">Bombe</button>
</div>
<script>
  var b = document.querySelector("button.cleartimeout");
  b.addEventListener("click", function () {
    var bombTimer = setTimeout(function() {
      console.log("BOOM!");
    }, 500);
    
    if (Math.random() < 0.5) {  // 50% chance
      console.log("Defused.");
      clearTimeout(bombTimer);
    }
  });
</script>



`setInterval` permet de répéter une fonction indéfiniment après un laps de temps. On l'interrompt avec `clearInterval`.

</section>
<section>

## Summary

Event handlers make it possible to detect and react to events we have no direct control over. The addEventListener method is used to register such a handler.

Each event has a type ("keydown", "focus", and so on) that identifies it. Most events are called on a specific DOM element and then propagate to that element’s ancestors, allowing handlers associated with those elements to handle them.

When an event handler is called, it is passed an event object with additional information about the event. This object also has methods that allow us to stop further propagation (stopPropagation) and prevent the browser’s default handling of the event (preventDefault).

Pressing a key fires "keydown", "keypress", and "keyup" events. Pressing a mouse button fires "mousedown", "mouseup", and "click" events. Moving the mouse fires "mousemove" and possibly "mouseenter" and "mouseout" events.

Scrolling can be detected with the "scroll" event, and focus changes can be detected with the "focus" and "blur" events. When the document finishes loading, a "load" event fires on the window.

Only one piece of JavaScript program can run at a time. Thus, event handlers and other scheduled scripts have to wait until other scripts finish before they get their turn.

</section>
<section>

## Association d'évènements 

Il y a plusieurs façons d'associer une action à un évènement sur un élément.<br>
Par exemple, pour exécuter `act()` lors d'un clic sur un bouton `<button>`, on peut :

1. Si la variable Javascript `b` pointe sur le bouton `<button>`
    1. ```javascript
       b.addEventListener('click',act);
       ```
    2. ```javascript
       b.onclick = act;
       ```
2. ```html
   <button onclick='act()'>
   ```

**Utilisez la première syntaxe `addEventListener`** car

* on peut associer plusieurs actions au même évènement
* on peut supprimer une action d'un évènement

  ```javascript
  b.removeEventListener('click',act);
  ```

</section>
<section>

## Les différents évènements possibles

Lien sur MDN

Action utilisateur

Chargement de page (on y reviendra)

</section>
<section>

## Structure du code

De la même manière que nous séparons le style CSS du document HTML, nous voulons séparer les actions JavaScript du document HTML.


**Question :** Pourquoi séparait-on le style du document HTML ?

**Réponse :** 

* *Clareté :* Cela donne de la structure au code.
   * Le document HTML décrit la structure du document et son sens (sa *sémantique*). Par exemple tel élément est un titre `<h1>`, tel élement est un menu `class=menu`. 
   * Le CSS associe un style à chaque élément en fonction de son sens.
* *Maintenabilité :* Le style étant regroupé dans les feuilles CSS, il est plus simple de le retrouver et l'éditer. De plus, on évite les répétitions en associant plusieurs fois le même style à des éléments différents.


**Structuration du code JavaScript :**

* Dans un fichier JavaScript séparé
   * Définition des actions
   * Association des actions aux éléments HTML à l'aide des sélecteurs CSS.

* Ainsi, nous séparons le style, les action et le contenu.
</section>
<section>

## Chargement des pages Web

Reprendre le stack overflow
** Spécifique à Chrome - V8 ** ?

1. Récupération de la page HTML
2. Lecture du document HTML au fur et à mesure
   1. On crée les noeuds *balise*, *texte* au fur et à mesure
   2. En cas de balise `<script>`, on charge le JavaScript et on l'exécute immédiatement
      (action bloquante ?? - exécution bloquante dès le chargement du fichier)
   3. En cas de chargement de style CSS
   4. En cas de chargement d'image, vidéo, le fichier est chargé de manière non bloquante

**Conséquences :**
* Attention à ne pas interagir avec le document avant qu'il soit chargé
* Exemples de problèmes 
* Apprendre à attendre que le document soit chargé 

<!-- lier explication avec l'affichage Network de Chrome -->
<!-- Voir "load event" de Eloquent Javascript -->

</section>

<!--

setAttribute

Les évènements en JavaScript

Impossibilité d'interagir avec un document si JavaScript est occupé (bloquant)
Action de JavaScript pour réafficher la page 

Faire des Affichages des DOM incomplets lors du chargement d'une page

Event loop lors du Cours sur Ajax : asynchronisme de JavaScript

Regarder aussi requestAnimationFrame, preventDefault, debouncing (en td - 2 façons) et autre trucs exotiques

Sources :
Eloquent JavaScript (et pour les images)
You don't know JavaScript
Loupe (latentflip)
Stackoverflow pour chargement page (meilleure rèf ?)
-->
