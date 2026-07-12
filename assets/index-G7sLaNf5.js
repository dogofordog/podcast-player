(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[];function t(t,n){e.push({pattern:t,renderFn:n})}function n(e){history.pushState({},``,e),i(e)}function r(){window.addEventListener(`popstate`,()=>{i(location.pathname)}),i(location.pathname)}function i(t){let n=document.getElementById(`page-container`);for(let r of e){let e=a(r.pattern,t);if(e){r.renderFn(n,e.params);return}}n.innerHTML=`<p>Страница не найдена</p>`}function a(e,t){let n=e.split(`/`).filter(Boolean),r=t.split(`/`).filter(Boolean);if(n.length!==r.length)return null;let i={};for(let e=0;e<n.length;e++){let t=n[e],a=r[e];if(t.startsWith(`:`))i[t.slice(1)]=a;else if(t!==a)return null}return{params:i}}var o=`https://listen-api-test.listennotes.com/api/v2`;async function s(e=1){let t=`${o}/best_podcasts?sort=recent_published_first&page=${e}`,n=await fetch(t,{headers:{Accept:`application/json`}});if(!n.ok)throw Error(`Ошибка запроса best_podcasts: ${n.status}`);return n.json()}async function c(e,t=0){let n=`${o}/search?q=${encodeURIComponent(e)}&type=podcast&offset=${t}`,r=await fetch(n,{headers:{Accept:`application/json`}});if(!r.ok)throw Error(`Ошибка запроса search: ${r.status}`);return r.json()}async function l(e){let t=`${o}/podcasts/${e}`,n=await fetch(t,{headers:{Accept:`application/json`}});if(!n.ok)throw Error(`Ошибка запроса podcasts/${e}: ${n.status}`);return n.json()}function u(e,t){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}var d=1,f=!1;async function p(e){e.innerHTML=`
    <input type="text" id="search-input" placeholder="Поиск подкастов..." />
    <div id="loading-indicator" style="display: none;">Загрузка...</div>
    <div id="podcast-list"></div>
    <button id="load-more-button">Загрузить ещё</button>
  `;let t=document.getElementById(`podcast-list`),n=document.getElementById(`search-input`),r=document.getElementById(`load-more-button`);d=1,f=!1,await m(t,d,!1),e.addEventListener(`click`,_);let i=u(e=>{h(e,t)},400);n.addEventListener(`input`,e=>{i(e.target.value.trim())}),r.addEventListener(`click`,async()=>{f||(d+=1,await m(t,d,!0))})}async function m(e,t,n){g(!0);let r=await s(t);g(!1),n?e.insertAdjacentHTML(`beforeend`,v(r.podcasts)):e.innerHTML=v(r.podcasts)}async function h(e,t){if(e===``){f=!1,d=1,await m(t,d,!1);return}f=!0,g(!0);let n=await c(e);g(!1),t.innerHTML=v(n.results.map(e=>e.podcast))}function g(e){let t=document.getElementById(`loading-indicator`);t&&(t.style.display=e?`block`:`none`)}function _(e){let t=e.target.closest(`.tile`);if(!t)return;let r=t.dataset.podcastId;n(`/podcast/${r}`)}function v(e){return e.map(e=>`
        <div class="tile" data-podcast-id="${e.id}">
          <img src="${e.thumbnail}" alt="${e.title_original??e.title}" />
          <h3>${e.title_original??e.title}</h3>
          <p>${e.publisher_original??e.publisher}</p>
        </div>
      `).join(``)}function y(e){return`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,`0`)}`}function b(e){return new Date(e).toLocaleDateString(`ru-RU`,{year:`numeric`,month:`long`,day:`numeric`})}var x=`podcast-player:position:`;function S(e,t){localStorage.setItem(`${x}${e}`,t.toString())}function C(e){let t=localStorage.getItem(`${x}${e}`);return t?parseFloat(t):0}var w=new Audio,T=null,E=!1;w.addEventListener(`timeupdate`,()=>{T&&!E&&S(T.id,w.currentTime)});function D(e){let t=T&&T.id===e.id;if(T=e,!t){E=!0,w.src=e.audio;let t=()=>{let n=C(e.id);n>0&&(w.currentTime=Math.max(0,n-10)),E=!1,w.removeEventListener(`loadedmetadata`,t),w.removeEventListener(`canplay`,t)};w.addEventListener(`loadedmetadata`,t),w.addEventListener(`canplay`,t)}w.play().catch(e=>{e.name!==`AbortError`&&console.error(`Ошибка воспроизведения:`,e)})}function O(){w.paused?w.play().catch(e=>{e.name!==`AbortError`&&console.error(`Ошибка воспроизведения:`,e)}):w.pause()}function k(e){w.currentTime=e,T&&S(T.id,e)}function A(){return w}function j(e){e.innerHTML=`
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
  `;let t=A(),n=document.getElementById(`play-pause-button`),r=document.getElementById(`progress-bar-track`),i=document.getElementById(`progress-bar-fill`),a=document.getElementById(`current-time`),o=document.getElementById(`total-time`),s=document.getElementById(`player`);document.getElementById(`player-title`),document.getElementById(`close-player-button`).addEventListener(`click`,()=>{t.pause(),s.style.display=`none`}),n.addEventListener(`click`,()=>{O()}),t.addEventListener(`play`,()=>{n.textContent=`⏸`}),t.addEventListener(`pause`,()=>{n.textContent=`▶`}),t.addEventListener(`loadedmetadata`,()=>{o.textContent=y(t.duration)}),t.addEventListener(`timeupdate`,()=>{if(a.textContent=y(t.currentTime),isFinite(t.duration)){let e=t.currentTime/t.duration*100;i.style.width=`${e}%`}}),r.addEventListener(`click`,e=>{if(!isFinite(t.duration))return;let n=r.getBoundingClientRect();k((e.clientX-n.left)/n.width*t.duration)})}function M(e){D(e);let t=document.getElementById(`player`),n=document.getElementById(`player-title`);t.style.display=`flex`,n.textContent=e.title}var N=`podcast-player:playlist`;function P(){let e=localStorage.getItem(N);return e?JSON.parse(e):[]}function F(e){let t=P();t.some(t=>t.id===e.id)||(t.push(e),localStorage.setItem(N,JSON.stringify(t)))}function I(e){let t=P().filter(t=>t.id!==e);localStorage.setItem(N,JSON.stringify(t))}function L(e){return P().some(t=>t.id===e)}async function R(e,t){let r=await l(t.id);e.innerHTML=`
    <button id="back-button">← Назад</button>
    <h2>${r.title}</h2>
    <p>${r.publisher}</p>
    <div class="episode-list">
      ${z(r.episodes)}
    </div>
  `,document.getElementById(`back-button`).addEventListener(`click`,()=>{n(`/`)}),e.addEventListener(`click`,e=>{let t=e.target.closest(`.add-to-playlist-button`);if(t){let e=t.dataset.episodeId,n=r.episodes.find(t=>t.id===e);n&&(F(n),t.textContent=`В плейлисте`,t.disabled=!0);return}let n=e.target.closest(`.episode`);if(n){let e=n.dataset.episodeId,t=r.episodes.find(t=>t.id===e);t&&M(t)}})}function z(e){return e.map(e=>`
        <div class="episode" data-episode-id="${e.id}">
          <h4>${e.title}</h4>
          <p>${b(e.pub_date_ms)} · ${y(e.audio_length_sec)}</p>
          <button 
            class="add-to-playlist-button" 
            data-episode-id="${e.id}"
            ${L(e.id)?`disabled`:``}
          >
            ${L(e.id)?`В плейлисте`:`Добавить в плейлист`}
          </button>
        </div>
      `).join(``)}function B(e){let t=P();e.innerHTML=`
    <button id="back-button">← Назад</button>
    <h2>Мой плейлист</h2>
    ${t.length===0?`<p>Плейлист пуст</p>`:V(t)}
  `,document.getElementById(`back-button`).addEventListener(`click`,()=>{n(`/`)}),e.addEventListener(`click`,n=>{let r=n.target.closest(`.remove-button`);if(r){let t=r.dataset.episodeId;I(t),B(e);return}let i=n.target.closest(`.playlist-item`);if(i){let e=i.dataset.episodeId,n=t.find(t=>t.id===e);n&&M(n)}})}function V(e){return e.map(e=>`
        <div class="playlist-item" data-episode-id="${e.id}">
          <h4>${e.title}</h4>
          <p>${b(e.pub_date_ms)} · ${y(e.audio_length_sec)}</p>
          <button class="remove-button" data-episode-id="${e.id}">Удалить</button>
        </div>
      `).join(``)}t(`/`,p),t(`/podcast/:id`,R),t(`/playlist`,B),j(document.getElementById(`player-container`)),r(),document.getElementById(`app-header`).addEventListener(`click`,e=>{let t=e.target.closest(`a`);t&&(e.preventDefault(),n(t.getAttribute(`href`)))});