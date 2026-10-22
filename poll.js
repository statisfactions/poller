/* Shared helpers for index / present / control. Loaded after the Firebase compat SDK and config.js. */
(function () {
  const cfg = window.POLLER_FIREBASE_CONFIG;
  if (!cfg || cfg.apiKey === "PASTE") {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.innerHTML =
        '<p style="font-family:sans-serif;padding:24px">config.js has no Firebase settings yet. See README.md.</p>';
    });
    return;
  }
  firebase.initializeApp(cfg);
  const db = firebase.database();

  const params = new URLSearchParams(location.search);
  const session = (params.get("s") || "demo").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40) || "demo";
  const base = db.ref("sessions/" + session);

  function deviceId() {
    const k = "poller-device";
    let id = null;
    try { id = localStorage.getItem(k); } catch (e) {}
    if (!id) {
      id = "d" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      try { localStorage.setItem(k, id); } catch (e) {}
    }
    return id;
  }

  function participantUrl() {
    const u = new URL("index.html", location.href);
    u.search = "?s=" + session;
    return u.href;
  }

  function shortUrl() {
    return participantUrl().replace(/^https?:\/\//, "").replace(/index\.html/, "");
  }

  function sortedQuestions(qobj) {
    if (!qobj) return [];
    return Object.keys(qobj)
      .map((id) => Object.assign({ id }, qobj[id]))
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function drawQr(el, text, size) {
    if (!window.QRCode) return;
    el.innerHTML = "";
    new QRCode(el, { text, width: size, height: size, correctLevel: QRCode.CorrectLevel.M });
  }

  window.Poller = { db, base, session, deviceId, participantUrl, shortUrl, sortedQuestions, escapeHtml, drawQr };
})();
