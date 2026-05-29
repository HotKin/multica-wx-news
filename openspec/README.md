# OpenSpec 变更包索引

本目录同步快闻 Web MVP 已完成的 OpenSpec 资料。每个变更包包含：

- `proposal.md`：变更目的、范围和验收前置。
- `design.md`：设计边界、数据/接口/权限/运行约束。
- `tasks.md`：可执行任务清单。
- `spec.md`：规格增量和验收要求。

## 变更包

| 变更包 | 目的 |
| --- | --- |
| [bootstrap-news-web-foundation](changes/bootstrap-news-web-foundation/proposal.md) | 工程骨架、文档目录、CI、迁移框架、健康检查和可观测性。 |
| [news-source-compliance](changes/news-source-compliance/proposal.md) | 来源条目、授权、可展示字段、原文链接、投诉联系人和停用规则。 |
| [content-review-publish-takedown](changes/content-review-publish-takedown/proposal.md) | 内容状态机、自动审核、人工审核、发布、投诉下架和恢复。 |
| [admin-rbac-audit](changes/admin-rbac-audit/proposal.md) | 后台角色、权限矩阵、高风险操作理由和审计。 |
| [public-news-reading-experience](changes/public-news-reading-experience/proposal.md) | 首页、频道、详情、热榜、专题、搜索、分享、收藏接口和 SEO。 |
| [privacy-analytics-logging](changes/privacy-analytics-logging/proposal.md) | 埋点、指标、日志脱敏、留存周期和第三方 SDK 边界。 |
| [abuse-protection-search-share-crawler](changes/abuse-protection-search-share-crawler/proposal.md) | 搜索、分享、采集、外链媒体和富文本安全防护。 |

## 阶段判断

这些变更包已经足够支撑 mock/沙箱实现和工程补全；真实内容上线仍需业务/法务确认真实来源、授权材料、投诉联系人、统计/错误上报供应商和生产运行配置。
