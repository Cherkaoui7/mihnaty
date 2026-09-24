/**
 * DemoDataMulti - Static data for all 5 sectors
 */
const DemoDataMulti = {
  "it": {
    cvFileName: "CV_Abdessamad_Cherkaoui.pdf",
    cvFileSize: "245 KB",
    cvExtractedText: "Abdessamad Cherkaoui\nFull Stack Developer\nRabat, Maroc\n\nFormation : Bac+3 Informatique...",
    profile: {
      fullName: "Abdessamad Cherkaoui",
      firstName: "Abdessamad",
      lastName: "Cherkaoui",
      city: "Rabat",
      country: "Maroc",
      educationLevel: "Bac+3",
      primaryDomain: "it",
      secondaryDomains: ["Développement Web"],
      targetRole: "Full Stack Developer",
      experienceYears: 2,
      experienceLevel: "Junior",
    },
    skills: [
      { name: "React.js", category: "Frontend", level: 90, evidence: "StartupXYZ" },
      { name: "Node.js", category: "Backend", level: 75, evidence: "AgenceWeb" },
      { name: "MongoDB", category: "Base de données", level: 75, evidence: "Projets" },
      { name: "Docker", category: "DevOps", level: 65, evidence: "Basique" },
      { name: "TypeScript", category: "Frontend", level: 80, evidence: "StartupXYZ" }
    ],
    skillsToDevelop: [
      { name: "Kubernetes", priority: "high", reason: "Standard de l'industrie pour le déploiement" },
      { name: "System Design", priority: "medium", reason: "Important pour évoluer vers Senior" },
      { name: "Cloud (AWS)", priority: "high", reason: "Très demandé pour le Full Stack" }
    ],
    courses: [
      {
        title: "Docker et Kubernetes : Le Guide Complet",
        provider: "Udemy", level: "Intermédiaire", skills: ["Docker", "Kubernetes"],
        focus: "DevOps", sourceType: "demo", relevanceScore: 92, url: "#",
        matchDetails: [{ label: "Kubernetes", status: "Priorité haute", points: 30 }]
      },
      {
        title: "AWS Certified Developer",
        provider: "Coursera", level: "Intermédiaire", skills: ["AWS", "Cloud"],
        focus: "Cloud", sourceType: "demo", relevanceScore: 85, url: "#",
        matchDetails: [{ label: "Cloud (AWS)", status: "Priorité haute", points: 25 }]
      }
    ],
    jobs: [
      {
        title: "DevOps / Cloud Engineer",
        company: "TechMaroc", location: "Rabat", type: "CDI", matchScore: 82,
        sourceType: "demo", url: "#",
        requiredSkills: ["Docker", "Kubernetes", "AWS"], preferredSkills: ["Linux", "Terraform"],
        matchDetails: [{ label: "Docker", status: "Couvert — 65%", points: 25 }]
      }
    ],
    summary: "Profil IT orienté Full Stack."
  },
  
  "engineering-industry": {
    cvFileName: "CV_Youssef_Ingenieur.pdf",
    cvFileSize: "300 KB",
    cvExtractedText: "Youssef Alaoui\nIngénieur Qualité\nTanger, Maroc",
    profile: {
      fullName: "Youssef Alaoui",
      firstName: "Youssef",
      lastName: "Alaoui",
      city: "Tanger",
      country: "Maroc",
      educationLevel: "Bac+5",
      primaryDomain: "engineering-industry",
      secondaryDomains: ["Production", "Qualité"],
      targetRole: "Responsable Qualité",
      experienceYears: 4,
      experienceLevel: "Confirmé",
    },
    skills: [
      { name: "Lean Manufacturing", category: "Méthodes", level: 85, evidence: "Usine Renault" },
      { name: "Six Sigma", category: "Méthodes", level: 75, evidence: "Projet d'amélioration" },
      { name: "ISO 9001", category: "Normes", level: 90, evidence: "Audit 2023" },
      { name: "AutoCAD", category: "Outils", level: 60, evidence: "École d'ingénieurs" }
    ],
    skillsToDevelop: [
      { name: "Gestion de projet Agile", priority: "high", reason: "Transition vers l'industrie 4.0" },
      { name: "Power BI", priority: "medium", reason: "Pour le suivi des KPIs qualité" }
    ],
    courses: [
      {
        title: "Lean Six Sigma Black Belt",
        provider: "Coursera", level: "Avancé", skills: ["Six Sigma", "Qualité"],
        focus: "Méthodes", sourceType: "demo", relevanceScore: 88, url: "#",
        matchDetails: [{ label: "Six Sigma", status: "Renforcement", points: 30 }]
      },
      {
        title: "Power BI pour l'Industrie",
        provider: "Udemy", level: "Débutant", skills: ["Power BI"],
        focus: "Data", sourceType: "demo", relevanceScore: 82, url: "#",
        matchDetails: [{ label: "Power BI", status: "Priorité moyenne", points: 25 }]
      }
    ],
    jobs: [
      {
        title: "Ingénieur Qualité Production",
        company: "AutoParts Tanger", location: "Tanger Free Zone", type: "CDI", matchScore: 90,
        sourceType: "demo", url: "#",
        requiredSkills: ["ISO 9001", "Lean Manufacturing"], preferredSkills: ["Six Sigma", "Power BI"],
        matchDetails: [{ label: "ISO 9001", status: "Couvert — 90%", points: 30 }]
      }
    ],
    summary: "Profil solide en qualité industrielle."
  },

  "business": {
    cvFileName: "CV_Sara_Marketing.pdf",
    cvFileSize: "210 KB",
    cvExtractedText: "Sara B.\nBusiness Developer\nCasablanca, Maroc",
    profile: {
      fullName: "Sara Berrada",
      firstName: "Sara",
      lastName: "Berrada",
      city: "Casablanca",
      country: "Maroc",
      educationLevel: "Bac+5",
      primaryDomain: "business",
      secondaryDomains: ["Sales", "Business Development"],
      targetRole: "Business Manager",
      experienceYears: 3,
      experienceLevel: "Intermédiaire",
    },
    skills: [
      { name: "B2B Sales", category: "Vente", level: 85, evidence: "Entreprise X" },
      { name: "CRM Salesforce", category: "Outils", level: 80, evidence: "Utilisation quotidienne" },
      { name: "Négociation", category: "Soft Skills", level: 90, evidence: "Clôture de contrats" },
      { name: "Marketing Digital", category: "Marketing", level: 65, evidence: "Campagnes emailing" }
    ],
    skillsToDevelop: [
      { name: "Growth Hacking", priority: "high", reason: "Très demandé en startup" },
      { name: "Data Analytics (Excel Avancé)", priority: "medium", reason: "Analyse de performance" }
    ],
    courses: [
      {
        title: "Growth Hacking: De 0 à 100k",
        provider: "Udemy", level: "Intermédiaire", skills: ["Growth Hacking", "Marketing"],
        focus: "Business", sourceType: "demo", relevanceScore: 95, url: "#",
        matchDetails: [{ label: "Growth Hacking", status: "Priorité haute", points: 30 }]
      }
    ],
    jobs: [
      {
        title: "Key Account Manager",
        company: "TechAgency", location: "Casablanca", type: "CDI", matchScore: 85,
        sourceType: "demo", url: "#",
        requiredSkills: ["B2B Sales", "Négociation", "CRM"], preferredSkills: ["Anglais", "Growth Hacking"],
        matchDetails: [{ label: "B2B Sales", status: "Couvert — 85%", points: 25 }]
      }
    ],
    summary: "Profil commercial performant."
  },

  "finance": {
    cvFileName: "CV_Amine_Finance.pdf",
    cvFileSize: "280 KB",
    cvExtractedText: "Amine El Fassi\nAnalyste Financier\nRabat, Maroc",
    profile: {
      fullName: "Amine El Fassi",
      firstName: "Amine",
      lastName: "El Fassi",
      city: "Rabat",
      country: "Maroc",
      educationLevel: "Bac+5",
      primaryDomain: "finance",
      secondaryDomains: ["Contrôle de gestion", "Analyse financière"],
      targetRole: "Contrôleur de Gestion",
      experienceYears: 5,
      experienceLevel: "Confirmé",
    },
    skills: [
      { name: "Excel Avancé", category: "Outils", level: 95, evidence: "Modélisation financière" },
      { name: "Analyse Financière", category: "Finance", level: 90, evidence: "Poste actuel" },
      { name: "Comptabilité Analytique", category: "Comptabilité", level: 85, evidence: "Mise en place de tableaux de bord" },
      { name: "SAP FI/CO", category: "ERP", level: 70, evidence: "Projet d'intégration" }
    ],
    skillsToDevelop: [
      { name: "IFRS", priority: "high", reason: "Standard international requis par les multinationales" },
      { name: "Power BI", priority: "high", reason: "Visualisation de données financières" },
      { name: "VBA", priority: "medium", reason: "Automatisation de reportings complexes" }
    ],
    courses: [
      {
        title: "Normes IFRS - Maîtrise Complète",
        provider: "Coursera", level: "Avancé", skills: ["IFRS", "Comptabilité"],
        focus: "Normes", sourceType: "demo", relevanceScore: 92, url: "#",
        matchDetails: [{ label: "IFRS", status: "Priorité haute", points: 30 }]
      }
    ],
    jobs: [
      {
        title: "Contrôleur de Gestion Industriel",
        company: "GlobalCorp", location: "Kénitra", type: "CDI", matchScore: 88,
        sourceType: "demo", url: "#",
        requiredSkills: ["Analyse Financière", "Excel Avancé", "SAP FI/CO"], preferredSkills: ["IFRS", "Power BI"],
        matchDetails: [{ label: "SAP FI/CO", status: "Couvert — 70%", points: 20 }]
      }
    ],
    summary: "Expertise pointue en analyse financière."
  },

  "logistics": {
    cvFileName: "CV_Fatima_Logistique.pdf",
    cvFileSize: "230 KB",
    cvExtractedText: "Fatima Zahra\nResponsable Supply Chain\nCasablanca, Maroc",
    profile: {
      fullName: "Fatima Zahra",
      firstName: "Fatima",
      lastName: "Zahra",
      city: "Casablanca",
      country: "Maroc",
      educationLevel: "Bac+4",
      primaryDomain: "logistics",
      secondaryDomains: ["Supply Chain", "Transport"],
      targetRole: "Supply Chain Manager",
      experienceYears: 6,
      experienceLevel: "Senior",
    },
    skills: [
      { name: "Gestion des stocks", category: "Logistique", level: 90, evidence: "Réduction des coûts de 15%" },
      { name: "Optimisation de transport", category: "Logistique", level: 85, evidence: "Flotte de 50 camions" },
      { name: "Négociation fournisseurs", category: "Achats", level: 80, evidence: "Contrats internationaux" },
      { name: "ERP (Odoo)", category: "Outils", level: 75, evidence: "Déploiement en 2022" }
    ],
    skillsToDevelop: [
      { name: "Lean Logistics", priority: "high", reason: "Amélioration continue des processus" },
      { name: "Data Analysis (Excel / BI)", priority: "medium", reason: "Prévision des ventes et gestion des flux" }
    ],
    courses: [
      {
        title: "Supply Chain Management Avancé",
        provider: "edX", level: "Avancé", skills: ["Lean Logistics", "Supply Chain"],
        focus: "Management", sourceType: "demo", relevanceScore: 89, url: "#",
        matchDetails: [{ label: "Lean Logistics", status: "Priorité haute", points: 25 }]
      }
    ],
    jobs: [
      {
        title: "Supply Chain Manager",
        company: "LogisFlex", location: "Casablanca", type: "CDI", matchScore: 92,
        sourceType: "demo", url: "#",
        requiredSkills: ["Gestion des stocks", "Optimisation de transport", "ERP"], preferredSkills: ["Lean Logistics", "Anglais courant"],
        matchDetails: [{ label: "Gestion des stocks", status: "Couvert — 90%", points: 25 }]
      }
    ],
    summary: "Profil très expérimenté en gestion de chaîne d'approvisionnement."
  }
};

// Expose DemoData for backwards compatibility but default to IT
const DemoData = DemoDataMulti["it"];
