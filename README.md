# Site de la mosquée En-Nour — Belleville-en-Beaujolais

Refonte du site de la mosquée En-Nour, gérée par l'ACCI (Association Culturelle et Cultuelle Islamique). Première version navigable, **non publiée** : aucune migration de domaine n'a été faite.

- **Pages** : Accueil, La mosquée & l'ACCI, Horaires, École & cours, Actualités, Soutenir, Contact & accès, plus Ressources, Mentions légales, Confidentialité et une page 404.
- **À lire avant publication** : [docs/A-CONFIRMER.md](docs/A-CONFIRMER.md)
- **Mettre à jour le site** : [docs/GUIDE-MISE-A-JOUR.md](docs/GUIDE-MISE-A-JOUR.md)
- **Redirections des anciennes pages** : [docs/REDIRECTIONS.md](docs/REDIRECTIONS.md)

## Pourquoi cette plateforme

Le site est un **site statique** généré par [Eleventy](https://www.11ty.dev/), avec un **espace d'édition en ligne** ([Decap CMS](https://decapcms.org/)) à l'adresse `/admin/`.

Pour une petite équipe associative, ce choix offre :

- **un hébergement gratuit** (offre gratuite de Netlify ou Cloudflare Pages), sans serveur ni base de données à maintenir ;
- **une grande sécurité** : pas d'extensions à mettre à jour comme sur WordPress, donc très peu de risque de piratage ;
- **une édition simple** : les bénévoles modifient les actualités, l'annonce, les coordonnées et les horaires dans un formulaire, sans toucher au code ;
- **un historique complet** : chaque modification est enregistrée dans GitHub et peut être annulée.

La limite : la mise en place initiale (hébergement, connexion GitHub) demande une personne à l'aise avec l'informatique, une seule fois. Si l'équipe préfère un outil qu'elle connaît déjà, WordPress reste une alternative valable, mais il faudra l'entretenir (mises à jour, sauvegardes).

## Lancer le site sur un ordinateur

Prérequis : [Node.js](https://nodejs.org/) 20 ou plus récent.

```bash
npm install        # une seule fois
npm start          # aperçu sur http://localhost:8080, rechargé à chaque modification
npm run build      # génère le site final dans le dossier _site/
npm run check      # liste les informations encore à confirmer
```

Pour tester l'espace d'édition en local : lancer `npm run cms` dans un second terminal, puis ouvrir http://localhost:8080/admin/.

## Mise en ligne (quand le bureau l'aura décidé)

1. Créer un site sur Netlify à partir de ce dépôt GitHub. Commande de build : `npm run build`, dossier publié : `_site`.
2. Dans les réglages d'accès du site sur Netlify, ajouter GitHub comme fournisseur OAuth, pour que l'espace `/admin/` fonctionne. Les éditeurs doivent avoir un compte GitHub avec accès au dépôt.
3. Vérifier l'aperçu Netlify et faire valider les contenus (voir `docs/A-CONFIRMER.md`).
4. Seulement ensuite, faire pointer le domaine `mosquee-ennour.org` vers Netlify. Le fichier `src/_redirects` redirige automatiquement les anciennes adresses.

Cloudflare Pages accepte le même fichier `_redirects`, mais l'espace d'édition y demande un service d'authentification supplémentaire.

## Organisation des fichiers

| Dossier ou fichier | Rôle |
|---|---|
| `src/*.njk` | Les pages du site |
| `src/actualites/*.md` | Une actualité par fichier |
| `src/_data/site.json` | Coordonnées, réseaux, lien de don |
| `src/_data/horaires.json` | Source officielle des horaires, vendredi, iqama |
| `src/_data/calendrier.json` | Horaires jour par jour (importés depuis un CSV) |
| `src/_data/annonce.json` | Annonce prioritaire de l'accueil |
| `src/_data/ecole.json` | Inscriptions, horaires et tarifs de l'école |
| `src/_data/documents.json`, `ressources.json` | Documents et liens utiles |
| `src/assets/` | Styles, script, polices, images |
| `src/admin/` | Espace d'édition (Decap CMS) |
| `src/_redirects` | Redirections des anciennes pages |
| `scripts/` | Import des horaires, vérification de la configuration |

## Choix techniques

- Polices hébergées sur le site (Cormorant Garamond pour les titres, Source Sans 3 pour le texte) : aucun appel à Google Fonts.
- Aucun cookie, aucune mesure d'audience, aucun formulaire.
- Le JavaScript sert au menu mobile, aux horaires et aux filtres des actualités. Sans JavaScript, le menu reste visible et le message « Horaires à confirmer » s'affiche.
- Animations limitées aux changements de couleur, désactivées si l'appareil demande moins d'animations (`prefers-reduced-motion`).
- Référencement local : titre et description propres à chaque page, données structurées `Mosque` (schema.org), `sitemap.xml`, `robots.txt`.
- L'arabe et l'affichage de droite à gauche sont prévus pour plus tard. Aucun sélecteur de langue n'est affiché tant qu'aucune traduction n'existe.
