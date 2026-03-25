import { useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import './styles/styles.css';
import Header from './components/header.jsx';
import Home from './pages/home.jsx';
import Favorites from './pages/favorites.jsx';
import NotFound from './pages/notFound.jsx';
import useFavoritesStore from './components/favoritesStore.jsx';
import GameDetails from './pages/gameDetails.jsx';

function App() {
    const hash = window.location.hash;
    const queryString = hash.split("?")[1] || ""
    const urlSostoyanie = new URLSearchParams(queryString);
    const urlSostoyanieGet = urlSostoyanie.get("search") || "";
    const [searchText, setSearchText] = useState(urlSostoyanieGet);

const [searchInput, setSearchInput] = useState(urlSostoyanieGet);

    const { favStore, addInStore } = useFavoritesStore();
  return (
    <HashRouter>
      <Header searchInput={searchInput} setSearchInput={setSearchInput} searchText={searchText} setSearchText={setSearchText}
/>
      <Routes>
        <Route path="/" element={<Home searchInput={searchInput} searchText={searchText} setSearchText={setSearchText} Store={favStore} addInStore={addInStore}/>} />
        <Route path="/favorites" element={<Favorites Store={favStore} addInStore={addInStore}/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/game/:id" element={<GameDetails Store={favStore} addInStore={addInStore}/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
