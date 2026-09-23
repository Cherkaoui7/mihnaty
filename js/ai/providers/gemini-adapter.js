const GeminiAdapter = {
  id: "gemini",
  name: "Google Gemini",

  async testConnection(config) {
    try {
      // Un simple test : retourner du JSON
      const res = await this.generate(
        config,
        'Return only valid JSON: {"status": "OK"}',
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

    let model = config.model || "gemini-2.5-flash";
    let endpoint = config.endpoint || `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const isOpenAICompatible = endpoint.includes("/openai/") || endpoint.includes("chat/completions");

    let headers = { "Content-Type": "application/json" };
    let body;

    if (isOpenAICompatible) {
      headers["Authorization"] = `Bearer ${config.apiKey}`;
      body = {
        model: model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        response_format: { type: "json_object" }
      };
      // For OpenAI-compatible search with Gemini (not fully standardized, but we omit tools for now or pass as OpenAI tools if needed)
    } else {
      headers["x-goog-api-key"] = config.apiKey;
      
      // Ensure we don't accidentally append ?key= if it's already using header
      if (endpoint.includes("key=")) {
          const urlObj = new URL(endpoint);
          urlObj.searchParams.delete('key');
          endpoint = urlObj.toString();
      }

      body = {
        model: `models/${model}`,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          response_mime_type: "application/json",
        },
      };

      if (useSearch) {
        body.tools = [{ googleSearch: {} }];
      }
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Erreur Gemini (${response.status}) : ${errText}`);
      }

      const data = await response.json();
      return isOpenAICompatible ? this.parseOpenAIResponse(data) : this.parseResponse(data);
    } catch (e) {
      throw new Error("Erreur de connexion Gemini : " + e.message);
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
