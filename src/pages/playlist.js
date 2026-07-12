import { navigate } from '../router/router.js';
import { getPlaylist, removeFromPlaylist } from '../store/playlist-store.js';
import { formatDuration, formatDate } from '../utils/format-time.js';
import { startPlayback } from '../player/player-ui.js';

export function renderPlaylist(container) {
  const playlist = getPlaylist();

  container.innerHTML = `
    <button id="back-button">← Назад</button>
    <h2>Мой плейлист</h2>
    ${playlist.length === 0 ? '<p>Плейлист пуст</p>' : renderPlaylistItems(playlist)}
  `;

  document.getElementById('back-button').addEventListener('click', () => {
    navigate('/');
  });

  container.addEventListener('click', (event) => {
    const removeButton = event.target.closest('.remove-button');
    if (removeButton) {
      const episodeId = removeButton.dataset.episodeId;
      removeFromPlaylist(episodeId);
      renderPlaylist(container);
      return;
    }

    const item = event.target.closest('.playlist-item');
    if (item) {
      const episodeId = item.dataset.episodeId;
      const episode = playlist.find((ep) => ep.id === episodeId);
      if (episode) {
        startPlayback(episode);
      }
    }
  });
}

function renderPlaylistItems(playlist) {
  return playlist
    .map(
      (episode) => `
        <div class="playlist-item" data-episode-id="${episode.id}">
          <h4>${episode.title}</h4>
          <p>${formatDate(episode.pub_date_ms)} · ${formatDuration(episode.audio_length_sec)}</p>
          <button class="remove-button" data-episode-id="${episode.id}">Удалить</button>
        </div>
      `
    )
    .join('');
}