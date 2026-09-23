const MockData = {
  // We will generate the analysis dynamically based on the chosen sector,
  // or default to IT if none is set.
  getAnalysis(domain = "Informatique") {
    if (domain.includes("Marketing")) {
      return {
        profile: {
          domain: "Marketing",
          secondaryDomains: ["Communication"],
          experienceLevel: "Junior",
          targetRole: "Digital Marketing Specialist",
        },
        skills: [
          {
            name: "SEO",
            category: "Marketing",
            level: 85,
            evidence: "Projets",
          },
          {
            name: "Social Media",
            category: "Marketing",
            level: 80,
            evidence: "Stage",
          },
          {
            name: "Content Creation",
            category: "Marketing",
            level: 75,
            evidence: "Blog personnel",
          },
        ],
        skillsToDevelop: [
          {
            name: "Google Ads",
            priority: "high",
            reason: "Demande forte sur le marché",
          },
          {
            name: "Analytics",
            priority: "medium",
            reason: "Pour mesurer le ROI",
          },
        ],
        compatibleRoles: [
          {
            title: "Digital Marketing Specialist",
            domain: "Marketing",
            matchScore: 80,
            matchingSkills: ["SEO", "Content Creation"],
            missingSkills: ["Google Ads"],
          },
        ],
        recommendations: {
          courses: [
            { title: "Google Ads Fundamentals", url: "#", focus: "Google Ads" },
          ],
          nextSteps: ["Passer la certification Google Ads"],
        },
        summary:
          "Profil marketing prometteur. L'acquisition de compétences SEA vous rendra plus polyvalent.",
      };
    } else if (domain.includes("Finance") || domain.includes("Comptabilité")) {
      return {
        profile: {
          domain: "Comptabilité / Finance",
          secondaryDomains: ["Gestion"],
          experienceLevel: "Junior",
          targetRole: "Junior Accountant",
        },
        skills: [
          {
            name: "Comptabilité générale",
            category: "Finance",
            level: 85,
            evidence: "Formation",
          },
          {
            name: "Excel",
            category: "Outils",
            level: 80,
            evidence: "Utilisation courante",
          },
        ],
        skillsToDevelop: [
          {
            name: "Financial Analysis",
            priority: "high",
            reason: "Pour évoluer vers le contrôle de gestion",
          },
          {
            name: "ERP (SAP)",
            priority: "medium",
            reason: "Standard dans les grandes entreprises",
          },
        ],
        compatibleRoles: [
          {
            title: "Junior Accountant",
            domain: "Comptabilité / Finance",
            matchScore: 85,
            matchingSkills: ["Comptabilité générale", "Excel"],
            missingSkills: ["ERP (SAP)"],
          },
        ],
        recommendations: {
          courses: [
            {
              title: "Advanced Excel for Finance",
              url: "#",
              focus: "Financial Analysis",
            },
          ],
          nextSteps: [
            "Maîtriser les macros Excel",
            "Se familiariser avec un ERP",
          ],
        },
        summary:
          "Solides bases comptables. Évoluer vers l'analyse financière ouvrira plus d'opportunités.",
      };
    }

    // Default IT
    return {
      profile: {
        domain: "Informatique",
        secondaryDomains: [],
        experienceLevel: "Junior",
        targetRole: "Frontend Developer",
      },
      skills: [
        {
          name: "JavaScript",
          category: "Frontend",
          level: 90,
          evidence: "Projets",
        },
        { name: "React", category: "Frontend", level: 85, evidence: "Projets" },
        {
          name: "HTML/CSS",
          category: "Frontend",
          level: 85,
          evidence: "Projets",
        },
        { name: "Git", category: "Outils", level: 80, evidence: "Projets" },
      ],
      skillsToDevelop: [
        {
          name: "TypeScript",
          priority: "high",
          reason: "Standard de l'industrie",
        },
        {
          name: "Testing (Jest/Cypress)",
          priority: "medium",
          reason: "Assurance qualité",
        },
      ],
      compatibleRoles: [
        {
          title: "Frontend Developer",
          domain: "Informatique",
          matchScore: 82,
          matchingSkills: ["JavaScript", "React", "HTML/CSS", "Git"],
          missingSkills: ["TypeScript", "Testing"],
        },
      ],
      recommendations: {
        courses: [
          { title: "TypeScript pour débutants", url: "#", focus: "TypeScript" },
        ],
        nextSteps: ["Migrer un projet vers TS"],
      },
      summary:
        "Bon profil technique frontend. L'ajout de TypeScript est la prochaine étape logique.",
    };
  },
};
