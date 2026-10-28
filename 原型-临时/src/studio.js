// 工作室：这一套能不能直接上架？
const Z = {}; // 每间工作室的拍摄设置
const REASONS = ['形状', '颜色', '大小', '细节'];
function zs(st, pieceId) {
  const z = Z[st.id] || (Z[st.id] = { pieceId: null, ratio: '1:1', ai: 4, real: true, size: true, realSrc: 'std', comp: null, face: null });
  if (pieceId) z.pieceId = pieceId;
  if (!z.pieceId || !byId(S.pieces, z.pieceId)) { const last = S.shots.filter(x => x.studioId === st.id).pop(); z.pieceId = last ? last.pieceId : (S.pieces[S.pieces.length - 1] || {}).id; }
  const pc = byId(S.pieces, z.pieceId);
  if (pc && (!z.comp || z.cat !== pc.cat)) { z.comp = DEFAULT_COMP[pc.cat].comp; z.face = DEFAULT_COMP[pc.cat].face; z.cat = pc.cat; }
  return z;
}
function Studio() {
  const st = byId(S.studios, route.id); if (!st) return Home();
  const z = zs(st, route.pieceId); route.pieceId = null;
  const pc = byId(S.pieces, z.pieceId), sc = byId(S.scenes, st.sceneId), m = byId(S.models, st.modelId);
  const sets = [...new Set(S.shots.filter(x => x.studioId === st.id && x.pieceId === pc.id).map(x => x.setId))].reverse();
  const cost = z.ai, canShoot = m && cost <= left();
  const sharing = studiosUsing('scene', sc.id).length;
  const seg = (k, opts) => `<div class="seg" role="group">${opts.map(o => `<button aria-pressed="${z[k] === o}" onclick="Z['${st.id}'].${k}='${o}';render()">${o}</button>`).join('')}</div>`;
  return `<div class="page studio-page">
    <nav class="crumb small"><a href="#" onclick="go('home');return false">${icon('back', 14)}我的工作室</a></nav>
    <div class="title-row"><h1>${esc(st.name)}</h1>
      <span class="studio-id"><span class="id-thumb">${sceneSvg(sc, 0)}</span><span>${esc(sc.name)}</span><span class="id-plus">+</span>${m ? `<span class="id-thumb round">${modelPortrait(m)}</span><span>${esc(m.name)}</span>` : '<span class="pill neg">缺模特</span>'}</span>
      <div class="actions"><button class="btn" onclick="switchPop(event,'scene','${st.id}')">${icon('swap', 14)}切换场景</button>
        <button class="btn" onclick="switchPop(event,'model','${st.id}')">${icon('swap', 14)}切换模特</button></div></div>
    <p class="subline small">场景 v${sc.version} ${sharing > 1 ? `· 被 ${sharing} 间工作室共用` : ''} · ${esc(sc.atmo)}、${esc(sc.tone)}</p>
    <div class="studio-grid">
      <aside class="shoot-panel">
        <div class="field"><span>这次拍</span><div class="piece-pick">${S.pieces.filter(p => p.confirmed !== false).map(p => `<button class="piece-chip" aria-pressed="${p.id === pc.id}" onclick="Z['${st.id}'].pieceId='${p.id}';render()">${stdView(p, 'front', '#fff')}<span>${esc(p.name)}</span></button>`).join('')}</div></div>
        <div class="field"><span>构图 <span class="small muted">默认${DEFAULT_COMP[pc.cat].label}</span></span>${seg('comp', ['局部特写', '半身', '全身'])}</div>
        <div class="field"><span>露脸</span>${seg('face', ['不露脸', '侧脸', '露脸'])}</div>
        <div class="field"><span>画幅</span>${seg('ratio', ['1:1', '3:4'])}</div>
        <div class="field"><span>AI 试戴图</span><div class="stepper"><button class="icon-btn" aria-label="少一张" onclick="Z['${st.id}'].ai=Math.max(1,Z['${st.id}'].ai-1);render()">−</button><b class="num">${z.ai} 张</b><button class="icon-btn" aria-label="多一张" onclick="Z['${st.id}'].ai=Math.min(8,Z['${st.id}'].ai+1);render()">+</button></div></div>
        <div class="field"><span>附带</span>
          <label class="check"><input type="checkbox" ${z.real ? 'checked' : ''} onchange="Z['${st.id}'].real=this.checked;render()"><span>实物图 <span class="small muted">不经 AI</span></span></label>
          ${z.real ? `<div class="seg sub">${[['std', '三视图正面'], ['raw', '原始照片']].map(([k, l]) => `<button aria-pressed="${z.realSrc === k}" onclick="Z['${st.id}'].realSrc='${k}';render()">${l}</button>`).join('')}</div>` : ''}
          <label class="check"><input type="checkbox" ${z.size ? 'checked' : ''} onchange="Z['${st.id}'].size=this.checked;render()"><span>尺寸标注图</span></label></div>
        <button class="btn primary lg shoot-btn" ${canShoot ? '' : 'disabled'} onclick="shoot('${st.id}')">拍一套 · 消耗 ${cost} 张</button>
        <p class="small muted">${!m ? '这间工作室缺模特，先切换一位' : cost > left() ? `额度只剩 ${left()} 张` : `拍完剩 ${left() - cost} 张额度`}</p>
      </aside>
      <div class="shoot-bar"><span class="small num">剩 ${left()} 张额度</span><button class="btn primary" ${canShoot ? '' : 'disabled'} onclick="shoot('${st.id}')">拍一套 · ${cost} 张</button></div>
      <section class="sets">${sets.length ? sets.map((sid, i) => setBlock(st, sid, i === 0)).join('') : `
        <div class="set-empty"><div class="ghost-sheet">${Array.from({ length: z.ai + (z.real ? 1 : 0) + (z.size ? 1 : 0) }, () => '<i></i>').join('')}</div>
        <p><b>「${esc(pc.name)}」还没在这间拍过。</b></p><p class="muted">一套 = ${z.ai} 张 AI 试戴图${z.real ? ' + 实物图' : ''}${z.size ? ' + 尺寸标注图' : ''}。每张试戴图下面有珠序对照，你可以逐张核对。</p></div>`}</section>
    </div></div>`;
}
let setCounter = 0;
function shoot(studioId) {
  const st = byId(S.studios, studioId), z = zs(st), sc = byId(S.scenes, st.sceneId), m = byId(S.models, st.modelId);
  const setId = 'set' + (++setCounter), first = setCounter === 1, keptAngles = (sc.kept || [1, 1, 1, 1]).map((k, i) => k ? i : -1).filter(i => i >= 0);
  let charged = 0;
  for (let i = 0; i < z.ai; i++) {
    // 演示：第一套里第 3 张吊坠被画大（等用户发现），第 4 张生成超时（不扣额度）
    const failed = first && i === 3;
    if (!failed) charged++;
    S.shots.push({ id: uid('x'), setId, studioId, pieceId: z.pieceId, sceneId: sc.id, sceneVersion: sc.version, sceneSnap: { ...sc }, modelId: m.id, modelSnap: { ...m }, kind: 'ai', angle: keptAngles[i % keptAngles.length], ratio: z.ratio, comp: z.comp, face: z.face, pendantScale: first && i === 2 ? 1.5 : 1, failed, verdict: null, retakes: 0, history: [], at: new Date() });
  }
  if (z.real) S.shots.push({ id: uid('x'), setId, studioId, pieceId: z.pieceId, kind: 'real', src: z.realSrc, at: new Date() });
  if (z.size) S.shots.push({ id: uid('x'), setId, studioId, pieceId: z.pieceId, kind: 'size', at: new Date() });
  spend(charged, '拍摄');
  render(); toast(`拍好了：${charged} 张试戴图${first ? '，1 张超时未扣额度' : ''}`);
}
function setBlock(st, sid, latest) {
  const shots = S.shots.filter(x => x.setId === sid), a = shots[0], pc = byId(S.pieces, a.pieceId);
  const ai = shots.filter(x => x.kind === 'ai'), likes = ai.filter(x => x.verdict === 'like').length;
  const m = byId(S.models, a.modelId), sc = byId(S.scenes, a.sceneId);
  return `<article class="set ${latest ? '' : 'older'}">
    <header class="set-head"><h2 class="section-title">${latest ? '这一套' : '更早的一套'}</h2>
      <span class="small muted">${a.at.toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })} · 场景 v${a.sceneVersion || 1} · ${m ? esc(m.name) : esc(a.modelName || '已删除的模特')} · ${esc(pc.name)}</span>
      <span class="set-like small num">像 <b>${likes}</b> / ${ai.filter(x => !x.failed).length}</span>
      <button class="btn" onclick="exportDialog('${sid}')">${icon('down', 14)}打包下载</button></header>
    <div class="contact ${a.ratio === '3:4' ? 'tall' : ''}">${shots.map((x, i) => frame(x, pc, i)).join('')}</div></article>`;
}
function frame(x, pc, i) {
  if (x.kind === 'real') return `<figure class="frame">${x.src === 'raw' ? rawPhoto(pc, 'front') : stdView(pc, 'front', '#fff')}<figcaption><span class="small">实物图 · ${x.src === 'raw' ? '原始照片' : '三视图正面'}</span><button class="link" onclick="toast('已下载 ${esc(pc.name)}-实物图.jpg')">下载</button></figcaption></figure>`;
  if (x.kind === 'size') return `<figure class="frame">${sizeChart(pc)}<figcaption><span class="small">尺寸标注图</span><button class="link" onclick="toast('已下载 ${esc(pc.name)}-尺寸图.jpg')">下载</button></figcaption></figure>`;
  if (x.failed) return `<figure class="frame failed"><div class="fail-box"><p><b>这张没拍成</b></p><p class="small muted">生成超时，没有扣额度</p><button class="btn" onclick="retryFail('${x.id}')">重试 · 1 张</button></div><figcaption><span class="small muted">试戴 ${i + 1}</span></figcaption></figure>`;
  const off = x.pendantScale !== 1;
  return `<figure class="frame ai ${x.verdict === 'dislike' ? 'bad' : ''}">
    <div class="shot">${aiShot(x)}<span class="ai-mark">AI 生成</span></div>
    <div class="bead-compare">${beadCompare(pc, x.pendantScale)}${off ? '<span class="diff-note small">吊坠和实拍大小不一致</span>' : '<span class="small muted">珠序、吊坠与实拍一致</span>'}</div>
    <figcaption><span class="small muted">试戴 ${i + 1}${x.retakes ? ` · 重拍 ${x.retakes} 次` : ''}</span>
      <span class="verdict"><button class="vbtn" aria-pressed="${x.verdict === 'like'}" onclick="verdict('${x.id}','like')">像</button><button class="vbtn" aria-pressed="${x.verdict === 'dislike'}" onclick="verdict('${x.id}','dislike')">不像</button></span></figcaption>
    ${x.verdict === 'dislike' && !x.followup ? `<div class="ask pop-ask" role="dialog" aria-label="哪里不像"><span class="small">哪里不像？</span><div class="opts">${REASONS.map(r => `<button class="opt sm" onclick="retake('${x.id}','${r}')">${r}</button>`).join('')}</div></div>` : ''}
    ${x.followup ? `<p class="small notice">这件暂时拍不好，已记录给运营人工跟进。</p>` : ''}
    ${x.history.length ? `<p class="small muted">保留了 ${x.history.length} 张历史</p>` : ''}
  </figure>`;
}
function verdict(id, v) {
  const x = byId(S.shots, id); x.verdict = x.verdict === v ? null : v;
  S.feedback = (S.feedback || []).concat({ shotId: id, cat: byId(S.pieces, x.pieceId).cat, v: x.verdict, at: new Date() });
  render();
}
function retake(id, reason) {
  const x = byId(S.shots, id);
  if (x.retakes >= RETAKE_LIMIT) { x.followup = true; S.followups.push({ shotId: id, pieceId: x.pieceId, reasons: (x.reasons || []).concat(reason), at: new Date() }); return render(); }
  if (!spend(1, '单张重拍')) return toast('额度不够重拍');
  x.history.push({ pendantScale: x.pendantScale, at: x.at, reason });
  x.reasons = (x.reasons || []).concat(reason);
  x.pendantScale = 1; x.retakes++; x.verdict = null; x.at = new Date();
  render(); toast(`按「${reason}」重拍了这张，原图保留为历史`);
}
function retryFail(id) { const x = byId(S.shots, id); if (!spend(1, '重试')) return toast('额度不够'); x.failed = false; render(); toast('重试成功'); }
