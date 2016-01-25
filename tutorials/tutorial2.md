---
title: TD2 &ndash; Qui veut gagner des millions
subtitle: Gestion des événements
layout: tutorial
---

<!--
Les questions sont plutôt détaillés. Ceux qui veulent être plus libres peuvent
essayer de construire leur jeu en suivant le déroulé global
-->

# Jeu de base

## Étapes :

## Brève présentation du jeu

Dans ce jeu jouable sur un navigateur, le joueur doit répondre à des
questions à choix multiples en un temps limité. Une fois la série de
questions écoulée, le jeu se termine et affiche le nombre de bonnes
réponses.

Pour aider le joueur, mais compliquer la vie du développeur, deux
fonctions d'aide seront disponibles : le fiftyfifty, qui enlève deux
mauvaises réponses sur les quatre choix, et l'appel à un ami qui sera
simulé par un appel aléatoire (biaisé dans le bon sens !).

La figure suivante donne une idée de ce que vous allez devoir coder.

![Qui veut gagner des millions]({{site.baseurl}}/assets/millions.png)

## Etapes et architecture générale

Récupérer d'abord le fichier html et les fichiers de style suivants :

- [Quizz.html](../assets/Quizz/Quizz.html)

- [Quizz.css](../assets/Quizz/Quizz.css)

- [bootstrap.min.css](../assets/Quizz/bootstrap.min.css)

#### Quizz.html

Ce fichier contient deux **div** principaux. 

Le div d'id **game** contient le jeu principal, c'est-à-dire la
question courante et les 4 réponses possibles. Tout en bas, le div
d'id **results** permettra d'afficher le score final, un commentaire
et de recommencer à jouer en cliquant sur un bouton restart.


On leur explique les différents champs :
- div id game contient le jeu, càd les questions et les réponses
  - p id question : à remplir du texte de la question
  - div class answer :
    - dans leur fils p, on doit mettre les réponses possibles
    - leur id contient le nom de la réponse (A, B, C ou D)
  
- div id results doit afficher les résultats
- le bouton d'id ok doit valider une réponse 
- le bouton d'id restart doit permettre de recommencer le jeu

- les boutons bonus
  - la balise d'identifiant call
  - la balise d'identifiant fifty

## Premières fonctions :

Déjà, on va tout mettre dans un objet game (lien vers la partie du cours sur les objets)
Créer un premier attribut resultsContainer qui sélectionne l'élément des résultats à l'aide d'un querySelector
Créer une première méthode start qui cache resultsContainer en lui rajoutant la classe hidden

Lier le fichier JavaScript Quizz.js à la page avec la balise script en fin de page Web (juste avant /body)
Lancer la fonction start en fin de fichier JS


Rajouter à l'objet game l'attribut answerContainers qui contient **toutes** les balises de classe answer
Rajouter à l'objet game les attributs suivants qui correspondent aux autres éléments utiles de la page Web

    questionContainer: document.querySelector("#question"),
	
    validateButton: document.querySelector("#ok"),
    restartButton: document.querySelector("#restart"),
	
    callButton: document.querySelector("#call"),	
    fiftyButton: document.querySelector("#fifty"),
	
    gameContainer: document.querySelector("#game"),


## Les questions :

Les données des questions sont présentes dans le fichier QA.js ci-joint

Liez le fichier à votre HTML juste avant Quizz.js Inspectez le fichier QA.js.

Testez dans la console que vous maitrisez le code pour récupérer la 1ère
question, la 2ème réponse possible à la 1ère question et l'identifiant de la
bonne réponse à la 1ère question.


## Écrire les questions :

On souhaite créer une méthode displayNextQuestion qui affiche la prochaine
question. Rajoutez un attribut questionID que vous initialiserez à -1 dans
start. Alors displayNextQuestion incrémente questionID puis affiche le texte des
questions et réponse au bon endroit à l'intérieur des balises stockées dans
answerContainers et questionContainer.

<!-- utiliser innerHTML pour faciliter -->
<!-- Attention, il faut écrire dans la balise p des answerContainers[i] -->

Appeler displayNextQuestion à la fin de start.


## Gérer la sélection d'une réponse :

Nous souhaitons pouvoir sélectionner un réponse. Pour cela, nous rajouterons la
classe selected au bon answerContainer (ce qui aura aussi pour effet de changer
sa couleur). Nous allons procéder en plusieurs étapes:

1. Créer un gestionnaire d'évènement click associé à chacun des
answerContainer. Ce gestionnaire appelera une fonction anonyme à un argument et
l'affichera dans la console. Testez votre fonction.

**Note :** Comme l'on a vu en cours, la fonction donnée au gestionnaire reçoit
un paramètre : l’objet événement.
classes/class2.html#lobjet-vnement

2. Retrouvez l'attribut de l'objet évènement qui indique quel élément HTML a vu
son gestionnaire d'évènement appeler la fonction de traitement. Ajoutez la
classe selected à cet élément. Testez votre fonction.

<!-- e.currentTarget -->

3. Nous souhaitons que le code de la fonction soit plutôt dans l'objet game dans
une méthode appelée select. Créez la méthode et déplacez-ici votre code. Donnez
la fonction select au gestionnaire d'évènement.

4. Actuellement, les cases restent sélectionnées indéfiniment. Créez une méthode
   unselectAll qui enlève la classe selected de tous les
   answerContainers. Appelez cette méthode au début de select.
   

## APARTÉ

Attention, par défaut le code suivant pose un problème classique du Javascript

~~~
game =
{unselectAll : function () {...},
select : function (e) {this.unselectAll(); ...);
}

game.answerContainers[0].addEventListener("click", game.select(e) );
~~~
{:.javascript}

Le problème est que quand la fonction select est appelée, elle a été déplacée
dans une autre objet. Autrement dit, on a copié la fonction ailleurs que dans
l'objet game.  Donc la variable this (qui est résolu au moment de l'éxécution)
ne pointe plus sur l'objet game). Et this.unselectAll(); ne fait plus du tout ce
que l'on veut.

<!-- En pratique, le this devient l'HTMLElement avec le gestionnaire
d'évènement, càd game.answerContainers[0] dans notre cas -->

Voici un autre exemple pour illustrer le problème

~~~
var o1 = {x:1, getX: function () { console.log(this.x); }};
var o2 = {x:2, getX: function () { console.log(this.x); }};
o1.getX();
o1.getX = o2.getX;
o1.getX();
~~~
{:.javascript}

La 4ème ligne copie la fonction o2.getX dans o1. Erreur classique : On pourrait
croire que l'exécution de o1.getX() exécute la fonction o2.getX et renvoie o2.x
(=2). Or on a copié le code de la fonction dans o1. Donc o1.getX() exécute
console.log(this.x) dans le contexte de l'objet o1 ( et renvoie o1.x (=1)).

Solution simple :

Si on écrit o1.getX = function () { o2.getX(); } dans le code précédent, alors
o1.getX() exécute la fonction anonyme, qui elle-même exécute o2.getX(), càd la
fonction getX de o2 (dans le contexte de o2). Ainsi elle renvoie o2.x (=2).

Solution plus complète :

Les méthodes peuvent être vues comme des fonctions avec un argument this en plus.

On peut voir le code précédent

o1.getX = function (this) { console.log(this.x); } 
à la place de 
var o1 = {getX: function () { console.log(this.x); }};

et alors
o1.getX();
devient un raccourci pour
o1.getX(o1);

Du coup on comprend mieux le code précédent

~~~
var o1 = {x:1, getX: function (this) { console.log(this.x); }};
var o2 = {x:2, getX: function (this) { console.log(this.x); }};
o1.getX(o1); // équivaut à l'appel de la fonction o1.getX sur l'argument this=o1
o1.getX = o2.getX2;
o1.getX(o1); // équivaut à l'appel de la fonction o1.getX (maintenant égal à o2.getX) sur l'argument this=o1, ce qui renvoie o1.x
~~~
{:.javascript}

L'autre solution consiste donc à expliciter quel est l'argument this que l'on
passe à une fonction

~~~
var o1 = {x:1, getX: function () { console.log(this.x); }};
var o2 = {x:2, getX: function () { console.log(this.x); }};
o1.getX();
o1.getX = o2.getX.bind(o2); // Force l'argument this à être o2
o1.getX();
~~~
{:.javascript}

Pour mieux comprendre le bind, explicitons les arguments this

var o2 = {x:2, getX: function (this) { console.log(this.x); }};

o1.getX = o2.getX.bind(o2);
signifie alors que o1.getX reçoit une fonction à zéro argument qui exécute o2.getX(o2);
C'est donc un synonyme de notre solution précédente :

o1.getX = function () { o2.getX(o2); };

---- FIN DE L'APARTÉ ---

5. Corriger votre problème de la fin de la question 4

<!-- game.answerContainers[0].addEventListener("click", function (e) { -->
<!--         game.select(e); -->
<!--     }); -->


6. Faites en sorte que le bouton Valider soit désactivé au début de chaque
question. Et qu'il s'active dès qu'une question est validée.

<!--
Désactiver à la fin de displayNextQuestion
Activer à la fin de select
-->

Activer le bouton Valider à la fin de select


## Validation d'une question :

La validation est la fonction déclenchée par un click sur le bouton
Valider. Cette fonction doit incrémenter le nombre de bonne réponse nbGood si la
bonne réponse (écrite dans data) est égaleq à l'identifiant de la question
selectionnée. (En profiter pour initialiser nbGood à 0 dans start).
Puis le jeu doit passer à la question suivante.

Au passage, on voit que l'on doit rajouter de la réinitialisation au début de
displayNextQuestion.

<!-- Il manque unselectAll() -->

## Fin du jeu :

si on est arrivé à la dernière question, displayNextQuestion appelle une
nouvelle méthode endGame.

endGame

Cacher la partie jeu
Afficher la partie résultat
Affiche dans le bon paragraphe le résultat de la proportion de bonne réponse.


Bouton recommencer

Appel la fonction start
(et du coup, start doit afficher le jeu aussi)



# Fonctionalités avancées

## Konami Code


Le principe du konami code est que si vous tapez le code secret haut haut bas
bas gauche droite gauche droite b a dans le jeu, la bonne réponse s'affiche
https://fr.wikipedia.org/wiki/Code_Konami

Créer une méthode cheat qui affiche avec alert la bonne réponse

Faites en sorte que toute touche pressé déclenche la (future) méthode konamiCode 
<!-- addEventListener de "keydown" ou "keypress" -->

Créez un méthode konamiCode qui va concaténer les keycode des touches pressés
dans une chaine de caractère. Il restera à tester si la chaine de caractère
correspondant au konamicode est présente dans la chaine des touches pressés

<!--

les keycode du konami code sont 38 38 40 40 37 39 37 39 66 65

Idéalement, on écrit tous les keycode sur trois chiffres (le keycode donne le
code ASCII w= 256 d'un caractère) pour éviter toute ambiguité

Recherche d'une chaine de caractère dans une autre avec indexOf

-->


## Timer de 5sec pour les questions

J'ai rajouté un div de classe progress-bar. On lui met le style "width:60%" pour
la remplir à 60%.

Concernant le mécanisme de barre :
- une fonction animateBar(percentage) qui écrit la width de la progress-bar
- un attribut startTime vide par défaut ou qui contient un temps en ms
- un attribut questionDuration qui prend la durée en ms pour répondre à une question
- une fonction updateBar (timestamp) qui prend le temps courant en ms. Cette
  fonction initialise startTime=timestamp si startTime est vide. Puis elle
  calcule le pourcentage de la progress-bar à afficher et appelle
  animateBar(percentage).  

- le jeu est lancé par start (gameRunning=true) et arrété par endGame (gameRunning=false)
- updateBar est lancée par displayNextQuestion qui initialise aussi
startTime="";  
ATTENTION, updateBar attend un timestamp donc il faut mieux l'appeler par
  requestAnimationFrame comme indiqué ci-après
<!-- window.requestAnimationFrame(this.updateBar.bind(this)); -->
- updateBar s'appelle lors du prochain rafraichissement si il reste du temps et
que le jeu est en cours (gameRunning). Pour ceci, utiliser
window.requestAnimationFrame qui prend une fonction à un argument (le timestamp)
et l'appelle une fois lors du prochain rafraîchissement
  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame  
- updateBar ne fait rien si le jeu est arrété
- updateBar appelle validate si le jeu est en cours et le temps imparti est dépassé
  



## Bouton fiftyfifty

Associer le bouton à une fonction fiftyFifty.

désactiver le bouton. Tirer au hasard 2 mauvaises réponses et les cacher (avec
disabled).
<!-- Personnellement, besoin des fonctions indexOf, push  -->

De plus, réafficher les réponses au début de chaque question (e.g. créer
fonction unhideAll similaire à unselectAll)



## Bouton Call

Associer le bouton à une fonction callFriend.

Désactiver le bouton. Affiche une réponse au hasard (ou plus de chance d'avoir
la bonne réponse). Utilise alert qui affiche le message dans une fenêtre



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
