# 快闻 Web MVP 环境变量与密钥边界

## 原则

- 真实密钥只允许通过 Secret Manager 注入。
- 禁止把密钥写入仓库、日志、issue 评论、测试快照或客户端 bundle。
- `.env.example` 只能包含占位符。
- 不同环境使用独立密钥和回调域名。

## 配置矩阵

| 变量 | 用途 | 敏感性 |
| --- | --- | --- |
| `NODE_ENV` | 运行环境 | 低 |
| `APP_ENV` | local/ci/staging/production | 低 |
| `APP_BASE_URL` | 站点根 URL | 低 |
| `DATABASE_URL` | PostgreSQL 连接串 | 高 |
| `REDIS_URL` | Redis 连接串 | 高 |
| `SESSION_SECRET` | 会话签名 | 高 |
| `JWT_SIGNING_KEY` | Token 签名 | 高 |
| `SOURCE_PROVIDER_KEYS` | 第三方来源凭证 | 高 |
| `ANALYTICS_WRITE_KEY` | 统计写入 key | 高 |
| `ERROR_REPORTING_DSN` | 错误上报 DSN | 中 |
| `ALERT_WEBHOOK_URL` | 告警 Webhook | 高 |
| `LOG_REDACTION_SALT` | 日志脱敏盐 | 高 |
| `WECHAT_APP_ID` | 微信登录配置，入口恢复时使用 | 中 |
| `WECHAT_APP_SECRET` | 微信登录密钥，入口恢复时使用 | 高 |

## 日志禁入字段

- password
- verification code
- phone number
- token
- Authorization
- cookie
- session
- source credential
- full sensitive query
- raw third-party API response with credentials

## 上线前检查

1. 仓库中无真实 `.env`。
2. 构建产物和客户端 bundle 无服务端密钥。
3. 错误上报和日志已启用脱敏。
4. 生产统计 SDK 的字段和保留周期已被业务/法务确认。
