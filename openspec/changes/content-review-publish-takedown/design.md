# content-review-publish-takedown Design

## 状态流

`raw_ingested -> normalized -> auto_reviewed -> pending_manual_review -> manual_approved -> scheduled|published -> offline|removed|restored`

异常状态：

- auto_rejected
- manual_rejected
- publish_failed
- complaint_frozen
- takedown_pending

## 审核

自动审核包括敏感词、来源风险、重复内容、低质规则、字段完整性、媒体可用性、投诉历史和违法违规类别。自动审核输出风险等级和命中原因。

所有公开发布必须人工审核通过。

## 发布最终校验

立即、定时、批量发布前必须重新确认：

- 已人工通过。
- 未下架。
- 未投诉冻结。
- 来源仍启用。
- 关键字段未被修改。

## 下架清理

投诉成立后：

- 5 分钟内详情不可读。
- 30 分钟内清理搜索、热榜、专题、推荐位、收藏打开结果、cache/CDN、sitemap。
