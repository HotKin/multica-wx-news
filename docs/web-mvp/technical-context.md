# 快闻 Web MVP 技术上下文

## 技术结论

快闻 Web MVP 按“公开 Web 展示 + 内容运营后台 + 采集/审核/发布后台任务 + 搜索/统计支撑”的边界推进。推荐单体优先，前台、后台管理与 API/BFF 共用一个 TypeScript 代码库；采集、索引、统计聚合使用独立 worker 入口。

## 系统边界

| 边界 | 职责 |
| --- | --- |
| Public Web | 首页、频道、详情、热榜、专题、搜索、分享、SEO、响应式阅读体验。 |
| Admin | 来源、文章、审核、发布、下架、专题、热榜、推荐位、统计与审计。 |
| API/BFF | 前后台接口契约、鉴权、RBAC、状态校验、审计写入。 |
| Worker | 第三方抓取、标准化、自动审核、搜索索引、热榜快照、统计聚合、缓存/索引清理。 |
| DB | 权威数据源，保存原始抓取、标准化文章、审核、投诉、下架、审计和统计。 |
| Cache/CDN | 公开页面和接口的可再生读模型；下架/投诉必须可强制失效。 |

## 数据流

1. Source 配置启用。
2. 定时/手动 FetchBatch 抓取第三方新闻和可用热榜。
3. RawFetchItem 标准化、去重并进入 Article。
4. 自动审核输出风险等级和命中原因。
5. 人工审核通过、驳回、退回修改、下架或恢复。
6. 系统立即/定时/批量发布已人工通过内容。
7. 发布触发搜索索引、热榜/专题引用、缓存和 sitemap 更新。
8. 前台展示公开读模型。
9. 匿名事件进入统计聚合；后台操作写审计。
10. 投诉/下架触发详情、搜索、热榜、专题、推荐位、收藏打开结果、缓存和 sitemap 清理。

## 核心模型

- Source、SourcePolicy、SourceDisplayField、ComplaintContact
- RawFetchItem、FetchBatch、Article、ArticleRevision
- AutoAuditResult、ManualReviewTask、PublishJob
- Complaint、TakedownRecord、RestoreRecord
- Channel、Topic、TopicArticle、HotRankSnapshot、RecommendationSlot
- Favorite、AnalyticsEvent、StatsAggregate
- AdminUser、Role、AuditLog、WorkerJob、OutboxEvent

## API 边界

公开 API 建议使用 `/api/v1`：

- `GET /channels`
- `GET /articles`
- `GET /articles/{slug}`
- `GET /hot-ranks`
- `GET /topics`
- `GET /topics/{slug}`
- `GET /search?q=`
- `POST /events`
- `GET/POST/DELETE /me/favorites`

后台 API 建议使用 `/api/admin/v1`，覆盖 sources、fetch-batches、articles、reviews、publish-jobs、channels、topics、hot-ranks、recommendation-slots、complaints、takedowns、audit-logs、stats。

健康检查：

- `GET /healthz`
- `GET /readyz`

## 缓存与一致性

- 首页、频道、热榜、专题使用短 TTL 或发布事件 revalidate。
- 详情页可长缓存，但下架/投诉必须强制失效。
- 搜索结果短缓存或不缓存。
- 后台接口禁用共享缓存。
- 发布、下架、恢复、推荐位、热榜和专题配置必须通过事务或 outbox 保证数据库状态与索引/缓存刷新最终一致。

## 迁移与回滚

- 所有 schema 变更必须配套 migration、rollback 或 forward-fix 说明。
- 发布/下架/恢复/索引/缓存/sitemap 任务必须幂等可重放。
- 高风险配置保留 before/after、原因和 rollback_ref。
- 停用来源不删除历史追溯数据。

## 工程状态

KIN-16 已报告 Next.js 16 + React + TypeScript Web MVP 工程骨架，包括公开页面、只读后台契约、健康检查、领域类型、mock、埋点事件校验和基础测试。但当前 workspace 可 checkout 的远程仓库是 `HotKin/multica-wx-news`，因此本次仅同步完成资料，不迁移未在当前仓库可见的应用代码。
