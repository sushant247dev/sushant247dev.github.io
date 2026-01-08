document.addEventListener("DOMContentLoaded", () => {
  // Horizontal scrolling functionality
  document.querySelectorAll(".row-wrapper").forEach((wrapper) => {
    const row = wrapper.querySelector(".card-row");
    const leftBtn = wrapper.querySelector(".scroll-btn.left");
    const rightBtn = wrapper.querySelector(".scroll-btn.right");

    if (!row || !leftBtn || !rightBtn) return;

    const scrollAmount = 300; // px per click

    rightBtn.addEventListener("click", () => {
      row.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    leftBtn.addEventListener("click", () => {
      row.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  });

  // Card click to play songs
  const embed = document.getElementById("spotify-embed");

  document.querySelectorAll(".card").forEach(card => {
    const playBtn = card.querySelector(".play-btn");
    
    if (playBtn) {
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent card click from firing
        
        const trackId = card.dataset.trackId;

        if (!trackId) {
          console.error("No track ID found for this card");
          return;
        }

        // Force reload with new track
        const newSrc = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
        
        // Remove and re-add iframe to force reload and trigger autoplay
        embed.src = '';
        setTimeout(() => {
          embed.src = newSrc;
        }, 10);

        const songTitle = card.querySelector(".card-title")?.textContent || "Unknown";
        const songArtist = card.querySelector(".card-desc")?.textContent || "Unknown";

        document.querySelector(".song-title").textContent = songTitle;
        document.querySelector(".song-artist").textContent = songArtist;
      });
    }
  });
});
const embed = document.getElementById("spotify-embed");
const player = document.querySelector(".spotify-floating");

document.querySelectorAll(".play-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const trackId = btn.dataset.track;
    embed.src = `https://open.spotify.com/embed/track/${trackId}?autoplay=1`;
    player.style.display = "block";
  });
});
