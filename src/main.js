import { addRoute, initRouter } from './router/router.js';
import { renderLanding } from './pages/landing.js';
import { renderDetails } from './pages/details.js';

addRoute('/', renderLanding);
addRoute('/podcast/:id', renderDetails);

initRouter();
