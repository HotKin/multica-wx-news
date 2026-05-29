# privacy-analytics-logging Design

## 事件类别

- 阅读：page_view、news_exposure、news_click、detail_view、detail_stay、scroll_depth。
- 搜索分享：search_submit、search_result_view、search_no_result、share_click、copy_link_click。
- 热榜专题：hot_exposure、hot_click、topic_exposure、topic_click、topic_news_click。
- 内容链路：source_fetch_success、source_fetch_failed、news_ingested、auto_audit_result、manual_audit_pass、manual_audit_reject、publish_success、publish_failed。
- 投诉下架：complaint_created、complaint_reviewed、news_takedown、news_restore。
- 后台操作：source_enable、source_disable、rule_update、topic_publish、hot_manual_adjust。

## 禁入字段

明文密码、验证码、手机号、token、Authorization、cookie、session、source credential、完整敏感 query。

## 留存

- 原始抓取数据不少于 180 天。
- 审核日志、投诉材料、下架/恢复记录不少于 2 年。
- 访问统计按最小必要字段采集，生产保留策略需业务/法务确认。
