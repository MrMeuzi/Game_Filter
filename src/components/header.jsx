import { Link } from "react-router-dom";
import SearchBarGlobal from "./SearchBarGlobal.jsx";

export default function Header() {
  return (
    <div className="nav__wrapper">
      <nav className="nav__container">
        <Link to="/" className="nav__logo"></Link>
        <SearchBarGlobal />
        <Link to="/favorites" className="nav__favorites"></Link>
      </nav>
      <div className="line"></div>
    </div>
  );
}
