---
title: Cours 1 &ndash; Compléments avancés sur le langage
subtitle: Curiosités de JavaScript
layout: tutorial
lang: fr
---

## Quelques points supplémentaires

Pêle-mêle, quelques spécificités avancées du langage JavaScript :

* [Property accessor using bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#bracket_notation)  
    Utile pour accéder à une propriété dont le nom est le résultat d'une fonction, d'un calcul.
* [Rest parameters](https://eloquentjavascript.net/04_data.html#h_hX9DkIBp9y)  
    Utile pour gérer un nombre inconnu d'argument d'une fonction. Converti les arguments en un tableau.  
    À l'inverse, pour donner les arguments d'une fonction avec un tableau, on utilise [le *spread*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).
* [Destructuring](https://eloquentjavascript.net/04_data.html#h_B372u36cp6)  
    Permet de récupérer plus facilement les données d'un tableau, ou les propriétés d'un objet.
* Mode strict : [Eloquent JS](https://eloquentjavascript.net/08_error.html#h_u1jlTq3i42) ou sur [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)  
    Mode d'évaluation de JavaScript qui génère plus de messages d'erreurs.
* [Nested scope](https://eloquentjavascript.net/03_functions.html#i_c/Ms2Ed/N0)  
    Particularité de JavaScript : une fonction a accès aux variables définies dans son scope (portée lexicale) englobant.
* [Closure](https://eloquentjavascript.net/03_functions.html#h_hOd+yVxaku)  
    Manière dont une fonction garde en mémoire les variables de son scope englobant.
* [`this` en Javascript](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3)  
    Explication des règles de résolution de `this`.
* Listes des [ajouts au standard ECMAScript](https://github.com/tc39/proposals/blob/main/finished-proposals.md) par année.

Les références sur le site [Eloquent JavaScript](https://eloquentjavascript.net) existent aussi [en français](https://fr.eloquentjavascript.net/) dans une version plus ancienne du livre.

<!-- 
Voir aussi Eloquent JS : Higher order functions : Map.foreach/filter/map/some/findIndex ...
 -->