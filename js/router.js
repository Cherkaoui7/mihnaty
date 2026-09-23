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

    // ── Demo mode activation / deactivation ──
    const demoState = typeof DemoState === "undefined" ? null : DemoState;
    if (demoState) {
      if (hash === "demo") {
        demoState.activate();
      } else {
        demoState.deactivate();
      }
    }

    // ── Update mode indicator badge ──
    this._updateModeIndicator();

    // ── Resolve view ──
    if (!Views[hash]) hash = "dashboard";

    // The CV analysis service is not available in the online version yet.
    // Keep the route active, but show a clear temporary production message.
    const isUploadTemporarilyUnavailable = hash === "upload";

    // Update View
    const routerView = document.getElementById("router-view");
    routerView.innerHTML = isUploadTemporarilyUnavailable
      ? this.renderUnderConstructionPage()
      : Views[hash];

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

  renderUnderConstructionPage() {
    return `
      <section style="min-height:calc(100vh - 128px); display:flex; align-items:center; justify-content:center; text-align:center;">
        <div class="card" style="max-width:620px; width:100%; padding:3rem 2rem;">
          <div style="font-size:3rem; margin-bottom:1rem;">🚧</div>
          <h2 style="margin-bottom:1rem;">Page en cours de production</h2>
          <p style="color:var(--text-muted); line-height:1.6; margin-bottom:1.75rem;">
            L'analyse de CV sera bientôt disponible. Merci de revenir prochainement.
          </p>
          <button class="btn btn-secondary" onclick="App.navigate('dashboard')">Retour au dashboard</button>
        </div>
      </section>`;
  },

  /**
   * Updates the mode indicator badge in the header.
   */
  _updateModeIndicator() {
    const badge = document.getElementById("mode-indicator-badge");
    if (!badge) return;

    if (typeof DemoState !== "undefined" && DemoState.isActive) {
      badge.innerHTML = `<span style="background:#fef3c7; color:#92400e; padding:0.25rem 0.75rem; border-radius:20px; font-size:0.8rem; font-weight:600;">🎬 MODE DÉMO</span>`;
      badge.style.display = "inline-block";
    } else if (State.aiConfig && State.aiConfig.apiKey) {
      badge.innerHTML = `<span style="background:#d1fae5; color:#065f46; padding:0.25rem 0.75rem; border-radius:20px; font-size:0.8rem; font-weight:600;">🟢 MODE RÉEL</span>`;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
  },
};
