import filter_image from '../images/filter.png';
export default function SearchResult({ textSearch, countGame }) {
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
  return (
    <div>
    <div className="result-wrapper">
      <div className="result__search">
        {textSearch !== "" && (<span className="result__text-title">{textSearch}</span>)}<br></br>
        {<span>{countGame} {oneOrMore(countGame)} {oOrA(countGame)}</span>}
      </div>
      <div className="result__filters">
        <select className="filters__select">
          <option value="-">-------------------------------</option>
          <option value="years_release_toOld">От новых игр к старым</option>
          <option value="years_release_toNew">От старых игр к новым</option>
          <option value="A-Z">По алфавиту с начала</option>
          <option value="Z-A">По алфавиту с конца</option>
        </select>
        <button className="filters__button">
          <img 
            src={filter_image} 
            alt="filters__image"
            className="filters__image"
          />
        </button>
      </div>
    </div>
    <div className="line"></div></div>
  );
}