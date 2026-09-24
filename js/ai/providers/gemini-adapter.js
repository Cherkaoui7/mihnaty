const GeminiAdapter = {
  id: "gemini",
  name: "Google Gemini",

  async testConnection(config) {
    try {
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

    const providerDef = ProviderRegistry.get(config.provider || "gemini");
    let model = config.model || (providerDef ? providerDef.defaultModel : "gemini-1.5-flash");
    let endpoint = config.endpoint || (providerDef ? providerDef.defaultEndpoint : `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`);
    
    if (endpoint && !endpoint.startsWith('https://') && !endpoint.startsWith('http://localhost') && !endpoint.startsWith('http://127.0.0.1')) {
        throw new Error("L'endpoint doit commencer par https:// (ou http://localhost pour le développement).");
    }
    
    if (endpoint.includes("{model}")) {
      endpoint = endpoint.replace("{model}", model);
    }

    const isOpenAICompatible = endpoint.includes("/openai/") || endpoint.includes("chat/completions");

    let headers = { "Content-Type": "application/json" };
    let body;

    if (isOpenAICompatible) {
      headers["Authorization"] = `Bearer ${config.apiKey}`;
      body = {
        model: model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      };
      if (!isTest) {
        body.response_format = { type: "json_object" };
      }
    } else {
      headers["x-goog-api-key"] = config.apiKey;
      
      if (endpoint.includes("key=")) {
          const urlObj = new URL(endpoint);
          urlObj.searchParams.delete('key');
          endpoint = urlObj.toString();
      }

      body = {
        contents: [{ parts: [{ text: prompt }] }]
      };
      
      if (!isTest) {
        body.generationConfig = {
          temperature: 0.2,
          response_mime_type: "application/json",
        };
      }

      if (useSearch && !isTest) {
        body.tools = [{ googleSearch: {} }];
      }
    }
    
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
       console.log("[Dev] Provider:", config.provider || "gemini");
       console.log("[Dev] Adapter: GeminiAdapter");
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
        
        const err = new Error(`Erreur Gemini (${response.status}) : ${errText}`);
        err.name = "ProviderConnectionError";
        err.provider = "gemini";
        err.httpStatus = response.status;
        err.reason = errText;
        throw err;
      }

      if (isTest) {
        return { result: "OK", grounding: null };
      }
      const data = await response.json();
      return isOpenAICompatible ? this.parseOpenAIResponse(data) : this.parseResponse(data);
    } catch (e) {
      if (e.name === "ProviderConnectionError") throw e;
      
      const err = new Error("Erreur réseau ou connexion Gemini : " + e.message);
      err.name = "ProviderConnectionError";
      err.provider = "gemini";
      err.httpStatus = 0;
      err.reason = e.message;
      throw err;
    }
  },

  parseOpenAIResponse(data) {
    try {
      if (!data.choices || data.choices.length === 0) {
        throw new Error("Aucune réponse du modèle (OpenAI-compatible).");
      }
      let content = data.choices[0].message.content;
      content = content
        .replace(/^\s*```json/m, "")
        .replace(/```\s*$/m, "")
        .trim();
      return { result: JSON.parse(content), grounding: null };
    } catch (e) {
      console.error("Erreur de parsing AI (Gemini OpenAI-compatible):", e);
      throw new Error("La réponse du modèle n'a pas pu être interprétée (JSON invalide).");
    }
  },

  parseResponse(data) {
    try {
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("Aucune réponse du modèle.");
      }
      const candidate = data.candidates[0];
      let content = candidate.content.parts[0].text;
      const grounding = candidate.groundingMetadata || null;

      content = content
        .replace(/^\s*```json/m, "")
        .replace(/```\s*$/m, "")
        .trim();
      const parsed = JSON.parse(content);
      return { result: parsed, grounding: grounding };
    } catch (e) {
      console.error("Erreur de parsing AI (Gemini):", e);
      throw new Error(
        "La réponse du modèle n'a pas pu être interprétée (JSON invalide).",
      );
    }
  },
};
