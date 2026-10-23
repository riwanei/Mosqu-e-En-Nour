# Équipe d'agents du site En-Nour

Ce fichier est le point commun de tous les agents définis dans `.claude/agents/`. Chaque agent le lit avant de commencer et y laisse une trace de ce qu'il transmet aux autres. Un humain peut aussi le lire pour savoir qui fait quoi.

## Qui fait quoi

| Agent | Rôle | Fichiers dont il est responsable |
|---|---|---|
| `coordinateur-ennour` | Reçoit la demande, la découpe, choisit l'agent, tient le journal et la liste à confirmer | `docs/EQUIPE-AGENTS.md`, `docs/A-CONFIRMER.md` |
| `dev-site` | Code du site : gabarits, styles, CMS, construction, mise en ligne | `eleventy.config.js`, `src/_includes/`, `src/assets/`, `src/admin/`, `scripts/`, `*.njk` |
| `redaction-annonces` | Actualités et annonce « À la une », textes des pages | `src/actualites/`, `src/_data/annonce.json`, textes des pages |
| `horaires-prieres` | Horaires des prières, calendrier, prière du vendredi, iqamas | `src/_data/horaires.json`, `src/_data/calendrier.json`, `docs/modele-horaires.csv` |
| `dons-association` | Dons, RIB, adhésion, coordonnées, mentions légales, documents PDF | `src/_data/site.json`, `src/_data/legal.json`, `src/_data/documents.json`, `src/_data/ecole.json` |
| `relecture-qualite` | Relit tout avant publication : faits, ton, accessibilité, construction. Ne modifie rien | aucun (lecture seule) |

Un fichier n'a qu'un responsable. Un agent qui a besoin d'un changement dans le fichier d'un autre le demande par un relais au lieu de le faire lui-même.

## Règles communes

Elles viennent du bureau de l'ACCI et de Riri, et priment sur tout le reste.

1. **La mosquée** : En-Nour, 6 rue Pidancet, 69220 Belleville-en-Beaujolais (Rhône), gérée par l'ACCI. Ce n'est pas un lieu du quartier de Belleville à Paris.
2. **Ne rien inventer** : ni horaire, ni date, ni tarif, ni chiffre, ni nom. Une information non confirmée ne s'affiche pas, ou est remplacée par un message honnête (par exemple « Horaires à confirmer auprès de la mosquée »). Toute information manquante va dans `docs/A-CONFIRMER.md`.
3. **Pas de publication sans accord** : rien n'est enregistré sur `main` (ce qui met le site en ligne) et aucun domaine n'est migré sans l'accord explicite de Riri pour ce changement précis.
4. **Images** : uniquement des photos fournies et autorisées. Sinon, les compositions graphiques abstraites du site.
5. **Charte** : ivoire `#F7F4EC`, vert profond `#123D32`, or mat `#B5975B` (décor seulement), texte `#202A27`. Titres en serif, texte en sans-serif. Conçu d'abord pour le téléphone.
6. **Ton** : chaleureux, respectueux, sobre, en français. Pas d'emojis sur le site.
7. **Vérifier avant d'annoncer** : `npm run build` doit passer, et `npm run check` donne l'état des informations à confirmer.

## Comment les agents se passent le relais

Un agent ne peut pas en lancer un autre directement : c'est la conversation principale (ou `coordinateur-ennour`) qui enchaîne les agents. Pour que rien ne se perde entre eux :

1. Chaque agent termine sa réponse par un bloc **Relais** qui dit, pour chaque suite à donner, quel agent doit la prendre et avec quelles informations. Exemple :

   ```
   Relais
   - relecture-qualite : relire src/actualites/2026-11-14-conference-patience.md avant publication.
   - horaires-prieres : l'annonce cite la prière de l'Isha à 19 h 45, à vérifier dans le calendrier.
   ```

   S'il n'y a rien à transmettre, il écrit « Relais : aucun ».
2. Il ajoute une ligne au journal ci-dessous (date, agent, ce qui a été fait, relais). `relecture-qualite`, qui ne modifie aucun fichier, laisse `coordinateur-ennour` reporter son verdict.
3. Celui qui orchestre lance l'agent nommé avec ces informations. Tout ce qui doit être publié passe par `relecture-qualite` en dernier.

Chaînes habituelles :

- Nouvelle annonce : `redaction-annonces` → (`horaires-prieres` si l'annonce cite une prière) → `relecture-qualite` → accord de Riri → publication.
- Nouveaux horaires : `horaires-prieres` → (`dev-site` si l'affichage doit changer) → `relecture-qualite`.
- Lien de don, RIB, mentions légales : `dons-association` → `relecture-qualite`.
- Changement de mise en page ou de fonctionnalité : `dev-site` → `relecture-qualite`.
- Information confirmée par le bureau : `coordinateur-ennour` met à jour `docs/A-CONFIRMER.md` et passe le relais à l'agent responsable du fichier concerné.

## Journal des relais

Le plus récent en haut. Une ligne par intervention.

| Date | Agent | Fait | Relais |
|---|---|---|---|
| 2026-10-23 | coordinateur-ennour | Création de l'équipe d'agents | aucun |
