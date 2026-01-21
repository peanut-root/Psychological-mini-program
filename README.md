# 心屿心理科普小程序

这是一个心理科普类微信小程序，从HTML网页版本转换而来。

## 项目结构

```
├── app.js              # 小程序入口文件
├── app.json            # 小程序全局配置
├── app.wxss            # 小程序全局样式
├── sitemap.json        # 站点地图配置
├── project.config.json # 项目配置文件
└── pages/              # 页面目录
    ├── index/          # 首页
    ├── search/         # 搜索页
    ├── my-page/        # 我的页面（TabBar）
    ├── science/        # 科普页（TabBar）
    ├── scale/          # 量表页（TabBar）
    ├── interaction/    # 互动页（TabBar）
    └── ...             # 其他页面
```

## 主要功能

1. **首页**：展示救助电话、量表、科普内容、互动功能等
2. **心理科普**：心理健康知识科普
3. **量表测评**：SCL-90等心理测评工具
4. **互动功能**：AI助手、治愈游戏、心情树洞
5. **我的**：个人信息、日志管理

## 页面列表

- 首页 (index)
- 搜索 (search)
- 个人信息 (user-info)
- 救助电话 (rescue)
- 心情日志 (diary)
- 天气日记 (weather)
- 心理科普 (science) - TabBar
- 量表 (scale) - TabBar
- 互动中心 (interaction) - TabBar
- 我的 (my-page) - TabBar
- 疾病相关：抑郁症、焦虑症、双相、强迫症、躯体化、ADHD
- AI助手、游戏、树洞
- 文献列表及详情页

## 使用说明

1. 使用微信开发者工具打开此项目
2. 在 `project.config.json` 中配置你的 `appid`
3. 编译运行

## 注意事项

- TabBar图标需要准备对应的图片文件放在 `images/` 目录下
- 部分功能需要配置服务器接口
- 样式已从Tailwind CSS转换为标准CSS，使用rpx单位适配小程序

## 转换说明

本项目从HTML网页版本转换而来，主要变更：
- HTML标签转换为小程序WXML标签
- Tailwind CSS类转换为WXSS样式
- JavaScript逻辑适配小程序API
- 页面路由改为小程序导航方式

