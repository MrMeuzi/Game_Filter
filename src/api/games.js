const API_KEY = "de74cad3d1cd41caa5ab78844bd1d514"
const BASE_URL = "https://api.rawg.io/api/games"

export async function getGamesList(page = 1, textSearch = "", ordering = "") {
  const orderingFilter = ordering ? `&ordering=${encodeURIComponent(ordering)}` : "";
  const response = await fetch(`${BASE_URL}?key=${API_KEY}&search=${textSearch}&search_precise=true&search_exact=true&page=${page}&page_size=20${orderingFilter}`);
  const data = await response.json();
  return data;
}