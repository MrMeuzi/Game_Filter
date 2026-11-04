import { useRef } from "react";

export default function PagesChoose({ page, totalPages, onPageChange, gameCount}) {
      const active = page;
      const previous = active > 1 ? active - 1 : 1;
      const next = active < totalPages ? active + 1 : active;
      const one = 1;
      const inputRef = useRef(null);
  return (
    gameCount !== 0 && (<div className="pagesChoose__wrapper">
      {gameCount > 1020 && <p className="catalog-limit">Доступны первые 1020 результатов. Уточните поиск или фильтры.</p>}
      <ul className="pagesChoose__list">
        {active !== one && (<li className="pagesChoose_noActive" onClick={() => onPageChange(1)}>1</li>)}
        {active !== one && (<li className="pagesChoose_skip">...</li>)}
        {active !== one && (<li className="pagesChoose_noActive" onClick={() => onPageChange(previous)}>←</li>)}
        <li className="pagesChoose__active">{active}</li>
        {active !== totalPages && (<li className="pagesChoose_noActive" onClick={() => onPageChange(next)}>→</li>)}
        {active !== totalPages && (<li className="pagesChoose_skip">...</li>)}
        {active !== totalPages && (<li className="pagesChoose_noActive" onClick={() => onPageChange(totalPages)}>{totalPages}</li>)}
        <div className="pagesChoose__2row-wrapper">
          <input aria-label="Номер страницы" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="..." className="pagesChoose__input" ref={inputRef}></input>
          <button className="pagesChoose__button" aria-label="Перейти на страницу"
          onClick = {() => {
            const value = inputRef.current.value;
            const number = Number(value);
            if (Number.isInteger(number) && number >= 1 && number <= totalPages) onPageChange(number);
          }}
          ></button>
        </div>
      </ul>
    </div>)
  );
}




