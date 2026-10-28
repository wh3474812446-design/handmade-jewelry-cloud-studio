// 首页「我的工作室」：这件新作品该进哪间？
function Home() {
  const unshot = S.pieces.filter(p => !S.shots.some(x => x.pieceId === p.id));
  const head = `<div class="title-row"><h1>我的工作室</h1><div class="actions">
    <button class="btn primary" onclick="go('flow',{step:'upload'})">${icon('plus')}上新一件作品</button></div></div>`;
  if (!S.studios.length) {
    return `<div class="page">${head}
      <p class="subline">还没有工作室。先放进一件作品的三张实拍，从它开始组建第一间。</p>
      <section class="first-run" aria-label="第一件作品">
        <div class="drop-row">${['front', 'side', 'back'].map(v => `
          <button class="drop" onclick="go('flow',{step:'upload'})"><span class="drop-guide">${guide(v)}</span>
          <span class="drop-label">${VIEW_LABEL[v]}实拍</span><span class="small muted">拖入或点击选择</span></button>`).join('')}
        </div>
        <div class="first-run-side">
          <h2 class="section-title">从一件作品到一套上架图</h2>
          <ol class="path">
            <li><b>三张实拍</b><span>正面、侧面、反面，再填主尺寸。系统只抠图、统一背景，饰品不改。</span></li>
            <li><b>聊气质</b><span>四个点选问题，得到一张设定卡：背景和模特。</span></li>
            <li><b>组建工作室</b><span>按气质生成 4 张场景，挑一位模特。以后调性相近的作品直接复用。</span></li>
            <li><b>拍一套</b><span>4 张试戴图 + 实物图 + 尺寸图，逐张核对珠序后下载。</span></li>
          </ol>
          <p class="small muted">${unshot.length ? `已上传 ${unshot.length} 件作品，还没拍。` : '实验期免费，每人 200 张生成额度。'}</p>
        </div>
      </section>
      ${sampleGallery()}
      <section class="howto" aria-label="实拍示例"><h2 class="section-title">这样拍就够了</h2>
        <p class="muted">桌面、窗边自然光，手机随手拍。整条饰品都在画面里，链扣和吊坠看得清。</p>
        <div class="howto-row">${['front', 'side', 'back'].map(v => `<figure>${rawPhoto(SAMPLE_PIECES[0], v)}<figcaption class="small muted">${VIEW_LABEL[v]}：${{ front: '平放，吊坠朝上', side: '立起来，看得到厚度', back: '翻面，拍到链扣' }[v]}</figcaption></figure>`).join('')}</div></section></div>`;
  }
  const rows = S.studios.map(st => {
    const sc = byId(S.scenes, st.sceneId), m = byId(S.models, st.modelId);
    const shots = S.shots.filter(x => x.studioId === st.id);
    const pieceIds = [...new Set(shots.map(x => x.pieceId))];
    const missing = !m;
    return `<article class="studio-row">
      <button class="studio-scenes" onclick="go('studio',{id:'${st.id}'})" aria-label="进入 ${esc(st.name)}">
        ${[0, 1, 2, 3].map(a => sceneSvg(sc, a)).join('')}</button>
      <div class="studio-meta">
        <h2 class="section-title"><a href="#" onclick="go('studio',{id:'${st.id}'});return false">${esc(st.name)}</a></h2>
        <p class="muted">${esc(sc.material)} · ${esc(sc.tone)} · ${esc(sc.atmo)}</p>
        <div class="who">${missing ? '<span class="pill neg">缺模特</span>' : `<span class="model-thumb">${modelPortrait(m)}</span><span>${esc(m.name)}</span><span class="muted small">${esc(m.source === 'self' ? '本人模特' : m.desc)}</span>`}</div>
      </div>
      <div class="studio-pieces">
        <span class="small muted">在这里拍过 ${pieceIds.length} 件 · ${shots.length} 张成片</span>
        <div class="piece-chips">${pieceIds.map(id => { const p = byId(S.pieces, id); return `<button class="piece-chip" onclick="go('studio',{id:'${st.id}',pieceId:'${id}'})" title="${esc(p.name)}">${stdView(p, 'front', '#fff')}<span>${esc(p.name)}</span></button>`; }).join('') || '<span class="small muted">还没拍过</span>'}</div>
      </div>
      <div class="studio-act"><button class="btn" onclick="go('studio',{id:'${st.id}'})">进入</button></div>
    </article>`;
  }).join('');
  const nPieces = S.pieces.length;
  return `<div class="page">${head}
    <p class="subline num">${S.studios.length} 间工作室 · ${nPieces} 件作品${unshot.length ? `，其中 <b>${unshot.map(p => esc(p.name)).join('、')}</b> 还没拍` : ''}</p>
    ${unshot.length ? `<div class="waiting">${unshot.map(p => `<div class="waiting-item"><span class="mini-thumb">${stdView(p, 'front', '#fff')}</span><span><b>${esc(p.name)}</b> <span class="muted">${CAT[p.cat]} · 已确认三视图</span></span><button class="btn primary" onclick="go('flow',{pieceId:'${p.id}',step:'pick'})">选工作室</button></div>`).join('')}</div>` : ''}
    <div class="studio-list">${rows}</div></div>`;
}
// 拖入槽里的拍摄引导：一个虚线的饰品轮廓
function guide(v) {
  const rx = v === 'side' ? 18 : 52;
  return svg(120, 90, `<path d="M${60 - rx} 20 Q 60 ${v === 'back' ? 70 : 82} ${60 + rx} 20" fill="none" stroke="#b3b5b8" stroke-width="1.5" stroke-dasharray="3 4"/>${v === 'back' ? '<rect x="55" y="16" width="10" height="6" rx="2" fill="none" stroke="#b3b5b8" stroke-dasharray="2 2"/>' : '<circle cx="60" cy="62" r="6" fill="none" stroke="#b3b5b8" stroke-dasharray="2 2"/>'}`);
}

// 成片示例：只做展示，不进总资产、不扣额度
const SAMPLES = [
  { key: 'necklace', piece: 0, studio: '亚麻窗边', material: '亚麻布', light: 'cool', model: 'm1', atmo: '利落安静' },
  { key: 'bracelet', piece: 2, studio: '旧木书桌', material: '旧木桌', light: 'warm', model: 'm3', atmo: '松弛自然' },
  { key: 'earring', piece: 3, studio: '海边清晨', material: '海边礁石', light: 'soft', model: 'm2', atmo: '开阔透气' },
];
let sampleKey = 'necklace';
function sampleGallery() {
  const smp = SAMPLES.find(x => x.key === sampleKey), pc = SAMPLE_PIECES[smp.piece];
  const sc = { material: smp.material, palette: SCENE_PALETTES[smp.material], light: smp.light, variant: 0 };
  const m = PRESET_MODELS.find(x => x.id === smp.model);
  const shots = [0, 1, 2, 3].map(a => ({ sceneSnap: sc, modelSnap: m, pieceSnap: pc, angle: a, ratio: '1:1', pendantScale: 1 }));
  return `<section class="samples" aria-label="成片示例">
    <div class="samples-head"><h2 class="section-title">成片示例</h2>
      <div class="seg" role="group" aria-label="示例品类">${SAMPLES.map(x => `<button aria-pressed="${x.key === sampleKey}" onclick="sampleKey='${x.key}';render()">${CAT[x.key]}</button>`).join('')}</div></div>
    <p class="muted">示例作品「${esc(pc.name)}」在「${esc(smp.studio)}」拍的一套：${esc(sc.palette.tone)} · ${esc(smp.atmo)} · 模特${esc(m.name)}。饰品和实拍逐颗一致。</p>
    <div class="contact sample-sheet">
      ${shots.map((x, i) => `<figure class="frame ai"><div class="shot">${aiShot(x)}<span class="ai-mark">AI 生成</span><span class="sample-mark">示例</span></div>
        <div class="bead-compare">${beadCompare(pc)}</div><figcaption><span class="small muted">试戴 ${i + 1} · ${ANGLES[i]}</span></figcaption></figure>`).join('')}
      <figure class="frame">${stdView(pc, 'front', '#fff')}<figcaption><span class="small muted">实物图 · 不经 AI</span></figcaption></figure>
      <figure class="frame">${sizeChart(pc)}<figcaption><span class="small muted">尺寸标注图</span></figcaption></figure>
    </div></section>`;
}
