import { useEffect, useMemo, useState } from "react";
import SearchResult from "../components/SearchResult";
import GameListFavorites from "../components/gameListFavorites";
import PagesChooseFavorites from "../components/pagesChooseFavorites";
import { emptyFilter } from "../components/filterMenu";
import { useLocation, useNavigate } from "react-router-dom";

const names = values => (values || []).map(v => v?.platform?.name || v?.name || v).filter(v => typeof v === "string");

export default function Favorites({ Store, addInStore }) {
  const [sortedType, setSortedType] = useState("baza");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ ...emptyFilter });
  const navigate = useNavigate();
  const location = useLocation();
  const favorites = useMemo(() => Object.values(Store), [Store]);
  const options = useMemo(() => Object.fromEntries(["tags", "genres", "platforms"].map(field => [field, [...new Set(favorites.flatMap(g => names(g[field])))].sort((a, b) => a.localeCompare(b))])), [favorites]);
  const filtered = favorites.filter(g => {
    if (!(g.title || "").toLowerCase().includes(search.toLowerCase())) return false;
    if (filter.rating && !(g.rating >= 4.5)) return false;
    if (filter.year && String(g.released || "").slice(0, 4) !== filter.year.trim()) return false;
    return ["tags", "genres", "platforms"].every(field => filter[field].every(value => names(g[field]).includes(value)));
  });
  filtered.sort((a, b) => {
    switch (sortedType) {
      case "bestRating": return (b.rating || 0) - (a.rating || 0);
      case "worstRating": return (a.rating || 0) - (b.rating || 0);
      case "years_release_toOld": return String(b.released || "").localeCompare(String(a.released || ""));
      case "years_release_toNew": return String(a.released || "").localeCompare(String(b.released || ""));
      case "A-Z": return a.title.localeCompare(b.title);
      case "Z-A": return b.title.localeCompare(a.title);
      default: return 0;
    }
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / 20));
  const page = Math.max(1, Math.min(totalPages, Math.floor(Number(new URLSearchParams(location.search).get("page_favorites"))) || 1));
  const setPage = value => navigate("/favorites?page_favorites=" + Math.max(1, Math.min(totalPages, Math.floor(Number(value)) || 1)), { replace: true });
  useEffect(() => { document.title = "Избранное | Страница " + page + " - GameFilter"; }, [page]);
  return <div>
    <SearchResult textSearch={search} countGame={filtered.length} searchValue={search} setSearchValue={value => { setSearch(value); setPage(1); }} setSortedType={value => { setSortedType(value); setPage(1); }} sortedType={sortedType} appliedFilter={filter} setAppliedFilter={value => { setFilter(value); setPage(1); }} favoriteOptions={options} />
    {!favorites.length ? <h2 className="Card__loading">Вы не добавили ещё ни одной игры в избранное</h2> : !filtered.length ? <div className="Card__loading">По выбранным фильтрам ничего не найдено.</div> : <GameListFavorites favStore={filtered} page={page} addInStore={addInStore} Store={Store} />}
    <PagesChooseFavorites favStore={filtered} page={page} onPageChange={setPage} />
  </div>;
}
