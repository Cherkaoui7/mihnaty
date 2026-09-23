const UI = {
  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast show`;

    // Simple color coding via border
    if (type === "error") toast.style.borderLeft = "4px solid var(--red)";
    else if (type === "success")
      toast.style.borderLeft = "4px solid var(--green)";
    else toast.style.borderLeft = "4px solid var(--primary-color)";

    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  showLoader(message = "Chargement...") {
    document.getElementById("loader-message").innerText = message;
    document.getElementById("global-loader").classList.remove("hidden");
  },

  hideLoader() {
    document.getElementById("global-loader").classList.add("hidden");
  },

  updateGreeting() {
    const greeting = document.getElementById("header-user-greeting");
    if (greeting) {
      if (
        State.profile &&
        State.profile.name &&
        State.profile.name !== "Non détecté"
      ) {
        greeting.innerText = `Bonjour ${State.profile.name.split(" ")[0]}`;
      } else {
        greeting.innerText = "Bonjour 👋";
      }
    }
  },
};
