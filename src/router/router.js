const routes = [];
const BASE_PATH = '/podcast-player';

export function addRoute(pattern, renderFn) {
  routes.push({ pattern, renderFn });
}

export function navigate(path) {
  history.pushState({}, '', BASE_PATH + path);
  handleRoute();
}

export function initRouter() {
  window.addEventListener('popstate', () => {
    handleRoute();
  });

  handleRoute();
}

function handleRoute() {
  const container = document.getElementById('page-container');

  let path = location.pathname;
  if (path.startsWith(BASE_PATH)) {
    path = path.slice(BASE_PATH.length);
  }
  if (path === '') {
    path = '/';
  }

  for (const route of routes) {
    const match = matchPath(route.pattern, path);
    if (match) {
      route.renderFn(container, match.params);
      return;
    }
  }

  container.innerHTML = '<p>Страница не найдена</p>';
}

function matchPath(pattern, path) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) return null;

  const params = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pathPart = pathParts[i];

    if (patternPart.startsWith(':')) {
      params[patternPart.slice(1)] = pathPart;
    } else if (patternPart !== pathPart) {
      return null;
    }
  }

  return { params };
}