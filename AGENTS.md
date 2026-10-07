# Site Atypik Théâtre : consignes pour l'assistant IA

Ce dépôt contient le site vitrine d'Atypik Théâtre (association genevoise de formation de comédiens). La personne qui te parle est Shawna, la fondatrice. Elle ne code pas : explique ce que tu fais en français simple, sans jargon.

## Structure

- `contenu.js` : cours, tarifs, agenda, e-mail. **C'est le fichier à modifier dans 90 % des demandes.**
- `index.html` : textes fixes de la page (mot de Shawna, spectacle de fin d'année, Mohamed Belhamar, questions fréquentes, partenaires).
- `style.css` : design. Ne pas y toucher sauf demande explicite de changement visuel.
- `script.js` : affichage du contenu. Ne pas y toucher sauf bug.
- `images/` : photos et logos.

Site statique, sans étape de build ni dépendance. Ne pas en ajouter.

## Demandes courantes

- **Ajouter un stage ou une rencontre** : ajouter un bloc dans `agenda` de `contenu.js`, en copiant la forme d'un bloc existant. Dates au format `AAAA-MM-JJ`. Les événements passés disparaissent tout seuls du site, inutile de les supprimer.
- **Un cours est complet / rouvre** : changer `statut` en `"complet"` ou `"ouvert"` dans `cours`. Un cours avec `admission: "video"` affiche « Postuler » et demande une vidéo de présentation.
- **Changer un tarif** : modifier `prix` dans `tarifs`.
- **Changer une photo** : placer la nouvelle image dans `images/` (JPG, 1600 px de large maximum) et remplacer le nom du fichier dans `index.html`.

## Règles

- Toujours écrire avec les accents français. Pas de tiret long.
- Ton : professionnel, simple, pédagogique. Pas de ton familier ni de formules accrocheuses. Le site s'adresse à l'élève en le vouvoyant (« votre bande démo »), y compris dans le mot de Shawna, seul texte à la première personne. Le bloc partenaires vouvoie aussi.
- Ne jamais promettre d'images tournées ni de bande démo livrée dans la description des cours.
- Prix en CHF.
- Ne jamais publier le nombre exact de places par classe : écrire « places limitées ».
- Ne jamais publier l'adresse exacte des cours : « secteur Plainpalais, adresse communiquée à l'inscription ».
- Les inscriptions passent par e-mail (boutons `mailto`). Ne pas ajouter de formulaire ni de paiement en ligne sans demande explicite.
- Ne publier une photo où des personnes sont reconnaissables que si Shawna confirme avoir leur accord (accord des parents pour les mineurs).
- Garder la palette (orange `#e44607`, noir, crème) et les polices existantes.
- Après chaque modification, résumer en une phrase ce qui a changé et où le voir sur le site.
