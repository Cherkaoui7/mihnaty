window.AnthropicAdapter = {
  id: "anthropic",

  async testConnection(config) {
    try {
      const res = await this.generate(
        config,
        'Return only JSON: {"status":"OK"}',
        false,
      );
      if (res && res.result) return true;
      return false;
    } catch (e) {
      throw e;
    }
  },

  async generate(config, prompt, useSearch = false) {
    if (!config || !config.apiKey) {
      throw new Error("Clé API manquante ou invalide.");
    }

    const providerDef = ProviderRegistry.get(config.provider);
    let model = config.model || (providerDef ? providerDef.defaultModel : "claude-3-haiku-20240307");
    let endpoint = config.endpoint || (providerDef ? providerDef.defaultEndpoint : "https://api.anthropic.com/v1/messages");
    
    if (endpoint && !endpoint.startsWith('https://') && !endpoint.startsWith('http://localhost') && !endpoint.startsWith('http://127.0.0.1')) {
        throw new Error("L'endpoint doit commencer par https:// (ou http://localhost pour le développement).");
    }

    const body = {
      model: model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4096,
      temperature: 0.2
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerously-allow-browser": "true" // Required for frontend calls
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errText = "";
        try { errText = await response.text(); } catch(e) {}
        
        const err = new Error(`Erreur Anthropic (${response.status}) : ${errText}`);
        err.name = "ProviderConnectionError";
        err.provider = "anthropic";
        err.httpStatus = response.status;
        err.reason = errText;
        throw err;
      }

      const data = await response.json();
      return this.parseResponse(data);
    } catch (e) {
      if (e.name === "ProviderConnectionError") throw e;

      const err = new Error("Erreur de connexion Anthropic : " + e.message);
      err.name = "ProviderConnectionError";
      err.provider = "anthropic";
      err.httpStatus = 0; // 0 for network/fetch errors
      err.reason = e.message;
      throw err;
    }
  },

  parseResponse(data) {
    try {
      if (!data.content || data.content.length === 0) {
        throw new Error("Aucune réponse du modèle.");
      }
      let content = data.content[0].text;
      content = content
        .replace(/^\s*```json/m, "")
        .replace(/```\s*$/m, "")
        .trim();
      const parsed = JSON.parse(content);
      return { result: parsed, grounding: null };
    } catch (e) {
      console.error("Erreur de parsing AI (Anthropic):", e);
      throw new Error(
        "La réponse du modèle n'a pas pu être interprétée (JSON invalide).",
      );
    }
  },
};
