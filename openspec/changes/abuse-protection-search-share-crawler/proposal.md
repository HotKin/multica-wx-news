# abuse-protection-search-share-crawler Proposal

## 目的

为搜索、分享、富文本、外链媒体和第三方抓取建立滥用防护，降低 XSS、open redirect、SSRF、批量枚举、爬虫风暴和密钥泄露风险。

## 范围

- 搜索输入校验与限流。
- 分享参数白名单与跳转校验。
- 富文本/标题/摘要净化。
- 外链媒体代理 SSRF 防护。
- 采集 allowlist、频率限制、重试上限、熔断和禁用开关。
- 密钥隔离和客户端 bundle 检查。

## 验收

安全 payload 被拦截或净化；采集任务不可访问非 allowlist 目标；客户端不包含服务端密钥。
