import { Link } from "react-router-dom";
import SearchBarGlobal from "./searchBarGlobal.jsx";

export default function Header({ searchInput, setSearchInput, setSearchText, searchText }) {
  return (
    <div className="nav__wrapper">
      <nav className="nav__container">
        <Link to="/?page=1" className="nav__logo"></Link>
        <SearchBarGlobal inputValue={searchInput} setInputValue={setSearchInput} onSearchChange={setSearchText}
/>
        <div className="nav__favorites"><Link to="/favorites"><div className="nav__favorites-img"></div></Link></div>
      </nav>
      <div className="line"></div>
    </div>
  );
}
