---
title : Cours 2 <br> Le DOM
subtitle : Une interface avec le HTML
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
   <button onclick="alert('Boom !');"> DO NOT PRESS </button>
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

Dans le DOM, on retrouve cette structure d'arbre. 

Chaque noeud a un type `nodetype`. Les plus courants sont les noeuds correspondant à une balise, qui sont des `ELEMENT_NODE` (leur valeur est `1`, que l'on peut retrouver dans `document.ELEMENT_NODE`.
On trouve aussi, entre autres, des noeuds correspondant à du texte (`TEXT_NODE`) et des commentaires (`COMMENT_NODE`).

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

### Trouver un élément particulier n'est pas très pratique

Cela nécessiterait un parcours de l'arbre

</section>
<section>

## Recherche dans le DOM

Souvent, on veut trouver un élément en particulier (un bouton, une zone de texte).
Les méthodes de recherche sont alors `getElementById`, `getElementsByTagName` et `getElementsByClassName`.

```javascript
document.getElementsById("id1")
// Identifiant unique donc on renvoie qu'un élément
document.getElementsByTagName("button")
document.getElementsByClassName("myclass")
// Renvoient un tableau d'éléments
```

Ces notes renvoient un tableau de noeuds, sauf `getElementById` qui ne renvoie qu'un noeud car un identifiant est unique dans une page Web.

</section>
<section>

## Recherche avancée dans le DOM

</section>
<section>

## Rappel sur les sélecteurs CSS

Sélecteurs de base
\#id .class tag \[attribut\]

Composition de sélecteurs basiques

* `se1sel2` : mis bout à bout, il faut satisfaire tous les sélecteurs (ET logique)
* `sel1, sel2` : il faut satisfaire l'un des sélecteurs (OU logique)
* `sel1 sel2` : les éléments satisfaisants `sel2` qui descesdent d'un élément satisfaisant `sel1`

<!--
descendent strictement
>
> * > 
-->



Références : [W3schools](http://www.w3schools.com/cssref/css_selectors.asp) et [MDN - TODO]()

</section>
<section>

## t

</section>
<section>

## t

</section>
<section>

## t

</section>

<!--
document.$ comme raccourci de document.querySelector
document.$$ comme raccourci de document.querySelectorAll

Faire des Affichages des DOM incomplets lors du chargement d'une page

Sources :
Eloquent JavaScript (et pour les images)
You don't know JavaScript
Loupe (latentflip)
Stackoverflow pour chargement page (meilleure rèf ?)
-->
