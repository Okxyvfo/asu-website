/* Animated red/black background */
const canvas = document.createElement("canvas");
canvas.id = "bg";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

function drawFrame(timestamp) {
  const t = timestamp * 0.001;
  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = "#030000";
  ctx.fillRect(0, 0, W, H);

  const fogs = [
    { x: 0.15, y: 0.9, rx: 0.7, r: "160,0,0", phase: 0 },
    { x: 0.85, y: 0.85, rx: 0.6, r: "120,0,0", phase: 1.2 },
    { x: 0.5, y: 1.05, rx: 0.55, r: "180,0,0", phase: 2.6 },
    { x: 0.1, y: 0.2, rx: 0.45, r: "50,0,80", phase: 3.8 },
    { x: 0.9, y: 0.15, rx: 0.38, r: "35,0,60", phase: 5.1 },
    { x: 0.5, y: 0.5, rx: 0.35, r: "90,0,0", phase: 0.8 },
  ];

  for (const f of fogs) {
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.4 + f.phase);
    const alpha = 0.12 + 0.10 * pulse;
    const gx = W * f.x + Math.sin(t * 0.2 + f.phase) * 25;
    const gy = H * f.y + Math.cos(t * 0.25 + f.phase) * 18;
    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(W, H) * f.rx);

    grad.addColorStop(0, `rgba(${f.r},${alpha})`);
    grad.addColorStop(0.5, `rgba(${f.r},${alpha * 0.4})`);
    grad.addColorStop(1, `rgba(${f.r},0)`);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  if (Math.random() < 0.06) {
    const y = Math.random() * H;
    const h = 1 + Math.random() * 4;
    ctx.fillStyle = `rgba(180,0,0,${0.12 + Math.random() * 0.18})`;
    ctx.fillRect(0, y, W, h);
  }

  for (let y = 0; y < H; y += 4) {
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0, y, W, 2);
  }

  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(0.65, "rgba(0,0,0,0.45)");
  vig.addColorStop(1, "rgba(0,0,0,0.93)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);

  requestAnimationFrame(drawFrame);
}

requestAnimationFrame(drawFrame);

/* Nav tentacles */
document.querySelectorAll(".asu-button").forEach(button => {
  for (let i = 0; i < 7; i++) {
    const tentacle = document.createElement("span");
    tentacle.className = "tentacle";
    button.appendChild(tentacle);
  }
});

/* Logo secret glitch */
const messages = [
  "YOU'RE NOT SUPPOSED TO BE HERE",
  "HE IS ALWAYS WATCHING",
  "DON'T TRUST THE VOTES",
  "SOMETHING SURVIVED"
];

const codes = [
  "ERR://0xDEAD1337 — UNAUTHORIZED ACCESS",
  "SIG://0xFF2A3D00 — TRACE ACTIVE",
  "SYS://0xBAD0FF3E — MEMORY CORRUPT",
  "NET://0xC0DE0000 — UPLINK SEVERED"
];

const logo = document.getElementById("logoBox");
const overlay = document.getElementById("secretOverlay");
const secretMain = document.getElementById("secretMain");
const secretCode = document.getElementById("secretCode");

let glitchIndex = 0;

function fireSecretMessage() {
  const index = glitchIndex % messages.length;
  glitchIndex++;

  logo.classList.add("logo-glitch");
  secretMain.textContent = messages[index];
  secretCode.textContent = codes[index];
  overlay.classList.add("active");

  setTimeout(() => {
    logo.classList.remove("logo-glitch");
    overlay.classList.remove("active");

    setTimeout(fireSecretMessage, 20000 + Math.random() * 20000);
  }, 500 + Math.random() * 500);
}

setTimeout(fireSecretMessage, 3500);

/* Random archive quote */
const creepyQuotes = [
  "The archive remembers everything.",
  "He is always watching.",
  "Some contestants never left.",
  "Not all eliminations are permanent.",
  "The votes were counted before the challenge began.",
  "You were not cleared to read this file.",
  "The arena hears every confession.",
  "One name was removed from the cast list."
];

const quote = document.getElementById("creepyQuote");
if (quote) {
  quote.textContent = creepyQuotes[Math.floor(Math.random() * creepyQuotes.length)];
}

/* =========================================================
   VOICE TRANSMISSION — reusable component script
   Include once per page:  <script src="../voice-transmission.js"></script>
   Then drop the HTML snippet anywhere on the page and set
   data-audio-src to that character's quote file. Nothing else
   needs to change.
   ========================================================= */

(function () {
  let activeAudio = null;
  let activeSection = null;

  function resetSection(section) {
    const label = section.querySelector(".vt-label");
    const button = section.querySelector(".vt-button");
    label.textContent = "VOICE TRANSMISSION";
    section.classList.remove("vt-playing", "vt-glitch", "vt-terminated", "vt-complete");
    button.disabled = false;
  }

  // Tiny synthesized "radio sign-off" beep — no audio file needed.
  function playBeep() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.value = 920;

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
      osc.onended = () => ctx.close();
    } catch (e) {
      /* Web Audio unavailable — fail silently, no beep, no error to user */
    }
  }

  function initVoiceTransmission(section) {
    const button = section.querySelector(".vt-button");
    const label = section.querySelector(".vt-label");
    const src = section.dataset.audioSrc;

    button.addEventListener("click", () => {
      // If a different transmission is currently playing, stop it first.
      if (activeAudio && activeSection && activeSection !== section) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        resetSection(activeSection);
      }

      const audio = new Audio(src);
      activeAudio = audio;
      activeSection = section;

      button.disabled = true;
      section.classList.add("vt-playing", "vt-glitch");
      label.textContent = "TRANSMISSION ACTIVE...";
      setTimeout(() => section.classList.remove("vt-glitch"), 220);

      audio.play().catch(() => {
        // Blocked by the browser or file missing — don't get stuck disabled.
        resetSection(section);
      });

      audio.addEventListener("ended", () => {
        section.classList.remove("vt-playing");

        playBeep();
        section.classList.add("vt-terminated");
        label.textContent = "ARCHIVE TRANSMISSION TERMINATED";

        setTimeout(() => {
          section.classList.remove("vt-terminated");
          section.classList.add("vt-complete");
          label.textContent = "TRANSMISSION COMPLETE";

          setTimeout(() => {
            resetSection(section);
          }, 1000);
        }, 500);
      });
    });
  }

  function boot() {
    document.querySelectorAll(".voice-transmission").forEach(initVoiceTransmission);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
