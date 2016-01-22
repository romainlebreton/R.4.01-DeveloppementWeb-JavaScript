---
title: TD2 &ndash; Qui veut gagner des millions
subtitle: Gestion des évènements
layout: tutorial
---

<!--
Les questions sont plutôt détaillés. Ceux qui veulent être plus libre peuvent
essayer de construire leur jeu en suivant le déroulé global
-->

## Etapes :

ils partent de Quizz.html, Quizz.css et bootstrap.min.css

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

Premières fonctions :

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


Les questions :

Les données des questions sont présentes dans le fichier QA.js ci-joint

Liez le fichier à votre HTML juste avant Quizz.js Inspectez le fichier QA.js.

Testez dans la console que vous maitrisez le code pour récupérer la 1ère
question, la 2ème réponse possible à la 1ère question et l'identifiant de la
bonne réponse à la 1ère question.


Écrire les questions :

On souhaite créer une méthode displayNextQuestion qui affiche la prochaine
question. Rajoutez un attribut questionID que vous initialiserez à -1 dans
start. Alors displayNextQuestion incrémente questionID puis affiche le texte des
questions et réponse au bon endroit à l'intérieur des balises stockées dans
answerContainers et questionContainer.

<!-- utiliser innerHTML pour faciliter -->
<!-- Attention, il faut écrire dans la balise p des answerContainers[i] -->

Appeler displayNextQuestion à la fin de start.


Gérer la sélection d'une réponse :

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
   

<!--
ICI PB !!! Expliquer le pb avec this

Exemple :

var o1 = {x:1};
var o2 = {x:2};
function f_getX () { console.log(this.x); };
o1.getX = f_getX;
o1.getX();
o2.getX = f_getX;
o2.getX();

OU

var o1 = {x:1, getX: function () { console.log(this.x); }};
var o2 = {x:2, getX: function () { console.log(this.x); }};
o1.getX();
o1.getX = o2.getX;
o1.getX();

Peut-être solution
function (e) { game.select(e); }

-->

5. Faites en sorte que le bouton Valider soit désactivé au début de chaque
question. Et qu'il s'active dès qu'une question est validée.

<!--
Désactiver à la fin de displayNextQuestion
Activer à la fin de select
-->

Activer le bouton Valider à la fin de select


Validation d'une question :

La validation est la fonction déclenchée par un click sur le bouton
Valider. Cette fonction doit incrémenter le nombre de bonne réponse nbGood si la
bonne réponse (écrite dans data) est égaleq à l'identifiant de la question
selectionnée. (En profiter pour initialiser nbGood à 0 dans start).
Puis le jeu doit passer à la question suivante.

Au passage, on voit que l'on doit rajouter de la réinitialisation au début de
displayNextQuestion.

<!-- Il manque unselectAll() -->

Fin du jeu :

si on est arrivé à la dernière question, displayNextQuestion appelle une
nouvelle méthode endGame.

endGame

Cacher la partie jeu
Afficher la partie résultat
Affiche dans le bon paragraphe le résultat de la proportion de bonne réponse.


Bouton recommencer

Appel la fonction start
(et du coup, start doit afficher le jeu aussi)


-------- FIN DU JEU DE BASE -----------

Bouton fiftyfifty

Associer le bouton à une fonction fiftyFifty.

désactiver le bouton. Tirer au hasard 2 mauvaises réponses et les cacher (avec
disabled).
<!-- Personnellement, besoin des fonctions indexOf, push  -->

De plus, réafficher les réponses au début de chaque question (e.g. créer
fonction unhideAll similaire à unselectAll)



Bouton Call

Associer le bouton à une fonction callFriend.

Désactiver le bouton. Affiche une réponse au hasard (ou plus de chance d'avoir
la bonne réponse). Utilise alert qui affiche le message dans une fenêtre


------------ AJOUT DE FONCTION --------------


-------------- Autre ---------------------


+ tard que start affiche bien le div game, et disabled le validateButton
+ tard : questionId trop grand => endGame()


<!--
Idées / Question R

 Besoin de this ou implicite ?

 Rajouter un évènement avec du temps, genre un temps limite de réponse à la question
 Commencer par sélectionner (unselect, selected du bon, et enlève disabled du bouton valider)

Ordre des questions aléatoire

 This dans les gestionnaires d'évènements ?
 elt.onclick = function (e) {
    console.log(this);
	};

 Est-ce que la ligne suivante ne marche pas à cause du bind de this ?
 game.callButton.onclick = game.callFriend.bind(game);
game.callButton.onclick = function () {
    game.callFriend();
};
 -->
