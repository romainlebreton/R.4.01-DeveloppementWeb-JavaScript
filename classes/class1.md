---
title : Cours 1 <br> Bases du Javascript
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
JavaScript a été présenté en 1995 avec l'objectif de pouvoir avoir des programmes en plus des pages Web dans le navigateur Netscape. Depuis, Javascript a été adopté par tous les navigateurs.

Javascript a grandement contribué à rendre possible les applications Web modernes, c'est-à-dire les applications permettant d'agir directement avec la page Web, c'est-à-dire sans rechargement de cette page Web. 

<div class="myfootnote">
#### Sources 

[A Short History of JavaScript](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript)
</div>
</div>
</section>
<section>

## Historique 2/3

Le nom Javascript a été choisi pour des raisons commerciales car Java était très en vogue à la création de Javascript. La syntaxe de JavaScript est plus proche du C.

<div class="incremental">
Après son adoption générale, le langage Javascript a été standardisé, c'est-à-dire qu'on a fixé tous les aspects de ce langage sur papier. 
	
Actuellement, nous en sommes à ECMAScript version 5. La version 6 est prévue en 2015 .

**Question:** Quel est l'intérêt d'avoir des standards ?

<!--
R/ Pour faciliter l'inter-opérabilité (qu'un code Javascript marche pareil sur tous les navigateurs) et donc faciliter l'adoption de Javascript.

Contre-exemple pour le HTML : Guerre des navigateurs dans les années 2000 où Internet Explorer a profité de sa position dominante (95%, même sur Mac) pour imposer ses développements du HTML (et des techno Web en général : CSS ...). Il fallait presque écrire un site Web par navigateur.

Nom du standard : ECMAScript standard (synonyme de Javascript dans les faits).

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

Autres domaines d'application du Javascript:

- pour la gestion de bases de données (MongoDB, CouchDB, ...)
- comme langage de scripting côté serveur (Node.js, ...)

Une tendance est de ne plus utiliser qu'un langage dans la pile Web, par exemple de remplacer le PHP par du Javascript.

</section>
<!--
<section>

#Plan du cours:
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

</section>
-->
<!-- plus tard pour l'évolution de la dynamique des pages Web -->
<section>

# Les bases du Javascript

</section>
<section>

## Déclaration de variable

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

<!--
```javascript
var x;
// x a la valeur 'undefined'
x = 1;
// x a la valeur 1
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

Syntaxe proche du C

Valeurs : 11, 2.998e8
Arithmetique classique : (100 + 4 * 11) % 4
Valeurs spéciales :  `undefined` et null
-->

</section>
<section>

La console Javascript
---------------------

Une console Javascript est présente dans les outils de développement de Firefox ou Chrome (raccourci clavier `F12`)

**Exemple :**

```javascript
var x = 1;
x;
console.log(x);
```

```javascript
alert("Coucou !")
```


</section>
<section>

## Les types en Javascript 1/2

Toute valeur a un type en JavaScript. Mais ce type n'est pas spécifié lors de la déclaration d'une variable. 
<!-- On parle d'un language faiblement typé -->

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

## Les types en Javascript 2/2

Il y a 6 types en Javascript :

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

## Chaines de charactères:

Entre guillemets simples `'coucou'` ou `"coucou"` doubles

Échappement de charactère avec **\\** : `\"` &#8594; **"**, `\n` &#8594;  **&#8626;**, ...

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


</section>
<section>

## Les objets

<!-- Affectation d'un objet litéral -->
```javascript
var point = {coord1:1, coord2:3, size: "normal"};
console.log(point);
// → Object {coord1: 1, coord2: 3, size: "normal"}
```

Accès aux propriétés : `point.coord1` ou `point["coord1"]`.<br>
L'avantage de la syntaxe `obj[expr]` est que l'expression `expr` va être évaluée :

```javascript
for (var i = 1; i < 3; i++)
  point["coord" + i] = 0;
console.log(point);
// → Object { coord1: 0, coord2: 0, size: "normal"}
```

<!-- Contrairement au Java qui est un language de classe, c-à-d où la structure de l'objet est rigidifiée-->
En Javascript on peut rajouter des attributs dynamiquement.

```javascript
// Mon point devient 3D
point.coord3 = 1;
// → Object { coord1: 0, coord2: 0, size: "normal", coord3: 1 }
```

</section>
<section>

## Logique

On retrouve les opérateurs classiques: 

* de comparaisons : `==`, `!=`, `>`, `<`, `>=`, `<=`
* de logique : `&&` (and), `||` (or), `!` (not), `^` (xor), 
* le `if/then/else` condensé : `(condition?actiontrue:actionfalse)`


```javascript
console.log (3 > 2)
// → true
console.log ("Itchy" != "Scratchy")
// → true
// Ordre du dictionnaire avec A-Z < a-z (on se sert du codage ASCI (ou Unicode))
console.log ("Aardvark" < "Zoroaster")
// → true
```

</section>
<section>

## Javascript est très permissif !

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

**Question :** Que rend le code suivant ?

```javascript
console.log ("5" - 1);
```

<div class="incremental">
**Réponse :** `4` car `-` est nécessairement la soustraction de deux nombres donc `"5"` est converti en un nombre

<div>
**Question :** Que rend le code suivant ?

```javascript
console.log ("5" + 1);
```
</div>


**Réponse :** `"51"` ! <br>
Il y a ambiguité entre addition de nombres et concaténation de chaines de caractères. L'opérateur le plus prioritaire en JavaScript est la concaténation

<div>
**Question :** Que rend le code suivant ?

```javascript
console.log( 1 + 1 + "1" + 1 + 1);
```
</div>

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

L'opérateur logique `||` (OR) ne renvoit pas nécessairement un booléen

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
**Intérêt :** cela permet de programmer une valeur par défaut

```javascript
var input = prompt("Quel est votre nom ?");
print("Bien le bonjour " + (input || "cher ami"));
```

Si on clique sur annuler, alors `input` vaut `null` 
et `(input || "cher ami")` renvoie `"cher ami"`

Enfin, si `Boolean(expr1)` est vrai alors `expr2` n'est pas évalué
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
for ([initialisation]; [condition]; [expression_finale])
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

Declaration comme en Java, C++

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

Une fonction revoie toujours quelque chose.
Si on ne retourne rien ( `return;` ) ou que l'on omet le return, 
la fonction renvoie `undefined`.

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

</section>
<section>

## Méthodes des objets

**Question :** Comment feriez-vous pour avoir des méthodes ?

**Réponse :** Il suffit d'assigner une valeur de type `function` à un attribut. <br> 
Comme en Java, on référence l'objet courant avec `this`.

```javascript
var point = {coord1:1, coord2:3, size: "normal"};
point.print = function() {
  console.log("Mes coordonnées sont " + 
              this.coord1 + "," + this.coord2);
}
point.print();
// → "Mes coordonnées sont 1,3"
```

</section>
<section>

## La portée des variables

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


</section>

<!--
# Parler ici de Jquery 
=> Utile en production pour problème de compatibilité
Exemple de getElementById (mais pas dans http://caniuse.com)
Exemple de getElementsByClass ( http://caniuse.com mais moins incompatible)
-->

<section>

## Sources : 

* [Eloquent javascript](http://fr.eloquentjavascript.net)
* [MDN (Mozilla Developer network)](https://developer.mozilla.org/fr/)

</section>


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

<!--
<script>
setTimeout(function () {Dz.play() }, 1000);
</script>
-->

<!-- TODO : Rajouter un bouton pour exécuter le code dans la console -->
<!-- Rajouter processus de chargement de la page. Vue avec Network ? -->
<!-- binder du code ? -->
<!-- Structure en arbre de la page Web -->
<!-- console JavaScript qui montre la page originale 
     avec le bootstrap par le serveur -->
<!-- 
### Constructeurs ???
Il y d'autres façons de faire des objets avec des constructeurs.

Un autre aspect important sont les prototypes en Javascript 
mais on ne va pas faire par manque de temps 
(ou peut-être mentionné au dernier cours)
#p108 Prototypes - constructeurs
-->


