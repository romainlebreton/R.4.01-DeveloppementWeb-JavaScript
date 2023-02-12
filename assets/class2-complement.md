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
* [Que vaut `this` dans un gestionnaire d'évènement](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_value_of_this_within_the_handler)  

