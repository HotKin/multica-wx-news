# admin-rbac-audit Design

## 角色

- readonly
- editor
- reviewer
- publisher
- operator
- data_viewer
- admin
- auditor

## 高风险操作

- 来源启用/停用/恢复。
- 授权字段变更。
- 人工审核通过/驳回。
- 发布、批量发布、定时发布。
- 下架、恢复。
- 热榜置顶、降权、移除。
- 专题发布/下架。
- 角色变更。

## 审计字段

actor、role、action、entity_type、entity_id、before、after、reason、request_id、ip、user_agent、created_at、rollback_ref。
