import { useEffect, useState } from "react";
import { useRef } from "react";

export default function PagesChooseFavorites({ page, onPageChange, favStore}) {
  const pageSize = 20;
  const totalPages = Math.ceil(favStore?.length / pageSize);
      const active_favorites = page;
      const previous_favorites = active_favorites > 1 ? active_favorites - 1 : 1;
      const next_favorites = active_favorites < totalPages ? active_favorites + 1 : active_favorites;
      const one_favorites = 1;
      const inputRef_favorites = useRef(null);
  return (
    favStore.length !== 0 && (<div className="pagesChoose__wrapper">
      <ul className="pagesChoose__list">
        {active_favorites !== one_favorites && (<li className="pagesChoose_noActive" onClick={() => onPageChange(1)}>1</li>)}
        {active_favorites !== one_favorites && (<li className="pagesChoose_skip">...</li>)}
        {active_favorites !== one_favorites && (<li className="pagesChoose_noActive" onClick={() => onPageChange(previous_favorites)}>←</li>)}
        <li className="pagesChoose__active">{active_favorites}</li>
        {active_favorites !== totalPages && (<li className="pagesChoose_noActive" onClick={() => onPageChange(next_favorites)}>→</li>)}
        {active_favorites !== totalPages && (<li className="pagesChoose_skip">...</li>)}
        {active_favorites !== totalPages && (<li className="pagesChoose_noActive" onClick={() => onPageChange(totalPages)}>{totalPages}</li>)}
        <div className="pagesChoose__2row-wrapper">
          <input placeholder="..." className="pagesChoose__input" ref={inputRef_favorites}></input>
          <button className="pagesChoose__button"
          onClick = {() => {
            const value = inputRef_favorites.current.value;
            onPageChange(Number(value));
          }}
          ></button>
        </div>
      </ul>
    </div>)
  );
}




