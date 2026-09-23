const SearchCache = {
  get(key) {
    try {
      const item = sessionStorage.getItem(`mihnati_search_${key}`);
      if (!item) return null;
      const parsed = JSON.parse(item);

      // Expire after 30 minutes
      if (Date.now() - parsed.timestamp > 30 * 60 * 1000) {
        this.remove(key);
        return null;
      }
      return parsed.data;
    } catch (e) {
      return null;
    }
  },

  set(key, data) {
    sessionStorage.setItem(
      `mihnati_search_${key}`,
      JSON.stringify({
        timestamp: Date.now(),
        data: data,
      }),
    );
  },

  remove(key) {
    sessionStorage.removeItem(`mihnati_search_${key}`);
  },

  clearAll() {
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith("mihnati_search_"))
      .forEach((k) => sessionStorage.removeItem(k));
  },
};
