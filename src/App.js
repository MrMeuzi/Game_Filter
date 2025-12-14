import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/styles.css';
import Header from './components/header.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
