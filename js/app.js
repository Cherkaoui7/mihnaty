const App = {
  runDemoFlow() {
    if (window.DemoState) DemoState.activate();
    if (window.CVUpload) {
      CVUpload.fileName = 'CV_Demo.pdf';
      CVUpload.fileSize = '1.2 MB';
      CVUpload.extractedText = 'Expériences en marketing, gestion, vente';
      const uploadArea = document.getElementById('uploadArea');
      const progressContainer = document.getElementById('progressContainer');
      if (uploadArea && progressContainer) {
         uploadArea.style.display = 'none';
         progressContainer.style.display = 'block';
      }
      CVUpload.startAnalysis();
    } else {
      window.location.hash = '#dashboard';
    }
  },
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
          ? `<span class="tag tag-medium" style="background:#fef3c7; color:#92400e; border: 1px solid #fde68a; display:inline-block; padding:0.5rem 1rem; border-radius:8px;"><b>Mode démo actif :</b> Vous n'avez pas configuré de clé API. Mihnati utilisera des données simulées. <a href="#settings" style="color:#92400e; text-decoration:underline; font-weight:bold; margin-left:0.5rem;">Configurer l'IA</a></span>`
          : `<span class="tag" style="background:#e0f2fe; color:#0284c7;">MODE RÉEL</span>`;
      }

      if (analysis) {
        const profile = dashboardProfile;
        document.getElementById("dash-role").innerText =
          profile.targetRole || "-";
        const sectorContainer = document.getElementById("dash-sector-container");
        if (sectorContainer) {
            sectorContainer.innerHTML = Components.renderSectorSelector(profile.primaryDomain || profile.domain);
            
            const selectEl = document.getElementById("dash-sector-select");
            if (selectEl) {
                selectEl.onchange = (e) => {
                    const newSectorId = e.target.value;
                    if (isDemo && typeof DemoDataMulti !== 'undefined') {
                        if (typeof DemoState !== 'undefined') {
                            DemoState.data = DemoDataMulti[newSectorId];
                            DemoState.save();
                        }
                        App.viewControllers.dashboard();
                    } else {
                        if(State.analysis.profile) {
                            State.analysis.profile.domain = newSectorId;
                            State.analysis.profile.primaryDomain = newSectorId;
                        }
                        State.save();
                        App.viewControllers.dashboard();
                    }
                };
            }
        }

        const skills = analysis.skills || [];
        const toDevelop = analysis.skillsToDevelop || [];

        const skillsCountEl = document.getElementById("dash-metric-skills");
        if(skillsCountEl) skillsCountEl.innerText = skills.length;
        
        const gapsCountEl = document.getElementById("dash-metric-gaps");
        if(gapsCountEl) gapsCountEl.innerText = toDevelop.length;

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
          
        const jobsMetricEl = document.getElementById("dash-metric-jobs");
        if(jobsMetricEl) jobsMetricEl.innerText = cachedJobs.length;

        jobsPreview.innerHTML = cachedJobs.length
          ? cachedJobs
              .slice(0, 2)
              .map((j) => Components.renderJobCard(j, analysis))
              .join("")
          : "<i>Allez dans l'onglet Opportunités pour lancer la recherche.</i>";

        const cachedCourses = isDemo
          ? (typeof DemoData !== "undefined" ? DemoData.courses : [])
          : SearchCache.get("courses", 30) || [];
          
        const coursesMetricEl = document.getElementById("dash-metric-courses");
        if(coursesMetricEl) coursesMetricEl.innerText = cachedCourses.length;

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
      const isDemo = typeof DemoState !== "undefined" && DemoState.isActive;
      const analysis = isDemo ? (DemoState.data || (typeof DemoData !== "undefined" ? DemoData : null)) : State.analysis;
      const profileData = analysis ? analysis.profile : State.profile;
      
      // Populate domain options
      const domainSelect = document.getElementById("profile-domain");
      if (domainSelect && typeof Sectors !== 'undefined') {
          domainSelect.innerHTML = '<option value="">Sélectionnez un domaine</option>' + 
              Sectors.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
      }

      if (profileData) {
        // Hero
        const heroName = document.getElementById("hero-name");
        if(heroName) heroName.innerText = profileData.fullName || "Utilisateur";
        
        const heroRole = document.getElementById("hero-role");
        if(heroRole) heroRole.innerText = profileData.targetRole || "Profil non défini";

        // Display domain name instead of ID
        const heroSector = document.getElementById("hero-sector");
        if(heroSector) {
            let sName = profileData.primaryDomain || profileData.domain || "-";
            if (typeof window.Sectors !== 'undefined') {
                const sObj = window.Sectors.find(s => s.id === sName || s.shortName === sName);
                if (sObj) sName = sObj.name;
            }
            heroSector.innerText = sName;
        }

        const heroEdu = document.getElementById("hero-education");
        if(heroEdu) heroEdu.innerText = profileData.educationLevel || "-";

        const heroExp = document.getElementById("hero-exp");
        if(heroExp) {
            let exp = profileData.experienceYears !== undefined ? profileData.experienceYears : "-";
            if (exp !== "-") exp += (exp > 1 ? " ans d'expérience" : " an d'expérience");
            heroExp.innerText = exp;
        }

        const heroLoc = document.getElementById("hero-location");
        if(heroLoc) heroLoc.innerText = profileData.city ? (profileData.city + (profileData.country ? ", " + profileData.country : "")) : "-";

        // Form Fields
        const safeSet = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val || "";
        };

        safeSet("profile-first-name", profileData.firstName || (profileData.fullName ? profileData.fullName.split(" ")[0] : ""));
        safeSet("profile-last-name", profileData.lastName || (profileData.fullName ? profileData.fullName.substring(profileData.fullName.indexOf(" ") + 1) : ""));
        safeSet("profile-city", profileData.city);
        safeSet("profile-education", profileData.educationLevel);
        
        let pDom = profileData.primaryDomain || profileData.domain || "";
        if (typeof window.SectorsHelper !== 'undefined' && window.SectorsHelper.normalizeSector) {
            pDom = window.SectorsHelper.normalizeSector(pDom);
        }
        safeSet("profile-domain", pDom);
        safeSet("profile-target", profileData.targetRole);
        
        if (profileData.experienceYears !== undefined) {
             let expLevel = "Débutant";
             if (profileData.experienceYears === 0) expLevel = "Étudiant";
             else if (profileData.experienceYears > 10) expLevel = "Senior";
             else if (profileData.experienceYears > 5) expLevel = "Confirmé";
             else if (profileData.experienceYears > 2) expLevel = "Intermédiaire";
             safeSet("profile-experience", expLevel);
        }

        // Complétude
        // Calculate completeness
        let filledCount = 0;
        let totalCount = 6;
        let sections = [
            { id: "personal", name: "Informations personnelles", weight: 20, isComplete: !!(profileData.fullName && profileData.city) },
            { id: "academic", name: "Parcours académique", weight: 20, isComplete: !!profileData.educationLevel },
            { id: "experience", name: "Expériences professionnelles", weight: 20, isComplete: profileData.experienceYears !== undefined },
            { id: "skills", name: "Compétences", weight: 20, isComplete: analysis && analysis.skills && analysis.skills.length > 0 },
            { id: "goals", name: "Objectifs professionnels", weight: 10, isComplete: !!(profileData.targetRole && profileData.primaryDomain) },
            { id: "docs", name: "Documents", weight: 10, isComplete: analysis && analysis.cvFileName }
        ];
        
        let percentage = sections.reduce((acc, curr) => acc + (curr.isComplete ? curr.weight : 0), 0);
        
        const circle = document.getElementById("completeness-circle");
        if (circle) circle.setAttribute("stroke-dasharray", `${percentage}, 100`);
        const text = document.getElementById("completeness-text");
        if (text) text.innerText = `${percentage}%`;
        const status = document.getElementById("completeness-status");
        if (status) {
            status.innerText = percentage >= 80 ? "Excellent niveau !" : percentage >= 50 ? "Bon niveau" : "En cours";
            status.style.color = percentage >= 80 ? "var(--green)" : percentage >= 50 ? "#ca8a04" : "var(--blue)";
            if(circle) circle.setAttribute("stroke", percentage >= 80 ? "var(--green)" : percentage >= 50 ? "#eab308" : "var(--blue)");
        }

        const compList = document.getElementById("completeness-list");
        if (compList) {
            compList.innerHTML = sections.map(s => {
                const icon = s.isComplete 
                    ? `<svg width="16" height="16" fill="none" stroke="var(--green)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
                    : `<svg width="16" height="16" fill="none" stroke="#ca8a04" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
                return `<div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="display:flex; align-items:center; gap:0.5rem; color:${s.isComplete ? 'var(--text-dark)' : 'var(--text-muted)'}">${icon} ${s.name}</span>
                    <strong style="color:${s.isComplete ? 'var(--text-dark)' : 'var(--text-muted)'}">${s.isComplete ? '100%' : Math.round(s.weight/2)+'%'}</strong>
                </div>`;
            }).join("");
        }

        // Suggestions IA
        const suggestionsDiv = document.getElementById("ai-suggestions-list");
        if (suggestionsDiv) {
            let suggestions = [];
            if (!sections.find(s=>s.id==="skills").isComplete) {
                suggestions.push({
                    title: "Ajoutez plus de compétences",
                    desc: "Votre profil sera plus visible avec davantage de compétences.",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z",
                    color: "orange"
                });
            }
            if (!sections.find(s=>s.id==="experience").isComplete) {
                suggestions.push({
                    title: "Complétez votre expérience",
                    desc: "Détaillez vos projets et réalisations.",
                    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    color: "blue"
                });
            }
            if (!sections.find(s=>s.id==="goals").isComplete) {
                suggestions.push({
                    title: "Définissez vos objectifs",
                    desc: "Aidez l'IA à mieux cibler vos recommandations.",
                    icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
                    color: "green"
                });
            }

            if (suggestions.length === 0) {
                suggestionsDiv.innerHTML = `<div style="text-align:center; padding: 1rem; color:var(--text-muted); font-size:0.9rem;">Votre profil est excellent ! Aucune suggestion pour le moment.</div>`;
            } else {
                suggestionsDiv.innerHTML = suggestions.map(s => {
                    const colors = {
                        orange: { bg: "#fffbeb", text: "#d97706" },
                        blue: { bg: "#eff6ff", text: "#2563eb" },
                        green: { bg: "#f0fdf4", text: "#16a34a" }
                    };
                    const c = colors[s.color];
                    return `<div style="display:flex; align-items:flex-start; gap:0.75rem; padding:0.75rem; border-radius:8px; transition:background 0.2s; cursor:pointer;" onmouseover="this.style.background='rgba(0,0,0,0.02)'" onmouseout="this.style.background='transparent'">
                        <div style="width:36px; height:36px; border-radius:8px; background:${c.bg}; color:${c.text}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${s.icon}"></path></svg>
                        </div>
                        <div>
                            <h4 style="margin:0 0 0.25rem 0; font-size:0.95rem; color:var(--text-dark);">${s.title}</h4>
                            <p style="margin:0; font-size:0.8rem; color:var(--text-muted); line-height:1.4;">${s.desc}</p>
                        </div>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-left:auto; color:var(--text-muted); margin-top:0.25rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>`;
                }).join("");
            }
        }

        // Documents
        const docsDiv = document.getElementById("profile-documents-list");
        if (docsDiv) {
            if (analysis && analysis.cvFileName) {
                docsDiv.innerHTML = `
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;">
                        <div style="display:flex; align-items:center; gap:0.75rem;">
                            <div style="width:32px; height:32px; border-radius:6px; background:#fef2f2; color:#ef4444; display:flex; align-items:center; justify-content:center;">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <h4 style="margin:0 0 0.1rem 0; font-size:0.9rem; color:var(--text-dark);">Mon CV</h4>
                                <div style="font-size:0.75rem; color:var(--text-muted);">${analysis.cvFileName}</div>
                            </div>
                        </div>
                        <div style="display:flex; gap:0.5rem; color:var(--text-muted);">
                            <button class="btn btn-icon" style="background:none; border:none; padding:0.25rem; color:inherit; cursor:pointer;" title="Télécharger">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            </button>
                        </div>
                    </div>
                `;
            } else {
                docsDiv.innerHTML = `<div style="text-align:center; padding: 1rem; color:var(--text-muted); font-size:0.9rem; font-style:italic;">Aucun document ajouté</div>`;
            }
        }
      }

      // Afficher le badge si le profil vient d'une analyse IA
      if (State.analysis && document.getElementById("profile-auto-badge")) {
        document.getElementById("profile-auto-badge").style.display = "inline-block";
      }

      if (form) {
          form.onsubmit = (e) => {
            e.preventDefault();
            const fName = document.getElementById("profile-first-name").value;
            const lName = document.getElementById("profile-last-name").value;
            const expLevel = document.getElementById("profile-experience").value;
            let yrs = 0;
            if (expLevel.includes("Senior")) yrs = 10;
            else if (expLevel.includes("Confirmé")) yrs = 5;
            else if (expLevel.includes("Intermédiaire")) yrs = 3;
            else if (expLevel.includes("Débutant")) yrs = 1;

            State.updateProfile({
              firstName: fName,
              lastName: lName,
              fullName: fName + " " + lName,
              city: document.getElementById("profile-city").value,
              educationLevel: document.getElementById("profile-education").value,
              primaryDomain: document.getElementById("profile-domain").value,
              targetRole: document.getElementById("profile-target").value,
              experienceYears: yrs,
            });

            if (State.analysis && State.analysis.profile) {
              State.analysis.profile.targetRole = document.getElementById("profile-target").value;
              State.analysis.profile.primaryDomain = document.getElementById("profile-domain").value;
              State.analysis.profile.fullName = fName + " " + lName;
              State.analysis.profile.firstName = fName;
              State.analysis.profile.lastName = lName;
              State.analysis.profile.city = document.getElementById("profile-city").value;
              State.analysis.profile.educationLevel = document.getElementById("profile-education").value;
              State.analysis.profile.experienceYears = yrs;
              State.updateAnalysis(State.analysis);
            }

            // Hide save buttons
            const submitDiv = document.getElementById("profile-form-submit");
            if (submitDiv) submitDiv.style.display = "none";

            UI.showToast("Profil enregistré avec succès", "success");
            UI.updateGreeting();
            App.viewControllers.profile();
          };
      }
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
          const provEl = document.getElementById("ai-detected-provider");
          if (provEl) provEl.textContent = def ? def.name : config.provider;
          
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
              if (modelSpan) modelSpan.textContent = displayModel;
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
      const isDemo = typeof DemoState !== "undefined" && DemoState.isActive;
      const analysis = isDemo
        ? DemoState.data || (typeof DemoData !== "undefined" ? DemoData : null)
        : State.analysis;

      const modeBadge = document.getElementById("skills-mode-badge");
      if (modeBadge) {
          modeBadge.innerHTML = isDemo
            ? `<span class="tag tag-medium" style="background:#fef3c7; color:#92400e; border: 1px solid #fde68a;">MODE DÉMO</span>`
            : `<span class="tag" style="background:#e0f2fe; color:#0284c7;">MODE RÉEL</span>`;
      }

      if (!analysis || !analysis.skills) {
          document.getElementById('skills-grid').style.display = 'none';
          document.getElementById('skills-loading-state').style.display = 'none';
          const emptyState = document.getElementById('skills-empty-state');
          if(emptyState) emptyState.style.display = 'block';
          
          document.getElementById("skills-gap-container").innerHTML = "";
          return;
      }

      // Hide empty and loading states
      document.getElementById('skills-loading-state').style.display = 'none';
      const emptyState = document.getElementById('skills-empty-state');
      if(emptyState) emptyState.style.display = 'none';
      document.getElementById('skills-grid').style.display = 'grid';

      let skills = [...(analysis.skills || [])];
      let toDevelop = analysis.skillsToDevelop || [];
      
      // Default level if missing
      skills.forEach(s => {
          if(!s.level) s.level = s.levelPct || 50;
      });

      // Stats
      const total = skills.length;
      const techCount = skills.filter(s => s.category === 'technical').length;
      const softCount = skills.filter(s => s.category === 'soft').length;
      const langCount = skills.filter(s => s.category === 'language').length;
      
      const techPct = total ? Math.round((techCount / total) * 100) : 0;
      const softPct = total ? Math.round((softCount / total) * 100) : 0;
      const langPct = total ? Math.round((langCount / total) * 100) : 0;

      document.getElementById('stat-total').innerText = total;
      
      document.getElementById('stat-tech').innerText = techCount;
      document.getElementById('stat-tech-bar').style.width = `${techPct}%`;
      document.getElementById('stat-tech-pct').innerText = `${techPct}%`;
      
      document.getElementById('stat-soft').innerText = softCount;
      document.getElementById('stat-soft-bar').style.width = `${softPct}%`;
      document.getElementById('stat-soft-pct').innerText = `${softPct}%`;
      
      document.getElementById('stat-lang').innerText = langCount;
      document.getElementById('stat-lang-bar').style.width = `${langPct}%`;
      document.getElementById('stat-lang-pct').innerText = `${langPct}%`;

      // Tabs counts
      document.getElementById('tab-all-count').innerText = `(${total})`;
      document.getElementById('tab-tech-count').innerText = `(${techCount})`;
      document.getElementById('tab-soft-count').innerText = `(${softCount})`;
      document.getElementById('tab-lang-count').innerText = `(${langCount})`;

      // Chart
      document.getElementById('chart-total-val').innerText = total;
      document.getElementById('chart-tech-val').innerText = `${techCount} (${techPct}%)`;
      document.getElementById('chart-soft-val').innerText = `${softCount} (${softPct}%)`;
      document.getElementById('chart-lang-val').innerText = `${langCount} (${langPct}%)`;

      // Render Donut Chart
      const chartContainer = document.getElementById('skills-donut-chart-svg');
      if (chartContainer && total > 0) {
          const radius = 60;
          const circum = 2 * Math.PI * radius;
          
          let techDash = (techPct / 100) * circum;
          let softDash = (softPct / 100) * circum;
          let langDash = (langPct / 100) * circum;
          
          const svg = `
          <svg width="100%" height="100%" viewBox="0 0 160 160" style="transform: rotate(-90deg);">
              <circle cx="80" cy="80" r="${radius}" fill="transparent" stroke="#f1f5f9" stroke-width="20"></circle>
              ${techDash > 0 ? `<circle cx="80" cy="80" r="${radius}" fill="transparent" stroke="#ef4444" stroke-width="20" stroke-dasharray="${techDash} ${circum - techDash}" stroke-dashoffset="0"></circle>` : ''}
              ${softDash > 0 ? `<circle cx="80" cy="80" r="${radius}" fill="transparent" stroke="#16a34a" stroke-width="20" stroke-dasharray="${softDash} ${circum - softDash}" stroke-dashoffset="-${techDash}"></circle>` : ''}
              ${langDash > 0 ? `<circle cx="80" cy="80" r="${radius}" fill="transparent" stroke="#a855f7" stroke-width="20" stroke-dasharray="${langDash} ${circum - langDash}" stroke-dashoffset="-${techDash + softDash}"></circle>` : ''}
          </svg>`;
          chartContainer.innerHTML = svg;
      } else if(chartContainer) {
          chartContainer.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 160 160"><circle cx="80" cy="80" r="60" fill="transparent" stroke="#f1f5f9" stroke-width="20"></circle></svg>`;
      }

      // Render List
      let currentFilter = 'all';
      let currentSearch = '';
      let currentSort = 'level-desc';

      const renderGrid = () => {
          let filtered = skills;
          
          if (currentFilter !== 'all') {
              filtered = filtered.filter(s => s.category === currentFilter);
          }
          if (currentSearch) {
              const term = currentSearch.toLowerCase();
              filtered = filtered.filter(s => s.name.toLowerCase().includes(term));
          }
          
          filtered.sort((a, b) => {
              if (currentSort === 'level-desc') return (b.level || 0) - (a.level || 0);
              if (currentSort === 'level-asc') return (a.level || 0) - (b.level || 0);
              if (currentSort === 'name-asc') return a.name.localeCompare(b.name);
              if (currentSort === 'name-desc') return b.name.localeCompare(a.name);
              return 0;
          });

          const grid = document.getElementById('skills-grid');
          if (!grid) return;
          
          if (filtered.length === 0) {
              grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:2rem; color:var(--text-muted);">Aucune compétence ne correspond à vos critères.</div>`;
              return;
          }

          grid.innerHTML = filtered.map(s => {
              let color = "var(--blue)";
              let bg = "#eff6ff";
              if(s.category === "technical") { color = "#ef4444"; bg = "#fef2f2"; }
              else if(s.category === "soft") { color = "#16a34a"; bg = "#f0fdf4"; }
              else if(s.category === "language") { color = "var(--purple)"; bg = "#faf5ff"; }
              
              let levelTxt = "Débutant";
              if (s.level >= 80) levelTxt = "Expert";
              else if (s.level >= 60) levelTxt = "Avancé";
              else if (s.level >= 40) levelTxt = "Intermédiaire";

              return `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; position: relative;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                      <div style="display: flex; gap: 0.75rem; align-items: center;">
                          <div style="width: 32px; height: 32px; border-radius: 6px; background: ${bg}; color: ${color}; display: flex; align-items: center; justify-content: center;">
                              ${s.category === 'technical' ? '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>' : ''}
                              ${s.category === 'soft' ? '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>' : ''}
                              ${s.category === 'language' ? '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>' : ''}
                              ${!s.category ? '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
                          </div>
                          <div>
                              <h4 style="font-size: 1rem; color: var(--navy); margin: 0; line-height: 1.2;">${s.name}</h4>
                          </div>
                      </div>
                      <div style="display: flex; gap: 0.25rem;">
                          <button class="btn-icon btn-edit-skill" data-id="${s.id || s.name}" style="background:none; border:none; color:var(--text-muted); cursor:pointer; padding:4px;" title="Modifier">
                              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                          </button>
                          <button class="btn-icon btn-delete-skill" data-id="${s.id || s.name}" style="background:none; border:none; color:var(--red); cursor:pointer; padding:4px;" title="Supprimer">
                              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                      </div>
                  </div>
                  <div style="margin-top: auto;">
                      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.4rem;">
                          <span style="color: var(--text-dark); font-weight: 500;">${levelTxt}</span>
                          <span style="color: ${color}; font-weight: 600;">${s.level}%</span>
                      </div>
                      <div style="height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; width: 100%;">
                          <div style="height: 100%; background: ${color}; width: ${s.level}%; border-radius: 3px;"></div>
                      </div>
                  </div>
              </div>`;
          }).join('');

          // Bind edit/delete
          document.querySelectorAll('.btn-edit-skill').forEach(btn => {
              btn.onclick = (e) => {
                  const id = e.currentTarget.getAttribute('data-id');
                  const skill = skills.find(s => (s.id || s.name) === id);
                  if (skill) openSkillModal(skill);
              };
          });
          document.querySelectorAll('.btn-delete-skill').forEach(btn => {
              btn.onclick = (e) => {
                  const id = e.currentTarget.getAttribute('data-id');
                  const skill = skills.find(s => (s.id || s.name) === id);
                  if (skill) openDeleteModal(skill);
              };
          });
      };

      // Events for filters
      const filterBtns = document.querySelectorAll('.btn-filter');
      filterBtns.forEach(btn => {
          // ensure we only bind once by cloning if necessary, or just overwrite onclick
          btn.onclick = (e) => {
              filterBtns.forEach(b => b.classList.remove('active'));
              e.currentTarget.classList.add('active');
              currentFilter = e.currentTarget.getAttribute('data-filter');
              renderGrid();
          };
      });

      const searchInput = document.getElementById('skills-search');
      if (searchInput) {
          searchInput.oninput = (e) => {
              currentSearch = e.target.value;
              renderGrid();
          };
      }

      const sortSelect = document.getElementById('skills-sort');
      if (sortSelect) {
          sortSelect.onchange = (e) => {
              currentSort = e.target.value;
              renderGrid();
          };
      }

      renderGrid();

      // Render Skills to Develop
      const gapContainer = document.getElementById("skills-gap-container");
      if (gapContainer) {
          if (toDevelop.length === 0) {
              gapContainer.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted); font-style:italic;">Aucune compétence à développer identifiée pour le moment.</div>`;
          } else {
              gapContainer.innerHTML = toDevelop.map(s => {
                  let prioColor = s.priority === 'high' ? 'var(--red)' : (s.priority === 'medium' ? '#ca8a04' : 'var(--blue)');
                  let prioBg = s.priority === 'high' ? '#fef2f2' : (s.priority === 'medium' ? '#fefce8' : '#eff6ff');
                  let prioTxt = s.priority === 'high' ? 'Priorité haute' : (s.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse');
                  
                  return `<div style="display: flex; align-items: flex-start; gap: 1rem; padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                      <div style="width: 32px; height: 32px; border-radius: 6px; background: ${prioBg}; color: ${prioColor}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                      </div>
                      <div style="flex: 1;">
                          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem;">
                              <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--navy); margin: 0;">${s.name}</h4>
                              <span style="font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 4px; background: ${prioBg}; color: ${prioColor};">${prioTxt}</span>
                          </div>
                          ${s.reason ? `<p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.4;">${s.reason}</p>` : ''}
                      </div>
                  </div>`;
              }).join('');
          }
      }

      // MODAL LOGIC
      const modalSkill = document.getElementById('modal-skill');
      const modalDelete = document.getElementById('modal-delete');
      
      const openSkillModal = (skill = null) => {
          document.getElementById('modal-skill-title').innerText = skill ? "Modifier la compétence" : "Ajouter une compétence";
          document.getElementById('modal-skill-id').value = skill ? (skill.id || skill.name) : "";
          document.getElementById('modal-skill-original-name').value = skill ? skill.name : "";
          document.getElementById('modal-skill-name').value = skill ? skill.name : "";
          document.getElementById('modal-skill-category').value = skill ? skill.category : "technical";
          const lvl = skill ? (skill.level || skill.levelPct || 50) : 50;
          const range = document.getElementById('modal-skill-level');
          range.value = lvl;
          updateRangeDisplay(lvl);
          
          modalSkill.style.display = 'flex';
      };
      
      const updateRangeDisplay = (val) => {
          let levelTxt = "Débutant";
          if (val >= 80) levelTxt = "Expert";
          else if (val >= 60) levelTxt = "Avancé";
          else if (val >= 40) levelTxt = "Intermédiaire";
          document.getElementById('modal-skill-level-display').innerText = `${val}% (${levelTxt})`;
      };
      
      const rangeInput = document.getElementById('modal-skill-level');
      if (rangeInput) {
          rangeInput.oninput = (e) => updateRangeDisplay(e.target.value);
      }
      
      const closeSkillModal = () => { modalSkill.style.display = 'none'; };
      
      document.getElementById('modal-skill-cancel').onclick = closeSkillModal;
      
      document.querySelectorAll('.btn-add-skill-trigger, #btn-add-skill').forEach(btn => {
          btn.onclick = () => openSkillModal();
      });
      
      document.getElementById('modal-skill-save').onclick = () => {
          const name = document.getElementById('modal-skill-name').value.trim();
          if (!name) return UI.showToast("Le nom de la compétence est requis", "error");
          
          const category = document.getElementById('modal-skill-category').value;
          const level = parseInt(document.getElementById('modal-skill-level').value);
          const originalName = document.getElementById('modal-skill-original-name').value;
          
          if (isDemo) {
             UI.showToast("Sauvegarde simulée en mode démo", "success");
             closeSkillModal();
             return;
          }

          if (originalName) {
              // Edit
              const idx = State.analysis.skills.findIndex(s => s.name === originalName);
              if (idx > -1) {
                  State.analysis.skills[idx].name = name;
                  State.analysis.skills[idx].category = category;
                  State.analysis.skills[idx].level = level;
                  State.analysis.skills[idx].levelPct = level;
              }
          } else {
              // Add
              State.analysis.skills.push({
                  name,
                  category,
                  level,
                  levelPct: level,
                  source: 'manual'
              });
          }
          
          State.updateAnalysis(State.analysis);
          UI.showToast(originalName ? "Compétence modifiée" : "Compétence ajoutée", "success");
          closeSkillModal();
          App.viewControllers.skills();
      };
      
      // Delete logic
      let skillToDelete = null;
      const openDeleteModal = (skill) => {
          skillToDelete = skill;
          document.getElementById('modal-delete-skill-name').innerText = skill.name;
          modalDelete.style.display = 'flex';
      };
      
      document.getElementById('modal-delete-cancel').onclick = () => {
          modalDelete.style.display = 'none';
          skillToDelete = null;
      };
      
      document.getElementById('modal-delete-confirm').onclick = () => {
          if (!skillToDelete) return;
          if (isDemo) {
             UI.showToast("Suppression simulée en mode démo", "success");
             modalDelete.style.display = 'none';
             return;
          }
          
          State.analysis.skills = State.analysis.skills.filter(s => s.name !== skillToDelete.name);
          State.updateAnalysis(State.analysis);
          UI.showToast("Compétence supprimée", "success");
          modalDelete.style.display = 'none';
          App.viewControllers.skills();
      };
    },

    courses() {
      const container = document.getElementById("courses-list-container");
      const loadingState = document.getElementById("courses-loading-state");
      const emptyState = document.getElementById("courses-empty-state");
      
      const isDemo = typeof DemoState !== "undefined" && DemoState.isActive;
      const profile = isDemo ? (DemoState.data || (typeof DemoData !== "undefined" ? DemoData : null)) : State.analysis;
      
      const modeBadge = document.getElementById("courses-mode-badge");
      if (modeBadge) {
          modeBadge.innerHTML = isDemo
            ? `<span class="tag tag-medium" style="background:#fef3c7; color:#92400e; border: 1px solid #fde68a;">MODE DÉMO</span>`
            : `<span class="tag" style="background:#e0f2fe; color:#0284c7;">MODE RÉEL</span>`;
      }

      if (!profile) {
          container.style.display = "none";
          loadingState.style.display = "none";
          emptyState.style.display = "block";
          document.getElementById("courses-empty-title").innerText = "Veuillez analyser votre CV d'abord.";
          document.getElementById("courses-empty-desc").innerText = "Les recommandations de formations nécessitent un profil analysé.";
          document.getElementById("courses-empty-actions").innerHTML = `<button class="btn btn-primary" onclick="App.navigate('upload')">Analyser mon CV</button>`;
          return;
      }
      
      // Populate filters sidebar based on profile
      const sectorSelect = document.getElementById("filter-sector");
      if (sectorSelect && typeof Sectors !== 'undefined') {
          sectorSelect.innerHTML = `<option value="all">Tous les secteurs</option>` + 
              Sectors.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
          if (profile.profile && (profile.profile.primaryDomain || profile.profile.domain)) {
              let pDom = profile.profile.primaryDomain || profile.profile.domain;
              if (typeof window.SectorsHelper !== 'undefined') pDom = window.SectorsHelper.normalizeSector(pDom);
              sectorSelect.value = pDom;
          }
      }
      
      const skillSelect = document.getElementById("filter-skill");
      if (skillSelect && profile.skills) {
          skillSelect.innerHTML = `<option value="">Toutes les compétences</option>` + 
              profile.skills.map(s => `<option value="${s.name}">${s.name}</option>`).join("");
      }

      // Prepare UI states
      const showLoading = () => {
          container.style.display = "none";
          emptyState.style.display = "none";
          loadingState.style.display = "flex";
      };
      
      const showEmpty = () => {
          container.style.display = "none";
          loadingState.style.display = "none";
          emptyState.style.display = "block";
      };
      
      const showCourses = () => {
          loadingState.style.display = "none";
          emptyState.style.display = "none";
          container.style.display = "flex";
      };
      
      let allFetchedCourses = [];
      
      const renderDetailedCourseCard = (course) => {
          const title = course.title || "Formation Inconnue";
          const provider = course.provider || course.sourceDomain || course.category || "Source inconnue";
          const level = course.level || "Tous niveaux";
          const duration = course.duration || "Non spécifié";
          const isOnline = course.format === 'offline' ? false : true;
          const isFree = !!course.isFree;
          const isCert = !!course.isCert;
          const rating = course.rating || null;
          const ratingCount = course.ratingCount || null;
          const skills = course.skills || (course.focus ? [course.focus] : []);
          const id = course.id || title;
          
          const initial = provider.charAt(0).toUpperCase();
          const colors = ['#1e3a8a', '#1d4ed8', '#0369a1', '#0f766e', '#4338ca', '#6d28d9'];
          const bgColor = colors[provider.length % colors.length];

          // Use JSON.stringify for safe data attribute embedding
          const safeCourseObj = encodeURIComponent(JSON.stringify(course));

          return `
          <div class="card course-card" style="display: flex; gap: 1.5rem; padding: 1.5rem; position: relative; transition: all 0.2s; border: 1px solid transparent; background: white;" 
              onmouseover="this.style.borderColor='var(--border-color)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1)';" 
              onmouseout="this.style.borderColor='transparent'; this.style.boxShadow='var(--shadow)';">
              
              <div style="width: 80px; height: 80px; border-radius: 8px; background: ${bgColor}; color: white; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; font-weight: 700; flex-shrink: 0; overflow: hidden; font-family: sans-serif;">
                  ${initial}
              </div>
              
              <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem; min-width: 0;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
                      <div>
                          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--navy); margin: 0 0 0.25rem 0; line-height: 1.3;">${title}</h3>
                          <div style="font-size: 0.9rem; color: var(--text-muted);">${provider}</div>
                      </div>
                      ${rating ? `
                      <div style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); flex-shrink: 0;">
                          <svg width="14" height="14" fill="#eab308" stroke="#eab308" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                          ${rating} ${ratingCount ? `<span style="color:var(--text-muted); font-weight:normal;">(${ratingCount})</span>` : ''}
                      </div>
                      ` : ''}
                  </div>
                  
                  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.25rem;">
                      ${skills.slice(0, 4).map(s => `<span style="font-size: 0.75rem; padding: 0.2rem 0.5rem; background: #f1f5f9; color: var(--text-dark); border-radius: 4px;">${s}</span>`).join('')}
                      ${skills.length > 4 ? `<span style="font-size: 0.75rem; padding: 0.2rem 0.5rem; color: var(--text-muted);">+${skills.length - 4}</span>` : ''}
                  </div>
                  
                  <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0 0 0; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                      ${course.description || "Aucune description détaillée n'est disponible pour cette formation."}
                  </p>
              </div>
              
              <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; flex-shrink: 0; min-width: 150px; border-left: 1px solid var(--border-color); padding-left: 1.5rem; margin-left: 0.5rem;">
                  <div style="display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-start; width: 100%; margin-bottom: 1rem;">
                      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-dark);">
                          <svg width="14" height="14" fill="none" stroke="var(--text-muted)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          ${duration}
                      </div>
                      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-dark);">
                          <svg width="14" height="14" fill="none" stroke="var(--blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                          ${level}
                      </div>
                      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; ${isOnline ? 'color: var(--green);' : 'color: var(--text-dark);'}">
                          ${isOnline 
                              ? '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> En ligne'
                              : '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Présentiel'}
                      </div>
                      ${isFree ? '<div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #14b8a6;"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Gratuite</div>' : ''}
                      ${isCert ? '<div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #8b5cf6;"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg> Certifiante</div>' : ''}
                  </div>
                  
                  <div style="display: flex; gap: 0.5rem; width: 100%;">
                      <button class="btn-icon btn-save-course" data-id="${id}" style="background: none; border: 1px solid var(--border-color); color: var(--text-muted); border-radius: 6px; padding: 0.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0;" title="Enregistrer">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                      </button>
                      <button class="btn btn-primary btn-view-course" data-course="${safeCourseObj}" style="flex: 1; padding: 0.5rem; font-size: 0.85rem; display: flex; justify-content: center; gap: 0.25rem;">
                          Voir <span style="display:none; @media(min-width:1200px){display:inline;}">la formation</span> &rarr;
                      </button>
                  </div>
              </div>
          </div>`;
      };
      
      const filterAndRender = () => {
          if (!allFetchedCourses || allFetchedCourses.length === 0) return;
          
          let filtered = [...allFetchedCourses];
          
          // Tab filters
          const activeTab = document.querySelector('.btn-filter.active').getAttribute('data-filter');
          if (activeTab === 'online') filtered = filtered.filter(c => c.format !== 'offline');
          else if (activeTab === 'offline') filtered = filtered.filter(c => c.format === 'offline');
          else if (activeTab === 'free') filtered = filtered.filter(c => c.isFree);
          else if (activeTab === 'cert') filtered = filtered.filter(c => c.isCert);
          
          // Sidebar filters
          const targetSector = sectorSelect.value;
          if (targetSector && targetSector !== 'all') {
              // Basic fuzzy filter since courses don't always strictly match sector IDs
              filtered = filtered.filter(c => {
                 if (c.domain === targetSector) return true;
                 // As a fallback, check if tags include words from sector
                 const sName = Sectors.find(s=>s.id===targetSector)?.name.toLowerCase() || '';
                 const sWords = sName.split(/\s+|&|\|/).filter(w => w.length > 3);
                 const tagsStr = (c.skills || []).join(" ").toLowerCase();
                 return sWords.some(w => tagsStr.includes(w));
              });
          }
          
          const skillVal = document.getElementById('filter-skill').value;
          if (skillVal) {
              const term = skillVal.toLowerCase();
              filtered = filtered.filter(c => (c.skills || []).some(s => s.toLowerCase().includes(term)) || (c.title || '').toLowerCase().includes(term));
          }
          
          const durVal = document.getElementById('filter-duration').value;
          if (durVal) {
             filtered = filtered.filter(c => {
                 const d = (c.duration || "").toLowerCase();
                 let h = 0;
                 const match = d.match(/(\d+)\s*(h|heure)/);
                 if (match) h = parseInt(match[1]);
                 if (!h && d.includes('semaine')) h = 20; // fallback
                 
                 if (durVal === 'short') return h > 0 && h < 10;
                 if (durVal === 'medium') return h >= 10 && h <= 30;
                 if (durVal === 'long') return h > 30 && h <= 60;
                 if (durVal === 'xl') return h > 60;
                 return true;
             });
          }
          
          const types = Array.from(document.querySelectorAll('.filter-type:checked')).map(el => el.value);
          if (types.length > 0) {
              filtered = filtered.filter(c => {
                 return (types.includes('online') && c.format !== 'offline') ||
                        (types.includes('offline') && c.format === 'offline') ||
                        (types.includes('free') && c.isFree) ||
                        (types.includes('cert') && c.isCert);
              });
          }
          
          const levels = Array.from(document.querySelectorAll('.filter-level:checked')).map(el => el.value.toLowerCase());
          if (levels.length > 0) {
              filtered = filtered.filter(c => {
                 const l = (c.level || "").toLowerCase();
                 return levels.some(lv => l.includes(lv));
              });
          }
          
          const searchVal = document.getElementById('courses-search').value.toLowerCase().trim();
          if (searchVal) {
              filtered = filtered.filter(c => 
                  (c.title || "").toLowerCase().includes(searchVal) || 
                  (c.provider || "").toLowerCase().includes(searchVal) ||
                  (c.skills || []).join(" ").toLowerCase().includes(searchVal)
              );
          }
          
          // Sort
          const sortVal = document.getElementById('courses-sort').value;
          filtered.sort((a, b) => {
              if (sortVal === 'relevance') return (b.relevanceScore || 0) - (a.relevanceScore || 0);
              if (sortVal === 'recent') return 0; // Assuming API returns recent or we don't have dates
              if (sortVal === 'level') return (a.level || "").localeCompare(b.level || "");
              if (sortVal === 'duration') {
                  const parseH = (d) => { let match = (d||"").match(/(\d+)/); return match ? parseInt(match[1]) : 0; };
                  return parseH(a.duration) - parseH(b.duration);
              }
              return 0;
          });
          
          // Render
          if (filtered.length === 0) {
              showEmpty();
              document.getElementById("courses-empty-title").innerText = "Aucune formation trouvée";
              document.getElementById("courses-empty-desc").innerText = "Essayez de modifier vos filtres ou d'élargir votre recherche.";
              document.getElementById("courses-empty-actions").innerHTML = `<button class="btn btn-secondary" onclick="document.getElementById('btn-reset-filters').click()">Réinitialiser les filtres</button>`;
          } else {
              showCourses();
              container.innerHTML = filtered.map(c => renderDetailedCourseCard(c)).join("");
              bindCourseEvents();
          }
      };
      
      const bindCourseEvents = () => {
          document.querySelectorAll('.btn-view-course').forEach(btn => {
              btn.onclick = (e) => {
                  const encoded = e.currentTarget.getAttribute('data-course');
                  if(encoded) {
                      try {
                          const course = JSON.parse(decodeURIComponent(encoded));
                          openCourseModal(course);
                      } catch(err) { console.error("Error parsing course data", err); }
                  }
              };
          });
          
          document.querySelectorAll('.btn-save-course').forEach(btn => {
              btn.onclick = (e) => {
                  const icon = e.currentTarget.querySelector('svg');
                  icon.setAttribute('fill', 'currentColor');
                  icon.style.color = 'var(--blue)';
                  UI.showToast("Formation enregistrée", "success");
              };
          });
      };
      
      const openCourseModal = (c) => {
          const m = document.getElementById('modal-course');
          if(!m) return;
          
          const provider = c.provider || c.sourceDomain || c.category || "Source inconnue";
          const colors = ['#1e3a8a', '#1d4ed8', '#0369a1', '#0f766e', '#4338ca', '#6d28d9'];
          const bgColor = colors[provider.length % colors.length];
          
          document.getElementById('modal-course-logo').innerText = provider.charAt(0).toUpperCase();
          document.getElementById('modal-course-logo').style.background = bgColor;
          document.getElementById('modal-course-title').innerText = c.title || "Titre inconnu";
          document.getElementById('modal-course-provider').innerText = provider;
          
          document.getElementById('modal-course-level').innerText = c.level || "Tous niveaux";
          document.getElementById('modal-course-duration').innerText = c.duration || "Non spécifié";
          document.getElementById('modal-course-format').innerText = c.format === 'offline' ? "Présentiel" : "En ligne";
          
          const certEl = document.getElementById('modal-course-cert-container');
          if (c.isCert) certEl.style.display = 'flex';
          else certEl.style.display = 'none';
          
          document.getElementById('modal-course-desc').innerText = c.description || "Aucune description complète disponible.";
          
          const tags = c.skills || (c.focus ? [c.focus] : []);
          document.getElementById('modal-course-tags').innerHTML = tags.map(t => `<span style="font-size: 0.8rem; padding: 0.3rem 0.6rem; background: #eff6ff; color: var(--blue); border-radius: 4px; border: 1px solid #bfdbfe;">${t}</span>`).join('');
          
          document.getElementById('modal-course-price').innerText = c.isFree ? "Gratuit" : (c.price || "Sur devis");
          document.getElementById('modal-course-date').innerText = c.retrievedAt ? `Données du ${c.retrievedAt}` : "";
          
          const linkBtn = document.getElementById('modal-course-link');
          if (c.url) {
              linkBtn.href = c.url;
              linkBtn.style.display = 'flex';
              linkBtn.innerHTML = `Accéder à la formation <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`;
          } else {
              linkBtn.href = "#";
              linkBtn.style.display = 'flex';
              linkBtn.innerHTML = "Source non disponible";
              linkBtn.onclick = (e) => { e.preventDefault(); UI.showToast("URL source non disponible", "warning"); };
          }
          
          m.style.display = 'flex';
      };
      
      const closeCourseModal = () => {
          const m = document.getElementById('modal-course');
          if(m) m.style.display = 'none';
      };
      
      const closeBtn = document.getElementById('modal-course-close');
      if (closeBtn) closeBtn.onclick = closeCourseModal;
      
      // Events
      let searchTimeout;
      const searchInput = document.getElementById('courses-search');
      if (searchInput) {
          searchInput.oninput = () => {
              clearTimeout(searchTimeout);
              searchTimeout = setTimeout(filterAndRender, 300);
          };
      }
      
      document.getElementById('courses-sort').onchange = filterAndRender;
      document.getElementById('filter-sector').onchange = filterAndRender;
      document.getElementById('filter-skill').onchange = filterAndRender;
      document.getElementById('filter-duration').onchange = filterAndRender;
      
      document.querySelectorAll('.filter-type, .filter-level').forEach(cb => {
          cb.onchange = filterAndRender;
      });
      
      const filterTabs = document.querySelectorAll('.btn-filter');
      filterTabs.forEach(btn => {
          btn.onclick = (e) => {
              filterTabs.forEach(b => b.classList.remove('active'));
              e.currentTarget.classList.add('active');
              filterAndRender();
          };
      });
      
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
          resetBtn.onclick = () => {
              document.getElementById('courses-search').value = "";
              document.getElementById('courses-sort').value = "relevance";
              if (profile.profile && (profile.profile.primaryDomain || profile.profile.domain)) {
                  let pDom = profile.profile.primaryDomain || profile.profile.domain;
                  if (typeof window.SectorsHelper !== 'undefined') pDom = window.SectorsHelper.normalizeSector(pDom);
                  document.getElementById('filter-sector').value = pDom;
              } else {
                  document.getElementById('filter-sector').value = "all";
              }
              document.getElementById('filter-skill').value = "";
              document.getElementById('filter-duration').value = "";
              document.querySelectorAll('.filter-type, .filter-level').forEach(cb => cb.checked = false);
              
              filterTabs.forEach(b => b.classList.remove('active'));
              document.querySelector('.btn-filter[data-filter="all"]').classList.add('active');
              
              filterAndRender();
          };
      }

      const fetchCourses = async (force) => {
        showLoading();
        try {
          // Use WebSearch cache which is tied to the profile hash or sector
          const results = await WebSearch.searchCourses(profile, force);
          allFetchedCourses = results || [];
          
          // Update Tab Counts
          document.getElementById('courses-tab-all-count').innerText = `(${allFetchedCourses.length})`;
          document.getElementById('courses-tab-online-count').innerText = `(${allFetchedCourses.filter(c=>c.format !== 'offline').length})`;
          document.getElementById('courses-tab-offline-count').innerText = `(${allFetchedCourses.filter(c=>c.format === 'offline').length})`;
          document.getElementById('courses-tab-free-count').innerText = `(${allFetchedCourses.filter(c=>c.isFree).length})`;
          document.getElementById('courses-tab-cert-count').innerText = `(${allFetchedCourses.filter(c=>c.isCert).length})`;
          
          // Populate Bottom Sections
          const recContainer = document.getElementById('courses-recommended-container');
          if (recContainer) {
              const recommended = [...allFetchedCourses].sort((a,b)=>(b.relevanceScore||0)-(a.relevanceScore||0)).slice(0, 2);
              recContainer.innerHTML = recommended.map(c => {
                  let reason = "Correspond à votre secteur";
                  if (profile.skillsToDevelop && profile.skillsToDevelop.length > 0) {
                      reason = "Correspond à votre compétence à développer";
                  }
                  return `<div class="card" style="padding:1rem; display:flex; gap:1rem; cursor:pointer; background:#f8fafc; box-shadow:none; border:1px solid var(--border-color);" onclick="document.querySelector('.btn-view-course[data-id=\'${c.id||c.title}\']').click()">
                      <div style="width:40px; height:40px; border-radius:6px; background:var(--navy); color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0;">${(c.provider||c.title).charAt(0).toUpperCase()}</div>
                      <div>
                          <h4 style="font-size:0.95rem; color:var(--navy); margin:0 0 0.2rem 0;">${c.title}</h4>
                          <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.25rem;">${c.provider || 'Source inconnue'}</div>
                          <span style="font-size:0.7rem; padding:0.1rem 0.4rem; background:#e0f2fe; color:var(--blue); border-radius:4px;">${reason}</span>
                      </div>
                  </div>`;
              }).join('');
              if (recommended.length === 0) recContainer.innerHTML = "<p style='color:var(--text-muted); font-size:0.85rem;'>Pas de recommandations.</p>";
          }
          
          const pathContainer = document.getElementById('courses-path-container');
          if (pathContainer) {
              pathContainer.innerHTML = `
                  <div style="position:relative;">
                      <div style="position:absolute; left:-29px; top:0; width:20px; height:20px; border-radius:50%; background:white; border:2px solid var(--blue); display:flex; align-items:center; justify-content:center; font-size:0.6rem; font-weight:bold; color:var(--blue);">1</div>
                      <h4 style="font-size:0.9rem; color:var(--navy); margin:0 0 0.2rem 0;">Maîtriser les bases</h4>
                      <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Suivez les formations fondamentales de votre secteur</p>
                  </div>
                  <div style="position:relative;">
                      <div style="position:absolute; left:-29px; top:0; width:20px; height:20px; border-radius:50%; background:white; border:2px solid var(--blue); display:flex; align-items:center; justify-content:center; font-size:0.6rem; font-weight:bold; color:var(--blue);">2</div>
                      <h4 style="font-size:0.9rem; color:var(--navy); margin:0 0 0.2rem 0;">Développer vos compétences avancées</h4>
                      <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Approfondissez les outils et technologies clés</p>
                  </div>
                  <div style="position:relative;">
                      <div style="position:absolute; left:-29px; top:0; width:20px; height:20px; border-radius:50%; background:white; border:2px solid var(--border-color); display:flex; align-items:center; justify-content:center; font-size:0.6rem; font-weight:bold; color:var(--text-muted);">3</div>
                      <h4 style="font-size:0.9rem; color:var(--navy); margin:0 0 0.2rem 0;">Obtenir une certification</h4>
                      <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Validez vos compétences avec des certifications reconnues</p>
                  </div>
              `;
          }
          
          const catContainer = document.getElementById('courses-categories-container');
          if (catContainer) {
              const cats = {};
              allFetchedCourses.forEach(c => {
                  const cat = c.category || c.focus || "Autre";
                  cats[cat] = (cats[cat] || 0) + 1;
              });
              const sortedCats = Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0, 4);
              catContainer.innerHTML = sortedCats.map((cat, idx) => {
                  const colors = ['#eff6ff', '#f0fdf4', '#faf5ff', '#fffbeb'];
                  const icons = ['#3b82f6', '#16a34a', '#a855f7', '#d97706'];
                  return `
                  <div style="display:flex; align-items:center; gap:0.75rem;">
                      <div style="width:32px; height:32px; border-radius:6px; background:${colors[idx%colors.length]}; color:${icons[idx%icons.length]}; display:flex; align-items:center; justify-content:center;">
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                      </div>
                      <div>
                          <h4 style="font-size:0.9rem; color:var(--navy); margin:0;">${cat[0]}</h4>
                          <div style="font-size:0.75rem; color:var(--text-muted);">${cat[1]} formation${cat[1]>1?'s':''}</div>
                      </div>
                  </div>
                  `;
              }).join('');
          }
          
          filterAndRender();
          
        } catch (e) {
          showEmpty();
          if (e.message.includes("Quota IA épuisé") || e.message.includes("prend pas en charge")) {
              document.getElementById("courses-empty-title").innerText = "Recherche Web non disponible";
              document.getElementById("courses-empty-desc").innerText = e.message;
              document.getElementById("courses-empty-actions").innerHTML = `<button class="btn btn-primary" onclick="App.navigate('demo')">Utiliser le mode démo</button>`;
          } else {
              document.getElementById("courses-empty-title").innerText = "Impossible de charger les formations.";
              document.getElementById("courses-empty-desc").innerText = "Une erreur est survenue lors de la récupération des données.";
              document.getElementById("courses-empty-actions").innerHTML = `<button class="btn btn-primary" onclick="document.getElementById('refresh-courses-btn').click()">Réessayer</button>`;
          }
        }
      };

      const refreshBtn = document.getElementById("refresh-courses-btn");
      if (refreshBtn) {
        refreshBtn.onclick = () => {
          fetchCourses(true);
        };
      }

      // Initial Fetch
      fetchCourses(false);
    },

    opportunities() {
      const container = document.getElementById("opportunities-list-container");
      const loadingState = document.getElementById("opportunities-loading-state");
      const emptyState = document.getElementById("opportunities-empty-state");
      
      const isDemo = typeof DemoState !== "undefined" && DemoState.isActive;
      const profile = isDemo ? (DemoState.data || (typeof DemoData !== "undefined" ? DemoData : null)) : State.analysis;
      
      const modeBadge = document.getElementById("opportunities-mode-badge");
      if (modeBadge) {
          modeBadge.innerHTML = isDemo
            ? `<span class="tag tag-medium" style="background:#fef3c7; color:#92400e; border: 1px solid #fde68a;">MODE DÉMO</span>`
            : `<span class="tag" style="background:#e0f2fe; color:#0284c7;">MODE RÉEL</span>`;
      }

      if (!profile) {
          container.style.display = "none";
          loadingState.style.display = "none";
          emptyState.style.display = "block";
          document.getElementById("opp-empty-title").innerText = "Veuillez analyser votre CV d'abord.";
          document.getElementById("opp-empty-desc").innerText = "Les recommandations d'opportunités nécessitent un profil analysé.";
          document.getElementById("opp-empty-actions").innerHTML = `<button class="btn btn-primary" onclick="App.navigate('upload')">Analyser mon CV</button>`;
          return;
      }
      
      // Populate filters sidebar based on profile
      const sectorSelect = document.getElementById("opp-filter-sector");
      if (sectorSelect && typeof Sectors !== 'undefined') {
          sectorSelect.innerHTML = `<option value="all">Tous les secteurs</option>` + 
              Sectors.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
          if (profile.profile && (profile.profile.primaryDomain || profile.profile.domain)) {
              let pDom = profile.profile.primaryDomain || profile.profile.domain;
              if (typeof window.SectorsHelper !== 'undefined') pDom = window.SectorsHelper.normalizeSector(pDom);
              sectorSelect.value = pDom;
          }
      }
      
      // Prepare UI states
      const showLoading = () => {
          container.style.display = "none";
          emptyState.style.display = "none";
          loadingState.style.display = "flex";
      };
      
      const showEmpty = () => {
          container.style.display = "none";
          loadingState.style.display = "none";
          emptyState.style.display = "block";
      };
      
      const showOpps = () => {
          loadingState.style.display = "none";
          emptyState.style.display = "none";
          container.style.display = "flex";
      };
      
      let allFetchedOpps = [];
      
      const renderDetailedJobCard = (job) => {
          const title = job.title || "Titre inconnu";
          const company = job.company || "Entreprise non précisée";
          const location = job.location || job.city || "Non spécifié";
          const contract = job.type || job.contractType || "CDI";
          const workMode = job.workMode || (location.toLowerCase() === 'remote' ? 'Remote' : 'Sur site');
          const experience = job.experienceLevel || job.experience || job.level || "Tous niveaux";
          const date = job.publishedDate || job.publishedAt || (job.retrievedAt ? `Vérifié le ${job.retrievedAt}` : "Récemment");
          
          let score = job.matchScore || job.relevanceScore || 0;
          let scoreColor = score >= 80 ? "var(--green)" : score >= 50 ? "#ca8a04" : "var(--red)";
          
          const isLive = job.sourceType === "web";
          const sourceBadge = isLive
            ? `<span class="tag" style="background:#e0f2fe; color:#0284c7; padding: 2px 6px; font-size: 0.7rem;">LIVE</span>`
            : `<span class="tag tag-medium" style="padding: 2px 6px; font-size: 0.7rem;">DEMO</span>`;
            
          const initial = company.charAt(0).toUpperCase();
          const colors = ['#0284c7', '#ea580c', '#16a34a', '#eab308', '#9333ea', '#dc2626'];
          const bgColor = colors[company.length % colors.length];
          
          const id = job.id || encodeURIComponent(title+company);
          const safeJobObj = encodeURIComponent(JSON.stringify(job));
          
          return `
          <div class="card opp-card" style="display: flex; gap: 1.5rem; padding: 1.5rem; position: relative; transition: all 0.2s; border: 1px solid var(--border-color); background: white; box-shadow:none;" 
              onmouseover="this.style.borderColor='var(--blue)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1)';" 
              onmouseout="this.style.borderColor='var(--border-color)'; this.style.boxShadow='none';">
              
              <div style="width: 64px; height: 64px; border-radius: 12px; background: ${bgColor}; color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; flex-shrink: 0; overflow: hidden; font-family: sans-serif;">
                  ${initial}
              </div>
              
              <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem; min-width: 0;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
                      <div>
                          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--navy); margin: 0 0 0.25rem 0; line-height: 1.3;">${title} ${sourceBadge}</h3>
                          <div style="font-size: 0.95rem; color: var(--text-dark); font-weight: 500;">${company} <span style="color:var(--text-muted); font-weight:normal;">• ${location}</span></div>
                      </div>
                      ${score > 0 ? `
                      <div style="display: flex; flex-direction:column; align-items: flex-end; gap: 0.1rem; flex-shrink: 0;">
                          <strong style="color:${scoreColor}; font-size:1rem;">${score}%</strong>
                          <span style="font-size:0.75rem; color:var(--text-muted);">Correspondance</span>
                      </div>
                      ` : ''}
                  </div>
                  
                  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.25rem;">
                      <span style="font-size: 0.75rem; padding: 0.2rem 0.5rem; background: #eff6ff; color: var(--blue); border-radius: 4px; border:1px solid #bfdbfe;">${contract}</span>
                      <span style="font-size: 0.75rem; padding: 0.2rem 0.5rem; background: #f0fdf4; color: #16a34a; border-radius: 4px; border:1px solid #bbf7d0;">${workMode}</span>
                      <span style="font-size: 0.75rem; padding: 0.2rem 0.5rem; background: #fefce8; color: #ca8a04; border-radius: 4px; border:1px solid #fef08a;">${experience}</span>
                  </div>
                  
                  <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0 0 0; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                      ${job.description || "Aucune description détaillée n'est disponible pour ce poste."}
                  </p>
                  
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; border-top:1px solid var(--border-color); padding-top:1rem;">
                      <div style="font-size:0.8rem; color:var(--text-muted);">${date}</div>
                      <div style="display: flex; gap: 0.5rem;">
                          <button class="btn-icon btn-save-opp" data-id="${id}" style="background: none; border: 1px solid var(--border-color); color: var(--text-muted); border-radius: 6px; padding: 0.4rem 0.6rem; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Enregistrer">
                              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                          </button>
                          <button class="btn btn-primary btn-view-opp" data-job="${safeJobObj}" style="padding: 0.4rem 1rem; font-size: 0.85rem;">
                              Voir l'offre
                          </button>
                      </div>
                  </div>
              </div>
          </div>`;
      };
      
      const filterAndRender = () => {
          if (!allFetchedOpps || allFetchedOpps.length === 0) return;
          
          let filtered = [...allFetchedOpps];
          
          // Tab filters
          const activeTab = document.querySelector('.btn-filter-opp.active').getAttribute('data-filter');
          if (activeTab === 'emploi') filtered = filtered.filter(j => { const t = (j.type||"").toLowerCase(); return t.includes('cdi') || t.includes('cdd') || t.includes('emploi'); });
          else if (activeTab === 'stage') filtered = filtered.filter(j => (j.type||"").toLowerCase().includes('stage'));
          else if (activeTab === 'freelance') filtered = filtered.filter(j => (j.type||"").toLowerCase().includes('freelance'));
          else if (activeTab === 'remote') filtered = filtered.filter(j => (j.workMode||j.location||"").toLowerCase().includes('remote') || (j.workMode||"").toLowerCase().includes('télétravail'));
          
          // Sidebar filters
          const targetSector = sectorSelect.value;
          if (targetSector && targetSector !== 'all') {
              filtered = filtered.filter(j => {
                 if (j.domain === targetSector || j.sector === targetSector) return true;
                 const sName = Sectors.find(s=>s.id===targetSector)?.name.toLowerCase() || '';
                 const sWords = sName.split(/\s+|&|\|/).filter(w => w.length > 3);
                 const tagsStr = ((j.skills||[]).join(" ") + " " + (j.sector||"")).toLowerCase();
                 return sWords.some(w => tagsStr.includes(w));
              });
          }
          
          const selContracts = Array.from(document.querySelectorAll('.opp-filter-contract:checked')).map(el => el.value);
          if (selContracts.length > 0) {
              filtered = filtered.filter(j => {
                  const t = (j.type||"").toLowerCase();
                  return selContracts.some(c => t.includes(c));
              });
          }
          
          const selWorkModes = Array.from(document.querySelectorAll('.opp-filter-workmode:checked')).map(el => el.value);
          if (selWorkModes.length > 0) {
              filtered = filtered.filter(j => {
                  const m = (j.workMode||j.location||"").toLowerCase();
                  if (selWorkModes.includes('remote') && (m.includes('remote') || m.includes('télétravail'))) return true;
                  if (selWorkModes.includes('hybrid') && m.includes('hybrid')) return true;
                  if (selWorkModes.includes('onsite') && !m.includes('remote') && !m.includes('hybrid')) return true;
                  return false;
              });
          }
          
          const expVal = document.getElementById('opp-filter-experience').value;
          if (expVal) {
             filtered = filtered.filter(j => (j.experienceLevel||j.experience||"").toLowerCase().includes(expVal.toLowerCase()));
          }
          
          const locVal = document.getElementById('opp-filter-location').value;
          if (locVal) {
             filtered = filtered.filter(j => (j.location||j.city||"").toLowerCase().includes(locVal.toLowerCase()));
          }
          
          const searchVal = document.getElementById('opp-search').value.toLowerCase().trim();
          if (searchVal) {
              filtered = filtered.filter(j => 
                  (j.title || "").toLowerCase().includes(searchVal) || 
                  (j.company || "").toLowerCase().includes(searchVal) ||
                  (j.skills || []).join(" ").toLowerCase().includes(searchVal) ||
                  (j.location || "").toLowerCase().includes(searchVal)
              );
          }
          
          // Sort
          const sortVal = document.getElementById('opp-sort').value;
          filtered.sort((a, b) => {
              if (sortVal === 'relevance' || sortVal === 'match') {
                  const sa = a.matchScore || a.relevanceScore || 0;
                  const sb = b.matchScore || b.relevanceScore || 0;
                  return sb - sa;
              }
              if (sortVal === 'recent') return 0; // If date exists we'd parse it
              return 0;
          });
          
          // Render
          if (filtered.length === 0) {
              showEmpty();
          } else {
              showOpps();
              container.innerHTML = filtered.map(j => renderDetailedJobCard(j)).join("");
              bindJobEvents();
          }
      };
      
      const bindJobEvents = () => {
          document.querySelectorAll('.btn-view-opp').forEach(btn => {
              btn.onclick = (e) => {
                  const encoded = e.currentTarget.getAttribute('data-job');
                  if(encoded) {
                      try {
                          const job = JSON.parse(decodeURIComponent(encoded));
                          openJobModal(job);
                      } catch(err) { console.error("Error parsing job data", err); }
                  }
              };
          });
          
          document.querySelectorAll('.btn-save-opp').forEach(btn => {
              btn.onclick = (e) => {
                  const icon = e.currentTarget.querySelector('svg');
                  icon.setAttribute('fill', 'currentColor');
                  icon.style.color = 'var(--blue)';
                  UI.showToast("Opportunité enregistrée", "success");
              };
          });
      };
      
      const openJobModal = (j) => {
          const m = document.getElementById('modal-job');
          if(!m) return;
          
          const company = j.company || "Entreprise non précisée";
          const colors = ['#0284c7', '#ea580c', '#16a34a', '#eab308', '#9333ea', '#dc2626'];
          const bgColor = colors[company.length % colors.length];
          
          const logoEl = document.getElementById('modal-job-logo');
          logoEl.innerText = company.charAt(0).toUpperCase();
          logoEl.style.background = bgColor;
          
          document.getElementById('modal-job-title').innerText = j.title || "Titre inconnu";
          document.getElementById('modal-job-company').innerText = company;
          document.getElementById('modal-job-location').innerText = j.location || j.city || "Non spécifié";
          document.getElementById('modal-job-contract').innerText = j.type || j.contractType || "CDI";
          document.getElementById('modal-job-workmode').innerText = j.workMode || (j.location && j.location.toLowerCase()==='remote' ? 'Remote' : 'Sur site');
          document.getElementById('modal-job-exp').innerText = j.experienceLevel || j.experience || "Tous niveaux";
          document.getElementById('modal-job-sector').innerText = j.sector || j.domain || "Non spécifié";
          document.getElementById('modal-job-date').innerText = j.publishedDate || j.publishedAt || (j.retrievedAt ? j.retrievedAt : "Récemment");
          
          const sourceLink = j.sourceDomain ? `<a href="${j.url||'#'}" target="_blank" style="color:var(--blue);">${j.sourceDomain}</a>` : (j.source || "Source interne");
          document.getElementById('modal-job-source').innerHTML = sourceLink;
          
          document.getElementById('modal-job-desc').innerText = j.description || "Aucune description détaillée n'est disponible.";
          
          const skills = [...(j.requiredSkills||[]), ...(j.preferredSkills||[]), ...(j.skills||[])];
          const userSkills = (profile.skills||[]).map(s=>s.name.toLowerCase());
          
          document.getElementById('modal-job-skills').innerHTML = skills.map(s => {
              const hasIt = userSkills.some(u => u.includes(s.toLowerCase()) || s.toLowerCase().includes(u));
              if(hasIt) return `<span class="tag" style="background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0;">✓ ${s}</span>`;
              return `<span class="tag" style="background:#f1f5f9; color:var(--text-dark); border:1px solid var(--border-color);">${s}</span>`;
          }).join('');
          
          const score = j.matchScore || j.relevanceScore || 0;
          const matchContainer = document.getElementById('modal-job-match-container');
          if (score > 0) {
              matchContainer.style.display = 'block';
              document.getElementById('modal-job-match-score').innerText = score + '%';
              matchContainer.style.background = score >= 80 ? '#f0fdf4' : (score >= 50 ? '#fefce8' : '#fef2f2');
              matchContainer.style.borderColor = score >= 80 ? '#bbf7d0' : (score >= 50 ? '#fef08a' : '#fecaca');
              document.getElementById('modal-job-match-score').style.color = score >= 80 ? '#16a34a' : (score >= 50 ? '#ca8a04' : '#dc2626');
              matchContainer.querySelector('span:nth-child(2)').style.color = score >= 80 ? '#16a34a' : (score >= 50 ? '#ca8a04' : '#dc2626');
              matchContainer.querySelector('p').style.color = score >= 80 ? '#15803d' : (score >= 50 ? '#a16207' : '#b91c1c');
          } else {
              matchContainer.style.display = 'none';
          }
          
          const applyBtn = document.getElementById('modal-job-apply');
          if (j.url) {
              applyBtn.href = j.url;
              applyBtn.innerText = "Postuler";
              applyBtn.onclick = null;
          } else {
              applyBtn.href = "#";
              applyBtn.innerText = "URL non disponible";
              applyBtn.onclick = (e) => { e.preventDefault(); UI.showToast("URL de candidature non disponible", "warning"); };
          }
          
          m.style.display = 'flex';
      };
      
      const closeJobModal = () => {
          const m = document.getElementById('modal-job');
          if(m) m.style.display = 'none';
      };
      
      const closeBtn = document.getElementById('modal-job-close');
      if (closeBtn) closeBtn.onclick = closeJobModal;
      
      // Events
      let searchTimeout;
      const searchInput = document.getElementById('opp-search');
      if (searchInput) {
          searchInput.oninput = () => {
              clearTimeout(searchTimeout);
              searchTimeout = setTimeout(filterAndRender, 300);
          };
      }
      
      document.getElementById('opp-sort').onchange = filterAndRender;
      document.getElementById('opp-filter-sector').onchange = filterAndRender;
      document.getElementById('opp-filter-experience').onchange = filterAndRender;
      document.getElementById('opp-filter-location').onchange = filterAndRender;
      
      document.querySelectorAll('.opp-filter-contract, .opp-filter-workmode').forEach(cb => {
          cb.onchange = filterAndRender;
      });
      
      const filterTabs = document.querySelectorAll('.btn-filter-opp');
      filterTabs.forEach(btn => {
          btn.onclick = (e) => {
              filterTabs.forEach(b => b.classList.remove('active'));
              e.currentTarget.classList.add('active');
              filterAndRender();
          };
      });
      
      const resetBtn = document.getElementById('btn-reset-opp-filters');
      const resetBtnSide = document.getElementById('btn-reset-filters-side');
      const resetFilters = () => {
          document.getElementById('opp-search').value = "";
          document.getElementById('opp-sort').value = "relevance";
          if (profile.profile && (profile.profile.primaryDomain || profile.profile.domain)) {
              let pDom = profile.profile.primaryDomain || profile.profile.domain;
              if (typeof window.SectorsHelper !== 'undefined') pDom = window.SectorsHelper.normalizeSector(pDom);
              document.getElementById('opp-filter-sector').value = pDom;
          } else {
              document.getElementById('opp-filter-sector').value = "all";
          }
          document.getElementById('opp-filter-experience').value = "";
          document.getElementById('opp-filter-location').value = "";
          document.querySelectorAll('.opp-filter-contract, .opp-filter-workmode').forEach(cb => cb.checked = false);
          
          filterTabs.forEach(b => b.classList.remove('active'));
          document.querySelector('.btn-filter-opp[data-filter="all"]').classList.add('active');
          
          filterAndRender();
      };
      if (resetBtn) resetBtn.onclick = resetFilters;
      if (resetBtnSide) resetBtnSide.onclick = resetFilters;

      const fetchOpps = async (force) => {
        showLoading();
        try {
          const results = await WebSearch.searchJobs(profile, force);
          allFetchedOpps = results || [];
          
          // Update Tab Counts
          document.getElementById('opp-tab-all-count').innerText = `(${allFetchedOpps.length})`;
          
          let countEmploi = 0, countStage = 0, countFreelance = 0, countRemote = 0;
          
          allFetchedOpps.forEach(j => {
              const t = (j.type||"").toLowerCase();
              const m = (j.workMode||j.location||"").toLowerCase();
              if (t.includes('cdi') || t.includes('cdd') || t.includes('emploi')) countEmploi++;
              if (t.includes('stage')) countStage++;
              if (t.includes('freelance')) countFreelance++;
              if (m.includes('remote') || m.includes('télétravail')) countRemote++;
          });
          
          document.getElementById('opp-tab-emploi-count').innerText = `(${countEmploi})`;
          document.getElementById('opp-tab-stage-count').innerText = `(${countStage})`;
          document.getElementById('opp-tab-freelance-count').innerText = `(${countFreelance})`;
          document.getElementById('opp-tab-remote-count').innerText = `(${countRemote})`;
          
          // Update Stats
          document.getElementById('opp-stat-total').innerText = allFetchedOpps.length;
          document.getElementById('opp-stat-emploi').innerText = countEmploi;
          document.getElementById('opp-stat-stage').innerText = countStage;
          document.getElementById('opp-stat-freelance').innerText = countFreelance;
          document.getElementById('opp-stat-remote').innerText = countRemote;
          
          // Populate Companies
          const compGrid = document.getElementById('opp-companies-grid');
          if (compGrid) {
              const companies = {};
              allFetchedOpps.forEach(j => {
                  const c = j.company || "Inconnu";
                  companies[c] = (companies[c] || 0) + 1;
              });
              const sortedComps = Object.entries(companies).filter(x=>x[0]!=="Inconnu").sort((a,b)=>b[1]-a[1]).slice(0, 6);
              compGrid.innerHTML = sortedComps.map((comp) => {
                  const initial = comp[0].charAt(0).toUpperCase();
                  const colors = ['#0284c7', '#ea580c', '#16a34a', '#eab308', '#9333ea', '#dc2626'];
                  const bgColor = colors[comp[0].length % colors.length];
                  return `
                  <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem; text-align:center;">
                      <div style="width:48px; height:48px; border-radius:12px; background:${bgColor}; color:white; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:bold;">
                          ${initial}
                      </div>
                      <div style="font-size:0.75rem; color:var(--text-dark); font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%;">${comp[0]}</div>
                  </div>
                  `;
              }).join('');
              if (sortedComps.length === 0) compGrid.innerHTML = "<p style='grid-column:1/-1; color:var(--text-muted); font-size:0.85rem;'>Aucune entreprise disponible.</p>";
          }
          
          filterAndRender();
          
        } catch (e) {
          showEmpty();
          if (e.message.includes("Quota IA épuisé") || e.message.includes("prend pas en charge")) {
              document.getElementById("opp-empty-title").innerText = "Recherche Web non disponible";
              document.getElementById("opp-empty-desc").innerText = e.message;
              document.getElementById("opp-empty-actions").innerHTML = `<button class="btn btn-primary" onclick="App.navigate('demo')">Utiliser le mode démo</button>`;
          } else {
              document.getElementById("opp-empty-title").innerText = "Impossible de charger les opportunités.";
              document.getElementById("opp-empty-desc").innerText = "Une erreur est survenue lors de la récupération des données.";
              document.getElementById("opp-empty-actions").innerHTML = `<button class="btn btn-primary" onclick="document.getElementById('refresh-opp-btn').click()">Réessayer</button>`;
          }
        }
      };

      const refreshBtn = document.getElementById("refresh-opp-btn");
      if (refreshBtn) {
        refreshBtn.onclick = () => {
          fetchOpps(true);
        };
      }

      // Initial Fetch
      fetchOpps(false);
    },

    
    roadmap() {
      const container = document.getElementById("roadmap-content");
      const loadingState = document.getElementById("roadmap-loading-state");
      const emptyState = document.getElementById("roadmap-empty-state");
      
      const isDemo = typeof DemoState !== "undefined" && DemoState.isActive;
      const profile = isDemo ? (DemoState.data || (typeof DemoData !== "undefined" ? DemoData : null)) : State.analysis;
      
      const modeBadge = document.getElementById("roadmap-mode-badge");
      if (modeBadge) {
          modeBadge.innerHTML = isDemo
            ? `<span class="tag tag-medium" style="background:#fef3c7; color:#92400e; border: 1px solid #fde68a;">MODE DÉMO</span>`
            : `<span class="tag" style="background:#e0f2fe; color:#0284c7;">MODE RÉEL</span>`;
      }

      if (!profile || !profile.profile) {
          container.style.display = "none";
          loadingState.style.display = "none";
          emptyState.style.display = "block";
          return;
      }
      
      container.style.display = "none";
      emptyState.style.display = "none";
      loadingState.style.display = "flex";
      
      // Simulate loading for better UX and wait for caches
      setTimeout(async () => {
          try {
              // Fetch from cache if exists, don't force refresh
              let recommendedCourses = [];
              let recommendedJobs = [];
              
              if (typeof WebSearch !== "undefined") {
                 // Try to get from cache or quick fetch without forcing
                 try { recommendedCourses = await WebSearch.searchCourses(profile, false); } catch(e){}
                 try { recommendedJobs = await WebSearch.searchJobs(profile, false); } catch(e){}
              } else {
                 if (typeof Courses !== "undefined") recommendedCourses = Courses.slice(0, 3);
                 if (typeof Opportunities !== "undefined") recommendedJobs = Opportunities.slice(0, 3);
              }
              
              const p = profile.profile;
              const skills = profile.skills || [];
              const gaps = profile.skillGaps || [];
              
              // Map Objective data
              document.getElementById('roadmap-obj-role').innerText = p.targetRole || p.currentRole || "Non défini";
              document.getElementById('roadmap-obj-sector').innerText = p.primaryDomain || p.domain || "Non défini";
              document.getElementById('roadmap-obj-contract').innerText = "CDI / Remote"; // Simulated default
              document.getElementById('roadmap-obj-location').innerText = "Rabat, Casablanca ou Remote"; // Simulated default
              
              // Generate Steps
              const steps = [
                  {
                      id: 1,
                      title: "Maîtriser les compétences de base",
                      desc: "Renforcez vos compétences actuelles et consolidez les fondamentaux nécessaires à votre profil cible.",
                      icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
                      duration: "1 - 2 mois",
                      progress: 75,
                      actions: [
                          { title: "Mettre à jour mon CV avec les compétences acquises", status: "done", priority: "Moyenne", link: "upload" },
                          { title: "Réviser les fondamentaux de mon secteur", status: "done", priority: "Basse", link: "skills" },
                          { title: "Valider 3 compétences clés sur mon profil", status: "pending", priority: "Haute", link: "skills" }
                      ]
                  },
                  {
                      id: 2,
                      title: "Développer les compétences avancées",
                      desc: "Acquérez des compétences plus avancées pour augmenter votre employabilité et combler vos lacunes.",
                      icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
                      duration: "2 - 4 mois",
                      progress: Math.floor(Math.random()*40 + 10), // Simulated
                      actions: gaps.slice(0, 3).map(g => ({
                          title: `Apprendre ${typeof g === 'string' ? g : g.name}`,
                          status: "pending",
                          priority: "Haute",
                          link: "skills"
                      })).concat([
                          { title: "Participer à un atelier technique", status: "pending", priority: "Moyenne", link: "courses" }
                      ])
                  },
                  {
                      id: 3,
                      title: "Suivre les formations recommandées",
                      desc: "Suivez des formations ciblées pour combler vos lacunes et obtenir des certifications reconnues.",
                      icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>`,
                      duration: "3 - 6 mois",
                      progress: 0,
                      actions: recommendedCourses.slice(0,2).map(c => ({
                          title: `Suivre : ${c.title}`,
                          status: "pending",
                          priority: "Haute",
                          link: "courses"
                      })).concat([
                          { title: "Obtenir une certification de fin de cursus", status: "pending", priority: "Moyenne", link: "courses" }
                      ])
                  },
                  {
                      id: 4,
                      title: "Mettre en pratique",
                      desc: "Réalisez des projets concrets, des stages ou des missions freelance pour valider vos acquis.",
                      icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
                      duration: "6 - 12 mois",
                      progress: 0,
                      actions: [
                          { title: "Réaliser un projet personnel pertinent", status: "pending", priority: "Haute", link: "profile" },
                          { title: "Contribuer à un projet Open Source ou Associatif", status: "pending", priority: "Basse", link: "profile" },
                          { title: "Ajouter ces réalisations à mon portfolio", status: "pending", priority: "Moyenne", link: "profile" }
                      ]
                  },
                  {
                      id: 5,
                      title: "Postuler aux opportunités",
                      desc: "Commencez à postuler aux offres adaptées à votre profil et préparez vos entretiens.",
                      icon: `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`,
                      duration: "Continu",
                      progress: 0,
                      actions: [
                          { title: "Configurer des alertes emploi", status: "pending", priority: "Moyenne", link: "opportunities" },
                          { title: "Postuler à 3 offres pertinentes", status: "pending", priority: "Haute", link: "opportunities" }
                      ]
                  }
              ];
              
              // Calculate global progress
              let totalActions = 0;
              let doneActions = 0;
              steps.forEach(s => {
                  s.actions.forEach(a => {
                      totalActions++;
                      if (a.status === 'done') doneActions++;
                  });
              });
              const globalProgress = Math.round((doneActions / totalActions) * 100) || 0;
              
              document.getElementById('roadmap-progress-text').innerText = globalProgress + '%';
              // Calculate stroke-dashoffset (251.2 is the circumference)
              const offset = 251.2 - (251.2 * globalProgress) / 100;
              setTimeout(() => {
                  document.getElementById('roadmap-progress-circle').style.strokeDashoffset = offset;
                  document.getElementById('roadmap-progress-line').style.width = globalProgress + '%';
              }, 100);
              
              document.getElementById('roadmap-progress-status').innerText = globalProgress === 100 ? "Terminé" : globalProgress > 0 ? "En cours" : "À démarrer";
              document.getElementById('roadmap-progress-status').style.color = globalProgress === 100 ? "var(--green)" : "var(--navy)";
              
              // Render Steps
              const stepsContainer = document.getElementById('roadmap-steps-container');
              stepsContainer.innerHTML = steps.map((s, idx) => {
                  const colorClass = s.progress === 100 ? "var(--green)" : s.progress > 0 ? "var(--blue)" : "#94a3b8";
                  const bgClass = s.progress === 100 ? "#f0fdf4" : s.progress > 0 ? "#eff6ff" : "#f8fafc";
                  
                  return `
                  <div class="roadmap-step-card" style="border-bottom:${idx === steps.length - 1 ? 'none' : '1px solid var(--border-color)'};">
                      <div class="roadmap-step-header" style="padding:1.5rem; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:white; transition:background 0.2s;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'; this.querySelector('.chevron').style.transform = this.nextElementSibling.style.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)';">
                          <div style="display:flex; gap:1.5rem; align-items:flex-start; flex:1;">
                              <div style="width:40px; height:40px; border-radius:50%; background:${bgClass}; color:${colorClass}; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.1rem; flex-shrink:0;">
                                  ${s.id}
                              </div>
                              <div style="flex:1;">
                                  <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.25rem;">
                                      <div style="color:${colorClass}; display:flex; align-items:center;">${s.icon}</div>
                                      <h4 style="font-size:1.1rem; color:var(--navy); margin:0; font-weight:600;">${s.title}</h4>
                                  </div>
                                  <p style="font-size:0.9rem; color:var(--text-muted); margin:0 0 1rem 0; line-height:1.4;">${s.desc}</p>
                                  <div style="display:flex; align-items:center; gap:1rem; width:100%; max-width:400px;">
                                      <div style="flex:1; height:6px; background:#f1f5f9; border-radius:3px; overflow:hidden;">
                                          <div style="width:${s.progress}%; height:100%; background:${colorClass}; border-radius:3px;"></div>
                                      </div>
                                      <span style="font-size:0.85rem; font-weight:600; color:${colorClass}; width:40px; text-align:right;">${s.progress}%</span>
                                  </div>
                              </div>
                          </div>
                          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.5rem; min-width:120px;">
                              <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; color:var(--text-dark);">
                                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                  ${s.duration}
                              </div>
                              <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; font-weight:600; color:var(--blue); background:#eff6ff; padding:0.25rem 0.75rem; border-radius:20px;">
                                  ${s.actions.length} actions &rarr;
                              </div>
                              <svg class="chevron" width="20" height="20" fill="none" stroke="var(--text-muted)" viewBox="0 0 24 24" style="transition:transform 0.2s;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                      </div>
                      <div class="roadmap-step-body" style="display:${s.id === 1 ? 'block' : 'none'}; padding:0; border-top:1px solid var(--border-color); background:#f8fafc;">
                          <div style="padding:1.5rem; padding-left:5rem;">
                              <div style="display:flex; flex-direction:column; gap:0.75rem;">
                                  ${s.actions.map(a => {
                                      const isDone = a.status === 'done';
                                      const pColor = a.priority === 'Haute' ? '#dc2626' : (a.priority === 'Moyenne' ? '#ea580c' : '#16a34a');
                                      const pBg = a.priority === 'Haute' ? '#fef2f2' : (a.priority === 'Moyenne' ? '#fff7ed' : '#f0fdf4');
                                      return `
                                      <div style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem 1rem; background:white; border-radius:8px; border:1px solid ${isDone ? '#bbf7d0' : 'var(--border-color)'};">
                                          <div style="display:flex; align-items:center; gap:0.75rem;">
                                              ${isDone 
                                                ? `<svg width="20" height="20" fill="#16a34a" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`
                                                : `<div style="width:20px; height:20px; border-radius:50%; border:2px solid #cbd5e1;"></div>`
                                              }
                                              <span style="font-size:0.95rem; font-weight:500; color:${isDone ? '#64748b' : 'var(--navy)'}; text-decoration:${isDone ? 'line-through' : 'none'};">${a.title}</span>
                                          </div>
                                          <div style="display:flex; align-items:center; gap:1rem;">
                                              <span style="font-size:0.75rem; padding:0.15rem 0.5rem; border-radius:4px; color:${pColor}; background:${pBg}; font-weight:600;">${a.priority}</span>
                                              <button class="btn btn-icon" style="color:var(--blue); padding:0;" onclick="App.navigate('${a.link}')">
                                                  ${isDone ? 'Voir' : 'Commencer'} &rarr;
                                              </button>
                                          </div>
                                      </div>
                                      `;
                                  }).join('')}
                              </div>
                          </div>
                      </div>
                  </div>
                  `;
              }).join('');
              
              // Priority Actions
              const allActions = [];
              steps.forEach((s, idx) => {
                  s.actions.forEach(a => {
                      if (a.status !== 'done') allActions.push({...a, stepId: s.id});
                  });
              });
              // Sort by priority (Haute > Moyenne > Basse)
              allActions.sort((a,b) => {
                  const pWeight = {"Haute": 3, "Moyenne": 2, "Basse": 1};
                  return (pWeight[b.priority] || 0) - (pWeight[a.priority] || 0);
              });
              
              const priorityContainer = document.getElementById('roadmap-priority-actions');
              if (allActions.length > 0) {
                  priorityContainer.innerHTML = allActions.slice(0, 4).map((a, idx) => {
                      const pColor = a.priority === 'Haute' ? '#dc2626' : (a.priority === 'Moyenne' ? '#ea580c' : '#16a34a');
                      const pBg = a.priority === 'Haute' ? '#fef2f2' : (a.priority === 'Moyenne' ? '#fff7ed' : '#f0fdf4');
                      return `
                      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:${idx===3 ? 'none' : '1px solid var(--border-color)'}; padding-bottom:${idx===3 ? '0' : '0.75rem'};">
                          <div style="display:flex; align-items:center; gap:0.5rem;">
                              <div style="width:24px; height:24px; border-radius:50%; background:var(--blue); color:white; font-size:0.75rem; font-weight:bold; display:flex; align-items:center; justify-content:center;">${idx+1}</div>
                              <span style="font-size:0.9rem; color:var(--navy); font-weight:500;">${a.title}</span>
                          </div>
                          <span style="font-size:0.75rem; color:${pColor}; background:${pBg}; padding:0.15rem 0.5rem; border-radius:4px; font-weight:600;">${a.priority}</span>
                      </div>`;
                  }).join('');
              } else {
                  priorityContainer.innerHTML = `<p style="font-size:0.9rem; color:var(--text-muted); text-align:center; margin:1rem 0;">Aucune action en attente.</p>`;
              }
              
              // Recommended Courses (Reuse course card style but mini)
              const coursesContainer = document.getElementById('roadmap-recommended-courses');
              if (recommendedCourses.length > 0) {
                  coursesContainer.innerHTML = recommendedCourses.slice(0, 2).map(c => {
                      const initial = (c.provider || c.focus || "F").charAt(0).toUpperCase();
                      return `
                      <div style="display:flex; gap:1rem; align-items:center; cursor:pointer;" onclick="App.navigate('courses')">
                          <div style="width:40px; height:40px; border-radius:8px; background:var(--navy); color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.2rem; flex-shrink:0;">${initial}</div>
                          <div>
                              <div style="font-size:0.9rem; font-weight:600; color:var(--navy); line-height:1.2; margin-bottom:0.25rem;">${c.title}</div>
                              <div style="font-size:0.8rem; color:var(--text-muted);">${c.provider || c.category} • ${c.level || 'Tous'}</div>
                          </div>
                      </div>`;
                  }).join('');
              } else {
                  coursesContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted);">Aucune formation spécifiquement recommandée pour cette étape.</p>`;
              }
              
              // Recommended Jobs
              const jobsContainer = document.getElementById('roadmap-recommended-jobs');
              if (recommendedJobs.length > 0) {
                  jobsContainer.innerHTML = recommendedJobs.slice(0, 2).map(j => {
                      const company = j.company || "Entreprise";
                      const initial = company.charAt(0).toUpperCase();
                      const colors = ['#0284c7', '#ea580c', '#16a34a', '#eab308'];
                      const bgColor = colors[company.length % colors.length];
                      return `
                      <div style="display:flex; gap:1rem; align-items:center; cursor:pointer;" onclick="App.navigate('opportunities')">
                          <div style="width:40px; height:40px; border-radius:8px; background:${bgColor}; color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.2rem; flex-shrink:0;">${initial}</div>
                          <div style="flex:1; min-width:0;">
                              <div style="font-size:0.9rem; font-weight:600; color:var(--navy); line-height:1.2; margin-bottom:0.25rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${j.title}</div>
                              <div style="font-size:0.8rem; color:var(--text-muted);">${company} • ${j.location || j.city || 'Remote'}</div>
                          </div>
                      </div>`;
                  }).join('');
              } else {
                  jobsContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted);">Aucune opportunité correspondant aux critères actuels.</p>`;
              }
              
              // Resources
              document.getElementById('roadmap-resources').innerHTML = `
                  <div style="display:flex; justify-content:space-between; align-items:center; background:white; padding:0.75rem; border-radius:8px; border:1px solid var(--border-color);">
                      <div style="display:flex; gap:0.75rem; align-items:center;">
                          <div style="color:var(--red);"><svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg></div>
                          <div>
                              <div style="font-size:0.85rem; font-weight:600; color:var(--navy);">Guide pour optimiser son profil LinkedIn</div>
                              <div style="font-size:0.75rem; color:var(--text-muted);">Document PDF</div>
                          </div>
                      </div>
                      <a href="#" style="color:var(--blue);" onclick="event.preventDefault();"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg></a>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; background:white; padding:0.75rem; border-radius:8px; border:1px solid var(--border-color);">
                      <div style="display:flex; gap:0.75rem; align-items:center;">
                          <div style="color:var(--blue);"><svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
                          <div>
                              <div style="font-size:0.85rem; font-weight:600; color:var(--navy);">Modèles de CV professionnels</div>
                              <div style="font-size:0.75rem; color:var(--text-muted);">Template Word/Figma</div>
                          </div>
                      </div>
                      <a href="#" style="color:var(--blue);" onclick="event.preventDefault();"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg></a>
                  </div>
              `;

              loadingState.style.display = "none";
              container.style.display = "flex";
              
          } catch(e) {
              console.error(e);
              container.style.display = "none";
              loadingState.style.display = "none";
              emptyState.style.display = "block";
              document.getElementById("roadmap-empty-title").innerText = "Impossible de générer votre feuille de route.";
              document.getElementById("roadmap-empty-desc").innerText = "Une erreur technique s'est produite.";
              document.getElementById("roadmap-empty-actions").innerHTML = `<button class="btn btn-primary" onclick="App.viewControllers.roadmap()">Réessayer</button>`;
          }
      }, 800);
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
