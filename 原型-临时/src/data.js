// 示例数据：全部为原型演示用，非真实用户或作品。
const QUOTA_TOTAL = 200;
const RETAKE_LIMIT = 3; // 【待定】与 Agent 重试上限共用
const CAT = { necklace: '项链', bracelet: '手链', earring: '耳饰' };
const SIZE_FIELDS = {
  necklace: [['链长', true], ['吊坠尺寸', false]],
  bracelet: [['手围', true], ['主珠尺寸', false]],
  earring: [['垂坠总长', true], ['主体宽度', false]],
};
const DEFAULT_COMP = {
  necklace: { comp: '局部特写', face: '不露脸', label: '颈部特写' },
  bracelet: { comp: '局部特写', face: '不露脸', label: '手腕特写' },
  earring: { comp: '局部特写', face: '侧脸', label: '耳部特写' },
};

// 珠序：每件作品是一串固定的珠子，三视图、成片都按它绘制
const SAMPLE_PIECES = [
  { name: '雾凇', cat: 'necklace', sizes: ['42', '1.2'],
    beads: ['pearl','pearl','silver','pearl','pearl','silver','pearl','pearl','silver','pearl','pearl','silver','pearl','pearl'],
    pendant: { shape: 'drop', color: '#cfd8de', size: 1.2 }, note: '淡水珍珠 · 银珠 · 月光石吊坠' },
  { name: '月白', cat: 'necklace', sizes: ['45', '0.9'],
    beads: ['pearl','silver','silver','pearl','silver','silver','pearl','silver','silver','pearl','silver','silver','pearl'],
    pendant: { shape: 'round', color: '#e8e4da', size: 0.9 }, note: '贝母圆片 · 银珠' },
  { name: '青梅', cat: 'bracelet', sizes: ['16', '0.8'],
    beads: ['jade','jade','silver','jade','jade','silver','jade','jade','silver','jade','jade','silver','jade','jade','silver','jade'],
    pendant: { shape: 'leaf', color: '#7fae8e', size: 0.8 }, note: '绿玉髓 · 银珠 · 银叶吊饰' },
  { name: '小潮汐', cat: 'earring', sizes: ['3.2', '1.4'],
    beads: ['glass'], pendant: { shape: 'wave', color: '#4f86a8', size: 1.4 }, note: '银圈 · 蓝色琉璃坠' },
];
const BEAD_COLOR = { pearl: '#efece4', silver: '#b9bec4', jade: '#7fae8e', glass: '#4f86a8' };

// 气质问答：【待定】正式问题与选项，下为示例
const QUESTIONS = [
  { id: 'mood', q: '这件作品给人的第一感觉？', opts: ['清冷', '温柔', '明亮', '复古'] },
  { id: 'wear', q: '买它的人会在什么时候戴？', opts: ['通勤', '约会', '海边旅行', '日常'] },
  { id: 'light', q: '想要什么样的光？', opts: ['清晨窗光', '午后暖光', '阴天柔光'] },
  { id: 'material', q: '背景想要什么材质？', opts: ['亚麻布', '旧木桌', '海边礁石', '石膏墙'] },
];
// 材质决定场景色场；光线微调
const SCENE_PALETTES = {
  '亚麻布': { wall: '#e9e4da', floor: '#d8cfc0', prop: '#b9a98f', accent: '#8a9a8c', tone: '米白、浅灰绿' },
  '旧木桌': { wall: '#e4ddd2', floor: '#9c7a5b', prop: '#c9b79c', accent: '#5f6f5a', tone: '胡桃木、奶白' },
  '海边礁石': { wall: '#cfdde3', floor: '#8d9496', prop: '#e7e1d4', accent: '#3f6f86', tone: '雾蓝、礁石灰' },
  '石膏墙': { wall: '#efede8', floor: '#dcd8cf', prop: '#c4bfb4', accent: '#9b8f80', tone: '石膏白、暖灰' },
};
const LIGHT_SHIFT = { '清晨窗光': 'cool', '午后暖光': 'warm', '阴天柔光': 'soft' };
const MOOD_MODEL = {
  '清冷': { temper: '清冷、安静', outfit: '浅灰针织', pose: '微微侧身' },
  '温柔': { temper: '温柔、松弛', outfit: '米白衬衫', pose: '手轻搭锁骨' },
  '明亮': { temper: '明亮、利落', outfit: '白色背心', pose: '正面直立' },
  '复古': { temper: '复古、沉静', outfit: '墨绿丝绒', pose: '低头侧望' },
};
const WEAR_ATMO = { '通勤': '利落安静', '约会': '柔和亲近', '海边旅行': '开阔透气', '日常': '松弛自然' };

// 平台预置模特库（数字人）
const PRESET_MODELS = [
  { id: 'm1', hairStyle: 'short', name: '阿洛', skin: '#e8c4a8', hair: '#2b2420', outfit: '#c9cdd0', temper: ['清冷', '复古'], desc: '短发、颈线修长' },
  { id: 'm2', hairStyle: 'long', name: '小满', skin: '#f0cfb4', hair: '#3a2a20', outfit: '#efe9df', temper: ['温柔', '明亮'], desc: '长发、肩线柔和' },
  { id: 'm3', hairStyle: 'bun', name: '青禾', skin: '#d9b08f', hair: '#1f1a17', outfit: '#3f5a4c', temper: ['复古', '清冷'], desc: '盘发、手指纤长' },
  { id: 'm4', hairStyle: 'curly', name: '南枝', skin: '#f2d6c0', hair: '#5a3b28', outfit: '#f4f1ea', temper: ['明亮', '温柔'], desc: '卷发、笑意' },
  { id: 'm5', hairStyle: 'short', name: '予安', skin: '#c99a78', hair: '#231c18', outfit: '#d8d2c6', temper: ['清冷', '明亮'], desc: '利落短发' },
  { id: 'm6', hairStyle: 'side', name: '知夏', skin: '#ebc2a2', hair: '#2e2620', outfit: '#b7c4cc', temper: ['温柔', '复古'], desc: '低马尾' },
];

// 全局状态：新用户从零开始
const S = {
  user: { shop: '示例店铺', isNew: true },
  pieces: [], scenes: [], models: PRESET_MODELS.map(m => ({ ...m, source: 'preset' })),
  studios: [], shots: [], refs: [], usage: [], followups: [], exportLogs: [], consentLogs: [],
  sampleCursor: 0, seq: 1,
};
const uid = p => p + (S.seq++);
const used = () => S.usage.reduce((n, u) => n + u.count, 0); // 额度从记录行计算
const left = () => QUOTA_TOTAL - used();
function spend(count, what) {
  if (count > left()) return false;
  S.usage.push({ count, what, at: new Date() });
  console.assert(used() + left() === QUOTA_TOTAL, 'quota rows must add up');
  return true;
}
const studiosUsing = (kind, id) => S.studios.filter(s => s[kind + 'Id'] === id);
const byId = (list, id) => list.find(x => x.id === id);
