// 外壳：石灰外框（侧栏 + 顶栏）+ 白色纸面；简单的 hash 路由
const $ = (sel, el = document) => el.querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const I = {
  studio: '<path d="M3 6.5 8 3l5 3.5V13H3z M6.5 13V9.5h3V13" />',
  assets: '<path d="M3 3h4v4H3z M9 3h4v4H9z M3 9h4v4H3z M9 9h4v4H9z" />',
  search: '<circle cx="7" cy="7" r="4.2"/><path d="m10.2 10.2 3 3"/>',
  spark: '<path d="M8 2.5v3M8 10.5v3M2.5 8h3M10.5 8h3M4.3 4.3l1.8 1.8M9.9 9.9l1.8 1.8M11.7 4.3 9.9 6.1M6.1 9.9l-1.8 1.8"/>',
  plus: '<path d="M8 3v10M3 8h10"/>',
  close: '<path d="m4 4 8 8M12 4l-8 8"/>',
  back: '<path d="M9.5 3.5 5 8l4.5 4.5"/>',
  down: '<path d="M8 3v7M5 7.5 8 10.5l3-3M3.5 13h9"/>',
  menu: '<path d="M3 5h10M3 8h10M3 11h10"/>',
  check: '<path d="m3.5 8.5 3 3 6-7"/>',
  swap: '<path d="M4 5.5h8l-2.5-2.5M12 10.5H4l2.5 2.5"/>',
};
const icon = (n, s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const mark = `<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><rect width="22" height="22" rx="6" fill="#1b6c80"/><path d="M5 8 Q11 17 17 8" stroke="#fff" stroke-width="1.4" fill="none"/><circle cx="11" cy="13.6" r="2.2" fill="#fff"/></svg>`;

let route = { name: 'home' };
function go(name, params = {}) { route = { name, ...params }; render(); $('.sheet') && ($('.sheet').scrollTop = 0); }
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
}
function quotaBlock() {
  const u = used(), l = left(), low = l <= QUOTA_TOTAL * .2;
  return `<div class="quota ${low ? 'low' : ''}">
    <div style="display:flex;justify-content:space-between"><span>生成额度</span><span class="num">${u} / ${QUOTA_TOTAL} 张</span></div>
    <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${QUOTA_TOTAL}" aria-valuenow="${u}"><i style="width:${u / QUOTA_TOTAL * 100}%"></i></div>
    <span class="small muted">${l === 0 ? '额度已用完，联系运营加额度' : low ? `只剩 ${l} 张，用完需联系运营` : `实验期免费，还可生成 ${l} 张`}</span></div>`;
}
function shell(content) {
  const nav = (n, label, ic, count) => `<button class="nav-item" ${route.name === n || (n === 'home' && ['studio', 'flow'].includes(route.name)) ? 'aria-current="page"' : ''} onclick="go('${n}')">${icon(ic)}<span>${label}</span>${count != null ? `<span class="count num">${count}</span>` : ''}</button>`;
  return `<div class="shell">
    <aside class="sidebar" aria-label="主导航">
      <div class="brand">${mark}<span>云工作室</span></div>
      ${nav('home', '我的工作室', 'studio', S.studios.length || null)}
      ${nav('assets', '总资产', 'assets')}
      <div class="nav-group">最近的作品</div>
      ${S.pieces.slice(-4).reverse().map(p => `<button class="nav-item" onclick="openPiece('${p.id}')"><span class="mini-thumb">${stdView(p, 'front', '#ffffff')}</span><span>${esc(p.name)}</span><span class="count">${CAT[p.cat]}</span></button>`).join('') || '<p class="small muted" style="padding:0 10px">还没有作品</p>'}
      <div class="side-foot">${quotaBlock()}
        <div class="account"><span class="avatar">店</span><span>${esc(S.user.shop)}</span><span class="small muted">${S.user.isNew ? '新用户' : '示例账号'}</span></div>
        <button class="link" onclick="${S.user.isNew ? 'loadDemo()' : 'resetUser()'}">${S.user.isNew ? '载入示例账号' : '切换到新用户'}</button></div>
    </aside>
    <header class="topbar">
      <button class="icon-btn phone-only" aria-label="打开导航" onclick="document.body.classList.toggle('nav-open')">${icon('menu')}</button>
      <label class="search">${icon('search', 14)}<input placeholder="搜索作品、工作室、场景" aria-label="搜索"></label>
      <button class="btn agent-btn" onclick="Agent.toggle()">${icon('spark')}<span>助手</span></button>
    </header>
    <main class="sheet" id="sheet">${content}</main>
  </div>`;
}
function openPiece(id) {
  const st = S.studios.find(s => S.shots.some(x => x.studioId === s.id && x.pieceId === id));
  st ? go('studio', { id: st.id, pieceId: id }) : go('flow', { pieceId: id, step: 'pick' });
}
function render() {
  const screens = { home: Home, flow: Flow, studio: Studio, assets: Assets };
  $('#app').innerHTML = shell((screens[route.name] || Home)());
  document.body.classList.remove('nav-open');
  Agent.mount();
}
window.addEventListener('DOMContentLoaded', render);
