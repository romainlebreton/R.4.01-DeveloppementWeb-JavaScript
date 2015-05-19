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

Votre programme JavaScript sera lancé par un court fichier
**game.html**. Celui contiendra un titre, une ligne d'explication pour
donner la règle du jeu à l'utilisateur et un 

```html
<div class='board'>Activer JavaScript pour jouer</div>
```

Ce `<div>` contiendra plus tard le plateau de jeu. En attendant, il affiche un message par défaut aux utilisateurs n'ayant pas activé JavaScript.

Le fichier **game.html** chargera le fichier **game.css** et aussi le fichier
**game.js** grâce à la balise `<script>` comme nous l'avons vu lors du
TD 1.


#### game.css

Le fichier CSS précisera notamment la taille et la couleur des différents éléments graphiques :

- le plateau de jeu -- classe **board**;
- une case quelconque -- classe **case**;
- une case particulière qui est la pomme -- classe **fruit** (en plus de **case**);
- le joueur-serpent -- classe **player** (en plus de **case**).

En fait, chaque case sera représentée par une `<div>` et différentes
classes permettront de différencier les éléments graphiques.

Nous préciserons plus loin une dernière propriété qui sera ajoutée à certains sélecteurs.

## Le programme JavaScript (**game.js**)

#### Structure générale

<!--
Il devra lancer le programme JavaScript immédiatement après le
chargement du fichier en utilisant l'attribut `onload` de la balise
`<body>`. 
[Une explication sur cet attribut ?](http://www.w3schools.com/jsref/event_onload.asp)
-->

Le programme se résumera à une fonction principale **loadGame**
contenant la définition d'un ensemble de variables et de constantes
(taille du plateau, code des touches **Key_UP**, **Key_RIGHT**, etc) d'un
ensemble de fonctions et de l'appel de la fonction principale
**initGame**.

```javascript
function loadGame(){

    //static variables
    var DIM_X = 100;
    var DIM_Y = 100;

    var DIR_NONE = "";
    
    var Key_UP = 38;     // Code ASCII des flèches
    var Key_RIGHT = 39;
    var Key_BOTTOM = 40;
    var Key_LEFT = 37;

    //attribute variables
    var player = {};

    function checkForEnding(){
	// Optional : Check if :
	// - player head is crashed on his own body,
	// - isMoveOk return false
    };

    function listenToEvent(e){};

    function isMoveOk(player,oneDirection){};

    function onTick(){};

    function checkForFruit(){};

    function updatePlayerPosition(){};

    function createBoard(){};

    function initGame(){
        console.log("Chargement du jeu");
        createBoard();
        updatePlayerPosition();
        // Ici: associer la fonction listenToEvent à un événement
        //      "touche (flèche) enfoncée"
        // Ici: déclencher une fonction onTick à intervalles 
        //      réguliers (ex: 0.1 seconde)
    };

    initGame();
}; // Fin de loadGame

// Ici: associer la fonction loadGame à la fin du chargement de la page HTML
```


**Remarque :** cette structure de programme permet de transmettre les
variables et les constantes définies dans **loadGame** à toutes les
autres fonctions.  
De plus, les variables et fonctions définies dans **loadGame** sont locales à cette fonction (et à ses sous-fonctions). Ces variables ne sont pas globales et ne risquent pas de rentrer en conflit avec d'autres script.

#### Lancer le jeu au chargement de la page

À la fin de **game.js**, associer notre fonction **loadGame** à l'événement `DOMContentLoaded`. Cet événement se produit quand la page a fini de se construire.
Quelques rappels sur les [gestionnaires d'événements](http://www.xul.fr/ecmascript/event.php).
<!-- 
et les [événements
périodiques](http://www.w3schools.com/jsref/met_win_setinterval.asp).
-->

Vérifiez que le message "Chargement du jeu" est bien affiché dans la console des outils de développement.

#### Dessiner le plateau (fonction **createBoard**)

Une façon simple de procéder consiste d'abord à vider la `<div>` de classe
**board** de son texte 
(utilisez [removeChild](https://developer.mozilla.org/fr/docs/Web/API/Node/removeChild)
 ou [innerHTML](https://developer.mozilla.org/fr/docs/Web/API/Element/innertHTML)).

Puis mettez dans le plateau de nombreuses `<div>` de classe **case**.
<!-- dont certaines sont de classe **case fruit**. -->
Comment fabriquer ces `<div>` me direz-vous ?

- Vous avez appris à faire des boucles ? C'est l'occasion de les
  utiliser pour créer les cases `<div class='case'>` de haut en bas et de gauche à
  droite. Utiliser les méthodes **createElement**, **appendChild** 
  que vous maîtrisez depuis une semaine déjà.

- Hum, il manque quelque chose. Quand on a parlé du CSS, on a bien dit
  que chaque case appartenait à une ou plusieurs classes précises. Il faut donc
  ajouter une classe à (la liste des classes de) la `<div>` créée en
  utilisant
  [**element.classList.add**](https://developer.mozilla.org/fr/docs/Web/API/Element/classList).

- Et comment les cases se mettraient dans le bonne ordre ? Il faut
  effectivement ajouter dans le CSS (à vous de réfléchir précisément où quand-même !) la bonne valeur `inline-block` à
  la propriété **display**. [Petit
  rappel ](http://openclassrooms.com/courses/apprenez-a-creer-votre-site-web-avec-html5-et-css3/le-positionnement-en-css)[<span style="text-decoration: line-through">pour ceux qui aiment comprendre.</span>](https://developer.mozilla.org/fr/docs/Web/CSS/display).  
  **Note :** Si vos cases s'affichent plutôt comme des rayures, rajouter le style CSS `line-height:0` au plateau **board**. 
<!-- Ou `font-size:0` si çà ne marche toujours pas, mais seulement au chargement du JS -->

- N'oubliez pas d'ajouter des pommes quand-même, sans quoi votre jeu
  serait ennuyeux. Ce qui différencie une jolie pomme verte d'une
  vilaine case bleue est simplement qu'elle possède les classes **case** ET **fruit**.
  - Pour l'emplacement
    des pommes, l'idéal serait de les placer un peu aléatoirement sur le
    plateau, mais vous pouvez commencer par les placer régulièrement,
    comme vos paresseux professeurs l'ont fait (cf. figure 1).
  - N'oubliez pas de changer le style CSS des `<div>` de classes **case** et **fruit**.


#### Le joueur-serpent (**objet player**)

La programmation aisée de ce jeu repose sur l'objet
**player** défini au début de la fonction **loadGame**. Ses attributs
et méthodes sont **body**, **head**, **lastDirection** et **moveOnDirection**.

Commençons par créer le corps du serpent **player.body**.

L'attribut **body** qui est un tableau de points, chaque point étant un objet comme
  `{PositionX:1, PositionY:2}`. Les points correspondent aux différents éléments/cases
  ("anneaux" dans le langage animalier) du serpent.  
  **Rappel :** Syntaxe des [objets](http://romainlebreton.github.io/ProgWeb-ClientRiche/classes/class1.html#les-objets) et des 
[tableaux en JavaScript](http://romainlebreton.github.io/ProgWeb-ClientRiche/classes/class1.html#les-tableaux).
  

  On propose de
  mettre la tête du serpent à la fin du tableau. Pourquoi ? Parce
  qu'il ne faut pas oublier que notre serpent doit grandir d'une case
  quand il mange une pomme (d'une case). Il s'allonge donc par
  l'avant. Et comme il est facile en JavaScript d'ajouter un élément
  en queue de tableau, géré en fait comme une file, en utilisant un
  [push](http://www.w3schools.com/jsref/jsref_push.asp), on trouve
  notre tête de serpent en queue de tableau ! Élémentaire non ?

  Sérieusement, lisez-bien les deux liens ci-dessus pour bien
  comprendre les tableaux en JavaScript, sinon on vous casse la tête
  et la queue !

#### La fonction **updatePlayerPosition**

Cette fonction affiche le serpent sur le plateau en fonction de
**player.body**. Une manière simple et peu efficace est la suivante :
<!-- consiste à faire un peu comme pour **checkFruit** : -->

1. On récupère toutes les `<div>` de classe `player` et on leur
[enlève cette
classe](https://developer.mozilla.org/fr/docs/Web/API/Element/classList).

2. On récupère ensuite toutes les `<div>` de class **case** du plateau dans un
tableau. 

3. Puis, pour chaque anneau dans **player.body**, on calcule son
indice dans le tableau et on ajoute la classe **player** à la **div**
correspondante.  
**Remarque :** Prenez le temps d'écrire la formule pour calculer l'indice dans le tableau en fonction de **DIM_X**, **DIM_Y** et des coordonnées de l'anneau du serpent **PositionX** et **PositionY** ?

#### Déplacements du serpent

Le déplacement du serpent requiert de nouveaux attributs ou méthodes de l'objet **player**:

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
  l'anniversaire de la sœur d'un de vos enseignants, on vous fait
  cadeau d'une version, certes peu efficace en temps de calcul
  (pourquoi ?), et à condition de bien comprendre.

~~~
function checkForFruit(){
  var allCases = document.querySelectorAll(".board .case");
  var indice = player.head().positionX
               + player.head().positionY * DIM_X;
  return allCases[indice].classList.contains("fruit");
};
~~~
{:.javascript}

Pour résumer, la méthode **moveOnDirection** teste si une pomme se
trouve sur la route (**checkFruit**), modifie les extrémités du
tableau **body** (en fonction de la direction *oneDirection*)
<!-- , met à jour l'attribut **lastDirection**-->
et appelle finalement la fonction
**updatePlayerPosition** pour synchroniser le contenu de **body** avec
les classes des cases du plateau.

Cette fonction vous dit quelque chose ? Et oui, elle est déjà appelée
au tout début du jeu, après la création du plateau, histoire
d'afficher le serpent. Quelques mots sur cette fonction alors.

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

