import { useEffect, useMemo, useState } from "react";
import { game as loadGame } from "../api/game";
import { readStored, toFavorite } from "../api/gamebrain";

export default function useFavoritesStore() {
  const [favStore, editFav] = useState(() => {
    const saved = readStored(localStorage, "favorites", {});
    if (!saved || Array.isArray(saved) || typeof saved !== "object") return {};
    return Object.fromEntries(Object.entries(saved).filter(([, value]) => value && value.id != null));
  });
  useEffect(() => { try { localStorage.setItem("favorites", JSON.stringify(favStore)); } catch {} }, [favStore]);
  const favoritesGames = useMemo(() => Object.values(favStore), [favStore]);
  function addInStore(item) {
    const exists = Object.hasOwn(favStore, item.id);
    editFav(old => {
      const next = { ...old };
      if (exists) delete next[item.id]; else next[item.id] = toFavorite(item);
      return next;
    });
    if (!exists && String(item.id).startsWith("gb-")) {
      loadGame(item.id).then(details => editFav(old => Object.hasOwn(old, item.id) ? { ...old, [item.id]: toFavorite(details) } : old)).catch(() => {});
    }
  }
  return { favStore, favoritesGames, addInStore };
}
