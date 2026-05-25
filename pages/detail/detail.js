const { getNewsDetail } = require('../../services/news')
const { getCategoryLabel } = require('../../data/categories')
const { formatDate } = require('../../utils/format')

Page({
  data: {
    id: '',
    news: null,
    loading: true,
    error: false,
    errorMsg: ''
  },

  onLoad(options) {
    const id = options.id || ''
    if (!id) {
      this.setData({
        loading: false,
        error: true,
        errorMsg: '无效的新闻ID'
      })
      return
    }
    this.setData({ id })
    this.loadDetail(id)
  },

  async loadDetail(id) {
    this.setData({ loading: true, error: false })
    try {
      const news = await getNewsDetail(id)
      if (!news) {
        this.setData({
          loading: false,
          error: true,
          errorMsg: '内容加载失败，新闻可能已被删除'
        })
        return
      }

      this.setData({
        news: this.formatNews(news),
        loading: false
      })

      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: news.title.length > 12 ? news.title.substring(0, 12) + '...' : news.title
      })
    } catch (err) {
      console.error('loadDetail error:', err)
      this.setData({
        loading: false,
        error: true,
        errorMsg: '内容加载失败'
      })
    }
  },

  formatNews(news) {
    return {
      ...news,
      categoryLabel: getCategoryLabel(news.category),
      publishTimeText: formatDate(news.publishTime, 'YYYY-MM-DD HH:mm')
    }
  },

  onPreviewImage(e) {
    const url = e.currentTarget.dataset.url
    const urls = this.data.news.images || []
    if (!url || urls.length === 0) return

    wx.previewImage({
      current: url,
      urls: urls
    })
  },

  onShareAppMessage() {
    const news = this.data.news
    if (!news) {
      return {
        title: '主流新闻',
        path: '/pages/index/index'
      }
    }
    return {
      title: news.title,
      path: `/pages/detail/detail?id=${news.id}`,
      imageUrl: news.coverImage
    }
  },

  onRetry() {
    this.loadDetail(this.data.id)
  },

  onBackHome() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
