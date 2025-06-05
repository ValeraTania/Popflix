import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router";
import { Media } from "../interface/MediaInterface";
import { options } from "../utils/authKey";
import { faListUl, faGrip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Series() {
  const [popularSeries, setPopularSeries] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState("grid");

  const category = ["popular", "on_the_air", "top_rated", "airing_today"];

  const getSeries = async (category: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${category}`,
        options
      );
      const series = await response.json();
      switch (category) {
        case "popular":
          setPopularSeries(series.results);
          break;
        case "on_the_air":
          setOnAir(series.results);
          break;
        case "top_rated":
          setTopRated(series.results);
          break;
        case "airing_today":
          setAiringToday(series.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    category.forEach((element) => {
      getSeries(element);
    });
  }, []);

  return (
    <div className="container">
      <div className="view-options">
        <button
          onClick={() => {
            setGrid("grid-horizontal");
          }}
        >
          <FontAwesomeIcon icon={faListUl} className="icon-theme" />
        </button>
        <button
          onClick={() => {
            setGrid("grid");
          }}
        >
          <FontAwesomeIcon icon={faGrip} className="icon-theme" />
        </button>
      </div>

      {loading ? (
        <h4 className="loading">Loading...</h4>
      ) : (
        <>
          <h3 className="category">Popular series</h3>
          <section className={grid}>
            {popularSeries.map((popularSerie: Media) => (
              <Link to={`/tv/${popularSerie.id}`} key={popularSerie.id}>
                <Card
                  element={popularSerie}
                  date={popularSerie.first_air_date.split("-")[0]}
                />
              </Link>
            ))}
          </section>

          <h3 className="category">On the air</h3>
          <section className={grid}>
            {onAir.map((playing: Media) => (
              <Link to={`/tv/${playing.id}`} key={playing.id}>
                <Card
                  element={playing}
                  date={playing.first_air_date.split("-")[0]}
                />
              </Link>
            ))}
          </section>

          <h3 className="category">Top rated</h3>
          <section className={grid}>
            {topRated.map((rated: Media) => (
              <Link to={`/tv/${rated.id}`} key={rated.id}>
                <Card
                  element={rated}
                  date={rated.first_air_date.split("-")[0]}
                />
              </Link>
            ))}
          </section>

          <h3 className="category">Airing today</h3>
          <section className={grid}>
            {airingToday.map((airing: Media) => (
              <Link to={`/tv/${airing.id}`} key={airing.id}>
                <Card
                  element={airing}
                  date={airing.first_air_date.split("-")[0]}
                />
              </Link>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
