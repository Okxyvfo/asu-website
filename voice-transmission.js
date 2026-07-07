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
