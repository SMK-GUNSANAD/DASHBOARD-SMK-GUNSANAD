// auth.js — Centralised authentication manager

const auth = {

  login(userData) {
    sessionStorage.setItem("auth_user", JSON.stringify(userData));
  },

  logout() {
    sessionStorage.removeItem("auth_user");
    window.location.href = "login.html";
  },

  getUser() {
    const data = sessionStorage.getItem("auth_user");
    return data ? JSON.parse(data) : null;
  },

  isLoggedIn() {
    return this.getUser() !== null;
  },

  requireLogin() {
    if (!this.isLoggedIn()) {
      window.location.href = "login.html";
    }
  }

};
