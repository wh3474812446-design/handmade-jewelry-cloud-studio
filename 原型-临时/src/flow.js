// 上新：上传 → 三视图 → 复用 / 新建 →（气质 → 设定卡 → 场景 → 模特 → 组建）
const F = { draft: null, answers: {}, other: {}, card: null, scene: null, kept: [true, true, true, true], modelId: null, name: '' };
const STEPS_NEW = [['upload', '三张实拍与尺寸'], ['views', '确认标准三视图'], ['pick', '选工作室'], ['ask', '聊作品气质'], ['card', '确认设定卡'], ['scenes', '生成场景'], ['model', '选模特'], ['build', '组建工作室']];

function Flow() {
  const step = route.step || 'upload';
  const pc = route.pieceId ? byId(S.pieces, route.pieceId) : F.draft;
  const idx = STEPS_NEW.findIndex(s => s[0] === step);
  const steps = STEPS_NEW.map(([k, label], i) => `<li class="${i < idx ? 'done' : i === idx ? 'now' : ''}" ${i === idx ? 'aria-current="step"' : ''}><button class="step-jump" ${pc && pc.id ? '' : 'disabled'} onclick="jumpStep('${pc && pc.id}','${k}')">${i < idx ? icon('check', 14) : '<i></i>'}<span>${label}</span></button></li>`).join('');
  const body = { upload: StepUpload, views: StepViews, pick: StepPick, ask: StepAsk, card: StepCard, scenes: StepScenes, model: StepModel, build: StepBuild }[step](pc);
  return `<div class="builder">
    <div class="builder-bar"><button class="icon-btn" aria-label="返回我的工作室" onclick="go('home')">${icon('back')}</button>
      <h1>${pc && pc.name ? esc(pc.name) : '上新一件作品'}</h1>${pc && pc.cat ? `<span class="pill">${CAT[pc.cat]}</span>` : ''}</div>
    <div class="builder-body">
      <aside class="builder-side">
        ${pc && pc.id ? `<div class="side-piece">${stdView(pc, 'front', '#fff')}<div><b>${esc(pc.name)}</b><p class="small muted mono">${SIZE_FIELDS[pc.cat][0][0]} ${pc.sizes[0]} cm</p></div></div>` : ''}
        <ol class="steps">${steps}</ol>${pc && pc.id ? '<p class="small muted">原型演示：可点任一步骤直接查看</p>' : ''}
      </aside>
      <section class="canvas">${body}</section>
    </div></div>`;
}

// 上传：先选品类，再放三张实拍（原型里点击即放入示例照片）
function StepUpload() {
  const d = F.draft || (F.draft = { cat: null, shots: {}, sizes: ['', ''], name: '' });
  const sample = d.cat ? nextSample(d.cat) : null;
  const filled = ['front', 'side', 'back'].filter(v => d.shots[v]).length;
  const fields = d.cat ? SIZE_FIELDS[d.cat] : [];
  const missing = [];
  if (!d.cat) missing.push('品类');
  ['front', 'side', 'back'].forEach(v => { if (!d.shots[v]) missing.push(VIEW_LABEL[v] + '实拍'); });
  if (d.cat && !d.sizes[0]) missing.push(fields[0][0]);
  return `<div class="step">
    <h2 class="step-title">放进三张实拍</h2>
    <p class="muted">饰品只从这三张照片里来。手机随手拍就行，系统会抠图、统一背景。</p>
    <div class="field" style="margin-top:20px"><span>品类</span><div class="seg" role="group" aria-label="品类">
      ${Object.entries(CAT).map(([k, v]) => `<button aria-pressed="${d.cat === k}" onclick="F.draft.cat='${k}';F.draft.shots={};F.draft.sizes=['',''];render()">${v}</button>`).join('')}</div></div>
    <div class="drop-row" style="margin-top:20px">${['front', 'side', 'back'].map(v => d.shots[v] ? `
      <figure class="drop filled">${rawPhoto(sample, v)}<figcaption><span>${VIEW_LABEL[v]} · IMG_${2201 + ['front', 'side', 'back'].indexOf(v)}.jpg</span><button class="link" onclick="delete F.draft.shots['${v}'];render()">换一张</button></figcaption></figure>` : `
      <button class="drop" ${d.cat ? '' : 'disabled'} onclick="F.draft.shots['${v}']=1;render()"><span class="drop-guide">${guide(v)}</span><span class="drop-label">${VIEW_LABEL[v]}实拍</span><span class="small muted">${d.cat ? '拖入或点击选择' : '先选品类'}</span></button>`).join('')}</div>
    <p class="small muted" style="margin-top:8px">JPG / PNG / HEIC / WebP，短边不小于 1000 px，单张不超过 20 MB</p>
    ${d.cat ? `<div class="size-row">
      ${fields.map(([label, req], i) => `<label class="field"><span>${label}${req ? '' : ' <span class="muted small">选填</span>'}</span>
        <span class="input-unit"><input class="input mono" inputmode="decimal" value="${esc(d.sizes[i])}" oninput="F.draft.sizes[${i}]=this.value;refreshUploadHint()" placeholder="${req ? '必填' : ''}"><i>cm</i></span></label>`).join('')}
      <figure class="tape">${svg(160, 70, `<rect x="6" y="26" width="148" height="18" rx="3" fill="#f1e7c7" stroke="#c9b26a"/>${Array.from({ length: 15 }, (_, i) => `<path d="M${12 + i * 10} 26 v${i % 5 ? 6 : 10}" stroke="#8a7a3d"/>`).join('')}<circle cx="40" cy="35" r="14" fill="none" stroke="#9aa0a6" stroke-dasharray="3 3"/>`)}<figcaption class="small muted">软尺贴着饰品量，${fields[0][0]}量整条展开长度</figcaption></figure>
    </div>` : ''}
    <div class="step-foot"><span id="upload-hint" class="small ${missing.length ? 'muted' : ''}">${missing.length ? '还缺：' + missing.join('、') : `已齐：3 张实拍 · ${fields[0] ? fields[0][0] : ''} ${esc(d.sizes[0])} cm`}</span>
      <button class="btn primary" ${missing.length ? 'disabled' : ''} onclick="submitUpload()">整理三视图</button></div>
  </div>`;
}
function refreshUploadHint() { const pos = document.activeElement && document.activeElement.selectionStart; const i = [...document.querySelectorAll('.size-row input')].indexOf(document.activeElement); render(); if (i >= 0) { const el = document.querySelectorAll('.size-row input')[i]; el.focus(); el.setSelectionRange(pos, pos); } }
function nextSample(cat) {
  const used = S.pieces.map(p => p.name);
  return SAMPLE_PIECES.find(p => p.cat === cat && !used.includes(p.name)) || SAMPLE_PIECES.find(p => p.cat === cat);
}
function submitUpload() {
  const d = F.draft, sample = nextSample(d.cat);
  const pc = { ...sample, id: uid('p'), sizes: [d.sizes[0], d.sizes[1] || sample.sizes[1]], confirmed: false, createdAt: new Date() };
  S.pieces.push(pc); F.draft = null;
  go('flow', { pieceId: pc.id, step: 'views' });
}
function StepViews(pc) {
  return `<div class="step">
    <h2 class="step-title">这是整理好的标准三视图</h2>
    <p class="muted">只做了抠图和统一背景。左边是你的实拍，右边是整理结果，饰品本身一个像素都没动。</p>
    <div class="views-compare">${['front', 'side', 'back'].map(v => `<div class="vc"><figure>${rawPhoto(pc, v)}<figcaption class="small muted">${VIEW_LABEL[v]}实拍</figcaption></figure><span class="vc-arrow">→</span><figure>${stdView(pc, v)}<figcaption class="small">${VIEW_LABEL[v]}</figcaption></figure></div>`).join('')}</div>
    <div class="bead-check"><span class="small muted">珠序</span>${beadStrip(pc)}<span class="small">${pc.beads.length} 颗珠子 + 吊坠，三视图与实拍一致</span></div>
    <label class="field" style="max-width:320px;margin-top:20px"><span>给作品起个名字</span><input class="input" value="${esc(pc.name)}" oninput="byId(S.pieces,'${pc.id}').name=this.value"></label>
    <div class="step-foot"><button class="btn" onclick="toast('已重新整理边缘（示例）')">边缘不理想，重新整理</button>
      <button class="btn primary" onclick="byId(S.pieces,'${pc.id}').confirmed=true;go('flow',{pieceId:'${pc.id}',step:'pick'})">确认，存进总资产</button></div>
  </div>`;
}
function StepPick(pc) {
  const list = S.studios.map(st => {
    const sc = byId(S.scenes, st.sceneId), m = byId(S.models, st.modelId);
    const shotNames = [...new Set(S.shots.filter(x => x.studioId === st.id).map(x => byId(S.pieces, x.pieceId).name))];
    return `<button class="pick-studio" onclick="reuseStudio('${pc.id}','${st.id}')">
      <span class="pick-scene">${sceneSvg(sc, 0)}</span>
      <span class="pick-meta"><b>${esc(st.name)}</b><span class="small muted">${esc(sc.material)} · ${m ? esc(m.name) : '缺模特'} · 拍过 ${shotNames.length ? shotNames.map(esc).join('、') : '—'}</span></span>
      <span class="btn">用它拍</span></button>`;
  }).join('');
  return `<div class="step">
    <h2 class="step-title">「${esc(pc.name)}」进哪间工作室？</h2>
    <p class="muted">调性和已有工作室相近就复用，直接拍；风格不同就新建一间。</p>
    <div class="pick-grid">
      <section class="pick-col"><h3 class="section-title">复用已有工作室</h3>
        ${list || '<p class="empty-line">还没有工作室。第一件作品先新建一间。</p>'}</section>
      <section class="pick-col new"><h3 class="section-title">新建一间</h3>
        <p class="muted">四个点选问题读懂它的气质，再按气质生成场景、挑模特。</p>
        <button class="btn primary lg" onclick="startNew('${pc.id}')">按气质新建</button>
        <p class="small muted">新建会生成 4 张场景图，消耗 4 张额度</p></section>
    </div>
    <div class="reason"><span class="small muted">选这条路的原因（选填，帮我们改进）</span>
      <div class="seg">${['调性相近', '风格不同', '其他'].map(r => `<button aria-pressed="${F.reason === r}" onclick="F.reason='${r}';render()">${r}</button>`).join('')}</div></div>
  </div>`;
}
function reuseStudio(pieceId, studioId) {
  S.matchLog = (S.matchLog || []).concat({ pieceId, path: '复用', reason: F.reason || null });
  go('studio', { id: studioId, pieceId });
  toast('已选中这间工作室，本次拍「' + byId(S.pieces, pieceId).name + '」');
}
function startNew(pieceId) {
  S.matchLog = (S.matchLog || []).concat({ pieceId, path: '新建', reason: F.reason || null });
  Object.assign(F, { answers: {}, other: {}, card: null, scene: null, kept: [true, true, true, true], modelId: null, name: '' });
  go('flow', { pieceId, step: 'ask' });
}

// 原型演示：跳到任一步，缺的前置数据用默认值补齐（不扣额度）
function jumpStep(pieceId, step) {
  const order = STEPS_NEW.map(s => s[0]), at = order.indexOf(step);
  if (step === 'upload') { F.draft = null; return go('flow', { step: 'upload' }); }
  if (at >= order.indexOf('card') && !F.card) { QUESTIONS.forEach(q => { F.answers[q.id] = F.answers[q.id] || q.opts[0]; }); makeCard(); }
  if (at >= order.indexOf('scenes') && !F.scene) { const c = F.card; F.scene = { material: c.material, palette: SCENE_PALETTES[c.material], light: LIGHT_SHIFT[c.light], tone: c.tone, atmo: c.atmo, variant: 0, version: 1 }; F.kept = [true, true, true, true]; }
  if (at >= order.indexOf('build') && !F.modelId) F.modelId = 'm1';
  go('flow', { pieceId, step });
}
