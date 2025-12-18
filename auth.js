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

  // 🔒 HARD BLOCK — no session, no access (non-negotiable)
  if (!sessionStorage.getItem("auth_user")) {
    window.location.replace("login.html");
    return;
  }

  // Parse user AFTER existence is confirmed
  let user;
  try {
    user = JSON.parse(sessionStorage.getItem("auth_user"));
  } catch (e) {
    sessionStorage.removeItem("auth_user");
    window.location.replace("login.html");
    return;
  }

  // 🔒 Invalid role
  if (!user.role || !this.permissions[user.role]) {
    alert("Invalid access");
    sessionStorage.removeItem("auth_user");
    window.location.replace("login.html");
    return;
  }

  // 🔒 Section not allowed
  if (!this.permissions[user.role].includes(section)) {
    alert("Access denied");
    window.location.replace("index.html");
  }
}



