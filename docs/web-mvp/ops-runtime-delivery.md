# 快闻 Web MVP 运行交付方案

## 运行结论

KIN-17 已完成运行方案：本地开发、CI/CD、预发/生产部署、迁移、备份、回滚、监控告警和运行风险。真实落地仍需要工程实现、部署平台、密钥管理和生产环境确认。

## 环境

| 环境 | 目的 |
| --- | --- |
| local | 本地开发与 mock/seed 验证。 |
| ci | 自动化质量门禁。 |
| staging | 预发、迁移演练、发布/回滚演练、真实验收。 |
| production | 生产服务，仅在 P0/P1 清零、回滚路径明确后发布。 |

## 组件

- web
- worker
- PostgreSQL
- Redis
- 对象存储
- 监控与告警栈

## CI/CD

质量门禁：

1. install
2. typecheck
3. lint
4. test
5. build
6. 安全扫描或可替代检查

发布流程：

1. build
2. deploy-staging
3. verify-staging
4. promote-production（人工审批）
5. deploy-production（canary 或 blue-green）
6. verify-production

## 健康检查

- `/healthz`：进程存活。
- `/readyz`：数据库、缓存、worker 依赖可用。
- worker synthetic job：验证队列、索引、下架清理等后台链路。

## 备份与恢复

- PostgreSQL 每日全量 + WAL，支持 PITR。
- 原始抓取数据保留不少于 180 天。
- 审核日志、投诉材料、下架/恢复记录保留不少于 2 年。
- RPO <= 15 分钟。
- RTO <= 60 分钟（读路径），<= 120 分钟（全量 worker）。

## 回滚

- 应用回滚：保留 N-1 工件，命中错误率/延迟护栏立即回切。
- 数据回滚：优先 forward-fix；破坏性失败走快照恢复 + 受控回切。
- 演练：每月在 staging 演练迁移失败恢复、队列回放、索引重建和下架 purge 校验。

## 告警

| 等级 | 响应 |
| --- | --- |
| P0 | 立即响应。 |
| P1 | 30 分钟内响应。 |
| P2 | 工作时段处理。 |

核心 SLI/SLO：可用性、p95 延迟、审核到发布时延、采集滞后、索引滞后、队列积压、5xx 比例、下架传播时延、埋点接收率。
