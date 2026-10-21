# Informations à confirmer avant publication

Cette liste est destinée au responsable du site. Tant qu'une information n'est pas confirmée, elle n'apparaît pas sur les pages publiques, ou un message honnête la remplace. La commande `npm run check` affiche l'état à jour de cette liste.

## Bloquant

| Information | Où la saisir | Ce qui s'affiche en attendant |
|---|---|---|
| Validité du lien de don HelloAsso (voir la note ci-dessous) | Réglages → Coordonnées → Dons | Le lien actuel |
| Source officielle des horaires de prière et calendrier de l'année | Réglages → Horaires + import CSV | « Horaires à confirmer auprès de la mosquée » |
| Directeur ou directrice de la publication | Réglages → Mentions légales | Rien (obligation légale) |
| Hébergeur du site | Réglages → Mentions légales | Rien (obligation légale) |
| Documents PDF à rapatrier : ils sont hébergés sur l'ancien site et deviendront inaccessibles après le changement de domaine | `src/_data/documents.json`, `src/_data/ecole.json`, `src/_data/site.json` | Liens vers l'ancien site |
| Accord pour la mise en ligne et le changement de domaine | Bureau de l'ACCI | Aucune migration n'est faite |

**Note sur le lien HelloAsso** : le 21 octobre 2026, la page « Contribuez au financement de l'agrandissement de Masdjid Ennour » était ouverte aux dons (don ponctuel et mensuel), sans date de fin affichée. Le bureau doit tout de même confirmer que c'est bien la campagne à mettre en avant, puis cocher « Lien confirmé ».

## À confirmer dans les textes

- **Graphie du nom** : le brief dit « En-Nour », l'ancien site et HelloAsso disent « Ennour ». Le nom se modifie dans Réglages → Coordonnées.
- **Accueil des visiteurs** : l'accueil et la page Contact disent que la mosquée « reste ouverte à tous ceux qui souhaitent la découvrir » et invitent à prévenir avant une visite. Ces phrases sont à valider, ainsi que les éventuelles conditions de visite (groupes, scolaires, tenue).
- **Programme des dorous** : repris de l'ancien site, qui ne donne aucune date de validité.
- **École d'arabe** : capacité (8 classes de 15 élèves), 4 niveaux et séances de 2 h 30 le samedi et/ou le dimanche, repris de l'ancien site. La page « À propos » de l'ancien site évoque plus de 90 élèves par an : ce chiffre n'a pas été repris.
- **Services** : toilette mortuaire, aide aux personnes dans le besoin, opération Iftar, enseignement du Coran (l'ancien site précise « pour les enfants de 6 à 10 ans », ce qui n'a pas été repris faute de confirmation).
- **Historique** : les dates (1988, 1990, 1998, 2013, 2014, 2016) viennent de la page « Notre histoire » de l'ancien site.
- **Annonce prioritaire** : l'accueil met en avant le projet d'agrandissement. À remplacer par une autre annonce si besoin.

## Conseillé

- Fichier du **logo officiel** (il n'a pas pu être téléchargé depuis l'ancien site). En attendant, un emblème géométrique et le nom sont affichés.
- **Photographies autorisées** de la mosquée. En leur absence, la page d'accueil montre une composition graphique abstraite : aucune photo d'un autre édifice n'est utilisée.
- Adresse e-mail de contact.
- Horaires d'ouverture hors prières, stationnement, transports en commun, accessibilité aux personnes à mobilité réduite.
- Prière du vendredi (horaires de la khutba) et iqamas, seulement si elles sont confirmées.
- École : modalités d'inscription de l'année en cours, horaires des classes, tarifs validés, formulaire de préinscription à jour (celui de l'ancien site date de 2021-2022).
- Lien d'adhésion en ligne, s'il existe.
- Liste des membres du bureau, si l'association souhaite la publier.
- Pages de l'ancien site à reprendre ou à abandonner : Qu'est-ce que l'islam ?, Les 5 piliers, Les 6 piliers de la foi, Lecture et écoute du Coran, Évènements religieux, 40 Rabanas, Mosquées voisines, Hajj & Omra, Commerces, Partenaires, Instances islamiques, Obsèques, Organisations humanitaires, Administrations, Notre ville, chiffres de l'association.
- Formulaire de contact : aucun n'est proposé. Il faudrait un service d'envoi (par exemple Netlify Forms) et une adresse de réception. En attendant, le site renvoie vers le téléphone et WhatsApp.
- Contrôle d'accessibilité complet (lecteur d'écran, audit RGAA) : non réalisé à ce stade.
