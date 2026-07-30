const API_KEY = process.env.REACT_APP_RAWG_API_KEY
const BASE_URL = "https://api.rawg.io/api/games"

export async function getGamesList(page = 1, textSearch = "", ordering = "", appliedFilter = {}) {
  const genreToApi = {
  Action: "action",
  RPG: "role-playing-games-rpg",
  Casual: "casual",
  Arcade: "arcade",
  Racing: "racing",
  Family: "family",
  Educational: "educational",
  Indie: "indie",
  Strategy: "strategy",
  Simulation: "simulation",
  Platformer: "platformer",
  Sports: "sports",
  "Board Games": "board-games",
  Adventure: "adventure",
  Shooter: "shooter",
  Puzzle: "puzzle",
  "Massively Multiplayer": "massively-multiplayer",
  Fighting: "fighting",
  Card: "card"
};
const tagToApi = {
  Singleplayer: "singleplayer",
  "Steam Achievements": "steam-achievements",
  Multiplayer: "multiplayer",
  "Full controller support": "full-controller-support",
  "Steam Cloud": "steam-cloud",
  Atmospheric: "atmospheric",
  "steam-trading-cards": "steam-trading-cards",
  "Great Soundtrack": "great-soundtrack",
  RPG: "rpg",
  "Co-op": "co-op",
  "Story Rich": "story-rich",
  "Open World": "open-world",
  cooperative: "cooperative",
  "First-Person": "first-person",
  "2D": "2d",
  "Third Person": "third-person",
  "Sci-fi": "sci-fi",
  "Partial Controller Support": "partial-controller-support",
  Horror: "horror",
  FPS: "fps",
  "Online Co-Op": "online-co-op",
  Fantasy: "fantasy",
  Funny: "funny",
  Gore: "gore",
  Exploration: "exploration",
  Difficult: "difficult",
  "Steam Leaderboards": "steam-leaderboards",
  Classic: "classic",
  Sandbox: "sandbox",
  "Female Protagonist": "female-protagonist",
  Survival: "survival",
  Comedy: "comedy",
  Violent: "violent",
  "Free to Play": "free-to-play",
  "Online multiplayer": "online-multiplayer",
  Stealth: "stealth",
  "Split Screen": "split-screen",
  "Local Co-Op": "local-co-op",
  "Action-Adventure": "action-adventure",
  "Pixel Graphics": "pixel-graphics"
};
const parentPlatformToApi = {
  pc: 1,
  playstation: 2,
  xbox: 3,
  ios: 4,
  mac: 5,
  linux: 6,
  nintendo: 7,
  android: 8,
  web: 14
};

const booleanGenre = (appliedFilter.genres || []).map((genre) => genreToApi[genre]).filter(Boolean);
const booleanTag = (appliedFilter.tags || []).map((tag) => tagToApi[tag]).filter(Boolean);
const booleanPlatform = (appliedFilter.platforms || []).map((platform) => parentPlatformToApi[platform]).filter(Boolean);

  
  const parameters = new URLSearchParams({
    key: API_KEY,
    search: textSearch,
    search_precise: "true",
    search_exact: "true",
    page: String(page),
    page_size: "20",
  })
  if (ordering) {
    parameters.set("ordering", ordering)
  }
  if (appliedFilter.metacritic) {
  parameters.set("metacritic", "80,100");
}
  if (booleanGenre.length > 0) {
  parameters.set("genres", booleanGenre.join(","));
}
  if (booleanTag.length > 0) {
    parameters.set("tags", booleanTag.join(","));
  }
  if (booleanPlatform.length > 0) {
    parameters.set("parent_platforms", booleanPlatform.join(","));
  }
const filterYear = appliedFilter.year?.trim();
if (filterYear) {
  parameters.set("dates", `${filterYear}-01-01,${filterYear}-12-31`);
}

  const response = await fetch(`${BASE_URL}?${parameters.toString()}`);
  const data = await response.json();
  return data;
}