# privacy-analytics-logging Spec Delta

## Requirements

### Requirement: 事件白名单

埋点接口只接受 MVP 白名单事件。

#### Scenario: 未知事件

- Given 客户端提交未知事件名
- When 事件接口接收请求
- Then 拒绝写入
- And 不影响当前页面主流程

### Requirement: 敏感字段禁入

日志和埋点不得记录明文密码、验证码、手机号、token、完整敏感 query 或 source credential。

### Requirement: 指标可验收

系统必须能按默认口径统计首屏性能、详情停留、热榜点击率、搜索有结果率和分享点击率。
