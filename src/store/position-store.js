const PREFIX = 'podcast-player:position:';

export function savePosition(episodeId, seconds) {
  localStorage.setItem(`${PREFIX}${episodeId}`, seconds.toString());
}

export function getPosition(episodeId) {
  const saved = localStorage.getItem(`${PREFIX}${episodeId}`);
  return saved ? parseFloat(saved) : 0;
}