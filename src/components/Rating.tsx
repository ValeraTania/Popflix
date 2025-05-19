import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStarHalfStroke,
  faStar as emptyStar,
} from "@fortawesome/free-regular-svg-icons";
import "../css/Card.css";

export default function Rating({ vote_average }: any) {
  const rating = [];
  const average = Math.floor(vote_average / 2);

  for (let i = 0; i < 5; i++) {
    if (average === 0) {
      rating.push(<FontAwesomeIcon icon={emptyStar} className="icon" />);
    } else if (i < average) {
      rating.push(<FontAwesomeIcon icon={fullStar} className="icon" />);
    } else if (i - average <= 0.5) {
      rating.push(<FontAwesomeIcon icon={faStarHalfStroke} className="icon" />);
    } else {
      rating.push(<FontAwesomeIcon icon={emptyStar} className="icon" />);
    }
  }

  return <div>{rating.map((star) => star)}</div>;
}
