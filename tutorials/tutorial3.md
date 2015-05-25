---
title: TD3 &ndash; Auto-complétion par requêtes asynchrones
subtitle: AJAX sans trace
layout: tutorial
---


## Brève présentation du TD

Nous souhaitons coder un fonction d'auto-complétion pour des entrées de formulaire. Aujourd’hui, notre formulaire va demander de renseigner son pays et sa ville. Nous allons développer deux mécanismes différent d'aide à la complétion :

1. Une aide locale pour le choix du pays :  
   On envoie la liste des pays (et des continents à l'utilisateur). Le JavaScript travaille en local, c'est-à-dire qu'il n'a pas besoin de communiquer avec le serveur.
2. Une aide à distance pour le choix de la ville :  
   La liste des villes de France (ou du monde) étant trop grande, le serveur ne peut pas raisonnablement l'envoyer au client à chaque chargement de la page. Le JavaScript va donc faire une requête au serveur qui lui renverra la liste des villes correspondantes.

Commençons par l'approche la plus intéressante conceptuellement : les requêtes asynchrones.

## Auto-complétion des villes par requêtes asynchrones

Nous allons démarrer d'un squelette de la page de formulaire. Veuillez donc télécharger les fichiers suivants et créer un projet PHP avec :

* La page HTML : [Completion.html]({{site.baseurl}}/assets/CitySelect/Completion.html);
* La feuille de style CSS : [Completion.css]({{site.baseurl}}/assets/CitySelect/Completion.css);
* La page côté serveur avec qui le client ira communiquer : [cityRequest.php]({{site.baseurl}}/assets/CitySelect/cityRequest.php) ;
* un script **cityAutocomplete.js**, vide pour l'instant, et qui contiendra vos fonctions JavaScript.

<!--
**Note :** Notre projet contiendra une page dynamique en PHP. Tenez-en compte lorsque vous créez votre dossier contenant la page Web de ce TD.
-->

Voici un aperçu du scénario que nous allons coder :

1. L'utilisateur tape les premières lettres de sa ville dans le champ texte *Ville* ;
2. Le JavaScript va envoyer au serveur ces premières lettres sur une page spécifique **cityRequest.php** ;
3. Le serveur répondra en envoyant la liste des villes commençant par ces lettres ;
4. Le JavaScript affichera ces villes.

### La page HTML Completion.html

Dans cette page HTML, on trouve un `<div id="myac">` vide après le champ texte *Ville*. C'est ce `<div>` que l'on va remplir avec notre liste de villes.

<div class="exercise">
Créez une fonction `afficheVilles` qui prendra un tableau de villes qui prendra un tableau de villes comme 

```javascript
["Brion", "Briord"]
```
et qui remplit le `<div id="myac">` avec un paragraphe par nom de villes

```html
<div id="myac">
  <p>Brion</p>
  <p>Briord</p>
</div>
```

**Conseil :** Commencez à développer votre code dans la console JavaScript avant de le récupérer dans le fichier JavaScript **cityAutocomplete.js** que l'on chargera à la fin de la page HTML.
</div>

<!-- 
TODO :Lorsque l'on réappelle afficheVilles avec un nouveau tableau, on doit supprimer les villes précédentes
-->

### La page de requête cityRequest.php

Il nous faut mettre en place une page PHP côté serveur qui recevra les premières lettres d'une ville et renverra le tableau des villes commençant par ces lettres. Nous donnerons les premières lettres, par exemple `brio`, à notre page **cityRequest.php** à la manière des formulaires **GET**, c'est-à-dire en appelant la page (cette syntaxe s'appelle les *query string*) `cityRequest.php?name=brio`. Notre page **cityRequest.php** doit donc :

1. Récupérer les premières lettres ; 
2. Faire une requête SQL à une base de donnée contenant toutes les villes françaises ; 
3. Renvoyer ces villes au client dans un format compréhensible par les deux parties.

Un format commun d'échange de donnée est le [JSON](https://developer.mozilla.org/fr/docs/JSON) (*JavaScript Object Notation*). Il permet de passer tout type de données (entiers, chaînes de caractères, tableaux, objets) sont la forme d'une chaîne de caractères. Comme son nom l'indique, ce format reprend très fortement la syntaxe JavaScript.
Les langages de programmation Web implémentent les fonctions qui permettent d'encoder et de décoder le JSON. **Pour PHP**, les fonctions sont [json_encode](http://php.net/manual/fr/function.json-encode.php) et [json_decode](http://php.net/manual/fr/function.json-decode.php).

La base de donnée des villes française a déjà été mise en place sur **infolimon**. Dans un élan de bonté, nous vous donnons déjà les fonctions liées à la base de donnée dans le squelette **cityRequest.php**. 

<div class="exercise">
C'est à vous de faire le reste en utilisant le format d'échange JSON.
</div>


**Note :** Si vous souhaitez en faire votre propre copie pour expérimenter avec, voici [les sources](https://github.com/pixelastic/sql-french-cities) de cette base de donnée SQL.

### La requête asynchrone

Les navigateurs modernes fournissent une interface JavaScript (WebAPI) nommée `XMLHttpRequest` (XHR) qui permet de faire des requêtes HTTP de manière asynchrone, c'est-à-dire sans bloquer la page Web courante.

L'ensemble des technologies autour des pages Web asynchrones s'appelle plus communément AJAX (*Asynchronous JAvascript and Xml*).

<!--
http://en.wikipedia.org/wiki/Ajax_%28programming%29 :
In the article that coined the term Ajax,[3] Jesse James Garrett explained that the following technologies are incorporated:

HTML (or XHTML) and CSS for presentation
The Document Object Model (DOM) for dynamic display of and interaction with data
XML for the interchange of data, and XSLT for its manipulation
The XMLHttpRequest object for asynchronous communication
JavaScript to bring these technologies together
-->

Voici le squelette d'une requête AJAX, à mettre dans votre **cityAutocomplete.js**. Notre fonction `myajax` crée un objet `XMLHttpRequest`. Sa méthode `open` donne le type de requête HTTP (GET), l'URL de la page demandée et le troisième argument `true` dit que la requête doit être asynchrone. La requête en elle-même est faite par la méthode `send`. Nous avons au préalable ajouté un gestionnaire d'événement qui sera lancé à la réception de la page.

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

<div class="exercise">
1. Expérimentez avec la fonction `myajax`. Par exemple, donnez lui l'URL de la page actuelle et un fonction `callback` qui affiche la variable httpRequest pour voir ce qu'elle contient.

2. Créez une fonction `cityRequest` qui prend en argument une chaîne de caractères (les premières lettres d'un nom de ville) et qui reverra un tableau JavaScript des villes correspondantes. Cette fonction va appeler `cityRequest.php` avec les bons paramètres en *query string*. Le callback de `myajax` sera la fonction `cityResponse` suivante.

3. La fonction `cityResponse` transforme la réponse texte au format JSON de `cityRequest.php` (propriété `response` de `httpRequest`) en une valeur JavaScript. Utilisez la fonction [JSON.parse](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON/parse) pour décoder le JSON.
   Reste à appeler la fonction `afficheVilles` avec ce tableau pour effectivement afficher les villes.
</div>

### Comportements supplémentaires

1. Nous souhaitons pouvoir cliquer sur un nom de ville proposé et que cela l'écrive dans le champ texte. Créez donc un gestionnaire d'événements `click` sur le `<div id="myac">` dont le callback procède en trois étapes :
   * Il récupère le texte du paragraphe sur lequel on a cliqué. La cible réelle du clic s'obtient à l'aide de `event.target` ;
   * Il remplace la valeur du champ texte *Ville* avec ce nom de ville ;
   * Il cache la liste d'auto-complétion et la vide.

2. Enfin, le cadre du `<div id="myac">` affiche un petit carré noir quand il est vide. Codez une manière de ne pas afficher ce `<div>` dans cette situation.

<!-- 
init : display:none & maj qui display:none si vide
-->




<!-- fonction onClick qui remplira le champ texte avec la valeur --> 
<!-- div exercise : content ::before counter -->
