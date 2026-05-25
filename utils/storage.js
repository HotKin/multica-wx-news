/**
 * 本地缓存辅助工具
 * 基于 wx.getStorageSync / wx.setStorageSync 封装，预留接口供后续扩展
 */

const PREFIX = 'wx_news_'

/**
 * 存储数据到本地缓存
 * @param {string} key - 缓存键
 * @param {*} value - 缓存值
 * @param {number} [expire] - 过期时间（毫秒），不传入则永不过期
 */
function setStorage(key, value, expire) {
  const data = {
    value,
    expire: expire ? Date.now() + expire : null,
    timestamp: Date.now()
  }
  try {
    wx.setStorageSync(PREFIX + key, data)
  } catch (e) {
    console.error('setStorage failed:', e)
  }
}

/**
 * 从本地缓存读取数据
 * @param {string} key - 缓存键
 * @param {*} [defaultValue] - 默认值
 * @returns {*} 缓存值或默认值
 */
function getStorage(key, defaultValue) {
  try {
    const data = wx.getStorageSync(PREFIX + key)
    if (!data) {
      return defaultValue
    }
    // 检查是否过期
    if (data.expire && Date.now() > data.expire) {
      removeStorage(key)
      return defaultValue
    }
    return data.value !== undefined ? data.value : defaultValue
  } catch (e) {
    console.error('getStorage failed:', e)
    return defaultValue
  }
}

/**
 * 从本地缓存移除指定数据
 * @param {string} key - 缓存键
 */
function removeStorage(key) {
  try {
    wx.removeStorageSync(PREFIX + key)
  } catch (e) {
    console.error('removeStorage failed:', e)
  }
}

/**
 * 清空本地缓存（仅清空本应用前缀的数据）
 */
function clearStorage() {
  try {
    const keys = wx.getStorageInfoSync().keys || []
    keys.forEach((key) => {
      if (key.startsWith(PREFIX)) {
        wx.removeStorageSync(key)
      }
    })
  } catch (e) {
    console.error('clearStorage failed:', e)
  }
}

module.exports = {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage
}
