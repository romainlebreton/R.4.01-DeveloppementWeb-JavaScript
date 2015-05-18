---
title: TD2 &ndash; Petit jeu en JavaScript
subtitle: Snake
layout: tutorial
---


## Brève présentation du jeu de serpent

Dans ce jeu assez simple jouable sur un navigateur, le joueur-serpent (unique !) se déplace pour manger des pommes, fruits du péché comme chacun sait. En l'occurrence quand le serpent passe sur une pomme, il grandit. La figure suivante donne une idée de ce que vous allez devoir coder.

![Snake game]({{site.baseurl}}/assets/snake.png)

Le plateau (en bleu) contient des pommes (en vert), et le serpent apparaît en rouge.

Remarque : 
Nous considérerons en pratique que l'unité de base est la "case", un petit carré de taille fixée (à 5x5 pixels par exemple). 
Le plateau ici représenté est un carré de 100x100 cases ; le serpent a une case d'épaisseur ; une pomme fait exactement une case, la forme rêvée pour l'industrie agro-alimentaire.

## Les différents fichiers de code

#### game.html

Votre programme Javascript sera lancé par un court fichier
**game.html**. Celui contiendra un titre, une ligne d'explication pour
donner la règle du jeu à l'utilisateur et chargera le fichier
**game.js** grâce à la balise `<script>` comme nous l'avons vu lors du
TD1.

Il devra lancer le programme Javascript immédiatement après le
chargement du fichier en utilisant l'attribut `onload` de la balise
`<body>`. 
[Une explication sur cet attribut.](http://www.w3schools.com/jsref/event_onload.asp)

#### game.css

Le fichier CSS précisera notamment la taille et la couleur des différents éléments graphiques :

- le plateau de jeu ;
- une case quelconque ;
- une case particulière qui est la pomme ;
- le joueur-serpent.

Nous préciserons plus loin une dernière propriété qui sera ajoutée à certains sélecteurs.

## Le programme Javascript (**game.js**)

#### Structure générale

Le programme se résumera à une fonction principale **loadGame**
contenant la définition d'un ensemble de variables et de constantes
(taille du plateau, code des touches **Key_UP**, **Key_RIGHT**, etc) d'un
ensemble de fonctions et de l'appel de la fonction principale
**initGame** définie comme suit :

~~~
function initGame(){
    createBoard();
    updatePlayerPosition();
    // Ici: associer la fonction **listenToEvent** à un événement "touche (flèche) enfoncée"
    // Ici: déclencher une fonction **onTick** à intervalles réguliers (ex: 0.1 seconde)
};
~~~
{:.javascript}

Quelques rappels sur les [gestionnaires d'événements](http://www.xul.fr/ecmascript/event.php) et les [événements
périodiques](http://www.w3schools.com/jsref/met_win_setinterval.asp).

Remarque : cette structure de programme permet de transmettre les
variables et les constantes définies dans **loadGame** à toutes les
autres fonctions.

#### Dessiner le plateau et le serpent (fonction **createBoard**)

Une façon simple de procéder consiste à créer une `<div>` de classe
**board** contenant de nombreuses `<div>`de classe **case**, dont
certaines sont de classe **case player**. Comment fabriquer ces `<div>` me direz-vous ?

- Vous avez appris à faire des boucles ? C'est l'occasion de les
  utiliser pour créer les cases/div de haut en bas et de gauche à
  droite.
- Et comment les cases se mettraient dans le bonne ordre ? Il faut
  effectivement ajouter dans le CSS (à vous de réfléchir précisément où quand-même !) la bonne valeur `inline-block` à
  la propriété **display**. [Petit
  rappel pour ceux qui aiment comprendre.](http://openclassrooms.com/courses/apprenez-a-creer-votre-site-web-avec-html5-et-css3/le-positionnement-en-css)

#### Le joueur-serpent (**objet player**)

La programmation aisée de ce jeu repose sur l'objet
**player** défini au début de la fonction **loadGame**. Ses attributs
et méthodes sont les suivants :

- L'attribut **body** est un [array](http://www.w3schools.com/js/js_arrays.asp) d'objets `{PositionX, PositionY}`.
- ....


#### La fonction **onTick**

#### La fonction **listenToEvent**


## Dans quel ordre tester votre code ?


## Extensions (bonus)


## Quelques liens

- [La présentation des outils de développements sur le site de Chrome](https://developer.chrome.com/devtools)
- [Le site de Mozilla sur les technologies Web](https://developer.mozilla.org/fr/)
- [La structure d'arbre du HTML](http://fr.eloquentjavascript.net/chapter12.html)

