import { useEffect, useState } from "react";
import groups from "../api/filterOptions.json";
export const emptyFilter = { rating: false, year: "", period: "", score: "", tags: [], genres: [], platforms: [] };

export default function FilterGames({ Zakritie, appliedFilter, setAppliedFilter, isFavoritePage, favoriteOptions }) {
  const [isClosing, setIsClosing] = useState(false);
  const [filter, setFilter] = useState(() => ({ ...emptyFilter, ...appliedFilter }));
  const [optionSearch, setOptionSearch] = useState("");
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = event => { if (event.key === "Escape") Zakritie(); };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", escape); };
  }, [Zakritie]);
  const toggle = (field, value) => setFilter(old => ({ ...old, [field]: old[field].includes(value) ? old[field].filter(v => v !== value) : [...old[field], value] }));
  const options = key => groups.find(g => g.key === key)?.values || [];
  const sections = isFavoritePage ? [
    { field: "tags", title: "Теги", values: (favoriteOptions?.tags || []).map(name => ({ key: name, name })) },
    { field: "genres", title: "Жанры", values: (favoriteOptions?.genres || []).map(name => ({ key: name, name })) },
    { field: "platforms", title: "Платформы", values: (favoriteOptions?.platforms || []).map(name => ({ key: name, name })) },
  ] : [
    { field: "tags", title: "Теги и режимы игры", values: ["tag", "play_mode", "theme"].flatMap(key => options(key).map(v => ({ ...v, key: key + ":" + v.key }))) },
    { field: "genres", title: "Жанры", values: options("genre") },
    { field: "platforms", title: "Платформы", values: options("platform") },
  ];
  return <div className="filter__wrapper" onClick={() => setIsClosing(true)}>
    <div role="dialog" aria-modal="true" aria-label="Фильтры игр" className={"filter__item " + (isClosing ? "filter__item--closing" : "")} onClick={e => e.stopPropagation()} onAnimationEnd={() => { if (isClosing) Zakritie(); }}>
      <button className="filter__primenenie" onClick={Zakritie}>Закрыть</button>
      {isFavoritePage ? <>
        <h2 className="filter__title">Рейтинг</h2>
        <label className="filter__categoryContainer__label"><input type="checkbox" checked={filter.rating} onChange={e => setFilter({ ...filter, rating: e.target.checked })} />От 4.5 из 5</label>
        <h2 className="filter__title">Год выхода</h2>
        <input className="date" aria-label="Год выхода" placeholder="2005" value={filter.year} onChange={e => setFilter({ ...filter, year: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
      </> : <>
        <h2 className="filter__title">Рейтинг GameBrain</h2>
        <select aria-label="Рейтинг GameBrain" value={filter.score} onChange={e => setFilter({ ...filter, score: e.target.value })}><option value="">Любой</option>{options("review_rating").map(v => <option key={v.key} value={v.key}>{v.name}</option>)}</select>
        <h2 className="filter__title">Период выхода</h2>
        <select aria-label="Период выхода" value={filter.period} onChange={e => setFilter({ ...filter, period: e.target.value })}><option value="">Любой</option>{options("release_date").map(v => <option key={v.key} value={v.key}>{v.name}</option>)}</select>
      </>}
      <input className="date" aria-label="Найти фильтр" placeholder="Найти тег, жанр, платформу" value={optionSearch} onChange={e => setOptionSearch(e.target.value)} />
      {sections.map(section => <div key={section.field}>
        <h2 className="filter__title">{section.title}</h2>
        <ul className="filter__categoryContainer filter__categoryContainer--genres">{section.values.filter(v => v.name.toLowerCase().includes(optionSearch.toLowerCase())).map(v => <li className="filter__categoryContainer__item" key={v.key}>
          <label className="filter__categoryContainer__label"><input type="checkbox" checked={filter[section.field].includes(v.key)} onChange={() => toggle(section.field, v.key)} /><span>{v.name}</span></label>
        </li>)}</ul>
      </div>)}
      <button className="filter__primenenie" onClick={() => { setAppliedFilter(filter); Zakritie(); }}>Искать</button>
      <button className="filter__primenenie filter__primenenie--clear" onClick={() => { setAppliedFilter({ ...emptyFilter }); Zakritie(); }}>Очистить</button>
    </div>
  </div>;
}
