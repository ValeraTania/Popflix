import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router";
import { Movie } from "../interface/MediaInterface";
import { options } from "../utils/authKey";
import "../css/Search.css";
import { faListUl,faGrip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Movies() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [popularMovies, setpopularMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [airingToday, setAiringToday] = useState([]);

  const category = ["popular", "now_playing", "top_rated", "upcoming"];

  const getMovies = async (category: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}`,
        options
      );
      const movies = await response.json();
      switch (category) {
        case "popular":
          setpopularMovies(movies.results);
          break;
        case "now_playing":
          setNowPlaying(movies.results);
          break;
        case "top_rated":
          setTopRated(movies.results);
          break;
        case "upcoming":
          setAiringToday(movies.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    category.forEach((element) => {
      getMovies(element);
    });
  }, []);

  //All movies
  const allMovies = [
    ...popularMovies,
    ...nowPlaying,
    ...topRated,
    ...airingToday,
  ];

  const uniqueMovies = new Set();
  const uniqueItems = allMovies.filter((movie: Movie) => {
    if (uniqueMovies.has(movie.id)) {
      return false;
    }
    uniqueMovies.add(movie.id);
    return true;
  });

  const searchResult = uniqueItems.filter((movie: Movie) =>
    movie.title.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="view-options">
        <button>        <FontAwesomeIcon icon={faListUl} className="icon-theme" />
</button>
        <FontAwesomeIcon icon={faGrip} className="icon-theme"/>
      </div>

      {loading ? (
        <h3 className="loading ">Loading...</h3>
      ) : //  search
      search.length > 0 ? (
        <div className="grid-horizontal">
          {searchResult.map((result: Movie) => (
            <Link
              to={`/movie/${result.id}`}
              key={result.id}
              className="search-result"
            >
              <Card
                key={result.id}
                element={result}
                date={result.release_date.split("-")[0]}
              />
            </Link>
          ))}
        </div>
      ) : (
        <>
          <h2 className="category ">Popular movies</h2>
          <div className="grid">
            {popularMovies.map((popularMovie: Movie) => (
              <Link to={`/movie/${popularMovie.id}`} key={popularMovie.id}>
                <Card
                  element={popularMovie}
                  date={popularMovie.release_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>

          <h2 className="category ">Now Playing</h2>
          <div className="grid-horizontal">
            {nowPlaying.map((playing: Movie) => (
              <Link to={`/movie/${playing.id}`} key={playing.id}>
                <Card
                  element={playing}
                  date={playing.release_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>

          <h2 className="category ">Top rated</h2>
          <div className="grid-horizontal">
            {topRated.map((rated: Movie) => (
              <Link to={`/movie/${rated.id}`} key={rated.id}>
                <Card element={rated} date={rated.release_date.split("-")[0]} />
              </Link>
            ))}
          </div>

          <h2 className="category ">Upcoming</h2>
          <div className="grid-horizontal">
            {airingToday.map((airing: Movie) => (
              <Link to={`/movie/${airing.id}`} key={airing.id}>
                <Card
                  element={airing}
                  date={airing.release_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
