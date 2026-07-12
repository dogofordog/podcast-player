import './style.css';
import { addRoute, initRouter } from './router/router.js';
import { renderLanding } from './pages/landing.js';
import { renderDetails } from './pages/details.js';
import { initPlayerUI } from './player/player-ui.js';

addRoute('/', renderLanding);
addRoute('/podcast/:id', renderDetails);

const playerContainer = document.getElementById('player-container');
initPlayerUI(playerContainer);

initRouter();