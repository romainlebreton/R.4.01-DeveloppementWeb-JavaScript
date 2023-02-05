---
title : Cours 1 <br> Introduction à JavaScript
subtitle : un tour d'horizon
layout : slideshow
lang: fr
---

<section>

<!-- 
Voir Notes prises sur l'amphi 1 en 2021

TODO Notes :
* Où executer JS : dans node ou dans le navigateur > Dev Tools > Console
* node <-> PHP terminal et Console navigateur <-> PHP lié à Apache
  dans le sens où il y a un contexte déjà présent (soit les variables globales
  $_GET/$_POST/$_SERVER, soit l'objet document)
* Comparer les portées avec Java, C/C++, Python, PHP
* Montrer le débuggage JS dans VsCode (cf. tldr node)
* chaines de caractères avec remplacement en JS `bla : ${var}`
  autres syntaxes : "", '' équivalentes ? 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  String literals can be specified using single or double quotes, which are treated identically, or using the backtick character `. This last form specifies a template literal: with this form you can interpolate expressions.
* type hinting pour autocomplétion dans VSCode / WebStorm
* convention de nommage
* affichage dans la console / node (dernière valeur retournée vs affichage avec console.log())
  console.log(x) affiche d'abord x avant d'afficher la dernière valeur retournée = undefined
* fonction avec tab plutôt qu'avec le prototype ! ?
* p.__proto__.constructor.name, p.__proto__.__proto__.constructor.name 
* tab[i] avec i flottant ? → Tronque i pour avoir un entier 

 -->
<!-- ## Plan du cours

1. Généralités sur JavaScript

2. Variables en JavaScript

3. Tableaux en JavaScript

4. Fonctions en JavaScript

5. Objets en JavaScript

</section>
<section> -->

# Généralités sur JavaScript

</section>
<section>

## Bref historique

**Années 1990** - Dynamic HTML – effets sur les pages web :
<img alt="Brendan EICH" src="{{site.baseurl}}/assets/class1/Brendan%20EICH.jpg" height="110" style="float:right; margin-left:10px;">

-  Langage écrit en 1995 par Brendan EICH chez Netscape, pour associer des scripts à des éléments HTML. 
  
- Permet d’avoir des programmes en plus des pages Web dans le navigateur.  
  Ces programmes permettent d'agir directement avec la page Web, sans rechargement. 
  
- Standard 96-97 (ECMAScript)  
    actuellement version 13 (juin 2022),  
    nouvelle version tous les ans

</section>
<section>

##  **Bref historique**

**Années 2000** – Librairies évoluées :

-   Jquery, MooTools, AngularJS, … : proposent un   ensemble de fonctions, ou
  même un cadre de travail   complet pour JavaScript.
-   AJAX (utilisation « asynchrone » de JavaScript pour  gérer des appels au
  serveur de données). Voir TD5 et suivants.

**Années 2010** – Ère moderne :

  -   Évolution de JavaScript : utilisation du langage  côté serveur (retour aux
      origines).
  -   Tendance actuelle : un seul langage dans la pile web, par exemple
      remplacer PHP par JavaScript.
  -   Node.js pour des serveurs web écrits en JavaScript.

</section>
<section>

## Environnement de travail

**Environnement d'exécution**

* la console des *DevTools* du navigateur :  
Endroit idéal pour tester le code, en interaction directe avec la page
web. Outil indispensable. Les exemples du cours sont testés dans la
console.

* `Node.js` :  
Permet, entre autres, d'exécuter du JS dans un terminal.  
⚠️ Non lié à une page Web

**Environnement de développement**

Nous vous conseillons `WebStorm` ou `VSCode`.

<!-- **Sites dédiés**

Certains sites permettent l’élaboration et le test du code client :
html, css et JavaScript. Par ex :

-   <https://codepen.io/>
-   <https://jsbin.com/> -->

</section>
<section>

## Caractéristiques générales

1. langage qui dynamise les pages web côté client

    *  Scripts interprétés dans le navigateur.  
       Page web dynamique côté client (voir TD1), souvent par une gestion
     des événements (clics, ...). 
    *  Différent des pages dynamiques côté serveur (PHP),  
       où on gère des informations envoyées (formulaires) ou en provenance de la
       base de données.

2. langage interprété
 
     JavaScript est interprété au niveau du navigateur, sans la moindre
     compilation. 
     
     L’exécution des scripts dépend de l’activation, côté
     client, de l’interpréteur JavaScript.

</section>
<section>

# Variables en JavaScript

</section>
<section>

## Les types principaux

 * JavaScript propose 8 types différents, nous en utiliserons essentiellement
   4 :

   -   `Number` (les nombres flottants `double`)  
   -   ``String`` (chaînes de caractères)  
        Immuable (comme Java, Python, à l'inverse de C++, PHP)
   -   `Boolean` (les booléens)
   -   `Object` (tous les objets JavaScript)  
        Dont les tableaux, stockés par référence (comme Java, ...)

* Les 4 autres types (`BigInt`, `Null`, `Undefined` et `Symbol`) sont pour nous
  moins communs.

* Le typage JavaScript est :

  -   Faible : Pas de type indiqué à la déclaration.
  -   Dynamique : Le type d’une variable peut changer.

</section>
<section>

## Déclaration des variables

-   Les variables se déclarent par les mots-clés `var`, `let` ou `const`.
-   La tendance actuelle est l’utilisation du mot-clé `let`. Nous
    privilégierons ce mot-clé.

```js
let bianca = "Bianca Castafiore";
```

-   Le mot-clé `const` fonctionne comme `let`, à ceci près que la valeur ne
    peut pas être réaffectée après initialisation.

```js
const pi = 3.141592653589793;
pi = 3;
// → TypeError: Assignment to constant variable.
```

</section>
<section>

## Portée des variables

**Variables locales**

Une variable déclarée avec `let` a pour portée le bloc contenant (fonction, boucle `for`, …).

```js
for(let i = 0; i < 2; i++) {
    console.log(i)
}
// → 0
// → 1
console.log(i)
// → Uncaught ReferenceError: i is not defined
```

**Remarque :** 
* JS permet des fois d'omettre le `;` à la fin de l'instruction.  
* Bonne pratique : Toujours mettre `;` à la fin.

</section>
<section>

## Portée des variables

**Variables locales**

Une variable déclarée avec `let` a pour portée le bloc contenant
(fonction, boucle `for`, …).

```js
let i;
for(i = 0; i < 2; i++) {
    console.log(i);
}
// → 0
// → 1
console.log(i)
// → 2
```

</section>
<section>

## Portée des variables

**Variables locales**

Une variable déclarée avec `let` a pour portée le bloc contenant
(fonction, boucle `for`, …).

```js
function f() {
    let j = 2;
    console.log(j);
}
f();
// → 2
console.log(j);
// → Uncaught ReferenceError: j is not defined
```

</section>
<section>

## Portée des variables

**Variables globales**

Une variable déclarée dans la partie principale du script a donc
pour portée tout le script : c’est une variable globale

```js
let i_global = 0;

function f(nb) {
    i_global = nb;
}

f(8);
console.log(i_global);
// → 8
```

</section>
<!-- <section>

## Opérateurs classiques

**Opérateurs arithmétiques (entre variables de type `Number`)**

On peut aussi utiliser les opérateurs classiques `+=`, `-=`, `*=`, `/=`, `%=`
et `**=`


| **Opérateur** | **Opération**  |
| ------------- | -------------- |
| `+`           | addition       |
| `–`           | soustraction   |
| `*`           | multiplication |
| `/`           | division       |
| `%`           | modulo         |
| `**`          | puissance      |
{: .centered}

</section> -->
<section>

## Opérateurs logiques

Entre variables de type `Boolean`

* `==` / `!=` : égalité en valeur  ⚠️ Danger ! ⚠️  
    Relation est symétrique, mais pas transitive en JS (ni en PHP)

    ```js
    console.log([] == false); // → true
    console.log(false == "0"); // → true
    console.log("0" == []); // → false
    ```

* `===` / `!==` : égalité en valeur et en type  
  À privilégier.
    ```js
    console.log([] === false); 
    // → false car types différents
    console.log(false === "0"); // → false
    console.log("0" === []); // → false
    ```

<!-- | **Opérateur** | **Opération**                   |
| ------------- | ------------------------------- |
| `&&`          | "ET" logique                    |
| `||`          | "OU" logique                    |
| `!`           | "NON" logique                   |
| `==`          | égalité en valeur               |
| `!=`          | différence en valeur            |
| `===`         | égalité en valeur et en type    |
| `!==`         | différence en valeur ou en type |
{: .centered  .pretty} -->


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

## Quizz 1/2

**Question :** Que rend le code suivant ?

```javascript
console.log ("5" - 1);
```

<div class="incremental">
**Réponse :** `4`, car `-` est nécessairement la soustraction de deux nombres donc `"5"` est converti en un nombre
</div>
</section>
<section>

## Quizz 2/2


**Question :** Que rend le code suivant ?

```javascript
console.log ("5" + 1);
```

<div class="incremental">
**Réponse :** `"51"` ! <br>
Il y a ambiguïté entre addition de nombres et concaténation de chaînes de caractères. L'opérateur le plus prioritaire en JavaScript est la concaténation.
</div>
</section>
<section>

## Évaluation paresseuse de `||` et `&&`

Si `expr1` est vrai, alors 
* `(expr1 || expr2)` est vrai
* et `expr2` n'est pas évalué


Si `expr1` est faux, alors 
* `(expr1 && expr2)` est faux
* et `expr2` n'est pas évalué

**Intérêt :**
```js
if (p !== null && p.nom == 'Eich')
// Si p est null, alors p.nom n'est pas évalué
// (donc pas de TypeError) 
```

(comme en PHP, Java, C++, ... voir aussi le [chainage optionnel `?.`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining) )

</section>
<section>

## Méthodes du type `Number`

<!-- **Type Number (voir le `__proto__` en détail !)** -->
```js
let x = 3.141592653589793;
typeof(x); // → 'number'
x.__proto__;
```
<!-- donne ceci dans la console des outils de développement -->
![Prototype methods]({{site.baseurl}}/assets/class1/proto.png)  
<!-- On sait alors que l'on peut appeler -->
```js
x.toPrecision(4); // → '3.142'
x.toFixed(4); // → '3.1416'
x.toString(); // → '3.141592653589793'
```

</section>
<section>

## Type `String`

Syntaxe entre guillemets simples `'coucou'` ou `"coucou"` doubles : 
* même comportement, sauf échappement du délimiteur : 
  * `\'` → `'` si délimiteur simple
  * `\"` → `"` si délimiteur double
* saut de ligne avec `\n`, ...

Syntaxe entre accent grave ``` `coucou` ```. Permet le remplacement de variables avec `$ {...}` : 

```js
let nom = 'Juste Leblanc';
let p = `<p> Bonjour ${nom} </p>`;
console.log(p);
// <p> Bonjour Juste Leblanc </p>
```

</section>
<section>

## Méthodes du type `String`

```js
let password = "@P9GXpXuF%sy";
password.length; // → 12
password.toUpperCase(); // → @P9GXPXUF%SY
password.charAt(6); // → 'X'
password.indexOf("%"); // → 9
password.split("X"); // → [ '@P9G', 'p', 'uF%sy' ]
```

(voir le `__proto__` en détail !)

</section>
<section>

# Tableaux en JavaScript

</section>
<section>

## Déclarations possibles d’un tableau

Les tableaux JavaScript peuvent être déclarés par un appel à un
constructeur de l’objet natif de JavaScript Array :

```js
let tab = new Array("bonjour","salut","hello");
```

Mais il est plus simple de les déclarer par :

```js
let tab = ["bonjour","salut","hello"];
```

</section>

<!-- 
<section>

## Contenu d’un tableau et accès au contenu

Même si concrètement les tableaux utilisés sont plutôt «monotypes», on
peut envisager des tableaux JavaScript contenant des éléments de types
variés

```js
let tab = ["bonjour",3.14159,true,[1,2,"salut"],6];
```

On accède à un élément de manière classique, par un système d’indices à
partir de 0.

```js
tab[0] // → "bonjour"
tab[3] // → Array(1,2,"salut")
tab[3][1] // → 2
tab[3][2] // → "salut"
``` 

</section> 
-->
<section>

## Parcours d’un tableau

Boucle `for` classique :

```js
let tab=["bonjour", "hello", "salut", "coucou"];

for (let i=0; i < tab.length; i++) {
    console.log(`mot n°${i} : ${tab[i]}`);
}
// mot n°0 : bonjour
// mot n°1 : hello
// mot n°2 : salut
// mot n°3 : coucou
```

<br>

**Question :** Comment JS évalue `tab[i]` alors que `i` est un flottant ?

Réponse : Il tronque `i` pour garder sa partie entière.
{: .incremental}

</section>
<section>

## Parcours d’un tableau

Boucle `for...of` :

```js
let tab=["bonjour", "hello", "salut", "coucou"];

for (let mot of tab) {
    console.log(mot);
}
// bonjour
// hello
// salut
// coucou
```

</section>
<section>

## Méthodes des tableaux

```js
// Insertion
let tab = [1];
tab.push(2); // En fin de tableau
tab.unshift(3); // En début de tableau
console.log(tab); // → [3, 1, 2]

// Supression
let fin = tab.pop(); // En fin de tableau
console.log(tab); // → [3, 1]
console.log(fin); // → 2
let debut = tab.shift() // En début de tableau

// Concaténation
let tabconcat = tab.concat([6,7]);
console.log(tabconcat); // → [ 3, 1, 6, 7 ]
```

<!-- 
**Extractions**

  - en fin de tableau : `tab.slice(i)`  
    retourne le sous-tableau des indices k, k ≥ i
  - en milieu de tableau : `tab.slice(i,j)`  
    retourne le sous-tableau des indices k, i ≤ k \< j
    
**Concaténation**

- `tab.join("/")`  
retourne la chaîne de caractères obtenue par concaténation des
éléments de tab, séparés par le caractère passé en argument.
   
**Longueur**

- Longueur du tableau : `tab.length` -->

Regarder le `__proto__` pour d’autres méthodes intéressantes…

<!-- Object.getOwnPropertyNames([].__proto__) -->
<!-- 
```js
['length', 'constructor', 'at', 'concat', 'copyWithin', 'fill', 'find', 'findIndex', 'lastIndexOf', 'pop', 'push', 'reverse', 'shift', 'unshift', 'slice', 'sort', 'splice', 'includes', 'indexOf', 'join', 'keys', 'entries', 'values', 'forEach', 'filter', 'flat', 'flatMap', 'map', 'every', 'some', 'reduce', 'reduceRight', 'toLocaleString', 'toString', 'findLast', 'findLastIndex']
``` -->

</section>
<section>

# Fonctions

</section>
<section>

## Syntaxe

Déclaration comme en Java, C++, ...

```javascript
function square(x) {
    return x * x;
};
```

<br>
Les variables **peuvent stocker** des fonctions ! <br>
Le code ci-dessus est équivalent à

```javascript
let square = function (x) {
    return x * x;
};
```

</section>
<section>

## Fonctions anonymes

On appelle *fonction anonyme* une déclaration de fonction sans nom.

Exemple : 

```js
setTimeout(
    function () { console.log("Boum"); },
    2000
);
```

<div class="incremental">
<div>
Syntaxe raccourcie : *Fonctions fléchées* (*arrow function* en anglais)

```javascript
setTimeout( () => {console.log(Boum);}, 2000);
```
</div>

<div>
Les 2 syntaxes suivantes sont équivalentes

```javascript
const square1 = (x) => { return x * x; };
const square2 = x => x * x;
```
</div>
</div>

</section>
<section>

## Fonctions

Les fonctions sont des **objets de &laquo;première classe&raquo;** : elles
peuvent être manipulées et échangées comme tous les autres objets JavaScript.

<br>
**Exemple :** Mettons une valeur *fonction* dans une variable

```javascript
function square(x) {
    return x * x;
};
// Affectation de la variable
let varfonc = square;
// Exécution de la fonction avec l'opérateur ()
varfonc(2);
// → 4
```

</section>
<section>

## Fonctions

Une fonction peut prendre en argument une fonction

```javascript
function boum() {
    console.log('Boum!');
}
// setTimeout execute la fonction boum après 2s
setTimeout(boum, 2000);
```

<br>

Une fonction peut aussi renvoyer une fonction.

</section>

<!-- 
<section>

## Fonctions

**here** : Attention, on ne parle pas de nested scope, ni de closure**

Une fonction peut renvoyer une fonction

```javascript
function puissance (x) {
  function puissancex (y) {
    // Math.pow(y,x) calcule y^x
    return Math.pow(y,x);
  }
  return puissancex;
}
let square = puissance(2);
let cube = puissance(3);
console.log(square(256),cube(256));
```

<div class="incremental">
**Note :** Nous reviendrons plus tard sur le fait que `puissancex(y)` utilise bien
  la variable `x` de sa fonction parente.
</div>

</section> 
-->

<section>

# Objets en JavaScript

</section>
<section>

## Création de façon littérale

On peut définir un objet en donnant des paires clés-valeurs :
```js
let p = {nom: "Haddock", prenom: "Archibald"};
p.nom; // → "Haddock

// p peut être complété
p.profession = "marin";
console.log(p);
// → { nom: 'Haddock', prenom: 'Archibald', profession: 'marin' }
```

<div class="incremental">
<div>
**Note :** PHP permettait aussi d'ajouter des attributs :
```php
$p = new stdClass();
$p->nom = "Haddock";
$p->prenom = "Archibald";
```

</div>
</div>

<!-- 
En JS, le prototype est Object
En PHP, crée un objet de la stdClass
Autres syntaxes PHP : 
$o = (object) ["tata" => "blop"];
$o2 = json_decode('{"foo":"bar"}');

https://www.php.net/manual/en/class.stdclass.php

Marche aussi avec les méthodes
php > $p = new stdClass();
php > $p->parler = function () { echo "bla";};
php > ($p->parler)();

 -->

</section>
<section>

## Création de façon littérale

On peut aussi créer l’objet avec des méthodes ou encore les ajouter
après coup :
```js
p.parler = function () {
    console.log("mille sabords !");
}
p.parler(); // → "mille sabords !"
```

</section>

<!-- 
<section>

## Création par constructeur

Cette méthode rappelle ce qu’on utilise en Java, mais la déclaration
préalable des attributs n’a pas de sens puisqu’on peut en ajouter à
tout moment…

<div style="font-size:large">

```js
// Constructeur = une fonction qui peut appeler `this`
function Personne(nom, prenom, profession) {
    this.nom = nom;
    this.prenom = prenom;
    this.profession = profession;
    this.parler = function () {
        console.log("mille sabords !");
    }
}
// Appel au constructeur avec `new ...`
let capitaine = new Personne("Haddock", "Archibald", "marin");
capitaine.nom; // → "Haddock"
capitaine.parler(); // → "mille sabords !"
```
</div>  
</section> 
-->

<section>

## Création selon un modèle

Façon plus classique de coder :

<div style="font-size:large">

```js
class Personne {
    constructor(nom, prenom, profession) {
        this.nom = nom;
        this.prenom = prenom;
        this.profession = profession;
    }

    parler() {
        console.log("mille sabords !");
    }
    
    static espece = "humain";
}
let capitaine = new Personne("Haddock", "Archibald", "marin");
capitaine.nom; // → "Haddock"
capitaine.parler(); // → "mille sabords !"
Personne.espece; // → "humain"
```

</div>

</section>
<section>

## Langage basé sur les prototypes


-   JavaScript n'est pas basé sur les classes, mais sur les prototypes
-   Un prototype est comme une *maquette de classe* **dynamique**  
    On peut modifier le prototype après coup :
    ```js
    Personne.prototype.aurevoir = function() {
        console.log("Bon vent !");
    }
    ```
-   `capitaine` hérite **dynamiquement** des méthodes du
    prototype de `Personne`...
    ```js
    capitaine.aurevoir();
    // → "Bon vent !"
    ```


</section>
<section>

## Fonctionnement des prototypes

Chaque objet se voit rattaché un prototype, qui est un objet.

```js
typeof capitaine.__proto__ // → object
```

<div class="incremental">
<div>

Donc le prototype a aussi son prototype, ce qui crée 
une chaîne prototypale. 

</div>
<div>

À la fin, on arrive au prototype `Object` dont
le prototype est `null`.

```js
capitaine.__proto__.__proto__.__proto__ // → null
```

</div>
<div>
Deux instances de la même classe ont le même prototype

```js
let capitaine = new Personne("Haddock", "", "");
let tournesol = new Personne("Triffon", "", "");
capitaine.__proto__ === tournesol.__proto__;
// → true
```

</div>
</div>
</section>
<section>

## Fonctionnement des prototypes



Chaque prototype contient les méthodes de son type

<div style="font-size:large">

```js
Object.getOwnPropertyNames(capitaine)
// → ['nom', 'prenom', 'profession']
Object.getOwnPropertyNames(capitaine.__proto__)
// → ['constructor', 'parler']
Object.getOwnPropertyNames(capitaine.__proto__.__proto__)
// → ['constructor', 'hasOwnProperty', 'toString', ...]
```

</div>

<div class="incremental">
<div>

Quand on tape `capitaine.parler()`, l'objet va chercher la méthode dans son prototype, sinon dans le prototype du prototype...

</div>
<div>
Du coup, `capitaine` hérite **dynamiquement** des méthodes du
prototype de `Personne`.

<div style="font-size:large">
```js
capitaine.__proto__.aurevoir = function() {
    console.log("Bon vent !");
}
capitaine.aurevoir(); // → "Bon vent !"
```
</div>


</div>
</div>

<!-- 
C'est un peu similaire à une suite d'héritages.

Le prototype est un objet qui contient toutes les méthodes en commun.
C'est une sorte de maquette de classe.

Mais c'est une maquette **dynamique** !

On peut la changer.

Donc tous les objets ont une méthode toString(), car elle appartient au prototype de `Object\.

Le proto est un objet rattaché à chaque objet
(jusqu'au proto de Object dont le prototype est `null`)

Pour chercher un attribut / une méthode, on teste si l'objet l'a, 
sinon le proto, sinon le proto du proto, ....

Du coup, extensible après coup en modifiant le proto. 
-->

</section>

<!-- 
<section>

## Particularité en JavaScript

-   Les objets JavaScript ont la particularité de ne pas dépendre d’une
    définition de classe comme en Java.
-   Les versions récentes de JavaScript adoptent néanmoins la maquette de
    *classe* mais les objets JavaScript gardent une vraie nature indépendante.
-   Ils n’instancient pas de façon pure et dure une maquette de classe, mais
    sont insérés dans une chaîne de prototypage, qui permet de savoir quel est
    leur héritage et la généalogie de cet héritage.
-   Il faut retenir qu’un objet JavaScript n’est pas contraint par un modèle de
    classe, mais nos habitudes de programmation objet de Java nous permettront
    de reproduire certaines pratiques classiques...

</section> 
-->
<section>

## Parcours des attributs / méthodes

On peut parcourir l’objet par une boucle `for` :
<div style="font-size:large">

```js
let gaston = {
    nom:"Lagaffe",
    prenom:"Gaston",
    profession:"gaffeur"
};
for(attribut in gaston) 
    console.log(`Gaston possède l'attribut ${attribut}`);
// Gaston possède l'attribut nom
// Gaston possède l'attribut prenom
// Gaston possède l'attribut profession
```

</div>
    

</section>
<section>

## Tableaux associatifs ?

Les objets JavaScript peuvent être aussi vus comme des «tableaux
associatifs» en lisant autrement leurs attributs :

```js
let p = {nom:"Dupont",prenom:"Pierre",age:35};
p.nom; // → "Dupont"
p.prenom; // → "Pierre"
p.age; // → 35
p["nom"]; // → "Dupont"
p["pre" + "nom"]; // → "Pierre"
p["age"]; // → 35
```

<br>

**Avantage** de la syntaxe `obj[expr]` : `expr` est évalué

</section>

<!--

Selon la syntaxe de création d'objet, les méthodes appartiennent soit à l'objet, soit au prototype :
* litérale : à l'objet
* constructeur seul : constructeur au prototype, reste dans l'objet
* classe : constructeur + méthode au prototype, reste dans l'objet

On peut le vérifier en créant 2 instances et en testant l'égalité ===
entre 2 méthodes.
On peut le voir avec l'autocomplétion dans Node qui sépare selon l'appartenance
On peut le voir avec l'affichage d'un objet dans la console, il faut dérouler
pour voir les méthodes du prototype

// Dans ce cas, les méthodes sont stockées dans l'objet p 
let p = {nom: "Haddock", prenom: "Archibald", parler: function () {}};

// Dans ce cas, les méthodes sont stockées dans l'objet commun __proto__
class Personne {
    constructor(nom, prenom, profession) {
        this.nom = nom;
        this.prenom = prenom;
        this.profession = function() {};
    }

    myField = 0

    parler() {
        console.log("mille sabords !");
    }
}
let cap = new Personne()
cap.__proto_ →tab list les méthodes au fur et à mesure de la chaine prototypale
cap.__proto__. constructor/parler
cap.__proto__.__proto__. hasOwnProperty/toString/valueOf
 -->