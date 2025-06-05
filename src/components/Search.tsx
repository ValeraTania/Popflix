import { useEffect, useState } from "react";
import { options } from "../utils/authKey";
import { MediaType, Media } from "../interface/MediaInterface";
import { useParams, useSearchParams, Link } from "react-router";
import Card from "./Card";

export default function Search() {
  const { mediaType } = useParams<{ mediaType: MediaType }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  console.log("query", query);
  console.log("search param", searchParams);
  console.log("media", mediaType);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${mediaType}?query=${query}`,
        options
      );
      const res = await response.json();
      console.log(res);
      setSearchResult(res.results);
      console.log("res result", res.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    search();
  }, [query, mediaType]);

  return (
    <div className="container">
        <h2 className="category ">Search results</h2>
      {loading ? (
        <h3 className="loading ">Loading...</h3>
      ) : (
        <>
          
          <section className="grid">
            {searchResult.map((searchRes: Media) => (
              <Link to={`/${mediaType}/${searchRes.id}`} key={searchRes.id}>
                <Card
                  element={searchRes}
                  date={
                    searchRes?.release_date.split("-")[0] ||
                    searchRes?.first_air_date.split("-")[0]
                  }
                />
              </Link>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
