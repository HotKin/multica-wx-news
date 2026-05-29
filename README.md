# multica-wx-news

新闻微信小程序

## 产品文档

- [Product Spec — 产品需求规格](docs/ProductSpec.md)
- [Web MVP 资料索引](docs/web-mvp/README.md)
- [Project Memory — 项目决策与文档索引](docs/project-memory/document-index.md)
- [OpenSpec 变更包索引](openspec/README.md)

## 项目结构

```
.
├── app.js                  # 小程序入口
├── app.json                # 全局配置（页面路由、导航栏、下拉刷新、分享等）
├── app.wxss                # 全局样式
├── sitemap.json            # 站点地图
├── project.config.json     # 项目配置
├── data/
│   └── categories.js       # 分类枚举与映射
├── mock/
│   └── news.js             # Mock 新闻数据（≥12 条，覆盖 6 个分类）
├── services/
│   └── news.js             # 新闻 API 服务层
├── utils/
│   ├── format.js           # 时间格式化等工具函数
│   └── storage.js          # 本地缓存辅助
├── pages/
│   ├── index/              # 首页
│   └── detail/             # 详情页
├── components/             # 公共组件（预留）
└── assets/                 # 静态资源（预留）
```

## downloadFile 白名单说明

本项目封面图及正文图片使用 `picsum.photos` 占位图服务。在微信开发者工具或真机预览前，需在「小程序管理后台 → 开发管理 → 开发设置 → 服务器域名」的 **downloadFile 合法域名** 中添加：

```
https://picsum.photos
```

否则图片预览/下载时会出现「无法下载」错误。

## 技术约束

- 原生 JavaScript，不引入 TypeScript
- 不引入第三方 UI 框架
- 微信基础库版本 ≥ 3.3.0
