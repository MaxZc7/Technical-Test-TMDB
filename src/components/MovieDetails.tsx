import { useEffect, useState } from 'react';
import { type Movie, type TvShow } from '../types/index';

export default function MovieDetails({ movie_id }: { movie_id: string }) {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovieById = async () => {
      const response = await fetch(`/api/movie-details${movie_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setMovie(data.data);
    };
    fetchMovieById();
  }, []);
  const movieBackdropPath = `${
    'https://image.tmdb.org/t/p/w500/' + movie?.backdrop_path
  }`;

  const isForAdults = movie?.adult ? true : false;
  const genresString = movie?.genres.map((genre) => genre.name).join(', ');

  return (
    <section className="h-screen w-full flex justify-center items-center flex-col  bg-gradient-to-b from-black via-red-950 to-black text-white font-medium">
      {movie && (
        <div className="flex flex-col gap-4 justify-center items-center bg-black/50 h-full ">
          <strong className="text-3xl ">{movie.original_title}</strong>
          <div className="relative">
            <img
              className="rounded-xl z-20 absolute"
              src={movieBackdropPath}
              alt={movie.original_title}
            />
            <img
              className="rounded-xl z-10  blur-xl"
              src={movieBackdropPath}
              alt={movie.original_title}
            />
          </div>
          <strong className="mt-4">
            {isForAdults ? 'Only' : 'Not necessarily'} 18+{' '}
          </strong>
          <div className="flex gap-2">
            <strong>Genres: </strong>
            <ul className="flex">{genresString}</ul>
          </div>
          <p>
            <strong>Release date:</strong> {movie.release_date}{' '}
          </p>
          <p className="max-w-[50%] text-center">
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p>
            <strong>Average Vote:</strong> {movie.vote_average}
          </p>
        </div>
      )}
    </section>
  );
}
