# abuse-protection-search-share-crawler Spec Delta

## Requirements

### Requirement: 搜索滥用防护

搜索接口必须校验输入、限流，并且不返回未发布或已下架内容。

### Requirement: 分享安全

分享链接不得允许任意跳转，分享内容不得包含未净化 HTML 或后台字段。

### Requirement: 采集 allowlist

采集任务只能访问已启用来源配置的域名和路径。

#### Scenario: 非 allowlist URL

- Given worker 收到非 allowlist URL
- When 抓取任务执行
- Then 任务失败
- And 记录拒绝原因

### Requirement: SSRF 防护

外链媒体代理不得访问内网、link-local 或 metadata IP。
