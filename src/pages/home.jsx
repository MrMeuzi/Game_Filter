import { useState, useEffect } from "react";
import SearchResult from "../components/SearchResult";
import GameList from "../components/gameList";
import PagesChoose from "../components/pagesChoose";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home({searchText, setSearchText, Store, addInStore}) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const pageUrl = Number(params.get("page")) || 1;
  const searchUrl = params.get("search") || "";
  setPage(pageUrl);
  setSearchText(searchUrl);
  }, [location.search]);

  const linkup = new URLSearchParams(location.search);
  const initPage = Number(linkup.get("page")) || 1;
  const [page, setPage] = useState(initPage);
  const [totalPages, setTotalPages] = useState(1);
  const [gameCount, setGameCount] = useState(0);
  useEffect(() => {
  const linkup = new URLSearchParams(location.search);
  linkup.set("page", page);
  if (searchText) {
    navigate(`/?search=${searchText}&page=${page}`, { replace: true });
  } else {
    navigate(`/?page=${page}`, { replace: true });
    
  }
}, [page, navigate, searchText]);
  useEffect(() => {
  const linkup = new URLSearchParams(location.search);
  const urlPage = Number(linkup.get("page")) || 1;
  setPage(urlPage);
}, [location.search]);
  useEffect(() => {
    const linkupSearch = new URLSearchParams(location.search);
    const urlSearch = linkupSearch.get("search") || "";
    setSearchText(urlSearch);
  }, [location.search]);
  useEffect(() => {
    setPage(1);
  }, [searchText]);
  return (
    <div>
      <SearchResult textSearch={searchText} countGame={gameCount}/>
      <GameList page={page} setTotalPages={setTotalPages} textSearch={searchText} gameCountSet={setGameCount} countGame={gameCount} Store={Store} addInStore={addInStore}/>
      <PagesChoose page={page} totalPages={totalPages} onPageChange={setPage} gameCount={gameCount}/>
    </div>
  );
}
