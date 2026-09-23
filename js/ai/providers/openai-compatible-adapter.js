window.OpenAICompatibleAdapter = {
  id: "openai-compatible",

  async testConnection(config) {
    try {
      if (config.provider === 'bazaarlink') {
         let endpoint = config.endpoint || "https://api.bazaarlink.ai/v1";
         if (endpoint.endsWith("/chat/completions")) {
            endpoint = endpoint.replace("/chat/completions", "");
         }
         if (endpoint.endsWith("/")) endpoint = endpoint.slice(0, -1);
         const modelsEndpoint = endpoint + "/models";
         const modelsRes = await apiFetch(modelsEndpoint, {
             headers: { "Authorization": `Bearer ${config.apiKey}` }
         });
         if (!modelsRes.ok) {
             const errText = await modelsRes.text().catch(() => "");
             const err = new Error(`Erreur validation models BazaarLink: ${errText}`);
             err.name = "ProviderConnectionError";
             err.httpStatus = modelsRes.status;
             err.reason = errText;
             err.provider = 'bazaarlink';
             err.freeOnly = config.freeOnly;
             throw err;
         }
         const modelsData = await modelsRes.json();
         const modelList = modelsData.data || [];
         config.availableModels = modelList.map(m => m.id);
         
         if (!config.model) {
             const hasAutoFree = modelList.some(m => m.id === 'auto:free');
             if (hasAutoFree) {
                 config.model = 'auto:free';
             } else {
                 const freeModel = modelList.find(m => m.id && m.id.toLowerCase().includes('free'));
                 if (freeModel) {
                     config.model = freeModel.id;
                 } else if (modelList.length > 0) {
                     config.model = modelList[0].id;
                 }
             }
         }
      }

      const res = await this.generate(
        config,
        'Return only OK',
        false,
        true
      );
      if (res && res.result) return true;
      return false;
    } catch (e) {
      throw e;
    }
  },

  async generate(config, prompt, useSearch = false, isTest = false) {
    if (!config || !config.apiKey) {
      throw new Error("Clé API manquante ou invalide.");
    }

    const providerDef = ProviderRegistry.get(config.provider);
    let model = config.model || (providerDef ? providerDef.defaultModel : "");
    
    let endpoint = config.endpoint || (providerDef ? providerDef.defaultEndpoint : "");
    if (!endpoint.endsWith("/chat/completions") && !endpoint.includes("/models/")) {
       if (endpoint.endsWith("/")) endpoint += "chat/completions";
       else endpoint += "/chat/completions";
    }

    const body = {
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    };
    
    if (!isTest) {
      if (providerDef) {
         if (providerDef.id === 'openai' || providerDef.id === 'groq' || providerDef.id === 'deepseek' || providerDef.id === 'gemini') {
           body.response_format = { type: "json_object" };
         }
      } else if (config.provider === 'openai' || config.provider === 'groq' || config.provider === 'deepseek') {
         body.response_format = { type: "json_object" };
      }
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.apiKey}`
    };

    if (config.provider === "openrouter") {
      headers["HTTP-Referer"] = window.location.href;
      headers["X-Title"] = "Mihnati";
    }
    
    if (config.provider === "bazaarlink" && config.freeOnly !== false && !isTest) {
      headers["X-Free-Fallback"] = "false";
    }

    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
       console.log("[Dev] Provider:", config.provider);
       console.log("[Dev] Final Request URL:", endpoint);
       console.log("[Dev] Model:", model);
    }

    try {
      const response = await apiFetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errText = "";
        try { errText = await response.text(); } catch(e) {}
        
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
           console.log("[Dev] HTTP Status:", response.status);
           console.log("[Dev] Error:", errText);
        }
        
        const err = new Error(`Erreur ${config.provider} (${response.status}) : ${errText}`);
        err.name = "ProviderConnectionError";
        err.provider = config.provider;
        err.httpStatus = response.status;
        err.reason = errText;
        err.freeOnly = config.freeOnly;
        throw err;
      }

      if (isTest) {
         return { result: "OK", grounding: null };
      }
      
      const data = await response.json();
      return this.parseResponse(data, config.provider);
    } catch (e) {
      if (e.name === "ProviderConnectionError") throw e;

      const err = new Error(`Erreur de connexion ${config.provider} : ` + e.message);
      err.name = "ProviderConnectionError";
      err.provider = config.provider;
      err.httpStatus = 0;
      err.reason = e.message;
      throw err;
    }
  },

  parseResponse(data, providerId) {
    try {
      if (!data.choices || data.choices.length === 0) {
        throw new Error("Aucune réponse du modèle.");
      }
      let content = data.choices[0].message.content;
      content = content
        .replace(/^\s*```json/m, "")
        .replace(/```\s*$/m, "")
        .trim();
      const parsed = JSON.parse(content);
      return { result: parsed, grounding: null };
    } catch (e) {
      console.error(`Erreur de parsing AI (${providerId}):`, e);
      throw new Error(
        "La réponse du modèle n'a pas pu être interprétée (JSON invalide).",
      );
    }
  }
};
