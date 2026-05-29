# news-source-compliance Design

## 来源状态

- draft
- pending_approval
- enabled
- paused
- disabled
- blacklisted

只有 `enabled` 来源的新内容可进入发布流程。

## 授权类型

- full_content
- excerpt_only
- title_link_only
- forbidden
- pending_confirmation

默认必须是 `pending_confirmation`，不得默认允许全文。

## 字段级可展示

每个字段使用 `allow`、`deny`、`manual_confirm` 表示：标题、分类标签、正文、摘要、作者、来源名称、发布时间、原文链接、封面图、正文图片、视频、转载/授权标识。

## 投诉与停用

- 未配置投诉联系人时不得启用来源。
- 授权到期前 7 天预警。
- 7 天内 3 次有效投诉或 1 次严重投诉成立时自动暂停。
- 来源恢复前必须重新确认授权、原文链接规则、联系人和停用处理结果。
