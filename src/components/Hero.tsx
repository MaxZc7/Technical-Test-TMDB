import { useEffect, useRef, useState } from 'react';
import { PlayButton, LoadingIndicator } from './Icons';
import { type Movie, type TvShow, type Movies, type TvShows } from '../types';

const APP_STATUS = {
  IDLE: 'idle',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

export default function Hero() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [movies, setMovies] = useState<Movies>([]);
  const [tvShows, setTvShows] = useState<TvShows>([]);
  const [focus, setFocus] = useState(0);
  const [activeSection, setActiveSection] = useState<'movies' | 'tvShows'>(
    'movies'
  );
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/trending', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.dataMovies.results);
      setTvShows(data.dataTvShows.results);

      heroRef.current?.focus();
      setAppStatus(APP_STATUS.SUCCESS);
    };
    fetchData();
    console.log('Made it by MaxZ');
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        if (activeSection === 'movies') {
          setFocus((prevFocus) => Math.max(prevFocus - 1, 0));
        } else if (activeSection === 'tvShows') {
          setFocus((prevFocus) => Math.max(prevFocus - 1, 0));
        }
        break;
      case 'ArrowRight':
        if (activeSection === 'movies') {
          setFocus((prevFocus) => Math.min(prevFocus + 1, movies?.length - 1));
        } else if (activeSection === 'tvShows') {
          setFocus((prevFocus) => Math.min(prevFocus + 1, tvShows?.length - 1));
        }
        break;
      case 'ArrowDown':
        setActiveSection('tvShows');
        setFocus(0);
        break;
      case 'ArrowUp':
        setActiveSection('movies');
        setFocus(0);
        break;
      case 'Enter':
        if (activeSection === 'movies') {
          window.location.href = `/movie/${movies[focus].id}`;
        } else if (activeSection === 'tvShows') {
          window.location.href = `/tvshow/${tvShows[focus].id}`;
        }
        break;

      default:
        break;
    }
  };

  const getTransformValue = (itemsLength: number) => {
    const cardWidth = 400;
    const visibleCards = 2.7;
    const offset = Math.floor(visibleCards / 2);
    const maxOffset = itemsLength - visibleCards;
    const transformValue =
      Math.max(Math.min(focus - offset, maxOffset), 0) * cardWidth;
    return -transformValue;
  };

  return (
    <div
      className=" justify-center items-center w-full flex flex-col md:h-screen bg-gradient-to-b from-black via-red-950 to-black gap-4"
      onKeyDown={handleKeyDown}
      ref={heroRef}
      tabIndex={0}
    >
      <section className="flex flex-col md:max-w-[90vw] w-full">
        <h2 className="mb-8 z-10 text-white text-4xl px-4">Trending Movies</h2>
        <div
          className="flex md:flex-row flex-col gap-8 md:max-h-[260px]   p-4 transition-all duration-300 mx-4 md:mx-0"
          style={{
            transform: `${
              activeSection == 'movies'
                ? `translateX(${getTransformValue(movies?.length)}px)`
                : ''
            }`,
          }}
        >
          {appStatus == 'success' ? (
            movies.map((movie: Movie, index: number) => {
              const movieBackdropPath = `${
                'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path
              }`;

              return (
                <a
                  href={`movie/${movie.id}`}
                  key={movie.id}
                  className={`md:min-w-[400px] md:min-h-[223px] relative group ${
                    activeSection === 'movies' && index === focus
                      ? 'outline outline-4 outline-white'
                      : ''
                  }`}
                >
                  <img
                    src={movieBackdropPath}
                    alt={movie.title}
                    className="absolute z-10"
                  />
                  <img
                    src={movieBackdropPath}
                    alt={movie.title}
                    className={`scale-105 blur-xl -z-10 block group-hover:scale-110 transition-all ${
                      activeSection === 'movies' && index === focus
                        ? 'scale-110'
                        : ''
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-black/50 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20  ${
                      activeSection === 'movies' && index === focus
                        ? 'opacity-100'
                        : ''
                    }`}
                  >
                    <div className="text-white text-center p-4 ">
                      <h3 className="text-xl font-bold">{movie.title}</h3>
                      <div className="flex flex-col gap-1 justify-center items-center">
                        <p className="text-lg">
                          {movie.vote_average.toFixed(1)}/10
                        </p>
                        <PlayButton />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            <>
              <LoadingIndicator></LoadingIndicator>
            </>
          )}
        </div>
      </section>
      <section className=" flex flex-col md:max-w-[90vw] w-full">
        <h3 className="mb-8 z-10 text-white text-4xl px-4">
          Trending TV Shows
        </h3>
        <div
          className={`flex md:flex-row flex-col gap-8 p-4 transition-all duration-300 md:max-h-[260px] mx-4 md:mx-0 `}
          style={{
            transform: `${
              activeSection == 'tvShows'
                ? `translateX(${getTransformValue(tvShows?.length)}px)`
                : ''
            }`,
          }}
        >
          {appStatus == 'success' ? (
            tvShows.map((tvShow: TvShow, index: number) => {
              const tvShowBackdropPath = `${
                'https://image.tmdb.org/t/p/w500/' + tvShow.backdrop_path
              }`;

              return (
                <a
                  href={`/tvshow/${tvShow.id}`}
                  key={tvShow.id}
                  className={`md:min-w-[400px] md:min-h-[223px] relative group  ${
                    activeSection === 'tvShows' && index === focus
                      ? 'outline outline-4 outline-white'
                      : ''
                  }`}
                >
                  <img
                    src={tvShowBackdropPath}
                    alt={tvShow.original_name}
                    className="absolute z-10"
                  />
                  <img
                    src={tvShowBackdropPath}
                    alt={tvShow.original_name}
                    className={`scale-105 blur-xl -z-10 block group-hover:scale-110 transition-all ${
                      activeSection === 'tvShows' && index === focus
                        ? 'scale-110'
                        : ''
                    }`}
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-black/50 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20  ${
                      activeSection === 'tvShows' && index === focus
                        ? 'opacity-100'
                        : ''
                    }`}
                  >
                    <div className="text-white text-center p-4  ">
                      <h3 className="text-xl font-bold">
                        {tvShow.original_name}
                      </h3>
                      <div className="flex flex-col gap-1 justify-center items-center">
                        <p className="text-lg">
                          {' '}
                          {tvShow.vote_average.toFixed(1)}/10
                        </p>
                        <PlayButton />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            <LoadingIndicator></LoadingIndicator>
          )}
        </div>
      </section>
    </div>
  );
}
