---
title: Td1 &ndash; Prise en main de Javascript
subtitle: Javascript et DOM
layout: tutorial
---


## Les outils de développements

Nous allons utiliser les outils de développements de Chrome pour nos Tds. Pour ouvrir les outils de développements de Chrome, appuyez sur `F12` (ou `Ctrl+Shift+I` ou Outils > Outils de développement).

#### L'inspecteurs d'éléments de page Web 

L'onglet **Élément** contient le code HTML de la page Web courante.
En survolant le code HTML, l'inspecteur vous indique où se trouve la boîte englobant l'élement courant. Les rectangles affichés de couleurs différentes représentent les quatres boites englobantes : la marge extérieure (`margin`), la bordure, la marge intérieure (`padding`) et le contenu.

Les dimensions des boîtes sont indiquées dans l'onglet style, qui regroupe toutes les règles CSS s'appliquant à cet élément.

À l'inverse, vous pouvez vous servir de la loupe ![loupe]({{ site.baseurl }}/assets/magnifying.png) (`Ctrl+Shift+C`) pour explorer visuellement le rendu de la page Web. La loupe vous montre alors le code HTML de l'élément sous votre souris.

<div class="exercice">
1. Inspectez la page courante dans l'onglet **Élément**. 
2. Éditez la page HTML. Modifiez le texte du TD. Rajouter ou enlevez des balises de la page HTML. <br/>
**Note:** Pour éditer le HTML, il faut faire clic droit > 'Edit as HTML'.
3. Changez des éléments de style, par exemple la façon dont les bouts de code en ligne (e.g. `margin`, `padding`) sont stylisés. Ou passez à une numérotation binaire des listes d'exercices (`list-style-type: binary` ; [Ne marche pas sur Firefox ni IE](http://www.quirksmode.org/css/lists.html)).
4. Rajouter votre premier gestionaire d'évènement (event handler). Pour cela, rajoutez `onclick="alert('À Malibu!')"` comme attribut à l'une des balises HTML. Vous n'avez alors plus qu'à cliquer dessus pour voir le message s'afficher.
</div>

L'un des grands avantages de l'onglet **Élément** est que l'on voit le code HTML de la page en direct. L'affichage classique des sources `Ctrl+U` ne montre que le source envoyé par le serveur.
Les modifications que vous avez faites sont temporaires et disparaîtrons lors du rechargement de la page. Il faudrait reporter les modifications côté serveur pour les enregistrer.

#### Le moniteur réseau

L'onglet **Network** permet d'observer les requêtes HTTP faites pour charger votre page. On y voit le chargement de la page HTML, des styles CSS et des images liées.

<div class="exercice">
1. Cliquez sur la ligne de la page Web *tutorial1.html* et observez l'onglet **Headers**. On y voit les caractéristiques principales de la [requête HTTP](http://openclassrooms.com/courses/les-requetes-http) qui demande la page au serveur :
  * l'adresse du serveur : **romainlebreton.github.io**
  * l'url de la page demandée :  **http://romainlebreton.github.io/ProgWeb-ClientRiche/tutorials/tutorial1.html**
  * la méthode de requête : **GET**
  * le [code de statut](http://fr.wikipedia.org/wiki/Liste_des_codes_HTTP) de la réponse : 200 OK ou 304 Not modified (ou 404 Not Found)
</div>

#### La console Javascript

C'est ici que nous allons passer le reste du Tds. L'onglet **Console** présente deux avantages :

 - c'est une console Javascript. Ce sera donc notre bac à sable pour expérimenter du code Javascript;
 - nous avons accès au DOM de la page Web courante. Ceci nous permettra d'interagir avec la page Web.

## Le Document Object Model (DOM)

Le Document Object Model (DOM) de Javascript est un objet Javascript qui modélise le document (la page Web). Cet objet possède un ensemble de méthodes qui nous permettent d'interagir avec le document. Nous allons aborder le DOM d'un point de vue très pratique. 

Le DOM est accessible dans la console Javascript dans la variable `document`.

<div class="exercice">
1. Explorez dans la console quelques attributs de la variable `document`, par exemple `document.URL`, `document.head`, `document.body`.
</div>

#### Trouver un élément de la page Web

La manière la plus pratique de trouver un élément de la page Web est via les méthodes `getElementById`, `getElementsByTagName` et `getElementsByClassName` de l'objet `document`. Les trois méthodes prennent une chaîne de charactères et renvoient le tableau des éléments correspondants, sauf `getElementById` qui ne renvoie qu'un élément puisqu'un identifiant est unique.

<div class="exercice">
1. Accédez dans la console à l'élément d'identifiant **le-document-object-model-dom** à l'aide du code

        var e1 = document.getElementById("le-document-object-model-dom");
        console.log(e1);

2. Dans le même ordre d'idée, sélectionnez tous les *list items* `<li>` à l'aide de `getElementsByTagName` et comptez les en utilisant leur propriété `.length`.

3. Enfin, sélectionnez tous les éléments ayant la classe *exercice* à l'aide de `getElementsByClassName` et comptez les en utilisant leur propriété `.length`.

</div>

Supposons que nous souhaitons accéder à tous les `<li>` correspondant à des exercices, donc descendant d'un bloc de classe *exercice*. C'est exactement le genre de sélection que l'on fait en CSS pour appliquer du style. Vous ne serez donc pas surpris que Javascript possède une fonction `document.querySelector` qui prend un sélecteur en entrée et renvoie le premier élément correspondant. 

<div class="exercice">
1. sélectionnez dans la console tous les `<li>` correspondant à des exercices à l'aide de la fonction `document.querySelector`  ([rappels sur les sélecteurs](http://www.w3schools.com/cssref/css_selectors.asp)).

#### Modifier une page Web

appendChild
insertBefore , which inserts the node given
as the first argument before the node given as the second argument.
removeChild

document.createElement
document.createTextNode

    - createElement, setAttribute(,), appendChild, ?style.color?
    - innerHTML = "..." (parse le HTML)

## Mise en application -- Formulaire dynamique

Nous allons utiliser Javascript pour rajouter du dynamisme <span style="text-decoration: line-through">aux étudiants</span> à un formulaire. Dans notre cas, nous allons développer un formulaire avec une partie facultative et de taille variable. Veuillez récupérer le [fichier HTML]({{ site.baseurl }}/assets/DynamicForm/DynamicForm.html) et [fichier CSS]({{ site.baseurl }}/assets/DynamicForm/DynamicForm.css) qui vous serviront de base pour notre formulaire dynamique.

Créez un projet Netbeans **DynamicForm** avec ces deux fichiers.

#### Affichage de la partie facultative du formulaire

<div class="exercice">
1. rajouter class="hidden" et créer la règle de style 

   ~~~
   .hidden {
     display:none;
   }
   ~~~
   {:.css}

2. Pour l'instant, nous allons développer notre code dans la console Javascript de Chrome. Sélectionnez l'élément d'identifiant "enfants" à l'aide de `document.getElementById()` et stockez le dans une variable `enfants`

3. Pour accéder en lecture/écriture aux classes de `enfants`, nous allons utiliser sa propriété `enfants.classList` ([documentation](https://developer.mozilla.org/fr/docs/Web/API/Element/classList))

4. Une fonction très pratique est la fonction toggle qui agit commme un interupteur : il active/désactive un objet selon si il était désactivé/activé ([exemple d'utilisation](https://developer.mozilla.org/fr/docs/Web/API/Element/classList#Exemple)). Utilisez donc `e.classList.toggle("hidden")` pour afficher/cacher le formulaire enfant.

5. Veuillez regrouper le code précédant au sein d'une fonction `ActiverEnfants`

   ~~~
   function ActiverEnfants () {
     // Votre code ici
   }
   ~~~
   {:.javascript}
  
6. Nous allons maintenant associer cette fonction au clic sur le bouton de *"Avez-vous des enfants ?"*
    - Pour cela, donnez à `querySelector` le sélecteur qui sélectionne les inputs d'attribut `type='checkbox'` ([documentation sur les sélecteurs](http://www.w3schools.com/cssref/css_selectors.asp)). Mettez cet élément dans une variable `aEnfant`
    - On va associer à l'élément `aEnfant` un gestionnaire d'évènement qui lancera notre fonction `ActiverEnfants` lors de chaque clic sur le bouton.

      ~~~
      aEnfant.addEventListener("click",ActiverEnfants);
      ~~~
      {:.javascript}

      La fonction `addEventListener` prend en premier argument le nom de l'évènement à écouter et en deuxième argument la fonction à appeler.

7. *Last but not least:* Maintenant que notre code est prêt, nous allons le déployer côté serveur pour qu'il soit envoyé et éxécuté avec la page Web. 
   1. Créez donc un ficher **DynamicForm.js** contenant ce code dans le répertoire de votre projet **DynamicForm**. 
   2. Pour lier le script **DynamicForm.js** à notre page Web **DynamicForm.html**, ajouter dans cette dernière une balise

      ~~~
      <script src="DynamicForm.js"></script>
      ~~~
      {:.html}
      juste avant la balise fermante `</body>`.
      Votre script sera ainsi executé au chargement de la page ; l'action d'affichage du formulaire 'enfant' sera donc lié à la *checkbox*.


</div>

#### Avoir un formulaire de taille variable

Notre objectif dans cette dernière partie est de pouvoir rajouter des lignes à un formulaire en cliquant sur un bouton.

<div class="exercice">

1. Sélectionnez l'élément de balise `tbody` inclus dans l'élément d'identifiant "enfants" à l'aide de `document.querySelector()` et stockez le dans une variable `table_enfants`
2. Nous souhaitons maintenant ajouter une nouvelle ligne à notre tableau. Notre objectif est donc d'ajouter le code HTML suivant à la fin du tableau

   ~~~
   <tr>
     <td>2</td>
     <td><input type="text" name="nom-e2"></td>
     <td><input type="text" name="prenom-e2"></td>
   </tr>
   ~~~
   {:.html}

   Nous allons procéder en plusieurs étapes :

   1. Créer un nouvel élément HTML de type `<tr>` à l'aide de 

      ~~~
      var e = document.createElement("tr");
      ~~~
      {:.javascript}

   2. Actuellement, notre élément `e` représente juste le code HTML `<tr></tr>`. Nous allons le remplir en éditant son intérieur via `e.innerHTML` ([documentation](https://developer.mozilla.org/fr/docs/Web/API/Element/innertHTML)).
      Ajoutez le code HTML nécessaire en assignant la bonne chaîne de caractères à `e.innerHTML`.

      **Remarque:** Les chaînes de caractères en Javascript commencent et finissent par **"** (ou **'**). Le caractère d'échappement **\\** est nécessaire pour les caractères spéciaux comme les guillemets `\` &#8594; **"**, le saut de ligne `\n` &#8594;  **&#8626;**.

      ~~~
      var e = document.createElement("tr");
      ~~~
      {:.javascript}

   3. Il ne reste plus qu'à ajouter notre élément `e` à la fin de body. Pour cela, utilisons `table_enfants.`[`appendChild`](https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild)`(e)`.


3. Associons notre action à l'évènement 'clic' sur le bouton *Ajouter un enfant* 
   1. Empaquetons tout cela dans une fonction `function AjoutEnfant()`.
   2. Sélectionner notre bouton à l'aide de `querySelector` (c'est le premier bouton qui provient de la balise d'indentifiant *enfants*).
   3. Associer lui le gestionnaire d'évènement qui associe au clic l'action `AjoutEnfant`.

4. Actuellement, nous rajoutons toujours la même ligne n°2 au tableau lors de clic successifs. 
   1. Pour garder trace du numéro de la ligne actuelle, nous allons créer une variable globale `enf_count` que nous incrémenterons dans `AjoutEnfant`.

      ~~~
      var enf_count = 2;
      function AjoutEnfant () {
        // ...
        enf_count++;
      }
      ~~~
      {:.javascript}

   2. Changer le corps de la fonction `AjoutEnfant` pour créer la ligne n° `enf_count`.

5. Déployez votre code avec un copier/coller dans **DynamicForm.js**. Quand tout marche bien, profiter de l'instant.

</div>

## Quelques liens

- [La présentation des outils de développements sur le site de Chrome](https://developer.chrome.com/devtools)
- [Le site de Mozilla sur les technologies Web](https://developer.mozilla.org/fr/)

