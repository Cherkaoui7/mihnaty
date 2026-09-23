const CVUpload = {
  extractedText: null,

  init() {
    const dropZone = document.getElementById("upload-zone");
    const fileInput = document.getElementById("cv-file");
    const startBtn = document.getElementById("start-analysis-btn");

    if (!dropZone || !fileInput) return;

    // Check for AI config warning
    if (!State.aiConfig || !State.aiConfig.apiKey) {
      const warning = document.getElementById("ai-warning");
      if (warning) warning.style.display = "block";
    }

    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.style.backgroundColor = "var(--blue-light)";
      dropZone.style.borderColor = "var(--primary-color)";
    });

    dropZone.addEventListener("dragleave", (e) => {
      e.preventDefault();
      dropZone.style.backgroundColor = "";
      dropZone.style.borderColor = "var(--border-color)";
    });

    dropZone.addEventListener("drop", async (e) => {
      e.preventDefault();
      dropZone.style.backgroundColor = "";
      dropZone.style.borderColor = "var(--border-color)";

      if (e.dataTransfer.files.length) {
        await this.handleFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener("change", async (e) => {
      if (e.target.files.length) {
        await this.handleFile(e.target.files[0]);
      }
    });

    startBtn.addEventListener("click", () => this.startAnalysis());
  },

  updateTimeline(step) {
    const steps = ["upload", "extract", "analyze", "result"];
    const currentIndex = steps.indexOf(step);

    steps.forEach((s, i) => {
      const el = document.getElementById(`step-${s}`);
      if (!el) return;

      el.className = "timeline-step";
      if (i < currentIndex) {
        el.classList.add("done");
        el.innerHTML = `<span>✓ ${el.innerText.substring(2)}</span>`;
      } else if (i === currentIndex) {
        el.classList.add("active");
        if (s === "analyze") {
          el.innerHTML = `<span>⟳ ${el.innerText.substring(2)}</span>`;
        }
      } else {
        // reset text if needed
        const rawText = el.innerText.replace("✓ ", "").replace("⟳ ", "");
        el.innerHTML = `<span>${rawText}</span>`;
      }
    });
  },

  log(msg) {
    const logs = document.getElementById("analysis-logs");
    if (!logs) return;
    logs.style.display = "block";
    logs.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
  },

  async handleFile(file) {
    document.getElementById("analysis-logs").innerHTML = "";
    this.updateTimeline("extract");

    try {
      this.log(
        `Fichier sélectionné : ${file.name} (${Math.round(file.size / 1024)} KB)`,
      );

      let text = "";
      if (file.name.toLowerCase().endsWith(".pdf")) {
        this.log("Extraction du texte PDF en cours (Local)...");
        text = await PDFParser.extractText(file);
      } else if (file.name.toLowerCase().endsWith(".docx")) {
        this.log("Extraction du texte DOCX en cours (Local)...");
        text = await DOCXParser.extractText(file);
      } else {
        throw new Error("Format non supporté. Veuillez utiliser PDF ou DOCX.");
      }

      if (!text || text.trim().length < 50) {
        throw new Error(
          "Impossible d'extraire suffisamment de texte. Fichier peut-être vide ou image scannée.",
        );
      }

      this.extractedText = text;
      this.log(`Extraction réussie. ${text.length} caractères extraits.`);

      document.getElementById("upload-zone").innerHTML = `
                <div style="color: var(--green); font-size: 2rem; margin-bottom:1rem;">✓</div>
                <h3>${file.name} prêt pour l'analyse</h3>
                <p style="color:var(--text-muted); cursor:pointer; text-decoration:underline; font-size:0.9rem;" onclick="document.getElementById('cv-file').click()">Changer de fichier</p>
            `;

      document.getElementById("start-analysis-btn").style.display = "block";
      UI.showToast("Fichier extrait avec succès", "success");
    } catch (e) {
      this.log(`ERREUR : ${e.message}`);
      UI.showToast(e.message, "error");
      this.updateTimeline("upload");
    }
  },

  async startAnalysis() {
    if (!this.extractedText) return;

    this.updateTimeline("analyze");
    document.getElementById("start-analysis-btn").disabled = true;
    document.getElementById("start-analysis-btn").innerText =
      "Analyse en cours...";

    const isReal = State.aiConfig && State.aiConfig.apiKey;
    this.log(
      isReal
        ? "Envoi au fournisseur IA configuré..."
        : "Lancement du mode démo simulé...",
    );

    try {
      const result = await AIManager.analyzeCV(this.extractedText);
      this.log("Analyse terminée avec succès.");
      this.updateTimeline("result");
      UI.showToast("Analyse terminée !", "success");

      this.showDetectedProfile(result);
    } catch (e) {
      this.log(`ERREUR : ${e.message}`);
      UI.showToast(e.message, "error");
      this.updateTimeline("upload");
      document.getElementById("start-analysis-btn").disabled = false;
      document.getElementById("start-analysis-btn").innerText =
        "Lancer l'analyse";
    }
  },

  showDetectedProfile(analysisResult) {
    document.getElementById("start-analysis-btn").style.display = "none";
    document.getElementById("upload-zone").style.display = "none";
    document.getElementById("analysis-logs").style.display = "none";

    const profile = analysisResult.profile || {};

    const safeText = (val) =>
      val !== null && val !== undefined && val !== "" && val !== "Non détecté" && val !== "Non dǸtectǸ"
        ? val
        : "Non détecté";
        
    const isSet = (val) =>
      val !== null && val !== undefined && val !== "" && val !== "Non détecté" && val !== "Non dǸtectǸ";

    const newData = {
      firstName: isSet(profile.firstName) ? profile.firstName : null,
      lastName: isSet(profile.lastName) ? profile.lastName : null,
      fullName: isSet(profile.fullName) ? profile.fullName : null,
      city: isSet(profile.city) ? profile.city : null,
      country: isSet(profile.country) ? profile.country : null,
      educationLevel: isSet(profile.educationLevel) ? profile.educationLevel : null,
      primaryDomain: isSet(profile.primaryDomain) ? profile.primaryDomain : null,
      secondaryDomains: Array.isArray(profile.secondaryDomains) ? profile.secondaryDomains : [],
      targetRole: isSet(profile.targetRole) ? profile.targetRole : null,
      experienceYears: isSet(profile.experienceYears) ? profile.experienceYears : null,
      experienceLevel: isSet(profile.experienceLevel) ? profile.experienceLevel : null
    };

    const existingData = State.profile || {};

    // Merge logic with Conflict Detection UI
    const generateFieldHtml = (fieldId, label, newValue, oldValue) => {
      const hasConflict = oldValue && oldValue !== newValue && isSet(newValue);

      if (hasConflict) {
        return `
                    <div style="margin-bottom:0.8rem; background:#fffbdd; padding:0.5rem; border:1px solid #fde047; border-radius:4px;">
                        <span style="font-size:0.8rem; color:var(--text-muted); display:block;">${label} (Différence détectée)</span>
                        <select id="conflict-${fieldId}" style="width:100%; padding:0.4rem; margin-top:0.3rem;">
                            <option value="${newValue}">${newValue} (Nouveau, extrait du CV)</option>
                            <option value="${oldValue}">${oldValue} (Ancien, existant)</option>
                        </select>
                    </div>
                `;
      } else {
        const finalValue = isSet(newValue) ? newValue : oldValue;
        return `
                    <div style="margin-bottom:0.8rem;">
                        <span style="font-size:0.8rem; color:var(--text-muted);">${label}</span>
                        <div style="font-weight:600; color:var(--text-color);" id="det-${fieldId}" data-value="${finalValue || ""}">
                            ${safeText(finalValue)} ${oldValue && !isSet(newValue) ? '<span class="tag tag-medium">Conservé</span>' : ""}
                        </div>
                    </div>
                `;
      }
    };

    const container = document.getElementById("detected-profile-zone");
    container.style.display = "block";

    const grid = container.querySelector(".grid-2");
    if (grid) {
      grid.innerHTML = `
                <div>
                    ${generateFieldHtml("fullName", "Prénom & Nom", newData.fullName, existingData.fullName)}
                    ${generateFieldHtml("city", "Ville", newData.city, existingData.city)}
                    ${generateFieldHtml("educationLevel", "Niveau d'études", newData.educationLevel, existingData.educationLevel)}
                </div>
                <div>
                    ${generateFieldHtml("primaryDomain", "Domaine", newData.primaryDomain, existingData.primaryDomain)}
                    ${generateFieldHtml("targetRole", "Objectif professionnel", newData.targetRole, existingData.targetRole)}
                    ${generateFieldHtml("experienceYears", "Expérience (ans)", newData.experienceYears, existingData.experienceYears)}
                </div>
            `;
    }

    document.getElementById("confirm-profile-btn").onclick = () => {
      const getFinalVal = (id, fallback) => {
        const select = document.getElementById(`conflict-${id}`);
        if (select) return select.value;
        const div = document.getElementById(`det-${id}`);
        if (div) return div.getAttribute("data-value") || null;
        return fallback;
      };

      const finalProfile = {
        firstName: newData.firstName,
        lastName: newData.lastName,
        fullName: getFinalVal("fullName", newData.fullName),
        city: getFinalVal("city", newData.city),
        country: newData.country,
        educationLevel: getFinalVal("educationLevel", newData.educationLevel),
        primaryDomain: getFinalVal("primaryDomain", newData.primaryDomain),
        secondaryDomains: newData.secondaryDomains,
        targetRole: getFinalVal("targetRole", newData.targetRole),
        experienceYears: getFinalVal("experienceYears", newData.experienceYears),
        experienceLevel: newData.experienceLevel
      };

      analysisResult.profile = finalProfile;

      State.updateAnalysis(analysisResult);
      State.updateProfile(finalProfile);
      UI.showToast("Profil enregistré", "success");
      window.location.hash = "#dashboard";
    };
  },
};
