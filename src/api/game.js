import { request, normalizeGame } from "./gamebrain";

export async function game(id) {
  if (!/^gb-[1-9]\d*$/.test(String(id))) throw new Error("Это сохранённая игра из старого каталога.");
  const data = await request("/games/" + String(id).slice(3));
  if (!data.id) throw new Error("Игра не найдена.");
  return normalizeGame(data);
}
