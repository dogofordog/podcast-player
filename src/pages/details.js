import { fetchPodcastById } from '../api/podcasts.js';
import { navigate } from '../router/router.js';
import { formatDuration, formatDate } from '../utils/format-time.js';
import { startPlayback } from '../player/player-ui.js';
import { addToPlaylist, isInPlaylist } from '../store/playlist-store.js';

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
    const addButton = event.target.closest('.add-to-playlist-button');
    if (addButton) {
      const episodeId = addButton.dataset.episodeId;
      const episode = data.episodes.find((ep) => ep.id === episodeId);
      if (episode) {
        addToPlaylist(episode);
        addButton.textContent = 'В плейлисте';
        addButton.disabled = true;
      }
      return;
    }

    const episodeElement = event.target.closest('.episode');
    if (episodeElement) {
      const episodeId = episodeElement.dataset.episodeId;
      const episode = data.episodes.find((ep) => ep.id === episodeId);
      if (episode) {
        startPlayback(episode);
      }
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
          <button 
            class="add-to-playlist-button" 
            data-episode-id="${episode.id}"
            ${isInPlaylist(episode.id) ? 'disabled' : ''}
          >
            ${isInPlaylist(episode.id) ? 'В плейлисте' : 'Добавить в плейлист'}
          </button>
        </div>
      `
    )
    .join('');
}