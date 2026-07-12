import { savePosition, getPosition } from '../store/position-store.js';

const audio = new Audio();

let currentEpisode = null;

audio.addEventListener('timeupdate', () => {
  if (currentEpisode) {
    savePosition(currentEpisode.id, audio.currentTime);
  }
});

export function playEpisode(episode) {
  const isSameEpisode = currentEpisode && currentEpisode.id === episode.id;

  currentEpisode = episode;

  if (!isSameEpisode) {
    audio.src = episode.audio;

    audio.addEventListener('loadedmetadata', function setInitialPosition() {
      const savedPosition = getPosition(episode.id);
      if (savedPosition > 0) {
        audio.currentTime = Math.max(0, savedPosition - 10);
      }
      audio.removeEventListener('loadedmetadata', setInitialPosition);
    });
  }

  audio.play().catch((error) => {
    if (error.name !== 'AbortError') {
      console.error('Ошибка воспроизведения:', error);
    }
  });
}

export function togglePlayPause() {
  if (audio.paused) {
    audio.play().catch((error) => {
      if (error.name !== 'AbortError') {
        console.error('Ошибка воспроизведения:', error);
      }
    });
  } else {
    audio.pause();
  }
}

export function seekTo(seconds) {
  audio.currentTime = seconds;
}

export function getAudioElement() {
  return audio;
}

export function getCurrentEpisode() {
  return currentEpisode;
}