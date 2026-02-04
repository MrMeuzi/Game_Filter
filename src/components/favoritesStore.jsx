import { useEffect, useState } from "react";
export default function useFavoritesStore() {
  const [favStore, editFav] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : {};
  })
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favStore))
  }, [favStore])
  function addInStore(game) {
    editFav(oldStore => {
      const newStore = { ...oldStore };
      if (Object.hasOwn(newStore, game.id)) {
        delete newStore[game.id];
      } else {
        newStore[game.id] = game
      }
      return newStore
    })
  }

  return {
    favStore, addInStore
  };
}