# public-news-reading-experience Design

## 页面

- 首页：推荐、最新、频道入口、热榜、专题入口。
- 频道：已发布内容列表。
- 详情：标题、分类标签、文章内容、作者、来源、发布时间、原文链接。
- 热榜：第三方热榜快照映射到已发布内容。
- 专题：人工专题和系统候选专题经审核发布后展示。
- 搜索：已发布内容检索。

## 可见性规则

公开查询必须统一过滤：

- status = published
- takedown_state = active
- complaint_state != frozen
- source_state = enabled 或历史授权仍允许展示

## 收藏接口

保留 `GET/POST/DELETE /api/v1/me/favorites`。登录入口未实现时，未登录请求返回 401，不在前台强行暴露登录入口。
