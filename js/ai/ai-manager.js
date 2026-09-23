const AIManager = {
  async analyzeCV(cvText) {
    if (!cvText || cvText.trim().length < 50) {
      throw new Error("Le CV est vide ou illisible.");
    }

    const config = State.aiConfig;

    if (config && config.apiKey) {
      const prompt = PromptBuilder.buildCVAnalysisPrompt(cvText, State.profile);
      const adapter = ProviderRegistry.getAdapter(config.provider);
      if (!adapter) throw new Error("Fournisseur IA inconnu ou non configuré.");

      const res = await adapter.generate(config, prompt, false);

      const jsonResult = res.result;
      State.updateAnalysis(jsonResult);
      SearchCache.clearAll();
      return jsonResult;
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockResult = MockData.getAnalysis(
            State.profile ? State.profile.domain : "Informatique",
          );
          State.updateAnalysis(mockResult);
          SearchCache.clearAll();
          resolve(mockResult);
        }, 2000);
      });
    }
  },

  async testConnection(config) {
    const adapter = ProviderRegistry.getAdapter(config.provider);
    if (!adapter) throw new Error("Fournisseur IA inconnu.");
    return await adapter.testConnection(config);
  },

  async generateWithSearch(prompt) {
    const config = State.aiConfig;
    if (config && config.apiKey) {
      const adapter = ProviderRegistry.getAdapter(config.provider);
      if (!adapter) throw new Error("Fournisseur IA inconnu ou non configuré.");
      return await adapter.generate(config, prompt, true);
    } else {
      throw new Error("Configuration IA manquante.");
    }
  },
};
