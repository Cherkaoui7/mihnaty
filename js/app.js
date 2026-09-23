const App = {
  navigate(hash) {
    window.location.hash = `#${hash}`;
  },
  
  viewControllers: {
    async dashboard() {
      UI.updateGreeting();
      const skillsDiv = document.getElementById("dashboard-skills");
      const developDiv = document.getElementById("dashboard-to-develop");
      const modeBadge = document.getElementById("live-demo-badge");
      const isDemo =
        typeof DemoState !== "undefined" && DemoState.isActive;
      const analysis = isDemo
        ? DemoState.data || (typeof DemoData !== "undefined" ? DemoData : null)
        : State.analysis;
      const dashboardProfile = analysis ? analysis.profile || {} : {};

      if (
        dashboardProfile.fullName &&
        dashboardProfile.fullName !== "Non détecté"
      ) {
        document.getElementById("dashboard-user-name").innerText =
          dashboardProfile.fullName.split(" ")[0];
      } else {
        document.getElementById("dashboard-user-name").innerText = "👋";
      }

      const isLive = State.aiConfig && State.aiConfig.apiKey;
      if (modeBadge) {
        modeBadge.innerHTML = isDemo
          ? `<span class="tag tag-medium">MODE DÉMO</span>`
          : isLive
            ? `<span class="tag" style="background:#e0f2fe; color:#0284c7;">MODE RÉEL</span>`
            : `<span class="tag" style="background:#f1f5f9; color:#475569;">ESPACE PRODUCTION</span>`;
      }

      if (analysis) {
        const profile = dashboardProfile;
        document.getElementById("dash-role").innerText =
          profile.targetRole || "-";
        document.getElementById("dash-sector").innerText =
          profile.primaryDomain || profile.domain || "-";

        const skills = analysis.skills || [];
        const toDevelop = analysis.skillsToDevelop || [];

        document.getElementById("dash-skills-count").innerText = skills.length;
        document.getElementById("dash-gaps-count").innerText = toDevelop.length;

        skillsDiv.innerHTML = skills.length
          ? skills.map((s) => Components.renderSkillTag(s)).join(" ")
          : "<i>Aucune compétence détectée.</i>";

        developDiv.innerHTML = toDevelop.length
          ? toDevelop
              .slice(0, 3)
              .map(
                (s) =>
                  `<div style="margin-bottom:0.5rem; font-size:0.9rem;">• ${s.name} <span class="tag ${s.priority === "high" ? "tag-high" : "tag-medium"}">${s.priority}</span></div>`,
              )
              .join("")
          : "<i>Rien à signaler.</i>";

        // Fetch previews
        const jobsPreview = document.getElementById("dashboard-jobs-preview");
        const coursesPreview = document.getElementById(
          "dashboard-courses-preview",
        );

        // Fetch previews ONLY from cache
        const cachedJobs = isDemo
          ? (typeof DemoData !== "undefined" ? DemoData.jobs : [])
          : SearchCache.get("jobs", 10) || [];
        jobsPreview.innerHTML = cachedJobs.length
          ? cachedJobs
              .slice(0, 2)
              .map((j) => Components.renderJobCard(j, analysis))
              .join("")
          : "<i>Allez dans l'onglet Opportunités pour lancer la recherche.</i>";

        const cachedCourses = isDemo
          ? (typeof DemoData !== "undefined" ? DemoData.courses : [])
          : SearchCache.get("courses", 30) || [];
        coursesPreview.innerHTML = cachedCourses.length
          ? cachedCourses
              .slice(0, 2)
              .map((c) => Components.renderCourseCard(c))
              .join("")
          : "<i>Allez dans l'onglet Formations pour lancer la recherche.</i>";
      } else {
        skillsDiv.innerHTML = `<div style="color:var(--text-muted); line-height:1.6;">
          Votre espace production est prêt. Ajoutez votre CV pour recevoir des recommandations personnalisées.
          <div style="margin-top:1rem;"><button class="btn btn-primary" onclick="App.navigate('upload')">Analyser mon CV</button></div>
        </div>`;
        developDiv.innerHTML = "<i>Les compétences à développer apparaîtront après l'analyse de votre CV.</i>";
      }
    },

    profile() {
      const form = document.getElementById("profile-form");
      if (State.profile) {
        document.getElementById("profile-name").value =
          State.profile.fullName || "";
        document.getElementById("profile-city").value =
          State.profile.city || "";
        document.getElementById("profile-education").value =
          State.profile.educationLevel || "";
        document.getElementById("profile-domain").value =
          State.profile.primaryDomain || "";
        document.getElementById("profile-target").value =
          State.profile.targetRole || "";
        if (document.getElementById("profile-experience")) {
          document.getElementById("profile-experience").value =
            State.profile.experienceYears || "";
        }
      }

      // Afficher le badge si le profil vient d'une analyse IA (et non rempli de zéro manuellement sans analyse)
      if (State.analysis) {
        document.getElementById("profile-auto-badge").style.display =
          "inline-block";
      }

      form.onsubmit = (e) => {
        e.preventDefault();
        State.updateProfile({
          fullName: document.getElementById("profile-name").value,
          city: document.getElementById("profile-city").value,
          educationLevel: document.getElementById("profile-education").value,
          primaryDomain: document.getElementById("profile-domain").value,
          targetRole: document.getElementById("profile-target").value,
          experienceYears: document.getElementById("profile-experience").value,
        });

        // Mettre à jour l'analyse si elle existe pour qu'elle reflète les modifications
        if (State.analysis && State.analysis.profile) {
          State.analysis.profile.targetRole =
            document.getElementById("profile-target").value;
          State.analysis.profile.primaryDomain =
            document.getElementById("profile-domain").value;
          State.updateAnalysis(State.analysis);
        }

        UI.showToast("Profil enregistré avec succès", "success");
        UI.updateGreeting();
      };
    },

    settings() {
      const updateUI = () => {
        const config = State.aiConfig;
        const disconnectedView = document.getElementById("ai-disconnected-view");
        const connectedView = document.getElementById("ai-connected-view");
        const advancedContainer = document.getElementById("ai-advanced-container");

        if (config && config.apiKey) {
          disconnectedView.style.display = "none";
          advancedContainer.style.display = "none";
          connectedView.style.display = "block";

          const def = ProviderRegistry.get(config.provider);
          document.getElementById("ai-detected-provider").textContent = def ? def.name : config.provider;
          
          const modelSpan = document.getElementById("ai-detected-model");
          const modelSelect = document.getElementById("ai-model-select");
          
          if (config.availableModels && config.availableModels.length > 0) {
              modelSpan.style.display = "none";
              modelSelect.style.display = "inline-block";
              modelSelect.innerHTML = "";
              // Put auto:free or selected model first, or just list all
              config.availableModels.forEach(m => {
                  const opt = document.createElement("option");
                  opt.value = m;
                  opt.textContent = m === "auto:free" ? "Auto — Free" : m;
                  if (m === config.model) opt.selected = true;
                  modelSelect.appendChild(opt);
              });
              modelSelect.onchange = (e) => {
                  config.model = e.target.value;
                  State.updateAIConfig(config);
              };
          } else {
              modelSelect.style.display = "none";
              modelSpan.style.display = "inline";
              let displayModel = config.model || (def ? def.defaultModel : "Automatique");
              if (displayModel === "auto:free") displayModel = "Auto — Free";
              modelSpan.textContent = displayModel;
          }

          const blOptions = document.getElementById("bl-options");
          if (blOptions) {
              blOptions.style.display = config.provider === 'bazaarlink' ? "block" : "none";
          }
          const fallbackCb = document.getElementById("ai-free-fallback");
          if (fallbackCb) {
              fallbackCb.checked = config.freeOnly !== false; // defaults to true
              fallbackCb.onchange = (e) => {
                 config.freeOnly = e.target.checked;
                 State.updateAIConfig(config);
              };
          }

          document.getElementById("ai-masked-key").textContent =
            config.apiKey.substring(0, 4) +
            "•".repeat(10) +
            config.apiKey.slice(-4);
          document.getElementById("ai-status-text").textContent =
            "Prêt à analyser votre CV.";
        } else {
          disconnectedView.style.display = "block";
          connectedView.style.display = "none";
          advancedContainer.style.display = "none";
        }
      };

      updateUI();

      // Populate advanced providers
      const advProviderSelect = document.getElementById("adv-provider");
      if (advProviderSelect) {
        advProviderSelect.innerHTML = "";
        ProviderRegistry.getAll().forEach(p => {
          const opt = document.createElement("option");
          opt.value = p.id;
          opt.textContent = p.name;
          advProviderSelect.appendChild(opt);
        });
        
        const updateAdvancedFields = () => {
          const providerId = advProviderSelect.value;
          const def = ProviderRegistry.get(providerId);
          
          if (providerId === "custom") {
             document.getElementById("adv-endpoint-group").style.display = "block";
          } else {
             document.getElementById("adv-endpoint-group").style.display = "none";
          }
          
          document.getElementById("adv-model").placeholder = (def && def.defaultModel) ? `Défaut : ${def.defaultModel}` : "Modèle par défaut ▼";
        };
        
        advProviderSelect.addEventListener("change", updateAdvancedFields);
        updateAdvancedFields();
      }

      // Main Connect Form
      const connectForm = document.getElementById("ai-connect-form");
      if (connectForm) {
        connectForm.onsubmit = async (e) => {
          e.preventDefault();
          const key = document.getElementById("ai-key-input").value.trim();
          if (!key) return;

          const btn = document.getElementById("ai-connect-btn");
          const originalText = btn.textContent;
          btn.disabled = true;
          btn.textContent = "Connexion en cours...";

          try {
            const config = await ProviderDetector.detect(key);
            if (config) {
              State.updateAIConfig(config);
              const def = ProviderRegistry.get(config.provider);
              UI.showToast(
                `Connecté avec succès à ${def ? def.name : config.provider}`,
                "success",
              );
              connectForm.reset();
              document.getElementById("ai-advanced-container").style.display = "none";
              document.getElementById("ai-detection-error").style.display = "none";
              updateUI();
            } else {
              document.getElementById("ai-detection-error").style.display = "block";
              document.getElementById("ai-advanced-container").style.display = "block";
              document.getElementById("adv-key").value = key; // Pre-fill
              document.getElementById("ai-advanced-container").scrollIntoView({ behavior: 'smooth' });
              UI.showToast(
                "Impossible d'identifier automatiquement le fournisseur.",
                "error",
              );
            }
          } catch (err) {
              document.getElementById('ai-detection-error').style.display = 'block';
              document.getElementById('ai-advanced-container').style.display = 'block';
              document.getElementById('adv-key').value = key;
              document.getElementById('ai-advanced-container').scrollIntoView({ behavior: 'smooth' });
              UI.showToast(getUserFriendlyProviderError(err), 'error');
            } finally {
            btn.disabled = false;
            btn.textContent = originalText;
          }
        };
      }

      // Advanced Connect Form
      const advForm = document.getElementById("ai-advanced-form");
      if (advForm) {
        advForm.onsubmit = async (e) => {
          e.preventDefault();
          const provider = document.getElementById("adv-provider").value;
          const endpoint = document.getElementById("adv-endpoint").value.trim();
          const model = document.getElementById("adv-model").value.trim();
          const key = document.getElementById("adv-key").value.trim();

          if (!key) return;

          const btn = e.target.querySelector('button[type="submit"]');
          const originalText = btn.textContent;
          btn.disabled = true;
          btn.textContent = "Test en cours...";

          const config = { provider, endpoint, model, apiKey: key };
          try {
            const isValid = await AIManager.testConnection(config);
            if (isValid) {
              State.updateAIConfig(config);
              UI.showToast("Connexion manuelle réussie.", "success");
              advForm.reset();
              document.getElementById("ai-advanced-container").style.display = "none";
              updateUI();
            } else {
              throw new Error("Validation échouée.");
            }
          } catch (err) {
            UI.showToast(getUserFriendlyProviderError(err), "error");
          } finally {
            btn.disabled = false;
            btn.textContent = originalText;
          }
        };
      }

      const changeBtn = document.getElementById("ai-change-btn");
      if (changeBtn) {
        changeBtn.onclick = () => {
          document.getElementById("ai-advanced-container").style.display = "block";
          document.getElementById("ai-detection-error").style.display = "none";
          document.getElementById("ai-advanced-container").scrollIntoView({ behavior: 'smooth' });
        };
      }

      // Disconnect
      const disconnectBtn = document.getElementById("ai-disconnect-btn");
      if (disconnectBtn) {
        disconnectBtn.onclick = () => {
          State.updateAIConfig(null);
          UI.showToast("Votre connexion IA a été supprimée.", "success");
          updateUI();
        };
      }

      // Test connection manually
      const testBtn = document.getElementById("ai-test-btn");
      if (testBtn) {
        testBtn.onclick = async () => {
          const config = State.aiConfig;
          if (!config) return;

          const btn = document.getElementById("ai-test-btn");
          const originalText = btn.textContent;
          btn.disabled = true;
          btn.textContent = "Test...";

          try {
            const isValid = await AIManager.testConnection(config);
            if (isValid) {
              UI.showToast("Test réussi : La connexion est active.", "success");
            } else {
              throw new Error("Échec");
            }
          } catch (e) {
            UI.showToast(getUserFriendlyProviderError(e), "error");
          } finally {
            btn.disabled = false;
            btn.textContent = originalText;
          }
        };
      }

      document.getElementById("reset-all-btn").onclick = () => {
        if (confirm("Voulez-vous vraiment supprimer TOUTES les données ?")) {
          State.clearAll();
          UI.showToast("Application réinitialisée.", "success");
          window.location.hash = "#dashboard";
          window.location.reload();
        }
      };
    },

    upload() {
      CVUpload.init();
    },

    skills() {
      if (!State.analysis) {
        document.getElementById("skills-container").innerHTML =
          "<p>Veuillez analyser votre CV d'abord.</p>";
        document.getElementById("skills-to-develop-container").innerHTML = "";
        return;
      }

      const skills = State.analysis.skills || [];
      document.getElementById("skills-container").innerHTML = skills
        .map((s) => Components.renderSkillTag(s))
        .join(" ");

      const toDevelop = State.analysis.skillsToDevelop || [];
      document.getElementById("skills-to-develop-container").innerHTML =
        toDevelop.map((s) => Components.renderSkillToDevelop(s)).join("");
    },

    courses() {
      const container = document.getElementById("courses-container");
      const profile = State.analysis ? State.analysis : null;
      if (!profile) {
        container.innerHTML = "<i>Veuillez analyser votre CV d'abord.</i>";
        return;
      }

      container.innerHTML = "<i>Chargement des formations...</i>";

      const renderCourses = async (force) => {
        try {
          const results = await WebSearch.searchCourses(profile, force);
          container.innerHTML = results.length
            ? results.map((c) => Components.renderCourseCard(c)).join("")
            : "<i>Aucune formation trouvée pour ce profil.</i>";
        } catch (e) {
          if (e.message.includes("Quota IA épuisé")) {
            container.innerHTML = `
              <div style="background: #fff3cd; color: #856404; padding: 1rem; border-radius: 8px; text-align: center; margin-top: 1rem;">
                <h4>Recherche Web temporairement indisponible</h4>
                <p style="margin-bottom: 0.5rem;">Le quota de votre fournisseur IA a été atteint.</p>
                <p style="margin-bottom: 1rem;">Vos données déjà analysées restent disponibles.</p>
                <button class="btn btn-secondary" onclick="App.navigate('courses')">Réessayer plus tard</button>
              </div>
            `;
          } else if (e.message.includes("prend pas en charge la recherche Web")) {
            container.innerHTML = `
              <div style="background: #fff1f2; color: #be123c; padding: 1rem; border-radius: 8px; text-align: center; margin-top: 1rem;">
                <h4>Fonctionnalité non supportée</h4>
                <p style="margin-bottom: 1rem;">Votre fournisseur actuel ne prend pas en charge la recherche Web nécessaire à cette fonctionnalité.</p>
                <div style="display: flex; justify-content: center; gap: 1rem;">
                  <button class="btn btn-primary" onclick="App.navigate('settings')">Changer de fournisseur</button>
                  <button class="btn btn-secondary" onclick="App.navigate('demo')">Utiliser le mode démo</button>
                </div>
              </div>
            `;
          } else {
            container.innerHTML = `<i style="color:red;">Erreur: ${e.message}</i>`;
          }
        }
      };

      const refreshBtn = document.getElementById("refresh-courses-btn");
      if (refreshBtn) {
        refreshBtn.onclick = () => {
          container.innerHTML =
            "<i>Recherche en cours via Google Search...</i>";
          renderCourses(true);
        };
      }

      renderCourses(false);
    },

    opportunities() {
      const container = document.getElementById("opportunities-container");
      const profile = State.analysis ? State.analysis : null;
      if (!profile) {
        container.innerHTML = "<i>Veuillez analyser votre CV d'abord.</i>";
        return;
      }

      container.innerHTML = "<i>Chargement des opportunités...</i>";

      const renderJobs = async (force) => {
        try {
          const results = await WebSearch.searchJobs(profile, force);
          container.innerHTML = results.length
            ? results.map((j) => Components.renderJobCard(j, profile)).join("")
            : "<i>Aucune opportunité trouvée.</i>";
        } catch (e) {
          if (e.message.includes("Quota IA épuisé")) {
            container.innerHTML = `
              <div style="background: #fff3cd; color: #856404; padding: 1rem; border-radius: 8px; text-align: center; margin-top: 1rem;">
                <h4>Recherche Web temporairement indisponible</h4>
                <p style="margin-bottom: 0.5rem;">Le quota de votre fournisseur IA a été atteint.</p>
                <p style="margin-bottom: 1rem;">Vos données déjà analysées restent disponibles.</p>
                <button class="btn btn-secondary" onclick="App.navigate('opportunities')">Réessayer plus tard</button>
              </div>
            `;
          } else if (e.message.includes("prend pas en charge la recherche Web")) {
            container.innerHTML = `
              <div style="background: #fff1f2; color: #be123c; padding: 1rem; border-radius: 8px; text-align: center; margin-top: 1rem;">
                <h4>Fonctionnalité non supportée</h4>
                <p style="margin-bottom: 1rem;">Votre fournisseur actuel ne prend pas en charge la recherche Web nécessaire à cette fonctionnalité.</p>
                <div style="display: flex; justify-content: center; gap: 1rem;">
                  <button class="btn btn-primary" onclick="App.navigate('settings')">Changer de fournisseur</button>
                  <button class="btn btn-secondary" onclick="App.navigate('demo')">Utiliser le mode démo</button>
                </div>
              </div>
            `;
          } else {
            container.innerHTML = `<i style="color:red;">Erreur: ${e.message}</i>`;
          }
        }
      };

      const refreshBtn = document.getElementById("refresh-jobs-btn");
      if (refreshBtn) {
        refreshBtn.onclick = () => {
          container.innerHTML =
            "<i>Recherche en cours via Google Search...</i>";
          renderJobs(true);
        };
      }

      renderJobs(false);
    },

    feedback() {
      const form = document.getElementById("feedback-form");
      form.onsubmit = (e) => {
        e.preventDefault();
        Storage.set("feedback", {
          rating: document.getElementById("feedback-rating").value,
          text: document.getElementById("feedback-text").value,
        });
        UI.showToast("Merci pour votre retour !", "success");
        form.reset();
      };
    },
  },

  init() {
    Router.init();
    UI.updateGreeting();
  },
};

// Global Exposure for routing execution
window.App = App;

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
