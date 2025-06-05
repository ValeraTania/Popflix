import { Media } from "../interface/MediaInterface";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
  element: Media;
  date: string;
}

export default function Card({ element,date }: CardProps) {
  return (
    <div className="card-container">
      <div className="card-content">
        <img
          src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
          alt={element.title || element.name}
        />
        <h4 className="title">{element.title || element.name} </h4>
        <div className="card-info">
          <span className="year">{date} </span>
          <div className="rate">
            <FontAwesomeIcon icon={fullStar} className="icon" />
            <span>{Math.ceil(element.vote_average * 10) / 10}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
