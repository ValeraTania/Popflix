import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CastCrew from "../components/CastCrew";
import Recommended from "../components/Recommended";
import { ItemDetails } from "../interface/DetailInterface";
import { options } from "../utils/authKey";
import { MediaType } from "../interface/MediaInterface";

type mediaDetail = ItemDetails;

export default function Details() {
  const { mediaType, id } = useParams<{ mediaType: MediaType; id: string }>();

  const [item, setItem] = useState<mediaDetail | any>("");
  const [loading, setLoading] = useState(true);

  const getMediaById = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}`,
        options
      );
      const item = await response.json();
      console.log("item ", item);
      setItem(item);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMediaById();
  }, [id]);

  const imageUrl = `https://image.tmdb.org/t/p/original/${item.backdrop_path}`;
  const hours = `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}min`;
  const seasons = `${item.number_of_seasons} seasons`;

  return (
    <>
      {loading ? (
        <h4 className="loading">Loading...</h4>
      ) : (
        <div className="details-container">
          {/* <div
            className="backdrop-img"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div> */}

          <div className="details-container-header backdrop-img" style={{ backgroundImage: `url(${imageUrl})`  }}>
           
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title}
            />
            <div className="details-content">
              <h1 className="details-title">{item.title || item.name}</h1>
              <div className="details-item">
                <div className="rate">
                  <FontAwesomeIcon icon={fullStar} className="icon" />
                  <span>{Math.ceil(item.vote_average * 10) / 10}/10</span>
                </div>
                <p>
                  {item.release_date?.split("-")[0] ||
                    item.first_air_date?.split("-")[0]}
                </p>
                <p>{mediaType === "movie" ? hours : seasons}</p>
              </div>
              <div className="genres">
                {item.genres.map((genre: any) => (
                  <p className="genre">{genre.name}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="overview">
            <h2>Overview</h2>
            <p>{item.overview}</p>
          </div>
          <div className="cast-crew">
            <CastCrew />
          </div>
          <div className="recommended">
            <Recommended />
          </div>
        </div>
      )}
    </>
  );
}
