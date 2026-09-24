# Mihnati ✦ AI-Powered Career Orientation Platform

![Version](https://img.shields.io/badge/version-1.2.0--secure-blue.svg)
![Status](https://img.shields.io/badge/status-MVP_Frontend-success.svg)
![Architecture](https://img.shields.io/badge/architecture-Client--Side_SPA-orange.svg)

**Mihnati** est une plateforme d'orientation professionnelle et de gestion de carrière propulsée par l'Intelligence Artificielle. Ce projet est actuellement un **Proof of Concept (POC) et Minimum Viable Product (MVP) 100% frontend**. Il démontre une architecture "Serverless" locale, des interfaces fluides, et un moteur de matching avancé piloté par l'IA générative (LLMs).

---

## 📑 Table des Matières

1. [Aperçu du Projet](#-aperçu-du-projet)
2. [Fonctionnalités Principales](#-fonctionnalités-principales)
3. [Architecture Technique](#-architecture-technique)
4. [Sécurité et Hardening](#-sécurité-et-hardening)
5. [Guide de Démarrage Rapide](#-guide-de-démarrage-rapide)
6. [Configuration de l&#39;IA (BYOK)](#-configuration-de-lia-byok)
7. [Structure du Dépôt](#-structure-du-dépôt)
8. [Feuille de Route (Roadmap)](#-feuille-de-route-roadmap)

---

## 🚀 Aperçu du Projet

Mihnati repense l'orientation professionnelle en utilisant l'IA pour extraire les compétences réelles depuis un CV et les comparer aux besoins actuels du marché. En agissant comme un conseiller carrière virtuel, Mihnati offre :

- Une analyse fine des compétences (Hard Skills, Soft Skills, Langues).
- Des recommandations de formations pour combler les lacunes (Skill Gaps).
- La suggestion d'opportunités d'emploi adaptées au profil de l'utilisateur.

---

## ✨ Fonctionnalités Principales

- **Analyse Intelligente de CV** : Traitement local de fichiers PDF et DOCX, extraction et structuration des données via un LLM.
- **Moteur de Matching de Compétences** : Évaluation algorithmique de la compatibilité entre un candidat et une opportunité professionnelle.
- **Génération de Feuille de Route** : Création d'un plan d'action personnalisé étape par étape pour atteindre les objectifs de carrière.
- **Architecture BYOK (Bring Your Own Key)** : Intégration agnostique permettant à l'utilisateur de brancher le fournisseur d'IA de son choix (OpenAI, Gemini, Anthropic, Cohere, Groq, Mistral).
- **Mode Hors Ligne / Démo** : Un mode démo riche avec des données mockées (Secteurs, Formations, Opportunités) pour évaluer l'UX sans clé API.

---

## 🏗 Architecture Technique

L'application est construite comme une **Single Page Application (SPA)** sans framework lourd, maximisant les performances et la portabilité.

- **Frontend Core** : HTML5, CSS3 (Variables natives, Flexbox/Grid), Vanilla JavaScript (ES6+).
- **Gestion de l'État (State Management)** : Store réactif local gérant les profils, préférences et configurations IA.
- **Routage** : Routeur côté client basé sur le hash (`#`).
- **Parsing Local** :
  - `pdf.js` pour l'extraction vectorielle de texte depuis des PDF.
  - `mammoth.js` pour le traitement des documents Word (.docx).
- **Stockage** : `LocalStorage` (persistance du profil) et `SessionStorage` (isolation sécurisée des clés API).

---

## 🔒 Sécurité et Hardening (v1.2.0-secure)

Suite à un audit de sécurité approfondi, le projet intègre des défenses robustes pour opérer de manière sécurisée dans un contexte 100% navigateur :

- **Data Privacy & Parsing** : Les CV sont parsés localement. Le texte extrait est limité (50 000 caractères, max 5 Mo, 5 pages max) pour prévenir les attaques DoS.
- **Prévention XSS & Injection** :
  - Assainissement cryptographique via `Utils.escapeHTML` sur les rendus dynamiques (`innerHTML`).
  - Encapsulation des données non fiables dans les prompts (`--- BEGIN UNTRUSTED CV CONTENT ---`) pour contrer les Prompt Injections.
- **Sécurité des APIs (BYOK)** :
  - Clés stockées exclusivement dans le `sessionStorage`.
  - Contrôle strict des endpoints (HTTPS obligatoire, aucun proxy public autorisé).
  - Détection de pannes réseau et CORS sans fuite d'informations (Error Bleed Prevention).
- **Protection de l'État** : Opérateurs Spread utilisés pour empêcher les attaques par *Prototype Pollution*.

---

## 🏁 Guide de Démarrage Rapide

L'application ne nécessitant pas de backend, son exécution est immédiate.

### Prérequis

- Un navigateur web moderne (Chrome, Edge, Firefox, Safari).
- Une connexion Internet (pour contacter les APIs des modèles d'IA et récupérer les librairies externes).

### Installation et Exécution

1. Clonez ce dépôt localement :
   ```bash
   git clone https://github.com/Cherkaoui7/mihnaty.git
   ```
2. Ouvrez le projet (via un serveur local pour des performances optimales, ou directement via le système de fichiers) :
   ```bash
   # Utilisation de Node.js via un serveur basique
   npx serve .
   ```
3. Accédez à `http://localhost:3000` (ou double-cliquez sur `index.html`).

---

## ⚙️ Configuration de l'IA (BYOK)

Mihnati vous permet d'utiliser les vrais modèles génératifs.

1. Accédez à la section **Paramètres** dans la barre latérale.
2. Sélectionnez votre **Fournisseur IA** (ex. : Google Gemini, OpenAI, Groq).
3. (Optionnel) Modifiez l'**Endpoint** ou le **Modèle** pour utiliser des API compatibles personnalisées.
4. Renseignez votre **Clé API** (elle ne quittera jamais votre navigateur).
5. Sauvegardez temporairement. L'analyse de CV utilisera désormais l'intelligence artificielle en temps réel.

> **Note de sécurité** : L'architecture BYOK expose inévitablement les requêtes au réseau du navigateur. Utilisez toujours des clés API avec des restrictions de budget (Hard Caps) et de domaine si votre fournisseur le permet.

---

## 📂 Structure du Dépôt

L'arborescence est conçue pour une lisibilité maximale et une séparation claire des responsabilités :

```text
mihnaty/
├── index.html            # Point d'entrée, dépendances CDN (pdf.js, mammoth)
├── css/                  # Design System (variables, reset, layout, components)
├── pages/
│   └── views.js          # Templates littéraux des vues SPA
└── js/
    ├── app.js            # Initialisation, Contrôleurs de vues et UI events
    ├── router.js         # Moteur de navigation SPA
    ├── state.js          # Gestionnaire d'état global
    ├── storage.js        # Abstraction de persistance sécurisée
    ├── ai/               # Core Intelligence Artificielle
    │   ├── ai-manager.js         # Orchestrateur IA
    │   ├── prompt-builder.js     # Ingénierie des Prompts
    │   ├── response-normalizer.js# Validation et formatage JSON strict
    │   └── providers/            # Adaptateurs pour les différents LLMs
    ├── cv/               # Utilitaires de Parsing de documents (PDF/DOCX)
    ├── matching/         # Moteur d'évaluation de l'adéquation candidat-emploi
    ├── search/           # Composants liés au web grounding
    ├── mock/             # Données mockées (Mode Démo)
    ├── data/             # Données métier statiques (Secteurs, Formations)
    └── ui/               # Composants interactifs (Modals, Toasts)
```

---

## 🗺 Feuille de Route (Roadmap)

Le projet actuel vise à valider l'UX et la faisabilité algorithmique. L'évolution vers un produit commercial complet nécessitera les étapes suivantes :

1. **Migration Backend (Sécurisation absolue)** : Déplacer la logique `ai-client.js` vers un serveur (ex: Node.js/Python) pour agir en tant que passerelle d'IA, masquant totalement les clés maîtresses.
2. **Base de Données et Auth** : Implémentation de PostgreSQL ou MongoDB avec Auth0/JWT pour gérer les sessions utilisateurs persistantes sur plusieurs appareils.
3. **Data Ingestion Temps Réel** : Remplacement des données mockées par des Web Scrapers professionnels (LinkedIn, Indeed) ou agrégateurs de flux d'offres d'emploi et de formations.
4. **Validation de Schémas IA** : Mise en place de bibliothèques robustes (ex: Zod, Pydantic) sur le backend pour garantir un parsing JSON 100% fiable en toutes circonstances.

---

**Mihnati** — *Construire la carrière de demain, brique par brique.*
