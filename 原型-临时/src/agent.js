// 外层 Agent（P1）：一句话调用工作流。原型里用关键词路由演示，正式版由模型做意图分类。
const Agent = {
  open: false, msgs: [{ who: 'a', html: '我可以帮你一句话新建或复用工作室，也可以针对某一张做调整。设定卡和保存工作室这两步，我会停下来请你确认。' }],
  toggle() { this.open = !this.open; this.mount(); if (this.open) setTimeout(() => $('#agent-in') && $('#agent-in').focus()); },
  say(html, who = 'a') { this.msgs.push({ who, html }); this.mount(); },
  mount() {
    let el = $('#agent'); if (!el) { el = document.createElement('aside'); el.id = 'agent'; el.setAttribute('aria-label', '助手'); document.body.appendChild(el); }
    el.className = this.open ? 'agent open' : 'agent'; document.body.classList.toggle('agent-on', this.open);
    if (!this.open) { el.innerHTML = ''; return; }
    const tips = ['帮这条项链建一间清冷风的工作室', '用上次那间工作室拍最新的作品', '第 3 张吊坠改小一点', '换成海边再拍一套', '这个场景的光暖一点'];
    el.innerHTML = `<header class="agent-head"><b>助手</b><span class="pill">P1</span><button class="icon-btn" aria-label="关闭助手" onclick="Agent.toggle()">${icon('close')}</button></header>
      <div class="agent-log" id="agent-log">${this.msgs.map(m => `<div class="msg ${m.who}">${m.html}</div>`).join('')}</div>
      <div class="agent-tips">${tips.map(t => `<button class="opt sm" onclick="Agent.run('${t}')">${t}</button>`).join('')}</div>
      <form class="agent-form" onsubmit="event.preventDefault();Agent.run($('#agent-in').value)"><input class="input" id="agent-in" placeholder="说一句你想做什么" autocomplete="off"><button class="btn primary">发送</button></form>
      <details class="adv small"><summary>高级：查看本次提示词</summary><p class="muted">${esc(this.prompt || '还没有调用工作流。')}</p></details>`;
    const log = $('#agent-log'); log.scrollTop = log.scrollHeight;
  },
  run(text) {
    text = (text || '').trim(); if (!text) return;
    this.say(esc(text), 'u'); if ($('#agent-in')) $('#agent-in').value = '';
    const latest = [...S.pieces].reverse().find(p => p.confirmed);
    if (/建/.test(text) && /工作室/.test(text)) return this.create(text, latest);
    if (/用.*(那间|工作室).*拍|复用/.test(text)) return this.reuse(text, latest);
    const n = text.match(/第\s*(\d)\s*张/);
    if (n) return this.fix(+n[1], text);
    if (/换成海边|海边再拍/.test(text)) return this.newScene('海边礁石');
    if (/场景|光/.test(text) && /暖|冷|亮/.test(text)) return this.tweakScene(text);
    this.say('这句我还没读懂。我能做：新建或复用工作室、针对某一张重拍、换场景再拍、调整当前场景。');
  },
  need(latest) { if (latest) return true; this.say(`先把作品的三张实拍放进来，我才能开始。<button class="btn sm-btn" onclick="go('flow',{step:'upload'})">去上传</button>`); return false; },
  create(text, pc) {
    if (!this.need(pc)) return;
    const mood = ['清冷', '温柔', '明亮', '复古'].find(m => text.includes(m)) || '清冷';
    const mat = /海边/.test(text) ? '海边礁石' : /木/.test(text) ? '旧木桌' : /石膏/.test(text) ? '石膏墙' : '亚麻布';
    F.answers = { mood, wear: '日常', light: '清晨窗光', material: mat }; F.other = {}; makeCard();
    this.prompt = `作品「${pc.name}」${CAT[pc.cat]}；气质=${mood}；材质=${mat}；保真：饰品像素与珠序不可改。`;
    const c = F.card;
    this.say(`给「${esc(pc.name)}」整理了设定卡，确认后我再生成场景：
      <div class="mini-card"><p><b>背景</b> ${esc(c.atmo)} · ${esc(c.tone)} · ${esc(c.material)} · ${esc(c.light)}</p><p><b>模特</b> ${esc(c.temper)} · ${esc(c.outfit)} · ${esc(c.pose)}</p></div>
      <div class="msg-act"><button class="btn primary" onclick="Agent.afterCard('${pc.id}')">就这样</button><button class="btn" onclick="go('flow',{pieceId:'${pc.id}',step:'card'});Agent.toggle()">在页面里改</button></div>`);
  },
  afterCard(pieceId) {
    if (!spend(4, 'Agent 生成场景')) return this.say('额度不够生成 4 张场景图。');
    const c = F.card;
    F.scene = { material: c.material, palette: SCENE_PALETTES[c.material], light: LIGHT_SHIFT[c.light], tone: c.tone, atmo: c.atmo, variant: 0, version: 1 };
    F.kept = [true, true, true, true];
    const rec = S.models.find(m => m.source === 'preset' && m.temper.includes(c.mood)); F.modelId = rec.id;
    F.name = c.material.replace('海边', '') + '·' + c.mood;
    this.say(`场景和模特准备好了。要保存为工作室吗？保存后场景和模特会写进总资产。
      <div class="mini-scenes">${ANGLES.map((a, i) => `<button class="mini-scene" aria-pressed="${F.kept[i]}" title="${a}" onclick="F.kept[${i}]=!F.kept[${i}];this.setAttribute('aria-pressed',F.kept[${i}])">${sceneSvg(F.scene, i)}</button>`).join('')}</div>
      <p class="small muted">点图可以去掉不要的机位 · 模特：${esc(rec.name)}（${esc(rec.desc)}）</p>
      <div class="msg-act"><button class="btn primary" onclick="Agent.save('${pieceId}')">保存工作室并拍一套</button><button class="btn" onclick="go('flow',{pieceId:'${pieceId}',step:'model'});Agent.toggle()">换模特</button></div>`);
  },
  save(pieceId) {
    if (!F.kept.some(Boolean)) F.kept[0] = true;
    const st = saveStudio(pieceId, { silent: true }); zs(st, pieceId);
    go('studio', { id: st.id, pieceId }); shoot(st.id);
    this.say(`已保存「${esc(st.name)}」并拍了一套。每张下面有珠序对照，看看哪张不像。`);
  },
  reuse(text, pc) {
    if (!this.need(pc)) return;
    if (!S.studios.length) return this.say('还没有工作室可以复用。要我按气质新建一间吗？');
    const st = S.studios.find(s => text.includes(s.name)) || S.studios[S.studios.length - 1];
    if (!byId(S.models, st.modelId)) return this.say(`「${esc(st.name)}」缺模特，先在工作室里补选一位。`);
    zs(st, pc.id); go('studio', { id: st.id, pieceId: pc.id }); shoot(st.id);
    this.say(`用「${esc(st.name)}」给「${esc(pc.name)}」拍了一套。`);
  },
  fix(n, text) {
    const st = route.name === 'studio' && byId(S.studios, route.id);
    if (!st) return this.say('先进入一间工作室，我才知道是哪一张。');
    const last = S.shots.filter(x => x.studioId === st.id && x.kind === 'ai').map(x => x.setId).pop();
    const x = S.shots.filter(s => s.setId === last && s.kind === 'ai')[n - 1];
    if (!x || x.failed) return this.say(`这一套没有可调整的第 ${n} 张。`);
    this.prompt = `定点重拍：第 ${n} 张；要求：${text}；保真：吊坠尺寸与实拍一致。`;
    retake(x.id, /小|大/.test(text) ? '大小' : '细节');
    this.say(`第 ${n} 张已按「${esc(text)}」重拍，原图保留为历史。吊坠尺寸仍按实拍，不会改小到和实物不符。`);
  },
  newScene(mat) {
    const st = route.name === 'studio' && byId(S.studios, route.id);
    if (!st) return this.say('先进入一间工作室，我再帮你换场景。');
    if (!spend(4, 'Agent 新场景')) return this.say('额度不够生成 4 张场景图。');
    const base = byId(S.scenes, st.sceneId);
    const sc = { id: uid('s'), name: '海边礁石 场景', material: mat, palette: SCENE_PALETTES[mat], light: base.light, tone: SCENE_PALETTES[mat].tone, atmo: '开阔透气', variant: 0, version: 1, kept: [1, 1, 1, 1], versions: [{ v: 1, at: new Date() }] };
    this._pending = sc;
    this.say(`生成了一个海边场景：<div class="mini-scenes">${[0, 1, 2, 3].map(i => `<span class="mini-scene">${sceneSvg(sc, i)}</span>`).join('')}</div>要不要存进总资产，并把「${esc(st.name)}」换成它再拍一套？
      <div class="msg-act"><button class="btn primary" onclick="Agent.useScene('${st.id}')">存进并再拍</button><button class="btn" onclick="Agent.say('好的，不存。')">不用了</button></div>`);
  },
  useScene(studioId) {
    const sc = this._pending; if (!sc) return; S.scenes.push(sc); this._pending = null;
    byId(S.studios, studioId).sceneId = sc.id; render(); shoot(studioId);
    this.say('已存进总资产、切换场景并拍了一套。之前的成片还在下面。');
  },
  tweakScene(text) {
    const st = route.name === 'studio' && byId(S.studios, route.id);
    if (!st) return this.say('先进入一间工作室。');
    const sc = byId(S.scenes, st.sceneId), n = studiosUsing('scene', sc.id).length;
    const light = /暖/.test(text) ? 'warm' : /冷/.test(text) ? 'cool' : 'soft';
    this.say(`把「${esc(sc.name)}」的光调成${light === 'warm' ? '暖光' : light === 'cool' ? '冷光' : '柔光'}，要存进这个场景吗？${n > 1 ? `<b>将影响 ${n} 间工作室。</b>` : ''}已有成片不变。
      <div class="msg-act"><button class="btn primary" onclick="Agent.applyTweak('${sc.id}','${light}')">存进场景</button><button class="btn" onclick="Agent.say('好的，不改。')">不改</button></div>`);
  },
  applyTweak(id, light) {
    const sc = byId(S.scenes, id); sc.light = light; sc.version++; sc.versions.push({ v: sc.version, at: new Date() });
    render(); this.say(`场景已更新到 v${sc.version}，用到它的工作室都会用新版本。`);
  },
};
