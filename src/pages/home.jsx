import { useState, useEffect, useCallback } from "react";
import SearchResult from "../components/SearchResult";
import GameList from "../components/gameList";
import PagesChoose from "../components/pagesChoose";
import { emptyFilter } from "../components/filterMenu";
import { readStored, MAX_PAGE } from "../api/gamebrain";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home({ Store, addInStore }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const textSearch = params.get("search") || "";
  const page = Math.max(1, Math.min(MAX_PAGE, Math.floor(Number(params.get("page"))) || 1));
  const [totalPages, setTotalPages] = useState(1);
  const [gameCount, setGameCount] = useState(0);
  const [optionHome, setOption] = useState("baza");
  const ordering = ({ bestRating: "-rating", worstRating: "rating", years_release_toOld: "-released", years_release_toNew: "released" })[optionHome] || "";
  const [filter, setFilter] = useState(() => {
    const saved = readStored(sessionStorage, "gamebrainHomeFilter", emptyFilter);
    return { ...emptyFilter, ...saved, tags: Array.isArray(saved.tags) ? saved.tags : [], genres: Array.isArray(saved.genres) ? saved.genres : [], platforms: Array.isArray(saved.platforms) ? saved.platforms : [] };
  });
  const setPage = useCallback(newPage => {
    const next = new URLSearchParams(location.search);
    next.set("page", String(Math.max(1, Math.min(totalPages, Math.floor(Number(newPage)) || 1))));
    navigate("/?" + next.toString(), { replace: true });
  }, [navigate, location.search, totalPages]);
  function applyFilter(next) { setFilter(next); setPage(1); }
  function applySort(next) { setOption(next); setPage(1); }
  useEffect(() => { try { sessionStorage.setItem("gamebrainHomeFilter", JSON.stringify(filter)); } catch {} }, [filter]);
  useEffect(() => { document.title = "Главная | Страница " + page + " - GameFilter"; }, [page]);
  return <div>
    <SearchResult textSearch={textSearch} countGame={gameCount} setOption={applySort} optionHome={optionHome} appliedFilter={filter} setAppliedFilter={applyFilter} />
    <GameList page={page} setTotalPages={setTotalPages} textSearch={textSearch} gameCountSet={setGameCount} Store={Store} addInStore={addInStore} ordering={ordering} appliedFilter={filter} />
    <PagesChoose page={page} totalPages={totalPages} onPageChange={setPage} gameCount={gameCount} />
  </div>;
}
