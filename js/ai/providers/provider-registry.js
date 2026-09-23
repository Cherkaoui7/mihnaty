const ProviderRegistry = {
  providers: {
    gemini: GeminiAdapter,
    openai: OpenAIAdapter,
  },

  getAdapter(id) {
    return this.providers[id] || null;
  },
};
