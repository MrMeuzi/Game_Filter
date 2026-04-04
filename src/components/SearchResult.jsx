import { useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import filter_image from '../images/filter.png';
import FilterGames from './filterMenu';
export default function SearchResult({ textSearch, countGame, setOptionHone, setOption, optionHome, searchValue, setSearchValue, sortedType, setSortedType, appliedFilter, setAppliedFilter }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 950) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  function oneOrMore (count) {
    if (count === 2 || count === 3 || count === 4) {
      return "игры"
    } else if (count === 1){
      return "игра"
    } 
    else {
  return "игр"
    }
  }
  function oOrA (count) {
    if (count === 1){
      return "найдена"
    } else {
      return "найдено"
    }
  } 
  const ordering = useMemo(() => {
    switch (optionHome) {
      case "baza":
        return "";
      case "years_release_toOld":
        return "-released"; // от новых игр к старым играм
      case "years_release_toNew":
        return "released";
      case "A-Z":
        return "name";
      case "Z-A":
        return "-name";
      case "bestRating":
        return "-rating";
      case "worstRating":
        return "rating";
      default:
        return "";
    }
  }, [optionHome]);
  useEffect(() => {
    setOptionHone?.(ordering);
  }, [ordering, setOptionHone]);
  const location = useLocation();
  const isFavoritePage = location.pathname === "/favorites";
  const universalValue = isFavoritePage ? sortedType : optionHome;
  const ystanovshikUniversalValue = isFavoritePage ? setSortedType : setOption;
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  return (
    <div>
    <div className="result-wrapper">
      <div className="result__search">
        {textSearch !== "" && (<span className="result__text-title">{textSearch}</span>)}<br></br>
        {<span>{countGame} {oneOrMore(countGame)} {oOrA(countGame)}</span>}
      </div>
      <div className="result__filters">
        <select className="filters__select" value={universalValue} onChange={(e) => ystanovshikUniversalValue?.(e.target.value)}>
          <option value="baza">По умолчанию</option>
          <option value="bestRating">Игры с лучшим рейтингом</option>
          <option value="worstRating">Игры с худшим рейтингом</option>
          <option value="years_release_toOld">От новых игр к старым</option>
          <option value="years_release_toNew">От старых игр к новым</option>
          <option value="A-Z">По алфавиту с начала</option>
          <option value="Z-A">По алфавиту с конца</option>
        </select>
        
<form className="favoritesSearch__wrapper">
  {isFavoritePage && (
      <input className="favoritesSearch__input" type="text" placeholder={isMobile ? "Поиск игр в избр." : "Поиск игр в избранном"} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
)}
</form>

        <button className="filters__button">
          <img 
            src={filter_image} 
            alt="filters__image"
            className="filters__image"
            onClick={() => { setIsOpenFilterMenu(true)}}
          />
        </button>
      </div>
    </div>
    {isOpenFilterMenu && (<FilterGames Zakritie={() => setIsOpenFilterMenu(false)} appliedFilter={appliedFilter} setAppliedFilter={setAppliedFilter} isFavoritePage={isFavoritePage}/>)}
    <div className="line"></div></div>
  );
}