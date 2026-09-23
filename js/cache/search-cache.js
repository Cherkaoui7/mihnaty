const SearchCache = {
  get(key, ttlMinutes = 30) {
    try {
      const item = localStorage.getItem(`mihnati_search_${key}`);
      if (!item) return null;
      const parsed = JSON.parse(item);

      // Expire after TTL
      if (Date.now() - parsed.timestamp > ttlMinutes * 60 * 1000) {
        this.remove(key);
        return null;
      }
      return parsed.data;
    } catch (e) {
      return null;
    }
  },

  set(key, data) {
    localStorage.setItem(
      `mihnati_search_${key}`,
      JSON.stringify({
        timestamp: Date.now(),
        data: data,
      }),
    );
  },

  remove(key) {
    localStorage.removeItem(`mihnati_search_${key}`);
  },

  clearAll() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("mihnati_search_"))
      .forEach((k) => localStorage.removeItem(k));
  },
};
