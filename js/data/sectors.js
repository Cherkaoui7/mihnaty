const Sectors = [
  {
    id: "it",
    name: "Informatique & Technologies",
    shortName: "Informatique",
    icon: "code-2",
    svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>',
    color: "#2563eb",
    bgColor: "#eff6ff",
    description: "Développement, Data, Cybersécurité, Cloud...",
    domains: [
      "Développement logiciel",
      "Développement Web",
      "Data & IA",
      "Cybersécurité",
      "Cloud & DevOps",
      "Support IT"
    ]
  },
  {
    id: "engineering-industry",
    name: "Ingénierie & Industrie",
    shortName: "Ingénierie & Industrie",
    icon: "factory",
    svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7 5V8l-7 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2v16z"></path></svg>',
    color: "#d97706",
    bgColor: "#fffbeb",
    description: "Production, Maintenance, Automobile, Aéronautique...",
    domains: [
      "Génie industriel",
      "Automobile",
      "Aéronautique",
      "Production",
      "Qualité",
      "Maintenance"
    ]
  },
  {
    id: "business",
    name: "Commerce & Business",
    shortName: "Commerce & Business",
    icon: "briefcase-business",
    svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path></svg>',
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    description: "Vente, Marketing, Relation client, Développement d'affaires...",
    domains: [
      "Commercial",
      "Sales",
      "Business Development",
      "Account Management",
      "Relation client",
      "Marketing commercial"
    ]
  },
  {
    id: "finance",
    name: "Finance & Comptabilité",
    shortName: "Finance & Comptabilité",
    icon: "calculator",
    svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2"></rect><line x1="8" x2="16" y1="6" y2="6" stroke-linecap="round" stroke-width="2"></line><line x1="16" x2="16.01" y1="14" y2="14" stroke-linecap="round" stroke-width="2"></line><line x1="16" x2="16.01" y1="10" y2="10" stroke-linecap="round" stroke-width="2"></line><line x1="16" x2="16.01" y1="18" y2="18" stroke-linecap="round" stroke-width="2"></line><line x1="12" x2="12.01" y1="14" y2="14" stroke-linecap="round" stroke-width="2"></line><line x1="12" x2="12.01" y1="10" y2="10" stroke-linecap="round" stroke-width="2"></line><line x1="12" x2="12.01" y1="18" y2="18" stroke-linecap="round" stroke-width="2"></line><line x1="8" x2="8.01" y1="14" y2="14" stroke-linecap="round" stroke-width="2"></line><line x1="8" x2="8.01" y1="10" y2="10" stroke-linecap="round" stroke-width="2"></line><line x1="8" x2="8.01" y1="18" y2="18" stroke-linecap="round" stroke-width="2"></line></svg>',
    color: "#059669",
    bgColor: "#ecfdf5",
    description: "Comptabilité, Audit, Contrôle de gestion, Banque...",
    domains: [
      "Comptabilité",
      "Finance",
      "Audit",
      "Contrôle de gestion",
      "Banque",
      "Analyse financière"
    ]
  },
  {
    id: "logistics",
    name: "Logistique & Supply Chain",
    shortName: "Logistique",
    icon: "truck",
    svg: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 17h4v-14H10v14zm0 0H6a2 2 0 01-2-2V7h6v10zm4 0h6a2 2 0 002-2v-5l-3-3h-5v10zm1-5h4"></path><circle cx="7.5" cy="17.5" r="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><circle cx="17.5" cy="17.5" r="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>',
    color: "#0891b2",
    bgColor: "#ecfeff",
    description: "Achats, Gestion des stocks, Transport, Planification...",
    domains: [
      "Logistique",
      "Supply Chain",
      "Achats",
      "Gestion des stocks",
      "Transport",
      "Planification"
    ]
  }
];

function normalizeSector(value) {
  if (!value) return null;
  const val = value.toLowerCase().trim();
  if (val.includes("it") || val.includes("info") || val.includes("tech") || val.includes("dévelop")) return "it";
  if (val.includes("ingé") || val.includes("engin") || val.includes("indus")) return "engineering-industry";
  if (val.includes("commerc") || val.includes("business") || val.includes("vente") || val.includes("market") || val.includes("sales")) return "business";
  if (val.includes("financ") || val.includes("compta") || val.includes("audit")) return "finance";
  if (val.includes("logisti") || val.includes("supply") || val.includes("achat")) return "logistics";
  
  const exactMatch = Sectors.find(s => s.id === val || s.name.toLowerCase() === val || s.shortName.toLowerCase() === val);
  if (exactMatch) return exactMatch.id;
  
  return null;
}

function getSectorById(id) {
  if (!id) return null;
  const normalized = normalizeSector(id);
  return Sectors.find(s => s.id === normalized || s.id === id) || null;
}
