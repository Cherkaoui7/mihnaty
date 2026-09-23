const State = {
  profile: Storage.get("profile") || null,
  aiConfig: Storage.getSession("ai_config") || null,
  analysis: Storage.get("analysis") || null,
  preferences: Storage.get("preferences") || null,

  updateProfile(data) {
    this.profile = { ...this.profile, ...data };
    Storage.set("profile", this.profile);
  },

  updateAIConfig(data) {
    this.aiConfig = data;
    if (data) {
      Storage.setSession("ai_config", data);
    } else {
      Storage.removeSession("ai_config");
    }
  },

  updateAnalysis(data) {
    this.analysis = data;
    Storage.set("analysis", data);
  },

  clearAll() {
    this.profile = null;
    this.aiConfig = null;
    this.analysis = null;
    this.preferences = null;
    Storage.clearAll();
  },
};
