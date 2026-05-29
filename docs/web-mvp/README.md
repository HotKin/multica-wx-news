# 快闻 Web MVP 资料索引

本目录同步 Multica issue 中已经完成的快闻 Web MVP 阶段性交付物。当前仓库本身是微信小程序项目，因此 Web MVP 资料独立放在 `docs/web-mvp/`、`sdd/`、`openspec/` 和 `docs/project-memory/`，避免覆盖既有小程序规格。

## 已同步资料

| 资料 | 文件 | 来源 |
| --- | --- | --- |
| 产品上下文与 MVP 范围 | [product-context.md](product-context.md) | KIN-15、KIN-20 |
| 技术上下文与系统边界 | [technical-context.md](technical-context.md) | KIN-19、KIN-22 |
| 安全与合规审查 | [security-review.md](security-review.md) | KIN-14、KIN-22 |
| 工程实现计划与骨架交付 | [implementation-plan.md](implementation-plan.md) | KIN-16 |
| 验收计划与测试矩阵 | [test-plan.md](test-plan.md) | KIN-13 |
| 运行交付方案 | [ops-runtime-delivery.md](ops-runtime-delivery.md) | KIN-17 |
| 环境变量与密钥边界 | [runtime-env-vars.md](runtime-env-vars.md) | KIN-17 |
| OpenSpec 变更包 | [../../openspec/README.md](../../openspec/README.md) | KIN-21、KIN-22 |
| 文档索引与决策日志 | [../project-memory/document-index.md](../project-memory/document-index.md) | KIN-18 |

## 当前阶段结论

- 首轮 SDD、产品澄清、OpenSpec、知识沉淀、工程骨架、验收矩阵和运行方案已完成。
- 当前进入实现补全阶段：数据层、RBAC、审核发布下架闭环、公开阅读体验联调、安全复核、运行落地和真实应用验收还需继续推进。
- 真实内容上线仍被业务/法务资料阻塞：真实来源清单、授权材料、投诉联系人、紧急责任人、统计/错误上报供应商和生产运行配置未最终确认。

## 最新产品口径

- 微信登录入口先不实现。
- 收藏能力保留接口边界，不再按“仅本地收藏”作为长期实现口径。
- 新闻来源按第三方数据爬取来源池推进，真实来源上线前必须配置来源条目、授权/可展示字段、原文链接规则、投诉联系人和停用规则。
- 内容流程为抓取入库、标准化/去重、自动审核、人工审核、系统立即/定时/批量发布。
- 原始抓取数据保留不少于 180 天；审核日志、投诉材料、下架/恢复记录保留不少于 2 年。
- 专题、热榜、搜索、分享和指标埋点均属于 MVP 规格范围。
