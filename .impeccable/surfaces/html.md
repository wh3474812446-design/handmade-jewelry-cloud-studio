---
version: 1
slug: "html"
primary_target: "原型-临时/云工作室原型.html"
related_targets: []
---

## Scope
本地单文件可点击原型 `原型-临时/云工作室原型.html`，Operate 模式。需求：`PRD/PRD-编码Agent版.md` v0.3 的 P0 全流程 + F-10 外层 Agent 完整演示。审美方向由 taste skill 指定（`.taste-skill/notes.md`、`direction.json`，framed-sheet），视为用户指定方向，不另行抽签。

## Audience / job
手作饰品卖家，电脑浏览器，上新时连续 20–40 分钟：上传三张实拍 → 复用或新建工作室 → 拍一套 → 挑图、标像/不像 → 导出。打开时为新用户（空状态），演示者从第一件作品走起；第二件可走复用。

## Constraints
不引用外部图片；图像全部代码绘制（饰品 SVG 三处共用、场景平涂色场、模特局部特写轮廓不画五官）；示例数据由数据对象生成，额度从行计算。

## Direction contract
THESIS: 工作室是作品的拍摄棚，不是一张设置表单。拒绝「左侧导航 + 卡片网格 + 表单向导」的通用 SaaS 生成器排布；作品与成片永远是屏幕上最大的东西，控件在它们旁边。
OWN-WORLD: 石灰外框 #f4f3ef 包住白色纸面（16px 圆角、1px #e8eaec 边、无阴影）；铜绿 #1b6c80 只在主数据（额度、选中成片、像计数）与一个选中态；近黑主按钮；IBM Plex Sans + 系统中文黑体；尺寸数字用 Plex Mono；8px 卡片、6px 控件。
STORY: 卖家看到自己的作品被画成「珠序」，三视图、工作室、成片里都是同一串珠子；相信饰品不会被改；拍一套并直接下载。
FIRST VIEWPORT: 左 228px 外框侧栏（标志、我的工作室、总资产、额度条），顶栏 48px（搜索、助手入口），纸面内标题「我的工作室」22px + 近黑「上新一件作品」；新用户时纸面中央是三张实拍的拖入槽（正/侧/反）作为首个动作。
FORM: framed-sheet（taste skill 指定，非 impeccable 抽签）；seed: none (unavailable)。招牌动作：每张成片下的珠序对照条，与实拍珠序并排，旁边是像/不像。
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
