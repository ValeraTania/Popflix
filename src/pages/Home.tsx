import { Link } from "react-router";
import { options } from "../utils/authKey";
import { Movie, Serie } from "../interface/MediaInterface";
import Card from "../components/Card";
import { useState, useEffect } from "react";

export default function Home() {
  const [popularMovies, setpopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular`,
        options
      );
      const movies = await response.json();

      setpopularMovies(movies.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTopRatedSeries = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated`,
        options
      );
      const series = await response.json();

      setTopRated(series.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPopularMovies(), getTopRatedSeries();
  }, []);


  return (
    <div className="container">
      <div className="header">
        <h1>Discover the best movies & tv series in PopFlix</h1>

       <div className="bento-grid">
  {popularMovies.map(movie => (
    <div
      key={movie.id}
      className="bento-item"
      style={{ backgroundImage: `url(${movie.poster})`, backgroundSize: 'cover' }}
    />
  ))}
</div>
      </div>

      <h3 className="category">Popular movies</h3>
      <div className="grid-horizontal">
        {popularMovies.map((popularMovie: Movie) => (
          <Link to={`/movie/${popularMovie.id}`} key={popularMovie.id}>
            <Card element={popularMovie} date={popularMovie.release_date} />
          </Link>
        ))}
      </div>

      <h3 className="category">Top rated series</h3>
      <div className="grid-horizontal">
        {topRated.map((topRated: Serie) => (
          <Link to={`/tv/${topRated.id}`} key={topRated.id}>
            <Card element={topRated} date={topRated.first_air_date} />
          </Link>
        ))}
      </div>
    </div>
  );
}
