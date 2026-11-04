export const API_URL = "https://game-filter-api.mrmeuzi56.workers.dev";
export const PAGE_SIZE = 20;
export const MAX_PAGE = 51;
const TTL = 24 * 60 * 60 * 1000;
const pending = new Map();
const memory = new Map();
let queue = Promise.resolve();

export function readStored(storage, key, fallback) {
  try { return JSON.parse(storage.getItem(key)) ?? fallback; } catch { return fallback; }
}

export function request(path) {
  const key = "gamebrain:" + path;
  const cached = memory.get(key) || readStored(sessionStorage, key, null);
  if (cached && Date.now() - cached.time < TTL) return Promise.resolve(cached.data);
  if (pending.has(key)) return pending.get(key);
  const task = queue.catch(() => {}).then(async () => {
    let response;
    try { response = await fetch(API_URL + path, { signal: AbortSignal.timeout(20000) }); } catch { throw new Error("Не удалось связаться с сервисом игр. Проверьте соединение и повторите запрос."); }
    let data;
    try { data = await response.json(); } catch { throw new Error("Сервис игр вернул некорректный ответ. Попробуйте позже."); }
    if (!response.ok) {
      if (response.status === 429) throw new Error("Лимит GameBrain исчерпан или сервис занят. Попробуйте позже.");
      throw new Error("Не удалось загрузить игры. Попробуйте ещё раз.");
    }
    const entry = { time: Date.now(), data };
    memory.set(key, entry);
    try { sessionStorage.setItem(key, JSON.stringify(entry)); } catch {}
    return data;
  });
  queue = task;
  pending.set(key, task);
  task.then(() => pending.delete(key), () => pending.delete(key));
  return task;
}

export function safeUrl(value) {
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : ""; } catch { return ""; }
}

export function normalizeGame(data) {
  const names = values => (Array.isArray(values) ? values : []).map(v => ({ name: v.name || String(v), slug: v.value || v.name || String(v) }));
  const genres = names(data.genres);
  if (!genres.length && data.genre) genres.push({ name: data.genre, slug: data.genre });
  const tags = [...names(data.tags), ...names(data.themes), ...names(data.play_modes)];
  const videoUrls = [...new Set([data.micro_trailer, data.gameplay, ...(data.videos || [])])].map(safeUrl).filter(Boolean);
  return {
    id: "gb-" + data.id,
    provider: "gamebrain",
    name: data.name || "Без названия",
    title: data.name || "Без названия",
    background_image: safeUrl(data.image),
    rating: typeof data.rating?.mean === "number" ? Math.round(data.rating.mean * 500) / 100 : null,
    rating_count: data.rating?.count || 0,
    released: data.release_date || (data.year ? String(data.year) : null),
    platforms: names(data.platforms).map(p => ({ platform: p })),
    genres,
    tags,
    developers: data.developer ? [{ name: data.developer }] : [],
    description_raw: data.description || data.short_description || "Описание пока отсутствует.",
    website: safeUrl(data.link),
    screenshots: (data.screenshots || []).map((image, id) => ({ id, image: safeUrl(image) })).filter(s => s.image),
    videos: videoUrls.filter(url => /\.(webm|mp4)(\?|$)/i.test(url) || /^https:\/\/www\.youtube(?:-nocookie)?\.com\/embed\/[\w-]+(?:\?|$)/.test(url)).map((url, id) => ({ id, url, embed: url.includes("/embed/") })),
  };
}

export function toFavorite(game) {
  return { ...game, title: game.name || game.title };
}
