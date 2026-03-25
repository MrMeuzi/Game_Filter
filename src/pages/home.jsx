import { useState, useEffect } from "react";
import SearchResult from "../components/SearchResult";
import GameList from "../components/gameList";
import PagesChoose from "../components/pagesChoose";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home({searchText, setSearchText, Store, addInStore, searchInput}) {
  const navigate = useNavigate();
  const location = useLocation();

  

  const linkup = new URLSearchParams(location.search);
  const initPage = Number(linkup.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const [gameCount, setGameCount] = useState(0);
  
const page = Number(linkup.get("page")) || 1;

function setPage_Home(newPage) {
  navigate(`/?page=${newPage}`, { replace: true });
}

const [sortOptionHome, setOptionHone] = useState(""); // результат для апи

  const [optionHome, setOption] = useState(""); // результат для ввода в ordering
  return (
    <div>
      <SearchResult textSearch={searchText} countGame={gameCount} setOptionHone={setOptionHone} setOption={setOption} optionHome={optionHome}/>
      <GameList page={page} setTotalPages={setTotalPages} textSearch={searchText} gameCountSet={setGameCount} countGame={gameCount} Store={Store} addInStore={addInStore} ordering={sortOptionHome}/>
      <PagesChoose page={page} totalPages={totalPages} onPageChange={setPage_Home} gameCount={gameCount}/>
    </div>
  );
}
