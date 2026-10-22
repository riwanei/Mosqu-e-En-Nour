// Importe un calendrier de prières depuis un fichier CSV fourni par la mosquée.
// Usage : npm run horaires:import -- chemin/vers/horaires.csv
// Colonnes attendues (séparateur « , » ou « ; ») :
//   date,fajr,sunrise,dhuhr,asr,maghrib,isha
// date au format AAAA-MM-JJ ou JJ/MM/AAAA, heures au format HH:MM (heure de Paris).
// La colonne sunrise (lever du soleil) est facultative. Des colonnes iqama_fajr, iqama_dhuhr…
// sont aussi lues, mais ne s'affichent que si « iqamaConfirmee » vaut true dans horaires.json.
import { readFileSync, writeFileSync } from "node:fs";

const fichier = process.argv[2];
if (!fichier) {
  console.error("Indiquez le fichier CSV : npm run horaires:import -- horaires.csv");
  process.exit(1);
}
const HEURE = /^([01]?\d|2[0-3])[:hH]([0-5]\d)$/;
const normHeure = (v) => {
  const m = String(v || "").trim().match(HEURE);
  return m ? m[1].padStart(2, "0") + ":" + m[2] : null;
};
const normDate = (v) => {
  v = String(v || "").trim();
  let m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return v;
  m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}` : null;
};

const lignes = readFileSync(fichier, "utf8").replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim());
const sep = lignes[0].includes(";") ? ";" : ",";
const entetes = lignes[0].split(sep).map((h) => h.trim().toLowerCase());
const obligatoires = ["date", "fajr", "dhuhr", "asr", "maghrib", "isha"];
const manquantes = obligatoires.filter((c) => !entetes.includes(c));
if (manquantes.length) {
  console.error("Colonnes manquantes : " + manquantes.join(", "));
  process.exit(1);
}

const cible = new URL("../src/_data/calendrier.json", import.meta.url);
const calendrier = JSON.parse(readFileSync(cible, "utf8"));
calendrier.jours ||= {};
const erreurs = [];
let n = 0;
lignes.slice(1).forEach((ligne, i) => {
  const cellules = ligne.split(sep);
  const v = Object.fromEntries(entetes.map((h, j) => [h, cellules[j]]));
  const date = normDate(v.date);
  if (!date) return erreurs.push(`ligne ${i + 2} : date illisible « ${v.date} »`);
  const jour = {};
  for (const k of ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"]) {
    const h = normHeure(v[k]);
    if (h) jour[k] = h;
    else if (k !== "sunrise") return erreurs.push(`ligne ${i + 2} : heure ${k} illisible « ${v[k] ?? ""} »`);
  }
  const iqama = {};
  for (const k of ["fajr", "dhuhr", "asr", "maghrib", "isha"]) {
    const h = normHeure(v["iqama_" + k]);
    if (h) iqama[k] = h;
  }
  if (Object.keys(iqama).length) jour.iqama = iqama;
  calendrier.jours[date] = jour;
  n++;
});

if (erreurs.length) {
  console.error("Import annulé, corrigez le fichier :\n  " + erreurs.join("\n  "));
  process.exit(1);
}
calendrier.jours = Object.fromEntries(Object.entries(calendrier.jours).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(cible, JSON.stringify(calendrier, null, 2) + "\n");
console.log(`${n} jour(s) importé(s) dans src/_data/calendrier.json.`);
console.log("Pensez à renseigner la source officielle dans src/_data/horaires.json (ou dans l'espace d'édition).");
