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

/* Exact ASU logo converted from Figma React */
const MSGS = [
  "YOU'RE NOT SUPPOSED TO BE HERE",
  "HE IS ALWAYS WATCHING",
  "DON'T TRUST THE VOTES",
  "SOMETHING SURVIVED",
];

const MSG_CODES = [
  "ERR://0xDEAD1337 — UNAUTHORIZED ACCESS",
  "SIG://0xFF2A3D00 — TRACE ACTIVE",
  "SYS://0xBAD0FF3E — MEMORY CORRUPT",
  "NET://0xC0DE0000 — UPLINK SEVERED",
];

function makeTicks() {
  let html = "";
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const outerR = 47;
    const innerR = i % 3 === 0 ? 38 : 43;
    const x1 = 50 + outerR * Math.cos(angle);
    const y1 = 50 + outerR * Math.sin(angle);
    const x2 = 50 + innerR * Math.cos(angle);
    const y2 = 50 + innerR * Math.sin(angle);
    const major = i % 3 === 0;
    html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#dc143c" stroke-width="${major ? 1.4 : 0.7}" opacity="${major ? 0.9 : 0.35}" />`;
  }
  return html;
}

const logoContainer = document.getElementById("asu-logo");
if (logoContainer) {
  logoContainer.innerHTML = `
    <div class="asu-logo-stage">
      <div class="asu-scanlines"></div>
      <div class="asu-vignette"></div>

      <div class="asu-logo">
        <svg class="asu-emblem" viewBox="0 0 100 100" width="118" height="118" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="asu-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="asu-iris-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#8b0000" />
              <stop offset="100%" stop-color="#1a0000" />
            </radialGradient>
          </defs>

          <circle cx="50" cy="50" r="47" fill="none" stroke="#dc143c" stroke-width="0.6" opacity="0.65" />
          <g class="asu-tick-ring">
            ${makeTicks()}
          </g>
          <circle cx="50" cy="50" r="33" fill="none" stroke="#3a0018" stroke-width="0.5" opacity="0.6" />
          <line x1="28" y1="32" x2="72" y2="68" stroke="#2a0010" stroke-width="0.8" opacity="0.5" />
          <line x1="72" y1="32" x2="28" y2="68" stroke="#2a0010" stroke-width="0.8" opacity="0.5" />
          <path d="M 14,50 C 28,26 72,26 86,50 C 72,74 28,74 14,50 Z" fill="#060000" stroke="#dc143c" stroke-width="1.1" filter="url(#asu-glow)" />
          <circle cx="50" cy="50" r="12" fill="url(#asu-iris-grad)" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="#8b0000" stroke-width="0.8" />
          <circle cx="50" cy="50" r="5.5" fill="#dc143c" opacity="0.9" />
          <circle cx="50" cy="50" r="2" fill="#ff3050" />
          <line x1="14" y1="50" x2="38" y2="50" stroke="#dc143c" stroke-width="0.5" opacity="0.25" />
          <line x1="62" y1="50" x2="86" y2="50" stroke="#dc143c" stroke-width="0.5" opacity="0.25" />
        </svg>

        <div class="asu-label">
          <span class="asu-label-dash">────</span>
          <span class="asu-label-text">ANIME</span>
          <span class="asu-label-dash">────</span>
        </div>

        <div class="asu-title-wrap">
          <span class="asu-title-r" aria-hidden="true">SHOWDOWN</span>
          <span class="asu-title-b" aria-hidden="true">SHOWDOWN</span>
          <span class="asu-title-main">SHOWDOWN</span>
        </div>

        <div class="asu-divider">
          <div class="asu-divider-line asu-divider-line--left"></div>
          <div class="asu-divider-diamond"></div>
          <div class="asu-divider-line asu-divider-line--right"></div>
        </div>

        <div class="asu-subtitle">ULTIMAX</div>
      </div>

      <div class="asu-hidden">
        <div class="asu-hidden-header">⚠ SIGNAL INTERRUPTED ⚠</div>
        <div class="asu-hidden-msg"></div>
        <div class="asu-hidden-code"></div>
      </div>
    </div>
  `;

  const logo = document.querySelector(".asu-logo");
  const hidden = document.querySelector(".asu-hidden");
  const hiddenMsg = document.querySelector(".asu-hidden-msg");
  const hiddenCode = document.querySelector(".asu-hidden-code");
  let counter = 0;

  function fireLogoGlitch() {
    const idx = counter % MSGS.length;
    counter++;

    logo.classList.add("asu-logo--glitch");
    hidden.classList.add("asu-hidden--active");
    hiddenMsg.textContent = MSGS[idx];
    hiddenCode.textContent = MSG_CODES[idx];

    const duration = 500 + Math.random() * 500;

    setTimeout(() => {
      logo.classList.remove("asu-logo--glitch");
      hidden.classList.remove("asu-hidden--active");
      setTimeout(fireLogoGlitch, 20000 + Math.random() * 20000);
    }, duration);
  }

  setTimeout(fireLogoGlitch, 3500);
}

/* Nav tentacles */
document.querySelectorAll(".asu-button").forEach(button => {
  for (let i = 0; i < 7; i++) {
    const tentacle = document.createElement("span");
    tentacle.className = "tentacle";
    button.appendChild(tentacle);
  }
});
