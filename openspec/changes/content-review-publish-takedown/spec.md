# content-review-publish-takedown Spec Delta

## Requirements

### Requirement: 人工审核门禁

任何内容公开发布前必须人工审核通过。

#### Scenario: 未人工通过内容到达定时发布时间

- Given 内容未人工审核通过
- When 定时发布时间到达
- Then 系统不得公开发布
- And 记录发布失败原因

### Requirement: 发布前最终校验

系统发布前必须重新校验来源、投诉、下架和关键字段状态。

### Requirement: 下架全链路清理

投诉成立或下架后，系统必须清理所有公开可读入口。

#### Scenario: 投诉成立

- Given 投诉审核成立
- When 下架流程执行
- Then 5 分钟内详情不可读
- And 30 分钟内搜索、热榜、专题、推荐位、收藏打开结果和 sitemap 不再展示可读内容
