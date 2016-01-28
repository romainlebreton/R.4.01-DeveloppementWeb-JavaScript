---
title: TD3 &ndash; Autocomplétion par requêtes asynchrones
subtitle: AJAX sans trace
layout: tutorial
---

<!-- Proposer d'étendre le quizz avec de l'asynchronisme . Un serveur gererait les questions et les réponses -->

<!-- Rajouter async et/ou defer -->

<!-- Rajouter du DOMContentloaded -->
<!-- Constatez que cela produit -->
<!-- une erreur qui s'affiche dans la console des outils développeurs. Rajoutez un -->
<!-- affichage de **resultsContainer** dans **start** pour comprendre d'où vient -->
<!-- l'erreur. -->
<!-- <\!-- console.log(resultsContainer) doit renvoyer null -\-> -->
<!-- 1. En fait, le JS ne trouve pas **resultsContainer** car il n'a pas été -->
<!--    construit dans la page Web au moment où le JavaScript est exécuté. Nous -->
<!--    allons donc attendre que la page ait fini de se construire avant d'appeler -->
<!--    **start**. Pour cela, associer notre fonction à l'évènement -->
<!--    [`DOMContentLoaded`](https://developer.mozilla.org/fr/docs/Web/Events/DOMContentLoaded) -->
<!--    (lisez sa documentation) avec le code suivant -->


## Brève présentation du TD

Nous souhaitons coder une fonction d'autocomplétion pour des entrées de formulaire. Aujourd’hui, notre formulaire va demander de renseigner son pays et sa ville. Nous allons développer deux mécanismes différents d'aide à la complétion :

1. Une aide locale pour le choix du pays :  
   On envoie la liste des pays (et des continents) à l'utilisateur. Le JavaScript travaille en local, c'est-à-dire qu'il n'a pas besoin de communiquer avec le serveur.
2. Une aide à distance pour le choix de la ville :  
   La liste des villes de France (ou du monde) étant trop grande, le serveur ne peut pas raisonnablement l'envoyer au client à chaque chargement de la page. La liste reste donc le serveur. Le client devra donc demander au serveur la liste des villes correspondantes aux premières lettres actuelles.

Commençons par l'approche la plus intéressante conceptuellement : l'aide à distance pour le choix de la ville, car elle nécessite des requêtes asynchrones.

## Autocomplétion des villes par requêtes asynchrones

Nous allons démarrer avec un squelette de la page de formulaire. Veuillez donc télécharger les fichiers suivants et créer un projet PHP avec :

* la page HTML : [Completion.html]({{site.baseurl}}/assets/CitySelect/Completion.html) ;
* la feuille de style CSS : [Completion.css]({{site.baseurl}}/assets/CitySelect/Completion.css) ;
* la page côté serveur avec qui le client ira communiquer : [cityRequest.php]({{site.baseurl}}/assets/CitySelect/cityRequest.php) ;
* un script **cityAutocomplete.js**, vide pour l'instant, et qui contiendra vos fonctions JavaScript.

Voici un aperçu du scénario que nous allons coder :

1. L'utilisateur tape les premières lettres de sa ville dans le champ texte *Ville* ;
2. Le JavaScript va envoyer au serveur ces premières lettres en les passant en
   paramètre de la page spécifique **cityRequest.php** ;
3. Le serveur répondra en envoyant la liste des villes commençant par ces lettres ;
4. Le JavaScript affichera ces villes.

### La page HTML Completion.html

Dans cette page HTML, on trouve un `<div id="myac">` vide après le champ texte *Ville*. C'est ce `<div>` que l'on va remplir avec notre liste de villes.

<div class="exercise">
Créez une fonction `afficheVilles` qui prendra en paramètres un tableau de villes comme 

```javascript
["Brion", "Briord"]
```
et dont l'effet est de remplir le `<div id="myac">` avec un paragraphe par nom de villes comme

```html
<div id="myac">
  <p>Brion</p>
  <p>Briord</p>
</div>
```

**Conseil :** Commencez à développer votre code dans la console JavaScript avant de le récupérer dans le fichier JavaScript **cityAutocomplete.js** que l'on chargera à la fin de la page HTML.  
**Attention :** Un deuxième appel à `afficheVilles` doit effacer les villes du premier appel.
</div>

### La page de requête cityRequest.php

Il nous faut mettre en place une page PHP côté serveur qui recevra les premières lettres d'une ville et renverra le tableau des villes commençant par ces lettres. Nous donnerons les premières lettres, par exemple `brio`, à notre page **cityRequest.php** à la manière des formulaires **GET**, c'est-à-dire en appelant la page `cityRequest.php?name=brio` (cette syntaxe s'appelle les *query string*). Notre page **cityRequest.php** doit donc :

1. récupérer la valeur de `name` du *query string* ; 
2. faire une requête SQL à une base de données contenant toutes les villes françaises ; 
3. renvoyer ces villes au client dans un format compréhensible par les deux parties.

Un format commun d'échange de données est le [JSON](https://developer.mozilla.org/fr/docs/JSON) (*JavaScript Object Notation*). Il permet de passer tout type de données (entiers, chaînes de caractères, tableaux, objets) sous la forme d'une chaîne de caractères. Comme son nom l'indique, ce format reprend très fortement la syntaxe JavaScript.
Les langages de programmation Web implémentent les fonctions qui permettent d'encoder et de décoder le JSON. **Pour PHP**, les fonctions sont [json_encode](http://php.net/manual/fr/function.json-encode.php) et [json_decode](http://php.net/manual/fr/function.json-decode.php).

La base de données des villes françaises a déjà été mise en place sur **infolimon**. Dans un élan de bonté, nous vous donnons déjà les fonctions liées à la base de données dans le squelette **cityRequest.php**. 

<div class="exercise">

C'est à vous de compléter la page **cityRequest.php** pour qu'elle suive le
cahier des charges précédent.  
**Aide :** On vous a maché le boulot puisque la fonction `selectByName($name)`
vous fait la requête SQL et renvoie le tableau des villes commençant par la
chaîne de caractères dans `$name`.
</div>


**Note :** Voici [les sources](https://github.com/pixelastic/sql-french-cities) de la base de données SQL si vous souhaitez en faire votre propre copie pour expérimenter.

### La requête asynchrone

Les navigateurs modernes fournissent une interface JavaScript (WebAPI) nommée `XMLHttpRequest` (XHR) qui permet de faire des requêtes HTTP de manière asynchrone, c'est-à-dire sans bloquer la page Web courante.

L'ensemble des technologies autour des pages Web asynchrones s'appelle plus communément AJAX (*Asynchronous JAvascript and Xml*).

<!--
http://en.wikipedia.org/wiki/Ajax_%28programming%29 :
In the article that coined the term Ajax,[3] Jesse James Garrett explained that the following technologies are incorporated:

HTML (or XHTML) and CSS for presentation
The Document Object Model (DOM) for dynamic display and interaction with data
XML for the interchange of data, and XSLT for its manipulation
The XMLHttpRequest object for asynchronous communication
JavaScript to bring these technologies together
-->

Voici le squelette d'une requête AJAX, à mettre dans votre **cityAutocomplete.js**. Notre fonction `myajax` crée un objet `XMLHttpRequest`. Sa méthode `open` donne le type de requête HTTP (GET), l'URL de la page demandée et le troisième argument `true`signifie que la requête doit être asynchrone. La requête en elle-même est faite par la méthode `send`.

```javascript
function myajax(url, callBack) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.addEventListener("load", function () {
        callBack(httpRequest);
    });
    httpRequest.send(null);
}
```

Comme vous l'avez vu [lors du cours 3]({{site.baseurl}}/classes/class3.html), le principe d'une requête asynchrone consiste à ne pas bloquer l'exécution du JavaScript le temps que le serveur renvoie la page demandée. Nous fournissons donc à `myajax` une *fonction de rappel* `callback` qui sera appelé lorsque le serveur aura renvoyé la page demandée.
Ceci est fait en associant le `callback` à l'événement `load` qui sera lancé à la réception de la page.  
Cette fonction `callback` sera chargée de traiter la réponse du serveur.
Cette manière de procéder est dite *asynchrone*, car le chargement de la page demandée est fait en arrière-plan par un autre processus.


<div class="exercise">

1. Créer votre fichier **cityAutocomplete.js** avec le code suivant. Lions le
   script à la page HTML **dans son en-tête** (c'est une bonne pratique pour
   voir facilement tous les fichiers externes requis par le HTML à un seul
   endroit). Puis rajoutez l'attribut `async` à `<script>` pour que le
   chargement du JS ne bloque pas la construction du DOM (cf Cours 3).

1. Expérimentez avec la fonction `myajax`. Par exemple, donnez-lui l'URL de la page actuelle et une fonction `callback` qui affiche la variable httpRequest pour voir ce qu'elle contient.

2. Créez une fonction `cityRequest` qui prend en argument une chaîne de caractères (les premières lettres d'un nom de ville). Cette fonction va appeler `cityRequest.php` avec les bons paramètres en *query string*. Le callback de `myajax` sera la fonction `cityResponse` suivante.

3. La fonction `cityResponse` prendra en paramètre une requête HTTP. 
Son boulot est de transformer la réponse texte au format JSON de `cityRequest.php` (propriété `responseText` de sa requête HTTP en entrée) en une valeur JavaScript, puis de filtrer l'information pour ne garder qu'un tableau de villes. Utilisez la fonction [JSON.parse](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON/parse) pour décoder le JSON.
   Reste à appeler la fonction `afficheVilles` avec ce tableau pour effectivement afficher les villes.

4. Testez votre fonction `cityRequest` en l'appelant à partir de la console.

5. Reste maintenant à lier l'appel de la fonction `cityRequest` aux modifications sur le champ texte *Ville*. Servez-vous de l'événement [`input`](https://developer.mozilla.org/fr/docs/Web/Events/input) qui est lancé à chaque modification du contenu d'un `<input>`.  
**Attention :** Aucun accès au DOM ne doit être fait avant qu'il ne soit complètement chargé. Veillez à regrouper les `addEventListener` et les codes sensibles dans une fonction `init`. Puis faites en sorte que `init` soit lancée au chargement du document.
</div>

### Comportements supplémentaires

#### Remplissage de la ville

Nous souhaitons pouvoir cliquer sur un nom de ville proposé et que cela l'écrive dans le champ texte. 

<div class="exercise">
1. Créez donc un gestionnaire d'événements `click` sur le `<div id="myac">` dont le callback procède en trois étapes :
   * Il récupère le texte du paragraphe sur lequel on a cliqué. La cible réelle du clic s'obtient à l'aide de `event.target` ;
   * Il remplace la valeur du champ texte *Ville* avec ce nom de ville ;
   * Il cache la liste d'autocomplétion et la vide.

2. Enfin, le cadre du `<div id="myac">` affiche un petit carré noir quand il est vide. Codez une manière de ne pas afficher ce `<div>` dans cette situation.
</div>

#### Debouncing

Un scénario courant est que l'utilisateur tape rapidement le début de son nom de ville, puis s'arrête pour avoir l'autocomplétion. Dans ce cas, nous ne voulons pas lancer de requête d'autocomplétion au serveur tant que l'utilisateur tape rapidement. 
Nous voulons donc ne lancer une requête au serveur que si l'utilisateur n'a pas tapé de touches depuis, disons *200 ms*.


<div class="exercise">
Chaque modification du `<input>` *Villes* appelle maintenant une fonction `debounce` qui lancera `cityRequest` après un délai de *200 ms*. Le compte à rebours sera stocké dans une variable globale `timeout`. Cette variable sera utile pour annuler le compte à rebours précédent avant d'en lancer un nouveau lors du tapage d'une touche.  
**Rappel :** Pas de `addEventListener` sur le DOM tant que celui-ci n'est pas chargé.
</div>

**Note culturelle :** Ce mécanisme, qui s'appelle *debouncing* en anglais (anti-rebondissement), consiste à empêcher qu'une fonction soit exécutée trop souvent. L'idée vient d'un interrupteur mécanique qui rebondirait et activerait trop souvent une commande.

#### Signalisation du chargement

Lorsqu'un chargement est en cours, nous pouvons vouloir notifier l'utilisateur pour qu'il patiente le temps nécessaire. Dans notre cas, nous voulons juste afficher le [GIF de chargement]({{site.baseurl}}/assets/loading.gif) suivant 
<img alt="GIF de chargement" src="{{site.baseurl}}/assets/loading.gif" height="21"> 
lors de l'attente de la réponse du serveur.

<div class="exercise">
1. Modifiez `myajax` pour prendre en paramètres supplémentaires deux fonctions `startLoadingAction` et `endLoadingAction`. La première fonction sera lancée dès le lancement de la requête. La deuxième sera lancée dès la réception de la réponse.
2. Modifiez l'appel à `myajax` pour qu'il affiche le GIF de chargement en action de début de chargement et qu'il le cache en action de fin de chargement.
3. Pour que le comportement soit visible, rajoutez une [temporisation de 1 seconde](http://php.net/manual/fr/function.sleep.php) dans `cityRequest.php`.
</div>


Un autre exemple d'utilisation d'action de début et de fin de chargement (que l'on ne codera pas) serait un formulaire dont les données sont envoyées à l'aide de JavaScript de manière asynchrone. Nous pourrions alors désactiver le bouton `submit` lors de l'envoi des données pour que l'utilisateur n'envoie pas d'autres requêtes au lieu de patienter.

## Sélection du pays

Nous voudrions que la liste des pays corresponde au continent choisi. La liste des pays et des continents auxquels ils appartiennent se trouve dans le fichier 
[countries.js]({{site.baseurl}}/assets/CitySelect/countries.js). 
Ce fichier déclare une variable `countries` qui va contenir les continents, qui eux-mêmes contiennent leur pays. **Chargez** ce fichier dans votre page Web.

<div class="exercise">
Voici ce que vous devez implémenter dans un nouveau fichier **countryAutoSelect.js** qui vous n'oublierez pas de charger dans votre page Web.

1. Au chargement de la page, vous devez lire la liste des continents de `countries` et créer les `<option>` correspondants du `<select>` *Continents*.  
  **Indice :** Quel est le bon événement à écouter pour détecter la fin du chargement de la page (cf Cours 2 & 3) ?  
  **Indice :** Comment accède-t-on à la liste des continents de `countries` ? La page [suivante sur la syntaxe du JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements) peut vous aider.

2. Lors d'un changement de valeur du `<select>` *Continents*, il faut modifier les valeurs du `<select>` *Pays*. L'[événement suivant](https://developer.mozilla.org/en-US/docs/Web/Events/change) devrait satisfaire vos besoins.

3. **Optionnel :** Une manière ergonomique d'aider l'utilisateur à comprendre le cheminement de la page est d'avoir une `<option>` affichée par défaut qui explique ce qu'il faut faire, mais que l'on ne peut pas sélectionner.  
   Voici un exemple
   <select name="continent-example">
     <option disabled selected>Choose your continent</option>
     <option>Afrique</option>
     <option>Europe</option>
   </select>
   dont vous pouvez vous inspirer en allant voir le code source.
</div>

## Requêtes asynchrones ordonnées

Cette section n'a pas de lien avec notre formulaire Pays / Ville. Elle traite d'un sujet lié aux requêtes asynchrones.
Les requêtes asynchrones ont l'avantage majeur de permettre l'exécution de JavaScript pendant le chargement de la ressource. Cependant, puisqu'elles sont asynchrones, nous n'avons pas de garanties sur l'ordre d'arrivée des ressources.

Imaginez que l'on écrive une application Web qui gère un forum et que toutes les communications avec le serveur soient faites avec AJAX. Notre site aurait l'avantage d'être très réactif, car il ne nécessiterait pas de chargement de pages.
Un scénario sur notre site serait qu'il utilisateur s'authentifie, obtienne le fil de discussion courant, puis reçoive les commentaires et enfin en ajoute un. Nous allons faire toutes ces opérations de manière asynchrone, mais nous devons nous assurer qu'elles seront exécutées dans un ordre précis.

Plutôt que de développer un site complet, nous allons simuler nos requêtes au serveur par une fonction `ajaxCallSimulated` qui affichera le message `message`, simulera un processus en attendant une durée `duration` avant d'appeler la fonction de rappel `callback`.

```javascript
function ajaxCallSimulated(message,duration,callBack){
    console.log("Init : " + message);
    // The callback will be executed after 'duration' milliseconds
    setTimeout(function(){
            console.log("Done : " + message);            
            if(callBack !== undefined)
                callBack();
     },duration);
};
```
Dans le cadre de notre scénario précédent, nous pourrions vouloir écrire le code suivant.

```javascript
ajaxCallSimulated("User authentification", 40);
ajaxCallSimulated("Read current thread", 30);
ajaxCallSimulated("Read user comments", 20);
ajaxCallSimulated("Comment added", 10);
```

<div class="exercise">
1. Essayez le code précédent et expliquez pourquoi il n'est pas acceptable.
2. En utilisant le paramètre `callBack` de `ajaxCallSimulated`, faites en sorte que tous ces appels soient faits dans le bon ordre (c.-à-d. que l'ordre des messages dans la console soit cohérent).
</div>

<!--
Éventuellement pour ceux qui ont fini :faire le même exo avec les Promise.
Les Promise sont dispos sur Chrome, mais sont très récentes (du moins dans leurs versions natives, des librairies permettaient de les simuler).
Elles sont là pour résoudre partiellement le problème du "pyramid of doom", ou "call back hell" (http://www.html5rocks.com/en/tutorials/es6/promises/).

Elles permettent d'écrire du code qui se lit "presque" comme du synchrone (c.-à-d. pas d'indentation et de "parenthésage" trop monstrueux)  :

asyncThing1().then(function() {
  return asyncThing2();
}).then(function() {
  return asyncThing3();
}).catch(function(err) {
  return asyncRecovery1();
}).then(function() {
  return asyncThing4();
}, function(err) {
  return asyncRecovery2();
}).catch(function(err) {
  console.log("Don't worry about it");
}).then(function() {
  console.log("All done!");
});



L'idée de cet exercice c'est de sensibiliser à ce problème, pour mieux appréhender les Promise par la suite.
-->

<!--
Laïus JavaScript :

JavaScript est un langage simple en apparence (peu de mots clés réservés, syntaxe en apparence identique au C, C++, Java).
Mais la maîtrise des différentes constructions qu'il permet demande beaucoup de pratique.
Même de très bons développeurs ignorent certains aspects du langage (demandez leurs ce que c'est que le hoisting en JS, le rapport entre Java et JavaScript, "arguments" est il un tableau, que vaut 0.1 + 0.2, ...)

Comment vous situez-vous en vue de devenir un expert JavaScript ? Pas mal de chemin encore !
Pour diviser et donc mieux régner, on peut quand même découper le gâteau JavaScript en deux parts  :
-Les fonctions sont des objets, langage asynchrone, callback, closure, programmation événementielle, event loop, programmation fonctionnelle.
-La programmation orienté objet via prototype.

Nous vous avons fait goûter à la première part, nous n'avons pas abordé le coté prototypal de JS. C'est que cela prend du temps !
Il s'agit principalement d'un devoir de déconstruction du pattern d’héritage classique imposé/proposé par Java, C++, PHP (i.e class, super, large hierarchical three,...) et câblés dans nos têtes...
-->

