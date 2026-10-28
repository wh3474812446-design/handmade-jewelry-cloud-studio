// 场景：同一组色场的四个机位；模特：局部特写轮廓，不画五官
const ANGLES = ['主拍摄区', '左侧角度', '右侧角度', '远景氛围'];
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(v + amt))));
  return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
}
function lit(p, light) {
  const k = { cool: [-4, 0, 6], warm: [8, 2, -8], soft: [0, 0, 0] }[light] || [0, 0, 0];
  const t = hex => { const n = parseInt(hex.slice(1), 16); return '#' + [n >> 16, (n >> 8) & 255, n & 255].map((v, i) => Math.max(0, Math.min(255, v + k[i]))).map(v => v.toString(16).padStart(2, '0')).join(''); };
  return { wall: t(p.wall), floor: t(p.floor), prop: t(p.prop), accent: t(p.accent) };
}
// 场景背景（w×h），angle 0..3；variant 让「重新生成」有变化
function sceneBg(sc, angle, w = 240, h = 240) {
  const c = lit(sc.palette, sc.light), v = sc.variant || 0;
  const horizon = [0.62, 0.66, 0.58, 0.72][angle] * h;
  let s = `<rect width="${w}" height="${h}" fill="${c.wall}"/>`;
  if (sc.material === '海边礁石') {
    s += `<rect y="${horizon - h * .14}" width="${w}" height="${h * .14}" fill="${shade(c.accent, 30)}"/>`;
    s += `<path d="M0 ${horizon} Q ${w * .3} ${horizon - 18 - v * 6} ${w * .55} ${horizon - 4} T ${w} ${horizon - 10} V ${h} H0Z" fill="${c.floor}"/>`;
  } else {
    // 窗光：一个平涂的平行四边形
    const wx = [0.56, 0.18, 0.66, 0.4][angle] * w + v * 8;
    s += `<path d="M${wx} ${h * .08} h${w * .26} l${-w * .1} ${horizon - h * .1} h${-w * .26}Z" fill="${shade(c.wall, 12)}"/>`;
    s += `<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="${c.floor}"/>`;
    if (sc.material === '亚麻布') s += `<path d="M0 ${horizon + 10} Q ${w * .5} ${horizon - 6} ${w} ${horizon + 14} V${h} H0Z" fill="${shade(c.floor, 10)}"/>`;
  }
  // 道具：花瓶 / 石块 / 书，按机位换位置
  const px = [0.14, 0.78, 0.1, 0.5][angle] * w, py = horizon;
  if (angle === 3) s += `<rect x="${w * .3}" y="${py - h * .2}" width="${w * .4}" height="${h * .2}" fill="${shade(c.prop, -8)}"/>`;
  s += `<path d="M${px - 9} ${py} q -4 -26 6 -36 q -6 -10 3 -14 h4 q 9 4 3 14 q 10 10 6 36Z" fill="${c.prop}"/>`;
  s += `<path d="M${px + 2} ${py - 50} q 8 -16 18 -20 M${px + 2} ${py - 50} q -6 -14 -2 -24" stroke="${c.accent}" stroke-width="1.6" fill="none"/>`;
  return s;
}
const sceneSvg = (sc, angle) => svg(240, 240, sceneBg(sc, angle), 'pic');

// 模特局部特写：neck 颈肩 / wrist 手腕 / ear 耳侧
function hairFor(m, w, h) {
  const st = m.hairStyle || 'long', c = m.hair;
  if (st === 'long') return `<path d="M${w * .2} 0 C ${w * .22} ${h * .3}, ${w * .14} ${h * .5}, ${w * .06} ${h * .62} L 0 ${h * .6} V0Z M${w * .8} 0 C ${w * .78} ${h * .3}, ${w * .86} ${h * .5}, ${w * .94} ${h * .62} L ${w} ${h * .6} V0Z" fill="${c}"/>`;
  if (st === 'curly') return `<path d="M${w * .24} 0 q -${w * .06} ${h * .12} 0 ${h * .2} q -${w * .08} ${h * .1} -${w * .02} ${h * .22} q -${w * .1} ${h * .08} -${w * .14} ${h * .14} L 0 ${h * .5} V0Z M${w * .76} 0 q ${w * .06} ${h * .12} 0 ${h * .2} q ${w * .08} ${h * .1} ${w * .02} ${h * .22} q ${w * .1} ${h * .08} ${w * .14} ${h * .14} L ${w} ${h * .5} V0Z" fill="${c}"/>`;
  if (st === 'side') return `<path d="M${w * .66} 0 C ${w * .7} ${h * .2}, ${w * .62} ${h * .42}, ${w * .7} ${h * .6} C ${w * .78} ${h * .5}, ${w * .82} ${h * .2}, ${w * .8} 0Z" fill="${c}"/>`;
  if (st === 'bun') return `<path d="M${w * .36} 0 h ${w * .28} c -${w * .02} ${h * .05}, -${w * .24} ${h * .05}, -${w * .28} 0Z" fill="${c}"/>`;
  return `<path d="M${w * .37} 0 h ${w * .26} c 0 ${h * .08}, -${w * .04} ${h * .1}, -${w * .13} ${h * .1} c -${w * .09} 0, -${w * .13} -${h * .02}, -${w * .13} -${h * .1}Z" fill="${c}"/>`;
}
function modelCrop(m, kind, w = 240, h = 240) {
  if (kind === 'neck') return hairFor(m, w, h) + `
    <path d="M${w * .38} 0 C ${w * .39} ${h * .25}, ${w * .36} ${h * .36}, ${w * .2} ${h * .48} L ${w * .02} ${h * .6} V ${h} H ${w * .98} V ${h * .6} L ${w * .8} ${h * .48} C ${w * .64} ${h * .36}, ${w * .61} ${h * .25}, ${w * .62} 0Z" fill="${m.skin}"/>
    <path d="M${w * .3} ${h * .5} q ${w * .2} ${h * .05} ${w * .4} 0" stroke="${shade(m.skin, -22)}" stroke-width="1.4" fill="none"/>
    <path d="M0 ${h * .64} L ${w * .24} ${h * .55} Q ${w * .5} ${h * .86} ${w * .76} ${h * .55} L ${w} ${h * .64} V ${h} H0Z" fill="${m.outfit}"/>`;
  if (kind === 'wrist') return `
    <path d="M0 ${h * .62} C ${w * .3} ${h * .58}, ${w * .5} ${h * .56}, ${w * .66} ${h * .5} C ${w * .78} ${h * .45}, ${w * .92} ${h * .46}, ${w} ${h * .5} V ${h * .72} C ${w * .9} ${h * .74}, ${w * .76} ${h * .7}, ${w * .66} ${h * .72} C ${w * .5} ${h * .76}, ${w * .3} ${h * .8}, 0 ${h * .84}Z" fill="${m.skin}"/>
    <path d="M0 ${h * .6} L ${w * .26} ${h * .58} L ${w * .3} ${h * .82} L 0 ${h * .86}Z" fill="${m.outfit}"/>`;
  // 耳侧：脸颊轮廓 + 头发 + 清楚的耳廓，耳坠挂在耳垂（约 x .6, y .56）
  return `
    <path d="M0 0 H ${w * .72} C ${w * .7} ${h * .3}, ${w * .74} ${h * .62}, ${w * .62} ${h * .86} C ${w * .56} ${h * .96}, ${w * .5} ${h}, ${w * .46} ${h} H 0Z" fill="${m.skin}"/>
    <path d="M${w * .26} 0 C ${w * .5} ${h * .02}, ${w * .9} ${h * .06}, ${w} ${h * .2} V ${h * .9} C ${w * .9} ${h * .7}, ${w * .8} ${h * .42}, ${w * .72} ${h * .3} C ${w * .66} ${h * .16}, ${w * .5} ${h * .08}, ${w * .26} 0Z" fill="${m.hair}"/>
    <path d="M${w * .6} ${h * .3} C ${w * .7} ${h * .26}, ${w * .74} ${h * .4}, ${w * .68} ${h * .48} C ${w * .65} ${h * .53}, ${w * .63} ${h * .57}, ${w * .6} ${h * .56} C ${w * .56} ${h * .55}, ${w * .56} ${h * .46}, ${w * .58} ${h * .4}Z" fill="${shade(m.skin, -10)}" stroke="${shade(m.skin, -30)}" stroke-width="1"/>
    <path d="M${w * .62} ${h * .35} C ${w * .67} ${h * .35}, ${w * .67} ${h * .44}, ${w * .63} ${h * .47}" stroke="${shade(m.skin, -34)}" stroke-width="1.2" fill="none"/>`;
}
const CROP = { necklace: 'neck', bracelet: 'wrist', earring: 'ear' };
const PIECE_AT = {
  necklace: [120, 100, 1.05], bracelet: [160, 148, .78], earring: [144, 148, .95],
};
// AI 试戴图：场景机位 + 模特特写 + 同一份饰品图形
function aiShot(sh) {
  const sc = sh.sceneSnap || byId(S.scenes, sh.sceneId), m = sh.modelSnap || byId(S.models, sh.modelId), pc = sh.pieceSnap || byId(S.pieces, sh.pieceId);
  const [x, y, k] = PIECE_AT[pc.cat];
  const body = sceneBg(sc, sh.angle) + modelCrop(m, CROP[pc.cat]) + `<g>${pieceBody(pc, x, y, k, pc.cat === 'bracelet' ? 'wrist' : 'front', sh.pendantScale || 1)}</g>`;
  return svg(240, sh.ratio === '3:4' ? 320 : 240, sh.ratio === '3:4' ? `<g transform="scale(1 1.333)">${body}</g>` : body, 'pic');
}
function modelPortrait(m) {
  return svg(240, 240, `<rect width="240" height="240" fill="#eeece7"/>${modelCrop(m, 'neck')}`, 'pic');
}
