/**
 * 格式化工具函数
 */

/**
 * 格式化日期时间为相对时间或绝对时间
 * 规则：
 *   - 1 分钟内：刚刚
 *   - 1 小时内：N 分钟前
 *   - 24 小时内：N 小时前
 *   - 超过 24 小时：MM-DD
 *   - 超过一年：YYYY-MM-DD
 * @param {string|number|Date} date - 日期时间
 * @returns {string} 格式化后的时间字符串
 */
function formatTime(date) {
  const now = new Date().getTime()
  const target = new Date(date).getTime()

  if (isNaN(target)) {
    return ''
  }

  const diff = now - target
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const year = 365 * day

  if (diff < minute) {
    return '刚刚'
  }
  if (diff < hour) {
    return Math.floor(diff / minute) + '分钟前'
  }
  if (diff < day) {
    return Math.floor(diff / hour) + '小时前'
  }
  if (diff < year) {
    return formatDate(target, 'MM-DD')
  }
  return formatDate(target, 'YYYY-MM-DD')
}

/**
 * 将日期格式化为指定格式的字符串
 * @param {string|number|Date} date - 日期时间
 * @param {string} fmt - 格式模板，如 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date)

  if (isNaN(d.getTime())) {
    return ''
  }

  const o = {
    'YYYY': d.getFullYear(),
    'MM': padZero(d.getMonth() + 1),
    'DD': padZero(d.getDate()),
    'HH': padZero(d.getHours()),
    'mm': padZero(d.getMinutes()),
    'ss': padZero(d.getSeconds())
  }

  let result = fmt
  for (const key in o) {
    result = result.replace(key, o[key])
  }
  return result
}

/**
 * 数字补零
 * @param {number} n - 数字
 * @param {number} len - 目标长度
 * @returns {string}
 */
function padZero(n, len = 2) {
  const str = String(n)
  return str.padStart(len, '0')
}

/**
 * 截取字符串，超出部分显示省略号
 * @param {string} str - 原始字符串
 * @param {number} maxLen - 最大长度
 * @returns {string}
 */
function truncate(str, maxLen) {
  if (!str || str.length <= maxLen) {
    return str || ''
  }
  return str.substring(0, maxLen) + '...'
}

module.exports = {
  formatTime,
  formatDate,
  padZero,
  truncate
}
