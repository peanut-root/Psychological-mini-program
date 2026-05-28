# 心屿心理科普小程序

「心屿」是一个微信原生小程序，用于心理健康科普、初步自助记录、文献阅读、就诊准备与医院推荐。项目已从早期 HTML/Tailwind 原型迁移为小程序形态，当前运行载体仅为微信小程序。

## 技术说明

- 无 `package.json`、无 npm 构建链，使用微信开发者工具导入项目即可编译预览。
- 全局入口为 `app.js`、`app.json`、`app.wxss`。
- 页面开发使用 `.wxml`、`.wxss`、`.js`、`.json` 四件套。
- 尺寸单位统一使用 `rpx`。
- 主题与背景相关样式见 `styles/theme.wxss`。
- 已开启组件懒加载：`app.json` 中配置 `"lazyCodeLoading": "requiredComponents"`。

## 预览方式

1. 打开微信开发者工具。
2. 导入本目录，也就是包含 `app.json` 的项目根目录。
3. 使用正式 AppID 或测试号 AppID。
4. 点击「编译」或保存文件触发自动编译。
5. 若体检结果仍显示旧状态，先「清缓存并编译」，再点击 Code Quality 的「Rescan」。

更详细的预览步骤见 `预览说明.md`。

## 主要页面与流程

- 首次引导：`pages/splash/splash` → `pages/splash2/splash2`
- 首页：`pages/home/home`
- 搜索：`pages/search/search`
- 科普主页：`pages/science/science`
- 疾病专题：`pages/depression`、`pages/anxiety`、`pages/bipolar`、`pages/ocd`、`pages/somatic`、`pages/adhd`
- 文献资料库：`pages/literature/literature`
- 文献详情：`pages/literature-detail/literature-detail?id=1..11`
- 就诊指南入口：`pages/guide/guide`
- 就诊流程文字页：`pages/visit-process/visit-process`
- 医院推荐：`pages/hospital/hospital`
- 诊前背书：`pages/endorsement/endorsement`
- 我的就诊背书：`pages/endorsement-result/endorsement-result`
- AI 助手：`pages/ai/ai` 与 `components/floating-ball/floating-ball`
- 其他工具：`pages/rescue`、`pages/scale`、`pages/game`、`pages/treehole`、`pages/diary`、`pages/weather`

完整页面清单以 `app.json` 的 `pages` 数组为准。

## 就诊指南模块

`pages/guide/guide` 保留三个入口卡片：

- 医院推荐：跳转到 `pages/hospital/hospital`
- 就诊背书：跳转到 `pages/endorsement/endorsement`
- 就诊流程介绍：跳转到 `pages/visit-process/visit-process`

`pages/visit-process/visit-process` 是白底文字页，包含：

- 就诊流程步骤
- 就诊前准备清单
- 可以如何向医生表达
- 看诊后注意事项
- 紧急情况提醒

页面文本使用少量 emoji 做提示，但主要内容仍以文字说明为主。

## 医院推荐模块

`pages/hospital/hospital` 展示各地区推荐机构，包含综合性医院与专科医院两类。顶部「推荐机构」区域已调整为全宽卡片样式，并保留地区选择器。

位置跳转使用 `wx.openLocation`，医院数据维护在 `pages/hospital/hospital.js` 的 `hospitalData` 中。

## 文献资料库

列表页：`pages/literature/literature`

通用详情页：`pages/literature-detail/literature-detail`

文献共 11 篇，覆盖：

| id | 主题 |
| --- | --- |
| 1 | 抑郁症 |
| 2 | 焦虑症 |
| 3 | 双相情感障碍 |
| 4 | 强迫症 |
| 5 | 创伤后应激障碍 |
| 6 | 精神分裂症 |
| 7 | 注意缺陷多动障碍 |
| 8 | 物质使用障碍 |
| 9 | 特定恐惧症 |
| 10 | 躯体化障碍 |
| 11 | 性欲倒错 |

点赞、评论与评论点赞使用本地存储，键名形如 `literature:article:{id}:*`。

## 资源与审核体检

为通过微信开发者工具 Code Quality 检查，当前项目做了以下处理：

- 主包估算约 `0.60MB`，低于 `1.5MB`。
- 项目内运行图片均低于 `200KB`。
- `images/bg-main.jpg` 为压缩后的背景图。
- `images/floating-ball-icon.png` 为压缩后的悬浮球图标。
- `project.config.json` 已开启代码压缩、WXML/WXSS 压缩、未使用文件忽略。
- `.gitignore` 已忽略 `.venv/`、PDF、docx、截图等非运行资源。

审核外资料已移到项目目录外的备份目录：

`/Users/peanut/Documents/PH IEP/11 上/心理小程序审核外备份-20260528-200045`

## 重要约束

- 不要把大图、PDF、Word 文档、截图或虚拟环境放回小程序项目根目录。
- 图片资源统一放在 `images/`，并保持单个图片小于 `200KB`。
- 页面文字与注释保持简体中文。
- 新增页面后必须在 `app.json` 注册路径。
- 新增主内容页时优先复用 `styles/theme.wxss` 与现有页面结构。

## 当前维护状态

- 旧版根目录 HTML 原型已不再作为运行入口。
- 日常修改以 `pages/`、`components/`、`utils/`、`styles/`、`images/` 为主。
- 如模拟器显示旧内容，优先在微信开发者工具中执行「清缓存并编译」。
