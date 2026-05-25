/**
 * 新闻分类枚举与映射
 * 分类体系：科技、国际、财经、国内、体育、教育
 */

// 分类枚举值
const CATEGORY = {
  ALL: 'all',
  TECH: 'tech',
  INTERNATIONAL: 'international',
  FINANCE: 'finance',
  DOMESTIC: 'domestic',
  SPORTS: 'sports',
  EDUCATION: 'education'
}

// 分类映射表：value -> label
const CATEGORY_MAP = {
  [CATEGORY.ALL]: '全部',
  [CATEGORY.TECH]: '科技',
  [CATEGORY.INTERNATIONAL]: '国际',
  [CATEGORY.FINANCE]: '财经',
  [CATEGORY.DOMESTIC]: '国内',
  [CATEGORY.SPORTS]: '体育',
  [CATEGORY.EDUCATION]: '教育'
}

// 分类列表（用于标签栏渲染）
const CATEGORY_LIST = [
  { value: CATEGORY.ALL, label: CATEGORY_MAP[CATEGORY.ALL] },
  { value: CATEGORY.TECH, label: CATEGORY_MAP[CATEGORY.TECH] },
  { value: CATEGORY.INTERNATIONAL, label: CATEGORY_MAP[CATEGORY.INTERNATIONAL] },
  { value: CATEGORY.FINANCE, label: CATEGORY_MAP[CATEGORY.FINANCE] },
  { value: CATEGORY.DOMESTIC, label: CATEGORY_MAP[CATEGORY.DOMESTIC] },
  { value: CATEGORY.SPORTS, label: CATEGORY_MAP[CATEGORY.SPORTS] },
  { value: CATEGORY.EDUCATION, label: CATEGORY_MAP[CATEGORY.EDUCATION] }
]

// 有效分类值数组（不含 "all"）
const VALID_CATEGORIES = [
  CATEGORY.TECH,
  CATEGORY.INTERNATIONAL,
  CATEGORY.FINANCE,
  CATEGORY.DOMESTIC,
  CATEGORY.SPORTS,
  CATEGORY.EDUCATION
]

/**
 * 根据分类值获取标签文本
 * @param {string} value - 分类枚举值
 * @returns {string} 分类标签文本
 */
function getCategoryLabel(value) {
  return CATEGORY_MAP[value] || '其他'
}

/**
 * 校验是否为有效分类
 * @param {string} value - 分类枚举值
 * @returns {boolean}
 */
function isValidCategory(value) {
  return VALID_CATEGORIES.includes(value)
}

module.exports = {
  CATEGORY,
  CATEGORY_MAP,
  CATEGORY_LIST,
  VALID_CATEGORIES,
  getCategoryLabel,
  isValidCategory
}
