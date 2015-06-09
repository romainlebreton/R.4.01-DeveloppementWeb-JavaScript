---
title : Cours 1 <br> Bases du JavaScript
subtitle : un tour d'horizon
layout : slideshow
---

<section>

## Objectif du cours

### Vous présenter JavaScript et tout ce qui le rend très différent de Java, C...

</section>
<section>

## Historique 1/3

Le prototype de JavaScript a été conçu par Brendan Eich en 10 jours chez Netscape pour ajouter une manière d'associer du code (Java à l'origine) à des éléments HTML.

<div class="incremental">
JavaScript a été présenté en 1995 avec l'objectif de pouvoir avoir des programmes en plus des pages Web dans le navigateur Netscape. Depuis, JavaScript a été adopté par tous les navigateurs.

JavaScript a grandement contribué à rendre possibles les applications Web modernes, c'est-à-dire les applications permettant d'agir directement avec la page Web, c'est-à-dire sans rechargement de cette page Web. 

<div class="myfootnote">
#### Sources 

[A Short History of JavaScript](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript)
</div>
</div>
</section>
<section>

## Historique 2/3

Le nom JavaScript a été choisi pour des raisons commerciales, car Java était très en vogue à la création de JavaScript. La syntaxe de JavaScript est plus proche du C.

<div class="incremental">
Après son adoption générale, le langage JavaScript a été standardisé, c'est-à-dire qu'on a fixé tous les aspects de ce langage sur papier. 
	
Actuellement, nous en sommes à ECMAScript version 5. La version 6 est prévue en 2015 .

**Question:** Quel est l'intérêt d'avoir des standards ?

<!--
R/ Pour faciliter l'interopérabilité (qu'un code JavaScript marche pareil sur tous les navigateurs) et donc faciliter l'adoption de JavaScript.

Contre-exemple pour le HTML : Guerre des navigateurs dans les années 2000 où Internet Explorer a profité de sa position dominante (95%, même sur Mac) pour imposer ses développements du HTML (et des technos Web en général : CSS ...). Il fallait presque écrire un site Web par navigateur.

Nom du standard : ECMAScript standard (synonyme de JavaScript dans les faits).

// getElementbyId problem
// Trouver une capture d'écran d'un "Ce site est optimisé pour Internet Explorer en résolution 800x600"
-->

<div class="myfootnote">
#### Liens complémentaires

[Discussions actuelles autour du futur standard ECMAScript 6](https://github.com/tc39)
</div>
</div>

</section>
<section>

## Historique 3/3

Autres domaines d'application du JavaScript:

- pour la gestion de bases de données (MongoDB, CouchDB, ...)
- comme langage de scripting côté serveur (Node.js, ...)

Une tendance est de ne plus utiliser qu'un langage dans la pile Web, par exemple de remplacer le PHP par du JavaScript.

</section>

<section>

# Les bases du JavaScript

</section>
<section>

## Déclaration de variable

<!-- 
Mot-clé 'var' (pas de déclaration de type comme en Java)
Mettre un ';' à la fin de chaque ligne (optionnel, mais recommandé)
-->


```javascript
// Déclaration 
var x;
// Affectation
x = 1;
// Les deux combinés
var x = 1;
```


</section>
<section>

## La console JavaScript

Une console JavaScript est présente dans les outils de développement de Firefox ou Chrome (raccourci clavier `F12`)

**Exemple :**

```javascript
var x = 1;
x;
```

```javascript
console.log(x);
```

```javascript
alert("Coucou !")
```


</section>
<section>

## Les types en JavaScript 1/2

Toute valeur a un type en JavaScript. Mais ce type n'est pas spécifié lors de la déclaration d'une variable. 
<!-- On parle d'un langage faiblement typé -->

```javascript
var x = 1;
typeof x;
// → number
var y = "Vous êtes bien réveillés ?";
typeof y;
// → string
```

Les types sont dynamiques

```javascript
var x;               // Now x is undefined
var x = 5;           // Now x is a Number
var x = "John";      // Now x is a String
```

</section>
<section>

## Les types en JavaScript 2/2

Il y a 6 types en JavaScript :

 * 5 types primitifs (`Boolean`,  `Number`, `String`, `Null`, `Undefined`) 
 * les objets `Object`.

`Undefined` est le type des variables qui n'ont pas été définies.<br>
`Null` est le type de `null`, l'objet qui pointe à une adresse qui n'existe pas.

```javascript
var x;
typeof x;
// → undefined
```


</section>
<section>

## Chaînes de caractères:

Entre guillemets simples `'coucou'` ou `"coucou"` doubles

Échappement de caractère avec **\\** : `\"` &#8594; **"**, `\n` &#8594;  **&#8626;**, ...

<div>
Concaténation avec + : 

```javascript
console.log("con" + "cat" + "é" + "nation");
// → "concaténation"
```
</div>

**Exercice :** Comment créer la chaîne de caractères &laquo;Un retour à la ligne s'écrit "\n".&raquo;

<div class="incremental">
```javascript
console.log("Un retour à la ligne s'écrit \"\\n\".");
// → "Un retour à la ligne s'écrit "\n".
```
</div>

</section>
<section>	

## Les tableaux 

Les tableaux ne sont pas typés

```javascript
var t = [1,3.14159,10e10,"un autre type"];
```

Quelques fonctions usuelles

```javascript
console.log(t[0]);
// → 1
console.log(t.length);
// → 4

t = t.slice(1,3); console.log(t);
// → [3.14159, 100000000000]

t.push(5); console.log(t);
// → [3.14159, 100000000000, 5]
```

<!-- ATTENTION : complexité d'un vidage de tableau par slice(1)-->

<!-- for (var i of tableau) Nouvelle syntaxe pratique -->

</section>
<section>

## Les objets

<!-- Affectation d'un objet littéral -->
```javascript
var point = {coord1:1, coord2:3, size: "normal"};
console.log(point);
// → Object {coord1: 1, coord2: 3, size: "normal"}
```

Accès aux propriétés : `point.coord1` ou `point["coord1"]`.<br>
Avantage de la syntaxe `obj[expr]` : `expr` est évalué

```javascript
for (var i = 1; i < 3; i++)
  point["coord" + i] = 0;
console.log(point);
// → Object { coord1: 0, coord2: 0, size: "normal"}
```

<!-- Contrairement au Java qui est un langage de classe, c-à-d où la structure de l'objet est rigidifiée-->
En JavaScript on peut rajouter des attributs dynamiquement.

```javascript
point.coord3 = 1;
// → Object { coord1: 0, coord2: 0, coord3: 1, ... }
```

</section>
<section>

## Logique

On retrouve les opérateurs classiques: 

* de comparaisons : `==`, `!=`, `>`, `<`, `>=`, `<=`
* de logique : `&&` (and), `||` (or), `!` (not), `^` (xor), 
* `if/then/else` condensé : <br>
`(condition?actiontrue:actionfalse)`


```javascript
console.log (3 > 2)
// → true
console.log ("Itchy" != "Scratchy")
// → true
// Ordre du dictionnaire avec A-Z < a-z (on se sert du codage ASCII (ou Unicode))
console.log ("Aardvark" < "Zoroaster")
// → true
```

</section>
<section>

## JavaScript est très permissif !

Conversions automatiques de type

```javascript
console.log (8 * null);
// → 0
```

En effet, `*` est nécessairement la multiplication de deux nombres donc `null` est converti en un nombre

```javascript
Number(null);
// → 0
// ATTENTION : çà ne marche que dans les cas simples
Number("five");
// → NaN
Number("5");
// → 5
Number(undefined);
// → NaN
```

</section>
<section>

## Quizz 1/3

**Question :** Que rend le code suivant ?

```javascript
console.log ("5" - 1);
```

<div class="incremental">
**Réponse :** `4`, car `-` est nécessairement la soustraction de deux nombres donc `"5"` est converti en un nombre
</div>
</section>
<section>

## Quizz 2/3


**Question :** Que rend le code suivant ?

```javascript
console.log ("5" + 1);
```

<div class="incremental">
**Réponse :** `"51"` ! <br>
Il y a ambiguïté entre addition de nombres et concaténation de chaînes de caractères. L'opérateur le plus prioritaire en JavaScript est la concaténation
</div>
</section>
<section>

## Quizz 3/3


**Question :** Que rend le code suivant ?

```javascript
console.log( 1 + 1 + "1" + 1 + 1);
```


<div class="incremental">
<div>
**Réponse :** `"2111"` ! <br>
En effet, le code est interprété comme suit

```javascript
   ((((1 + 1) + "1") + 1) + 1)
 = (((2 + "1") + 1) + 1)
 = (("21" + 1) + 1)
 = "211" + 1
 = 2111
```
</div>
</div>
</section>
<section>

## Logique (suite)

Autre type de comportement non voulu

```javascript
console.log(false == "0");
// → true
```

Du coup, on utilise `===` (et sa négation `!==`)
qui teste l'égalité de type puis de valeur (comme en PHP).

```javascript
console.log(false === "0");
// → false
```

</section>
<section>

## Subtilité des opérateurs logiques

L'opérateur logique `||` (OR) ne renvoie pas nécessairement un booléen

```javascript
console.log("Romain" || false);
// → "Romain"
```

En fait, `(expr1 || expr2)` est exactement comme la fonction suivante

```javascript
function myOR (expr1,expr2) {
  if (Boolean(expr1))
    return expr1;
  else 
  return expr2;
}
```

</section>
<section>

## Subtilité des opérateurs logiques
**Intérêt :** cela permet de programmer une valeur par défaut

```javascript
var input = prompt("Quel est votre nom ?");
print("Bien le bonjour " + (input || "cher ami"));
```

Si on clique sur annuler, alors `input` vaut `null` 
et `(input || "cher ami")` renvoie `"cher ami"`

<br>
<br>
**Évaluation paresseuse:**
Si `Boolean(expr1)` est vrai alors `expr2` n'est pas évalué
<!-- évaluation paresseuse ou short-circuiting -->

</section>
<section>

## If, for, while et switch

Comme en Java, C++

```javascript
if (condition) {
   instructions1
} else {
   instructions2
}
```
```javascript
for ([init]; [cond]; [expr])
   instruction
```
```javascript
while (condition) {
  instruction
}
```
<!--
```javascript
switch (expression) {
  case valeur1:
    instructions1;
    [break;]
  case valeur2:
    instructions2;
    [break;]
    ...
  default:
    instructions_def;
    [break;]
}
```
-->
</section>
<section>

## Fonctions

Déclaration comme en Java, C++

```javascript
function square(x) {
  return x * x;
};
```

Les variables peuvent stocker des fonctions ! Le code dessus est équivalent à

```javascript
var square = function (x) {
  return x * x;
};
```

Les fonctions sont des objets de première classe : elles peuvent être manipulées et échangées comme tous les autres objets JavaScript. 

</section>
<section>

## Fonctions

1. Une fonction renvoie toujours quelque chose.
   Par défaut, la fonction renvoie `undefined`.

2. Une fonction peut prendre en argument une fonction

   ```javascript
   function boum() {alert('Boum!');}
   setTimeout(boum,2000);
   ```

3. Une fonction peut renvoyer une fonction

   ```javascript
   function puissance (x) {
     return function (y) {
       return Math.pow(y,x);
     }
   }
   var square = puissance(2);
   var cube = puissance(3);
   console.log(square(256),cube(256));
   ```

</section>
<section>

## Méthodes des objets

**Question :** Comment définir une méthode d'un objet ?

<div class="incremental">
<div>
**Réponse :** Il suffit d'assigner une valeur de type `function` à un attribut. <br> 


```javascript
var point = {coord1:1, coord2:3, size: "normal"};
point.print = function() {
  console.log("Mes coordonnées sont " + 
              this.coord1 + "," + this.coord2);
}
point.print();
// → "Mes coordonnées sont 1,3"
```
Comme en Java, on référence l'objet courant avec `this`.
</div>
</div>
</section>
<section>

## La portée des variables

La portée de base d'une variable est celle de la fonction qui l'englobe.<br>
Le code en dehors de toute fonction agit comme si il était dans une grande fonction *globale*.

**Bonne pratique:** Définir les variables locales en début de fonction et avec le mot-clé `var` 

<div class="incremental">
<div>
**Attention**, les `if`, `for`, `while`, les blocs `{ ... }` ne limitent pas la portée d'une variable.

**Question :** Que répond le code suivant ?

```javascript
for (var i = 0; i < 10; i++) {
  //N'importe quoi
}
console.log(i);
```
</div>

**Réponse:** 10 ; la première valeur de `i` qui ne satisfait pas `i < 10`.
</div>
</section>
<section>

## La portée des variables

Cependant, si une fonction `fun2()` est incluse dans une autre fonction `fun1()`, elle a accès aux variables de `fun1()`.

```javascript
fun1();
function fun1 () {
  var x1 = "x1 de fun1";
  fun2();
  function fun2 () {
     console.log(x1);
  };
}
// → "x1 de fun 1"
```
</section>
<section>

## La portée des variables
En particulier, les variables dans la fonction globale (en dehors de toute fonction) sont **globales**.

```javascript
var x1 = "x1 global";
f2();
function f2 () {
   console.log(x1); // → "x1 global"
};
```

Si une variable locale et une variable globale ont le même nom, c'est la variable locale qui l'emporte.

```javascript
fun1();
function fun1 () {
  var x1 = "x1 de fun1";
  fun2();
  function fun2 () { console.log(x1); };
} // → "x1 de fun 1"
```

</section>
<section>

## La portée des variables

**Note :** 
Si on oublie le `var`, JavaScript fait une assignation et non une déclaration de variable. Il va chercher la variable dans les fonctions englobant la fonction courante. Cependant, si il ne trouve aucune variable à ce nom, il va bien déclarer la variable dans la portée globale.

```javascript
function fun1 () {
  x1 = "x1 global défini dans fun1";
  console.log(x1); 
}
fun1();          // → "x1 global défini dans fun1"
console.log(x1); // → "x1 global défini dans fun1"
```
</section>
<section>

## Testez votre compréhension

```javascript
var x = "I am global";
f1();
console.log(x); // Que renvoie ce bloc de code ?
function f1 () {
  var x = "I live in f1";
  console.log("f1: " + x);
  f2();
  f3();
  function f2 () {
    var x = "I live in f2";
    console.log("f2: " + x);
  }
  function f3 () {
    console.log("f3: " + x);
  }
}
```

</section>
<section>

## Sources : 

* [Eloquent javascript](http://fr.eloquentjavascript.net)
* [MDN (Mozilla Developer network)](https://developer.mozilla.org/fr/)

</section>

<!--
<section>

#Plan du cours:
--------------
- JavaScript de base
- DOM
- Sélecteur
- AJAX et JSON
- Gestion d'événements et de déclencheur
- sécurité : injections XSS

Exemple de fonctionnalités : 
où est-ce qu'on retrouve du javascript partout dans les pages ?
montrer les objectifs ?
  Autocomplétion de google
  tchat (plutôt Websocket que XMLHttpRequest)
  Changement de styles pour slides
  Puissance 4 (il y a une place pour les jeux en HTML 5)
  toggleDisplay (e.g. vérification de formulaire, résumé d'un post)

</section>
-->
<!-- plus tard pour l'évolution de la dynamique des pages Web -->

<!--
```javascript
var x;
// x a la valeur 'undefined'
x = 1;
// x a la valeur 1
```

Les variables sont des pointeurs sur des objets comme en java ?? plus loin lors des objets ??

!!!!!!!!!!!!!!!
!! Mettre au bon endroit
Sans var => variable globale
```javascript
function func () {
 toto = 1;
 var tutu = 1;
};
func();
console.log(toto);
console.log(tutu);
```
!!!!!!!!!!!!!!!

!!!!!!!!!!!!!!!
hoisting de variables 
tata();
function tata() { console.log("hello");}
!!!!!!!!!!!!!!!
! Attention, les scopes ne viennent que des fonctions
! Donc dans l'exemple suivant, la déclaration var undef est remontée (hoisting)
! et le premier undef est défini
undef;
for (var undef = 0; undef < 10; undef++ ) {}
!!!!!!!!!!!!!!!
Par défaut, les variables sont accessibles dans les scopes dessous (=nested) (notion de fermeture)
+
x = 1 déclare la variable comme globale (accessible même dans les scopes supérieurs)
!!!!!!!!!!!!!!!

Syntaxe proche du C

Valeurs : 11, 2.998e8
Arithmétique classique : (100 + 4 * 11) % 4
Valeurs spéciales :  `undefined` et nulle
-->

