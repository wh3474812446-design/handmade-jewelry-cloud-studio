// 示例账号：一位用过一阵的卖家。全部为演示数据，写进用户资产，额度从记录行计算。
function seedDemo() {
  resetUser(true);
  S.user = { shop: '示例店铺', isNew: false };
  const day = (d, h = 10) => new Date(2026, 9, d, h, 12);
  const piece = (i, extra = {}) => { const p = { ...SAMPLE_PIECES[i], id: uid('p'), confirmed: true, createdAt: day(20 + i), ...extra }; S.pieces.push(p); return p; };
  const wu = piece(0), yue = piece(1), mei = piece(2), chao = piece(3);
  const scene = (name, material, light, atmo, version = 1) => {
    const sc = { id: uid('s'), name, material, palette: SCENE_PALETTES[material], light, tone: SCENE_PALETTES[material].tone, atmo, variant: 0, version, kept: [1, 1, 1, 1], versions: Array.from({ length: version }, (_, i) => ({ v: i + 1, at: day(21 + i) })) };
    S.scenes.push(sc); spend(4, '生成场景'); return sc;
  };
  const linen = scene('亚麻窗边 场景', '亚麻布', 'cool', '利落安静');
  const wood = scene('旧木书桌 场景', '旧木桌', 'warm', '松弛自然', 2);
  const sea = scene('海边清晨 场景', '海边礁石', 'soft', '开阔透气');
  const chat = { ...PRESET_MODELS[3], id: uid('m'), name: '新模特 1', desc: '卷发、浅笑、米白针织', source: 'chat', temper: ['温柔'] };
  S.models.push(chat); spend(1, '生成模特');
  const studio = (name, sc, modelId, mood) => { const st = { id: uid('w'), name, sceneId: sc.id, modelId, card: { mood }, createdAt: day(22) }; S.studios.push(st); return st; };
  const w1 = studio('亚麻窗边', linen, 'm1', '清冷');
  const w2 = studio('亚麻窗边·小满', linen, 'm2', '温柔'); // 与上一间共用场景
  const w3 = studio('旧木书桌', wood, 'm3', '复古');
  studio('海边清晨', sea, chat.id, '明亮');
  // 一套成片：4 张试戴 + 实物 + 尺寸；verdicts 为每张的「像 / 不像」
  let n = 0;
  const set = (st, pc, at, sceneVersion, verdicts, extra = {}) => {
    const setId = 'demo' + (++n), sc = byId(S.scenes, st.sceneId), m = byId(S.models, st.modelId);
    const snap = { ...sc, version: sceneVersion, light: sceneVersion < sc.version ? 'cool' : sc.light };
    verdicts.forEach((v, i) => S.shots.push({ id: uid('x'), setId, studioId: st.id, pieceId: pc.id, sceneId: sc.id, sceneVersion, sceneSnap: snap, modelId: m.id, modelSnap: { ...m }, kind: 'ai', angle: i % 4, ratio: '1:1', comp: '局部特写', face: DEFAULT_COMP[pc.cat].face, pendantScale: 1, failed: false, verdict: v, retakes: 0, history: [], at, ...(extra[i] || {}) }));
    S.shots.push({ id: uid('x'), setId, studioId: st.id, pieceId: pc.id, kind: 'real', src: 'std', at });
    S.shots.push({ id: uid('x'), setId, studioId: st.id, pieceId: pc.id, kind: 'size', at });
    spend(verdicts.length, '拍摄');
  };
  set(w1, wu, day(22, 15), 1, ['like', 'like', 'like', 'like']);
  // 月白复用亚麻窗边；第 2 张曾被标不像、按「大小」重拍过一次，原图留作历史
  set(w1, yue, day(24, 11), 1, ['like', 'like', null, 'like'], { 1: { retakes: 1, reasons: ['大小'], history: [{ pendantScale: 1.4, at: day(24, 11), reason: '大小' }] } });
  spend(1, '单张重拍');
  set(w2, wu, day(25, 9), 1, ['like', null, 'like', null]);
  // 青梅在旧木书桌拍过两套：场景 v1 时一套，调成暖光（v2）后又拍一套
  set(w3, mei, day(23, 16), 1, ['like', null, 'like', 'like']);
  set(w3, mei, day(26, 14), 2, ['like', 'like', 'like', null]);
  S.refs.push({ id: uid('r'), name: '店铺首页截图 1' });
  S.feedback = S.shots.filter(x => x.verdict).map(x => ({ shotId: x.id, cat: byId(S.pieces, x.pieceId).cat, v: x.verdict, at: x.at }));
  S.matchLog = [{ pieceId: wu.id, path: '新建' }, { pieceId: yue.id, path: '复用', reason: '调性相近' }, { pieceId: mei.id, path: '新建', reason: '风格不同' }];
  console.assert(used() + left() === QUOTA_TOTAL, 'demo quota rows add up');
  return chao;
}
// 清空为新用户；quiet 时不重绘
function resetUser(quiet) {
  Object.assign(S, { user: { shop: '示例店铺', isNew: true }, pieces: [], scenes: [], models: PRESET_MODELS.map(m => ({ ...m, source: 'preset' })), studios: [], shots: [], refs: [], usage: [], followups: [], exportLogs: [], consentLogs: [], feedback: [], matchLog: [] });
  Object.keys(Z).forEach(k => delete Z[k]); F.draft = null; setCounter = 0;
  if (!quiet) { go('home'); toast('已切换到新用户'); }
}
function loadDemo() { seedDemo(); go('home'); toast('已载入示例账号'); }
seedDemo();
