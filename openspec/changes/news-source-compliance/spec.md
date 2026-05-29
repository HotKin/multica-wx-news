# news-source-compliance Spec Delta

## Requirements

### Requirement: 来源启用校验

来源必须配置授权类型、可展示字段、原文链接规则和投诉联系人后才能启用。

#### Scenario: 缺少投诉联系人

- Given 来源无投诉联系人
- When 管理员尝试启用来源
- Then 启用失败
- And 系统返回缺失字段说明

### Requirement: 字段级展示

前台展示字段必须遵守来源授权配置。

#### Scenario: 摘要授权

- Given 来源授权类型为摘要授权
- When 文章详情被访问
- Then 只展示标题、摘要、作者/来源、发布时间和原文链接
- And 不展示完整正文、图片或视频

### Requirement: 来源暂停

来源达到投诉阈值或授权到期时必须暂停新内容发布。
