const ProviderRegistry = {
  providers: {
    // Primary
    gemini: {
      id: "gemini", name: "Google Gemini", protocol: "gemini-native", adapter: "gemini",
      defaultEndpoint: "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
      defaultModel: "gemini-1.5-flash", browserCors: true, capabilities: { webSearch: true, textGeneration: true, structuredOutput: true }
    },
    groq: {
      id: "groq", name: "Groq", protocol: "openai-compatible", adapter: "openai-compatible",
      defaultEndpoint: "https://api.groq.com/openai/v1",
      defaultModel: "llama3-8b-8192", browserCors: true, capabilities: { webSearch: false, textGeneration: true, structuredOutput: true }
    },
    openrouter: {
      id: "openrouter", name: "OpenRouter", protocol: "openai-compatible", adapter: "openai-compatible",
      defaultEndpoint: "https://openrouter.ai/api/v1",
      defaultModel: "openai/gpt-4o-mini", browserCors: true, capabilities: { webSearch: false, textGeneration: true, structuredOutput: true }
    },
    cerebras: {
      id: "cerebras", name: "Cerebras", protocol: "openai-compatible", adapter: "openai-compatible",
      defaultEndpoint: "https://api.cerebras.ai/v1",
      defaultModel: "llama3.1-8b", browserCors: true, capabilities: { webSearch: false, textGeneration: true, structuredOutput: false }
    },
    // Secondary
    openai: {
      id: "openai", name: "OpenAI", protocol: "openai-compatible", adapter: "openai-compatible",
      defaultEndpoint: "https://api.openai.com/v1",
      defaultModel: "gpt-4o-mini", browserCors: true, capabilities: { webSearch: false, textGeneration: true, structuredOutput: true }
    },
    mistral: {
      id: "mistral", name: "Mistral AI", protocol: "openai-compatible", adapter: "openai-compatible",
      defaultEndpoint: "https://api.mistral.ai/v1",
      defaultModel: "mistral-small-latest", browserCors: true, capabilities: { webSearch: false, textGeneration: true, structuredOutput: true }
    },
    deepseek: {
      id: "deepseek", name: "DeepSeek", protocol: "openai-compatible", adapter: "openai-compatible",
      defaultEndpoint: "https://api.deepseek.com",
      defaultModel: "deepseek-chat", browserCors: true, capabilities: { webSearch: false, textGeneration: true, structuredOutput: true }
    },
    anthropic: {
      id: "anthropic", name: "Anthropic Claude", protocol: "anthropic", adapter: "anthropic",
      defaultEndpoint: "https://api.anthropic.com/v1/messages",
      defaultModel: "claude-3-haiku-20240307", browserCors: true, capabilities: { webSearch: false, textGeneration: true, structuredOutput: true }
    },
    cohere: {
      id: "cohere", name: "Cohere", protocol: "cohere", adapter: "cohere",
      defaultEndpoint: "https://api.cohere.ai/v1/chat",
      defaultModel: "command-r", browserCors: true, capabilities: { webSearch: true, textGeneration: true, structuredOutput: true }
    }
  },

  get(id) {
    return this.providers[id] || null;
  },

  getAll() {
    return Object.values(this.providers);
  },

  getAdapter(adapterId) {
    const map = {
      "gemini": typeof GeminiAdapter !== 'undefined' ? GeminiAdapter : null,
      "openai-compatible": typeof OpenAICompatibleAdapter !== 'undefined' ? OpenAICompatibleAdapter : null,
      "anthropic": typeof AnthropicAdapter !== 'undefined' ? AnthropicAdapter : null,
      "cohere": typeof CohereAdapter !== 'undefined' ? CohereAdapter : null
    };
    return map[adapterId] || null;
  }
};
