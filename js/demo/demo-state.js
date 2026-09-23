/**
 * DemoState — Isolated state management for demo mode.
 * 
 * Uses sessionStorage key "mihnati_demo_state" exclusively.
 * NEVER touches mihnati_profile, mihnati_analysis, or mihnati_ai_config.
 */
const DemoState = {
  _KEY: "mihnati_demo_state",

  /** Whether demo mode is currently active. */
  isActive: false,

  /** Current demo step: 'idle', 'uploading', 'extracting', 'analyzing', 'complete' */
  step: "idle",

  /** The loaded demo data (set after simulation completes). */
  data: null,

  /**
   * Activate demo mode.
   */
  activate() {
    this.isActive = true;
    this.step = "idle";
    this.data = null;
    this._save();
  },

  /**
   * Deactivate demo mode (e.g. when navigating to a real route).
   */
  deactivate() {
    this.isActive = false;
    this.step = "idle";
    this.data = null;
    // Don't clear storage here — just mark inactive in memory
  },

  /**
   * Update the current step.
   */
  setStep(step) {
    this.step = step;
    this._save();
  },

  /**
   * Store the simulated analysis data.
   */
  setData(data) {
    this.data = data;
    this._save();
  },

  /**
   * Reset demo state completely.
   * Does NOT affect real user data (mihnati_profile, mihnati_analysis, etc.)
   */
  reset() {
    this.isActive = false;
    this.step = "idle";
    this.data = null;
    try {
      sessionStorage.removeItem(this._KEY);
    } catch (e) {
      // Ignore storage errors
    }
  },

  /**
   * Persist demo state to sessionStorage.
   */
  _save() {
    try {
      sessionStorage.setItem(this._KEY, JSON.stringify({
        isActive: this.isActive,
        step: this.step,
      }));
    } catch (e) {
      // Ignore storage errors
    }
  },

  /**
   * Restore demo state from sessionStorage (called on page load).
   */
  _restore() {
    try {
      const saved = sessionStorage.getItem(this._KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.isActive = parsed.isActive || false;
        this.step = parsed.step || "idle";
      }
    } catch (e) {
      // Ignore errors
    }
  },
};

// Auto-restore on load
DemoState._restore();
