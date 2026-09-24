window.normalizeAIError = function(error, context = {}) {
  const provider = error.provider || context.provider || "Inconnu";
  const endpoint = error.endpoint || context.endpoint || "";
  
  let code = "UNKNOWN";
  let userMessage = "Une erreur est survenue lors de la connexion au fournisseur IA.";
  let technicalMessage = error.message || "Unknown error";
  let retryable = false;

  if (error.name === 'ProviderConnectionError' || error.name === 'TypeError') {
    // If it's a TypeError from fetch, or we explicitly caught a network issue
    if (error.message && (error.message.includes("Failed to fetch") || error.message.includes("NetworkError") || error.message.includes("CORS"))) {
      code = "CORS_OR_NETWORK_ERROR";
      userMessage = "Ce fournisseur ne permet pas actuellement les appels directs depuis le navigateur ou est inaccessible.";
      retryable = false;
    } else if (error.httpStatus) {
      if (error.httpStatus === 401 || error.httpStatus === 403) {
        code = "AUTH_ERROR";
        userMessage = "La clé API semble invalide ou les permissions sont insuffisantes.";
        retryable = false;
      } else if (error.httpStatus === 404) {
        code = "INVALID_ENDPOINT_OR_MODEL";
        userMessage = "L'endpoint API est incorrect ou le modèle n'est pas disponible.";
        retryable = false;
      } else if (error.httpStatus === 429) {
        code = "RATE_LIMITED";
        userMessage = "La limite de requêtes a été atteinte. Veuillez patienter.";
        retryable = true;
      } else if (error.httpStatus === 402) {
        code = "QUOTA_EXCEEDED";
        userMessage = "Le quota de ce fournisseur est actuellement dépassé ou un paiement est requis.";
        retryable = false;
      } else if (error.httpStatus >= 500) {
        code = "SERVER_ERROR";
        userMessage = "Le fournisseur IA rencontre actuellement des problèmes techniques.";
        retryable = true;
      }
    }
  }

  // Si on a une raison HTTP, on l'ajoute au message technique
  if (error.reason) {
    technicalMessage += ` | Reason: ${error.reason.substring(0, 200)}`;
  }

  return {
    code,
    userMessage,
    technicalMessage,
    retryable,
    provider,
    endpoint
  };
}

const ProviderDetector = {
  async detect(apiKey) {
    if (!apiKey) throw new Error("Clé API vide.");



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
      console.warn("Impossible d'identifier automatiquement le fournisseur depuis le format de la clé.");
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
        const err = new Error("Validation échouée sans code HTTP");
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
