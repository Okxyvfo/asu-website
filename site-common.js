/* =========================================================
   SITE-COMMON — shared behavior for every main site page
   (index, news, classified, surveillance, deleted, themes,
   experiments). Include once near the end of <body>:
     <script src="site-common.js"></script>
   ========================================================= */

(function () {
  /* ---------- nav active-link highlighting ---------- */
  function markActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".asu-button").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === path) link.classList.add("active");
    });
  }

  /* ---------- corner archive message ticker ---------- */
  const ARCHIVE_MESSAGES = [
    "ARCHIVE STATUS: STABLE",
    "SEARCHING FOR ANOMALIES...",
    "NEW HOTLOG DETECTED",
    "CONNECTION SECURE",
    "UNAUTHORIZED ACCESS ATTEMPT LOGGED",
    "HOST SURVEILLANCE ACTIVE",
    "RECOVERING DELETED RECORDS...",
    "SIGNAL STABLE"
  ];

  function buildTicker() {
    const el = document.createElement("div");
    el.className = "site-ticker";
    el.id = "siteTicker";
    document.body.appendChild(el);
    return el;
  }

  function runTicker() {
    const el = document.getElementById("siteTicker") || buildTicker();
    el.textContent = ARCHIVE_MESSAGES[Math.floor(Math.random() * ARCHIVE_MESSAGES.length)];
    el.classList.add("visible");
    setTimeout(() => el.classList.remove("visible"), 4500);
    setTimeout(runTicker, 12000 + Math.random() * 13000);
  }

  /* ---------- tiny ambient screen flicker ---------- */
  function scheduleFlicker() {
    setTimeout(() => {
      document.body.classList.add("site-flicker");
      setTimeout(() => document.body.classList.remove("site-flicker"), 120);
      scheduleFlicker();
    }, 25000 + Math.random() * 25000);
  }

  function boot() {
    markActiveNav();
    setTimeout(runTicker, 5000);
    scheduleFlicker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
