---
title : Cours 1 - Bases du Javascript
---

Historique:
-----------
Présenté en 1995 avec l'objectif de pouvoir avoir des programmes en plus des pages Web dans le navigateur Netscape. Depuis, Javascript a été adopté par tous les navigateurs.
Javascript est ce qui a rendu possible les applications Web modernes, càd les applications avec lesquelles on peut interagir directement, sans rechargement de la page Web. 

Pas tellement relié à Java. Nom Javascript pour des raisons commerciales car Java est en vogue à la création de Javascript.  

Après son adoption générale, le language Javascript a été standardisé, c'est-à-dire qu'on a fixé tous les aspects de ce language sur papiers.
Q/ Pourquoi est-ce qu'on crée un standard ?
R/ Pour faciliter l'inter-opérabilité (qu'un code Javascript marche pareil sur tous les navigateurs) et donc faciliter l'adoption de Javascript.
Contre-exemple pour le HTML : Guerre des navigateurs dans les années 2000 où Internet Explorer a profité de sa position dominante pour imposer ses développements du HTML (et des techno Web en général : CSS ...). Il fallait presque écrire un site Web par navigateur.
Nom du standard : ECMAScript standard (synonyme de Javascript dans les faits).

Certains aspects proches du style C/C++
Actuellement, ECMAScript version 5 et version 6 sur les rails

Autre domaines d'applications du Javascript :
- pour la gestion de bases de données (MongoDB, CouchDB)
- comme language d'un framework Web (Node.js)
=> une tendance est de n'utiliser qu'un langage dans la pile Web : e.g. remplacer le PHP par du Javascript


Déclaration variable : 
----------------------
Mot clé 'var' (pas de déclaration de type comme en Java)

```javascript
//Déclaration 
var x;
// Affectation
x = 1;

// l'un puis l'autre
var x = 1;
```

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



Valeurs : 11, 2.998e8, undefined et null
Arithmetique classique : (100 + 4 * 11) % 4
Valeurs spéciales :    ?? type associés ??


Les types en Javascript
-----------------------
Language faiblement typé (les valeurs ont des types mais on n'a pas besoin de spécifier le type lorsque l'on déclare la variable)

(W3S) les types sont dynamiques
```javascript
var x;               // Now x is undefined
var x = 5;           // Now x is a Number
var x = "John";      // Now x is a String
```

Types : string, number, boolean,
        null, undefined
        object, function  // on y reviendra

```javascript
typeof "abc"
// → String
typeof [1,2,3]  ?? trop tôt 
// → Object
typeof undefined
// → undefined
```

Chaines de charactères:
-----------------------
Guillemets simples ou doubles (peu de différence)
Pas de retour à la ligne

Échappement de charactère:
```javascript
console.log("Un retour à la ligne s'écrit \"\\n\".");
// → "Un retour à la ligne s'écrit "\n".
```

Concaténation avec + : 
```javascript
console.log("con" + "cat" + "é" + "nation");
// → "concaténation"
```

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

!!!!!!!!!!!!!!!!!!
TODO
if (false == null) alert("Noooonnn !");

et introduire donc === 
!!!!!!!!!!!!!!!!!!

Subtilité des opérateurs logiques :
-----------------------------------
Ne renvoient pas nécessairement un booléen

(expr1 || expr2) est exacement comme la fonction suivante
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
console.log ( null || "user")
// → user
console.log ("Karl" || "user")
// → Karl
```

De plus, si Boolean(expr1) est vrai alors expr2 n'est pas évalué


If, for and while
------------------
Comme en java / C++

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
    instructions 2;
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
Le code dessus est équivalant à

```javascript
var square = function (x) {
  return x * x;
};
```

Si on retourne rien (return;) ou omet le return, la fonction renvoie 'undefined'

Parameters and scopes:
----------------------
p.43 with nested scope

#p.47 function declarations are not part of the regular top-to-bottom flow of control
#p.10 closure

Objets et tableaux:
-------------------
Tableaux classiques
```javascript
var t = [1,2,3];
console.log(t[0]);
// → 1
```

Les tableaux classiques ne sont qu'un cas particulier des tableaux associatifs 
qui associent des valeurs à des noms (chaines de charactères)

```javascript
t["bonjour"]=10;
console.log(t["bonjour"]);
// → 10
```

En fait, les tableaux associatifs ne sont qu'un cas particulier d'objet

```javascript
var obj = {nom1:valeur1, nom2:valeur2, ...}
```

On accède aux propriétés des objets avec
obj.nom1 ou obj["nom1"]
#2ème forme plus générale obj[expr] avec expr un expression qui s'évalue en une chaine de charactères

#p108 Prototypes - constructeurs

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



# Parler ici de Jquery 


## Sources : 
[Eloquent javascript](http://fr.eloquentjavascript.net) (plus licence)
[MDN (Mozilla Developer network)](https://developer.mozilla.org/fr/)


