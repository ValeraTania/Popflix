export interface Media {
  id: number;
  poster_path: string;
  vote_average: number;
  mediaType?: MediaType;
  title: string;
  release_date: string;
  runtime: number;
  name: string;
  first_air_date: string;
  number_of_seasons: number;
}

export type MediaType = "movie" | "tv";
