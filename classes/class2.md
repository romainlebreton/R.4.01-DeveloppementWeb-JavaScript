---
title : Cours 2 <br> Le DOM
subtitle : Une interface avec le HTML
layout : slideshow
---

<section>

# Javascript et le DOM

</section>
<section>


Insertion de Javascript dans un document HTML
----------------------------------------------

```html
<script> alert ("hello!") ; </script>
<script src =" code/hello.js "> </script>
```

# aussi dans les évènements 
```html
<button onclick =" alert ( 'Boom !') ;"> DO NOT PRESS </button>
```

</section>
<section>


Le DOM
------
Le DOM (« Document Object Model », ou modèle objet de document) est une interface de programmation (API) avec le document HTML

Les documents HTML ont une structure d'arbre que l'on retrouve dans le DOM
#Insérer code HTML, et représentation arbre

</section>
<section>


Naviguer dans l'arbre:
----------------------
- Méthodes pour naviguer dans l'arbre
# Insérer image page 233

Mais çà ne serait pas pratique !
Ce que l'on veut, c'est trouver un élément en particulier (un bouton, une zone de texte)

- Méthodes de recherche
```javascript
document.getElementsById("id1")
// Identifiant unique donc on renvoie qu'un élément
document.getElementsByTagName("button")
document.getElementsByClassName("myclass")
// Renvoient un tableau d'éléments
```

Renvoie un (tableau de) noeud + ces méthodes s'appliquent à n'importe quel noeud

!! querySelector !! 

</section>

