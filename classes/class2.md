---
title : Cours 2 <br> Interaction avec la page Web
subtitle : DOM, Évènements
layout : slideshow
lang: fr
---

<!-- <section>

## Plan du cours

### Les Web APIs : <br>des interfaces entre JavaScript et les pages Web

1. Le Web 2.0

2. Le Document Object Model

3. Les évènements en JavaScript

</section> 
-->
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

## JavaScript dans un document HTML

**Différentes syntaxes :**

<div style="font-size:large">

1. Chargement d'un script JavaScript externe

   ```html
   <script defer src="code/hello.js"></script>
   ```

   `defer` : attendre la fin du chargement de la page avant 
   l'exécution du `script`

2. Script directement dans le HTML (peu conseillé)

   ```html
   <script>alert("hello!");</script>
   ```

3. Actions directement dans le HTML (déconseillé)

   ```html
   <button onclick="alert('Boom!')">Do not press</button>
   ```

</div>

<!-- 
defer au cours prochain
-->

<!--
Les scripts externes permettent de séparer le JS du HTML.

Le JS directement dans le HTML est vivement déconseillé car perte de temps de
codage, pas facilement maintenable...
-->

</section>
<section>

## Structure du code

<div style="font-size:large">

De la même manière que nous séparons le style CSS du document HTML, nous
séparerons les actions JavaScript.


**Question :** Pourquoi séparer HTML, CSS et JS ?

* *Clarté :* Cela donne de la structure au code.
   * Le document HTML décrit la **structure** du document et son sens (sa
     *sémantique*). Par exemple, tel élément est un titre `<h1>`, tel élément
     est un menu `class=menu`.
   * Le CSS associe un **style** à chaque élément en fonction de son sens.
   * Le JS rajoute des **interactions** avec le document.
* *Maintenabilité :* Le style étant regroupé dans les feuilles CSS, il est plus
simple de le retrouver et l'éditer. De plus, on évite les répétitions en
associant plusieurs fois le même style à des éléments différents. **C'est
pareil** pour les actions JS.
{:.incremental}

<!-- Permet d'utiliser le même code sur plusieurs pages. Le code JS peut être mis en cache -->

<div class="incremental">
<div>
**Structuration du code JavaScript :**

* Dans un fichier JavaScript séparé
   * Définition des actions
   * Association des actions aux éléments HTML à l'aide des sélecteurs CSS.

* Ainsi, nous séparons le style, les actions et le contenu.
</div>
</div>
</div>
</section>
<section>

# Le Document Object Model

</section>
<section>

## Le DOM

Le modèle objet de document DOM (*Document Object Model*) est une interface de
programmation (API) avec le document HTML.

Le DOM JavaScript est accessible via l'objet `document`.

### Exemples

<div style="">
```javascript
document.documentElement; // Renvoie le <html>
document.head; // Renvoie le <head> de la page
document.body; // Renvoie le <body> de la page
document.URL; // Renvoie l'adresse
document.cookie; // Renvoie les cookies
document.title; // Renvoie le titre
// Renvoie l'URL de la page précédente 
document.referrer; 
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

<p class="myfootnote">
[Source de l'image](https://eloquentjavascript.net/14_dom.html)
</p>

</section>
<section>

## Navigation dans l'arbre

<div>
<div style="display:inline-block; width:50%; margin-right:2%; vertical-align:top">
Les méthodes de base pour naviguer dans l'arbre :

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

**Problème :** En pratique, c'est plus compliqué à cause des espaces et sauts de lignes entre balises : [Démo]({{site.baseurl}}/assets/class2/demos/bonjourRomain.html)

<p class="myfootnote">
[Source de l'image](https://eloquentjavascript.net/14_dom.html)
</p>

<!-- 
document.body.childNodes
document.body.childNodes[0].textContent
-->

<!--
Cela nécessiterait un parcours de l'arbre.
En plus, il y a pleins de nœuds texte "vide" ("↵        )
-->

</section>
<section>

## Différents types de nœuds

Les nœuds de l'arbre sont du type `Node`. Il existe différents types de `Node`, que l'on peut distinguer par leur propriété `nodeType` : 

![NodeType](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKhEIImkLl3BJqdbWh9TSr9pK_DA5Agvye2Y8PK5gGgs2ePSjJ3vaDGAD4bZXAHpVYwcPWkGFCnONTqQEwXzG9DG-33D2267rBmKe2i11)
{: .centered}

**Exemple:**

```javascript
// body est un Element (= une balise)
document.body.nodeType; // → 1
// Son premier fils est un noeud texte
document.body.firstChild.nodeType // → 3
// Son premier fils Element est une balise
document.body.firstElementChild.nodeType // → 1 
```

</section>
<section>

## Navigation sur les `Element`

<br>

| Tous les `Node`   | Seulement les `Element`  |
| ----------------- | ------------------------ |
| `parentNode`      | `parentElement`          |
| `childNodes`      | `children`               |
| `firstChild`      | `firstElementChild`      |
| `lastChild`       | `lastElementChild`       |
| `previousSibling` | `previousElementSibling` |
| `nextSibling`     | `nextElementSibling`     |
{: .centered  .pretty}

</section>

<!--
<section>

## Différents types de nœuds

![Différents nœuds](https://www.plantuml.com/plantuml/svg/ROz1gW8n343tFKKlC5Vu35y51NKr5oZJE1QQ1jgCA7XuXMaBaUoIbmTz7Gkxp2j64-76bidciDpP-f1Xva39c3cwKkoLFBJv404XSLkFq-Mie7_oBmNlmqEX9tGB_F09ddtU4MwdwjXXUF_LgAydziqLg2Lst9-IfVKgVYIYDK7qgye8oQyOFm00)

![a](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuSf9JIjHACbNACfCpoXHICaiIaqkoSpFu-9ApaaiBbRmoqz9XR5TSr9pK_DAk63yaDIA4XZREJyN8WTLfA2hMsC7rGrKXyA7g4KMSaZDIm4w1W00)

![a](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuSf9JIjHACbNACfCpoXHICaiIaqkoSpFu-9ApaaiBbPmpKdDJSqhWN4zGdnzi0WvvQTKOX5soIp38kgPcvYU2XT7Cb51LxV63c4Zmc24BAe3e7RWLW2t3gSIXzIy560m0000s)

</section>
-->

<section>

## Recherche dans le DOM

**Problème :** Trouver un élément particulier n'est pas très pratique

**Solution :** on utilise les méthodes de recherche

* `getElementById`, <span style="float:right">(renvoie **un** élément)</span>
* `getElementsByTagName`, <span style="float:right"> (renvoie un **tableau** d'éléments)</span>
* `getElementsByClassName`. <span style="float:right"> (renvoie un **tableau** d'éléments)</span>


**Exemple :**

```javascript
// Identifiant unique donc on renvoie un élément
var i1 = document.getElementById("id1");
// Tous les enfants de i1 de classe myclass
var tab_e = i1.getElementsByClassName("myclass");
```

<div class="incremental">
**Remarque :** `getElementsByTagName` et `getElementsByClassName` sont des méthodes de `Element` :  
on peut les appeler sur `document` ou toute balise HTML.
</div>

</section>
<section>

## Les sélecteurs

Les *sélecteurs* en CSS permettent de faire des recherches avancées par nom de balise, classe ...

**Sélecteurs simples (`tag` est toujours optionnel)**

<div style="font-size:80%">
~~~css
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
~~~css
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
* **R.** Les paragraphes qui sont des petits-fils exacts de `<body>`

* **Q.** Que sélectionne `ul > * li` ?
* **R.** Les `<li>` qui sont au moins petit-fils d'un `<ul>`
{:.incremental}

<div class="myfootnote">
**Références :** 
[W3schools](http://www.w3schools.com/cssref/css_selectors.asp), [le standard CSS3](http://www.w3.org/TR/css3-selectors/)
</div>

</section>
<section>

## Recherche avancée

<div style="font-size:95%">

* `querySelectorAll(selector)` :  
  **tous** les `Element` satisfaisant le sélecteur, 
* `querySelector(selector)` :  
  le **premier** `Element` satisfaisant le sélecteur


**Notes :**

{: .incremental}
* Raccourci courant : 
  * `$$` pour `document.querySelectorAll`.
  * `$` pour `document.querySelector`.

* Ce sont des méthodes de `Element` : valable sur toute balise

  ```js
  // Recherche parmi les descendants de `element`
  element.querySelector(selector)
  // Recherche parmi les ancêtres de `element`
  element.closest(selector)
  // Indique si `element` satisfait le sélecteur 
  element.matches(selector)
  ```

</div>

<!-- 
querySelector et querySelectorAll sont des méthodes du mixin (ParentNode = Document ou Element) 
-->
<!-- 
$ & $$ dans plusieurs browser : 
https://developer.chrome.com/docs/devtools/console/utilities/
https://firefox-source-docs.mozilla.org/devtools-user/web_console/helpers/index.html
 -->

</section>
<section>

## Modification du contenu

<div style="font-size:93%">

Méthode `innerHTML` de `Element` : 
* représentation texte du contenu d'une balise,  
  en lecture et en écriture
  ```js
  h1.innerHTML = "<u>coucou</u>"
  ```
* ⚠️ échappement des caractères spéciaux du HTML ⚠️ 
  ```js
  h1.innerHTML = "<script>alert('Boom!')</script>"
  h1.textContent = "<script>alert('Boom!')</script>"
  ```
  `element.textContent` <span style="float:right">(équivalent de `htmlspecialchars`)</span>  
  `encodeURI` / `encodeURIComponent` <span style="float:right">(équivalent de `urlencode`)</span>  
  L'insertion de `<script>` ci-dessus [ne marche pas en pratique](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations), 
  mais il reste une faille de sécurité.  
  [Démo]({{site.baseurl}}/assets/class2/demos/diapo13.html)  
{: .incremental}

</div>

</section>
<section>

## Attributs d’une balise

On peut changer la valeur de l’attribut d’une balise *HTML*. On peut
aussi créer un attribut et lui donner une valeur, ou le supprimer.

```js
let input = document.querySelector("input")
input.max=25
input.value=17
input.setAttribute("name", "monInput")
input.removeAttribute("min")
```

[Démo]({{site.baseurl}}/assets/class2/demos/diapo18.html)

<!-- 
Attention à value d'un input ! Live vs défaut 
Cf notes complémentaires
-->

<!-- 
diagramme de classe HTMLInputElement -> HTMLElement -> Element 
-->

</section>
<section>

## Modification des classes

On peut accéder à la liste des classes d’une balise *HTML* (voir
TD1) :

```js
let div = document.querySelector("div")
div.classList
div.classList.remove("c2")
div.classList.add("c4")
div.classList.toggle("cache")
div.classList.toggle("cache")
div.classList.replace("c4", "c2")
```

[Démo]({{site.baseurl}}/assets/class2/demos/diapo24.html)


</section>
<section>

## Insertion de balises *HTML* (1/2)

<!-- On peut insérer brutalement des balises *HTML* en modifiant de façon
textuelle le `innerHTML` de la balise englobante :

Cette façon de faire est efficace quand la hiérarchie des balises à
insérer est simple. -->

```js
let div = document.querySelector("#div_p")
let paragraphes = ["coucou", "hello", "salut"]
for (let paragraphe of paragraphes) {
    pHTML = `<p> ${paragraphe} </p>`
    div.insertAdjacentHTML('beforeend', pHTML)
    // Équivalent à (et plus rapide que)
    // div.innerHTML += pHTML
}
```

* Préférer `insertAdjacentHTML` à `innerHTML += ...` :   
  * équivalent à `div.innerHTML = div.innerHTML + pHTML` 
  * évite de *sérialiser* et *parser* tout le *HTML* existant
  * améliore les performances

[Démo]({{site.baseurl}}/assets/class2/demos/diapo26.html)

<p class="myfootnote">
[Source](https://hacks.mozilla.org/2011/11/insertadjacenthtml-enables-faster-html-snippet-injection/)
</p>

<!-- 
https://hacks.mozilla.org/2011/11/insertadjacenthtml-enables-faster-html-snippet-injection/

innerHTML += serialize pour lire innerHTML et reparse tout pour l'écrire

Sérialiser : transformer en texte
Parser : transformer depuis un texte (vers un arbre de balises)
-->

</section>
<section>

## Insertion de balises *HTML* (2/2)

<!-- On crée un élément `<p>`, on lui donne un `textContent` et des
attributs, on crée le `div_p` qui va l’adopter et on procède à
l’adoption (en fin de fratrie) : -->

```js
let newP = document.createElement("p")
newP.setAttribute("id","p2")
newP.textContent = "paragraphe 2"
let div = document.getElementById("div_p")
div.appendChild(newP)
div
```

[Démo]({{site.baseurl}}/assets/class2/demos/diapo26.html)

<br>

Avantages de `createElement` sur `innerHTML` : 
* Préserve les références aux `Element` existants  
  → préserve les gestionnaires d'évènements de ces `Element`
* Attention à l'échappement HTML au sein de `innerHTML`

<!--
https://stackoverflow.com/questions/2946656/advantages-of-createelement-over-innerhtml 
Avantage / inconvénient ?
* performance à cause du parsing ?
 -->

</section>
<section>

## Suppression de balises *HTML* (1/2)

Si l’objectif est de supprimer l’intégralité des balises qui
descendent d’une balise englobante, on peut brutalement affecter une
chaîne vide au `innerHTML` de la balise englobante…

```js
let div = document.querySelector("#div_p")
div.innerHTML = ""
```

[Démo]({{site.baseurl}}/assets/class2/demos/diapo26.html)


</section>
<section>

## Suppression de balises *HTML* (2/2)

`removeChild` supprime un `Element`, et retourne l’élément supprimé

```js
div.children
div.removeChild(div.children[1])
div
```

<!-- Présenter Element.remove en plus de Node.removeChild -->

</section>
<section>

# Les évènements en JavaScript

</section>

<!-- 
<section>

## Gestionnaires d'évènements

Les systèmes modernes gèrent les évènements à l'aide de gestionnaire
d'évènements (*event handler*).

**Principe :** On donne au système sous-jacent une fonction qui sera lancée dès
que l'évènement associé se produit.

</section> 
-->
<section>

## Gestionnaires d'évènements

**Il y a 3 manières d'associer une action à un évènement**

<!-- Il y a plusieurs façons d'associer une action à un évènement sur un
élément. --> Par exemple, pour exécuter la fonction `act()` lors d'un clic sur
un `<button>` (variable `b`) :

<!-- RL : Hack to have the numbering displayed correctly in Chrome -->
<style type="text/css">
  ol pre {overflow:visible;}
</style>

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

## Gestionnaires d'évènements

**Utilisez la première syntaxe**

```javascript
b.addEventListener('click',act);
```

car

* on peut associer plusieurs actions au même évènement
* on peut supprimer une action d'un évènement

  ```javascript
  b.removeEventListener('click',act);
  ```
* on peut ajouter des [options avancées](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters) : `once`, ... 

<!--
Mauvais appel de la fonction act
addEventListener("add") -> Pourquoi çà marche pas
Plus vicieux
addEventListener(add())
équivalent à 
var x = add();
addEventListener(x);
-> Qu'est-ce que çà fait : 
çà exécute add() tout de suite et ne le lie pas à l'évènement
-->

</section>
<section>

## L'objet évènement

La fonction donnée au gestionnaire reçoit un paramètre :  
<p style="text-align:center">
l'*objet évènement* du type `Event`
</p>


**Exemple:** La propriété `button` indique le bouton cliqué de la souris

<div style="font-size:80%">

```html
<button>Cliquez-moi de toutes les manières</button>
<script>
  var button = document.querySelector("button");
  button.addEventListener("mousedown", function(event) {
    if (event.button == 0)
      console.log("Left button");
    else if (event.button == 1)
      console.log("Middle button");
    else if (event.button == 2)
      console.log("Right button");
  });
</script>
```
</div>

<button class="eventwhich" style="font-size:large">Cliquez-moi de toutes les manières</button>
<script>
  var button = document.querySelector("button.eventwhich");
  button.addEventListener("mousedown", function(event) {
    if (event.button == 0)
      console.log("Left button");
    else if (event.button == 1)
      console.log("Middle button");
    else if (event.button == 2) {
    console.log("Right button");
	event.preventDefault();
	event.stopPropagation();
	}
  });
  button.addEventListener("contextmenu", function (e) {
    e.preventDefault()
    });
</script>

</section>
<section>

## Types d'évènements courants

* Clavier : 
  * `keydown` : À chaque appui ou répétition d'une touche
  * `keyup` : À chaque relâchement d'une touche
* Souris : 
  * `mousedown`, `mouseup`, `click`, `dblclick` : Clics de souris
  * `mousemove`, `mouseenter`, `mouseout` : Déplacements
* Défilement d'écran : `scroll`
* Élément actif : `focus`, `blur`
* Entrée de formulaire : `input`, `change`
* Chargement terminé : 
  * `load` : chargement terminé d'une ressource et de ses dépendances
  * `DOMContentLoaded` : chargement terminé du DOM

<!--
The DOMContentLoaded event is fired when the initial HTML document has been
completely loaded and parsed, without waiting for stylesheets, images, and
subframes to finish loading.

A very different event - load - should be used only to detect a fully-loaded
page. It is an insanely popular mistake for people to use load where
DOMContentLoaded would be much more appropriate, so be cautious.
-->


<div class="myfootnote">
**Références :** [Liste complète des évènements](https://developer.mozilla.org/en-US/docs/Web/Events#event_listing)
</div>

</section>
<section>

## Classes d'évènements

<!-- Here ! -->

**Exemples :**

{: .incremental}
* `class KeyboardEvent` (hérite de `UIEvent`, qui hérite de `Event`)
  * `key` : valeur `String` de la touche  
    *Exemple :* a-z, A-Z, é, €, ArrowUp, Enter
  * `code` : liée à la position physique de la touche,  
    donc pas lié à la disposition du clavier (*azerty*, *qwerty*)
  * `ctrlKey`, `shiftKey`, `altKey`, `metaKey` (`boolean`)
  * `repeat` : `true` si appui long qui amène une répétition

* `class MouseEvent`
  * `screenX`, `screenY`, `clientX`, `clientY` : position
  * `ctrlKey`, `shiftKey`, `altKey`, `metaKey` (`boolean`)
  * `button` : bouton appuyé
  * `detail` : compte le nombre de clic  
    Permet de différencier un clic, d'un double clic

<!-- 
En fait, detail dans UIEvent, mais ce qu'il fait spécifiquer à MouseEvent
-->

</section>
<section>

## Propagation des évènements

<!-- Rajouter la capture d'évènement cf http://www.w3.org/TR/DOM-Level-2-Events/events.html -->

Un gestionnaire d'évènement va recevoir les évènements qui se produisent sur ses fils.

<!--
En fait, un évènement déclenche d'abord le nœud sur lequel il s'est déroulé, puis il déclenche son nœud parent, son nœud grands-parents et ainsi de suite jusqu'à la racine de l'évènement.

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

<p class="propagation">Un paragraphe avec un <button class="propagation" style="font-size:large">bouton</button>.</p>
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

## Propagation des évènements

* `event.stopPropagation()` arrête la propagation vers la racine.  
<!--
Sauf si on clique avec le bouton droit, car on stoppe alors la propagation
-->

* `target` : cible réelle de l'évènement.

* `currentTarget` : balise cible de `addEventListener`.

<!--
https://developer.mozilla.org/en-US/docs/Web/API/Event
L'élément qui a reçu l'évènement est dans currenttarget (et this ?)
http://stackoverflow.com/questions/5125926/javascript-event-currenttarget-vs-this
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
    if (event.button == 2)
      event.stopPropagation();
  });
</script>
```
</div>

<p class="propagation2">Un paragraphe avec un <button class="propagation2" style="font-size:large">bouton</button>.</p>
<script>
  var para = document.querySelector("p.propagation2");
  var button = document.querySelector("button.propagation2");
  para.addEventListener("mousedown", function(event) {
    console.log("Gestionnaire du paragraphe : ", event.target);
  });
  button.addEventListener("mousedown", function(event) {
    console.log("Gestionnaire du bouton : ", event.target);
    if (event.button == 2)
      event.stopPropagation();
  });
  button.addEventListener("contextmenu", function (e) {
    e.preventDefault()
  });
</script>

</section>
<section>

## Utilité de la propagation


Regrouper de nombreux `EventListener` sur un ancêtre commun.  

Par exemple, pour associer un comportement à un sélecteur  
(similaire à l'association d'un style à un sélecteur dans un fichier CSS)

```js
// Loggue tous les évènements des balises 
// de classe "log"
document.addEventListener("click", function(event) {
  if (event.target.matches(".log")) {
    console.log(event);
  }
})
```

<p class="myfootnote">
[Source](https://javascript.info/event-delegation)
</p>

</section>
<section>

## Comportement par défaut

`event.preventDefault()` stoppe l'action par défaut.

**Exemple :**

1. Si on clique sur le bouton "Envoyer" d'un formulaire, cela l'empêche de le
soumettre

2. Sur on clique sur <a href="bla" class="preventDefault">un lien</a>, cela l'empèche de suivre l'URL

3. Si on clique sur une `checkbox` <input type="checkbox" class="preventDefault">, elle ne se coche pas...

<p class="myfootnote">
**Biblio :**

Plus de détails sur la gestion du clavier, les mouvements de la souris, le
déroulement de la page et les actions par défaut sur le
[site de *Eloquent JavaScript*](http://eloquentjavascript.net/14_event.html).
</p>

<script>
for (element of document.querySelectorAll(".preventDefault")) {
  element.addEventListener("click", function(event) {
    event.preventDefault();
  })
}
</script>


</section>

<!-- 
<section>

## Compte à rebours


La fonction `setTimeout` permet de lancer une fonction après un intervalle de
temps donné en ms.  
`clearTimeout` arrête le compte à rebours.


```js
function boom () {console.log("BOOM!");}
var bombTimer = setTimeout(boom, 500);

if (Math.random() < 0.5) {  // 50% chance
  console.log("Defused.");
  clearTimeout(bombTimer);
}
```

<button class="cleartimeout" style="font-size:large">Bombe</button>

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

`setInterval` permet de répéter une fonction indéfiniment après un laps de
temps. On l'interrompt avec `clearInterval`.

</section>
-->

<section>

## Sources

* [Eloquent javascript](http://fr.eloquentjavascript.net)
* [MDN (Mozilla Developer network)](https://developer.mozilla.org/fr/)
* [JavaScript.Info](https://javascript.info/) ([fr](https://fr.javascript.info/))
* [You don't know JavaScript](https://github.com/getify/You-Dont-Know-JS)
* [Google developers](https://developers.google.com/web/fundamentals/)

</section>

<!--
Action de JavaScript pour réafficher la page 

Regarder aussi requestAnimationFrame (et repaint (loupe)), preventDefault, load event, debouncing (en td - 2 façons) et autre trucs exotiques

Sources :
Eloquent JavaScript (et pour les images)
You don't know JavaScript
Loupe (latentflip)
Stackoverflow pour chargement page (meilleure rèf ?)
-->
