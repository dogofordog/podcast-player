import { savePosition, getPosition } from '../store/position-store.js';

const audio = new Audio();

let currentEpisode = null;
let isResuming = false;

audio.addEventListener('timeupdate', () => {
  if (currentEpisode && !isResuming) {
    savePosition(currentEpisode.id, audio.currentTime);
  }
});

export function playEpisode(episode) {
  const isSameEpisode = currentEpisode && currentEpisode.id === episode.id;

  currentEpisode = episode;

  if (!isSameEpisode) {
    isResuming = true;
    audio.src = episode.audio;

    const applyResume = () => {
      const savedPosition = getPosition(episode.id);
      if (savedPosition > 0) {
        audio.currentTime = Math.max(0, savedPosition - 10);
      }
      isResuming = false;
      audio.removeEventListener('loadedmetadata', applyResume);
      audio.removeEventListener('canplay', applyResume);
    };

    audio.addEventListener('loadedmetadata', applyResume);
    audio.addEventListener('canplay', applyResume);
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

  if (currentEpisode) {
    savePosition(currentEpisode.id, seconds);
  }
}

export function getAudioElement() {
  return audio;
}

export function getCurrentEpisode() {
  return currentEpisode;
}