const CVUpload = {
  extractedText: null,
  currentFile: null,

  init() {
    const dropZone = document.getElementById("upload-zone");
    const fileInput = document.getElementById("cv-file");
    const startBtn = document.getElementById("start-analysis-btn");
    const removeBtn = document.getElementById("remove-file-btn");
    const replaceBtn = document.getElementById("replace-file-btn");
    const retryBtn = document.getElementById("retry-btn");

    if (!dropZone || !fileInput) return;

    // Check for AI config warning
    if (!State.aiConfig || !State.aiConfig.apiKey) {
      const warning = document.getElementById("ai-warning");
      if (warning) warning.style.display = "block";
    }

    // Reset UI
    this.resetUI();

    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.style.backgroundColor = "var(--blue-light)";
      dropZone.style.borderColor = "var(--blue)";
    });

    dropZone.addEventListener("dragleave", (e) => {
      e.preventDefault();
      dropZone.style.backgroundColor = "#f8fafc";
      dropZone.style.borderColor = "var(--border-color)";
    });

    dropZone.addEventListener("drop", async (e) => {
      e.preventDefault();
      dropZone.style.backgroundColor = "#f8fafc";
      dropZone.style.borderColor = "var(--border-color)";

      if (e.dataTransfer.files.length) {
        await this.handleFile(e.dataTransfer.files[0]);
      }
    });

    dropZone.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", async (e) => {
      if (e.target.files.length) {
        await this.handleFile(e.target.files[0]);
      }
    });

    if (startBtn) {
        // Remove old listeners to prevent duplicates
        const newBtn = startBtn.cloneNode(true);
        startBtn.parentNode.replaceChild(newBtn, startBtn);
        newBtn.addEventListener("click", () => this.startAnalysis());
    }
    
    if (removeBtn) removeBtn.addEventListener("click", () => this.resetUI());
    if (replaceBtn) replaceBtn.addEventListener("click", () => fileInput.click());
    if (retryBtn) retryBtn.addEventListener("click", () => this.resetUI());
  },

  resetUI() {
    this.extractedText = null;
    this.currentFile = null;
    const uz = document.getElementById("upload-zone");
    const fsz = document.getElementById("file-selected-zone");
    const apz = document.getElementById("analysis-progress-zone");
    const dpz = document.getElementById("detected-profile-zone");
    const ez = document.getElementById("error-zone");
    const fi = document.getElementById("cv-file");

    if(uz) uz.style.display = "block";
    if(fsz) fsz.style.display = "none";
    if(apz) apz.style.display = "none";
    if(dpz) dpz.style.display = "none";
    if(ez) ez.style.display = "none";
    if(fi) fi.value = "";
  },

  updateTimeline(step) {
    const steps = ["upload", "extract", "analyze", "result"];
    const currentIndex = steps.indexOf(step);

    steps.forEach((s, i) => {
      const el = document.getElementById(`pstep-${s}`);
      if (!el) return;

      if (i < currentIndex) {
        el.style.color = "var(--green)";
        el.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>${el.innerText}</span>`;
      } else if (i === currentIndex) {
        el.style.color = "var(--text-dark)";
        el.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> <span>${el.innerText}</span>`;
      } else {
        el.style.color = "var(--text-muted)";
        el.innerHTML = `<div style="width:18px; height:18px; border:2px solid currentColor; border-radius:50%;"></div> <span>${el.innerText}</span>`;
      }
    });
  },

  showError(msg) {
    document.getElementById("upload-zone").style.display = "none";
    document.getElementById("file-selected-zone").style.display = "none";
    document.getElementById("analysis-progress-zone").style.display = "none";
    document.getElementById("detected-profile-zone").style.display = "none";
    
    const errorZone = document.getElementById("error-zone");
    const errorMsg = document.getElementById("error-message");
    if (errorZone && errorMsg) {
        errorZone.style.display = "block";
        errorMsg.innerText = msg;
    }
    if (window.UI && typeof UI.showToast === "function") {
        UI.showToast(msg, "error");
    }
  },

  async handleFile(file) {
    this.currentFile = file;
    this.extractedText = null;

    try {
      const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf";
      const isDocx = file.name.toLowerCase().endsWith(".docx") || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      if (!isPdf && !isDocx) {
        throw new Error("Format non pris en charge. Veuillez sélectionner un fichier PDF ou DOCX.");
      }

      const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
      if (file.size > MAX_SIZE) {
        throw new Error("Fichier trop volumineux. La taille maximale est de 5 Mo.");
      }
      if (file.size === 0) {
        throw new Error("Le fichier est vide.");
      }

      document.getElementById("upload-zone").style.display = "none";
      const selZone = document.getElementById("file-selected-zone");
      selZone.style.display = "block";
      
      document.getElementById("selected-filename").innerText = file.name;
      const sizeKB = Math.round(file.size / 1024);
      document.getElementById("selected-filesize").innerText = sizeKB > 1024 ? (sizeKB/1024).toFixed(1) + " MB" : sizeKB + " KB";
      
    } catch (e) {
      this.showError(e.message);
    }
  },

  async startAnalysis() {
    if (!this.currentFile) return;

    document.getElementById("file-selected-zone").style.display = "none";
    document.getElementById("analysis-progress-zone").style.display = "block";

    try {
      this.updateTimeline("extract");
      
      let text = "";
      if (this.currentFile.name.toLowerCase().endsWith(".pdf")) {
        text = await PDFParser.extractText(this.currentFile);
      } else if (this.currentFile.name.toLowerCase().endsWith(".docx")) {
        text = await DOCXParser.extractText(this.currentFile);
      }

      if (!text || text.trim().length < 50) {
        throw new Error("Nous n'avons pas pu extraire suffisamment d'informations de votre CV.");
      }
      if (text.length > 50000) {
        throw new Error("Le contenu du document est trop long. Veuillez utiliser un CV plus court (max 50000 caractères).");
      }
      this.extractedText = text;

      this.updateTimeline("analyze");
      const result = await AIManager.analyzeCV(this.extractedText);
      
      this.updateTimeline("result");
      
      // Artificial delay to show completion state smoothly
      setTimeout(() => {
          this.showDetectedProfile(result);
      }, 800);

    } catch (e) {
      this.showError(e.message);
    }
  },

  showDetectedProfile(analysisResult) {
    document.getElementById("analysis-progress-zone").style.display = "none";
    document.getElementById("detected-profile-zone").style.display = "block";

    const profile = analysisResult.profile || {};
    const safeText = (val) => val && val !== "Non détecté" && val !== "Non dǸtectǸ" ? val : "-";

    const detName = document.getElementById("det-name");
    const detDomain = document.getElementById("det-domain");
    const detTarget = document.getElementById("det-target");
    const detExp = document.getElementById("det-exp");

    if (detName) detName.innerText = safeText(profile.fullName);
    
    if (detDomain) {
        let domainName = safeText(profile.primaryDomain || profile.domain);
        if (typeof window.Sectors !== 'undefined') {
            const sObj = window.Sectors.find(s => s.id === domainName || s.shortName === domainName);
            if (sObj) domainName = sObj.name;
        }
        detDomain.innerText = domainName;
    }
    
    if (detTarget) detTarget.innerText = safeText(profile.targetRole);
    
    if (detExp) {
        let exp = safeText(profile.experienceYears);
        if (exp !== "-") exp += (exp > 1 ? " ans" : " an");
        detExp.innerText = exp;
    }

    const confirmBtn = document.getElementById("confirm-profile-btn");
    if (confirmBtn) {
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        newConfirmBtn.addEventListener("click", () => {
            State.updateAnalysis(analysisResult);
            State.updateProfile(analysisResult.profile);
            UI.showToast("Profil généré avec succès", "success");
            App.navigate('profile');
        });
    }
  }
};
