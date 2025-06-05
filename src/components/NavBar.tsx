import { Link, useLocation, useNavigate } from "react-router";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "../css/Search.css";

export default function NavBar() {
  const [ligthTheme, setTheme] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
console.log('location', location.pathname);
  //goes to original route if search bar is empty
  useEffect(() => {
    if (searchQuery.trim() === "" && location.pathname.startsWith("/search")) {
      navigate(-1);
    }
  }, [searchQuery]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search${location.pathname}?query=${searchQuery}`);
    }
  };

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
          <Link to="/movie" className="nav-btn">
            <li>Movies</li>
          </Link>
          <Link to="/tv" className="nav-btn">
            <li>TV</li>
          </Link>

          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(element) => setSearchQuery(element.target.value)}
            onKeyDown={handleKeyDown}
          />
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
