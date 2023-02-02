---
title : Cours 1 <br> Introduction à JavaScript
subtitle : un tour d'horizon
layout : slideshow
lang: fr
---

<section>

# Introduction à JavaScript

Slides de Sébastien Gagné

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

 -->
# Plan du cours

1. Généralités sur JavaScript

    -   Bref historique de JS
    -   Environnement de travail
    -   Caractéristiques générales de JS

1. Variables en JavaScript

    -   Les types principaux
    -   Déclaration des variables
    -   Portée des variables
    -   Opérateurs classiques
    -   Quelques méthodes intéressantes

1. Tableaux en JavaScript

    -   Déclarations possibles d’un tableau
    -   Contenu d’un tableau et accès au contenu
    -   Parcours d’un tableau
    -   Méthodes et attributs classiques d’un tableau
    -   Autres méthodes d’un tableau
    -   Tableaux associatifs ?

1. Fonctions en JavaScript

    -   Fonctions natives importantes
    -   Fonctions construites
    -   Fonctions anonymes

1. Objets en JavaScript


</section>

# Généralités sur JavaScript

1. **Bref historique**

   1. Années 1990 - Dynamic HTML – effets sur les pages web

      - Langage écrit en 1995 par Brendan EICH chez Netscape, pour associer des scripts à des éléments HTML. ![Brendan EICH]({{site.baseurl}}/assets/class1/Brendan%20EICH.jpg)
        
      - Permet d’obtenir des pages web dynamiques, en interaction avec l’utilisateur. Action sur la structure du document HTML.
        
      - Adoption générale et très rapide du concept de dynamisation du HTML par des scripts côté client.
        
      - Standard 96-97 (ECMAScript) aujourd’hui version 8
        
      - Déclinaison d’ECMAScript suivant les navigateurs :
        -   Mozilla  : JavaScript
        -   Microsoft : JScript

# Généralités sur JavaScript

1.  **Bref historique**

    2. Années 2000 – Librairies évoluées

       -   Jquery, MooTools, AngularJS, … : proposent un   ensemble de fonctions, ou
           même un cadre de travail   complet pour JavaScript.
       -   AJAX (utilisation « asynchrone » de JavaScript pour  gérer des appels au
           serveur de données). Voir TD5 et suivants.

    2. Années 2010 – Ère moderne

       -   Évolution de JavaScript : utilisation du langage  côté serveur (retour aux
           origines).
       -   Tendance actuelle : un seul langage dans la pile web, par exemple
           remplacer PHP par JavaScript.
       -   Node.js pour des serveurs web écrits en JavaScript.

# Généralités sur JavaScript

2. **Environnement de travail**

   1.   la console du navigateur

        Endroit idéal pour tester le code, en interaction directe avec la page
        web. Outil indispensable. Les exemples du cours sont testés dans la
        console.

   2. l’éditeur de texte

        Comme pour tous les autres langages web, on peut se contenter d’un
        éditeur de texte pour coder.

   3. sites dédiés

        Certains sites permettent l’élaboration et le test du code client :
        html, css et JavaScript. Par ex :

        -   <https://codepen.io/>
        -   <https://jsbin.com/>

# Généralités sur JavaScript

3. **Caractéristiques générales de JavaScript**

   1. langage qui dynamise les pages web côté client

        Au moyen de scripts interprétés au niveau du navigateur, la page web
        est rendue dynamique côté client (voir TD1), souvent par une gestion
        des événements (clics, ...). Ceci est un point de vue différent de
        la dynamique côté serveur (PHP), où on gère des informations
        envoyées (formulaires) ou en provenance de la base de données.
   
   1. langage interprété
    
        JavaScript est interprété au niveau du navigateur, sans la moindre
        compilation. L’exécution des scripts dépend de l’activation, côté
        client, de l’interpréteur JavaScript.

# Variables en JavaScript

1. **Les types principaux**

    * JavaScript propose 7 types différents, nous en utiliserons essentiellement
      4 :

      -   `Number` (les nombres, quels qu’ils soient)
      -   ``String`` (chaînes de caractères)
      -   `Boolean` (les booléens)
      -   `Object` (tous les objets JavaScript)

   * Les 3 autres types (`Null`, `Undefined` et `Symbol`) sont pour nous moins
     communs.

   * Le typage JavaScript est :

     -   Faible : Pas de type indiqué à la déclaration.
     -   Dynamique : Le type d’une variable peut changer.

# Variables en JavaScript

2. **Déclaration des variables**

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

# Variables en JavaScript

3. **Portée des variables**

    1. **variables locales**

        * Une variable déclarée avec `let` a pour portée le bloc contenant (fonction, boucle `for`, …).

        ```js
        for(let i = 0; i < 2; i++) {
            console.log(i)
        }
        // → 0
        // → 1
        console.log(i)
        // → Uncaught ReferenceError: i is not defined
        ```

# Variables en JavaScript

3. **Portée des variables**

   1. **variables locales**

      -   Une variable déclarée avec `let` a pour portée le bloc contenant
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

# Variables en JavaScript

3. **Portée des variables**

   1. **variables locales**

      -   Une variable déclarée avec `let` a pour portée le bloc contenant
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

# Variables en JavaScript

3. **Portée des variables**

   1. **variables globales**

      -   Une variable déclarée dans la partie principale du script a donc
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

# Variables en JavaScript

4. **Opérateurs classiques**

   1. **opérateurs arithmétiques (entre variables de type `Number`)**

      -   On peut aussi utiliser les opérateurs classiques `+=`, `-=`, `*=`, `/=`, `%=`
          et `**=`

            | **Opérateur** | **Opération**  |
            | ------------- | -------------- |
            | `+`           | addition       |
            | `–`           | soustraction   |
            | `*`           | multiplication |
            | `/`           | division       |
            | `%`           | modulo         |
            | `**`          | puissance      |

# Variables en JavaScript

4. **Opérateurs classiques**

   1. **opérateurs logiques (entre variables de type `Boolean`)**

        | **Opérateur** | **Opération**                   |
        | ------------- | ------------------------------- |
        | `&&`          | "ET" logique                    |
        | `\|\|`        | "OU" logique                    |
        | `!`           | "NON" logique                   |
        | `==`          | égalité en valeur               |
        | `!=`          | différence en valeur            |
        | `===`         | égalité en valeur et en type    |
        | `!==`         | différence en valeur ou en type |

# Variables en JavaScript

4. **Opérateurs classiques**

   1. **concaténation (entres variables de type `String`)**

      -   La concaténation de chaînes de caractères se fait au moyen de
          l’opérateur `+` mais…
      -   ⚠️ ATTENTION : JavaScript est permissif…  
          Pour maîtriser le résultat de la concaténation, faire attention à
          l’interprétation de l’opérateur `+`

            | **opération**  | **résultat** |
            | -------------- | ------------ |
            | `"abc" + "de"` | `"abcde"`    |
            | `"3" + 1`      | `"31"`       |
            | `3 + 1 + "5"`  | `"45"`       |
            | `"5" + 3 + 1`  | `"531"`      |

# Variables en JavaScript

5. **Quelques méthodes intéressantes**

   1. **type Number (voir le `__proto__` en détail !)**
        ```js
        let x = 3.141592653589793;
        typeof(x); // → 'number'
        x.__proto__;
        ```
        donne ceci dans la console des outils de développement du navigateur
        ![Prototype methods]({{site.baseurl}}/assets/class1/proto.png)  
        On sait alors que l'on peut appeler
        ```js
        x.toPrecision(4);
        // → '3.142'
        x.toFixed(4)
        // → '3.1416'
        x.toString()
        // → '3.141592653589793'
        ```

# Variables en JavaScript

5. **Quelques méthodes intéressantes**

   1. **type String (voir VRAIMENT le** \_\_proto\_\_ **en détail !)**
        ```js
        let password = "@P9GXpXuF%sy";
        password.length; // → 12
        password.toUpperCase(); // → @P9GXPXUF%SY
        password.charAt(6); // → 'X'
        password.indexOf("%"); // → 9
        password.split("X"); // → [ '@P9G', 'p', 'uF%sy' ]
        ```

# Variables en JavaScript

5. **Quelques méthodes intéressantes**

   1. **type `String`**

    On peut aussi faire du remplacement de variables dans des chaînes de
    caractères.

    Il faut utiliser le délimiteur `\`` (accent grave).

    ```js
    let nom = 'Juste Leblanc';
    let p = `<p>
        Bonjour ${nom}
    </p>`;
    console.log(p);
    // <p>
    //     Bonjour Juste Leblanc
    // </p>
    ```

# Tableaux en JavaScript

1. **Déclarations possibles d’un tableau**

    Les tableaux JavaScript peuvent être déclarés par un appel à un
    constructeur de l’objet natif de JavaScript Array :

    ```js
    let tab = new Array("bonjour","salut","hello");
    ```

    Mais il est plus simple de les déclarer par :

    ```js
    let tab = ["bonjour","salut","hello"];
    ```

# Tableaux en JavaScript

2. **Contenu d’un tableau et accès au contenu**

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

# Tableaux en JavaScript

3. **Parcours d’un tableau**

   -   On peut parcourir un tableau par une boucle `for` classique qui
       utilise la longueur du tableau :

        ```js
        let tab=["bonjour", "hello", "salut", "coucou"];
        for (let i=0; i < tab.length; i++) {
            console.log(`mot n°${i} : ${tab[i]}`)
        }
        // mot n°0 : bonjour
        // mot n°1 : hello
        // mot n°2 : salut
        // mot n°3 : coucou
        ```

# Tableaux en JavaScript

3. **Parcours d’un tableau**

   -   On peut aussi parcourir un tableau par une boucle `for` particulière :

        ```js
        let tab=["bonjour", "hello", "salut", "coucou"];
        for (let mot of tab) {
            console.log(mot)
        }
        // bonjour
        // hello
        // salut
        // coucou
        ```

# Tableaux en JavaScript

4. **Méthodes et attributs classiques d’un tableau**

   1. **insertions**

      - en fin de tableau : `tab.push(elt1,elt2,...)`
        
      - en début de tableau : `tab.unshift(elt1,elt2,...)`

        Ces 2 méthodes retournent la nouvelle taille de `tab`

      - en général : `tab.splice(i,j,elt1,elt2,...)`

        *   `i` : endroit d’insertion
        *   `j` : nombre d’éléments à supprimer à partir de i
        *   `elt1`, `elt2`, … : éléments à insérer à partir de i

        Cette méthode retourne le sous-tableau composé des j éléments supprimés

# Tableaux en JavaScript

4. **Méthodes et attributs classiques d’un tableau**

   2. **suppressions**

      - en fin de tableau : `tab.pop()`
      - en début de tableau : `tab.shift()`
      - Ces 2 méthodes retournent l’élément supprimé

   3. **extractions**
   
      - en fin de tableau : `tab.slice(i)`  
        retourne le sous-tableau des indices k, k ≥ i
      - en milieu de tableau : `tab.slice(i,j)`  
        retourne le sous-tableau des indices k, i ≤ k \< j

# Tableaux en JavaScript

4. **Méthodes et attributs classiques d’un tableau**

   4. **agglomération**

      - `tab1.concat(tab2)`  
        retourne le tableau des éléments de `tab1` puis `tab2`
   5. **concaténation**
      - `tab.join("/")`  
        retourne la chaîne de caractères obtenue par concaténation des
        éléments de tab, séparés par le caractère passé en argument.
   6. **longueur**
      - longueur du tableau : `tab.length`


# Tableaux en JavaScript

5. **Autres méthodes d’un tableau**

-   Le `__proto__` d’un tableau est riche et sa lecture vous montrera
    d’autres méthodes intéressantes…

    <!-- Object.getOwnPropertyNames([].__proto__) -->

    ```js
    ['length', 'constructor', 'at', 'concat', 'copyWithin', 'fill', 'find', 'findIndex', 'lastIndexOf', 'pop', 'push', 'reverse', 'shift', 'unshift', 'slice', 'sort', 'splice', 'includes', 'indexOf', 'join', 'keys', 'entries', 'values', 'forEach', 'filter', 'flat', 'flatMap', 'map', 'every', 'some', 'reduce', 'reduceRight', 'toLocaleString', 'toString', 'findLast', 'findLastIndex']
    ```

# Fonctions en JavaScript

1. **Fonctions natives importantes**

    JavaScript propose un ensemble de fonctions nâtives qu’on utilisera régulièrement (voir TD1)

    Quelques exemples :

    -   `Math.random()`
    -   `Math.floor(3.14)`
    -   `"Dupont".replace("t","d")`

# Fonctions en JavaScript

2. **Fonctions construites**

    On peut aussi construire nos propres fonctions, comme dans le TD1.

    Utilisées dans la gestion des événements (clics de souris,…), elles
    se déclencheront si l’événement en question se produit. C’est ainsi
    qu’on rendra dynamiques (côté client) nos pages web.

    La syntaxe habituelle :
    ```js
    function suivant(n) {
        // Nombre suivant modulo 6
        return (n+1)%6;
    }
    suivant(1) // → 2
    suivant(5) // → 0
    ```

# Fonctions en JavaScript

3. **Utilisation classique d’une fonction**

    Le cas classique (pas le plus évolué) d’utilisation d’une fonction
    est décrit dans le code suivant :

    ```html
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>Utilisation de fonction</title>
    </head>
    <body>
        <p id="p1" onclick="f1()">Paragraphe 1</p>
        <p id="p2" ondblclick="f2()">Paragraphe 2</p>
        <script type="text/javascript">
            function f1() { alert("Vous avez cliqué sur p1"); }
            function f2() { alert("Vous avez double-cliqué sur p2"); }
        </script>
    </body>
    </html>
    ```

# Fonctions en JavaScript

4. **Fonctions anonymes**

    On peut déclarer une fonction sans lui donner de nom explicite, elle est
    donc anonyme.

    Cette situation peut se produire dans 3 cas :

    -   On déclare la fonction anonymement, mais on l’affecte à une
        variable… Ce qui revient en gros à donner un nom à la fonction…

        ```js
        let toto = function() {
            console.log("coucou");
        }
        toto(); // Affiche "coucou"
        typeof(toto); // → 'function'
        ```

# Fonctions en JavaScript

4. **Fonctions anonymes**

    On peut déclarer une fonction sans lui donner de nom explicite, elle est
    donc anonyme.

    Cette situation peut se produire dans 3 cas :

    -   On «auto-invoque» la fonction, c’est-à-dire on l’exécute
        immédiatement après sa déclaration.  
        La fonction est alors entourée de parenthèses, et suivie d’une paire
        de parenthèses, ce qui donne une syntaxe assez inhabituelle :
        ```js
        (function() {
            console.log("coucou");
        })();
        ```

# Fonctions en JavaScript

4. **Fonctions anonymes**

    On peut déclarer une fonction sans lui donner de nom explicite, elle est
    donc anonyme.

    Cette situation peut se produire dans 3 cas :

    -   On utilise la fonction anonyme associée à un événement (**le cas
        classique**), par ex. un clic :
        ```html
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>Utilisation de fonction</title>
        </head>
        <body>
            <input type="button" value="OK" id="bouton">
            <script type="text/javascript">
                let b = document.getElementById("bouton");
                b.addEventListener("click", function () {
                    alert("coucou");
                });
            </script>
        </body>
        </html>        
        ```

# Objets en JavaScript

JavaScript est orienté objet, nous allons donc nous retrouver en terrain
relativement connu. Mais il y a quelques différences avec Java par
exemple…

En Java, on définit de façon statique les classes qui servent à
instancier les objets. Les objets sont instanciés au moyen des classes
par appel à un constructeur :


```java
Personne p = new Personne("toto")
```

# Objets en JavaScript

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

# Objets en JavaScript

1. **création d’un objet de façon littérale**

    On peut définir un objet en donnant des paires clés-valeurs :
    ```js
    let p = {nom: "Haddock", prenom: "Archibald"};
    p.nom // → "Haddock
    ```
    `p` a été défini de façon littérale et complètement indépendante. Il
    peut être complété à tout moment :
    ```js
    p.profession = "marin";
    console.log(p);
    // → { nom: 'Haddock', prenom: 'Archibald', profession: 'marin' }
    ```

# Objets en JavaScript

1. **création d’un objet de façon littérale**

    On peut aussi créer l’objet avec des méthodes ou encore les ajouter
    après coup :
    ```js
    p.parler = function () {
        console.log("mille sabords !");
    }
    p.parler() // → "mille sabords !"
    ```

# Objets en JavaScript

2. **création d’un objet par une fonction constructeur**

    Cette méthode rappelle ce qu’on utilise en Java, mais la déclaration
    préalable des attributs n’a pas de sens puisqu’on peut en ajouter à
    tout moment…

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
    capitaine.nom // → "Haddock"
    capitaine.parler() // → "mille sabords !"
    ```
  

# Objets en JavaScript

3. **création d’un objet selon un modèle de classe**

    Façon plus classique de coder :
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
    }
    let capitaine = new Personne("Haddock", "Archibald", "marin");
    capitaine.nom // → "Haddock"
    capitaine.parler() // → "mille sabords !"
    ```

# Objets en JavaScript

4. **parcours des attributs et méthodes d’un objet**

    On peut parcourir l’objet par une boucle `for` :
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
    

# Objets en JavaScript

5. **Tableaux associatifs ?**

    Les objets JavaScript peuvent être aussi vus comme des «tableaux
    associatifs» en lisant autrement leurs attributs :

    ```js
    let p = {nom:"Dupont",prenom:"Pierre",age:35}
    p.nom // → "Dupont"
    p.prenom // → "Pierre"
    p.age // → 35
    p["nom"] // → "Dupont"
    p["prenom"] // → "Pierre"
    p["age"] // → 35
    ```

# Objets en JavaScript

6. **langage basé sur les prototypes**

-   JavaScript n’élabore pas les objets sur le concept de classes, mais sur le
    concept plus complexe de prototype.
-   `capitaine` et `professeur` sont construits selon le prototype de
    `Personne` (et donc héritent des attributs et méthodes).
-   On peut modifier le prototype après coup :
    ```js
    Personne.prototype.aurevoir = function() {
        alert("Bon vent !");
    }
    ```
-   `capitaine` et `professeur` héritent **dynamiquement** des méthodes du
    prototype de `Personne`...
    ```js
    capitaine.aurevoir();
    // → "Bon vent !"
    ```
