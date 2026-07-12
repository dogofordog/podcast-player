import { playEpisode, togglePlayPause, seekTo, getAudioElement, getCurrentEpisode } from './audio-player.js';
import { formatDuration } from '../utils/format-time.js';

export function initPlayerUI(container) {
  container.innerHTML = `
    <div id="player" style="display: none;">
      <span id="player-title"></span>
      <button id="play-pause-button">▶</button>
      <span id="current-time">0:00</span>
      <div id="progress-bar-track">
        <div id="progress-bar-fill"></div>
      </div>
      <span id="total-time">0:00</span>
      <button id="close-player-button">✕</button>
    </div>
  `;

  const audio = getAudioElement();
  const playPauseButton = document.getElementById('play-pause-button');
  const progressTrack = document.getElementById('progress-bar-track');
  const progressFill = document.getElementById('progress-bar-fill');
  const currentTimeLabel = document.getElementById('current-time');
  const totalTimeLabel = document.getElementById('total-time');
  const playerBlock = document.getElementById('player');
  const titleLabel = document.getElementById('player-title');
  const closeButton = document.getElementById('close-player-button');

  closeButton.addEventListener('click', () => {
    audio.pause();
    playerBlock.style.display = 'none';
  });

  playPauseButton.addEventListener('click', () => {
    togglePlayPause();
  });

  audio.addEventListener('play', () => {
    playPauseButton.textContent = '⏸';
  });

  audio.addEventListener('pause', () => {
    playPauseButton.textContent = '▶';
  });

  audio.addEventListener('loadedmetadata', () => {
    totalTimeLabel.textContent = formatDuration(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    currentTimeLabel.textContent = formatDuration(audio.currentTime);

    if (isFinite(audio.duration)) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = `${percentage}%`;
    }
  });

  progressTrack.addEventListener('click', (event) => {
    if (!isFinite(audio.duration)) return;

    const rect = progressTrack.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickPercentage = clickX / rect.width;
    const seekSeconds = clickPercentage * audio.duration;
    seekTo(seekSeconds);
  });
}

export function startPlayback(episode) {
  playEpisode(episode);

  const playerBlock = document.getElementById('player');
  const titleLabel = document.getElementById('player-title');

  playerBlock.style.display = 'flex';
  titleLabel.textContent = episode.title;
}