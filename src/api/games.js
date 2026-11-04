import { request, normalizeGame, PAGE_SIZE, MAX_PAGE } from "./gamebrain";

export function buildGamesPath(page = 1, textSearch = "", ordering = "", appliedFilter = {}) {
  const safePage = Math.max(1, Math.min(MAX_PAGE, Math.floor(Number(page)) || 1));
  const parameters = new URLSearchParams({ limit: String(PAGE_SIZE), offset: String((safePage - 1) * PAGE_SIZE) });
  if (textSearch.trim()) parameters.set("query", textSearch.trim().slice(0, 200));
  const filters = [];
  for (const [field, key] of [["genres", "genre"], ["platforms", "platform"]]) {
    if (appliedFilter[field]?.length) filters.push({ key, values: appliedFilter[field].map(value => ({ value })), connection: "AND" });
  }
  const tagGroups = {};
  for (const tag of appliedFilter.tags || []) {
    const [key, value] = tag.split(":");
    if (value) (tagGroups[key] ||= []).push({ value });
  }
  for (const [key, values] of Object.entries(tagGroups)) filters.push({ key, values, connection: "AND" });
  if (appliedFilter.period) filters.push({ key: "release_date", values: [{ value: appliedFilter.period }] });
  if (appliedFilter.score) filters.push({ key: "review_rating", values: [{ value: appliedFilter.score }] });
  if (filters.length) parameters.set("filters", JSON.stringify(filters));
  const sorts = { "-rating": ["computed_rating", "desc"], rating: ["computed_rating", "asc"], "-released": ["release_date", "desc"], released: ["release_date", "asc"] };
  if (sorts[ordering]) {
    parameters.set("sort", sorts[ordering][0]);
    parameters.set("sort-order", sorts[ordering][1]);
  }
  return "/games?" + parameters.toString();
}

export async function getGamesList(page, textSearch, ordering, appliedFilter) {
  const data = await request(buildGamesPath(page, textSearch, ordering, appliedFilter));
  if (!Array.isArray(data.results)) throw new Error("Не удалось прочитать список игр.");
  return { results: data.results.map(normalizeGame), count: Number(data.total_results) || 0 };
}
