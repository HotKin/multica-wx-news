# public-news-reading-experience Proposal

## 目的

实现公开阅读体验：首页、频道、详情、热榜、专题、搜索、分享、收藏接口边界、SEO 和响应式。

## 范围

- 公开页面和 `/api/v1`。
- 只展示已发布、未下架、未投诉冻结内容。
- 搜索、热榜、专题和分享降级。
- SEO metadata、canonical、sitemap。
- 收藏接口边界；微信登录入口先不实现。

## 验收

公开页面不能泄露未发布、后台追溯字段或已下架正文。
