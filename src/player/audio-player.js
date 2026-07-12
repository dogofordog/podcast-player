const audio = new Audio();

let currentEpisode = null;

export function playEpisode(episode) {
  const isSameEpisode = currentEpisode && currentEpisode.id === episode.id;

  currentEpisode = episode;

  if (!isSameEpisode) {
    audio.src = episode.audio;
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