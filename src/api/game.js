export const API_KEY = process.env.REACT_APP_RAWG_API_KEY
export const BASE_URL = "https://api.rawg.io/api/games"
export async function game(id) {
  const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);
  const data = await response.json();
  return data;
}