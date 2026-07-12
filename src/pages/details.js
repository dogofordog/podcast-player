import { fetchPodcastById } from '../api/podcasts.js';
import { navigate } from '../router/router.js';
import { formatDuration, formatDate } from '../utils/format-time.js';
import { startPlayback } from '../player/player-ui.js';

export async function renderDetails(container, params) {
  const data = await fetchPodcastById(params.id);

  container.innerHTML = `
    <button id="back-button">← Назад</button>
    <h2>${data.title}</h2>
    <p>${data.publisher}</p>
    <div class="episode-list">
      ${renderEpisodeList(data.episodes)}
    </div>
  `;

  document.getElementById('back-button').addEventListener('click', () => {
    navigate('/');
  });

  container.addEventListener('click', (event) => {
    const episodeElement = event.target.closest('.episode');
    if (!episodeElement) return;

    const episodeId = episodeElement.dataset.episodeId;
    const episode = data.episodes.find((ep) => ep.id === episodeId);
    if (episode) {
      startPlayback(episode);
    }
  });
}

function renderEpisodeList(episodes) {
  return episodes
    .map(
      (episode) => `
        <div class="episode" data-episode-id="${episode.id}">
          <h4>${episode.title}</h4>
          <p>${formatDate(episode.pub_date_ms)} · ${formatDuration(episode.audio_length_sec)}</p>
        </div>
      `
    )
    .join('');
}