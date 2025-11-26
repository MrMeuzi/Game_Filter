import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './styles/styles.css';
import searchBarGlobal from './components/searchBarGlobal.jsx';
import home from './pages/home.jsx';
import favorites from './pages/favorites.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="nav__wrapper">
        <nav className="nav__container">
          <Link to="/" className="nav__logo"></Link>
          <searchBarGlobal  />
          <Link to="/favorites" className="nav__favorites"></Link>
          <Routes>
            <Route path="/" element={<home />} />
            <Route path="/favorites" element={<favorites />} />
          </Routes>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Заметка: nav__logo, nav_favorites, nav__wrapper, nav__container - классы в блоке навигации. 
