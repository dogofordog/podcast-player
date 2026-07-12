(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=`/podcast-player`;function n(t,n){e.push({pattern:t,renderFn:n})}function r(e){history.pushState({},``,t+e),a()}function i(){window.addEventListener(`popstate`,()=>{a()}),a()}function a(){let n=document.getElementById(`page-container`),r=location.pathname;r.startsWith(t)&&(r=r.slice(15)),r===``&&(r=`/`);for(let t of e){let e=o(t.pattern,r);if(e){t.renderFn(n,e.params);return}}n.innerHTML=`<p>Страница не найдена</p>`}function o(e,t){let n=e.split(`/`).filter(Boolean),r=t.split(`/`).filter(Boolean);if(n.length!==r.length)return null;let i={};for(let e=0;e<n.length;e++){let t=n[e],a=r[e];if(t.startsWith(`:`))i[t.slice(1)]=a;else if(t!==a)return null}return{params:i}}var s=`https://listen-api-test.listennotes.com/api/v2`;async function c(e=1){let t=`${s}/best_podcasts?sort=recent_published_first&page=${e}`,n=await fetch(t,{headers:{Accept:`application/json`}});if(!n.ok)throw Error(`Ошибка запроса best_podcasts: ${n.status}`);return n.json()}async function l(e,t=0){let n=`${s}/search?q=${encodeURIComponent(e)}&type=podcast&offset=${t}`,r=await fetch(n,{headers:{Accept:`application/json`}});if(!r.ok)throw Error(`Ошибка запроса search: ${r.status}`);return r.json()}async function u(e){let t=`${s}/podcasts/${e}`,n=await fetch(t,{headers:{Accept:`application/json`}});if(!n.ok)throw Error(`Ошибка запроса podcasts/${e}: ${n.status}`);return n.json()}function d(e,t){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}var f=1,p=!1;async function m(e){e.innerHTML=`
    <input type="text" id="search-input" placeholder="Поиск подкастов..." />
    <div id="loading-indicator" style="display: none;">Загрузка...</div>
    <div id="podcast-list"></div>
    <button id="load-more-button">Загрузить ещё</button>
  `;let t=document.getElementById(`podcast-list`),n=document.getElementById(`search-input`),r=document.getElementById(`load-more-button`);f=1,p=!1,await h(t,f,!1),e.addEventListener(`click`,v);let i=d(e=>{g(e,t)},400);n.addEventListener(`input`,e=>{i(e.target.value.trim())}),r.addEventListener(`click`,async()=>{p||(f+=1,await h(t,f,!0))})}async function h(e,t,n){_(!0);let r=await c(t);_(!1),n?e.insertAdjacentHTML(`beforeend`,y(r.podcasts)):e.innerHTML=y(r.podcasts)}async function g(e,t){if(e===``){p=!1,f=1,await h(t,f,!1);return}p=!0,_(!0);let n=await l(e);_(!1),t.innerHTML=y(n.results.map(e=>e.podcast))}function _(e){let t=document.getElementById(`loading-indicator`);t&&(t.style.display=e?`block`:`none`)}function v(e){let t=e.target.closest(`.tile`);if(!t)return;let n=t.dataset.podcastId;r(`/podcast/${n}`)}function y(e){return e.map(e=>`
        <div class="tile" data-podcast-id="${e.id}">
          <img src="${e.thumbnail}" alt="${e.title_original??e.title}" />
          <h3>${e.title_original??e.title}</h3>
          <p>${e.publisher_original??e.publisher}</p>
        </div>
      `).join(``)}function b(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,`0`)}`}function x(e){return new Date(e).toLocaleDateString(`ru-RU`,{year:`numeric`,month:`long`,day:`numeric`})}var S=`podcast-player:position:`;function C(e,t){localStorage.setItem(`${S}${e}`,t.toString())}function w(e){let t=localStorage.getItem(`${S}${e}`);return t?parseFloat(t):0}var T=new Audio,E=null,D=!1;T.addEventListener(`timeupdate`,()=>{E&&!D&&C(E.id,T.currentTime)});function O(e){let t=E&&E.id===e.id;if(E=e,!t){D=!0,T.src=e.audio;let t=()=>{let n=w(e.id);n>0&&(T.currentTime=Math.max(0,n-10)),D=!1,T.removeEventListener(`loadedmetadata`,t),T.removeEventListener(`canplay`,t)};T.addEventListener(`loadedmetadata`,t),T.addEventListener(`canplay`,t)}T.play().catch(e=>{e.name!==`AbortError`&&console.error(`Ошибка воспроизведения:`,e)})}function k(){T.paused?T.play().catch(e=>{e.name!==`AbortError`&&console.error(`Ошибка воспроизведения:`,e)}):T.pause()}function A(e){T.currentTime=e,E&&C(E.id,e)}function j(){return T}function M(e){e.innerHTML=`
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
  `;let t=j(),n=document.getElementById(`play-pause-button`),r=document.getElementById(`progress-bar-track`),i=document.getElementById(`progress-bar-fill`),a=document.getElementById(`current-time`),o=document.getElementById(`total-time`),s=document.getElementById(`player`);document.getElementById(`player-title`),document.getElementById(`close-player-button`).addEventListener(`click`,()=>{t.pause(),s.style.display=`none`}),n.addEventListener(`click`,()=>{k()}),t.addEventListener(`play`,()=>{n.textContent=`⏸`}),t.addEventListener(`pause`,()=>{n.textContent=`▶`}),t.addEventListener(`loadedmetadata`,()=>{o.textContent=b(t.duration)}),t.addEventListener(`timeupdate`,()=>{if(a.textContent=b(t.currentTime),isFinite(t.duration)){let e=t.currentTime/t.duration*100;i.style.width=`${e}%`}}),r.addEventListener(`click`,e=>{if(!isFinite(t.duration))return;let n=r.getBoundingClientRect();A((e.clientX-n.left)/n.width*t.duration)})}function N(e){O(e);let t=document.getElementById(`player`),n=document.getElementById(`player-title`);t.style.display=`flex`,n.textContent=e.title}var P=`podcast-player:playlist`;function F(){let e=localStorage.getItem(P);return e?JSON.parse(e):[]}function I(e){let t=F();t.some(t=>t.id===e.id)||(t.push(e),localStorage.setItem(P,JSON.stringify(t)))}function L(e){let t=F().filter(t=>t.id!==e);localStorage.setItem(P,JSON.stringify(t))}function R(e){return F().some(t=>t.id===e)}async function z(e,t){let n=await u(t.id);e.innerHTML=`
    <button id="back-button">← Назад</button>
    <h2>${n.title}</h2>
    <p>${n.publisher}</p>
    <div class="episode-list">
      ${B(n.episodes)}
    </div>
  `,document.getElementById(`back-button`).addEventListener(`click`,()=>{r(`/`)}),e.addEventListener(`click`,e=>{let t=e.target.closest(`.add-to-playlist-button`);if(t){let e=t.dataset.episodeId,r=n.episodes.find(t=>t.id===e);r&&(I(r),t.textContent=`В плейлисте`,t.disabled=!0);return}let r=e.target.closest(`.episode`);if(r){let e=r.dataset.episodeId,t=n.episodes.find(t=>t.id===e);t&&N(t)}})}function B(e){return e.map(e=>`
        <div class="episode" data-episode-id="${e.id}">
          <h4>${e.title}</h4>
          <p>${x(e.pub_date_ms)} · ${b(e.audio_length_sec)}</p>
          <button 
            class="add-to-playlist-button" 
            data-episode-id="${e.id}"
            ${R(e.id)?`disabled`:``}
          >
            ${R(e.id)?`В плейлисте`:`Добавить в плейлист`}
          </button>
        </div>
      `).join(``)}function V(e){let t=F();e.innerHTML=`
    <button id="back-button">← Назад</button>
    <h2>Мой плейлист</h2>
    ${t.length===0?`<p>Плейлист пуст</p>`:H(t)}
  `,document.getElementById(`back-button`).addEventListener(`click`,()=>{r(`/`)}),e.addEventListener(`click`,n=>{let r=n.target.closest(`.remove-button`);if(r){let t=r.dataset.episodeId;L(t),V(e);return}let i=n.target.closest(`.playlist-item`);if(i){let e=i.dataset.episodeId,n=t.find(t=>t.id===e);n&&N(n)}})}function H(e){return e.map(e=>`
        <div class="playlist-item" data-episode-id="${e.id}">
          <h4>${e.title}</h4>
          <p>${x(e.pub_date_ms)} · ${b(e.audio_length_sec)}</p>
          <button class="remove-button" data-episode-id="${e.id}">Удалить</button>
        </div>
      `).join(``)}n(`/`,m),n(`/podcast/:id`,z),n(`/playlist`,V),M(document.getElementById(`player-container`)),i(),document.getElementById(`app-header`).addEventListener(`click`,e=>{let t=e.target.closest(`a`);t&&(e.preventDefault(),r(t.getAttribute(`href`)))});