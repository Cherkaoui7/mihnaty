const Router = {
  init() {
    window.addEventListener("hashchange", this.handleRoute.bind(this));

    // Mobile menu toggle
    document.getElementById("menu-toggle").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("open");
    });

    // Initialize active route or default
    if (!window.location.hash) {
      window.location.hash = "#upload";
    } else {
      this.handleRoute();
    }
  },

  handleRoute() {
    let hash = window.location.hash.substring(1);

    if (hash === "demo") {
      // Bypass upload and load mock data directly
      window.State.updateAIConfig(null);
      if (window.SearchCache) window.SearchCache.clearAll();

      if (window.MockData) {
        const mockResult = window.MockData.getAnalysis("Informatique");
        window.State.updateAnalysis(mockResult);
      }
      window.location.hash = "#dashboard";
      return;
    }

    if (!Views[hash]) hash = "dashboard";

    // Update View
    const routerView = document.getElementById("router-view");
    routerView.innerHTML = Views[hash];

    // Update active nav link
    document
      .querySelectorAll(".nav-item")
      .forEach((el) => el.classList.remove("active"));
    const activeLink = document.querySelector(
      `.nav-item[data-route="${hash}"]`,
    );
    if (activeLink) activeLink.classList.add("active");

    // Close sidebar on mobile
    document.getElementById("sidebar").classList.remove("open");

    // Run specific view initializer
    this.runViewLogic(hash);
  },

  runViewLogic(viewName) {
    // App.js will register logic for views
    if (window.App && window.App.viewControllers[viewName]) {
      window.App.viewControllers[viewName]();
    }
  },
};
