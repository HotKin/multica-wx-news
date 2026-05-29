# admin-rbac-audit Spec Delta

## Requirements

### Requirement: 最小权限

后台写操作必须鉴权并校验角色权限。

#### Scenario: 编辑尝试发布

- Given 用户角色为 editor
- When 调用发布接口
- Then 请求失败
- And 写入越权尝试审计或安全日志

### Requirement: 高风险操作审计

高风险操作必须记录操作者、时间、原因、变更前后值和影响对象。

### Requirement: 审计不可绕过

所有后台写操作必须经过统一审计写入路径。
