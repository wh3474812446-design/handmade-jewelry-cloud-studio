// 新建工作室的后半段
function StepAsk(pc) {
  const done = QUESTIONS.filter(q => F.answers[q.id]).length;
  return `<div class="step">
    <h2 class="step-title">「${esc(pc.name)}」是什么气质？</h2>
    <p class="muted">${QUESTIONS.length} 个问题，点选就行。也可以放一张店铺参考图帮助理解（选填）。</p>
    <div class="qa">${QUESTIONS.map(q => `<fieldset class="q"><legend>${q.q}</legend><div class="opts">
      ${q.opts.map(o => `<button class="opt" aria-pressed="${F.answers[q.id] === o}" onclick="F.answers['${q.id}']='${o}';render()">${o}</button>`).join('')}
      <button class="opt" aria-pressed="${F.answers[q.id] === '其他'}" onclick="F.answers['${q.id}']='其他';render()">其他</button>
      ${F.answers[q.id] === '其他' ? `<input class="input other" placeholder="说说你的想法" value="${esc(F.other[q.id] || '')}" oninput="F.other['${q.id}']=this.value">` : ''}
    </div></fieldset>`).join('')}</div>
    <div class="ref-row"><span class="small muted">店铺参考（选填）</span>
      ${S.refs.length ? S.refs.map(r => `<span class="pill">${esc(r.name)}</span>`).join('') : ''}
      <button class="btn ghost" onclick="addRef()">${icon('plus', 14)}上传参考图</button></div>
    <div class="step-foot"><span class="small muted num">已答 ${done} / ${QUESTIONS.length}</span>
      <button class="btn primary" ${done < QUESTIONS.length ? 'disabled' : ''} onclick="makeCard();go('flow',{pieceId:'${pc.id}',step:'card'})">生成设定卡</button></div>
  </div>`;
}
function addRef() { S.refs.push({ id: uid('r'), name: '店铺首页截图 ' + (S.refs.length + 1) }); toast('参考图已存进总资产，只用于理解气质'); render(); }
function pickAns(id, fallback) { const a = F.answers[id]; return a === '其他' ? (F.other[id] || fallback) : a; }
function makeCard() {
  const mood = pickAns('mood', '清冷'), mat = pickAns('material', '亚麻布'), light = pickAns('light', '清晨窗光');
  const mm = MOOD_MODEL[mood] || MOOD_MODEL['清冷'];
  const pal = SCENE_PALETTES[mat] || SCENE_PALETTES['亚麻布'];
  F.card = {
    atmo: (WEAR_ATMO[pickAns('wear', '日常')] || '松弛自然'), tone: pal.tone, material: SCENE_PALETTES[mat] ? mat : '亚麻布', light,
    temper: mm.temper, outfit: mm.outfit, pose: mm.pose, mood,
  };
}
function StepCard(pc) {
  const c = F.card;
  const row = (k, label, opts) => `<div class="kv"><span class="muted">${label}</span>
    <select class="kv-select" onchange="F.card['${k}']=this.value" aria-label="${label}">${[...new Set([c[k], ...opts])].map(o => `<option ${o === c[k] ? 'selected' : ''}>${o}</option>`).join('')}</select></div>`;
  return `<div class="step">
    <h2 class="step-title">设定卡</h2>
    <p class="muted">按你的回答整理出来的。哪一项不对就直接改，没问题就点「就这样」。</p>
    <div class="setcard">
      <section><h3 class="section-title">背景</h3>
        ${row('atmo', '氛围', ['利落安静', '柔和亲近', '开阔透气', '松弛自然'])}
        ${row('tone', '色调', Object.values(SCENE_PALETTES).map(p => p.tone))}
        ${row('material', '材质', Object.keys(SCENE_PALETTES))}
        ${row('light', '光线', Object.keys(LIGHT_SHIFT))}</section>
      <section><h3 class="section-title">模特</h3>
        ${row('temper', '气质', Object.values(MOOD_MODEL).map(m => m.temper))}
        ${row('outfit', '穿搭', Object.values(MOOD_MODEL).map(m => m.outfit))}
        ${row('pose', '动作', Object.values(MOOD_MODEL).map(m => m.pose))}</section>
    </div>
    <div class="step-foot"><button class="btn" onclick="go('flow',{pieceId:'${pc.id}',step:'ask'})">重新回答</button>
      <button class="btn primary" onclick="genScene('${pc.id}')">就这样，生成场景 · 4 张</button></div>
  </div>`;
}
function genScene(pieceId, regen) {
  if (!spend(4, regen ? '重新生成场景' : '生成场景')) return toast('额度不够生成 4 张场景图');
  const c = F.card;
  F.scene = { id: null, material: c.material, palette: SCENE_PALETTES[c.material], light: LIGHT_SHIFT[c.light], tone: c.tone, atmo: c.atmo, variant: regen ? ((F.scene && F.scene.variant) || 0) + 1 : 0, version: 1 };
  F.kept = [true, true, true, true];
  go('flow', { pieceId, step: 'scenes' });
}
function StepScenes(pc) {
  const sc = F.scene, keptN = F.kept.filter(Boolean).length;
  return `<div class="step">
    <h2 class="step-title">场景：${esc(sc.material)} · ${esc(sc.atmo)}</h2>
    <p class="muted">同一个场景的四个机位。拍摄时会轮流用到它们。不想要的可以去掉，至少留 1 张。</p>
    <div class="scene-grid">${ANGLES.map((a, i) => `<figure class="scene-cell ${F.kept[i] ? '' : 'off'}">${sceneSvg(sc, i)}
      <figcaption><span>${a}</span><button class="link" ${keptN === 1 && F.kept[i] ? 'disabled' : ''} onclick="F.kept[${i}]=!F.kept[${i}];render()">${F.kept[i] ? '去掉' : '留下'}</button></figcaption></figure>`).join('')}</div>
    <div class="step-foot"><button class="btn" onclick="genScene('${pc.id}',true)">重新生成 · 4 张</button>
      <button class="btn primary" onclick="go('flow',{pieceId:'${pc.id}',step:'model'})">保留 ${keptN} 张，下一步选模特</button></div>
  </div>`;
}
function StepModel(pc) {
  const mood = F.card.mood;
  const rec = S.models.filter(m => m.source === 'preset' && m.temper.includes(mood)).slice(0, 3);
  const others = S.models.filter(m => !rec.includes(m) && (m.source !== 'self' || true));
  const tile = m => `<button class="model-tile" aria-pressed="${F.modelId === m.id}" onclick="F.modelId='${m.id}';render()">${modelPortrait(m)}<span><b>${esc(m.name)}</b> <span class="small muted">${esc(m.source === 'self' ? '本人模特 · 仅你可见' : m.source === 'chat' ? '对话生成' : m.desc)}</span></span></button>`;
  return `<div class="step">
    <h2 class="step-title">选一位模特</h2>
    <p class="muted">按设定卡「${esc(F.card.temper)}」推荐。也可以浏览全部、用一句话生成，或者用你自己的照片。</p>
    <h3 class="section-title" style="margin-top:20px">推荐</h3><div class="model-grid">${rec.map(tile).join('')}</div>
    <h3 class="section-title" style="margin-top:24px">其他模特 <span class="muted small num">${others.length}</span></h3><div class="model-grid">${others.map(tile).join('')}</div>
    <div class="model-make">
      <label class="field"><span>描述一位新模特</span><span class="joined"><input class="input" id="model-desc" placeholder="比如：短发、颈线修长、穿浅灰针织"><button class="btn" onclick="chatModel()">生成 · 1 张</button></span></label>
      <button class="btn" onclick="selfModelDialog()">用我自己的照片</button>
    </div>
    <div class="step-foot"><span class="small muted">${F.modelId ? '已选 ' + esc(byId(S.models, F.modelId).name) : '还没选模特'}</span>
      <button class="btn primary" ${F.modelId ? '' : 'disabled'} onclick="go('flow',{pieceId:'${pc.id}',step:'build'})">下一步</button></div>
  </div>`;
}
function chatModel() {
  const d = ($('#model-desc').value || '').trim();
  if (!d) return toast('先写一句描述');
  if (!spend(1, '生成模特')) return toast('额度不够');
  const base = PRESET_MODELS[(S.seq) % PRESET_MODELS.length];
  const m = { ...base, id: uid('m'), name: '新模特 ' + (S.models.filter(x => x.source === 'chat').length + 1), desc: d, source: 'chat', temper: [F.card ? F.card.mood : '清冷'] };
  S.models.push(m); F.modelId = m.id; toast('已生成并存进总资产'); render();
}
function StepBuild(pc) {
  const sc = F.scene, m = byId(S.models, F.modelId);
  if (!F.name) F.name = sc.material.replace('海边', '') + (sc.light === 'warm' ? '暖光' : sc.light === 'cool' ? '晨光' : '柔光');
  return `<div class="step">
    <h2 class="step-title">组建工作室</h2>
    <p class="muted">场景和模特都会存进总资产。以后调性相近的作品，可以直接进这间拍。</p>
    <div class="build-preview">
      <div class="scene-strip">${ANGLES.map((a, i) => F.kept[i] ? sceneSvg(sc, i) : '').join('')}</div>
      <div class="build-model">${modelPortrait(m)}<span><b>${esc(m.name)}</b><span class="small muted">${esc(F.card.outfit)} · ${esc(F.card.pose)}</span></span></div>
    </div>
    <label class="field" style="max-width:320px;margin-top:20px"><span>工作室名字</span><input class="input" value="${esc(F.name)}" oninput="F.name=this.value"></label>
    <div class="step-foot"><button class="btn" onclick="go('flow',{pieceId:'${pc.id}',step:'model'})">换模特</button>
      <button class="btn primary" onclick="saveStudio('${pc.id}')">保存工作室，开始拍</button></div>
  </div>`;
}
function saveStudio(pieceId, opts = {}) {
  const sc = { ...F.scene, id: uid('s'), name: (F.name || F.scene.material) + ' 场景', kept: F.kept.slice(), versions: [{ v: 1, at: new Date() }] };
  S.scenes.push(sc);
  const st = { id: uid('w'), name: F.name || (F.scene.material.replace('海边', '') + '·' + (F.card ? F.card.mood : '')), sceneId: sc.id, modelId: F.modelId, card: { ...F.card }, createdAt: new Date() };
  S.studios.push(st);
  if (!opts.silent) { go('studio', { id: st.id, pieceId }); toast('工作室已保存'); }
  return st;
}
