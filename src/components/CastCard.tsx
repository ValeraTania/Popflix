import noImage from "../assets/no-image.png";
import { Cast } from "../interface/CastInterface";

interface CastProps {
  actor: Cast;
}

export default function CastCard({ actor }: CastProps) {
  const getActorImage = (path: string | null) => {
    return path ? `https://image.tmdb.org/t/p/w500/${path}` : noImage;
  };

  return (
    <>
      <div className=" details-card">
        <div className="actor-details">
 <div
          className="actor-img"
          style={{
            backgroundImage: `url(${getActorImage(actor.profile_path)})`,
          }}
        ></div>

        <h4 className="actor-name">{actor.name}</h4>
        <span className="actor-character">{actor.character || actor.job}</span>
        </div>
       
      </div>
    </>
  );
}
