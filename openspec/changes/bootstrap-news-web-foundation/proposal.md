# bootstrap-news-web-foundation Proposal

## 目的

在已有仓库上补齐 Web MVP 的工程基础、SDD/OpenSpec 文档目录、CI、迁移框架、环境变量模板、健康检查、日志和错误边界。

## 范围

- Web 应用骨架。
- API/BFF 和 worker 入口。
- 数据迁移框架。
- 本地、CI、staging、production 配置约束。
- 基础验证命令。

## 非范围

- 真实第三方来源接入。
- 生产密钥和部署平台配置。
- 未经业务/法务确认的真实内容上线。

## 验收

- 仓库有清晰目录、启动命令、验证命令、环境变量样例和健康检查。
- CI 可执行 install、typecheck、lint、test、build。
- 所有 schema 变更有 migration 和回滚或 forward-fix 说明。
