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
Nous considérerons en pratique que l'unité de base est la
"case", un petit carré de taille fixée (à 5x5 pixels par exemple).  Le
plateau ici représenté est un carré de 100x100 cases ; le serpent a
une case d'épaisseur ; une pomme, qui a la forme rêvée pour
l'industrie agro-alimentaire, prend exactement une case.

## Les différents fichiers de code

#### game.html

Votre programme Javascript sera lancé par un court fichier
**game.html**. Celui contiendra un titre, une ligne d'explication pour
donner la règle du jeu à l'utilisateur et chargera le fichier
**game.js** grâce à la balise `<script>` comme nous l'avons vu lors du
TD 1.

Il devra lancer le programme Javascript immédiatement après le
chargement du fichier en utilisant l'attribut `onload` de la balise
`<body>`. 
[Une explication sur cet attribut ?](http://www.w3schools.com/jsref/event_onload.asp)

#### game.css

Le fichier CSS précisera notamment la taille et la couleur des différents éléments graphiques :

- le plateau de jeu ;
- une case quelconque ;
- une case particulière qui est la pomme ;
- le joueur-serpent.

En fait, chaque case sera représentée par une `<div>` et différentes
classes permettront de différencier les éléments graphiques.

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
    // Ici: associer la fonction listenToEvent à un événement
    //      "touche (flèche) enfoncée"
    // Ici: déclencher une fonction onTick à intervalles 
    //      réguliers (ex: 0.1 seconde)
};
~~~
{:.javascript}

Quelques rappels sur les [gestionnaires d'événements](http://www.xul.fr/ecmascript/event.php) et les [événements
périodiques](http://www.w3schools.com/jsref/met_win_setinterval.asp).

Remarque : cette structure de programme permet de transmettre les
variables et les constantes définies dans **loadGame** à toutes les
autres fonctions.

#### Dessiner le plateau (fonction **createBoard**)

Une façon simple de procéder consiste à créer une `<div>` de classe
**board** contenant de nombreuses `<div>` de classe **case**, dont
certaines sont de classe **case player**. Comment fabriquer ces `<div>` me direz-vous ?

- Vous avez appris à faire des boucles ? C'est l'occasion de les
  utiliser pour créer les cases/div de haut en bas et de gauche à
  droite. 

- Facile à dire, mais plus difficile à faire sans utiliser les méthodes **createElement** et 
**appendChild** que vous maîtrisez depuis une semaine déjà.

- Hum, il manque quelque chose. Quand on a parlé du CSS, on a bien dit
  que chaque case appartenait à une classe précise. Il faut donc
  ajouter une classe à (la liste des classes de) la **div** créée en
  utilisant
  [element.classList](https://developer.mozilla.org/fr/docs/Web/API/Element/classList).
  N'oubliez pas d'ajouter des pommes quand-même, sans quoi votre jeu
  serait ennuyeux. Ce qui différencie une jolie pomme verte d'une
  vilaine case bleue est simplement sa classe CSS. Pour l'emplacement
  des pommes, l'idéal serait de les placer un peu aléatoirement sur le
  plateau, mais vous pouvez commencer par les placer régulièrement,
  comme vos paresseux professeurs l'ont fait (cf. figure 1).

- Et comment les cases se mettraient dans le bonne ordre ? Il faut
  effectivement ajouter dans le CSS (à vous de réfléchir précisément où quand-même !) la bonne valeur `inline-block` à
  la propriété **display**. [Petit
  rappel <span style="text-decoration: line-through">pour ceux qui aiment comprendre.</span>](http://openclassrooms.com/courses/apprenez-a-creer-votre-site-web-avec-html5-et-css3/le-positionnement-en-css)


#### Le joueur-serpent (**objet player**)

La programmation aisée de ce jeu repose sur l'objet
**player** défini au début de la fonction **loadGame**. Ses attributs
et méthodes sont les suivants :

- L'attribut **body** qui est un
  [array](http://www.w3schools.com/js/js_arrays.asp) d'objets
  `{PositionX, PositionY}` correspondant aux différents éléments/cases
  ("anneaux" dans le langage animalier) du serpent. On propose de
  mettre la tête du serpent à la fin du tableau. Pourquoi ? Parce
  qu'il ne faut pas oublier que notre serpent doit grandir d'une case
  quand il mange une pomme (d'une case). Il s'allonge donc par
  l'avant. Et comme il est facile en Javascript d'ajouter un élément
  en queue de tableau, géré en fait comme une file, en utilisant un
  [push](http://www.w3schools.com/jsref/jsref_push.asp), on trouve
  notre tête de serpent en queue de tableau ! Elémentaire non ?

  Sérieusement, lisez-bien les deux liens ci-dessus pour bien
  comprendre les tableaux en Javascript, sinon on vous casse la tête
  et la queue !

- La méthode **head** qui permet de récupérer la tête du serpent, en
  queue de tableau si vous avez suivi.

- L'attribut **lastDirection** qui donne la direction courante du
  serpent, parmi les quatre possibles : **Key_UP**, **Key_RIGHT**,
  **Key_DOWN**, **Key_LEFT**.

- La méthode **moveOnDirection** qui va permettre de faire avancer
  notre serpent et qui mérite bien un paragraphe réservé.

#### La méthode **moveOnDirection**

Cette méthode va permettre au joueur-serpent de se déplacer sur le
plateau de une case dans la direction courante. Elle prend en
paramètre la direction courante du serpent (appelée
*oneDirection*). Deux grands cas de figure :

- Soit le serpent ne mange pas de pomme (c'est-à-dire la tête du
  serpent ne passe pas sur une pomme) auquel cas il faudra ajouter un
  anneau en tête de serpent (en fin de tableau), mais aussi enlever un
  anneau en queue pour simuler le déplacement. Utiliser
  [slice](http://www.w3schools.com/jsref/jsref_slice_array.asp) pour
  supprimer le premier élément du tableau **body**.

- Soit le serpent mange une pomme, et on se contente alors d'ajouter
  un anneau en tête du serpent (pas de suppression en début de
  tableau). Dans une version plus avancée, on pourra enlever la pomme
  mangée, en remettre d'autres si désertification, etc.

- Et comment sait-on si la tête passe sur une pomme ? Et bien on
  fabrique une fonction booléenne **checkForFruit**. Comme c'est
  l'anniversaire de la soeur d'un de vos enseignants, on vous fait
  cadeau d'une version, certes peu efficace en temps de calcul
  (pourquoi ?), et à condition de bien comprendre.

~~~
function checkForFruit(){
  var allCases = document.querySelectorAll(".board .case");
  var indice = player.head().positionX * DIM_X
               + player.head().positionY;
  return allCases[indice].classList.contains("fruit");
};
~~~
{:.javascript}

Pour résumer, la méthode **moveOnDirection** teste si une pomme se
trouve sur la route (**checkFruit**), modifie les extrémités du
tableau **body** (en fonction de la direction *oneDirection*), met à
jour l'attribut **lastDirection** et appelle finalement la fonction
**updatePlayerPosition** pour synchroniser le contenu de **body** avec
les classes des cases du plateau.

Cette fonction vous dit quelque chose ? Et oui, elle est déjà appelée
au tout début du jeu, après la création du plateau, histoire
d'afficher le serpent. Quelques mots sur cette fonction alors.

#### La fonction **updatePlayerPosition**

Cette fonction affiche le serpent sur le plateau en fonction de
**player.body**. Une manière simple et peu efficace consiste à faire
un peu comme pour **checkFruit** :

1. On récupère toutes les `<div>` de classe `player` et on leur
[enlève cette
classe](https://developer.mozilla.org/fr/docs/Web/API/Element/classList).

2. On récupère ensuite toutes les `<div>` du plateau dans un
tableau. Puis, pour chaque anneau dans **player.body**, on calcule son
indice dans le tableau et on ajoute la classe **player** à la **div**
correspondante.

#### La fonction **onTick**

Voilà une fonction très importante déclenchée à intervalles réguliers de temps. Qu'est-ce qu'elle fait à votre avis ? Et bien elle avance ! C'est elle qui fait appel à notre superbe méthode **moveOnDirection**. Une petite condition quand-même : ne pas sortir du plateau. 

Merci donc de définir une petite fonction **isMoveOk(player,direction)**.

#### La fonction **listenToEvent**

On a failli l'oublier celle-ci. Par chance, elle est simple. On
récupère l'événement (flèche enfoncée donnant la direction) et on
modifie la direction de l'objet **player**. Et c'est tout !

## Dans quel ordre tester votre code ?

Ce serait bien d'y réfléchir avant de vous lancer tête baissée dans le
développement, non ? Et bien, débrouillez-vous, l'équipe enseignante
est un peu débordée !

Non, juste un petit conseil pour les premiers tests : ne pas lancer la
fonction **onTick** (qu'on a du mal à arrêter comme vous l'imaginez),
et faites avancer votre serpent avec **listenToEvent** qui appellera
(momentanément) **updatePlayerPosition**.

## Extensions (bonus)

Si vous avez fini avant la fin de la séance, vous êtes très fort... et nous, enseignants, un peu embêtés. Il vous reste alors à améliorer un peu ce que l'on vous a suggéré ci-dessus, par exemple :

- Supprimer les fruits dès qu'ils sont mangés

- Trouver un but du jeu, autre que de manger, même si la prise
  d'énergie est une motivation bien connue chez tous les êtres
  vivants, même les serpents...

- Ajouter un deuxième joueur en "local" avec les touches E, S, D, X par exemple.

- Travailler sur les css pour rendre le jeu un peu plus sexy (couleurs styles animations/transitions).

## Quelques liens

- [La présentation des outils de développements sur le site de Chrome](https://developer.chrome.com/devtools)
- [Le site de Mozilla sur les technologies Web](https://developer.mozilla.org/fr/)
- [La structure d'arbre du HTML](http://fr.eloquentjavascript.net/chapter12.html)

