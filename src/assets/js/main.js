// Scripts du site de la mosquée En-Nour : menu mobile, horaires des prières, filtres d'actualités.
(function () {
  "use strict";

  // ---------- Menu mobile ----------
  var bouton = document.querySelector(".menu-bouton");
  var nav = document.getElementById("navigation-principale");
  if (bouton && nav) {
    bouton.hidden = false;
    var fermer = function (rendreFocus) {
      bouton.setAttribute("aria-expanded", "false");
      nav.classList.remove("est-ouverte");
      if (rendreFocus) bouton.focus();
    };
    bouton.addEventListener("click", function () {
      var ouvert = bouton.getAttribute("aria-expanded") === "true";
      if (ouvert) {
        fermer(false);
      } else {
        bouton.setAttribute("aria-expanded", "true");
        nav.classList.add("est-ouverte");
        var premier = nav.querySelector("a");
        if (premier) premier.focus();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && bouton.getAttribute("aria-expanded") === "true") fermer(true);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) fermer(false);
    });
    document.addEventListener("click", function (e) {
      if (bouton.getAttribute("aria-expanded") === "true" && !nav.contains(e.target) && !bouton.contains(e.target)) fermer(false);
    });
  }

  // ---------- Horaires des prières ----------
  var FUSEAU = "Europe/Paris";
  var PRIERES = [
    { cle: "fajr", nom: "Fajr" },
    { cle: "sunrise", nom: "Lever du soleil", secondaire: true },
    { cle: "dhuhr", nom: "Dhuhr" },
    { cle: "asr", nom: "Asr" },
    { cle: "maghrib", nom: "Maghrib" },
    { cle: "isha", nom: "Isha" }
  ];
  var OBLIGATOIRES = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
  var HEURE = /^([01]\d|2[0-3]):[0-5]\d$/;

  function partiesParis(date) {
    var f = new Intl.DateTimeFormat("en-GB", {
      timeZone: FUSEAU, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false
    });
    var p = {};
    f.formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
    var h = p.hour === "24" ? "00" : p.hour;
    return { iso: p.year + "-" + p.month + "-" + p.day, minutes: Number(h) * 60 + Number(p.minute), annee: p.year, mois: p.month };
  }
  function enMinutes(hhmm) { var t = hhmm.split(":"); return Number(t[0]) * 60 + Number(t[1]); }
  function jourValide(j) {
    return !!j && OBLIGATOIRES.every(function (k) { return typeof j[k] === "string" && HEURE.test(j[k]); });
  }
  function sourceValide(d) { return !!(d && typeof d.source === "string" && d.source.trim()); }
  function dateLongue(iso) {
    var t = iso.split("-");
    var d = new Date(Date.UTC(+t[0], +t[1] - 1, +t[2], 12));
    return new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
  }
  function duree(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h ? h + " h " + (m < 10 ? "0" : "") + m + " min" : m + " min";
  }
  function el(tag, cls, texte) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texte != null) e.textContent = texte;
    return e;
  }
  function ligneSource(d) {
    var p = el("p", "horaires__source");
    p.appendChild(document.createTextNode("Source : "));
    if (d.sourceUrl) {
      var a = el("a", null, d.source);
      a.href = d.sourceUrl; a.rel = "noopener";
      p.appendChild(a);
    } else {
      p.appendChild(document.createTextNode(d.source));
    }
    var extra = [];
    if (d.valideePar) extra.push("validé par " + d.valideePar);
    if (d.miseAJour) extra.push("mis à jour le " + d.miseAJour);
    extra.push("heure de Paris");
    p.appendChild(document.createTextNode(" · " + extra.join(" · ")));
    return p;
  }

  function rendreJour(bloc, d, auj) {
    var jour = d.jours && d.jours[auj.iso];
    if (!sourceValide(d) || !jourValide(jour)) return false;
    var contenu = bloc.querySelector("[data-horaires-contenu]");
    contenu.textContent = "";

    var date = el("p", "horaires__date");
    var t = el("time", null, dateLongue(auj.iso));
    t.setAttribute("datetime", auj.iso);
    date.appendChild(t);
    contenu.appendChild(date);

    var prochaine = el("p", "prochaine");
    contenu.appendChild(prochaine);

    var liste = el("ul", "prieres");
    var items = {};
    PRIERES.forEach(function (pr) {
      var h = jour[pr.cle];
      if (pr.secondaire && !(typeof h === "string" && HEURE.test(h))) return;
      var li = el("li", "priere" + (pr.secondaire ? " priere--secondaire" : ""));
      li.appendChild(el("span", "priere__nom", pr.nom));
      var heure = el("time", "priere__heure", h);
      heure.setAttribute("datetime", auj.iso + "T" + h);
      li.appendChild(heure);
      if (!pr.secondaire && d.iqamaConfirmee && jour.iqama && HEURE.test(jour.iqama[pr.cle] || "")) {
        li.appendChild(el("span", "priere__iqama", "Iqama " + jour.iqama[pr.cle]));
      }
      liste.appendChild(li);
      items[pr.cle] = li;
    });
    contenu.appendChild(liste);
    contenu.appendChild(ligneSource(d));

    // Compte à rebours : uniquement avec des données valides pour le jour courant.
    function maj() {
      var maintenant = partiesParis(new Date());
      if (maintenant.iso !== auj.iso) { location.reload(); return; }
      var suivante = null;
      OBLIGATOIRES.some(function (k) {
        if (enMinutes(jour[k]) > maintenant.minutes) { suivante = k; return true; }
        return false;
      });
      Object.keys(items).forEach(function (k) { items[k].classList.toggle("priere--prochaine", k === suivante); });
      if (suivante) {
        var nom = PRIERES.filter(function (p) { return p.cle === suivante; })[0].nom;
        prochaine.textContent = "Prochaine prière : " + nom + " à " + jour[suivante] + ", dans " + duree(enMinutes(jour[suivante]) - maintenant.minutes) + ".";
      } else {
        prochaine.textContent = "Les prières du jour sont passées.";
      }
    }
    maj();
    setInterval(maj, 30000);
    return true;
  }

  function rendreMois(bloc, d, auj) {
    if (!sourceValide(d) || !d.jours) return false;
    var prefixe = auj.annee + "-" + auj.mois + "-";
    var dates = Object.keys(d.jours).filter(function (k) { return k.indexOf(prefixe) === 0 && jourValide(d.jours[k]); }).sort();
    if (!dates.length) return false;
    var aLever = dates.some(function (k) { return HEURE.test(d.jours[k].sunrise || ""); });
    var contenu = bloc.querySelector("[data-horaires-contenu]");
    contenu.textContent = "";

    var cadre = el("div", "tableau-defilant");
    cadre.tabIndex = 0;
    cadre.setAttribute("role", "region");
    var table = el("table", "calendrier");
    var nomMois = new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", month: "long", year: "numeric" })
      .format(new Date(Date.UTC(+auj.annee, +auj.mois - 1, 15)));
    table.appendChild(el("caption", null, "Horaires de " + nomMois));
    cadre.setAttribute("aria-label", "Horaires de " + nomMois);
    var thead = el("thead"), tr = el("tr");
    tr.appendChild(el("th", null, "Date")).setAttribute("scope", "col");
    PRIERES.forEach(function (p) {
      if (p.secondaire && !aLever) return;
      tr.appendChild(el("th", null, p.secondaire ? "Lever" : p.nom)).setAttribute("scope", "col");
    });
    thead.appendChild(tr); table.appendChild(thead);
    var tbody = el("tbody");
    dates.forEach(function (k) {
      var j = d.jours[k], ligne = el("tr");
      if (k === auj.iso) ligne.setAttribute("aria-current", "date");
      var th = el("th", null, String(Number(k.slice(8, 10))));
      th.setAttribute("scope", "row");
      ligne.appendChild(th);
      PRIERES.forEach(function (p) {
        if (p.secondaire && !aLever) return;
        ligne.appendChild(el("td", null, j[p.cle] || "—"));
      });
      tbody.appendChild(ligne);
    });
    table.appendChild(tbody);
    cadre.appendChild(table);
    contenu.appendChild(cadre);
    contenu.appendChild(ligneSource(d));
    return true;
  }

  document.querySelectorAll("[data-horaires]").forEach(function (bloc) {
    var donnees;
    try {
      donnees = JSON.parse(bloc.querySelector(".horaires__donnees").textContent);
      donnees.jours = JSON.parse(bloc.querySelector(".horaires__jours").textContent);
    } catch (e) {
      return; // Le message de repli reste affiché.
    }
    if (donnees.fuseau && donnees.fuseau !== FUSEAU) return;
    var auj = partiesParis(new Date());
    var ok = bloc.getAttribute("data-horaires") === "mois" ? rendreMois(bloc, donnees, auj) : rendreJour(bloc, donnees, auj);
    if (ok) {
      bloc.querySelector("[data-horaires-repli]").hidden = true;
      bloc.querySelector("[data-horaires-contenu]").hidden = false;
    }
  });

  // ---------- Filtres des actualités ----------
  var filtres = document.querySelector("[data-filtres]");
  if (filtres) {
    filtres.hidden = false;
    var statut = filtres.querySelector("[data-filtres-statut]");
    var actus = document.querySelectorAll("[data-actus] .actu");
    filtres.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filtre]");
      if (!b) return;
      var valeur = b.getAttribute("data-filtre");
      filtres.querySelectorAll("[data-filtre]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      var n = 0;
      actus.forEach(function (a) {
        var visible = !valeur || a.getAttribute("data-categorie") === valeur;
        a.hidden = !visible;
        if (visible) n++;
      });
      statut.textContent = n + (n > 1 ? " actualités affichées" : " actualité affichée");
    });
  }
})();
