const redirectPath = sessionStorage.getItem('redirect-path');
if (redirectPath) {
  sessionStorage.removeItem('redirect-path');
  history.replaceState({}, '', redirectPath);
}

import './style.css';
import { addRoute, initRouter, navigate } from './router/router.js';
import { renderLanding } from './pages/landing.js';
import { renderDetails } from './pages/details.js';
import { renderPlaylist } from './pages/playlist.js';
import { initPlayerUI } from './player/player-ui.js';

addRoute('/', renderLanding);
addRoute('/podcast/:id', renderDetails);
addRoute('/playlist', renderPlaylist);

const playerContainer = document.getElementById('player-container');
initPlayerUI(playerContainer);

document.getElementById('app-header').addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;

  event.preventDefault();
  navigate(link.getAttribute('href'));
});

initRouter();