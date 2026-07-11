const BASE_URL = 'https://listen-api-test.listennotes.com/api/v2';

export async function fetchBestPodcasts(page = 1) {
  const url = `${BASE_URL}/best_podcasts?sort=recent_published_first&page=${page}`;

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса best_podcasts: ${response.status}`);
  }

  return response.json();
}

export async function searchPodcasts(query, offset = 0) {
  const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&type=podcast&offset=${offset}`;

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса search: ${response.status}`);
  }

  return response.json();
}

export async function fetchPodcastById(id) {
  const url = `${BASE_URL}/podcasts/${id}`;

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса podcasts/${id}: ${response.status}`);
  }

  return response.json();
}
