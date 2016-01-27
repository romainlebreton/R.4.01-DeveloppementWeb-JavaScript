---
title: TD2 &ndash; Qui veut gagner de l'argent en masse ?
subtitle: Gestion des événements
layout: tutorial
---

<!-- rajouter un konami code sur cette page de TD qui renvoie sur la page de qui
veut gagner de l'argent en masse -->

## Jeu de base

### Brève présentation du jeu

Dans ce jeu jouable sur un navigateur, le joueur doit répondre à des questions à
choix multiples en un temps limité. Une fois la série de questions écoulée, le
jeu se termine et affiche le nombre de bonnes réponses.

Pour aider le joueur, mais compliquer la vie du développeur, deux fonctions
d'aide seront disponibles : le fiftyfifty, qui enlève deux mauvaises réponses
sur les quatre choix, et l'appel à un ami qui sera simulé par un appel aléatoire
(biaisé dans le bon sens !).

La figure suivante donne une idée de ce que vous allez devoir coder.

<div class="centered">
![Qui veut gagner des millions]({{site.baseurl}}/assets/millions.png)
</div>

### Récupération des fichiers

Récupérer le fichier **HTML** et les fichiers de style suivants :

- [Quizz.html](../assets/Quizz/Quizz.html)
- [Quizz.css](../assets/Quizz/Quizz.css)
- [bootstrap.min.css](../assets/Quizz/bootstrap.min.css)

Le fichier `Quizz.html` contient deux **div** principaux:

1. Le `<div>` d'identifiant **game** contient le jeu principal, c'est-à-dire la
question courante et les 4 réponses possibles :
   - Le paragraphe d'identifiant **question** est à remplir avec le texte de la
     question.
   - Les `<div>` de classe **answer** :
     - Dans leur fils `<p>`, on doit mettre les réponses possibles.
     - Leur identifiant correspond au nom de la réponse (A, B, C ou D).

2. En bas du fichier, le `<div>` d'identifiant **results** permettra d'afficher
le score final, un commentaire et de recommencer à jouer en cliquant sur un
bouton restart. Plus précisément :
   - Le bouton d'identifiant **ok** validera une réponse.
   - Le bouton d'identifiant **restart** permettra de recommencer le jeu.

L'étudiant qui aura fini le développement du jeu pourra s'occuper de gérer les
deux jokers proposés, dont on peut voir les balises d'identifiants `call` (appel
à un ami) et `fifty` (50/50).

### Architecture générale et premières fonctions

On va mettre pratiquement tout le code JavaScript dans un objet **game**, dont
les méthodes lanceront le jeu, changeront la question, inscriront les
résultats...

<!-- La fin du fichier contiendra l'appel de la fonction **start**. Les dernières -->
<!-- instructions correspondent à des branchements d'événements à des fonctions de -->
<!-- traitement (handler). -->

En guise d'échauffement, nous allons créer notre objet **game** avec un premier
attribut et une première méthode. Aidez-vous du
[Cours 1]({{site.baseurl}}/classes/class1.html) pour retrouver la syntaxe des
objets en JavaScript.

<div class="exercise">
1. Dans l'objet **game**, créer un premier attribut **resultsContainer** qui
sélectionne le `<div>` des résultats à l'aide d'un `querySelector`.
1. Créer une première version de la méthode **start** qui cache
**resultsContainer** en lui ajoutant la classe **hidden** (déjà codée dans le
CSS).
1. Tester votre code dans la console.
</div>

Nous souhaitons maintenant regrouper notre code JavaScript dans un fichier
externe `Quizz.js`.

<!--

DOMContentLoaded

À la fin de game.js, associer notre fonction loadGame à l’événement DOMContentLoaded. Cet événement se produit quand la page a fini de se construire. Quelques rappels sur les gestionnaires d’événements.

-->

<div class="exercise">
1. Créer un fichier JavaScript `Quizz.js` avec le code précédent.
1. Lier le fichier JavaScript `Quizz.js` à la page `Quizz.html` avec la balise
`<script>` en fin de page Web (juste avant `</body>`).
<!-- dans l'en-tête de la page Web. -->
1. Exécuter la fonction **start** dans le fichier JS.

</div>


<div class="exercise">
1. Ajouter à l'objet **game** l'attribut **answerContainers** qui contient
**toutes** les balises de classe answer.
1. Ajouter à l'objet **game** les attributs suivants qui correspondent aux
autres éléments utiles de la page Web.

   ~~~
   questionContainer: document.querySelector("#question"),
   validateButton: document.querySelector("#ok"),
   restartButton:  document.querySelector("#restart"),
   callButton:  document.querySelector("#call"),	
   fiftyButton: document.querySelector("#fifty"),
   gameContainer: document.querySelector("#game"),
   ~~~
   {:.javascript}
</div>

### Les données des questions et des réponses

Les données des questions sont présentes dans le fichier
[QA.js](../assets/Quizz/QA.js).

<div class="exercise">
1. Établir un lien entre ce fichier et `Quizz.html` juste avant le lien avec
`Quizz.js`.
1. Inspecter le fichier `QA.js` pour comprendre sa structure.
1. Tester dans la console votre maîtrise du code en récupérant la 1ère question,
puis la 2ème réponse possible à la 1ère question et enfin l'identifiant de la
bonne réponse à la 1ère question.
</div>

### Afficher la prochaine question du jeu

On souhaite créer une méthode **displayNextQuestion** qui affiche la prochaine
question. Cette fonction se servira d'un attribut **questionID** qui stockera
l'indice de la question courante.

<!-- Ajoutez un attribut **questionID** initialisé à -1 dans **start**. -->

<div class="exercise">
1. Inspecter les balises contenues dans **questionContainer** et
**answerContainers** pour repérer l'endroit adéquat où inscrire les questions et
les réponses. Quelle solution vue lors du T1 permet d'accéder facilement à la
balise enfante d'un **answerContainers** où il faut écrire le texte ?
<!--
Attention, il faut écrire dans la balise p des answerContainers[i]
this.answerContainers[a_i].querySelector("p")
-->
1. Coder **displayNextQuestion** pour qu'elle affiche le texte de la question et
des réponses possibles au bon endroit à l'intérieur des balises stockées dans
**answerContainers** et **questionContainer**.  
  **Astuces :** On pourra utiliser l'attribut
[`innerHTML`](https://developer.mozilla.org/fr/docs/Web/API/Element/innertHTML)
pour ajouter facilement du texte aux balises. Ne pas oublier
d'initialiser **questionID** dans **start** et de la gérer dans
**displayNextQuestion**.

1. Appeler **displayNextQuestion** à la fin de la fonction **start** et vérifier
que la première question s'affiche. Appeler de nouveau **displayNextQuestion**
dans la console pour tester que cela passe bien à la question d'après.
</div>

### Gérer la sélection d'une réponse

Nous souhaitons pouvoir sélectionner une réponse. Pour cela, nous
ajouterons la classe **selected** à l'**answerContainer**
correspondant (ce qui aura aussi pour effet de changer sa
couleur). 

<div class="exercise">
Nous allons procéder en plusieurs étapes :

1. On souhaite créer un gestionnaire d'événement **click** associé à chacun des
**answerContainer**. Comme
[on l'a vu en cours]({{site.baseurl}}/classes/class2.html#lobjet-vnement), la
fonction donnée au gestionnaire reçoit comme paramètre l’objet événement.  Pour
mieux comprendre cet objet événement, créez un gestionnaire qui appellera une
fonction anonyme à un argument (l'objet événement) et affichera cet argument
dans la console. Tester la fonction et inspectez les attributs de l'objet
événement.  
**Note :** Une fonction anonyme est une déclaration de fonction sans nom comme
par exemple

   ~~~
   function () {
     alert("Leblanc, c'est son nom, et c'est Juste, son prénom.");
   };
   ~~~
   {:.javascript}

2. En utilisant l'attribut **currentTarget** de l'objet événement, retrouver l'élément HTML qui a vu
son gestionnaire d'événement appeler la fonction de traitement. Ajouter la
classe **selected** à cet élément. Tester la fonction.

3. Nous souhaitons que le code de la fonction soit plutôt dans l'objet **game** dans
une méthode appelée **select**. Créer la méthode et y déplacer votre code. Donner
la fonction **select** au gestionnaire d'événement.

4. Actuellement, les cases restent sélectionnées indéfiniment. Créer
une méthode **unselectAll** qui enlève la classe **selected** de tous
les **answerContainers**. Appeler cette méthode au début de la
fonction **select**.

<span style="color:red">**Attention**</span>, vous devez être arrivés
à un code comme suit qui pose un problème classique en
JavaScript. Faisons donc un aparté sur ce problème.

~~~
game = {
  unselectAll : function () {...},
  select : function (e) {
             this.unselectAll();
             ...
           }
};

var ac = game.answerContainers[0];
ac.addEventListener("click", game.select );
~~~
{:.javascript}

</div>

Le problème est que quand la fonction **select** est appelée, elle a été
déplacée dans un autre objet. Autrement dit, on a copié la fonction ailleurs
que dans l'objet **game**.  Donc la variable **this** de **select** (qui est
résolu au moment de l'exécution) ne pointe plus sur l'objet **game**. Et
`this.unselectAll()` n'appelle plus la fonction **unselectAll** de **game**.

<!-- En pratique, le this devient l'HTMLElement avec le gestionnaire
d'événement, càd game.answerContainers[0] dans notre cas -->

**Solution simple :**

Si on écrit

~~~
ac.addEventListener("click", function (e) {
                               game.select(e);
                             } );
~~~
{:.javascript}

alors on exécute bien la méthode **select** de **game** et nos problèmes
disparaissent. Pour ceux qui veulent creuser le problème, aller voir la
[dernière section](#plus-de-dtails-sur-larrachage-de-fonction).

<div class="exercise">
5. Corriger votre problème de la fin de la question précédente.
<!-- game.answerContainers[0].addEventListener("click", function (e) { -->
<!--         game.select(e); -->
<!--     }); -->


6. Faites en sorte que le bouton Valider soit désactivé au début de chaque
question. Et qu'il s'active dès qu'une réponse est sélectionnée.
<!--
Désactiver-le à la fin de **displayNextQuestion**
Activer-le à la fin de **select**.
-->
</div>

### Validation d'une question 

<div class="exercise">
1. La validation est la fonction déclenchée par un clic sur le bouton
**Valider**. Cette fonction doit incrémenter le nombre de bonne réponses
**nbGood** si la bonne réponse (écrite dans **data**) est égale à l'identifiant
de la question sélectionnée. (En profiter pour initialiser **nbGood** à 0 dans
**start**.)  Le jeu doit alors passer à la question suivante.

1. Profitons-en pour enlever une éventuelle sélection faite à la question
précédente en ajoutant l'appel à une méthode `unselectAll` au début de
**displayNextQuestion**.
</div>

### Fin du jeu 

<div class="exercise">
1. Si la dernière question a déjà été traitée, **displayNextQuestion** appelle
une nouvelle méthode **endGame**.

   La fonction **endGame** :

   - cache la partie jeu ;
   - affiche la partie résultat ;
   - affiche dans le paragraphe idoine la proportion de bonnes réponses.

1. Le bouton **Recommencer** appelle la fonction **start**. Du coup, la fonction
**start** doit afficher le jeu aussi.
</div>

## Fonctionnalités avancées

### Code Konami

Le principe du [code "Konami"](https://fr.wikipedia.org/wiki/Code_Konami) est
que si vous tapez le code secret

~~~
haut haut bas bas gauche droite gauche droite b a
~~~

dans le jeu, la bonne réponse s'affiche.

1. Créer une méthode **cheat** qui affiche la bonne réponse en utilisant **alert**.
1. Faites en sorte que toute touche pressée déclenche une méthode **konamiCode** 
<!-- addEventListener de "keydown" ou "keypress" -->
1. Créer une méthode **konamiCode** qui va concaténer les keycodes des touches pressées
dans une chaîne de caractères. Il restera à tester si la chaîne de caractères
correspondant au code Konami est présente dans la chaîne des touches pressées.  
   
**Conseils :**
   
   - Les codes ASCII (keycodes) du code Konami sont 38 38 40 40 37 39 37 39
   66 65.  Comme un code ASCII peut aller jusqu'à 255, on écrit tous les
   keycodes sur trois chiffres pour éviter toute ambiguïté.
   - On pourra utiliser la méthode
     [**indexOf**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/indexOf)
     pour rechercher une chaîne de caractères dans une autre.  


### Chronomètre (*timer*) de 5 secondes pour répondre aux questions

Observer d'abord la **div** de classe **progress-bar** dans le fichier
`Quizz.html`. Le principe consiste à lui attribuer le style "width:60%" pour la
remplir à 60%, etc... et c'est tout, l'affichage étant géré par le CSS (plus
précisément le framework Bootstrap). Il faut aussi bien sûr incrémenter ce
pourcentage au cours du temps imparti (5 secondes) entre 0% et 100%.

Voici quelques suggestions pour l'implantation du chronomètre. Sentez-vous
libre de partir sur votre idée si vous le souhaitez.
 
- une fonction `animateBar(percentage)` qui met à jour la **width** de la
  progress-bar ;
- un attribut **startTime** qui contient un temps en millisecondes (ou `""` par
  défaut) ;
- un attribut **questionDuration** qui prend la durée en millisecondes pour
  répondre à une question ;
- une fonction **updateBar** prenant en paramètre le temps courant (*timestamp*)
  en millisecondes. Cette fonction initialise `startTime=timestamp` si
  **startTime** est vide (càd non initialisé). Puis elle calcule le pourcentage
  de la progress-bar à afficher et appelle `animateBar(percentage)` pour
  modifier la **width** de la barre.
- Le jeu est lancé par **start** (qui affecte un attribut `gameRunning=true`) et est arrêté par **endGame** (`gameRunning=false`).
- La fonction **updateBar** est lancée par **displayNextQuestion** qui
  initialise aussi
`startTime=""`.   
**ATTENTION**, `updateBar` attend un *timestamp*, donc il vaut mieux l'appeler par
  **requestAnimationFrame** comme indiqué ci-après.
<!-- window.requestAnimationFrame(this.updateBar.bind(this)); 
-->
- **updateBar** est également appelée lors du prochain rafraîchissement (demandé dans **updateBar**) s'il reste du temps et
que le jeu est en cours (*gameRunning*). Pour ceci, utiliser
window.[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) prenant une fonction à un argument (le **timestamp**)
qui sera appelée (une fois) lors du prochain rafraîchissement.
- **updateBar** ne fait rien si le jeu est arrêté.
- **updateBar** appelle **validate** si le jeu est en cours et le temps imparti est dépassé.

### Bouton fiftyfifty

Associer le bouton à une méthode fiftyFifty qui désactive le bouton et tire au
hasard 2 mauvaises réponses pour les cacher (avec la classe `disabled`).
<!-- Personnellement, besoin des fonctions indexOf, push  -->

De plus, ré-afficher les réponses au début de chaque question (e.g. créer
une fonction `unhideAll` similaire à `unselectAll`).


### Bouton Call

Associer le bouton à une fonction `callFriend` qui désactive le bouton et
affiche une réponse au hasard (avec quand même plus de chance d'avoir la bonne
réponse). Utiliser `alert` pour afficher le message dans une fenêtre.

<!--
Idées / Question R

 Besoin de this ou implicite ?

 Rajouter un événement avec du temps, genre un temps limite de réponse à la question
 Commencer par sélectionner (unselect, selected du bon, et enlève disabled du bouton valider)

Ordre des questions aléatoire

 This dans les gestionnaires d'événements ?
 elt.onclick = function (e) {
    console.log(this);
  };

 Est-ce que la ligne suivante ne marche pas à cause du bind de this ?

 game.callButton.onclick = game.callFriend.bind(game);
 game.callButton.onclick = function () {
 game.callFriend();
};
 -->

## Plus de détails sur l'arrachage de fonction

Voici un autre exemple pour illustrer le problème

~~~
var o1 = {x:1, getX: function () { console.log(this.x); }};
var o2 = {x:2, getX: function () { console.log(this.x); }};
o1.getX();  // → 1
o1.getX = o2.getX;
o1.getX();  // → 2
~~~
{:.javascript}

La 4ème ligne copie la fonction `o2.getX` dans `o1`. L'erreur classique est de
croire que l'exécution de `o1.getX()` exécute la fonction `o2.getX` et renvoie
`o2.x` (`=2`). Or on a copié le code de la fonction dans `o1`. Donc `o1.getX()`
exécute `console.log(this.x`) dans le contexte de l'objet `o1` et renvoie `o1.x`
(`=1`).

#### Solution simple

Si on écrit

~~~
o1.getX = function () { o2.getX(); }
~~~
{:.javascript}

dans le code précédent, alors `o1.getX()` exécute la fonction anonyme, qui
elle-même exécute `o2.getX()`, càd la fonction `getX` de `o2` (dans le contexte
de `o2`). Ainsi elle renvoie `o2.x` (`=2`).

#### Solution plus complète :

Les méthodes d'un objet peuvent être vues comme des fonctions avec un argument
`this` en plus. On peut donc voir le code précédent

~~~
var o1 = {getX: function () { console.log(this.x); }};
~~~
{:.javascript}

comme étant équivalent au code suivant

~~~
o1.getX = function (this) { console.log(this.x); } 
~~~
{:.javascript}

Alors `o1.getX()` devient un raccourci pour `o1.getX(o1);`.  En interprétant le
code précédent de cette manière, on comprend mieux son comportement :

~~~
var o1 = {x:1, getX: function (this) { console.log(this.x); }};
var o2 = {x:2, getX: function (this) { console.log(this.x); }};
// la fonction o1.getX s'exécute avec l'argument this=o1
o1.getX(o1); 
o1.getX = o2.getX2;
// la fonction o1.getX (maintenant égal à o2.getX)
// s'exécute sur l'argument this=o1, ce qui renvoie o1.x
o1.getX(o1);
// o2.getX(o1) aurait fait exactement la même chose
~~~
{:.javascript}

L'autre solution consiste donc à expliciter quel est l'argument `this` que l'on
passe à une fonction, ce qui est fait en utilisant `bind` comme dans l'exemple
suivant :

~~~
var o1 = {x:1, getX: function () { console.log(this.x); }};
var o2 = {x:2, getX: function () { console.log(this.x); }};
o1.getX();
o1.getX = o2.getX.bind(o2); // Force l'argument this à être o2
o1.getX();
~~~
{:.javascript}

Ainsi

~~~
o1.getX = o2.getX.bind(o2);
~~~
{:.javascript}

signifie alors que `o1.getX` reçoit une fonction à zéro argument qui exécute
`o2.getX(o2);` comme dans le code suivant.

~~~
o1.getX = function () { this = o2; o2.getX(this); };
~~~
{:.javascript}

Remarquons que cette solution est similaire à la solution *simple*.
