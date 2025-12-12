// ==========================
// Player Data (WebP)
// ==========================
const players = [
  { id: 1, name: "Josh Allen", position: "QB", number: 17, img: "images/players/josh_allen.webp" },
  { id: 2, name: "Joshua Palmer", position: "WR", number: 5, img: "images/players/joshua_palmer.webp" },
  { id: 3, name: "Dalton Kincaid", position: "TE", number: 86, img: "images/players/dalton_kincaid.webp" },
  { id: 4, name: "James Cook", position: "RB", number: 4, img: "images/players/james_cook.webp" },
  { id: 5, name: "Khalil Shakir", position: "WR", number: 10, img: "images/players/khalil_shakir.webp" },
  { id: 6, name: "Matt Milano", position: "LB", number: 58, img: "images/players/matt_milano.webp" },
  { id: 7, name: "Ed Oliver", position: "DT", number: 91, img: "images/players/ed_oliver.webp" },
  { id: 8, name: "Joey Bosa", position: "OLB", number: 40, img: "images/players/joey_bosa.webp" },
  { id: 9, name: "Matt Prater", position: "K", number: 15, img: "images/players/matt_prater.webp" },
  { id: 10, name: "Cole Bishop", position: "FS", number: 24, img: "images/players/cole_bishop.webp" }
];

// ==========================
// Initialize Home Page
// ==========================
function initHomePage() {
  const featuredName = document.getElementById("featured-player-name");
  const featuredImg = document.querySelector(".hero-media img");

  if (featuredName && featuredImg) {
    const randomIndex = Math.floor(Math.random() * players.length);
    const player = players[randomIndex];

    featuredName.textContent = `${player.name} — #${player.number} (${player.position})`;
    featuredImg.src = player.img;
    featuredImg.alt = player.name;
  }

  initCountdown();
  cleanupFavorites();
  renderTopFavorites();
}

// ==========================
// Countdown
// ==========================
function initCountdown() {
  const countdownDisplay = document.getElementById("countdown-display");
  if (!countdownDisplay) return;

  const nextGameDate = new Date("2025-12-20T18:30:00-05:00");

  function updateCountdown() {
    const now = new Date();
    const diff = nextGameDate - now;

    if (diff <= 0) {
      countdownDisplay.textContent = "Game Time!";
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownDisplay.textContent =
      `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ==========================
// Render Top Favorites on Homepage
// ==========================
function renderTopFavorites() {
  const topContainer = document.getElementById("top-player-cards");
  if (!topContainer) return;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  topContainer.innerHTML = "";

  const validFavorites = favorites
    .map(fav => players.find(p => p.id === fav.id))
    .filter(Boolean);

  if (validFavorites.length === 0) {
    topContainer.innerHTML = `<p role="status" id="no-favorites-msg">No favorites yet. Click a star on the players page to add favorites!</p>`;
    return;
  }

  validFavorites.forEach(player => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <img src="${player.img}" alt="${player.name}" class="player-img" loading="lazy"/>
      <h3>${player.name}</h3>
      <p><strong>Position:</strong> ${player.position}</p>
      <p><strong>Number:</strong> ${player.number}</p>
    `;
    topContainer.appendChild(card);
  });
}

// ==========================
// Clean Invalid Favorites
// ==========================
function cleanupFavorites() {
  let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  savedFavorites = savedFavorites.filter(fav => players.some(p => p.id === fav.id));
  localStorage.setItem("favorites", JSON.stringify(savedFavorites));
}

// ==========================
// Initialize Players Page
// ==========================
function initPlayersPage() {
  const playerContainer = document.getElementById("player-container");
  const positionFilter = document.getElementById("position-filter");
  const countDisplay = document.getElementById("player-count");
  if (!playerContainer || !positionFilter) return;

  function renderPlayers(list) {
    playerContainer.innerHTML = "";

    list.forEach(player => {
      const card = document.createElement("div");
      card.className = "player-card";

      card.innerHTML = `
        <img src="${player.img}" alt="${player.name}" class="player-img" loading="lazy"/>
        <h3>${player.name}</h3>
        <p><strong>Position:</strong> ${player.position}</p>
        <p><strong>Number:</strong> ${player.number}</p>
      `;

      const favBtn = document.createElement("button");
      favBtn.className = "secondary-btn";

      let currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFavorited = currentFavorites.some(p => p.id === player.id);

      if (isFavorited) {
        favBtn.textContent = "★ Already Favorited";
        favBtn.disabled = true;
      } else {
        favBtn.textContent = "★ Favorite";
        favBtn.disabled = false;
        favBtn.addEventListener("click", () => {
          currentFavorites.push(player);
          localStorage.setItem("favorites", JSON.stringify(currentFavorites));
          favBtn.textContent = "★ Already Favorited";
          favBtn.disabled = true;
          alert(`${player.name} added to favorites!`);
          renderTopFavorites(); // refresh homepage favorites if user returns
        });
      }

      card.appendChild(favBtn);
      playerContainer.appendChild(card);
    });

    if (countDisplay) countDisplay.textContent = `Showing ${list.length} players`;
  }

  function filterPlayers(position) {
    if (position === "all") return players;
    return players.filter(p => p.position === position);
  }

  positionFilter.addEventListener("change", () => {
    renderPlayers(filterPlayers(positionFilter.value));
  });

  renderPlayers(players);
}

// ==========================
// Initialize Everything
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  initHomePage();
  initPlayersPage();
});
