/* =========================================================
   THEME PLAYER — reusable component for the Themes page
   Include once:  <script src="theme-player.js"></script>
   Drop the markup anywhere, set data-audio-src to that
   character's theme file. Nothing else needs to change.
   ========================================================= */

(function () {
  let activeAudio = null;
  let activeCard = null;

  function reset(card) {
    const btn = card.querySelector(".theme-play-btn");
    const label = card.querySelector(".theme-play-label");
    label.textContent = "PLAY THEME";
    card.classList.remove("theme-playing");
    btn.disabled = false;
  }

  function initCard(card) {
    const btn = card.querySelector(".theme-play-btn");
    const label = card.querySelector(".theme-play-label");
    const src = card.dataset.audioSrc;

    btn.addEventListener("click", () => {
      if (activeAudio && activeCard !== card) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        reset(activeCard);
      }

      const audio = new Audio(src);
      activeAudio = audio;
      activeCard = card;

      btn.disabled = true;
      card.classList.add("theme-playing");
      label.textContent = "PLAYING...";

      audio.play().catch(() => reset(card));

      audio.addEventListener("ended", () => {
        label.textContent = "PLAYBACK COMPLETE";
        setTimeout(() => reset(card), 1000);
      });
    });
  }

  function boot() {
    document.querySelectorAll(".theme-card").forEach(initCard);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
