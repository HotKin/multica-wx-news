# 主流新闻汇集微信小程序 — SDD 技术方案设计

---

## 技术结论

| 项 | 结论 |
|---|---|
| 技术栈 | 微信小程序原生框架（WXML + WXSS + JS），不使用第三方 UI 框架 |
| 状态管理 | 页面级 data + 少量全局状态（当前分类、列表滚动位置），无需引入 Redux/Mobx 类库 |
| 数据层 | MVP 阶段本地 mock；通过统一的 `apiService` 封装，预留切换至真实 HTTP API 的扩展点 |
| 图片策略 | 使用 `wx.previewImage` 实现详情页图片预览；封面图使用 `mode="aspectFill"` |
| 分享能力 | 利用小程序原生 `onShareAppMessage` + `onShareTimeline` 实现 |
| 分页策略 | 前端基于 mock 数组做 slice 分页，接口层保留 `page` / `pageSize` 语义 |
| 异常处理 | 统一错误码 + Toast / 占位 UI 分层提示，网络异常提供重试入口 |

---

## 对应 Product Spec

- [主流新闻汇集微信小程序 — Product Spec](ProductSpec.md)
- 覆盖范围：MVP 阶段全部 P0 功能（首页、详情页、mock 数据、分享、图片预览、下拉刷新、上拉加载）

---

## 总体方案

### 架构分层

```
┌─────────────────────────────────────────┐
│  页面层 (Pages)                          │
│  ├─ pages/index/index    (首页)          │
│  └─ pages/detail/detail  (详情页)        │
├─────────────────────────────────────────┤
│  组件层 (Components)                     │
│  ├─ news-card        新闻列表项卡片      │
│  ├─ category-tabs    横向分类标签栏      │
│  ├─ carousel         轮播图              │
│  ├─ empty-state      空状态占位          │
│  └─ loading-tip      加载/无更多提示     │
├─────────────────────────────────────────┤
│  服务层 (Services)                       │
│  └─ services/api.js  数据接口封装        │
├─────────────────────────────────────────┤
│  工具层 (Utils)                          │
│  ├─ utils/constants.js   常量/配置       │
│  ├─ utils/format.js      格式化工具      │
│  └─ utils/storage.js     本地缓存辅助    │
└─────────────────────────────────────────┘
```

### 页面与路由

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/pages/index/index` | tabBar 首页，默认入口 |
| 详情页 | `/pages/detail/detail?id={newsId}` | 非 tabBar 页，新闻详情 |

### 目录结构（建议）

```
miniprogram/
├── app.js
├── app.json
├── app.wxss
├── pages/
│   ├── index/
│   │   ├── index.js
│   │   ├── index.wxml
│   │   ├── index.wxss
│   │   └── index.json
│   └── detail/
│       ├── detail.js
│       ├── detail.wxml
│       ├── detail.wxss
│       └── detail.json
├── components/
│   ├── news-card/
│   ├── category-tabs/
│   ├── carousel/
│   ├── empty-state/
│   └── loading-tip/
├── services/
│   └── api.js
├── utils/
│   ├── constants.js
│   ├── format.js
│   └── storage.js
└── data/
    └── mock-news.js      # MVP mock 数据源
```

---

## 影响范围

| 范围 | 影响描述 |
|------|---------|
| 新建文件 | 全部从零搭建，无存量代码侵入风险 |
| 后端依赖 | MVP 阶段零后端依赖；v1.0 接入真实 API 时仅需替换 `services/api.js` 实现 |
| 微信能力 | 需开启 `shareAppMessage`、`previewImage`、`pullDownRefresh` 等基础能力 |
| 性能 | 列表数据量小（mock 8 条），无长列表优化强需求；但分页 slice 逻辑需预留虚拟列表扩展 |

---

## API 变化

### 数据服务层接口（`services/api.js`）

```javascript
// 统一返回 Promise<{ list, hasMore }>
function fetchNewsList({ category, page = 1, pageSize = 10 })

// 返回 Promise<NewsItem | null>
function fetchNewsDetail(id)

// 返回 Promise<NewsItem[]>  — 用于轮播图取最新 N 条
function fetchTopNews({ limit = 5 })
```

### 数据模型

```typescript
interface NewsItem {
  id: string;              // 唯一标识
  title: string;           // 标题，≤50 字
  summary: string;         // 摘要，≤100 字
  content: string;         // 正文（MVP 为纯文本分段，段落以 \n 分隔）
  coverImage: string;      // 封面图 URL
  images?: string[];       // 正文图片 URL 数组（可选）
  category: Category;      // 分类枚举
  source: string;          // 来源
  publishTime: string;     // ISO 8601 时间字符串
}

type Category = 'all' | 'tech' | 'intl' | 'finance' | 'domestic' | 'sports' | 'education';
```

---

## 数据变化

| 数据 | MVP 方案 | 后续演进 |
|------|---------|---------|
| 新闻列表 | `data/mock-news.js` 本地静态数组，`services/api.js` 做 slice 模拟分页 | 替换为 HTTP 请求真实 API |
| 轮播图数据 | 从 mock 数组中取 `publishTime` 最新的前 3 条 | 接入运营配置接口或编辑置顶接口 |
| 首页状态 | 页面级 data（currentCategory、newsList、page、hasMore、isRefreshing） | 如后续增加多页面状态同步，可引入简易全局状态管理 |
| 详情页状态 | 页面级 data（newsDetail、error） | 如需浏览历史/收藏，引入 `storage.js` 做本地持久化 |

---

## 状态流

### 首页数据流

```
用户操作（下拉/上拉/切换分类）
    ↓
页面事件处理（onPullDownRefresh / onReachBottom / onTabChange）
    ↓
调用 api.fetchNewsList({ category, page })
    ↓
Mock 层 slice 返回数据
    ↓
setData 更新列表状态
    ↓
UI 渲染（wx:for 列表 / 空状态 / 加载提示）
```

### 详情页数据流

```
onLoad 接收 options.id
    ↓
调用 api.fetchNewsDetail(id)
    ↓
setData 更新详情状态
    ↓
渲染标题、来源时间、正文、图片
    ↓
用户点击图片 → wx.previewImage({ urls, current })
    ↓
用户点击分享 → onShareAppMessage 返回 title + imageUrl
```

---

## 前端任务

| 任务 | 输入 | 输出 | 验收标准 |
|------|------|------|---------|
| **F1: 项目初始化** | SDD | 完整小程序目录结构、`app.json` 配置 | 微信开发者工具可正常编译运行 |
| **F2: 首页开发** | Product Spec 首页交互要求 | `pages/index` + `category-tabs` + `carousel` + `news-card` + `loading-tip` + `empty-state` | 分类切换、下拉刷新、上拉加载、轮播、空状态均按 Spec 交互验收通过 |
| **F3: 详情页开发** | Product Spec 详情页交互要求 | `pages/detail` | 标题/正文/图片渲染正确，图片预览、返回、分享均正常 |
| **F4: Mock 数据与 API 层** | 数据模型定义 | `data/mock-news.js` + `services/api.js` | 至少 8 条数据覆盖 6 分类，接口返回格式符合数据模型定义 |
| **F5: 工具函数** | 格式化需求 | `utils/format.js`（时间格式化）、`utils/constants.js`（分类映射） | 时间显示相对/绝对格式正确，分类常量完整 |
| **F6: 适配与体验优化** | 常见机型列表 | 样式适配 | iPhone SE ~ iPhone 15 Pro Max 各尺寸显示正常，首屏加载 ≤2 秒 |

---

## 后端任务

MVP 阶段 **无后端任务**。所有数据由前端 mock 提供。

v1.0 接入真实数据源时，后端需：
1. 提供新闻聚合服务（RSS / API 抓取 / CMS）
2. 提供 REST API：`GET /news`（列表分页）、`GET /news/:id`（详情）
3. 图片托管（CDN）

> 当前 SDD 阶段不涉及后端任务拆分，待 v1.0 Product Spec 确认后补充。

---

## 测试建议

| 测试类型 | 范围 | 方法 |
|---------|------|------|
| **功能测试** | 首页/详情页全部交互 | 微信开发者工具真机模拟 + 预览二维码真机测试 |
| **兼容性测试** | iOS / Android 不同基础库版本 | 开发者工具「基础库版本」切换，覆盖 2.30+ 和 3.0+ |
| **异常测试** | 网络断开、加载超时、图片失败 | 开发者工具「网络模拟」断网 / 弱网，验证各异常提示和重试 |
| **性能测试** | 首屏加载时间、列表滚动流畅度 | 开发者工具 Performance 面板，确认首屏 ≤2s、无掉帧 |
| **分享测试** | 好友分享 / 朋友圈分享 | 真机预览，验证分享卡片信息和跳转链路 |

---

## 风险

| 风险项 | 等级 | 说明 | 应对策略 |
|--------|------|------|---------|
| **Product Spec 待确认项影响实现** | 中 | Q3（正文是否富文本）直接影响详情页渲染方案 | 当前 SDD 假设 MVP 用纯文本 + 图片分段；若产品确认需富文本，需引入 wxParse / rich-text 组件，工期 +1~2 天 |
| **图片域名白名单** | 低 | 小程序要求下载域名配置白名单，mock 图片使用外部 URL 可能无法加载 | 使用微信开发者工具「不校验合法域名」开发；发布前确认图片域名已加入 `downloadFile` 白名单 |
| **长列表性能** | 低 | MVP 仅 8 条数据无压力，但分页逻辑需预留长列表扩展 | `news-card` 组件设计时保持轻量，避免复杂嵌套；后续数据量大时引入 `recycle-view` |
| **v1.0 API 迁移成本** | 低 | mock 层与真实 API 数据结构需保持一致 | `services/api.js` 作为唯一数据出口，严格按数据模型定义返回，迁移时仅替换内部实现 |

---

## 待确认问题

| 序号 | 问题 | 影响 | 建议 |
|------|------|------|------|
| **D1** | 新闻正文是否需要富文本渲染（HTML 解析）？ | 详情页实现方案、工期 | **建议 MVP 先用纯文本 + 图片分段**，成本最低；若需富文本，需引入 `rich-text` 或第三方解析库 |
| **D2** | 轮播图内容规则是否确认为「自动取最新 3 条」？ | `fetchTopNews` 逻辑 | 当前 SDD 按最新 3 条实现；若需人工配置，需新增运营配置接口 |
| **D3** | mock 图片 URL 来源？使用占位图服务还是自行托管？ | `downloadFile` 白名单配置、图片加载稳定性 | 建议开发阶段使用 `https://picsum.photos` 或类似占位图服务；发布前替换为稳定 CDN |
| **D4** | 是否使用 TypeScript？ | 项目初始化方案、类型安全 | 建议不用 TS，项目规模小，JS 足够；若团队有 TS 规范，可切换为 TS 模板，工期无显著差异 |

---

*本 SDD 基于 Product Spec MVP 阶段编制，后续版本功能以独立 Spec 或变更记录形式补充后更新 SDD。*
