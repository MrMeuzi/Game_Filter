import { useState, useEffect } from "react";
import { useMemo } from "react";
import SearchResult from "../components/SearchResult";
import GameListFavorites from "../components/gameListFavorites";
import PagesChooseFavorites from "../components/pagesChooseFavorites";
import { useLocation, useNavigate } from "react-router-dom";

export default function Favorites({searchText, Store, addInStore}) {
  const [sortedType, setSortedType] = useState("baza");
  const favoritesGames = Object.values(Store);
  const zero = 0;

  const navigate = useNavigate();
  const location = useLocation();
  const [totalPages_favorites, setTotalPages_favorites] = useState(1);
  const [favoritesSearchText, setFavoritesSearchText] = useState("");
  const filteredFavorites = favoritesGames.filter(game => game?.title?.toLowerCase().includes(favoritesSearchText.toLowerCase()));

const linkup = new URLSearchParams(location.search);
const page_favorites = Number(linkup.get("page_favorites")) || 1;

function setPage_favorites(newPage) {
  navigate(`/favorites?page_favorites=${newPage}`, { replace: true });
}

  
  const gamesToShow = favoritesSearchText.trim() ? filteredFavorites : favoritesGames;
  const sortedFavoritesGames = [...gamesToShow];
  switch (sortedType) { // сортировка для избранных игр
      case "baza":
        break;
      case "years_release_toOld":
        sortedFavoritesGames.sort((a, b) => new Date(b.released) - new Date(a.released));
        break;
      case "years_release_toNew":
        sortedFavoritesGames.sort((a, b) => new Date(a.released) - new Date(b.released));
        break;
      case "A-Z":
        sortedFavoritesGames.sort((a, b) => a.title.localeCompare(b.title)); // а вот такое для текста
        break;
      case "Z-A":
        sortedFavoritesGames.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "bestRating":
        sortedFavoritesGames.sort((a, b) => b.rating - a.rating); // это для чисел
        break;
      case "worstRating":
        sortedFavoritesGames.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
  };
  return (
    <div className=''>
      <SearchResult textSearch={searchText} countGame={sortedFavoritesGames.length} searchValue={favoritesSearchText} setSearchValue={setFavoritesSearchText} setSortedType={setSortedType} sortedType={sortedType} />
      {favoritesGames.length === zero ? (<h2 className="Card__loading">Вы не добавили еще ни одной игры в избранное</h2>) : (<GameListFavorites favStore={sortedFavoritesGames} page={page_favorites} addInStore={addInStore} Store={Store}/>)}
      <PagesChooseFavorites favStore={sortedFavoritesGames} page={page_favorites} onPageChange={setPage_favorites}/>
    </div>
    
  );
}