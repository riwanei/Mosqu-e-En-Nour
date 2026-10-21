# Guide de mise à jour

Ce guide s'adresse aux bénévoles qui font vivre le site. Aucune connaissance technique n'est nécessaire pour les tâches courantes.

## Se connecter

1. Ouvrez `https://www.mosquee-ennour.org/admin/` (ou l'adresse de l'aperçu Netlify).
2. Cliquez sur « Login with GitHub » et connectez-vous avec votre compte GitHub. Le responsable du site doit vous avoir donné accès au dépôt.
3. Chaque enregistrement met le site à jour en une à deux minutes.

## Publier une actualité

1. Menu **Actualités** → **Nouvelle actualité**.
2. Remplissez le titre, la date de publication, le thème (Annonce, Événement, École, Vie de l'association) et un résumé d'une phrase.
3. Rédigez le texte. Indiquez uniquement des informations confirmées : date, heure, lieu, personne à contacter.
4. Cochez **Brouillon** pour enregistrer sans publier, décochez-le pour publier.
5. Cliquez sur **Publier** (en haut).

Les trois dernières actualités apparaissent sur l'accueil. Les filtres par thème de la page Actualités apparaissent dès que deux thèmes différents sont utilisés.

**Modifier ou retirer une actualité** : ouvrez-la dans la liste, modifiez-la puis **Publier**, ou cochez **Brouillon** pour la retirer du site. Le bouton **Supprimer** l'efface définitivement.

## Changer l'annonce prioritaire de l'accueil

**Réglages du site → Annonce prioritaire**. Décochez « Afficher l'annonce » pour la masquer.

## Mettre à jour les horaires des prières

Les horaires ne s'affichent que si deux conditions sont réunies : une **source officielle** est renseignée, et la **date du jour** figure dans le calendrier. Sinon, le site affiche « Horaires à confirmer auprès de la mosquée ». C'est voulu : aucun horaire non vérifié n'est affiché.

1. Préparez un tableur avec les colonnes `date, fajr, sunrise, dhuhr, asr, maghrib, isha` (modèle : `docs/modele-horaires.csv`). Dates au format `JJ/MM/AAAA`, heures au format `HH:MM`, à l'heure de Paris. La colonne `sunrise` (lever du soleil) est facultative.
2. Enregistrez-le en CSV, puis, sur un ordinateur avec le projet : `npm run horaires:import -- mon-fichier.csv`. Le script refuse le fichier s'il contient une date ou une heure illisible.
3. Dans **Réglages du site → Horaires**, renseignez la source (par exemple « Calendrier 2027 de la mosquée En-Nour »), qui l'a validée et la date de mise à jour.
4. N'ajoutez la prière du vendredi et les iqamas que si elles sont confirmées par l'imam ou le bureau.

Pensez à importer l'année suivante avant le 31 décembre.

## Coordonnées, école, mentions légales

**Réglages du site** contient les coordonnées, l'adresse, les informations de visite, l'école et les mentions légales. Un champ laissé vide n'apparaît pas sur le site : il vaut mieux un champ vide qu'une information incertaine.

## Ajouter le logo officiel

**Réglages du site → Coordonnées → Logo officiel**. Utilisez un fichier PNG ou SVG d'environ 300 × 90 pixels, à fond transparent.

## Avant chaque mise en ligne importante

Lancez `npm run check` : la commande liste ce qu'il reste à confirmer.

## En cas d'erreur

Chaque modification est enregistrée dans l'historique GitHub du dépôt. Une personne ayant accès au dépôt peut revenir à la version précédente.
