const ProviderDetector = {
  async detect(apiKey) {
    if (!apiKey) throw new Error("Clé API vide.");

    // Heuristic detection based on prefix
    let candidateProvider = null;
    if (apiKey.startsWith("AIza") || apiKey.startsWith("AQ")) {
      candidateProvider = "gemini";
    } else if (apiKey.startsWith("sk-")) {
      candidateProvider = "openai";
    }

    if (!candidateProvider) {
      console.warn("Impossible d'identifier automatiquement le fournisseur depuis le format de la clé.");
      return null;
    }

    const adapter = ProviderRegistry.getAdapter(candidateProvider);
    if (!adapter) return null;

    const config = {
      provider: candidateProvider,
      apiKey: apiKey,
      endpoint: "", // let adapter use default
      model: "", // let adapter use default
    };

    try {
      const isValid = await adapter.testConnection(config);
      if (isValid) {
        return config; // Confirmed provider
      }
    } catch (e) {
      console.warn(`Test échoué pour le candidat ${candidateProvider} :`, e.message);
    }

    return null; // Return null if candidate failed or unknown key
  },
};
