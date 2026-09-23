# Mihnati - POC & MVP Frontend

Mihnati est une plateforme d'orientation professionnelle basée sur les compétences. Ce projet est un MVP 100% frontend (sans backend, sans base de données) démontrant l'architecture, l'interface et le processus de matching par IA.

## 1. Architecture du projet

Le projet est conçu de manière modulaire en utilisant HTML5, CSS3, et Vanilla JavaScript (ES6+).

```text
/
├── index.html            # Landing page
├── app.html              # Application principale (SPA)
├── README.md             # Ce document
├── css/
│   ├── variables.css     # Couleurs, espacements, ombres
│   ├── reset.css         # Reset CSS standard
│   ├── layout.css        # Structure de la page (Sidebar, Grid)
│   └── components.css    # Boutons, Cards, Tags, Toasts, Loaders
├── pages/
│   └── views.js          # Templates HTML des différentes vues (injectées dynamiquement)
└── js/
    ├── app.js            # Point d'entrée de l'application et contrôleurs des vues
    ├── router.js         # Gestion de la navigation côté client (Hash router)
    ├── state.js          # Gestionnaire d'état global
    ├── storage.js        # Wrapper pour LocalStorage et SessionStorage
    ├── mock/
    │   └── mock-data.js  # Données simulées pour le mode démo
    ├── ai/
    │   ├── schema.js         # Définition du format JSON strict attendu
    │   ├── prompt-builder.js # Construction du prompt avec le CV et le profil
    │   ├── ai-client.js      # Client d'appel API abstrait (compatible OpenAI/Gemini)
    │   └── ai-manager.js     # Orchestrateur (bascule entre mode réel et mode démo)
    ├── cv/
    │   ├── pdf-parser.js     # Extraction de texte PDF (via pdf.js)
    │   ├── docx-parser.js    # Extraction de texte DOCX (via mammoth.js)
    │   └── cv-upload.js      # Logique de drag&drop et timeline d'analyse
    ├── matching/
    │   └── skill-matching.js # Moteur local de calcul de score de compatibilité
    └── ui/
        ├── components.js # Fonctions de rendu HTML pour les cards et tags
        └── toast.js      # Système de notifications
```

## 2. Explication de chaque module

- **Core (app.js, router.js, state.js)** : Coordonne la navigation (sans rechargement de page), stocke les données en mémoire vive et fait le pont avec le stockage navigateur.
- **AI (ai-client.js, ai-manager.js, prompt-builder.js)** : Le `ai-client` est agnostique, ce qui signifie qu'il peut prendre l'URL et la clé API de n'importe quel fournisseur compatible. Le `prompt-builder` formate le contexte et force un retour au format JSON (`schema.js`).
- **CV (pdf-parser.js, docx-parser.js)** : Permet de lire et d'extraire le texte localement. Le CV n'est jamais uploadé sur un serveur intermédiaire, seul le texte brut est envoyé à l'IA.
- **Matching (skill-matching.js)** : Analyse la différence entre les compétences requises par une offre et les compétences détectées chez l'utilisateur pour générer un score (ex: 82%).

## 3. Instructions d'utilisation

1. Ouvrez `index.html` dans un navigateur moderne (Chrome, Firefox, Edge, Safari).
2. Cliquez sur **Lancer la démo** pour tester l'application sans configuration, ou **Analyser mon CV** pour commencer.
3. Remplissez votre profil dans **Mon Profil**.
4. Testez le flux d'analyse en déposant un faux CV (PDF ou DOCX) dans **Analyser mon CV**.

## 4. Procédure pour configurer une API AI

L'application peut utiliser de vraies IA génératives :

1. Allez dans **Paramètres** dans la barre latérale.
2. Choisissez votre fournisseur (ex: OpenAI, Groq, Mistral via un endpoint compatible).
3. Entrez l'**Endpoint API** (ex: `https://api.openai.com/v1/chat/completions`).
4. Entrez le **Nom du Modèle** (ex: `gpt-3.5-turbo`, `llama3-8b-8192`).
5. Collez votre **Clé API**.
6. Cliquez sur **Enregistrer temporairement**.
7. Allez dans **Analyser mon CV** et déposez un vrai CV. Le système interrogera directement l'API configurée depuis votre navigateur.

## 5. Procédure pour supprimer toutes les données

- **Option A (Suppression clé IA uniquement)** : Dans Paramètres, cliquez sur `Effacer mes clés`. Cela supprime la configuration IA du SessionStorage.
- **Option B (Hard Reset)** : Dans Paramètres, dans la "Zone de danger", cliquez sur `Réinitialiser toutes mes données`. Cela videra intégralement le `LocalStorage` et le `SessionStorage`, ramenant l'application à son état vierge.

## 6. Limites de sécurité du frontend

- **Clés API exposées** : La configuration IA est stockée dans le `sessionStorage` et envoyée directement depuis le client. Si une extension malveillante a accès à la page, elle pourrait lire la clé. Il faut donc toujours utiliser des clés restreintes (limite de coût, accès limité au modèle).
- **CORS** : Certains fournisseurs API bloquent les requêtes provenant des navigateurs (CORS). Il faut privilégier les fournisseurs qui autorisent le mode Web (ex: OpenRouter, Gemini, ou en configurant correctement les headers).
- **Absence de persistance robuste** : Effacer le cache du navigateur supprime le profil de l'utilisateur.

## 7. Roadmap POC → MVP complet

1. **Backend (Node.js/Python)** : Déplacer le code d'`ai-client.js` vers un serveur pour cacher les clés API des fournisseurs.
2. **Base de données (PostgreSQL)** : Stocker les profils utilisateurs et l'historique d'analyses pour remplacer le `LocalStorage`.
3. **Authentification (Auth0 / JWT)** : Permettre aux utilisateurs de s'inscrire, se connecter et retrouver leurs données sur plusieurs appareils.
4. **Scraping / API Offres d'emploi** : Remplacer `mock-data.js` par de vraies APIs (LinkedIn, Indeed, etc.) pour récupérer les formations et opportunités en temps réel.
5. **Gateway IA Avancée** : Mettre en place un système de fallback et de validation des schémas JSON côté backend pour assurer 100% de fiabilité.
