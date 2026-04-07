# 心屿心理科普小程序

基于微信原生小程序开发的「心屿」心理健康科普应用，界面与内容由早期 HTML/Tailwind 原型迁移而来；**当前唯一运行载体为小程序**（仓库内已无遗留 `.html` 页面）。

## 技术说明

- 无 `package.json`、无 npm 构建链，使用**微信开发者工具**打开项目即可编译预览。
- 全局入口：`app.js`、`app.json`、`app.wxss`。
- 尺寸单位统一使用 `rpx`；主题色见 `styles/theme.wxss`。

## 启动与预览

1. 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. 导入本项目目录，可使用测试号 AppID。
3. 保存代码后 IDE 会自动编译；可用「预览」扫码在真机查看。

更详细的步骤见根目录 `预览说明.md`。

## 导航与主要流程

- **引导**：`pages/splash` → `pages/splash2`（首次启动；本地 `hasOnboarded` 控制是否跳过）。
- **主页**：`pages/home`（根据引导选择的关注领域个性化展示）。
- **底部 Tab 相关**：科普、量表、互动、我的等页面以 `app.json` 中注册顺序为准。

## 文献资料库（白皮书体例正文）

列表页：`pages/literature/literature`  
详情页：`pages/literature-detail/literature-detail`（通过 `?id=` 区分文章）

文献列表共 **11** 篇，支持顶部分类筛选（全部、抑郁症、焦虑症、双相情感障碍、强迫症、创伤应激、精神分裂症、注意缺陷多动障碍、物质滥用、恐惧症、**躯体化障碍**、**性欲倒错**）。

| id | 标题（列表展示） | 说明 |
|----|------------------|------|
| 1 | 抑郁症 | 病名、俗称、症状、DSM-5、治疗、误解澄清、病例等 |
| 2 | 焦虑症 | 同上结构（广泛性焦虑等） |
| 3 | 双相情感障碍 | DSM-5 分型与治疗 |
| 4 | 强迫症 | DSM-5、ERP/药物等 |
| 5 | 创伤后应激障碍 | PTSD 症状与诊断要点 |
| 6 | 精神分裂症 | ICD-11 要点 |
| 7 | 注意缺陷多动障碍 | DSM-5 |
| 8 | 物质使用障碍 | ICD-11 核心症状与分级 |
| 9 | 特定恐惧症 | 含「小众疾病分享」延伸阅读 |
| 10 | 躯体化障碍 | DSM-5 躯体症状障碍 |
| 11 | 性欲倒错 | 诊断与治疗原则（科普向） |

详情页内**点赞数、评论列表**使用本地存储键 `literature:article:{id}:*` 持久化，进入页面会刷新显示。

另保留独立模板页（若从其它入口跳转）：`pages/literature-detail-1`～`literature-detail-3`，与列表主路径可能不同，日常以 `literature-detail?id=` 为准。

## 其他功能模块（节选）

- 疾病专题页：`pages/depression`、`anxiety`、`bipolar`、`ocd`、`somatic`、`adhd` 等。
- 工具与互动：`pages/ai`、`game`、`treehole`、`diary`、`weather`、`search`、`rescue` 等。
- 医院与背书：`pages/hospital`、`endorsement`、`endorsement-result`。

完整页面清单以 `app.json` 的 `pages` 数组为准。

## 资源与约束

- 图片与图标放在 `images/`。
- UI 与注释保持**简体中文**。

## 仓库维护说明

历史上曾保留与小程序页面同名的根目录 `.html` 作为旧版预览，已与小程序重复且易混淆，**已全部删除**。后续修改请以 `pages/` 下 `.wxml` / `.wxss` / `.js` / `.json` 为准。
