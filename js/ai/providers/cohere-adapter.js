window.CohereAdapter = {
  id: "cohere",

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
    let model = config.model || (providerDef ? providerDef.defaultModel : "command-r");
    let endpoint = config.endpoint || (providerDef ? providerDef.defaultEndpoint : "https://api.cohere.ai/v1/chat");

    const body = {
      model: model,
      message: prompt,
      temperature: 0.2
    };

    if (useSearch) {
      body.connectors = [{ id: "web-search" }];
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${config.apiKey}`
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errText = "";
        try { errText = await response.text(); } catch(e) {}
        
        const err = new Error(`Erreur Cohere (${response.status}) : ${errText}`);
        err.name = "ProviderConnectionError";
        err.provider = "cohere";
        err.httpStatus = response.status;
        err.reason = errText;
        throw err;
      }

      const data = await response.json();
      return this.parseResponse(data);
    } catch (e) {
      if (e.name === "ProviderConnectionError") throw e;

      const err = new Error("Erreur de connexion Cohere : " + e.message);
      err.name = "ProviderConnectionError";
      err.provider = "cohere";
      err.httpStatus = 0; // 0 for network/fetch errors
      err.reason = e.message;
      throw err;
    }
  },

  parseResponse(data) {
    try {
      if (!data.text) {
        throw new Error("Aucune réponse du modèle.");
      }
      let content = data.text;
      content = content
        .replace(/^\s*```json/m, "")
        .replace(/```\s*$/m, "")
        .trim();
      const parsed = JSON.parse(content);
      return { result: parsed, grounding: data.search_results || null };
    } catch (e) {
      console.error("Erreur de parsing AI (Cohere):", e);
      throw new Error(
        "La réponse du modèle n'a pas pu être interprétée (JSON invalide).",
      );
    }
  },
};
