// Liste les informations à confirmer avant publication.
// Usage : npm run check   (code de sortie 1 s'il reste des points bloquants)
import { readFileSync } from "node:fs";

const lire = (f) => JSON.parse(readFileSync(new URL(`../src/_data/${f}`, import.meta.url), "utf8"));
const site = lire("site.json");
const horaires = lire("horaires.json");
const calendrier = lire("calendrier.json");
const ecole = lire("ecole.json");
const legal = lire("legal.json");

const bloquants = [];
const conseilles = [];

if (!site.adresse.rue) bloquants.push("Numéro et nom de rue de la mosquée (site.json → adresse.rue ; le code postal 69220 est renseigné). Sans elle, l'itinéraire recherche « Mosquée Ennour, Belleville-en-Beaujolais ».");
if (!site.don.lienConfirme) bloquants.push("Validité du lien de don HelloAsso à faire confirmer par le bureau (site.json → don.lienConfirme).");
if (!horaires.source) bloquants.push("Source officielle des horaires de prière (horaires.json → source). Sans source, le site affiche « Horaires à confirmer auprès de la mosquée ».");
if (!Object.keys(calendrier.jours || {}).length) bloquants.push("Calendrier des prières (calendrier.json), à importer avec « npm run horaires:import ».");
if (!legal.directeurPublication) bloquants.push("Directeur ou directrice de la publication (legal.json), obligatoire pour les mentions légales.");
if (!legal.hebergeur) bloquants.push("Hébergeur du site (legal.json), obligatoire pour les mentions légales.");

if (!site.logo) conseilles.push("Fichier du logo officiel (site.json → logo). En attendant, un emblème géométrique et le nom sont affichés.");
if (!site.email) conseilles.push("Adresse e-mail de contact (site.json → email).");
if (!site.horairesOuverture) conseilles.push("Horaires d'ouverture de la mosquée hors prières.");
if (!site.conseilsVisite) conseilles.push("Conseils pour la visite (tenue, accueil des groupes, salle des femmes…).");
if (!site.accesPmr) conseilles.push("Accessibilité aux personnes à mobilité réduite.");
if (!site.stationnement) conseilles.push("Stationnement.");
if (!site.transports) conseilles.push("Transports en commun.");
if (!horaires.vendredi) conseilles.push("Horaires du vendredi (khutba, Jumu'a), à n'afficher que s'ils sont confirmés.");
if (!ecole.inscriptionsTexte) conseilles.push("Modalités d'inscription à l'école d'arabe pour l'année en cours.");
if (!ecole.horairesDetailles) conseilles.push("Horaires précis des classes de l'école.");
if (!ecole.tarifs) conseilles.push("Tarifs de l'école (à n'afficher que s'ils sont validés).");
if (!ecole.dorousValides) conseilles.push("Programme des dorous à confirmer (repris de l'ancien site).");

console.log("\nInformations à confirmer avant publication\n");
console.log(bloquants.length ? "Bloquant :" : "Bloquant : rien");
bloquants.forEach((b) => console.log("  ✗ " + b));
console.log(conseilles.length ? "\nConseillé :" : "\nConseillé : rien");
conseilles.forEach((c) => console.log("  • " + c));
console.log("");
process.exitCode = bloquants.length ? 1 : 0;
