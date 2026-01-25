import { useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import './styles/styles.css';
import Header from './components/header.jsx';
import Home from './pages/home.jsx';
import Favorites from './pages/favorites.jsx';

function App() {
    const hash = window.location.hash;
    const queryString = hash.split("?")[1] || ""
    const urlSostoyanie = new URLSearchParams(queryString);
    const urlSostoyanieGet = urlSostoyanie.get("search") || "";
    const [searchText, setSearchText] = useState(urlSostoyanieGet);
  return (
    <HashRouter>
      <Header setSearchText={setSearchText} searchText={searchText}/>
      <Routes>
        <Route path="/" element={<Home searchText={searchText} setSearchText={setSearchText}/>} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
