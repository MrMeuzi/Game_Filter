import { useState, useEffect, use } from "react";
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
const initialFilter = {
  rating: false,
  metacritic: false,
  year: "",
  tags: [],
  genres: [],
  platforms: []
};
  const [optionHome, setOption] = useState(""); // результат для ввода в ordering
  // нейронка помогла сделать сохранение фильтра при обновлении страницы
  const [appliedFilterHome, setAppliedFilterHome] = useState(() => {
  const saved = sessionStorage.getItem("homeFilter");
  return saved ? JSON.parse(saved) : initialFilter;
}); // результат для отображения в фильтре для главной страницы

useEffect(() => {
  sessionStorage.setItem("homeFilter", JSON.stringify(appliedFilterHome));
}, [appliedFilterHome]);

function applyHomeFilter(newFilter) {
  setAppliedFilterHome(newFilter);
  navigate("/?page=1", { replace: true });
}
  // конец нейронки
  useEffect(() => {
    document.title = `Главная | Страница ${page} - GameFilter`;
  }, [page]);
  return (
    <div>
      <SearchResult textSearch={searchText} countGame={gameCount} setOptionHone={setOptionHone} setOption={setOption} optionHome={optionHome} appliedFilter={appliedFilterHome} setAppliedFilter={applyHomeFilter}/>
      <GameList page={page} setTotalPages={setTotalPages} textSearch={searchText} gameCountSet={setGameCount} countGame={gameCount} Store={Store} addInStore={addInStore} ordering={sortOptionHome} appliedFilter={appliedFilterHome}/>
      <PagesChoose page={page} totalPages={totalPages} onPageChange={setPage_Home} gameCount={gameCount}/>
    </div>
  );
}
