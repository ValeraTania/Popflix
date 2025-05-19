import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router";
import { Serie } from "../interface/MediaInterface";
import { options } from "../utils/authKey";

export default function Series() {
  const [popularSeries, setPopularSeries] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const category = ["popular", "on_the_air", "top_rated", "airing_today"];
  const allSeries = [...popularSeries,...airingToday,...topRated,...onAir];

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


  const uniqueMovies = new Set();
  const uniqueItems =  allSeries.filter((serie: Serie) => {
      if (uniqueMovies.has(serie.id)) {
        return false;
      }
      uniqueMovies.add(serie.id);
      return true;
    });
  
    const searchResult = uniqueItems.filter((serie: Serie) =>
      serie.name.toLowerCase().startsWith(search.toLowerCase())
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

      {loading ? (
        <h4 className="loading">Loading...</h4>
      ) : //  search
            search.length > 0 ? (
              <div className="grid">
                {searchResult.map((result: Serie) => (
                  <Card
                    key={result.id}
                    element={result}
                    date={result.first_air_date.split("-")[0]}
                  />
                ))}
              </div>
            ) :
      
       (
        <>
          <h3 className="category">Popular series</h3>
          <div className="grid">
            {popularSeries.map((popularSerie: Serie) => (
              <Link to={`/tv/${popularSerie.id}`} key={popularSerie.id}>
                <Card
                  
                  element={popularSerie}
                  date={popularSerie.first_air_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>

          <h3 className="category">On the air</h3>
          <div className="grid-horizontal">
            {onAir.map((playing: Serie) => (
              <Link to={`/tv/${playing.id}`} key={playing.id}
>
                <Card
                  element={playing}
                  date={playing.first_air_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>

          <h3 className="category">Top rated</h3>
          <div className="grid-horizontal">
            {topRated.map((rated: Serie) => (
              <Link to={`/tv/${rated.id}`} key={rated.id}>
                <Card
                  
                  element={rated}
                  date={rated.first_air_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>

          <h3 className="category">Airing today</h3>
          <div className="grid-horizontal">
            {airingToday.map((airing: Serie) => (
              <Link to={`/tv/${airing.id}`}  key={airing.id}>
                <Card
                 
                  element={airing}
                  date={airing.first_air_date.split("-")[0]}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
