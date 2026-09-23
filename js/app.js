const App = {
  viewControllers: {
    async dashboard() {
      UI.updateGreeting();
      const skillsDiv = document.getElementById("dashboard-skills");
      const developDiv = document.getElementById("dashboard-to-develop");
      const modeBadge = document.getElementById("live-demo-badge");

      if (
        State.profile &&
        State.profile.name &&
        State.profile.name !== "Non détecté"
      ) {
        document.getElementById("dashboard-user-name").innerText =
          State.profile.name.split(" ")[0];
      } else {
        document.getElementById("dashboard-user-name").innerText = "👋";
      }

      const isLive = State.aiConfig && State.aiConfig.apiKey;
      if (modeBadge) {
        modeBadge.innerHTML = isLive
          ? `<span class="tag" style="background:#e0f2fe; color:#0284c7;">LIVE DATA MODE</span>`
          : `<span class="tag tag-medium">DEMO MODE</span>`;
      }

      if (State.analysis) {
        const profile = State.analysis.profile || {};
        document.getElementById("dash-role").innerText =
          profile.targetRole || "-";
        document.getElementById("dash-sector").innerText =
          profile.domain || "-";

        const skills = State.analysis.skills || [];
        const toDevelop = State.analysis.skillsToDevelop || [];

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

        try {
          jobsPreview.innerHTML = "<i>Recherche...</i>";
          const jobs = await WebSearch.searchJobs(State.analysis, false);
          jobsPreview.innerHTML = jobs.length
            ? jobs
                .slice(0, 2)
                .map((j) => Components.renderJobCard(j, State.analysis))
                .join("")
            : "<i>Aucune opportunité trouvée.</i>";
        } catch (e) {
          jobsPreview.innerHTML = "<i>Recherche impossible actuellement.</i>";
        }

        try {
          coursesPreview.innerHTML = "<i>Recherche...</i>";
          const courses = await WebSearch.searchCourses(State.analysis, false);
          coursesPreview.innerHTML = courses.length
            ? courses
                .slice(0, 2)
                .map((c) => Components.renderCourseCard(c))
                .join("")
            : "<i>Aucune formation trouvée.</i>";
        } catch (e) {
          coursesPreview.innerHTML =
            "<i>Recherche impossible actuellement.</i>";
        }
      } else {
        skillsDiv.innerHTML = "<i>Veuillez d'abord analyser votre CV.</i>";
        developDiv.innerHTML = "";
      }
    },

    profile() {
      const form = document.getElementById("profile-form");
      if (State.profile) {
        document.getElementById("profile-name").value =
          State.profile.name || "";
        document.getElementById("profile-city").value =
          State.profile.city || "";
        document.getElementById("profile-education").value =
          State.profile.education || "";
        document.getElementById("profile-domain").value =
          State.profile.domain || "";
        document.getElementById("profile-target").value =
          State.profile.target || State.profile.targetRole || "";
        if (document.getElementById("profile-experience")) {
          document.getElementById("profile-experience").value =
            State.profile.experience || "";
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
          name: document.getElementById("profile-name").value,
          city: document.getElementById("profile-city").value,
          education: document.getElementById("profile-education").value,
          domain: document.getElementById("profile-domain").value,
          target: document.getElementById("profile-target").value,
          experience: document.getElementById("profile-experience").value,
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
        const disconnectedView = document.getElementById(
          "ai-disconnected-view",
        );
        const connectedView = document.getElementById("ai-connected-view");
        const advancedContainer = document.getElementById(
          "ai-advanced-container",
        );

        if (config && config.apiKey) {
          disconnectedView.style.display = "none";
          advancedContainer.style.display = "none";
          connectedView.style.display = "block";

          const adapter = ProviderRegistry.getAdapter(config.provider);
          document.getElementById("ai-detected-provider").textContent = adapter
            ? adapter.name
            : config.provider;
          document.getElementById("ai-masked-key").textContent =
            config.apiKey.substring(0, 4) +
            "•".repeat(10) +
            config.apiKey.slice(-4);
          document.getElementById("ai-status-text").textContent =
            "Prêt à analyser votre CV.";
        } else {
          disconnectedView.style.display = "block";
          connectedView.style.display = "none";
          advancedContainer.style.display = "block";
        }
      };

      updateUI();

      // Toggle advanced settings
      document.getElementById("ai-advanced-toggle").onclick = () => {
        const wrap = document.getElementById("ai-advanced-form-wrap");
        wrap.style.display = wrap.style.display === "none" ? "block" : "none";
      };

      // Main Connect Form
      document.getElementById("ai-connect-form").onsubmit = async (e) => {
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
            UI.showToast(
              `Connecté avec succès à ${ProviderRegistry.getAdapter(config.provider).name}`,
              "success",
            );
            document.getElementById("ai-connect-form").reset();
            document.getElementById("ai-advanced-form-wrap").style.display =
              "none";
            document.getElementById("ai-detection-error").style.display =
              "none";
            updateUI();
          } else {
            document.getElementById("ai-detection-error").style.display =
              "block";
            document.getElementById("ai-advanced-form-wrap").style.display =
              "block";
            document.getElementById("adv-key").value = key; // Pre-fill
            UI.showToast(
              "Impossible d'identifier automatiquement le fournisseur.",
              "error",
            );
          }
        } catch (err) {
          UI.showToast("Erreur lors de la connexion.", "error");
        } finally {
          btn.disabled = false;
          btn.textContent = originalText;
        }
      };

      // Advanced Connect Form
      document.getElementById("ai-advanced-form").onsubmit = async (e) => {
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
            document.getElementById("ai-advanced-form").reset();
            updateUI();
          } else {
            throw new Error("Le test a échoué.");
          }
        } catch (err) {
          UI.showToast(
            "La connexion a échoué. Vérifiez vos paramètres.",
            "error",
          );
        } finally {
          btn.disabled = false;
          btn.textContent = originalText;
        }
      };

      // Disconnect
      document.getElementById("ai-disconnect-btn").onclick = () => {
        State.updateAIConfig(null);
        UI.showToast("Votre connexion IA a été supprimée.", "success");
        updateUI();
      };

      // Test connection manually
      document.getElementById("ai-test-btn").onclick = async () => {
        const btn = document.getElementById("ai-test-btn");
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = "Test...";

        try {
          const isValid = await AIManager.testConnection(State.aiConfig);
          if (isValid) {
            UI.showToast("Test réussi : La connexion est active.", "success");
          } else {
            throw new Error("Échec");
          }
        } catch (e) {
          UI.showToast(
            "Test échoué : La connexion est inactive ou la clé est invalide.",
            "error",
          );
        } finally {
          btn.disabled = false;
          btn.textContent = originalText;
        }
      };

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
          container.innerHTML = `<i>Erreur: ${e.message}</i>`;
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
          container.innerHTML = `<i>Erreur: ${e.message}</i>`;
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
