import { useState, useEffect } from "react";
import { getGamesList } from "../api/games";
import wishlist_icon from "../images/wishlist.png";
import wishlist_icon_added from "../images/wishlist_added.png"
// Иконки платформ
import psicon from "../images/platforms/playstation.png";
import xboxicon from "../images/platforms/xbox.png";
import nintendoicon from "../images/platforms/nintendo.png";
import pcicon from "../images/platforms/pc.png";
import macicon from "../images/platforms/mac.png";
import iosicon from "../images/platforms/ios.png";
import androidicon from "../images/platforms/android.png";
import linuxicon from "../images/platforms/linux.png";
import wiiuicon from "../images/platforms/wiiu.png";

export default function GameList({ Store = {}, addInStore, page, setTotalPages, textSearch, gameCountSet, countGame }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const gamesData = await getGamesList(page, textSearch);
      console.log("gamesData:", gamesData);
      setGames(gamesData.results);
      setTotalPages(Math.ceil(gamesData.count / 20));
      gameCountSet(Number(gamesData.count));
    }
    fetchGames();
  }, [page, setTotalPages, textSearch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const clones = (name) => {
    const nameName = name.toLowerCase();

    if (nameName.includes("playstation")) return "playstation";
    if (nameName.includes("xbox")) return "xbox";
    if (nameName.includes("nintendo")) return "nintendo";
    if (nameName.includes("ps")) return "playstation";
    if (nameName.includes("pc")) return "pc";
    if (nameName.includes("macos")) return "mac";
    if (nameName.includes("ios")) return "ios";
    if (nameName.includes("android")) return "android";
    if (nameName.includes("linux")) return "linux";
    if (nameName.includes("WiiU")) return "WiiU";

    return name.replace(/\d+/g, '').replace(/\s+/g, '');
  };

  const IMPORT_ICON = {
    playstation: psicon,
    xbox: xboxicon,
    nintendo: nintendoicon,
    pc: pcicon,
    mac: macicon,
    ios: iosicon,
    android: androidicon,
    linux: linuxicon,
    WiiU: wiiuicon,
  }

  return (
    <div className="gameList__wrapper">
      {games.map((game) => {

        const genresList = game.genres ?? [];
        const genres = genresList.map((genre) => genre?.name).filter(Boolean);
        const genresLimit = genres.slice(0, 3);
        const hiddenGenres = genres.length - genresLimit.length;

        const platforms = game.platforms ?? [];
        const consoles = platforms.map((platform) => platform.platform?.name).filter(Boolean);
        const siblings = consoles.map(clones);
        const allSiblings = [...new Set(siblings)];
        const uniqueSiblings = [...new Set(siblings)].slice(0, 3);
        const hiddenSiblings = allSiblings.length - uniqueSiblings.length;

        const title = String(game.name ?? "");
        const longTitle = title.length > 40;
        return (
          <div className="gameList__item" key={game.id}>
            <img src={game.background_image} alt="" className="gameList__item-image" />
            <div className="gameList__item-info">

              <div className="gameList__rating-platforms">
                <span className="gameList__rating">{game.rating}</span>
                <div className={`gameList__platforms ${hiddenSiblings > 0 ? 'gameList__platforms__mores' : ''}`}>
                  {uniqueSiblings.map((sibling) => (
                    <img
                      key={sibling}
                      src={IMPORT_ICON[sibling]}
                      alt={sibling}
                      className="gameList__platform-icon"
                    />
                  ))}
                  {hiddenSiblings > 0 && (<span className="gameList__platforms__more">+{hiddenSiblings}</span>)}
                </div>
              </div>

              {
                <span
                  className={`gameList__item-title ${longTitle ? 'gameList__item-title__long' : ''}`}
                >
                  {title}
                </span>

              }

              {<div className={`gameList__item-genres ${hiddenGenres > 0 ? 'gameList__item-genres__mores' : ''}`}>
                {
                  genresLimit.map((genre) => (
                    <span className="gameList__genre-item">{genre}</span>
                  ))}{hiddenGenres > 0 && (<span className="gameList__genre-item__more">+{hiddenGenres}</span>)}
              </div>}


              <div className="gameList__item-release-wishlist">
                <span className="gameList__item-release">Дата выхода: <br></br>{game.released}</span>
                <img src={Object.hasOwn(Store, game.id) ? wishlist_icon_added : wishlist_icon} className="gameList__widhList-icon" onClick={() => addInStore({
                  id: game.id,
                  title: game.name,
                  background_image: game.background_image,
                  rating: game.rating,
                  platforms: allSiblings,
                  genres: genres,
                  released: game.released
                })} />
              </div>
            </div>
          </div>
        );
      })}
    </div >
  );
}