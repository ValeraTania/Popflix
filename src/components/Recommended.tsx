import { useEffect, useState } from "react";
import "../css/Recommended.css";
import { Link } from "react-router";
import { useParams } from "react-router";
import { MediaType } from "../interface/MediaInterface";

export default function Recommended() {
  const { mediaType, id } = useParams<{ mediaType: MediaType; id: string }>();

  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE",
    },
  };

  const getGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations`,
        options
      );
      const similarItems = await response.json();
      setRecommended(similarItems.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGenres(), window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className="container">
      <h2>More like this</h2>
      {loading ? (
        <h4 className="loading">Loading...</h4>
      ) : (
        <div className="grid-horizontal">
          {recommended.map((element: any) => (
            <div className="recommended">
              <Link to={`/${mediaType}/${element.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                  alt={element.original_title || element.name}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
