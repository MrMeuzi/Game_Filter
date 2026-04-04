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
import { Link } from "react-router-dom";
import appleiiicon from "../images/platforms/AppleII.png";
import atarist from "../images/platforms/AtariST.png";
import classicmcintoshicon from "../images/platforms/ClassicMacintosh.png";
import commodoreamigaicon from "../images/platforms/CommodoreAmiga.png";
import dreamcasticon from "../images/platforms/Dreamcast.png";
import gameboyicon from "../images/platforms/gameBoy.png";
import gameboyadvanceicon from "../images/platforms/GameBoyAdvance.png";
import gameboycoloricon from "../images/platforms/GameBoyColor.png";
import gamecubeicon from "../images/platforms/GameCube.png";
import nes from "../images/platforms/nes.png";
import segacd from "../images/platforms/SEGACD.png";
import segagenesis from "../images/platforms/segaGenesis.png";
import segamastersystemicon from "../images/platforms/SegaMasterSystem.png";
import snes from "../images/platforms/snes.png";
import webicon from "../images/platforms/Web.png";
import wii from "../images/platforms/Wii.png";
export default function GameListFavorites({ page, favStore, addInStore, Store }) {
useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  const clones = (rawPlatform) => {
    const name = typeof rawPlatform === 'string'
      ? rawPlatform
      : rawPlatform?.platform?.name || rawPlatform?.name || '';

    if (!name) return '';

    const nameName = String(name).toLowerCase();

    if (nameName.includes("playstation")) return "playstation";
    if (nameName.includes("xbox")) return "xbox";
    if (nameName.includes("nintendo")) return "nintendo";
    if (nameName.includes("ps")) return "playstation";
    if (nameName.includes("pc")) return "pc";
    if (nameName.includes("macos")) return "mac";
    if (nameName.includes("ios")) return "ios";
    if (nameName.includes("android")) return "android";
    if (nameName.includes("linux")) return "linux";
    if (nameName.includes("wiiu")) return "WiiU";

        if (nameName.includes("apple ii")) return "appleii";
    if (nameName.includes("atari st")) return "atarist";
    if (nameName.includes("classic macintosh")) return "classicmacintosh";
    if (nameName.includes("commodore amiga")) return "commodoreamiga";
    if (nameName.includes("dreamcast")) return "dreamcast";
    if (nameName.includes("game boy advance")) return "gameboyadvance";
    if (nameName.includes("game boy color")) return "gameboycolor";
    if (nameName.includes("game boy")) return "gameboy";
    if (nameName.includes("gamecube")) return "gamecube";
    if (nameName.includes("nes")) return "nes";
    if (nameName.includes("segacd")) return "segacd";
    if (nameName.includes("sega genesis")) return "segagenesis";
    if (nameName.includes("sega master system")) return "segamastersystem";
    if (nameName.includes("snes")) return "snes";
    if (nameName.includes("web")) return "web";
    if (nameName.includes("wii")) return "wii";

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

    appleii: appleiiicon,
    atarist: atarist,
    classicmacintosh: classicmcintoshicon,
    commodoreamiga: commodoreamigaicon,
    dreamcast: dreamcasticon,
    gameboy: gameboyicon,
    gameboyadvance: gameboyadvanceicon,
    gameboycolor: gameboycoloricon,
    gamecube: gamecubeicon,
    nes: nes,
    segacd: segacd,
    segagenesis: segagenesis,
    segamastersystem: segamastersystemicon,
    snes: snes,
    web: webicon,
    wii: wii
  }
  const pageSize = 20;
const start = (page - 1) * pageSize;
const pageItems = (favStore ?? []).slice(start, start + pageSize);
  return (
    <div className="gameList__wrapper">
      {pageItems.map((game) => {
        const genres = (game.genres ?? []).map((genre) => genre?.name || genre).filter(Boolean);
        const genresLimit = genres.slice(0, 3);
        const hiddenGenres = genres.length - genresLimit.length;

        const platforms = (game.platforms ?? []).map((platform) => platform?.platform?.name || platform?.name || platform).filter(Boolean);
        const siblings = platforms.map(clones).filter(Boolean);

        const allSiblings = [...new Set(siblings)];
        const uniqueSiblings = allSiblings.slice(0, 3);
        const hiddenSiblings = allSiblings.length - uniqueSiblings.length;

        const title = String(game.title ?? "");
        const longTitle = title.length > 40;

        const isInStore = Store ? Object.hasOwn(Store, game.id) : false;

        return (
          <div className="gameList__item" key={game.id}>
            <Link to={`/game/${game.id}`} className="gameList__item-link">
            <img
              src={game.background_image}
              alt={title}
              className="gameList__item-image"
            />
            </Link>
            <div className="gameList__item-info">
              <div className="gameList__rating-platforms">
                <span className="gameList__rating">{game.rating}</span>

                <div
                  className={`gameList__platforms ${
                    hiddenSiblings > 0 ? "gameList__platforms__mores" : ""
                  }`}
                >
                  {uniqueSiblings.map((sibling) => (
                    <img
                      key={sibling}
                      src={IMPORT_ICON[sibling]}
                      alt={sibling}
                      className="gameList__platform-icon"
                    />
                  ))}

                  {hiddenSiblings > 0 && (
                    <span className="gameList__platforms__more">
                      +{hiddenSiblings}
                    </span>
                  )}
                </div>
              </div>
              <Link to={`/game/${game.id}`} className="gameList__item-link">
              <span
                className={`gameList__item-title ${
                  longTitle ? "gameList__item-title__long" : ""
                }`}
              >
                {title}
              </span>
              </Link>

              <div
                className={`gameList__item-genres ${
                  hiddenGenres > 0 ? "gameList__item-genres__mores" : ""
                }`}
              >
                {genresLimit.map((genre) => (
                  <span key={genre} className="gameList__genre-item">
                    {genre}
                  </span>
                ))}

                {hiddenGenres > 0 && (
                  <span className="gameList__genre-item__more">
                    +{hiddenGenres}
                  </span>
                )}
              </div>

              <div className="gameList__item-release-wishlist">
                <span className="gameList__item-release">
                  Дата выхода: <br />
                  {game.released}
                </span>

                <img
                  src={isInStore ? wishlist_icon_added : wishlist_icon? wishlist_icon_added : wishlist_icon}
                  alt={isInStore ? "Убрать из избранного" : "Добавить в избранное"}
                  className="gameList__widhList-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addInStore(game);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
    
  );
}