const { getNewsList, getHotNews } = require('../../services/news')
const { CATEGORY_LIST, CATEGORY } = require('../../data/categories')
const { formatTime } = require('../../utils/format')

Page({
  data: {
    categories: CATEGORY_LIST,
    currentCategory: CATEGORY.ALL,
    bannerList: [],
    newsList: [],
    page: 1,
    pageSize: 10,
    hasMore: true,
    loading: false,
    refreshing: false,
    error: false,
    errorMsg: ''
  },

  onLoad() {
    this.loadData()
  },

  onPullDownRefresh() {
    this.setData({ refreshing: true })
    this.refreshData()
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadMore()
    }
  },

  onShareAppMessage() {
    return {
      title: '主流新闻 — 汇聚全球热点资讯',
      path: '/pages/index/index'
    }
  },

  async loadData() {
    this.setData({ loading: true, error: false })
    try {
      const [hotRes, listRes] = await Promise.all([
        getHotNews(),
        getNewsList({
          category: this.data.currentCategory,
          page: 1,
          pageSize: this.data.pageSize
        })
      ])

      this.setData({
        bannerList: hotRes.list,
        newsList: this.formatNewsList(listRes.list),
        page: 1,
        hasMore: listRes.hasMore,
        loading: false
      })
    } catch (err) {
      console.error('loadData error:', err)
      this.setData({
        loading: false,
        error: true,
        errorMsg: '网络开小差了，点击重试'
      })
    }
  },

  async refreshData() {
    try {
      const [hotRes, listRes] = await Promise.all([
        getHotNews(),
        getNewsList({
          category: this.data.currentCategory,
          page: 1,
          pageSize: this.data.pageSize
        })
      ])

      this.setData({
        bannerList: hotRes.list,
        newsList: this.formatNewsList(listRes.list),
        page: 1,
        hasMore: listRes.hasMore,
        refreshing: false
      })
      wx.stopPullDownRefresh()
    } catch (err) {
      console.error('refreshData error:', err)
      this.setData({ refreshing: false })
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '刷新失败，请检查网络',
        icon: 'none'
      })
    }
  },

  async loadMore() {
    if (this.data.loading || !this.data.hasMore) return

    const nextPage = this.data.page + 1
    this.setData({ loading: true })

    try {
      const res = await getNewsList({
        category: this.data.currentCategory,
        page: nextPage,
        pageSize: this.data.pageSize
      })

      this.setData({
        newsList: this.data.newsList.concat(this.formatNewsList(res.list)),
        page: nextPage,
        hasMore: res.hasMore,
        loading: false
      })
    } catch (err) {
      console.error('loadMore error:', err)
      this.setData({ loading: false })
      wx.showToast({
        title: '加载失败，上拉重试',
        icon: 'none'
      })
    }
  },

  formatNewsList(list) {
    return list.map((item) => ({
      ...item,
      timeText: formatTime(item.publishTime)
    }))
  },

  onCategoryTap(e) {
    const category = e.currentTarget.dataset.value
    if (category === this.data.currentCategory) return

    this.setData({
      currentCategory: category,
      page: 1,
      hasMore: true,
      newsList: [],
      error: false
    })
    this.loadData()
  },

  onBannerTap(e) {
    const id = e.currentTarget.dataset.id
    if (id) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      })
    }
  },

  onNewsTap(e) {
    const id = e.currentTarget.dataset.id
    if (id) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      })
    }
  },

  onRetry() {
    this.loadData()
  }
})
