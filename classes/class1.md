---
title : Cours 1 - Bases du Javascript
layout : main
---

<!-- TODO : Rajouter une bouton pour exécuter le code dans la console -->

Historique
-----------

Inventé par Brendan Eich en 10 jours chez Netscape pour ajouter une manière d'associer du code (Java à l'origine) à des éléments HTML.

Présenté en 1995 avec l'objectif de pouvoir avoir des programmes en plus des pages Web dans le navigateur Netscape. Depuis, Javascript a été adopté par tous les navigateurs.
Javascript est ce qui a rendu possible les applications Web modernes, c'est-à-dire les applications avec lesquelles on peut interagir directement, sans rechargement de la page Web. 

Le nom Javascript a été choisi pour des raisons commerciales car Java est en vogue à la création de Javascript. La syntaxe est plus proche du C.

Après son adoption générale, le langage Javascript a été standardisé, c'est-à-dire qu'on a fixé tous les aspects de ce langage sur papier. Actuellement, nous en sommes à ECMAScript version 5. La version 6 est prévue en 2015 ([Discussions actuelles autour du futur standard ECMAScript 6](https://github.com/tc39)).

<!--
Q/ Quel est l'intérêt d'avoir des standards ?

R/ Pour faciliter l'inter-opérabilité (qu'un code Javascript marche pareil sur tous les navigateurs) et donc faciliter l'adoption de Javascript.

Contre-exemple pour le HTML : Guerre des navigateurs dans les années 2000 où Internet Explorer a profité de sa position dominante (95%, même sur Mac) pour imposer ses développements du HTML (et des techno Web en général : CSS ...). Il fallait presque écrire un site Web par navigateur.

Nom du standard : ECMAScript standard (synonyme de Javascript dans les faits).

// getElementbyId problem
// Trouver une capture d'écran d'un "Ce site est optimisé pour Internet Explorer en résolution 800x600"
-->

Autres domaines d'application du Javascript
- pour la gestion de bases de données (MongoDB, CouchDB, ...)
- comme langage de scripting côté serveur (Node.js, ...)

=> une tendance est de n'utiliser qu'un langage dans la pile Web : e.g. remplacer le PHP par du Javascript

** Sources : **
[A Short History of JavaScript](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript)

Plan du cours:
--------------
- Javascript de base
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


<!-- plus tard pour l'évolution de la dynamique des pages Web -->

Déclaration variable
----------------------
<!-- 
Mot clé 'var' (pas de déclaration de type comme en Java)
Mettre un ';' à la fin de chaque ligne (optionel mais recommandé)
-->


```javascript
// Déclaration 
var x;
// Affectation
x = 1;
// Les deux combinés
var x = 1;
```

```javascript
var x;
// x a la valeur 'undefined'
x = 1;
// x a la valeur 1
```

<!--
Les variables sont des pointeurs sur des objects comme en java ?? plus loin lors des objets ??

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
! Donc dans l'exemple suivant, la déclaration var undef est remonteé (hoisting)
! et le premier undef est défini
undef;
for (var undef = 0; undef < 10; undef++ ) {}
!!!!!!!!!!!!!!!
Par défaut, les variables sont accessibles dans les scopes dessous (=nested) (notion de fermeture)
+
x = 1 déclare la variable comme globale (accessible même dans les scopes supérieurs)
!!!!!!!!!!!!!!!
-->

Syntaxe proche du C

Valeurs : 11, 2.998e8
Arithmetique classique : (100 + 4 * 11) % 4
Valeurs spéciales :  `undefined` et null

La console Javascript
---------------------

Environnement d'exécution du Javascript
Firefox ou Chrome (raccourci clavier `F12`)

Exemple :
var x = 1;
x;
console.log(x);
alert("Coucou !")


Les types en Javascript
-----------------------
Les valeurs ont des types. Mais on n'a pas besoin de spécifier le type lors de la déclaration d'une variable. (Language faiblement typé)

```javascript
var x = 1;
typeof x;
// → number
var y = "Vous êtes bien réveillés ?";
typeof y;
// → string
```

Les types sont dynamiques <!-- W3school -->

```javascript
var x;               // Now x is undefined
var x = 5;           // Now x is a Number
var x = "John";      // Now x is a String
```

Types : 
  string, number, boolean,
  null, undefined
  object, function  
<!-- on reviendra sur les fonctions -->

```javascript
typeof "abc"
// → string
typeof [1,2,3]
// → object
typeof undefined
// → undefined
```

Chaines de charactères:
-----------------------
Guillemets simples ou doubles (peu de différence)
Pas de retour à la ligne

Échappement de charactère: \" -> ", ...

Exercice : Comment créer la chaîne de caractères 'Un retour à la ligne s'écrit "\n"'

```javascript
console.log("Un retour à la ligne s'écrit \"\\n\".");
// → "Un retour à la ligne s'écrit "\n".
```

Concaténation avec + : 

```javascript
console.log("con" + "cat" + "é" + "nation");
// → "concaténation"
```

Objets et tableaux:
-------------------	

### Tableaux classiques (non typés)

TODO : finir l'exemple


```javascript
var t = [1,2,3,"un autre type"];
console.log(t[0]);
// → 1
console.log(t.length);
t.push(5);
console.log();
console.log(t.slice(1,3));
```

<!-- ATTENTION : complexité d'un vidage de tableau par slice(1)-->

### Les objets

```javascript
// Affectation d'un objet litéral
var point = {coord1:1, coord2:0, thickness: 1.0}
// Modification d'un attribut
point.coord1 = 2;
```

On accède aux propriétés des objets avec obj.nom1 ou obj["nom1"].
L'avantage de la syntaxe obj[expr] est que l'expression va être évaluée.

```javascript
for (var i = 1; i < 3; i++)
  point["coord" + i] = 0;
console.log(point);
```

Contrairement au Java qui est un language de classe, c-à-d où la structure de l'objet est rigidifiée,
en Javascript on peut rajouter des attributs dynamiquement.

```javascript
// Mon point devient 3D
point.coord3 = 1;
```

### Constructeurs ???


<!-- 
Il y d'autres façons de faire des objets avec des constructeurs.

Un autre aspect important sont les prototypes en Javascript 
mais on ne va pas faire par manque de temps 
(ou peut-être mentionné au dernier cours)
#p108 Prototypes - constructeurs
-->



Logique
-------
Booléen, comparaison, opérateurs logiques: classique
true / false
>= (greater than or equal to), <= (less than or equal to), == (equal to), and != (not equal to).
&& (and), || (or), ! (not), ^ (xor)
(condition?actiontrue:actionfalse)

```javascript
console.log (3 > 2)
// → true
console.log ("Itchy" != "Scratchy")
// → true
// Ordre du dictionnaire avec A-Z < a-z (on se sert du codage ASCI (ou Unicode))
console.log ("Aardvark" < "Zoroaster")
// → true
```

Javascript est très permissif (peut-être trop)
----------------------------------------------
Conversions automatiques de type

```javascript
console.log (8 * null)
// → 0
// * est nécessairement la multiplication de deux nombres
// donc null est converti en un nombre
Number(null)
// → 0
// ATTENTION : çà ne marche que dans les cas simples
Number("five")
// → NaN
Number("5")
// → 5
Number(undefined)
// → NaN
```

```javascript
console.log ("5" - 1)
// → 4
// - est nécessairement la soustraction de deux nombres
// donc "5" est converti en un nombre
```

```javascript
console.log ("5" + 1)
// → 51
// Ici, il y a ambiguité entre addition et concaténation et l'opérateur le plus probable 
// (i.e. le plus prioritaire dans la conception du language)
// est la concaténation
```

```javascript
console.log( 1 + 1 + "1" + 1 + 1);
// → "2111"
// ceci est équivalent dans l'ordre d'application des opérations à 
((((1 + 1) + "1") + 1) + 1)
 = (((2 + "1") + 1) + 1)
 = (("21" + 1) + 1)
 = "211" + 1
 = 2111
```

Logique (suite)
---------------

Exemple de comportement non voulu
Quizz : qu'affiche ?

```javascript
console.log(false == "0");
```


if (false == 0) alert("Mais bien sûr !");

Pour bien gérer cette situation, il ya l'opérateur `===` (et sa négation `!==`)
qui teste l'égalité de type puis de valeur (comme en PHP).

```javascript
console.log(false === "0");
```

Subtilité des opérateurs logiques :
-----------------------------------
Ne renvoient pas nécessairement un booléen

`(expr1 || expr2)` est exactement comme la fonction suivante

```javascript
function myOR (expr1,expr2) {
  if (Boolean(expr1))
    return expr1;
  else 
  return expr2;
}
```
Intérêt : permet de programmer un valeur par défaut

```javascript
var input = prompt("Quel est votre nom ?");
print("Bien le bonjour " + (input || "cher ami"));
```

Si on clique sur annuler, alors input vaut null 
et (input || "cher ami") renvoie "cher ami"

```javascript
console.log ( null || "user");
// → user
console.log ("Karl" || "user");
// → Karl
```

De plus, si Boolean(expr1) est vrai alors expr2 n'est pas évalué
(évaluation paresseuse)


If, for and while
------------------
Comme en java / C++

Exemples 

// TODO Remplacer par des exemples !

```javascript
if (condition) {
   instructions1
} else {
   instructions2
}
```
```javascript
for ([initialisation]; [condition]; [expression_finale])
   instruction
```
```javascript
while (condition) {
  instruction
}
```
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

Functions:
----------
Declaration comme en Java/C++

```javascript
function square(x) {
  return x * x;
};
```

Les variables peuvent stocker des fonctions
Le code dessus est (quasiment) équivalent à

```javascript
var square = function (x) {
  return x * x;
};
```

Une fonction revoie toujours quelque chose.
Si on ne retourne rien ( `return;` ) ou que l'on omet le return, 
la fonction renvoie `undefined`

Une fonction peut prendre en argument une fonction

```javascript
function boum() {alert('Boum!');}
setTimeout(boum,2000);
```

Une fonction peut renvoyer une fonction

```javascript
function puissance (x) {
  return function (y) {
    return Math.pow(y,x);
  }
}

var square = puissance(2);
var cube = puissance(3);
console.log(square(256));
console.log(cube(256));
```

Méthodes des objets:
--------------------

Q/ Comment fait-on pour avoir des méthodes ?
R/ On assigne une valeur 'fonction' à un attribut

Comme en Java, on référence l'objet courant avec `this`.

```javascript
point.print = function() {
  console.log("Mes coordonnées sont " + this.coord1 + "," + this.coord2);
}
```


Parameters and scopes:
----------------------

scope global : i=5 dans fonction

Qu'est-ce qu'un scope ? Zone de portée de variable 
TODO : chercher meilleure définition (You don't know JS)

portée d'une variable

Le scope est donc limité par :
-les fonctions de fonctions (et pas les acolades "{" donc pas dans les for et while etc...

=> Convention / Règle : définir les variables locales d'une fonction en début et avec un var 

Les scopes sont imbriqués comme un arbre vu du dessus ou comme des poupées russes vu du dessous

Dans un scope, nous avons toujours accès aux scopes d'au-dessus
 => faire le dialogue de résolution d'une variable aux travers des scopes parents

```javascript
var x = "I live in the global scope";
var f1 = function () {
  var x = "I live in the first nested scope";
  console.log("f1: " + x);
  var f2 = function () {
    var x = "I live in the second nested scope";
    console.log("f2: " + x);
  }
  var f3 = function () {
    console.log("f3: " + x);
  }
  f2();
  f3();
}
f1();
console.log(x);
```

<!-- 
Remettre une couche de peinture plus tard lors des callbacks ? 
-->


Q/ Que répond le code suivant ?

```javascript
for (var i = 0; i < 10; i++) {
  //N'importe quoi
}
console.log(i);
```

```javascript
var coucou = function () {
  message = "Bien le bonjour !";
  console.log(message);
}
console.log(message)
```

<!-- Pour info, window est le scope global -->

p.43 with nested scope

#p.47 function declarations are not part of the regular top-to-bottom flow of control
#p.10 closure


------------------------
| Javascript et le DOM |
------------------------

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

Le DOM
------
Le DOM (« Document Object Model », ou modèle objet de document) est une interface de programmation (API) avec le document HTML

Les documents HTML ont une structure d'arbre que l'on retrouve dans le DOM
#Insérer code HTML, et représentation arbre

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



# Parler ici de Jquery 
=> Utile en production pour problème de compatibilité
Exemple de getElementById (mais pas dans http://caniuse.com)
Exemple de getElementsByClass ( http://caniuse.com mais moins incompatible)


## Sources : 
[Eloquent javascript](http://fr.eloquentjavascript.net) (plus licence)
[MDN (Mozilla Developer network)](https://developer.mozilla.org/fr/)

<!--

Exemple : 

Parler de JSON

Les tableaux classiques ne sont qu'un cas particulier des &laquo;tableaux associatifs&raquo; qui associent des valeurs à des noms (chaines de charactères)

```javascript
t["bonjour"]=10;
console.log(t["bonjour"]);
// → 10
```

En fait, les tableaux associatifs ne sont que des objets

```javascript
var obj = {nom1:valeur1, nom2:valeur2, ...}
```


-->
