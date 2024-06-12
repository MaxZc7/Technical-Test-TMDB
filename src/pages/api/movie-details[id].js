export async function GET({ params, request }) {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Movie ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const endpoint = `https://api.themoviedb.org/3/movie/${id}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${import.meta.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Movie not found' }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();

  return new Response(JSON.stringify({ data: data }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
