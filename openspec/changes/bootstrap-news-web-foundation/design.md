# bootstrap-news-web-foundation Design

## 架构

采用单体优先：

- Public Web、Admin、API/BFF 共用一个 TypeScript 代码库。
- Worker 独立入口，处理抓取、审核任务、索引、统计和清理。
- DB 是权威数据源，cache/CDN 和搜索索引是可重建读模型。

## 运行约束

- `healthz` 只验证进程存活。
- `readyz` 验证 DB、Redis、worker 依赖。
- 生产环境不允许使用 mock 来源或本地 secret。

## 迁移约束

- expand/contract 优先。
- 破坏性 DDL 需要审批和备份。
- 迁移失败优先 forward-fix。
