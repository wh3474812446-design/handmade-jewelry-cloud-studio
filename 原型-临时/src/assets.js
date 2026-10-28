// 总资产：我有哪些素材、被谁在用？
const TABS = [['scene', '场景'], ['model', '我的模特'], ['piece', '饰品'], ['ref', '店铺参考'], ['shot', '成片']];
function Assets() {
  const tab = route.tab || 'scene';
  const lists = { scene: S.scenes, model: S.models.filter(m => m.source !== 'preset'), piece: S.pieces, ref: S.refs, shot: S.shots.filter(x => !x.failed) };
  const rows = lists[tab];
  const empty = {
    scene: '还没有场景。新建工作室时生成的场景会存在这里。', model: '还没有自己的模特。可以用一句话生成，或用你自己的照片。',
    piece: '还没有作品。', ref: '还没有店铺参考图。聊气质时上传的参考图会存在这里。', shot: '还没有成片。',
  }[tab];
  const head = `<div class="title-row"><h1>总资产</h1><div class="actions">
    ${tab === 'model' ? `<button class="btn" onclick="selfModelDialog()">用我自己的照片</button>` : ''}
    ${tab === 'ref' ? `<button class="btn" onclick="addRef()">${icon('plus', 14)}上传参考图</button>` : ''}
    ${tab === 'piece' ? `<button class="btn primary" onclick="go('flow',{step:'upload'})">${icon('plus')}上新一件作品</button>` : ''}</div></div>
    <div class="tabs" role="tablist">${TABS.map(([k, l]) => `<button role="tab" aria-selected="${tab === k}" onclick="go('assets',{tab:'${k}'})">${l} <span class="num muted">${lists[k].length}</span></button>`).join('')}</div>`;
  if (!rows.length) return `<div class="page">${head}<p class="empty-line">${empty}</p>${tab === 'model' ? presetNote() : ''}</div>`;
  if (tab === 'shot') return `<div class="page">${head}<div class="shot-wall">${rows.map(x => { const pc = byId(S.pieces, x.pieceId); return `<figure class="frame">${x.kind === 'ai' ? `<div class="shot">${aiShot(x)}<span class="ai-mark">AI 生成</span></div>` : x.kind === 'real' ? stdView(pc, 'front', '#fff') : sizeChart(pc)}<figcaption class="small"><span>${esc(pc.name)} · ${esc(byId(S.studios, x.studioId).name)}</span></figcaption></figure>`; }).join('')}</div></div>`;
  return `<div class="page">${head}<table class="asset-table"><thead><tr><th>名称</th><th>${tab === 'scene' ? '材质 · 色调' : tab === 'model' ? '来源' : tab === 'piece' ? '品类 · 主尺寸' : '用途'}</th><th>使用情况</th><th></th></tr></thead><tbody>
    ${rows.map(x => assetRow(tab, x)).join('')}</tbody></table>${tab === 'model' ? presetNote() : ''}${usageMap()}</div>`;
}
function presetNote() { return `<p class="small muted" style="margin-top:16px">平台预置的 ${PRESET_MODELS.length} 位模特不在这里管理，组建工作室时可直接挑选。</p>`; }
function assetRow(tab, x) {
  let thumb = '', meta = '', usage = '';
  if (tab === 'scene') { thumb = sceneSvg(x, 0); meta = `${esc(x.material)} · ${esc(x.tone)}`; const n = studiosUsing('scene', x.id).length; usage = n ? `被 ${n} 间工作室使用` : '未使用'; }
  if (tab === 'model') { thumb = modelPortrait(x); meta = x.source === 'self' ? '本人模特 · 仅你可见' : '对话生成'; const n = studiosUsing('model', x.id).length; usage = n ? `被 ${n} 间工作室使用` : '未使用'; }
  if (tab === 'piece') { thumb = stdView(x, 'front', '#fff'); meta = `${CAT[x.cat]} · <span class="mono">${x.sizes[0]} cm</span>`; const n = S.shots.filter(s => s.pieceId === x.id && s.kind === 'ai').length; usage = n ? `${n} 张试戴图` : '还没拍'; }
  if (tab === 'ref') { thumb = svg(240, 240, '<rect width="240" height="240" fill="#eeece7"/><rect x="30" y="40" width="180" height="24" fill="#d8d4ca"/><rect x="30" y="80" width="80" height="110" fill="#cfd8dc"/><rect x="130" y="80" width="80" height="110" fill="#e2dccf"/>', 'pic'); meta = '只用于理解气质，不参与饰品识别'; usage = '—'; }
  return `<tr><td><span class="row-id"><span class="mini-thumb lg">${thumb}</span><b>${esc(x.name)}</b></span></td><td class="muted">${meta}</td><td>${usage}</td>
    <td class="row-act"><button class="btn ghost danger" onclick="delAsset('${tab}','${x.id}')">删除</button></td></tr>`;
}
function delAsset(tab, id) {
  const listKey = { scene: 'scenes', model: 'models', piece: 'pieces', ref: 'refs' }[tab];
  const x = byId(S[listKey], id);
  const using = (tab === 'scene' || tab === 'model') ? studiosUsing(tab, id) : [];
  if (using.length && !(tab === 'model' && x.source === 'self')) {
    return confirmBox(`「${esc(x.name)}」被 ${using.length} 间工作室使用，暂时不能删除`, `先在这些工作室里换掉它：${using.map(s => esc(s.name)).join('、')}。已有成片不受影响。`, null);
  }
  const selfNote = tab === 'model' && x.source === 'self' ? `原始照片和这位模特会一并删除，之后无法恢复。${using.length ? `正在使用它的 ${using.length} 间工作室会显示「缺模特」，补选之前不能拍。` : ''}` : '已有成片不受影响，拍摄记录保留。';
  confirmBox(`删除「${esc(x.name)}」？`, selfNote, () => {
    S.shots.filter(s => s.modelId === id).forEach(s => { s.modelName = x.name; });
    S[listKey] = S[listKey].filter(y => y.id !== id);
    if (tab === 'model') using.forEach(s => { s.modelId = null; });
    render(); toast('已删除');
  });
}
function confirmBox(title, body, onOk) {
  window._ok = onOk;
  $('#layer').innerHTML = `<dialog id="dlg"><div class="dlg-body"><h2 class="section-title">${title}</h2><p>${body}</p></div>
    <div class="dlg-foot">${onOk ? `<button class="btn" onclick="closeLayer()">取消</button><button class="btn danger" onclick="closeLayer();_ok()">删除</button>` : `<button class="btn primary" onclick="closeLayer()">知道了</button>`}</div></dialog>`;
  $('#dlg').showModal(); $('#dlg').addEventListener('close', closeLayer);
}
function selfModelDialog() {
  $('#layer').innerHTML = `<dialog id="dlg"><div class="dlg-body">
    <h2 class="section-title">用你自己的照片生成模特</h2>
    <p>上传一张你本人的正脸照片，生成只属于你的模特。人脸属于敏感个人信息，需要你单独同意。</p>
    <label class="check"><input type="checkbox" id="c1" onchange="selfOk()"><span>照片是我本人</span></label>
    <label class="check"><input type="checkbox" id="c2" onchange="selfOk()"><span>我单独同意平台使用这张人脸照片生成模特；模特只在我的账号内可用，我可以随时删除，删除后照片与模特一并删除。<span class="muted">【条款文案待定】</span></span></label>
  </div><div class="dlg-foot"><button class="btn" onclick="closeLayer()">取消</button><button class="btn primary" id="selfgo" disabled onclick="makeSelfModel()">上传照片并生成 · 1 张</button></div></dialog>`;
  $('#dlg').showModal(); $('#dlg').addEventListener('close', closeLayer);
}
function selfOk() { $('#selfgo').disabled = !($('#c1').checked && $('#c2').checked); }
function makeSelfModel() {
  if (!spend(1, '本人模特')) return toast('额度不够');
  S.consentLogs.push({ user: S.user.shop, kind: '人脸信息', at: new Date() });
  const m = { id: uid('m'), name: '我（本人）', skin: '#e9c6a9', hair: '#3b2c22', outfit: '#d9dfe2', temper: ['清冷', '温柔', '明亮', '复古'], desc: '本人', source: 'self' };
  S.models.push(m); if (route.name === 'flow') F.modelId = m.id;
  closeLayer(); render(); toast('本人模特已生成，仅你可见');
}

// 谁在用什么：解释为什么有的素材删不掉
function usageMap() {
  if (!S.studios.length) return '';
  return `<section class="usage"><h2 class="section-title">工作室在用的素材</h2>
    <p class="small muted">场景和模特被工作室使用时不能删除；改动共享场景会影响所有用到它的工作室。</p>
    <table class="asset-table"><thead><tr><th>工作室</th><th>场景</th><th>模特</th><th>拍过的作品</th><th class="num">成片</th></tr></thead><tbody>
    ${S.studios.map(st => { const sc = byId(S.scenes, st.sceneId), m = byId(S.models, st.modelId), sh = S.shots.filter(x => x.studioId === st.id && !x.failed);
      const ps = [...new Set(sh.map(x => x.pieceId))].map(id => byId(S.pieces, id).name);
      return `<tr><td><a href="#" onclick="go('studio',{id:'${st.id}'});return false">${esc(st.name)}</a></td><td><span class="row-id"><span class="mini-thumb">${sceneSvg(sc, 0)}</span>${esc(sc.name)} <span class="small muted">v${sc.version}</span></span></td>
        <td>${m ? `<span class="row-id"><span class="mini-thumb">${modelPortrait(m)}</span>${esc(m.name)}</span>` : '<span class="pill neg">缺模特</span>'}</td><td>${ps.map(esc).join('、') || '—'}</td><td class="num">${sh.length}</td></tr>`; }).join('')}
    </tbody></table></section>`;
}
