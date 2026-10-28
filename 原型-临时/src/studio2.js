// 切换场景 / 模特；导出与 AI 标识
function closeLayer() { $('#layer').innerHTML = ''; }
function switchPop(ev, kind, studioId) {
  ev.stopPropagation();
  const st = byId(S.studios, studioId), r = ev.currentTarget.getBoundingClientRect();
  const list = kind === 'scene' ? S.scenes : S.models;
  const cur = st[kind + 'Id'];
  $('#layer').innerHTML = `<div class="pop" role="menu" style="top:${r.bottom + 6}px;left:${Math.min(r.left, innerWidth - 300)}px">
    <p class="small muted" style="padding:6px 8px">${kind === 'scene' ? '换成总资产里的另一个场景' : '换一位模特'}；已有成片保留</p>
    ${list.map(x => `<button role="menuitem" ${x.id === cur ? 'aria-current="true"' : ''} onclick="doSwitch('${studioId}','${kind}','${x.id}')">
      <span class="mini-thumb">${kind === 'scene' ? sceneSvg(x, 0) : modelPortrait(x)}</span><span>${esc(x.name)}${x.id === cur ? ' <span class="small muted">当前</span>' : ''}</span></button>`).join('')}</div>`;
  setTimeout(() => document.addEventListener('click', closeLayer, { once: true }));
}
function doSwitch(studioId, kind, id) {
  const st = byId(S.studios, studioId); st[kind + 'Id'] = id; closeLayer(); render();
  toast(`已切换${kind === 'scene' ? '场景' : '模特'}，旧成片原样保留`);
}
function exportDialog(setId) {
  const shots = S.shots.filter(x => x.setId === setId && !x.failed), pc = byId(S.pieces, shots[0].pieceId);
  const ai = shots.filter(x => x.kind === 'ai').length;
  $('#layer').innerHTML = `<dialog id="dlg"><div class="dlg-body">
    <h2 class="section-title">打包下载「${esc(pc.name)}」这一套</h2>
    <p class="num">${shots.length} 张 JPG：${ai} 张 AI 试戴图带「AI 生成」角标，实物图和尺寸图不带。所有 AI 图都写入隐式标识。</p>
    <p class="small muted">1:1 不低于 1500 × 1500 px，3:4 不低于 1500 × 2000 px</p>
    <details class="nobadge"><summary>需要不带角标的版本？</summary>
      <p class="small" style="margin-top:8px">按《人工智能生成合成内容标识办法》，AI 生成图需要标识。去掉显式角标后，隐式标识仍保留，发布时由你负责标识并承担使用责任。【条款文案待定】</p>
      <label class="check" style="margin-top:8px"><input type="checkbox" id="agree" onchange="$('#nobadge').disabled=!this.checked"><span class="small">我已阅读并同意，自行承担标识义务与使用责任</span></label>
      <button class="btn" id="nobadge" disabled style="margin-top:8px" onclick="exportNoBadge('${setId}')">下载无角标版本</button></details>
  </div><div class="dlg-foot"><button class="btn" onclick="closeLayer()">取消</button><button class="btn primary" onclick="closeLayer();toast('已下载 ${esc(pc.name)}-套图.zip（${shots.length} 张）')">下载 ${shots.length} 张</button></div></dialog>`;
  $('#dlg').showModal();
  $('#dlg').addEventListener('close', closeLayer);
}
function exportNoBadge(setId) {
  S.exportLogs.push({ user: S.user.shop, setId, at: new Date(), agreed: true });
  closeLayer(); toast('已下载无角标版本，同意记录已留存');
}
