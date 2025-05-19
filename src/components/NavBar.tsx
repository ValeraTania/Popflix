import { Link } from "react-router";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function NavBar() {
  const [ligthTheme, setTheme] = useState(true);
  return (
    <div className="nav">
      <div className="brand">
        <Link to="/">
          <img src={logo} alt="Popflix logo" className="brand-logo" />
        </Link>
      </div>
      <div className="nav-btn">
        <ul>
          <Link to="/" className="nav-btn">
            <li>Home</li>
          </Link>
          <Link to="/movies" className="nav-btn">
            <li>Movies</li>
          </Link>
          <Link to="/tv" className="nav-btn">
            <li>TV</li>
          </Link>
        </ul>
      </div>
      <div className="colorTheme">
        <button
          className="theme-btn"
          onClick={() => {
            document.body.classList.toggle("themeDark");
            setTheme((prev) => !prev);
          }}
        >
          {ligthTheme ? (
            <FontAwesomeIcon icon={faMoon} className="icon-theme " />
          ) : (
            <FontAwesomeIcon icon={faSun} className="icon-theme " />
          )}
        </button>
      </div>
    </div>
  );
}
