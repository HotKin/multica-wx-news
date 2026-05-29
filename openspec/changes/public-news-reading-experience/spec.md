# public-news-reading-experience Spec Delta

## Requirements

### Requirement: 公开内容过滤

公开页面和公开 API 只能返回已发布、未下架、未投诉冻结内容。

#### Scenario: 下架内容被访问

- Given 文章已下架
- When 游客访问详情
- Then 不展示正文
- And 返回明确不可用状态

### Requirement: 详情字段

详情页必须展示标题、分类标签、文章内容、作者、来源和发布时间。

### Requirement: 收藏接口边界

未登录用户调用收藏接口必须失败，不得静默创建本地伪收藏作为服务端结果。
