interface Genre {
  id: number;
  name: string;
}

export type Movie = {
  map(
    arg0: (movie: any) => import('react/jsx-runtime').JSX.Element
  ): import('react').ReactNode;
  id: number;
  adult: boolean;
  genres: Genre[];
  original_title: string;
  title: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
};

export type Movies = Movie[];

export type TvShow = {
  map(
    arg0: (tvShow: any) => import('react/jsx-runtime').JSX.Element
  ): import('react').ReactNode;
  id: number;
  original_name: string;
  backdrop_path: string;
  overview: string;
  adult: boolean;
  genres: Genre[];
  vote_average: number;
  first_air_date: string;
};

export type TvShows = TvShow[];
