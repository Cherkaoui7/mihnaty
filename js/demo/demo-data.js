/**
 * DemoData — Static data for the Mihnati demo mode.
 * 
 * This file contains ALL demo content. It is never loaded or used
 * in real mode. No AI API is called to generate this data.
 */
const DemoData = {
  cvFileName: "CV_Abdessamad_Cherkaoui.pdf",
  cvFileSize: "245 KB",

  // Simulated raw extracted text (abbreviated)
  cvExtractedText: `Abdessamad Cherkaoui
Full Stack Developer
Rabat, Maroc

Formation : Bac+3 Informatique — ISTA Rabat (2022)

Expérience professionnelle :
- Développeur Frontend — StartupXYZ, Rabat (2022-2024)
  React.js, Next.js, TypeScript, REST APIs
- Stage Développeur Web — AgenceWeb, Casablanca (2021)
  HTML/CSS, JavaScript, Node.js

Compétences techniques :
React.js, Next.js, JavaScript, TypeScript, Node.js,
Express.js, MongoDB, Docker, Git, REST APIs

Langues : Français (courant), Arabe (natif), Anglais (intermédiaire)

Objectif : Poste Full Stack Developer dans une entreprise innovante.`,

  profile: {
    fullName: "Abdessamad Cherkaoui",
    firstName: "Abdessamad",
    lastName: "Cherkaoui",
    city: "Rabat",
    country: "Maroc",
    educationLevel: "Bac+3",
    primaryDomain: "Informatique",
    secondaryDomains: ["Développement Web"],
    targetRole: "Full Stack Developer",
    experienceYears: 2,
    experienceLevel: "Junior",
  },

  skills: [
    { name: "React.js",     category: "Frontend",  level: 90, evidence: "Expérience professionnelle — StartupXYZ" },
    { name: "Next.js",      category: "Frontend",  level: 85, evidence: "Expérience professionnelle — StartupXYZ" },
    { name: "JavaScript",   category: "Frontend",  level: 90, evidence: "Utilisé dans tous les postes" },
    { name: "TypeScript",   category: "Frontend",  level: 80, evidence: "Expérience professionnelle — StartupXYZ" },
    { name: "Node.js",      category: "Backend",   level: 75, evidence: "Stage — AgenceWeb" },
    { name: "Express.js",   category: "Backend",   level: 75, evidence: "Stage — AgenceWeb" },
    { name: "MongoDB",      category: "Base de données", level: 75, evidence: "Projets personnels" },
    { name: "Docker",       category: "DevOps",    level: 65, evidence: "Utilisation basique" },
  ],

  skillsToDevelop: [
    { name: "Testing (Jest / Cypress)", priority: "high",   reason: "Compétence essentielle pour la qualité du code en entreprise." },
    { name: "CI/CD (GitHub Actions)",   priority: "medium", reason: "Automatisation du déploiement, très demandé en Full Stack." },
    { name: "State Management avancé",  priority: "medium", reason: "Redux / Zustand pour les applications complexes." },
  ],

  courses: [
    {
      title: "Testing React Applications with Jest & Cypress",
      provider: "Udemy",
      level: "Intermédiaire",
      skills: ["Jest", "Cypress", "Testing"],
      focus: "Testing",
      sourceType: "demo",
      relevanceScore: 92,
      url: "#",
      matchDetails: [
        { label: "Compétence ciblée", status: "Testing — Priorité haute", points: 30 },
        { label: "Domaine", status: "Couvert — Frontend", points: 20 },
        { label: "Niveau", status: "Compatible — Intermédiaire", points: 15 },
      ],
    },
    {
      title: "CI/CD avec GitHub Actions — Du code au déploiement",
      provider: "Coursera",
      level: "Débutant",
      skills: ["GitHub Actions", "CI/CD", "Docker"],
      focus: "CI/CD",
      sourceType: "demo",
      relevanceScore: 85,
      url: "#",
      matchDetails: [
        { label: "Compétence ciblée", status: "CI/CD — Priorité moyenne", points: 25 },
        { label: "Prérequis Docker", status: "Couvert — 65%", points: 15 },
        { label: "Niveau", status: "Compatible — Débutant", points: 10 },
      ],
    },
    {
      title: "Advanced State Management in React (Redux, Zustand)",
      provider: "Frontend Masters",
      level: "Avancé",
      skills: ["Redux", "Zustand", "React"],
      focus: "State Management",
      sourceType: "demo",
      relevanceScore: 78,
      url: "#",
      matchDetails: [
        { label: "Compétence ciblée", status: "State Management — Priorité moyenne", points: 20 },
        { label: "Prérequis React", status: "Couvert — 90%", points: 20 },
        { label: "Niveau", status: "Avancé — Stretch", points: 8 },
      ],
    },
    {
      title: "Node.js Masterclass — API REST & Microservices",
      provider: "OpenClassrooms",
      level: "Intermédiaire",
      skills: ["Node.js", "Express", "API REST"],
      focus: "Backend",
      sourceType: "demo",
      relevanceScore: 72,
      url: "#",
      matchDetails: [
        { label: "Compétence existante", status: "Node.js — 75%", points: 15 },
        { label: "Progression", status: "Oui — Vers maîtrise", points: 15 },
        { label: "Pertinence Full Stack", status: "Compatible", points: 12 },
      ],
    },
  ],

  jobs: [
    {
      title: "Frontend Developer",
      company: "TechMaroc",
      location: "Rabat",
      type: "CDI",
      matchScore: 82,
      sourceType: "demo",
      requiredSkills: ["React.js", "JavaScript", "TypeScript"],
      preferredSkills: ["Next.js", "Testing"],
      url: "#",
      matchDetails: [
        { label: "React.js", status: "Couvert — 90%", points: 25 },
        { label: "JavaScript", status: "Couvert — 90%", points: 20 },
        { label: "TypeScript", status: "Couvert — 80%", points: 17 },
        { label: "Next.js", status: "Couvert — 85%", points: 15 },
        { label: "Testing", status: "Non couvert", points: 0 },
      ],
    },
    {
      title: "Full Stack Developer",
      company: "InnovateSoft",
      location: "Casablanca (Hybride)",
      type: "CDI",
      matchScore: 78,
      sourceType: "demo",
      requiredSkills: ["React.js", "Node.js", "MongoDB"],
      preferredSkills: ["Docker", "CI/CD", "TypeScript"],
      url: "#",
      matchDetails: [
        { label: "React.js", status: "Couvert — 90%", points: 25 },
        { label: "Node.js", status: "Couvert — 75%", points: 18 },
        { label: "MongoDB", status: "Couvert — 75%", points: 15 },
        { label: "Docker", status: "Couvert — 65%", points: 10 },
        { label: "CI/CD", status: "Non couvert", points: 0 },
      ],
    },
    {
      title: "DevOps Junior",
      company: "CloudFirst",
      location: "Remote — Maroc",
      type: "CDD",
      matchScore: 61,
      sourceType: "demo",
      requiredSkills: ["Docker", "CI/CD", "Linux"],
      preferredSkills: ["Kubernetes", "AWS", "Terraform"],
      url: "#",
      matchDetails: [
        { label: "Docker", status: "Couvert — 65%", points: 15 },
        { label: "CI/CD", status: "Non couvert", points: 0 },
        { label: "Linux", status: "Non couvert", points: 0 },
        { label: "Kubernetes", status: "Non couvert", points: 0 },
      ],
    },
  ],

  summary: "Profil technique solide orienté Frontend avec une bonne maîtrise de React et JavaScript. " +
    "L'ajout de compétences en Testing et CI/CD est la prochaine étape logique pour évoluer vers un poste Full Stack complet.",
};
