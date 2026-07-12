const STORAGE_KEY = 'podcast-player:playlist';

export function getPlaylist() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addToPlaylist(episode) {
  const playlist = getPlaylist();

  const alreadyExists = playlist.some((item) => item.id === episode.id);
  if (alreadyExists) return;

  playlist.push(episode);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist));
}

export function removeFromPlaylist(episodeId) {
  const playlist = getPlaylist();
  const updated = playlist.filter((item) => item.id !== episodeId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function isInPlaylist(episodeId) {
  const playlist = getPlaylist();
  return playlist.some((item) => item.id === episodeId);
}