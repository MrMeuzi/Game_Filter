import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toFavorite } from "../api/gamebrain";
import { game } from "../api/game";

export default function GameDetails({ Store = {}, addInStore }) {
  const [gameDet, setGameDet] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [video, setVideo] = useState([]);
  const { id } = useParams();
  const [openedScreenshotID, setOpenedScreenshotID] = useState(null);
  const isMobile = window.innerWidth <= 950;

  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const isLegacy = !String(id).startsWith("gb-");
  useEffect(() => {
    if (isLegacy) return;
    let active = true;
    setGameDet(null);
    setError("");
    setOpenedScreenshotID(null);
    game(id).then(info => {
      if (!active) return;
      setGameDet(info);
      setScreenshots(info.screenshots);
      setVideo(info.videos);
    }).catch(error => { if (active) setError(error.message || "Не удалось загрузить игру."); });
    return () => { active = false; };
  }, [id, retry, isLegacy]);
const tekyshiyScreensh = openedScreenshotID !== null ? screenshots[openedScreenshotID] : null;
function prevScreensh() {
setOpenedScreenshotID((prev) => 
prev === 0 ? screenshots.length - 1 : prev - 1)
};
function nextScreensh() {
setOpenedScreenshotID((next) =>
next === screenshots.length - 1 ? 0 : next + 1)

}

useEffect(() => {
  if (gameDet?.name) {
    document.title = `${gameDet.name} - Game Filter`;
  } else {
    document.title = "Игра - Game Filter";
  }
}, [gameDet]);


  if (isLegacy) {
    const saved = Store[id];
    return <div className="Card__loading">
      <h1>{saved?.title || "Игра из старого каталога"}</h1>
      <p>Эта игра сохранена до смены каталога. Найдите её в GameBrain и добавьте заново.</p>
      <Link to={"/?search=" + encodeURIComponent(saved?.title || "")}>Найти в GameBrain</Link>
      {saved && <button onClick={() => addInStore(saved)}>Удалить из избранного</button>}
    </div>;
  }
  if (error) return <div className="Card__loading" role="alert">{error}<br /><button onClick={() => setRetry(value => value + 1)}>Повторить</button></div>;
  if (!gameDet) {
    return <div className="Card__loading">Загрузка данных...</div>;
  }

  const platforms = gameDet.platforms ?? [];
  const genres = gameDet.genres ?? [];
  const tags = gameDet.tags ?? [];
  const developers = gameDet.developers ?? [];

  const isFavorite = gameDet.id && Object.hasOwn(Store, gameDet.id);

  return (
    <div className="Card">

{tekyshiyScreensh && <div className="Screensh__wrapper" onClick={() => setOpenedScreenshotID(null)}>
      <div className="Screensh__stage">
          <div className="Screensh__tekysh" onClick={(e) => e.stopPropagation()}>{openedScreenshotID + 1} / {screenshots.length}</div>
          <div className="Screensh__buttons" onClick={(e) => e.stopPropagation()}>
            <button className="Screensh__button" onClick={() => prevScreensh()}><span className="Screensh__text">←</span></button>
            <button className="Screensh__button" onClick={() => nextScreensh()}><span className="Screensh__text">→</span></button>
          </div>
          <img src={tekyshiyScreensh.image} alt="Текущий скриншот" className="Screensh__wrapper__img" onClick={(e) => e.stopPropagation()}/>
      </div>
      </div>}

      <div className="Card__wrapper">
        <div className="Card__wrapper-left">
          <div className="Card__title">{gameDet.name}</div>

          <div className="Card__platforms">
            <div className="Card__padding">Платформы:</div>
            {platforms.length > 0 ? (
              platforms.map((p) => (
                <span key={p.platform?.id || p.platform?.name || p.name || JSON.stringify(p)} className="Card__platform">
                  {p.platform?.name || p.name || "неизвестно"}
                </span>
              ))
            ) : (
              <span className="Card__tag">Нет данных</span>
            )}
          </div>

          <div className="Card__genres">
            <div className="Card__padding">Жанры:</div>
            {genres.length > 0 ? genres.map((g) => <span key={g.id || g.name} className="Card__genre">{g.name || g}</span>) : <span className="Card__tag">Нет данных</span>}
          </div>

          <div className="Card__tags">
            <div className="Card__padding">Тэги:</div>
            {tags.length > 0 ? tags.map((t) => <span key={t.id || t.name} className="Card__tag">{t.name || t}</span>) : <span className="Card__tag">Нет данных</span>}
          </div>
        </div>

        <div className="Card__wrapper-right">
          <div className="Card__info-left">
            <div className="Card__poster"><img src={gameDet.background_image || undefined} alt="Обложка игры" /></div>
          </div>

          <div className="Card__info-right">
            <button
              className={isFavorite ? "Card__info-button-added" : "Card__info-button"}
              onClick={() => {
                addInStore(toFavorite(gameDet));
              }}
            >
              {isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
            </button>

            <div className="Card__rating">Рейтинг: {gameDet.rating ?? "Нет данных"}</div>
            <div className="Card__released">Дата выхода: {gameDet.released ?? "Нет данных"}</div>
            <div className="Card__developers">Разработчики: {developers.length > 0 ? developers.map((d) => d.name).join(", ") : "Нет данных"}</div>
            <div className="Card__website Card__website--mobile">Источник: <a target="_blank" rel="noreferrer" href={gameDet.website}>GameBrain</a></div>
          </div>
        </div>
      </div>

      <div className="Card__bottom">
        <h1 className="Card__bottom-h1">Описание</h1>
        <div className="Card__description">{gameDet.description_raw}</div>

        
          <div>
          {video.length > 0 ? (
            <>
              <h1 className="Card__bottom-h1">{video.length === 1 ? "Трейлер" : "Трейлеры"}</h1>
              <div className={video.length > 1 ? "Card__videos-wrapper" : "Card__videos-wrapper-fr1"}>
                {video.map((item) => (
                  <div key={item.id} className="Card__videos">
                    <div className="Card__videos-title">{"Видео " + (item.id + 1)}</div>
                    {item.embed ? <iframe className="Card__video-player" src={item.url} title={"Видео " + (item.id + 1)} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen /> : <video className="Card__video-player" controls src={item.url} poster={gameDet.background_image} preload="none" />}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
        

        <h1 className="Card__bottom-h1">Скриншоты</h1>
        <div className="Card__bottom-img-wrapper">
          {screenshots.length > 0 ? screenshots.map((shot, index) => (
            <img key={shot.id} src={shot.image} alt={`Скриншот из игры ${gameDet.name}`} className="Card__bottom-img" onClick={() => { if(!isMobile) { setOpenedScreenshotID(index)}}}/>
          )) : (
            <div>Скриншоты не найдены</div>
          )}
        </div>

      </div>
    </div>
  );
}
