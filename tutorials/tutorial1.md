---
title: TD1 &ndash; Prise en main de JavaScript
subtitle: JavaScript et DOM
layout: tutorial
---


## Les outils de développements

Nous allons utiliser les outils de développements de Chrome pour nos TDs. Pour
ouvrir les outils de développements de Chrome, appuyez sur `F12` (ou
`Ctrl+Shift+I` ou Outils > Outils de développement).

#### L'inspecteur d'éléments de page Web 

L'onglet **Élément** contient le code HTML de la page Web courante. En survolant
le code HTML, l'inspecteur vous indique où se trouve la boite englobant
l'élément courant. Les rectangles affichés de couleurs différentes représentent
les quatre boites englobantes&nbsp;: la marge extérieure (`margin`), la bordure,
la marge intérieure (`padding`) et le contenu. Les dimensions des boites sont
indiquées dans l'onglet style, qui regroupe toutes les règles CSS s'appliquant à
cet élément.

À l'inverse, vous pouvez vous servir de la loupe
![loupe]({{site.baseurl}}/assets/magnifying.png) (`Ctrl+Shift+C`) pour explorer
visuellement le rendu de la page Web. La loupe vous montre alors le code HTML de
l'élément sous votre souris.

**Rappel&nbsp;:** Le terme
[*élément* d'une page HTML](https://en.wikipedia.org/wiki/HTML_element) est le
terme technique pour désigner toute partie d'une page Web contenue entre une
balise ouvrante et sa balise fermante.

<div class="exercise">
1. Inspectez la page courante dans l'onglet **Élément**. 
2. Éditez la page HTML. Modifiez le texte du TD. Rajoutez ou enlevez des balises
de la page HTML. <br/> **Note:** Pour éditer le HTML, il faut faire clic droit >
'Edit as HTML'.
3. Changez des éléments de style. Par exemple la façon dont les bouts de code en
ligne comme `margin`, `padding` sont stylisés. Ou passez à une numérotation
binaire des listes d'exercices (`list-style-type: binary`&nbsp;;
[Ne marche pas sur Firefox ni IE](http://www.quirksmode.org/css/lists.html)).  
**Notes&nbsp;:** Vous pouvez faire ces modifications de style dans la sous-partie
**Styles** de l'onglet **Élément** ou directement dans le ficher *CSS* qui se
trouve dans l'onglet **Sources**.
4. Rajouter votre premier gestionnaire d'événement (event handler). Pour cela,
rajoutez `onclick="alert('À Malibu!')"` comme attribut à l'une des balises
HTML. Vous n'avez alors plus qu'à cliquer dessus pour voir le message
s'afficher.  
   Changez alors l'action JavaScript en `console.log('À Malibu!')` et vérifiez
   que cela écrit bien dans l'onglet **Console**.
</div>

L'un des grands avantages de l'onglet **Élément** est que l'on voit le code HTML
de la page en direct. L'affichage classique des sources `Ctrl+U` ne montre que
le code source original envoyé par le serveur.  Les modifications que vous avez
faites sont temporaires et disparaîtront lors du rechargement de la page. Il
faudra reporter les modifications côté serveur pour les enregistrer (cf. plus
bas).

#### Le moniteur réseau

L'onglet **Network** permet d'observer les requêtes HTTP faites pour charger
votre page. On y voit le chargement de la page HTML, des styles CSS et des
images liés.

<div class="exercise">
1. Cliquez sur l'onglet **Network** et observez les différents fichiers échangés
   lors du chargement de la page. Si l'onglet est vide, rechargez la page.
2. Cliquez sur la ligne de la page Web *tutorial1.html* et observez le
   sous-onglet **Headers**. On y voit les caractéristiques principales de la
   [requête HTTP](http://openclassrooms.com/courses/les-requetes-http) qui
   demande la page au serveur&nbsp;:
  * l'adresse du serveur&nbsp;: **romainlebreton.github.io**
  * l'URL de la page demandée&nbsp;:
    **http://romainlebreton.github.io/ProgWeb-ClientRiche/tutorials/tutorial1.html**
  * la méthode de requête&nbsp;: **GET**
  * le [code de statut](http://fr.wikipedia.org/wiki/Liste_des_codes_HTTP) de la
  réponse&nbsp;: 200 OK ou 304 Not modified (ou 404 Not Found)
</div>

#### La console JavaScript

C'est ici que nous allons passer le reste du TD. L'onglet **Console** présente
plusieurs avantages&nbsp;:

 - c'est une console JavaScript. Ce sera donc notre bac à sable pour
   expérimenter du code JavaScript. Ce sera aussi là que `console.log()` écrira
   ses messages&nbsp;;
 - nous avons accès au DOM de la page Web courante. Ceci nous permettra d'interagir avec la page Web.

## Le Document Object Model (DOM)

Le Document Object Model (DOM) de JavaScript est un objet JavaScript qui
modélise le document (la page Web). Cet objet possède un ensemble de méthodes
qui nous permettent d'interagir avec le document. Nous allons aborder le DOM
d'un point de vue très pratique dans ce TD. Plus de détails seront donnés dans le [Cours 2 -- Le Document Object Model](../classes/class2.html).

Le DOM est accessible dans la console JavaScript dans la variable `document`.

<div class="exercise">
1. Explorez dans la console quelques attributs de la variable `document`, par
exemple `document.URL`, `document.head`, `document.body`.
</div>

#### Trouver un élément de la page Web

La manière la plus pratique de trouver un élément de la page Web est via les
méthodes `getElementById`, `getElementsByTagName` et `getElementsByClassName` de
l'objet `document`. Les trois méthodes prennent une chaîne de caractères et
renvoient **le tableau** des éléments correspondants (sauf `getElementById` qui ne
renvoie qu'**un élément** puisqu'un identifiant est unique).

<div class="exercise">
1. Accédez dans la console à l'élément d'identifiant
   **le-document-object-model-dom** à l'aide du code

   ~~~
   var e1 = document.getElementById("le-document-object-model-dom");
   e1;
   ~~~
   {:.javascript}

   Chaque élément du DOM (comme celui dans la variable `e1`) dispose d'une liste
   de fonction permettant de la manipuler.  
   **Utilisez** l'autocomplétion dans la console pour découvrir les fonctions
   disponibles dans l'objet `e1` (tapez `e1.` pour activer l'autocomplétion).  
   **Exécutez** par exemple `e1.scrollIntoView()` pour faire défiler la page
     pour rendre l'élément d'identifiant **le-document-object-model-dom**
     visible.


2. Dans le même ordre d'idée, sélectionnez tous les *list items* `<li>` à l'aide
   de `getElementsByTagName` et comptez-les en utilisant leur propriété
   `.length`.

3. Enfin, sélectionnez tous les éléments ayant la classe *exercise* à l'aide de
   `getElementsByClassName` et comptez-les en utilisant leur propriété
   `.length`.

</div>

Supposons que nous souhaitons accéder à tous les `<li>` correspondants à des
exercices, donc descendant d'un bloc de classe *exercise*. C'est exactement le
genre de sélection que l'on fait en CSS pour appliquer du style. Vous ne serez
donc pas surpris que JavaScript puisse utiliser les sélecteurs pour sélectionner
des éléments&nbsp;:

* la fonction
[`document.querySelector`](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector)
prend un sélecteur en entrée et renvoie le premier élément correspondant&nbsp;;
* de même,
  [`document.querySelectorAll`](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll)
  renvoie **le tableau** de tous les éléments correspondants.

<div class="exercise">
1. Sélectionnez dans la console tous les `<li>` correspondants à des exercices à
l'aide de la fonction `document.querySelectorAll`. Combien y en a-t-il ?  
**Aide:** Vous pouvez consulter ce
[rappel sur les sélecteurs](http://www.w3schools.com/cssref/css_selectors.asp).

#### Modifier une page Web

Nous allons ici faire un petit tour d'horizon des méthodes pour modifier une
page Web. Nous utiliserons ces méthodes dans la section suivante&nbsp;:
[Mise en application -- Formulaire dynamique](#mise-en-application----formulaire-dynamique).

Les documents HTML peuvent se voir comme des arbres
(cf. [Cours 2](../classes/class2.html#la-structure-darbre-du-html)). Pour créer
des bouts de pages Web, nous allons donc créer des nœuds, les relier entre eux :

 * Pour créer des éléments (ou nœuds), il y a principalement deux
fonctions&nbsp;:
[`document.createElement`](https://developer.mozilla.org/fr/docs/Web/API/Document/createTextNode)
et
[`document.createTextNode`](https://developer.mozilla.org/fr/docs/Web/API/Document/createTextNode). La
fonction `createElement` prend en paramètre un nom de balise HTML et crée
l'élément de type balise correspondant. La fonction `createTextNode` prend en
paramètre le texte et crée l'élément de type texte correspondant.

* Parmi les fonctions permettant de modifier un noeud existant,
[`setAttribute`](https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute)
sert à modifier les attributs d'un élément et l'attribut objet
[`classList`](https://developer.mozilla.org/fr/docs/Web/API/Element/classList)
permet de gérer les classes d'une balise.

 * Une fois nos éléments créés, il faut les relier entre eux. Les fonctions à
votre disposition sont
[`appendChild`](https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild)
et
[`insertBefore`](https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore).

<div class="exercise">
Le but de cet exercice est d'utiliser les fonctions précédentes pour créer
l'élément correspondant au code HTML suivant&nbsp;:

~~~
<tr>
  <td>Nom:<input type="text" name="nom"></td>
  <td>Prénom:<input type="text" name="prenom"></td>
</tr>
~~~
{:.html}

1. Dessinez sur un bout de papier l'arbre correspondant à cet élément.

1. À l'aide des fonctions précédentes (allez explorer leur documentation !),
   créez l'élément dans la console JavaScript.     
   **Aide:** Créer les nœuds de l'intérieur vers l'extérieur. Sauver votre code
   au fur et à mesure quelque part, car nous nous en resservirons dans ce TD.

</div>


## Mise en application -- Formulaire dynamique

Nous allons utiliser JavaScript pour rajouter du dynamisme <span
style="text-decoration: line-through">aux étudiants</span> à un formulaire. Dans
notre cas, nous allons développer un formulaire avec une partie facultative et
de taille variable. Veuillez récupérer le
[fichier HTML]({{site.baseurl}}/assets/DynamicForm/DynamicForm.html) et
[fichier CSS]({{site.baseurl}}/assets/DynamicForm/DynamicForm.css) qui vous
serviront de base pour notre formulaire dynamique.

Créez un projet **DynamicForm** avec ces deux fichiers dans NetBeans (ou votre
IDE préféré).

#### Affichage de la partie facultative du formulaire

<div class="exercise">
1. On souhaite cacher par défaut la partie facultative du formulaire
   correspondant à la liste des enfants. Dans **DynamicForm.html**, rajoutez
   `class="hidden"` comme attribut au `<div>` contenant la liste des enfants.
   Créer la règle de style suivante qui a pour effet de cacher le contenu.

   ~~~
   .hidden {
     display:none;
   }
   ~~~
   {:.css}

2. Pour l'instant, nous allons développer notre code dans la console JavaScript
   de Chrome. Sélectionnez l'élément d'identifiant "enfants" à l'aide de
   `document.getElementById()` et stockez-le dans une variable `enfants`.

3. Pour accéder en lecture/écriture aux classes de `enfants`, nous allons
   utiliser sa propriété `enfants.classList`
   ([documentation](https://developer.mozilla.org/fr/docs/Web/API/Element/classList),
   [Ne marche pas sur IE <=9](http://caniuse.com/#search=classlist)).
   Une fonction très pratique de `classList` est la fonction `toggle()` qui agit
   comme un interrupteur&nbsp;: il active/désactive la classe selon si elle
   était désactivée/activée
   ([exemple d'utilisation](https://developer.mozilla.org/fr/docs/Web/API/Element/classList#Exemple)).  
   **Utilisez-la** pour afficher/cacher le formulaire enfant.

5. Veuillez regrouper le code précédant au sein d'une fonction `ActiverEnfants`

   ~~~
   function ActiverEnfants () {
     // Votre code ici
   }
   ~~~
   {:.javascript}
  
6. Nous allons maintenant associer cette fonction au clic sur le bouton <input
   type='checkbox' checked> de *"Avez-vous des enfants ?"*
   1. Pour cela, donnez à `querySelector` le sélecteur qui sélectionne les
      inputs d'attribut `type='checkbox'`
      ([documentation sur les sélecteurs](http://www.w3schools.com/cssref/css_selectors.asp)). Mettez
      cet élément dans une variable `aEnfant`.
   2. On va associer à l'élément `aEnfant` un gestionnaire d'événement qui
      lancera notre fonction `ActiverEnfants` lors de chaque clic sur le bouton.
      La fonction `addEventListener` prend en premier argument le nom de
      l'événement à écouter et en deuxième argument la fonction à appeler.

      ~~~
      aEnfant.addEventListener("click",ActiverEnfants);
      ~~~
      {:.javascript}

      **Référence :** Relisez la partie du
        [Cours 2 sur la gestion d'évènement](../classes/class2.html#les-vnements-en-javascript)
        pour plus de détails.

7. *Last but not least:* Maintenant que notre code est prêt, nous allons le
   déployer côté serveur pour qu'il soit envoyé et exécuté avec la page Web.
   1. Créez donc un ficher **DynamicForm.js** contenant ce code dans le
      répertoire de votre projet **DynamicForm**.
   2. Pour lier le script **DynamicForm.js** à notre page Web
      **DynamicForm.html**, ajouter dans cette dernière une balise

      ~~~
      <script src="DynamicForm.js"></script>
      ~~~
      {:.html}
	  
      juste avant la balise fermante `</body>`.  Votre script sera ainsi exécuté
      au chargement de la page&nbsp;; l'action d'affichage du formulaire 'enfant'
      sera donc liée à la *checkbox*.  
      **Note&nbsp;:** Comme le script DynamicForm.js est mis après le formulaire dans la
      page, nous sommes sûr de pouvoir modifier des éléments existants en
      JavaScript (l'élément d'id "enfants" existe, etc.).

8. *Optionnel* :
* Il arrive que la *checkbox* soit cochée par défaut, ce qui inverse son
effet. Rajoutez une ligne de code pour la décocher au chargement du script. Nous
vous laissons chercher la propriété qui va bien à l'aide de l'autocomplétion
et/ou de Google.

   <!-- propriété checked -->

* Nous souhaitons que le curseur soit par défaut dans l'input *Nom*. Trouvez la
  fonction qui va bien et implantez-la dans votre fichier JS (pour des raisons
  techniques, cette commande marche mal quand on la tape dans la console).

<!--
fonction focus().
Ne marche pas si on la tape dans la console car la console "vole" le focus
-->


</div>

#### Avoir un formulaire de taille variable

Notre objectif dans cette dernière partie est de pouvoir rajouter des lignes à
un formulaire en cliquant sur un bouton.

<div class="exercise">

1. Sélectionnez l'élément de balise `<tbody>` inclus dans l'élément
   d'identifiant *enfants* à l'aide de `document.querySelector()` et stockez-le
   dans une variable `table_enfants`
2. Nous souhaitons maintenant ajouter une nouvelle ligne à notre
   tableau. Ajoutez le code HTML suivant à la fin du tableau comme nous avons vu
   à la section [Modifier une page Web](modifier-une-page-web).

   ~~~
   <tr>
     <td>Enfant n°2</td>
     <td><input type="text" name="nom-e2"></td>
     <td><input type="text" name="prenom-e2"></td>
   </tr>
   ~~~
   {:.html}
   
<!--
   Nous allons procéder en plusieurs étapes&nbsp;:

   1. Créer un nouvel élément HTML de type `<tr>` à l'aide de 

      ~~~
      var e = document.createElement("tr");
      ~~~
      {:.javascript}

   2. Actuellement, notre élément `e` représente juste le code HTML `<tr></tr>`. Nous allons le remplir en éditant son intérieur via `e.innerHTML` ([documentation](https://developer.mozilla.org/fr/docs/Web/API/Element/innertHTML)).
      Ajoutez le code HTML nécessaire en assignant la bonne chaîne de caractères à `e.innerHTML`.

      **Remarque:** Les chaînes de caractères en JavaScript commencent et finissent par **"** (ou **'**). Le caractère d'échappement **\\** est nécessaire pour les caractères spéciaux comme les guillemets `\"` &#8594; **"**, le saut de ligne `\n` &#8594;  **&#8626;**.

   3. Il ne reste plus qu'à ajouter notre élément `e` à la fin de body. Pour cela, utilisons `table_enfants.`[`appendChild`](https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild)`(e)`.
-->

3. Associons notre action à l'événement 'clic' sur le bouton *Ajouter un enfant* 
   1. Empaquetons tout cela dans une fonction `function AjoutEnfant()`.
   2. Sélectionner notre bouton à l'aide de `querySelector` (c'est le premier bouton qui provient de la balise d'identifiant *enfants*).
   3. Associez-lui le gestionnaire d'événement qui associe au clic l'action `AjoutEnfant`.

4. Actuellement, nous rajoutons toujours la même ligne n°2 au tableau lors de
   clics successifs.
   1. Pour garder trace du numéro de la ligne actuelle, nous allons créer une
      variable globale `enf_count` que nous incrémenterons dans `AjoutEnfant`.

      ~~~
      var enf_count = 2;
      function AjoutEnfant () {
        // ...
        enf_count++;
      }
      ~~~
      {:.javascript}

   2. Changer le corps de la fonction `AjoutEnfant` pour créer la ligne n° `enf_count`.

5. Déployez votre code avec un copier/coller dans **DynamicForm.js**. Quand tout
   marche bien, profiter de l'instant.

</div>

## Exercices pour les plus avancés

* Rajoutez un bouton pour réinitialiser le formulaire (ceci ne nécessite pas de
  JavaScript)
<!-- <button type="reset"> -->
* Sur le bouton envoyer, rajouter un gestionnaire pour l'évènement `click` qui
empêchera l'action par défaut (qui est d'envoyer le formulaire) si les deux
adresses email sont différentes. Affichez alors un message d'erreur dans votre
formulaire.  
**Aide :** Renseignez-vous sur les
[objets évènements](https://developer.mozilla.org/fr/docs/Web/API/Event) pour
trouver comment faire.

* Empéchez l'ajout d'un enfant supplémentaire tant que les champs du précédent
  ne sont pas remplis complètement.


<!--
preventDefault
Afficher un truc propre comme le fait Fundation Abide
-->

## Annexe

### Quelques liens bibliographiques

- [La présentation des outils de développements sur le site de Chrome](https://developer.chrome.com/devtools)
- [Le site de Mozilla sur les technologies Web](https://developer.mozilla.org/fr/)
- [La structure d'arbre du HTML](http://fr.eloquentjavascript.net/chapter12.html)

### Version de Chrome trop ancienne

Si votre version de Chrome/Chromium est trop ancienne à l'IUT&nbsp;:
identifiez-vous sur le
[site de l'IUT](https://iutdepinfo.iutmontp.univ-montp2.fr/), puis téléchargez
[l'archive suivante](https://infolimon.iutmontp.univ-montp2.fr/public/windows/chrome-win32.zip)
(à décompresser avec *7-zip*).  Il faudra d'abord fermer toutes vos fenêtres de
Chrome avant de lancer l'exécutable `chrome.exe` contenu dans l'archive.

<!--
Fonction javascript intéressantes (liés au script de slides Dz-slides)&nbsp;:
scrollintoView, clientHeight

scrollTop&nbsp;: Définit ou obtient le nombre de pixels dont le contenu de l'élément
a défilé vers le haut.
document.body.scrollTop

getBoundingClientRect() method returns the size of an element and its position
relative to the viewport.
document.body.scrollTop += e1.getBoundingClientRect().top;

Dans les devltools de chrome, $() est un raccourci de document.querySelector()
et $$() un raccourice de document.querySelectorAll()

-->

<!--

Comment faire les li les uns après les autres toutes les 100ms

NON - la variable i de la fonction ne sera résolue que lors de l'appel
for(var i = 0; i < ali.length; i++) {
  setTimeout(function() {ali[i].scrollIntoView();}, i * 100);
  }
  
NON - affiche le même nombre plein de fois
for(var i = 0; i < ali.length; i++) {
  function temp () {
     console.log(i);
  }
  setTimeout(temp, i * 100);
}
  
OUI - l'argument est évalué au moment du setTimeOut
function temp (i) {
   return function () {ali[i].scrollIntoView();};
}
for(var i = 0; i < ali.length; i++) {
  setTimeout(temp(i), i * 100);
}

-->

<!-- .__proto__ pour connaître le prototype ("la classe") -->
