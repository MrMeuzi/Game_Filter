export const API_KEY = "de74cad3d1cd41caa5ab78844bd1d514"
export const BASE_URL = "https://api.rawg.io/api/games"
export async function game(id) {
  const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);
  const data = await response.json();
  return data;
}