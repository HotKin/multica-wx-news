/**
 * 新闻 API 服务层
 * 当前基于 Mock 数据实现，后续可无缝切换为真实 HTTP 请求
 *
 * 使用接口：
 *   getNewsList(category, page, pageSize)   - 获取新闻列表（支持分类筛选、分页）
 *   getHotNews()                             - 获取热点新闻（按发布时间倒序取前 3 条）
 *   getNewsDetail(id)                        - 获取新闻详情（按 ID 查询）
 */

const { MOCK_NEWS_LIST } = require('../mock/news')
const { CATEGORY } = require('../data/categories')

/**
 * 模拟网络请求延迟
 * @param {number} ms - 延迟毫秒数
 * @returns {Promise<void>}
 */
function mockDelay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 获取新闻列表
 * 支持按 category 筛选，支持 page + pageSize 分页
 *
 * @param {Object} params - 查询参数
 * @param {string} [params.category='all'] - 分类筛选，'all' 表示全部
 * @param {number} [params.page=1] - 页码，从 1 开始
 * @param {number} [params.pageSize=10] - 每页条数
 * @returns {Promise<{list: Array, total: number, page: number, pageSize: number, hasMore: boolean}>}
 */
async function getNewsList(params = {}) {
  const {
    category = CATEGORY.ALL,
    page = 1,
    pageSize = 10
  } = params

  await mockDelay(200)

  // 1. 按分类筛选
  let list = MOCK_NEWS_LIST
  if (category !== CATEGORY.ALL) {
    list = list.filter((item) => item.category === category)
  }

  // 2. 按发布时间倒序排列（最新的在前）
  list = list.slice().sort((a, b) => {
    return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  })

  const total = list.length

  // 3. 分页 slice
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pageList = list.slice(start, end)

  const hasMore = end < total

  return {
    list: pageList,
    total,
    page,
    pageSize,
    hasMore
  }
}

/**
 * 获取热点新闻
 * 按发布时间倒序取前 3 条，用于首页轮播图展示
 *
 * @returns {Promise<{list: Array}>}
 */
async function getHotNews() {
  await mockDelay(150)

  const list = MOCK_NEWS_LIST
    .slice()
    .sort((a, b) => {
      return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
    })
    .slice(0, 3)

  return {
    list
  }
}

/**
 * 获取新闻详情
 * 按 ID 查询单条新闻，未找到返回 null
 *
 * @param {string} id - 新闻 ID
 * @returns {Promise<Object|null>}
 */
async function getNewsDetail(id) {
  await mockDelay(200)

  if (!id) {
    return null
  }

  const news = MOCK_NEWS_LIST.find((item) => item.id === id)
  return news || null
}

module.exports = {
  getNewsList,
  getHotNews,
  getNewsDetail
}
