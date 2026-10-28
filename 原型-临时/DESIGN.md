---
name: 云工作室（手作饰品云工作室）
description: 石灰外框包住白色纸面的拍摄棚式工作台，作品与成片永远最大，铜绿只落在数据和选中上
colors:
  frame: "#f2f2f0"
  surface: "#ffffff"
  raised: "#f6f6f5"
  active: "#e8e8e6"
  frame-hover: "#e9e9e7"
  border: "#e8eaec"
  rule: "#f0f1f2"
  control: "#cdced1"
  dashed: "#d9dadc"
  text: "#131416"
  chrome-ink: "#45474a"
  muted: "#5d5f60"
  faint: "#6b6b6b"
  primary: "#1d1f20"
  primary-hover: "#393c3e"
  accent: "#1b6c80"
  accent-soft: "#e6f0f2"
  accent-ink: "#0f4553"
  positive: "#1e7b4f"
  negative: "#c4242a"
  negative-line: "#e9b7b7"
  quota-track: "#e3e1da"
  quota-low: "#a86f0c"
  pill-positive-bg: "#dcfae5"
  pill-positive-ink: "#04250e"
  pill-negative-bg: "#ffedea"
  pill-negative-ink: "#831c1e"
  pill-warning-bg: "#fffbeb"
  pill-warning-ink: "#92400e"
  pill-warning-line: "#fde68a"
  pill-neutral-bg: "#ebedee"
  pill-neutral-ink: "#353736"
  bead-pearl: "#efece4"
  bead-silver: "#b9bec4"
  bead-jade: "#7fae8e"
  bead-glass: "#4f86a8"
  metal-line: "#a9aeb3"
  draw-studio-bg: "#f7f7f5"
  draw-portrait-bg: "#eeece7"
  draw-table: "#d6c9b4"
typography:
  title:
    fontFamily: "\"IBM Plex Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans SC\", \"Microsoft YaHei\", system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: "28px"
  step-title:
    fontFamily: "\"IBM Plex Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans SC\", \"Microsoft YaHei\", system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
  section:
    fontFamily: "\"IBM Plex Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans SC\", \"Microsoft YaHei\", system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
  body:
    fontFamily: "\"IBM Plex Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans SC\", \"Microsoft YaHei\", system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  body-strong:
    fontFamily: "\"IBM Plex Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans SC\", \"Microsoft YaHei\", system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
  small:
    fontFamily: "\"IBM Plex Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans SC\", \"Microsoft YaHei\", system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "18px"
  label:
    fontFamily: "\"IBM Plex Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans SC\", \"Microsoft YaHei\", system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "18px"
  mono:
    fontFamily: "\"IBM Plex Mono\", ui-monospace, \"SF Mono\", monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "18px"
    fontFeature: "\"tnum\""
rounded:
  inner: "4px"
  control: "6px"
  card: "8px"
  popover: "10px"
  floating: "12px"
  sheet: "16px"
  pill: "999px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  sheet-inset: "8px"
  sidebar-width: "228px"
  topbar-height: "48px"
  control-height: "32px"
components:
  sheet:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sheet}"
    padding: "24px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface}"
  button-primary-lg:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "32px"
  button-secondary-hover:
    backgroundColor: "{colors.raised}"
  button-ghost-hover:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
  button-disabled:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.faint}"
  segmented:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.control}"
    padding: "2px"
  segmented-option:
    textColor: "{colors.muted}"
    rounded: "{rounded.inner}"
    padding: "0 12px"
    height: "28px"
  segmented-option-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-strong}"
  option-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "34px"
  option-pill-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  verdict-like-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "28px"
  verdict-unlike-selected:
    backgroundColor: "{colors.pill-negative-bg}"
    textColor: "{colors.pill-negative-ink}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "28px"
  status-pill:
    backgroundColor: "{colors.pill-neutral-bg}"
    textColor: "{colors.pill-neutral-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 8px"
    height: "20px"
  status-pill-accent:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-ink}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "16px"
  well-panel:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.card}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "0 12px"
    height: "38px"
  nav-item:
    textColor: "{colors.chrome-ink}"
    rounded: "{rounded.control}"
    padding: "0 10px"
    height: "34px"
  nav-item-active:
    backgroundColor: "{colors.active}"
    textColor: "{colors.text}"
    typography: "{typography.body-strong}"
  ai-mark:
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.inner}"
    padding: "0 6px"
  quota-bar:
    backgroundColor: "{colors.quota-track}"
    height: "6px"
  agent-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.floating}"
    width: "380px"
  toast:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.small}"
    rounded: "{rounded.card}"
    padding: "10px 16px"
---

# Design System: 云工作室

本文件记录 `原型-临时/云工作室原型.html`（源码 `原型-临时/src/*.css`、`*.js`）实际出货的视觉值。所有值以源码为准；它描述的是原型，不替代 `PRD/PRD-编码Agent版.md`。

## Overview

**Creative North Star: "无缝背景纸的拍摄棚"**

整个应用是一间拍摄棚：低彩度石灰色外框是棚里的墙和工作台，白色纸面是挂下来的无缝背景纸，作品和成片放在纸上拍。外框（侧栏加 48px 顶栏）连成一整块 L 形，没有分隔线；纸面离窗口右边和下边各 8px，16px 圆角、1px 细边、不加阴影。深度只靠一个色阶（外框到纸面），不靠投影。

界面退后，作品在前。每个屏幕上最大的东西是作品、工作室的场景和成片印样；控件贴在它们旁边，体量小，颜色是灰和近黑。品牌色铜绿（银、铜饰品氧化后的颜色）用得很省，只落在数据和"选中"上：额度条、"像"的计数、选中的饰品或模特、被判定为"像"的成片。

密度中等，适合一次 20 到 40 分钟的连续操作：14px 正文，32px 控件，24px 的统一间距。图像全部用代码绘制，饰品按同一份珠序在实拍、三视图、成片三处复用，保真在屏幕上就能核对。

**Key Characteristics:**
- 石灰 L 形外框 + 白色纸面，两层之间只有一个色阶，纸面无阴影。
- 主按钮近黑，品牌铜绿只给数据和选中态。
- IBM Plex Sans 配系统中文黑体，Plex Mono 只用于尺寸数字（cm）。
- 每张成片下有珠序对照条，旁边是"像 / 不像"。
- 所有图形代码绘制：饰品 SVG、平涂色场场景、不画五官的模特局部特写。
- 阴影只属于浮层：助手面板、弹出菜单、对话框、提示条、手机抽屉。

## Colors

一套几乎全灰的暖石灰中性色，加一个低调的铜绿做数据色，近黑承担主动作。

### Primary
- **铜绿 Verdigris**（`accent`）：额度进度条填充、"像 N / M"中的 N、选中的饰品胶囊和模特卡的 1px 描边加内描边、"像"被按下后的填充、首次使用路径的序号、键盘焦点环（2px）、珠序对照里吊坠偏差的圈注。
- **浅铜绿 Verdigris Wash**（`accent-soft`）：待拍作品条和"珠序一致"提示条的底色、选中文本的背景、强调状态胶囊的底。
- **深铜绿 Verdigris Ink**（`accent-ink`）：浅铜绿底上的文字，以及成片下"吊坠和实拍大小不一致"这类差异说明。

### Secondary
- **近黑 Studio Black**（`primary`）：主按钮、选中的气质选项胶囊、用户在助手里发出的消息气泡、提示条底色、复选框强调色。悬停变为 `primary-hover`。

### Tertiary
- **琥珀 Low-Quota Amber**（`quota-low`）：额度偏低时替换额度条的铜绿填充。只在这一个地方出现。

### Neutral
- **石灰外框 Lime Plaster**（`frame`）：侧栏、顶栏和手机抽屉的底色，也是整个窗口的底。
- **纸白 Sheet White**（`surface`）：纸面、卡片、输入框、次按钮、浮层。
- **浅井 Raised Well**（`raised`）：纸面内的凹面板（拍摄面板、设定卡分区、新建工作室栏、首次使用侧栏）、分段控件底、次按钮悬停、拖入槽底。
- **按压灰 Active Stone**（`active`）：侧栏当前项、builder 当前步骤、拍摄面板内的分段控件底。
- **外框悬停 Frame Hover**（`frame-hover`）：外框上导航项和图标按钮的悬停底。
- **纸边 Sheet Edge**（`border`）：纸面、卡片、输入框、浮层的 1px 边，表格表头下线，页签底线。
- **细分隔 Hairline Rule**（`rule`）：builder 顶栏和侧栏分隔、步骤底部分隔、表格行线、对话框底部、助手面板内分隔。
- **控件描边 Control Line**（`control`）：次按钮、选项胶囊、"像 / 不像"按钮的边，以及滚动条。
- **虚线灰 Dashed Slot**（`dashed`）：三张实拍拖入槽、生成失败格、空套图占位格的 1.5px 或 1px 虚线。
- **墨 Ink**（`text`）：正文与标题。**外框墨**（`chrome-ink`）：外框上未选中的导航和图标。**次要灰**（`muted`）：说明文字、表头、未选中步骤。**最淡灰**（`faint`）：搜索框占位、禁用文字。

### Status
- **正 / 负**（`positive`、`negative`）：语义文字色；危险按钮用 `negative` 字加 `#e9c4c4` 边。
- **不像 Unlike Blush**（`negative-line`）：被标"不像"的成片外 2px 描边，以及"不像"按下态的边。
- **状态胶囊**四组（底 / 字）：positive、negative、warning、neutral。警告提示条用 warning 底加 `pill-warning-line` 边。
- **额度轨道**（`quota-track`）：额度条的空槽。

### Drawing palette
- **珠子**：珍珠 `bead-pearl`、银 `bead-silver`、玉 `bead-jade`、琉璃 `bead-glass`。同一组色在实拍、三视图、成片、珠序条里不变。
- **金属线**（`metal-line`）：项链链条与手链圈线。
- **三视图底**（`draw-studio-bg`）、**模特肖像底**（`draw-portrait-bg`）、**实拍桌面**（`draw-table`，地面 `#cbbca4`、阴影 `#bfae94`）。

### Named Rules
**The Verdigris-Is-Data Rule.** 铜绿只用于数据和选中；任何按钮的常规填充、标题、图标都不用铜绿。主动作永远是近黑。

**The One Tone Step Rule.** 外框和纸面之间只隔一个色阶（`frame` 到 `surface`）；纸面里的凹面板再降一阶到 `raised`。不加第四层。

## Typography

**Display / Body Font:** IBM Plex Sans（拉丁和数字），中文回落到 PingFang SC、Hiragino Sans GB、Noto Sans SC、Microsoft YaHei，最后 system-ui。字重只用 400 / 500 / 600。
**Mono Font:** IBM Plex Mono，只做一件事：尺寸数字（尺寸标注图里的 "链长 42 cm"）。

**Character:** Plex 的数字和拉丁字形带一点工程刻度感，配系统黑体的中文，读起来像工作台上的标签，不像营销页。

### Hierarchy
- **Title**（600，22px，行高 28px）：纸面里每屏唯一的 h1，如"我的工作室"、工作室名。
- **Step Title**（600，20px，行高 28px）：上新 builder 每一步的题目。
- **Section**（600，16px，行高 24px）：区块标题、builder 顶栏的作品名、"这一套"。
- **Body**（400，14px，行高 20px）：正文、按钮、输入框。强调用 500（字段名、选中分段、当前导航）。
- **Small**（400，13px，行高 18px）：说明行、图注、提示条、助手里的小卡片、"像 / 不像"按钮。
- **Label**（400，12px）：表头、侧栏分组名、导航计数、状态胶囊、"AI 生成"角标；12px 是界面最小字号。
- **Mono**（400，12px，tabular-nums）：尺寸值。所有计数与金额式数字用 tabular-nums。
- 例外尺寸：品牌名 15px / 600；大按钮与拖入槽标题 15px；绘图内的"实拍 / 本张"标签 11px（SVG 内部，不属于界面文字）。

### Named Rules
**The Three Weights Rule.** 只用 400、500、600。层级靠字号和 600，不靠 700 或加大字距。

**The Mono-Means-Measure Rule.** Plex Mono 只用于尺寸数值；ID、计数、额度用 Plex Sans 的 tabular-nums。

## Layout

**桌面壳层（> 1100px）。** 两列两行网格：侧栏 228px 跨两行，顶栏 48px，二者同在石灰外框上，中间不画线。纸面贴住侧栏和顶栏，离窗口右、下各 8px（1440 宽时 228 + 1204 + 8）。侧栏内边距 12 / 10 / 16px，导航行高 34px；底部固定"生成额度"和店铺。顶栏中央是最宽 548px、高 32px 的白色搜索框（占视口一半以内），右侧是"助手"按钮。

**纸面内。** 内容区内边距 24px，最大宽 1320px。标题行最低 40px，动作靠右；标题下 4px 是说明行。统一栅格间距 24px；卡片内常用 16px，紧凑组 8 / 12px；区块之间 20 到 32px。

**各屏骨架。**
- 首页首次使用：左侧三张正方形拖入槽（正 / 侧 / 反，间距 16px），右侧 340px 浅井面板讲流程。
- 首页列表：每间工作室一行，四列（230px 场景拼图 / 名称与模特 / 拍过的饰品 / 动作），行内边距 16px，行间 16px。场景拼图是一张 172px 主图加三张 54px 小图。
- 上新 builder：52px 顶栏（下有细分隔），下面 232px 步骤侧栏加画布；画布内边距 28 / 32 / 32px，步骤内容最宽 980px，步骤底部 28px 外边距、16px 内边距的分隔脚。
- 工作室：288px 浅井拍摄面板（桌面时 sticky）加成片区；成片印样按最小 196px 自动填列，间距 16px，套与套之间 32px。
- 总资产：页签（间距 20px，2px 下划线）加表格（表头 36px，行高 64px）；成片墙最小 180px 自动填列。

**助手面板。** 固定在右侧，距顶 56px、右 16px、下 16px，宽 380px。视口 ≥ 1280px 打开时，纸面右外边距加到 404px，让出位置而不是盖住成片。

**平板（≤ 1100px）。** 外框消失：单列，顶栏 48px（菜单按钮、标题、助手）。侧栏变成 280px 左侧抽屉，从 -100% 滑入（.25s）。纸面占满，去掉圆角和侧 / 下边，只留 1px 上边。首次使用、工作室网格、选工作室网格都改为单列；工作室行变为 240px 加内容两列；拍摄面板不再 sticky。

**手机（≤ 760px）。** 隐藏搜索；纸面内边距 16px；标题行换行，动作占满一行。拖入槽保持三列、间距 8px、图示缩到 64px。builder 步骤侧栏横向滚动，只显示当前步骤名。场景格两列，成片印样两列（间距 10px）。助手面板全屏铺在顶栏下方，去圆角。工作室页把已有成片排到拍摄面板之前，底部出现贴底的拍摄条（白底、1px 上边、内边距 10 / 16px）替代面板里的大按钮；"哪里不像"弹层改为就地展开。

**动效。** 统一缓动 `cubic-bezier(.16, 1, .3, 1)`；悬停底色 .15s，按钮按下下移 1px（.1s），额度条宽度 .4s，抽屉 .25s。`prefers-reduced-motion: reduce` 时关闭所有过渡和动画。

### Named Rules
**The Work-Is-Largest Rule.** 每屏最大的元素是作品、场景或成片；控件面板宽度固定（228 / 232 / 288 / 340px），图像区吃掉剩余宽度。

**The Single Gutter Rule.** 并列的栅格共享 24px 间距；图像网格内部用 12 或 16px。不要在同一层级混用两种间距。

## Elevation & Depth

纸面系统完全扁平：外框、纸面、卡片、浅井都靠色阶和 1px 边区分，不投影。阴影只出现在浮在纸面之上的东西上，是"浮起来"的标志。

### Shadow Vocabulary
- **助手面板**（`box-shadow: 0 12px 40px rgba(0,0,0,.14)`）：唯一常驻浮层，12px 圆角。
- **弹出菜单 / 不像原因弹层**（`box-shadow: 0 8px 24px rgba(0,0,0,.12)`）：10px（菜单）或 8px（成片下的弹层）圆角。
- **对话框**（`box-shadow: 0 16px 48px rgba(0,0,0,.18)`）：12px 圆角，最宽 520px，遮罩 `rgba(19,20,22,.32)`。
- **提示条 toast**（`box-shadow: 0 8px 24px rgba(0,0,0,.18)`）：近黑底，底部居中，距底 24px。
- **手机抽屉**（`box-shadow: 0 0 40px rgba(0,0,0,.18)`）：只在抽屉打开时出现。

### Named Rules
**The Shadow-Means-Floating Rule.** 纸面、卡片、成片、面板永远无阴影；有阴影就说明它浮在纸面之上，并且可以关掉。

## Shapes

圆角按层级递增：纸面最圆，越往里越方。纸面 16px；浮层 12px（助手、对话框）、10px（弹出菜单）；卡片、输入框、成片印样容器、工作室行 8px；控件、缩略图、场景图、成片图 6px；分段控件里的选项、迷你缩略图、"AI 生成"角标 4px。可点选的选择项（气质选项、"像 / 不像"、状态胶囊）是全圆胶囊 999px；模特头像是圆形。

边线一律 1px。虚线只表达"还空着"：拖入槽 1.5px，失败格和空套图占位 1px。选中态用 1px 铜绿边加内收 2px 的 1px 铜绿描边，得到 2px 的视觉粗细而不挤动布局。

## Components

### Buttons
工具感、克制，近黑是唯一的强按钮。
- **Shape:** 6px 圆角，高 32px（大号 40px），内边距 0 14px（大号 0 18px，15px 字）。
- **Primary:** 近黑底、白字、近黑边；悬停转为 `primary-hover`。每屏最多一个，如"上新一件作品"、"拍一套 · 消耗 4 张"。
- **Secondary:** 白底、`control` 描边、墨色字；悬停 `raised` 底。
- **Ghost:** 无边无底，悬停 `raised` 底。图标按钮 32 x 32，外框色字，悬停 `frame-hover`。
- **Danger:** `negative` 字加 `#e9c4c4` 边。
- **按下:** 下移 1px。**Disabled:** `raised` 底、`border` 边、`faint` 字，禁止指针，无位移。
- **文字链接按钮:** 13px 墨色字，`control` 色下划线（偏移 3px），悬停下划线变墨色，如成片下的"下载"。

### Segmented control
- **Style:** `raised` 底、6px 圆角、2px 内边距、选项间 2px；选项高 28px、内边距 0 12px、4px 圆角、`muted` 字。
- **Active:** 白底、墨色字、500 字重、1px `border` 内描边。在拍摄面板里外层底加深到 `active`。
- 用于构图、露脸、画幅、实物图来源等二选一 / 三选一。

### Option chips
- **Style:** 全圆胶囊，高 34px，内边距 0 14px，白底，`control` 描边；小号高 28px、13px 字。
- **Selected:** 近黑底、白字（与主按钮同色，说明"这是我的选择"）。
- 用于气质问答、"哪里不像"原因、助手的快捷建议。
- **饰品胶囊**（选这次拍哪件）是另一种：40px 高、8px 圆角、左侧 30px 饰品缩略图；选中时 1px 铜绿边加内描边。**模特卡**同样的铜绿选中方式。

### Status pills
高 20px，内边距 0 8px，12px 字，全圆。四组语义色（positive / negative / warning / neutral）加一组铜绿（浅铜绿底、深铜绿字）。只表达状态，不可点。

### Cards / Containers
- **卡片:** 白底、1px `border`、8px 圆角，无阴影，内边距 16px。
- **浅井面板:** `raised` 底、8px 圆角、无边，内边距 16 到 20px。用于拍摄面板、设定卡分区、新建工作室栏、首次使用说明。设定卡里的键值行最低 36px，行间 `#ebeae5` 细线。
- **提示条:** 警告底、`pill-warning-line` 边、8px 圆角、13px 字。
- **铜绿信息条:** 浅铜绿底、8px 圆角、无边（待拍作品、珠序一致确认）。

### Inputs / Fields
- **Style:** 高 38px，白底，1px `border`，8px 圆角，内边距 0 12px。字段名在上，500 字重，间距 8px。单位（cm）以 12px `muted` 字压在输入框右侧内。
- **Focus:** 2px 铜绿描边（内收 1px）。全局 `:focus-visible` 是 2px 铜绿外环、偏移 2px。
- **拼接:** 输入框与按钮拼接时，接缝一侧圆角归零、按钮左移 1px 共用边，按钮高度跟随 38px。

### Navigation
- **侧栏:** 外框底，导航项 34px 高、6px 圆角、外框墨色字；悬停 `frame-hover`；当前页 `active` 底、墨色字、500 字重。右侧计数 12px `muted`。分组名 12px `muted`，上方 22px 间距。
- **builder 步骤:** 34px 行，8px 圆点（1.5px `control` 边）；已完成为墨色字加铜绿对勾；当前步骤 `active` 底、实心墨色圆点、500 字重。
- **页签:** 14px `muted` 字，间距 20px；选中为墨色、600 字重、2px 墨色下划线压在 1px 底线上。
- **面包屑:** `muted` 链接，悬停变墨色，带左箭头。
- **手机:** 菜单按钮打开左侧抽屉，标题居中，右侧只留一个动作（助手）。

### Contact-sheet frame（成片卡）
成片以"印样"排列，每张是一个无边的 figure，图在上、信息在下，间距 8px。
- 图：6px 圆角，1px `border`。AI 成片右下角压一个"AI 生成"角标（距边 6px，`rgba(19,20,22,.62)` 底、白色 12px 字、4px 圆角）。
- 图下依次是：珠序对照条、一致性说明（一致时 13px `muted`；不一致时深铜绿 500 字重）、图名加"像 / 不像"。
- **"像 / 不像":** 两个 28px 高的全圆按钮，`control` 边，13px 字。"像"按下为铜绿底白字；"不像"按下为负向浅红底、深红字、`negative-line` 边，同时整张图外加 2px `negative-line` 描边（偏移 1px），并在下方弹出"哪里不像"选项。
- 套头："这一套"标题、时间与配置说明，右侧"像 N / M"（N 为铜绿 600 字重）和"打包下载"。较早的套整体 92% 不透明。
- **失败格:** 正方形、1px 虚线、6px 圆角，居中写原因和"重试 · 1 张"。
- **实物图与尺寸标注图**与 AI 成片同排，无角标，带"下载"文字链接。

### Bead-sequence strip（珠序对照条）
本产品的招牌元素。
- 两行对齐：上行"实拍"、下行"本张"（11px `muted` 标签，左侧 30px 留白），珠子逐颗对齐；珍珠、玉、琉璃半径 4.6，银珠 3.4，描边 `rgba(0,0,0,.28)`；吊坠排在最后。
- 吊坠大小与实拍不一致时，在"本张"那颗吊坠外画 1.6px 铜绿圈，并在下方写出差异。
- 简化版单行珠序条高 14px，用于缩略位置。
- 珠子颜色来自同一份数据，在实拍、三视图、成片、对照条里完全一致。

### Quota meter（额度条）
侧栏底部：12px 标签"生成额度"加右侧 tabular-nums 计数；6px 高、3px 圆角的轨道（`quota-track`），铜绿填充，宽度变化 .4s；额度偏低时填充变琥珀。下方 13px `muted` 说明剩余张数。

### Floating layers（浮层）
- **助手面板:** 白底、1px 边、12px 圆角，见 Elevation。头部 1px 细分隔；消息气泡 10px 圆角，助手为 `raised` 底，用户为近黑底白字，最宽 92%；消息内的小卡片白底 1px 边 8px 圆角 13px 字；底部快捷建议用小号选项胶囊。
- **对话框、弹出菜单、toast:** 见 Elevation。菜单项 8px 内边距、6px 圆角，悬停 `raised`。

### Drawing language（绘图语言）
所有图像由代码绘制，扁平、无渐变、无纹理，统一一套。
- **饰品:** SVG，按数据里的珠序画：项链是沿二次曲线排布的珠子加最低点吊坠，手链是椭圆一圈，耳饰是 14px 半径耳圈加吊坠。吊坠有水滴、圆、叶、琉璃波纹四种形。链线 `metal-line`。侧视把宽度压到 32%，反面画扣头。同一份图形用于实拍、三视图、成片、尺寸图。
- **实拍:** 桌面色块（`draw-table`）、一道椭圆影子，饰品按视角倾斜 -6 / 9 / 4 度，模拟手机随手拍。
- **三视图:** 只换成 `draw-studio-bg` 纯色底，饰品图形不动。
- **尺寸标注图:** 白底，墨色 1px 量线和端点刻度，12px Plex Mono 写数值。
- **场景:** 大块平涂色场：墙、地面、一块平行四边形窗光（或海边场景的海平线与礁石曲线）、一件道具。冷 / 暖 / 柔三种光只对色场做 RGB 偏移。四张环境图是同一场景的四个机位（主拍摄区、左侧、右侧、远景氛围），地平线与道具位置随机位变化。
- **模特:** 只画局部特写的肤色轮廓：颈肩（项链）、手腕（手链）、耳侧（耳饰）；有发型、服装色块和一两条皮肤暗部线，不画五官。模特肖像用 `draw-portrait-bg` 底的颈肩特写。
- **AI 试戴图:** 场景机位 + 模特特写 + 同一份饰品图形叠在一起；3:4 画幅由同一画面纵向拉伸得到。

## Do's and Don'ts

### Do:
- **Do** 把工作内容放在白色纸面上：16px 圆角、1px `border`、离窗口右和下 8px、无阴影；外框用 `frame`（#f2f2f0）。
- **Do** 每屏只放一个近黑主按钮，其他用白底描边的次按钮或无框按钮。
- **Do** 只在数据和选中态使用铜绿：额度、"像"的计数、选中的饰品与模特、"像"按下、焦点环、珠序偏差圈注。
- **Do** 在每张 AI 成片下放珠序对照条和"像 / 不像"，并保留"AI 生成"角标。
- **Do** 让饰品、场景、成片占据最大面积，控件面板用固定宽度。
- **Do** 数字一律 tabular-nums，尺寸数值用 Plex Mono。
- **Do** 在 ≤ 1100px 时去掉外框，让纸面成为屏幕，顶栏只留菜单、标题、一个动作。
- **Do** 所有新图形沿用平面绘图语言：饰品出自同一份珠序数据，场景是平涂色场，模特是不画五官的局部特写。

### Don't:
- **Don't** 在侧栏和顶栏之间画分隔线，也不要给纸面、卡片、成片加阴影；阴影只给浮层。
- **Don't** 用铜绿做按钮填充、标题色、图标色块或装饰背景。
- **Don't** 使用渐变、emoji、带色底的图标块、小号全大写标签或 01 / 02 式编号。
- **Don't** 在纸面里再套第四层容器：外框、纸面、卡片（或浅井）就是全部层级。
- **Don't** 让卡片描边比纸面更重：卡片和纸面同用 `border`，`control` 只给可交互控件。
- **Don't** 引用外部图片或用别人的饰品照片充当成片；也不在界面上写"此图为示意"。
- **Don't** 给模特画五官，或改动饰品图形来"美化"成片：饰品图形只能出自珠序数据。
- **Don't** 用 700 字重或小于 12px 的界面文字。
