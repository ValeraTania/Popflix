import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router";
import { Media } from "../interface/MediaInterface";
import { options } from "../utils/authKey";
import { faListUl, faGrip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Movies() {
  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState('grid');

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

  
  return (
    <div className="container">
     

      <div className="view-options">
        <button onClick={()=>{setGrid('grid-horizontal')}}>
          <FontAwesomeIcon icon={faListUl}  className="icon-theme"/>
        </button>
        <button onClick={()=>{setGrid('grid')}}><FontAwesomeIcon icon={faGrip} className="icon-theme" /></button>
      </div>

      {loading ? (
        <h3 className="loading ">Loading...</h3>
      ) : (
        <>
          <h2 className="category ">Popular movies</h2>
          <section className={grid}>
            {popularMovies.map((popularMovie: Media) => (
              <Link to={`/movie/${popularMovie.id}`} key={popularMovie.id}>
                <Card
                  element={popularMovie}
                  date={popularMovie.release_date.split("-")[0]}
                />
              </Link>
            ))}
          </section>

          <h2 className="category ">Now Playing</h2>
          <section className={grid}>
            {nowPlaying.map((playing: Media) => (
              <Link to={`/movie/${playing.id}`} key={playing.id}>
                <Card
                  element={playing}
                  date={playing.release_date.split("-")[0]}
                />
              </Link>
            ))}
          </section>

          <h2 className="category ">Top rated</h2>
          <section className={grid}>
            {topRated.map((rated: Media) => (
              <Link to={`/movie/${rated.id}`} key={rated.id}>
                <Card element={rated} date={rated.release_date.split("-")[0]} />
              </Link>
            ))}
          </section>

          <h2 className="category ">Upcoming</h2>
          <section className={grid}>
            {airingToday.map((airing: Media) => (
              <Link to={`/movie/${airing.id}`} key={airing.id}>
                <Card
                  element={airing}
                  date={airing.release_date.split("-")[0]}
                />
              </Link>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
