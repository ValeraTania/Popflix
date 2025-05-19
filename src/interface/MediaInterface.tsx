export interface MediaGeneral {
  id: number;
  poster_path: string;
  vote_average: number;
}

export interface Movie extends MediaGeneral {
  mediaType?: "movie";
  title: string;
  release_date: string;
  runtime: number;
}

export interface Serie extends MediaGeneral {
  mediaType?: "tv";
  name: string;
  first_air_date: string;
  number_of_seasons: number;
}

export type MediaType = "movie" | "tv";
