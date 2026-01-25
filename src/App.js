import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/styles.css';
import Header from './components/header.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';

function App() {
    const urlSostoyanie = new URLSearchParams(window.location.search);
    const urlSostoyanieGet = urlSostoyanie.get("search") || "";
    const [searchText, setSearchText] = useState(urlSostoyanieGet);
  return (
    <BrowserRouter>
      <Header setSearchText={setSearchText} searchText={searchText}/>
      <Routes>
        <Route path="/" element={<Home searchText={searchText} setSearchText={setSearchText}/>} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
