import { useEffect, useState } from "react";
import { getGamesList } from "../api/games";
import { useRef } from "react";

export default function PagesChoose({ page, totalPages, onPageChange, gameCount}) {
      const active = page;
      const previous = active > 1 ? active - 1 : 1;
      const next = active < totalPages ? active + 1 : active;
      const one = 1;
      const inputRef = useRef(null);
  return (
    gameCount !== 0 && (<div className="pagesChoose__wrapper">
      <ul className="pagesChoose__list">
        {active !== one && (<li className="pagesChoose_noActive" onClick={() => onPageChange(1)}>1</li>)}
        {active !== one && (<li className="pagesChoose_skip">...</li>)}
        {active !== one && (<li className="pagesChoose_noActive" onClick={() => onPageChange(previous)}>←</li>)}
        <li className="pagesChoose__active">{active}</li>
        {active !== totalPages && (<li className="pagesChoose_noActive" onClick={() => onPageChange(next)}>→</li>)}
        {active !== totalPages && (<li className="pagesChoose_skip">...</li>)}
        {active !== totalPages && (<li className="pagesChoose_noActive" onClick={() => onPageChange(totalPages)}>{totalPages}</li>)}
        <div className="pagesChoose__2row-wrapper">
          <input placeholder="..." className="pagesChoose__input" ref={inputRef}></input>
          <button className="pagesChoose__button"
          onClick = {() => {
            const value = inputRef.current.value;
            onPageChange(Number(value));
          }}
          ></button>
        </div>
      </ul>
    </div>)
  );
}




