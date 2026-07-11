import { fetchBestPodcasts } from '../api/podcasts.js';
import { navigate } from '../router/router.js';

export async function renderLanding(container) {
  const data = await fetchBestPodcasts();
  container.innerHTML = renderPodcastTiles(data.podcasts);

  container.addEventListener('click', handleTileClick);
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
          <img src="${podcast.thumbnail}" alt="${podcast.title}" />
          <h3>${podcast.title}</h3>
          <p>${podcast.publisher}</p>
        </div>
      `
    )
    .join('');
}