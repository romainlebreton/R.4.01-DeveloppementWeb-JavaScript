---
title: Cours 2 &ndash; Compléments avancés
subtitle: DOM & Évènements
layout: tutorial
lang: fr
---

## Quelques points supplémentaires

Pêle-mêle :


* [`innerText` vs `textContent`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)  
  `innerText` regarde l'apparence du texte (est-il caché ? en majuscule ?), tandis que `textContent` renvoie le contenu texte brut 
* [`document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) accède aux cookies.  
  * Pour des [raisons de sécurité](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#security),
  on doit limiter au maximum les cookies lisibles en JavaScript en leur donnant l'attribut `httpOnly`.  
  * Éviter de mettre dans des cookies les données utiles seulement au client, car elles sont envoyées systématiquement au serveur.  
    Utilisez [`localStorage` et `sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) pour stocker des données uniquement pour le client.
* `.value` vs `setAttribute("value", ...)` :  
  Attention, `inputElement.value` modifie la valeur courante de l'`<input>` (qui sera donc effacée par le bouton `reset` du formulaire), tandis que `inputElement.setAttribute("value", ...)` change la valeur par défaut (qui se voit tant que l'utilisateur ne l'a pas changée).  
  [Source](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#gecko_notes)
* [Exemples d'utilisation](https://javascript.info/event-delegation#the-behavior-pattern) de la propagation d'évènement 
  En gros, `this` pointe vers la balise possédant le gestionnaire d'évènement, comme `currentTarget`
* [Capturing events](https://javascript.info/bubbling-and-capturing#capturing)  
  On peut aussi écouter les évènements lors de la phase de capture, c-à-d lorsqu'ils cherchent leur cible en descendant dans le DOM
* [Inclure des données JSON dans une page Web](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#embedding_data_in_html)  
  Utile dans un scénario où les données sont générées par le serveur
* [contentEditable](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/isContentEditable)  
  Pour permettre l'édition d'une partie de la page Web
* Pour ouvrir un lien dans une nouvelle fenêtre, utilisez l'attribut [`target="_blank"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) de la balise `<a>`.
* [Duck typing](https://medium.com/@eamonocallaghan/what-is-duck-typing-in-javascript-f3eb10853361)  
  Les interfaces n'existent pas en JavaScript. En effet, un prototype est dynamique et peut voir ses méthodes évoluer.  
  On peut tout de même émuler les interfaces en vérifiant la présence des méthodes voulues.
* [Que vaut `this` dans un gestionnaire d'évènement ?](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_value_of_this_within_the_handler)  

## Vulnérabilité XSS au TD2

Lors du TD2, vous avez pu être amenés à écrire le code suivant pour l'affichage
du tableau de score du championnat de football

```js
class Equipe {
  toHTML() {
    return `<tr><td>${this.classement}</td><td>${this.nom}</td></tr>`
  }
}

// championnat.js
class Championnat {
  afficherClassement() {
    document.querySelectorAll("#bloc-classement tbody").insertAdjacentHTML(
      'beforeend', 
      this.tabEquipes[i].toHTML()
    )
  } 
}
```

Or, ce code a une vulnérabilité XSS. Le nom de l'équipe est saisi un
utilisateur, qui pourrait provoquer un comportement non souhaité du navigateur.

### Solution 1

On utilise une variante personnalisée des ``template string : `string text ${expression} string text` ``.
Ces variantes récupèrent les morceaux de chaines de caractères du template string, ainsi que les valeurs des expressions.
Puis, il peut les traiter comme il le souhaite. Dans notre cas, nous allons échapper *à la main* les valeurs des expressions.

```js
// library.js
function escapeHtml(text) {
  return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

function safeTag(strings, ...values) {
  let out = ""
  for (let i = 0; i < strings.length; i++) {
    out += strings[i]
    if (i < values.length) {
      safeValue = escapeHtml(values[i])
      out += safeValue
    }
  }
  return out        
}

// equipe.js
class Equipe {
  toHTML() {
    return safeTag`<tr><td>${this.classement}</td><td>${this.nom}</td></tr>`
  }
}
```

[Source sur MDN pour les *tagged templates* ``tagFunction`string text ${expression} string text` ``](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)


### Solution 2

L'utilisation de la balise HTML `<template>` peut faciliter la mise en place d'une solution.
Le `<template>` permet de cloner facilement un morceau de page Web.
On peut alors cibler certaines balises, par exemple grâce à leur identifiant, pour modifier leur `textContent`.

```html
<!-- championnat.html -->
<template id="ligne">
  <tr>
    <td id="classement"></td>
    <td id="nom"></td>
  </tr>
</template>
```

```js
// equipe.js
class Equipe {
  toHTMLElement() {
    let template = document.getElementById("ligne");
    let ligne = template.content.cloneNode(true);
    ligne.getElementById("classement").textContent = this.classement;
    ligne.getElementById("nom").textContent = this.nom;
    return ligne;
  }
}

// championnat.js
class Championnat {
  afficherClassement() {
    document.querySelectorAll("#bloc-classement tbody").insertAdjacentElement(
      'beforeend', 
      this.tabEquipes[i].toHTMLElement()
    )
  } 
}
```


[Source de l'ANSSI](https://cyber.gouv.fr/sites/default/files/2013/05/anssi-guide-recommandations_mise_en_oeuvre_site_web_maitriser_standards_securite_cote_navigateur-v2.0.pdf)
