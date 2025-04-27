---
title: Cours 1 &ndash; Compléments avancés sur le langage
subtitle: Curiosités de JavaScript
layout: tutorial
lang: fr
---

<!-- TODO : voir héritage JS : lié au __proto__ du __proto__ ? -->

## Quelques points supplémentaires

Liens externes / Bibliographie :
* [Mozilla Developper Network](https://developer.mozilla.org/fr/docs/Web/JavaScript) : la référence
* [JavaScript.info](https://fr.javascript.info/) : *The Modern JavaScript Tutorial*
* [Eloquent JavaScript](https://eloquentjavascript.net) ou sa [version française](https://fr.eloquentjavascript.net/) plus ancienne.

Pêle-mêle, quelques spécificités avancées du langage JavaScript :

* [Property accessor using bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#bracket_notation)  
    Utile pour accéder à une propriété dont le nom est le résultat d'une fonction, d'un calcul.
* [Rest parameters](https://eloquentjavascript.net/04_data.html#h_hX9DkIBp9y)  
    Utile pour gérer un nombre inconnu d'argument d'une fonction. Converti les arguments en un tableau.  
    À l'inverse, pour donner les arguments d'une fonction avec un tableau, on utilise [le *spread*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).
* *Destructuring*: sur [JavaScript.info](https://javascript.info/destructuring-assignment) ou sur [Eloquent JS](https://eloquentjavascript.net/04_data.html#h_B372u36cp6)  
    Permet de récupérer plus facilement les données d'un tableau, ou les propriétés d'un objet.
* Mode strict : [Eloquent JS](https://eloquentjavascript.net/08_error.html#h_u1jlTq3i42) ou sur [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)  
    Mode d'évaluation de JavaScript qui génère plus de messages d'erreurs.
* [Nested scope](https://eloquentjavascript.net/03_functions.html#i_c/Ms2Ed/N0)  
    Particularité de JavaScript : une fonction a accès aux variables définies dans son scope (portée lexicale) englobant.
* [Closure](https://eloquentjavascript.net/03_functions.html#h_hOd+yVxaku)  
    Manière dont une fonction garde en mémoire les variables de son scope englobant.
* [`this` en Javascript](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3)  
    Explication des règles de résolution de `this`.
* Listes des [ajouts au standard ECMAScript](https://github.com/tc39/proposals/blob/main/finished-proposals.md) par année.

<!-- 
Voir aussi Eloquent JS : Higher order functions : Map.foreach/filter/map/some/findIndex ...
 -->

## Objets et prototypes (version rapide)

### Prototype

Tout objet JS possède un attribut `__proto__` qui contient un objet (ou `null`) que l'on
appelle son prototype.

Quand on veut accéder à une propriété d'un objet en lecture, JS cherche la
propriété dans l'objet. S'il ne la trouve pas, il va la chercher dans le
prototype. S'il ne la trouve toujours pas, dans le prototype du prototype et
ainsi de suite jusqu'à arriver au prototype `null`.

```js
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // On défini le prototype de rabbit à animal

alert( rabbit.jumps ); // true
alert( rabbit.eats ); // true
// La propriété eats n'est pas trouvé dans rabbit, donc JS va la chercher dans son prototype (animal) et la trouve
```

Source sur JavaScript.info : [prototype inheritance](https://javascript.info/prototype-inheritance)

### Syntaxe `class`

Dans le code
```js
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

let user = new User("Brandon")
```
la ligne `let user = new User("Brandon")` est à peu près équivalente à 
```js
user = {}
user.name = "Brandon"
user.__proto__ = {
  constructor: function (name) { this.name = name; }
  sayHi: function() { alert(this.name); }
}
```

Pour être un peu plus précis, le prototype est créé une fois pour toute à la
déclaration de la classe. La syntaxe équivalente serait donc
```js
// Code équivalent à `class User { ... }`
function User(name) {
  this.name = name;
}
// Les fonctions sont des objets et possèdent donc des propriétés
User.prototype = { 
  constructor: User,
  sayHi: function() { alert(this.name); }
}

// Code équivalent à `let user = new User("Brandon")`
user = {}
user.name = "Brandon"
user.__proto__ = User.prototype
```

## Objets et prototypes (version longue)

### Constructeur `new`

On peut utiliser `new` sur n'importe quelle fonction. Dans le code suivant,
```js
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");
```
l'exécution de `new User("Jack");` est équivalent à l'exécution de la fonction
suivante, qui est basée sur la fonction `User` en rajoutant quelques lignes
```js
function () {
  this = {}; // rajout implicite
  
  // Code de la fonction User
  this.name = name;
  this.isAdmin = false;
  
  return this; // rajout implicite
}
```

Source sur JavaScript.info : [constructeur `new`](https://javascript.info/constructor-new)

### Prototype d'une fonction

Les fonctions sont des objets, ils peuvent donc posséder des attributs. Si une
fonction contient un attribut `prototype`, alors cet attribut sera
utilisé pour fixer le prototype d'un objet créé par `new`.

En pratique, dans le code suivant,
```js
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = {eats: true};

let rabbit = new Rabbit("Lapin");

alert( rabbit.eats ); // true
```
l'exécution de `new Rabbit("Lapin");` est équivalent à l'exécution de la fonction
suivante, qui est basée sur la fonction `Rabbit` en rajoutant quelques lignes
```js
function () {
  this = {}; // Rajout implicite
  
  // Code de la fonction Rabbit
  this.name = name;
 
  // Rajouts implicites
  this.__proto__ = Rabbit.prototype; 
  return this;
}
```

#### `F.prototype` par défaut

Toute fonction a un attribut `prototype` par défaut, qui est un objet dont la
seule propriété `constructor` repointe sur la fonction.

```js
function Rabbit() {}

// Propriété 'prototype' par défaut, rajouté implicitement
// Rabbit.prototype = { constructor: Rabbit };
```

#### Syntaxe équivalente au sucre syntaxique `class`

Une `class` est juste une autre syntaxe pour écrire une fonction qui aura pour
but d'être utilisée avec `new`.

```js
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}
```
est à peu près équivalent à 
```js
// rewriting class User in pure functions

// 1. Create constructor function
function User(name) {
  this.name = name;
}
// a function prototype has "constructor" property by default,
// so we don't need to create it

// 2. Add the method to prototype
User.prototype.sayHi = function() {
  alert(this.name);
};
```

Quelques différences par rapport à la syntaxe à base de fonction : 
1. la fonction créée par `class User` ne peut être appelée qu'avec `new`.
2. les classes utilisent `use strict`
3. les méthodes de classes ne sont pas énumérables pour ne pas les voir quand on fait `for..in`.

<!-- The important difference of class fields is that they are set on individual objects, not User.prototype -->

<!-- la syntaxe class { foo() {} } met foo dans le prototype, contrairement à class { foo = function() {} } -->

<!-- class Article { static publisher = "Ilya Kantor"; } est équivalent à Article.publisher = "Ilya Kantor"; -->

Source sur JavaScript.info : [`class`](https://javascript.info/class)