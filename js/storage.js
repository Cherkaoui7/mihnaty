const Storage = {
  // LocalStorage (Persistent)
  get(key) {
    try {
      const item = localStorage.getItem(`mihnati_${key}`);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    localStorage.setItem(`mihnati_${key}`, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(`mihnati_${key}`);
  },

  // SessionStorage (Temporary - for API Keys)
  getSession(key) {
    try {
      const item = sessionStorage.getItem(`mihnati_${key}`);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  },
  setSession(key, value) {
    sessionStorage.setItem(`mihnati_${key}`, JSON.stringify(value));
  },
  removeSession(key) {
    sessionStorage.removeItem(`mihnati_${key}`);
  },

  clearAll() {
    // Clear all mihnati data from both storages
    Object.keys(localStorage)
      .filter((k) => k.startsWith("mihnati_"))
      .forEach((k) => localStorage.removeItem(k));

    Object.keys(sessionStorage)
      .filter((k) => k.startsWith("mihnati_"))
      .forEach((k) => sessionStorage.removeItem(k));
  },
};
