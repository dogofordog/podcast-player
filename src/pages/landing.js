import { fetchBestPodcasts, searchPodcasts } from '../api/podcasts.js';
import { navigate } from '../router/router.js';
import { debounce } from '../utils/debounce.js';

let currentPage = 1;
let isSearchActive = false;

export async function renderLanding(container) {
  container.innerHTML = `
    <input type="text" id="search-input" placeholder="Поиск подкастов..." />
    <div id="loading-indicator" style="display: none;">Загрузка...</div>
    <div id="podcast-list"></div>
    <button id="load-more-button">Загрузить ещё</button>
  `;

  const listContainer = document.getElementById('podcast-list');
  const searchInput = document.getElementById('search-input');
  const loadMoreButton = document.getElementById('load-more-button');

  currentPage = 1;
  isSearchActive = false;

  await showBestPodcasts(listContainer, currentPage, false);

  container.addEventListener('click', handleTileClick);

  const debouncedSearch = debounce((query) => {
    handleSearchInput(query, listContainer);
  }, 400);

  searchInput.addEventListener('input', (event) => {
    debouncedSearch(event.target.value.trim());
  });

  loadMoreButton.addEventListener('click', async () => {
    if (isSearchActive) return;
    currentPage += 1;
    await showBestPodcasts(listContainer, currentPage, true);
  });
}

async function showBestPodcasts(container, page, append) {
  toggleLoading(true);
  const data = await fetchBestPodcasts(page);
  toggleLoading(false);

  if (append) {
    container.insertAdjacentHTML('beforeend', renderPodcastTiles(data.podcasts));
  } else {
    container.innerHTML = renderPodcastTiles(data.podcasts);
  }
}

async function handleSearchInput(query, container) {
  if (query === '') {
    isSearchActive = false;
    currentPage = 1;
    await showBestPodcasts(container, currentPage, false);
    return;
  }

  isSearchActive = true;
  toggleLoading(true);
  const data = await searchPodcasts(query);
  toggleLoading(false);

  const podcasts = data.results.map((result) => result.podcast);
  container.innerHTML = renderPodcastTiles(podcasts);
}

function toggleLoading(isLoading) {
  const indicator = document.getElementById('loading-indicator');
  if (indicator) {
    indicator.style.display = isLoading ? 'block' : 'none';
  }
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