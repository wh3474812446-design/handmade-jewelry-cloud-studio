// 饰品绘制：同一份珠序在实拍、三视图、成片中复用（保真的可视化）
const svg = (w, h, body, cls = '') => `<svg class="${cls}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;

function pendantPath(p, x, y, s) {
  const r = 9 * s;
  if (p.shape === 'drop') return `<path d="M${x} ${y} C ${x + r} ${y + r * 1.2}, ${x + r * .8} ${y + r * 2.4}, ${x} ${y + r * 2.6} C ${x - r * .8} ${y + r * 2.4}, ${x - r} ${y + r * 1.2}, ${x} ${y}Z" fill="${p.color}" stroke="#8d969c" stroke-width="1"/>`;
  if (p.shape === 'round') return `<circle cx="${x}" cy="${y + r}" r="${r}" fill="${p.color}" stroke="#a7a39a" stroke-width="1"/>`;
  if (p.shape === 'leaf') return `<path d="M${x} ${y} Q ${x + r * 1.1} ${y + r * 1.2} ${x} ${y + r * 2.4} Q ${x - r * 1.1} ${y + r * 1.2} ${x} ${y}Z" fill="#b9bec4" stroke="#8d969c" stroke-width="1"/><path d="M${x} ${y + 2} L ${x} ${y + r * 2.2}" stroke="#8d969c" stroke-width=".8"/>`;
  // wave: 琉璃坠
  return `<path d="M${x - r} ${y + r} Q ${x - r * .3} ${y - r * .2} ${x} ${y + r * .4} Q ${x + r * .5} ${y + r} ${x + r} ${y + r * .2} L ${x + r * .7} ${y + r * 2} Q ${x} ${y + r * 2.6} ${x - r * .8} ${y + r * 2}Z" fill="${p.color}" stroke="#2f5870" stroke-width="1"/>`;
}

// 返回饰品主体（不含背景），在 (cx, cy) 处，scale 控制大小
// view: front | side | back；pendantScale 用于演示「吊坠被画大」的保真偏差
function pieceBody(pc, cx, cy, scale = 1, view = 'front', pendantScale = 1) {
  const n = pc.beads.length;
  let out = '';
  if (pc.cat === 'earring') {
    const r = 14 * scale;
    out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#b9bec4" stroke-width="${2.4 * scale}"/>`;
    if (view !== 'side') out += pendantPath({ ...pc.pendant }, cx, cy + r, scale * 1.4 * pendantScale);
    else out += `<rect x="${cx - 3 * scale}" y="${cy + r}" width="${6 * scale}" height="${30 * scale}" rx="${3 * scale}" fill="${pc.pendant.color}"/>`;
    return out;
  }
  const isNeck = pc.cat === 'necklace';
  const sq = view === 'side' ? .32 : view === 'wrist' ? .5 : 1;
  const rx = (isNeck ? 70 : 46) * scale * sq;
  const ry = (isNeck ? 58 : 46) * scale;
  const pts = [];
  if (isNeck) {
    // 珠子沿链条的二次曲线排布，吊坠挂在最低点
    const P0 = [cx - rx * 1.05, cy - ry * .9], P1 = [cx, cy + ry * 1.25], P2 = [cx + rx * 1.05, cy - ry * .9];
    const q = (t, i) => (1 - t) ** 2 * P0[i] + 2 * (1 - t) * t * P1[i] + t * t * P2[i];
    for (let i = 0; i < n; i++) { const t = .1 + .8 * (i / (n - 1)); pts.push([q(t, 0), q(t, 1)]); }
    out += `<path d="M${P0[0]} ${P0[1]} Q ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}" fill="none" stroke="#a9aeb3" stroke-width="${1.2 * scale}"/>`;
  } else {
    for (let i = 0; i < n; i++) { const t = Math.PI * 2 * (i / n); pts.push([cx + Math.cos(t) * rx, cy - Math.sin(t) * ry]); }
    out += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#a9aeb3" stroke-width="${1 * scale}"/>`;
  }
  pts.forEach(([x, y], i) => {
    const b = pc.beads[i], r = (b === 'silver' ? 4.2 : 6) * scale;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${BEAD_COLOR[b]}" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>`;
  });
  if (isNeck && view !== 'back') out += pendantPath(pc.pendant, cx, cy + ry * .175 + 3 * scale, scale * pendantScale);
  if (view === 'back') out += `<rect x="${cx - 5 * scale}" y="${cy - ry * .98}" width="${10 * scale}" height="${6 * scale}" rx="2" fill="#9aa0a6"/>`;
  if (!isNeck && view !== 'side') out += pendantPath(pc.pendant, cx + rx * .72, cy + ry * .62, scale * .8);
  return out;
}

const VIEW_LABEL = { front: '正面', side: '侧面', back: '反面' };
// 实拍：桌面背景、略带倾斜与阴影（用户手机随手拍）
function rawPhoto(pc, view) {
  const tilt = { front: -6, side: 9, back: 4 }[view];
  return svg(240, 240, `<rect width="240" height="240" fill="#d6c9b4"/><rect y="150" width="240" height="90" fill="#cbbca4"/>
    <ellipse cx="128" cy="150" rx="78" ry="16" fill="#bfae94"/>
    <g transform="rotate(${tilt} 120 120)">${pieceBody(pc, 120, 112, 1, view)}</g>`, 'pic');
}
// 标准三视图：只抠图与统一背景，饰品图形与实拍同一份
function stdView(pc, view, bg = '#f7f7f5') {
  return svg(240, 240, `<rect width="240" height="240" fill="${bg}"/>${pieceBody(pc, 120, 112, 1, view)}`, 'pic');
}
// 珠序条：实拍珠序 vs 本张成片中的饰品
function beadStrip(pc, pendantScale = 1) {
  const n = pc.beads.length, w = Math.max(n * 9 + 26, 60);
  let s = '';
  pc.beads.forEach((b, i) => { s += `<circle cx="${6 + i * 9}" cy="7" r="${b === 'silver' ? 2.6 : 3.4}" fill="${BEAD_COLOR[b]}" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>`; });
  const px = 6 + n * 9 + 6, pr = 4 * pendantScale;
  s += `<circle cx="${px + pr}" cy="7" r="${pr}" fill="${pc.pendant.color}" stroke="rgba(0,0,0,.3)" stroke-width=".6"/>`;
  return svg(px + pr * 2 + 2, 14, s, 'strip');
}
function sizeChart(pc) {
  const f = SIZE_FIELDS[pc.cat];
  return svg(240, 240, `<rect width="240" height="240" fill="#ffffff"/>${pieceBody(pc, 120, 104, .9, 'front')}
    <path d="M40 206 H200" stroke="#131416" stroke-width="1"/><path d="M40 200 V212 M200 200 V212" stroke="#131416"/>
    <text x="120" y="226" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="12" fill="#131416">${f[0][0]} ${pc.sizes[0]} cm</text>
    ${pc.sizes[1] ? `<text x="20" y="28" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5d5f60">${f[1][0]} ${pc.sizes[1]} cm</text>` : ''}`, 'pic');
}

// 珠序对照：实拍一行、本张一行，逐颗对齐；吊坠大小不一致时用铜绿圈出
function beadCompare(pc, pendantScale = 1) {
  const n = pc.beads.length, gap = Math.min(11, 150 / Math.max(n, 1)), x0 = 30;
  const px = x0 + n * gap + 8, rowY = [9, 27];
  let s = '';
  ['实拍', '本张'].forEach((label, r) => {
    s += `<text x="0" y="${rowY[r] + 4}" font-size="11" fill="#5d5f60" font-family="IBM Plex Sans, PingFang SC, sans-serif">${label}</text>`;
    pc.beads.forEach((b, i) => { s += `<circle cx="${x0 + i * gap + gap / 2}" cy="${rowY[r]}" r="${b === 'silver' ? 3.4 : 4.6}" fill="${BEAD_COLOR[b]}" stroke="rgba(0,0,0,.28)" stroke-width=".7"/>`; });
    const pr = 5 * (r ? pendantScale : 1);
    s += `<circle cx="${px}" cy="${rowY[r]}" r="${pr}" fill="${pc.pendant.color}" stroke="rgba(0,0,0,.32)" stroke-width=".7"/>`;
  });
  if (pendantScale !== 1) s += `<circle cx="${px}" cy="${rowY[1]}" r="${5 * pendantScale + 3}" fill="none" stroke="#1b6c80" stroke-width="1.6"/>`;
  return svg(px + 18, 36, s, "compare");
}
