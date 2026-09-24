const AIManager = {
  _getAdapter(providerId) {
    const def = ProviderRegistry.get(providerId);
    if (!def) return null;
    return ProviderRegistry.getAdapter(def.adapter);
  },

  canUse(capability) {
    const config = State.aiConfig;
    if (!config || !config.provider) return false;
    const def = ProviderRegistry.get(config.provider);
    if (!def || !def.capabilities) return false;
    
    if (capability === 'webSearch' && config.provider === 'bazaarlink') {
      const modelId = (config.model || "").toLowerCase();
      if (modelId.includes("online") || modelId.includes("sonar") || modelId.includes("search") || modelId.includes("perplexity")) {
        return true;
      }
      return false;
    }
    
    return !!def.capabilities[capability];
  },

  // Defensive normalization: providers may return null/missing skill levels
  // despite prompt instructions. Coerce to numbers or drop the field.
  _sanitizeAnalysis(result) {
    if (result && Array.isArray(result.skills)) {
      result.skills = result.skills
        .filter((s) => s && typeof s.name === "string" && s.name.trim())
        .map((s) => {
          const n = Number(s.level);
          if (Number.isFinite(n)) {
            s.level = Math.max(0, Math.min(100, Math.round(n)));
          } else {
            delete s.level; // absent rather than null -> UI hides the %
          }
          return s;
        });
    }
    return result;
  },

  async analyzeCV(cvText) {
    if (!cvText || cvText.trim().length < 50) {
      throw new Error("Le CV est vide ou illisible.");
    }

    const config = State.aiConfig;

    if (config && config.apiKey) {
      const prompt = PromptBuilder.buildCVAnalysisPrompt(cvText, State.profile);
      const adapter = this._getAdapter(config.provider);
      if (!adapter) throw new Error("Fournisseur IA inconnu ou non configuré.");

      const res = await adapter.generate(config, prompt, false);

      const jsonResult = this._sanitizeAnalysis(
        window.ResponseNormalizer
          ? window.ResponseNormalizer.normalizeCVAnalysis(res.result)
          : res.result,
      );
      State.updateAnalysis(jsonResult);
      SearchCache.clearAll();
      return jsonResult;
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          let sectorId = "it";
          const text = cvText.toLowerCase();
          
          if (text.includes("marketing") || text.includes("commercial") || text.includes("vente") || text.includes("business")) {
              sectorId = "business";
          } else if (text.includes("ingénieur") || text.includes("production") || text.includes("qualité") || text.includes("industrie") || text.includes("mecanique")) {
              sectorId = "engineering-industry";
          } else if (text.includes("finance") || text.includes("comptabilité") || text.includes("audit")) {
              sectorId = "finance";
          } else if (text.includes("logistique") || text.includes("supply chain") || text.includes("transport") || text.includes("achat")) {
              sectorId = "logistics";
          } else if (State.profile && State.profile.domain) {
              const normalized = typeof normalizeSector === 'function' ? normalizeSector(State.profile.domain) : null;
              if (normalized) sectorId = normalized;
          }
          
          let mockResult = null;
          if (typeof DemoDataMulti !== 'undefined' && DemoDataMulti[sectorId]) {
              mockResult = DemoDataMulti[sectorId];
          } else {
              mockResult = typeof DemoData !== 'undefined' ? DemoData : null;
          }
          
          State.updateAnalysis(mockResult);
          SearchCache.clearAll();
          resolve(mockResult);
        }, 2000);
      });
    }
  },

  async testConnection(config) {
    const adapter = this._getAdapter(config.provider);
    if (!adapter) throw new Error("Fournisseur IA inconnu.");
    return await adapter.testConnection(config);
  },

  async generateWithSearch(prompt) {
    const config = State.aiConfig;
    if (config && config.apiKey) {
      if (!this.canUse("webSearch")) {
        throw new Error("Votre fournisseur actuel ne prend pas en charge la recherche Web nécessaire à cette fonctionnalité.");
      }
      const adapter = this._getAdapter(config.provider);
      if (!adapter) throw new Error("Fournisseur IA inconnu ou non configuré.");
      return await adapter.generate(config, prompt, true);
    } else {
      throw new Error("Configuration IA manquante.");
    }
  },
};
