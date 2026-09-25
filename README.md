# Mihnati ✦ AI-Powered Career Orientation Platform

![Version](https://img.shields.io/badge/version-1.2.0--secure-blue.svg)
![Status](https://img.shields.io/badge/status-MVP_Frontend-success.svg)
![Architecture](https://img.shields.io/badge/architecture-Client--Side_SPA-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Mihnati** est une plateforme innovante d'orientation professionnelle et de gestion de carrière, propulsée par l'Intelligence Artificielle. Conçu initialement comme un **Minimum Viable Product (MVP) 100% frontend**, Mihnati démontre une architecture "Serverless" exécutée localement dans le navigateur, offrant une interface utilisateur fluide, un parsing de CV sécurisé, et un moteur de matching piloté par les modèles génératifs (LLMs) les plus performants du marché.

---

## 📑 Table des Matières

1. [Aperçu du Projet](#-aperçu-du-projet)
2. [Fonctionnalités Principales](#-fonctionnalités-principales)
3. [Architecture Technique](#-architecture-technique)
4. [Sécurité et Hardening](#-sécurité-et-hardening)
5. [Guide de Démarrage Rapide](#-guide-de-démarrage-rapide)
6. [Configuration de l'IA (BYOK)](#-configuration-de-lia-byok)
7. [Structure du Dépôt](#-structure-du-dépôt)
8. [Feuille de Route (Roadmap)](#-feuille-de-route-roadmap)

---

## 🚀 Aperçu du Projet

Mihnati repense l'orientation professionnelle en agissant comme un conseiller de carrière virtuel. En extrayant dynamiquement les compétences réelles depuis un CV, la plateforme les analyse et les compare aux besoins actuels du marché du travail. 

**Valeur Ajoutée :**
- Analyse sémantique fine des Hard Skills, Soft Skills et Langues.
- Recommandations intelligentes de formations ciblées pour combler les lacunes (Skill Gaps).
- Recherche et suggestion d'opportunités d'emploi pertinentes, avec des liens de candidature vérifiés.

---

## ✨ Fonctionnalités Principales

- **Analyse Intelligente de CV (Local)** : Traitement local sécurisé des fichiers PDF et DOCX pour extraire et structurer les données professionnelles avant leur envoi au modèle IA.
- **Moteur de Matching de Compétences** : Évaluation algorithmique de la compatibilité entre un candidat et les opportunités professionnelles, basée sur l'extraction d'offres via Web Grounding.
- **Génération de Feuille de Route Interactive** : Création d'un plan d'action personnalisé étape par étape pour guider l'utilisateur vers son objectif de carrière.
- **Architecture BYOK (Bring Your Own Key)** : Intégration agnostique permettant de basculer facilement entre différents fournisseurs de modèles de langage (Google Gemini, OpenAI, Anthropic, Mistral, Groq, Cohere, etc.).
- **Mode Démo & Fallback** : Fonctionnement autonome et mode démo préchargé pour évaluer l'expérience utilisateur (UX) même sans clé API.

---

## 🏗 Architecture Technique

L'application est architecturée comme une **Single Page Application (SPA)** modulaire, construite sans frameworks lourds pour garantir des performances optimales et une sécurité maximale :

- **Frontend Core** : HTML5, CSS3 (Variables natives, Flexbox/Grid, Dark Mode ready), Vanilla JavaScript (ES6+).
- **Gestion de l'État (State Management)** : Store réactif local gérant les profils, les préférences et la configuration IA.
- **Routage** : Routeur côté client léger basé sur l'API History/Hash.
- **Traitement de Documents** :
  - `pdf.js` pour l'extraction vectorielle et textuelle des fichiers PDF.
  - `mammoth.js` pour le parsing structuré des documents Word (.docx).
- **Stockage de Données** : 
  - `LocalStorage` pour la persistance du profil et de la progression.
  - `SessionStorage` pour l'isolation sécurisée des clés API.

---

## 🔒 Sécurité et Hardening

Dans le cadre d'un fonctionnement 100% frontend (navigateur), Mihnati intègre des défenses robustes de niveau entreprise :

- **Data Privacy & Parsing Local** : Les CV sont parsés entièrement côté client. Le texte envoyé aux LLM est tronqué (50 000 caractères, 5 pages max) pour prévenir les abus (DoS).
- **Prévention XSS & Injection** :
  - Assainissement cryptographique via des fonctions `escapeHTML` personnalisées avant tout rendu dynamique dans le DOM (`innerHTML`).
  - Encapsulation stricte des données non fiables (`--- BEGIN UNTRUSTED CV CONTENT ---`) dans le prompt pour mitiger les attaques par *Prompt Injection*.
- **Sécurité des APIs (BYOK)** :
  - Les clés API (secrets) ne sont stockées que dans le `sessionStorage` (effacées à la fermeture de l'onglet).
  - Validations strictes des endpoints pour empêcher l'envoi de clés à des proxys ou serveurs non fiables.
- **Validation des Sorties de l'IA** :
  - Normalisation forcée des URLs (préfixe HTTPS obligatoire) pour éviter les attaques XSS via liens malformés.
  - Fallbacks sécurisés si l'IA hallucine ou déroge au format JSON strict.

---

## 🏁 Guide de Démarrage Rapide

L'application ne nécessite aucune installation de backend ni de base de données.

### Prérequis
- Un navigateur web moderne (Chrome, Edge, Firefox, Safari).
- Node.js (facultatif, uniquement pour servir l'application localement).

### Installation et Exécution

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/Cherkaoui7/mihnaty.git
   cd mihnaty
   ```

2. Servez l'application :
   ```bash
   # Option recommandée pour éviter les restrictions CORS liées au protocole file://
   npx serve .
   ```

3. Ouvrez votre navigateur sur `http://localhost:3000`.

---

## ⚙️ Configuration de l'IA (BYOK)

Pour libérer tout le potentiel de Mihnati, vous devez connecter un modèle d'IA :

1. Cliquez sur l'icône **Paramètres** ⚙️ dans l'application.
2. Sélectionnez votre **Fournisseur IA** (ex. : Google Gemini, OpenAI).
3. Renseignez votre **Clé API** (elle est conservée en sécurité dans votre navigateur).
4. *(Optionnel)* Modifiez le **Modèle** (ex: `gemini-1.5-flash`, `gpt-4o-mini`).
5. Cliquez sur **Sauvegarder**. Vous pouvez désormais analyser des CV en temps réel !

> ⚠️ **Bonnes Pratiques** : Utilisez toujours des clés API avec des restrictions strictes de domaine et de budget (Hard Caps).

---

## 📂 Structure du Dépôt

```text
mihnaty/
├── index.html            # Point d'entrée de la SPA
├── css/                  # Design System global (reset, layout, components)
├── pages/
│   └── views.js          # Composants de rendu dynamique (UI Views)
└── js/
    ├── app.js            # Initialisation, Contrôleurs & Event Listeners
    ├── router.js         # Gestionnaire de routes SPA
    ├── state.js          # Store global réactif
    ├── storage.js        # Gestion du Local/Session Storage
    ├── ai/               # Core Module : Intelligence Artificielle
    │   ├── ai-manager.js         # Orchestrateur des appels LLM
    │   ├── prompt-builder.js     # Ingénierie des Prompts et structuration
    │   ├── response-normalizer.js# Nettoyage et validation des outputs IA
    │   ├── schema.js             # Contrats de données JSON attendus
    │   └── providers/            # Adaptateurs spécifiques par fournisseur (Gemini, OpenAI...)
    ├── cv/               # Modules d'extraction et parsing (PDF, DOCX)
    ├── search/           # Connecteurs de recherche Web (Web Grounding)
    ├── data/             # Données de référence statiques (Secteurs)
    └── ui/               # Composants interactifs transversaux (Modals, Toasts)
```

---

## 🗺 Feuille de Route (Roadmap)

La version actuelle valide l'UX, le parsing local et le matching IA. Les prochaines étapes pour scaler vers un produit SaaS complet incluent :

1. **Migration vers une Architecture Full-Stack** : Implémenter un backend (Node.js/Python) pour agir comme proxy sécurisé pour les API d'IA, éliminant ainsi le besoin pour les utilisateurs de fournir leurs propres clés.
2. **Base de Données et Auth (BaaS)** : Intégration de Firebase ou Supabase pour la gestion des comptes, l'authentification OAuth, et la persistance des parcours de carrière dans le Cloud.
3. **Agrégation de Données Temps Réel** : Mise en place de pipelines de scraping ou de partenariats API (LinkedIn, Indeed, Coursera) pour remplacer les recherches Web Grounding de l'IA par des requêtes directes à des bases de données structurées.
4. **Agentic Workflows** : Permettre à l'IA d'aller plus loin en générant des lettres de motivation personnalisées et en préparant des questions d'entretien spécifiques au poste ciblé.

---

> 💡 *Développé avec passion pour démocratiser l'orientation professionnelle.*
