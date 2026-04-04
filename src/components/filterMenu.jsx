import { useEffect, useState } from "react";
export default function FilterGames({Zakritie, appliedFilter, setAppliedFilter, isFavoritePage}) {
  const [isClosing, setIsClosing] = useState(false);
  function RuchnoeZakritie() {
    setIsClosing(true);
  }
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
    };
  }, []);

const [banjofilter, setBanjoFilter] = useState(appliedFilter);

const genreOptions = [
  "Action",
  "RPG",
  "Casual",
  "Arcade",
  "Racing",
  "Family",
  "Educational",
  "Indie",
  "Strategy",
  "Simulation",
  "Platformer",
  "Sports",
  "Board Games",
  "Adventure",
  "Shooter",
  "Puzzle",
  "Massively Multiplayer",
  "Fighting",
  "Card"
];

const initialFilter = {
  rating: false,
  metacritic: false,
  year: "",
  tags: [],
  genres: [],
  platforms: []
};

function toogleGenre(genreName) {
  setBanjoFilter((added) => {
    return {
      ...added,
      genres: added.genres.includes(genreName) ? added.genres.filter((addedGenre) => addedGenre !== genreName) : [...added.genres, genreName]
    }
  })
}

const platformOptions = [
  "playstation",
  "xbox",
  "nintendo",
  "pc",
  "mac",
  "ios",
  "android",
  "linux",
  "WiiU",
  "appleii",
  "atarist",
  "classicmacintosh",
  "commodoreamiga",
  "dreamcast",
  "gameboyadvance",
  "gameboycolor",
  "gameboy",
  "gamecube",
  "nes",
  "segacd",
  "segagenesis",
  "segamastersystem",
  "snes",
  "web",
  "wii"
];


function tooglePlatform(platformName) {
  setBanjoFilter((added) => {
    return {
      ...added,
      platforms: added.platforms.includes(platformName) ? added.platforms.filter((addedPlatform) => addedPlatform !== platformName) : [...added.platforms, platformName]
    }
  });
}

  const tagOptions = [
  "Singleplayer",
  "Steam Achievements",
  "Multiplayer",
  "Full controller support",
  "Steam Cloud",
  "Atmospheric",
  "steam-trading-cards",
  "Great Soundtrack",
  "RPG",
  "Co-op",
  "Story Rich",
  "Open World",
  "cooperative",
  "First-Person",
  "2D",
  "Third Person",
  "Sci-fi",
  "Partial Controller Support",
  "Horror",
  "FPS",
  "Online Co-Op",
  "Fantasy",
  "Funny",
  "Gore",
  "Exploration",
  "Difficult",
  "Steam Leaderboards",
  "Classic",
  "Sandbox",
  "Female Protagonist",
  "Survival",
  "Comedy",
  "Violent",
  "Free to Play",
  "Online multiplayer",
  "Stealth",
  "Split Screen",
  "Local Co-Op",
  "Action-Adventure",
  "Pixel Graphics"
];

function toogleTag(tagName) {
  setBanjoFilter((added) => {
    return {
      ...added,
      tags: added.tags.includes(tagName) ? added.tags.filter((addedTag) => addedTag !== tagName) : [...added.tags, tagName]
    }
  })
}
  return (
  <div className="filter__wrapper" onClick={RuchnoeZakritie}>
    <div className={`filter__item ${isClosing ? "filter__item--closing" : ""}`} onClick={(e) => e.stopPropagation()} onAnimationEnd={() => {if (isClosing) Zakritie();}}>
      {isFavoritePage && (
        <>
        <h2 className="filter__title">Рейтинг</h2>
      <ul className="filter__categoryContainer">
        <li className="filter__categoryContainer__item">
          <label className="filter__categoryContainer__label">
            <input type="checkbox" checked={banjofilter.rating} onChange={(e) => setBanjoFilter(prev => ({ ...prev, rating: e.target.checked}))}/>
            <span>>Выше 4.5</span>
          </label>
        </li>
      </ul>
      </>
      )}
      
<h2 className="filter__title">Metacritic</h2>
      <ul className="filter__categoryContainer">
        <li className="filter__categoryContainer__item">
          <label className="filter__categoryContainer__label">
            <input type="checkbox" checked={banjofilter.metacritic} onChange={(e) => setBanjoFilter(prev => ({ ...prev, metacritic: e.target.checked}))}/>
            <span>>80 баллов</span>
          </label>
        </li>
      </ul>

<h2 className="filter__title">Год выхода</h2>
      <ul className="filter__categoryContainer">
        <li className="filter__categoryContainer__item">
          <label className="filter__categoryContainer__label">
            <input type="text" placeholder="2005..." value={banjofilter.year} onChange={(e) => setBanjoFilter(prev => ({...prev, year: e.target.value}))}  className="date"/>
          </label>
        </li>
      </ul>

      <h2 className="filter__title">Тэги</h2>
      <ul className="filter__categoryContainer filter__categoryContainer--genres">
        {tagOptions.map((tag) => (
          <li className="filter__categoryContainer__item" key={tag}>
          <label className="filter__categoryContainer__label">
            <input type="checkbox" checked={banjofilter.tags.includes(tag)} onChange={() => toogleTag(tag)}/>
            <span>{tag}</span>
          </label>
        </li>
        ))}
      </ul>
      
      <h2 className="filter__title">Жанры</h2>
      <ul className="filter__categoryContainer filter__categoryContainer--genres">
        {genreOptions.map((genre) => (
          <li className="filter__categoryContainer__item" key={genre}>
          <label className="filter__categoryContainer__label">
            <input type="checkbox" checked={banjofilter.genres.includes(genre)} onChange={() => toogleGenre(genre)}/>
            <span>{genre}</span>
          </label>
        </li>
        ))}
      </ul>

      <h2 className="filter__title">Платформы</h2>
      <ul className="filter__categoryContainer filter__categoryContainer--genres">
        {platformOptions.map((platform) => (
          <li className="filter__categoryContainer__item" key={platform}>
          <label className="filter__categoryContainer__label">
            <input type="checkbox" checked={banjofilter.platforms.includes(platform)} onChange={() => tooglePlatform(platform)}/>
            <span>{platform}</span>
          </label>
        </li>
        ))}
      </ul>
      <button className="filter__primenenie" onClick={() => {setAppliedFilter(banjofilter); Zakritie();}}>Искать</button>
            <button className="filter__primenenie filter__primenenie--clear" onClick={() => {setAppliedFilter(initialFilter); Zakritie();}}>Очистить</button>

    </div>
  </div>
  );
}