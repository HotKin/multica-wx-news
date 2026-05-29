# bootstrap-news-web-foundation Spec Delta

## Requirements

### Requirement: 可启动工程基础

系统必须提供本地启动、构建、类型检查、lint、测试和统一验证入口。

#### Scenario: 执行统一验证

- When 开发者执行 `verify`
- Then 类型检查、lint、测试和构建均被执行
- And 任一失败都会使验证失败

### Requirement: 健康检查

系统必须提供 liveness 和 readiness 检查。

#### Scenario: 依赖不可用

- Given 数据库或缓存不可用
- When 访问 `/readyz`
- Then 返回非健康状态
- And `/healthz` 仍可反映进程是否存活

### Requirement: 迁移可回滚

所有 schema 变更必须有 migration 和回滚或 forward-fix 说明。
