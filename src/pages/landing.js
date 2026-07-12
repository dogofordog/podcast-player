import { fetchBestPodcasts, searchPodcasts } from '../api/podcasts.js';
import { navigate } from '../router/router.js';
import { debounce } from '../utils/debounce.js';

export async function renderLanding(container) {
  container.innerHTML = `
    <input type="text" id="search-input" placeholder="Поиск подкастов..." />
    <div id="podcast-list"></div>
  `;

  const listContainer = document.getElementById('podcast-list');
  const searchInput = document.getElementById('search-input');

  await showBestPodcasts(listContainer);

  listContainer.addEventListener('click', handleTileClick);

  const debouncedSearch = debounce((query) => {
    handleSearchInput(query, listContainer);
  }, 400);

  searchInput.addEventListener('input', (event) => {
    debouncedSearch(event.target.value.trim());
  });
}

async function showBestPodcasts(container) {
  const data = await fetchBestPodcasts();
  container.innerHTML = renderPodcastTiles(data.podcasts);
}

async function handleSearchInput(query, container) {
  if (query === '') {
    await showBestPodcasts(container);
    return;
  }

  const data = await searchPodcasts(query);
  const podcasts = data.results.map((result) => result.podcast);
  container.innerHTML = renderPodcastTiles(podcasts);
}

function handleTileClick(event) {
  const tile = event.target.closest('.tile');
  if (!tile) return;

  const podcastId = tile.dataset.podcastId;
  navigate(`/podcast/${podcastId}`);
}

function renderPodcastTiles(podcasts) {
  return podcasts
    .map(
      (podcast) => `
        <div class="tile" data-podcast-id="${podcast.id}">
          <img src="${podcast.thumbnail}" alt="${podcast.title_original ?? podcast.title}" />
          <h3>${podcast.title_original ?? podcast.title}</h3>
          <p>${podcast.publisher_original ?? podcast.publisher}</p>
        </div>
      `
    )
    .join('');
}