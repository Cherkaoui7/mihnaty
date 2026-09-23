const OpenAIAdapter = {
  id: "openai",
  name: "OpenAI (Compatible)",

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

    let model = config.model || "gpt-4o-mini";
    let endpoint =
      config.endpoint || "https://api.openai.com/v1/chat/completions";

    const body = {
      model: model,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.2,
    };

    // Note: OpenAI API doesn't support the same built-in web search out of the box as Gemini
    // in a simple REST call without specific tools/assistants setup, so we ignore useSearch for now.

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Erreur OpenAI (${response.status}) : ${errText}`);
      }

      const data = await response.json();
      return this.parseResponse(data);
    } catch (e) {
      throw new Error("Erreur de connexion OpenAI : " + e.message);
    }
  },

  parseResponse(data) {
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
      console.error("Erreur de parsing AI (OpenAI):", e);
      throw new Error(
        "La réponse du modèle n'a pas pu être interprétée (JSON invalide).",
      );
    }
  },
};
