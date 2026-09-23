function getUserFriendlyProviderError(error) {
  if (error.name !== 'ProviderConnectionError') {
    if (error.message && error.message.includes("Failed to fetch")) {
      return "Impossible de contacter le service IA. VÃ©rifiez votre connexion.";
    }
    return "Une erreur est survenue lors de la connexion au fournisseur IA.";
  }
  
  if (error.httpStatus === 401) return "Clé API invalide."; if (error.httpStatus === 402) return "Crédit / paiement requis."; if (error.httpStatus === 404) return "Endpoint ou modèle introuvable."; if (error.httpStatus === 503) return "Service indisponible."; if (error.httpStatus === 429) { if (error.provider === "bazaarlink") { return "Le quota gratuit de BazaarLink a été atteint." + (error.freeOnly !== false ? " [ Réessayer plus tard ] ou [ Changer de fournisseur ]" : ""); } return "La limite dutilisation a été atteinte."; } if (error.httpStatus === 0) {
    return "Impossible de contacter le service IA. VÃ©rifiez votre connexion.";
  }

  // Si on a une raison HTTP, on la renvoie pour que l'utilisateur comprenne l'erreur exacte
  if (error.reason) {
    return `Erreur ${error.httpStatus} : ${error.reason.substring(0, 150)}`;
  }
  
  return error.message || "Une erreur est survenue lors de la connexion au fournisseur IA.";
}

const ProviderDetector = {
  async detect(apiKey) {
    if (!apiKey) throw new Error("ClÃ© API vide.");

    // Temporary logs per user request (no full API key)
    console.log(`[ProviderDetector] key length: ${apiKey.length}`);
    console.log(`[ProviderDetector] first segment: ${apiKey.substring(0, 4)}...`);

    // Heuristic detection based on prefix
    let candidateProvider = null;
    if (apiKey.startsWith("AIza") || apiKey.startsWith("AQ")) {
      candidateProvider = 'gemini';
    } else if (apiKey.startsWith('bl-') || apiKey.startsWith('bazaar-')) {
      candidateProvider = 'bazaarlink';
    } else if (apiKey.startsWith("gsk_")) {
      candidateProvider = "groq";
    } else if (apiKey.startsWith("sk-or-v1-")) {
      candidateProvider = "openrouter";
    } else if (apiKey.startsWith("sk-ant-")) {
      candidateProvider = "anthropic";
    } else if (apiKey.startsWith("sk-")) {
      // Fallback for generic sk- (OpenAI, DeepSeek, etc). We guess OpenAI first.
      candidateProvider = "openai";
    }

    console.log(`[ProviderDetector] candidate: ${candidateProvider || 'none'}`);

    if (!candidateProvider) {
      console.warn("Impossible d'identifier automatiquement le fournisseur depuis le format de la clÃ©.");
      return null;
    }

    const providerDef = ProviderRegistry.get(candidateProvider);
    if (!providerDef) return null;

    const adapter = ProviderRegistry.getAdapter(providerDef.adapter);
    if (!adapter) return null;

    const config = {
      provider: candidateProvider,
      apiKey: apiKey,
      endpoint: "", // let adapter use default
      model: "", // let adapter use default
    };

    console.log(`[ProviderDetector] test started: ${candidateProvider}`);

    try {
      const isValid = await adapter.testConnection(config);
      if (isValid) {
        console.log(`[ProviderDetector] test result: success`);
        return config; // Confirmed provider
      } else {
        console.log(`[ProviderDetector] test result: failure`);
        const err = new Error("Validation Ã©chouÃ©e sans code HTTP");
        err.name = "ProviderConnectionError";
        err.provider = candidateProvider;
        err.httpStatus = 400;
        throw err;
      }
    } catch (e) {
      console.log(`[ProviderDetector] test result: failure - ${e.message}`);
      
      // Development Debug Mode
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        console.error({
          provider: e.provider || candidateProvider,
          status: e.httpStatus,
          name: e.name,
          reason: e.reason || e.message
        });
      }
      
      // Propagate the original error if it's already structured
      if (e.name === "ProviderConnectionError") {
        throw e;
      }
      
      const err = new Error(e.message);
      err.name = "ProviderConnectionError";
      err.provider = candidateProvider;
      err.httpStatus = 0;
      throw err;
    }
  },
};
