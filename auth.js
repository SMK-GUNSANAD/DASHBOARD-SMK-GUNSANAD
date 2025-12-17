// auth.js — Centralised authentication manager (FINAL)

const auth = {

  // ======================
  // CONFIGURATION
  // ======================
  permissions: {
    Admin: ["akademik", "hem", "kokurikulum", "tingkatan6", "ppki"]
    // Future:
    // Teacher: ["akademik"]
    // Staff: ["hem"]
  },

  // ======================
  // SESSION HANDLING
  // ======================
  login(userData) {
    sessionStorage.setItem("auth_user", JSON.stringify(userData));
  },

  logout() {
    sessionStorage.removeItem("auth_user");
    window.location.replace("login.html");
  },

  getUser() {
    const raw = sessionStorage.getItem("auth_user");
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },

  isLoggedIn() {
    return this.getUser() !== null;
  },

  // ======================
  // GUARDS
  // ======================
  requireLogin() {
    if (!this.isLoggedIn()) {
      window.location.replace("login.html");
    }
  },

  requireSection(section) {
  console.log("requireSection called with:", section);

  const user = this.getUser();

  // 🔒 Not logged in
  if (!user) {
    window.location.replace("login.html");
    return;
  }

  // 🔒 No section provided (ignore accidental calls)
  if (!section) {
    console.warn("requireSection called without section — ignored");
    return;
  }

  // 🔒 Invalid role
  if (!user.role || !this.permissions[user.role]) {
    alert("Invalid access");
    this.logout();
    return;
  }

  // 🔒 Section not allowed
  if (!this.permissions[user.role].includes(section)) {
    alert("Access denied");
    window.location.replace("index.html");
  }
}


