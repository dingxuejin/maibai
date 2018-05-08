// pages/jingxuan/jingxuan.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: http.baseUrl,
    huodong: [],
    zhaoshang: [],
    gongyi: [],
    tabs: ["活动", "招商", "公益"],
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
  // 获取视界页面列表
  getViewList(e, i) {
    let token = wx.getStorageSync('token')
    let data = {
      type: i,
      token
    }
    http.post('viewList', data)
      .then((res) => {
        let viewList = {};
        viewList[e] = res.data.list;
        this.setData(viewList)
      })
  },
  // navbar的点击样式
  tabClick: function (e) {
    let activeIndex = e.currentTarget.id;
    new Promise((resolve, reject) => {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex
      });
      resolve();
    }).then(() => {
      if (activeIndex === '1') {
        this.getViewList('zhaoshang', 1);
      } else if (activeIndex === '2') {
        this.getViewList('gongyi', 3);
      } else {
        this.getViewList('huodong', 0);
        console.log(this.data.huodong);
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getViewList('huodong', 0);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})