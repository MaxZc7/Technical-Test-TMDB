export async function GET({ request }) {
  const responseMovies = await fetch(
    'https://api.themoviedb.org/3/trending/movie/day',
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );

  const responseTvShows = await fetch(
    'https://api.themoviedb.org/3/trending/tv/day',
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );

  const dataMovies = await responseMovies.json();
  const dataTvShows = await responseTvShows.json();

  return new Response(
    JSON.stringify({ dataMovies: dataMovies, dataTvShows: dataTvShows }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
