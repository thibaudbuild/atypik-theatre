// Affiche le contenu de contenu.js dans la page. Ne pas modifier pour changer un texte :
// tout se passe dans contenu.js.
(function () {
  const A = window.ATYPIK;
  const $ = (id) => document.getElementById(id);

  const mailto = (objet, corps) =>
    "mailto:" + A.email +
    "?subject=" + encodeURIComponent(objet) +
    "&body=" + encodeURIComponent(corps || "Bonjour,\n\n");

  const corpsInscription = (quoi) =>
    "Bonjour,\n\nJe souhaite m'inscrire : " + quoi +
    ".\n\nNom et prénom :\nTéléphone :\nMon parcours en quelques lignes :\n\nMerci !";

  const corpsCandidature = (quoi) =>
    "Bonjour,\n\nJe souhaite postuler : " + quoi +
    ".\n\nNom et prénom :\nTéléphone :\nLien vers ma vidéo de présentation (2 à 3 minutes, via SwissTransfer, WeTransfer ou un lien privé) :\n\nMerci !";

  // --- Cours ---
  $("cours-liste").innerHTML = A.cours.map((c) => {
    const complet = c.statut === "complet";
    const video = !complet && c.admission === "video";
    const quoi = "cours du " + c.jour.toLowerCase() + " (" + c.nom + ")";
    const objet = complet ? "Liste d'attente : " + quoi : video ? "Candidature : " + quoi : "Inscription : " + quoi;
    const corps = video ? corpsCandidature(quoi) : corpsInscription(quoi);
    return `
      <article class="carte ${complet ? "est-complet" : "est-ouvert"}">
        <span class="etiquette">${complet ? "Complet" : c.note || "Inscriptions ouvertes"}</span>
        <p class="carte-jour">${c.jour}</p>
        <h3>${c.nom}</h3>
        <p class="carte-texte">${c.description}</p>
        <a class="btn ${complet ? "btn-contour" : "btn-plein"}" ${video ? "data-candidature" : ""}
           href="${mailto(objet, corps)}">
          ${complet ? "Rejoindre la liste d'attente" : video ? "Postuler" : "S'inscrire"}
        </a>
      </article>`;
  }).join("");

  // --- Tarifs ---
  $("tarifs-liste").innerHTML = A.tarifs.map((t) => `
    <div class="tarif"><p class="tarif-prix">${t.prix}<small> CHF</small></p><p>${t.formule}</p></div>`).join("");

  // --- Agenda (les événements passés disparaissent) ---
  const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const jour = (iso) => new Date(iso + "T12:00:00");
  const aujourdhui = new Date(); aujourdhui.setHours(0, 0, 0, 0);

  const aVenir = A.agenda
    .filter((e) => jour(e.fin || e.debut) >= aujourdhui)
    .sort((a, b) => a.debut.localeCompare(b.debut));

  const dates = (e) => {
    const d = jour(e.debut), f = jour(e.fin || e.debut);
    const jours = d.getTime() === f.getTime() ? String(d.getDate()) : d.getDate() + " – " + f.getDate();
    return { jours, mois: mois[f.getMonth()] + " " + f.getFullYear() };
  };

  $("agenda-liste").innerHTML = aVenir.length
    ? aVenir.map((e) => {
        const d = dates(e);
        return `
        <article class="evenement">
          <div class="evenement-date"><span>${d.jours}</span>${d.mois}</div>
          <div class="evenement-corps">
            <p class="evenement-type">${e.type}${e.placesLimitees ? " · Places limitées" : ""}</p>
            <h3>${e.titre}</h3>
            ${e.sousTitre ? `<p class="evenement-sous">${e.sousTitre}</p>` : ""}
            <p>${e.description}</p>
            <ul>
              <li>${e.lieu}</li>
              <li>${e.horaire}</li>
              <li>${e.prix}</li>
            </ul>
          </div>
          <a class="btn btn-plein" href="${mailto("Inscription : " + e.titre, corpsInscription(e.titre + " (" + d.jours + " " + d.mois + ")"))}">S'inscrire</a>
        </article>`;
      }).join("")
    : `<p class="agenda-vide">Les prochaines dates seront annoncées sur <a href="${A.instagram}" target="_blank" rel="noopener">Instagram</a>.</p>`;

  // --- Candidature vidéo : petite fenêtre avec la trame, puis mail ---
  const boite = $("candidature");
  document.querySelectorAll("[data-candidature]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      $("candidature-mail").href = a.href;
      $("candidature-adresse").textContent = A.email;
      boite.showModal();
    });
  });
  boite.addEventListener("click", (e) => { if (e.target === boite) boite.close(); });

  // --- Liens mail et divers ---
  document.querySelectorAll("[data-mail]").forEach((a) => { a.href = mailto(a.dataset.mail); });

  // --- Secours si le mailto ne réagit pas (ordinateur sans logiciel de mail) ---
  // Si la page garde le focus 1,5 s après le clic, aucune messagerie ne s'est ouverte : on propose Gmail ou la copie.
  const secours = $("secours");
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="mailto:"]');
    if (!a || a.hasAttribute("data-candidature")) return;
    const url = new URL(a.href);
    const objet = url.searchParams.get("subject") || "";
    const corps = url.searchParams.get("body") || "";
    const minuterie = setTimeout(() => {
      $("secours-gmail").href = "https://mail.google.com/mail/?view=cm&to=" + encodeURIComponent(A.email) +
        "&su=" + encodeURIComponent(objet) + "&body=" + encodeURIComponent(corps);
      $("secours-adresse").textContent = A.email;
      $("secours-texte").textContent = "Objet : " + objet + "\n\n" + corps;
      secours.showModal();
    }, 1500);
    const annule = () => clearTimeout(minuterie);
    window.addEventListener("blur", annule, { once: true });
    document.addEventListener("visibilitychange", annule, { once: true });
  });
  secours.addEventListener("click", (e) => { if (e.target === secours) secours.close(); });
  $("secours-copier").addEventListener("click", () => {
    navigator.clipboard.writeText(A.email).then(() => { $("secours-copier").textContent = "Copiée"; });
  });
  $("pied-insta").href = A.instagram;
  $("annee").textContent = new Date().getFullYear();

  // --- Menu qui se colore au défilement ---
  const nav = $("nav");
  const surDefilement = () => nav.classList.toggle("nav-pleine", window.scrollY > 40);
  window.addEventListener("scroll", surDefilement, { passive: true });
  surDefilement();
})();
