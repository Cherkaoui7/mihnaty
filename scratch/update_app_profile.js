const fs = require('fs');

const appFile = 'js/app.js';
let appContent = fs.readFileSync(appFile, 'utf8');

const profileStart = appContent.indexOf('profile() {');
const settingsStart = appContent.indexOf('settings() {');

if (profileStart === -1 || settingsStart === -1) {
    console.error("Could not find profile() or settings() in app.js");
    process.exit(1);
}

const newProfileLogic = `profile() {
      const form = document.getElementById("profile-form");
      const isDemo = typeof DemoState !== "undefined" && DemoState.isActive;
      const analysis = isDemo ? (DemoState.data || (typeof DemoData !== "undefined" ? DemoData : null)) : State.analysis;
      const profileData = analysis ? analysis.profile : State.profile;
      
      // Populate domain options
      const domainSelect = document.getElementById("profile-domain");
      if (domainSelect && typeof Sectors !== 'undefined') {
          domainSelect.innerHTML = '<option value="">Sélectionnez un domaine</option>' + 
              Sectors.map(s => \`<option value="\${s.id}">\${s.name}</option>\`).join("");
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
        if (circle) circle.setAttribute("stroke-dasharray", \`\${percentage}, 100\`);
        const text = document.getElementById("completeness-text");
        if (text) text.innerText = \`\${percentage}%\`;
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
                    ? \`<svg width="16" height="16" fill="none" stroke="var(--green)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>\`
                    : \`<svg width="16" height="16" fill="none" stroke="#ca8a04" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>\`;
                return \`<div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="display:flex; align-items:center; gap:0.5rem; color:\${s.isComplete ? 'var(--text-dark)' : 'var(--text-muted)'}">\${icon} \${s.name}</span>
                    <strong style="color:\${s.isComplete ? 'var(--text-dark)' : 'var(--text-muted)'}">\${s.isComplete ? '100%' : Math.round(s.weight/2)+'%'}</strong>
                </div>\`;
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
                suggestionsDiv.innerHTML = \`<div style="text-align:center; padding: 1rem; color:var(--text-muted); font-size:0.9rem;">Votre profil est excellent ! Aucune suggestion pour le moment.</div>\`;
            } else {
                suggestionsDiv.innerHTML = suggestions.map(s => {
                    const colors = {
                        orange: { bg: "#fffbeb", text: "#d97706" },
                        blue: { bg: "#eff6ff", text: "#2563eb" },
                        green: { bg: "#f0fdf4", text: "#16a34a" }
                    };
                    const c = colors[s.color];
                    return \`<div style="display:flex; align-items:flex-start; gap:0.75rem; padding:0.75rem; border-radius:8px; transition:background 0.2s; cursor:pointer;" onmouseover="this.style.background='rgba(0,0,0,0.02)'" onmouseout="this.style.background='transparent'">
                        <div style="width:36px; height:36px; border-radius:8px; background:\${c.bg}; color:\${c.text}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="\${s.icon}"></path></svg>
                        </div>
                        <div>
                            <h4 style="margin:0 0 0.25rem 0; font-size:0.95rem; color:var(--text-dark);">\${s.title}</h4>
                            <p style="margin:0; font-size:0.8rem; color:var(--text-muted); line-height:1.4;">\${s.desc}</p>
                        </div>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-left:auto; color:var(--text-muted); margin-top:0.25rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>\`;
                }).join("");
            }
        }

        // Documents
        const docsDiv = document.getElementById("profile-documents-list");
        if (docsDiv) {
            if (analysis && analysis.cvFileName) {
                docsDiv.innerHTML = \`
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;">
                        <div style="display:flex; align-items:center; gap:0.75rem;">
                            <div style="width:32px; height:32px; border-radius:6px; background:#fef2f2; color:#ef4444; display:flex; align-items:center; justify-content:center;">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <h4 style="margin:0 0 0.1rem 0; font-size:0.9rem; color:var(--text-dark);">Mon CV</h4>
                                <div style="font-size:0.75rem; color:var(--text-muted);">\${analysis.cvFileName}</div>
                            </div>
                        </div>
                        <div style="display:flex; gap:0.5rem; color:var(--text-muted);">
                            <button class="btn btn-icon" style="background:none; border:none; padding:0.25rem; color:inherit; cursor:pointer;" title="Télécharger">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            </button>
                        </div>
                    </div>
                \`;
            } else {
                docsDiv.innerHTML = \`<div style="text-align:center; padding: 1rem; color:var(--text-muted); font-size:0.9rem; font-style:italic;">Aucun document ajouté</div>\`;
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
    `;

appContent = appContent.substring(0, profileStart) + newProfileLogic + appContent.substring(settingsStart);

fs.writeFileSync('js/app.js', appContent, 'utf8');
console.log("Updated app.js successfully.");
