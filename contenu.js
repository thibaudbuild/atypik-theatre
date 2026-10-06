// ============================================================
// CONTENU DU SITE ATYPIK THÉÂTRE
// C'est le seul fichier à modifier pour mettre à jour les cours,
// les tarifs et l'agenda. Le design est ailleurs (style.css).
// ============================================================

window.ATYPIK = {
  email: "atypiktheatre@gmail.com",
  instagram: "https://www.instagram.com/atypik.theatre/",

  // --- COURS HEBDOMADAIRES ---
  // statut : "complet" ou "ouvert"
  // note   : petit texte affiché sur l'étiquette quand le cours est ouvert
  cours: [
    {
      jour: "Lundi",
      nom: "Technique",
      description:
        "Le corps, l'écoute, l'impro. On s'entraîne, on ose, on se trompe, on recommence.",
      statut: "complet",
    },
    {
      jour: "Mardi",
      nom: "Caméra",
      description:
        "Apprivoiser la caméra. Castings, self-tapes, scènes tournées : tu repars avec des images pour ta bande démo.",
      statut: "ouvert",
      note: "Ouverture le 3 novembre",
    },
    {
      jour: "Jeudi",
      nom: "Création",
      description:
        "Construire un personnage, défendre un texte, écrire le sien, créer ensemble.",
      statut: "complet",
    },
  ],

  // --- TARIFS MENSUELS (en CHF) ---
  tarifs: [
    { formule: "1 cours par semaine", prix: 170 },
    { formule: "2 cours par semaine", prix: 300 },
    { formule: "3 cours par semaine", prix: 350 },
  ],

  // --- AGENDA ---
  // debut / fin au format AAAA-MM-JJ (fin = debut si un seul jour).
  // Un événement disparaît tout seul du site le lendemain de sa date de fin.
  agenda: [
    {
      debut: "2026-10-23",
      fin: "2026-10-23",
      type: "Rencontre",
      titre: "Soirée avec Mohamed Belhamar",
      sousTitre: "Directeur de casting",
      description:
        "Une soirée pour poser toutes les questions qu'on n'ose jamais poser en casting : ce qu'il regarde, ce qu'il attend, ce qui fait la différence.",
      lieu: "TAMCO, Genève",
      horaire: "En soirée",
      prix: "Gratuit, sur inscription",
      placesLimitees: true,
    },
    {
      debut: "2026-11-13",
      fin: "2026-11-15",
      type: "Stage",
      titre: "Caméra & casting avec Mohamed Belhamar",
      sousTitre: "Directeur de casting",
      description:
        "Trois jours face à la caméra avec un directeur de casting : des scènes de cinéma, une mise en situation, et un retour sincère sur ton travail.",
      lieu: "Genève, secteur Plainpalais",
      horaire: "10h à 17h",
      prix: "300 CHF (250 CHF pour les élèves Atypik)",
      placesLimitees: true,
    },
  ],
};
