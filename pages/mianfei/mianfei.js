// pages/jingxuan/jingxuan.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: http.baseUrl,
    isShowZhiding: false,
    scrollTop: 0,
    tabs: [{ id: null, name: "会员免费" }],
    guangxue: {
      productList: [],
      hasNextPage: false,
      sortType: 0,
      index: 1,
      size: 15
    },
    taiyang: {
      productList: [],
      hasNextPage: false,
      sortType: 0,
      index: 1,
      size: 15
    },
    bannerList: [],
    freeList: [],
    activeIndex: 0,
    sliderOffset: 0,
  },
  // 前往web查看
  toWeb(e) {
    let webUrl = e.currentTarget.dataset.weburl;
    wx.setStorageSync('detailUrl', webUrl)
    wx.navigateTo({
      url: `../web/web`,
    })
  },
  // 获取商品列表
  getProductList: function () {
    let type = this.data.tabs[this.data.activeIndex].id;
    if (this.data.activeIndex === '1') {
      // 获得光学眼镜列表
      let guangxue = this.data.guangxue;
      http.post('productList', { type, sortType: guangxue.sortType, index: guangxue.index, size: guangxue.size })
        .then(res => {
          let productList = res.data.list;
          let hasNextPage = res.data.hasNextPage;
          guangxue.productList = guangxue.productList.concat(productList);
          guangxue.hasNextPage = hasNextPage;
          guangxue.index++;
          this.setData({ guangxue })
        })
    } else if (this.data.activeIndex === '2') {
      // 获得太阳眼镜列表
      let taiyang = this.data.taiyang;
      http.post('productList', { type, sortType: taiyang.sortType, index: taiyang.index, size: taiyang.size })
        .then(res => {
          let productList = res.data.list;
          let hasNextPage = res.data.hasNextPage;
          taiyang.productList = taiyang.productList.concat(productList);
          taiyang.hasNextPage = hasNextPage;
          taiyang.index++;
          this.setData({ taiyang })
        })
    } else {
      http.post('freeGiveList')
        .then(res => {
          let freeList = res.data.freeList;
          this.setData({
            freeList
          })
        })
    }



  },

  // 一键置顶
  toScrollTop() {
    this.setData({ scrollTop: 0 })
  },
  // 显示一键置顶
  getScrollTop(e) {
    let scrollTop = parseFloat(e.detail.scrollTop);
    if (scrollTop > 300) {
      this.setData({ isShowZhiding: true })
    } else {
      this.setData({ isShowZhiding: false })
    }

  },
  // navbar的点击样式
  tabClick: function (e) {
    new Promise((resove, reject) => {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
      resove();
    }).then(() => {
      this.getProductList();
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    http.post('viewList', {
      "type": 4,
      "token": wx.getStorageSync("token")
    }).then((res) => {
      console.log(res.data.list);
      that.setData({
        bannerList: res.data.list
      })
    });
    http.post('productTypeList')
      .then(res => {
        let tabs = res.data.slice(0, 2);
        let firstTabs = this.data.tabs;
        tabs = firstTabs.concat(tabs)
        this.setData({ tabs })
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getProductList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getProductList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})