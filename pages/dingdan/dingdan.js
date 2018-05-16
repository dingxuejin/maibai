// pages/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "待付款", "待发货", "待收货", "待评论"],
    activeIndex: 0,
    sliderOffset: 0,
  },
  tabClick: function (e) {
    let activeIndex = e.currentTarget.id;
    let sliderOffset = 150 * activeIndex;
    this.setData({
      sliderOffset,
      activeIndex
    });
  },
  // 去支付
  toZhifu(){
    wx.navigateTo({
      url: '../zhifutype/zhifutype',
    })
  },
  // 跳转评论
  toPinglun() {
    wx.navigateTo({
      url: '../pinglun/pinglun',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let activeIndex = options.active;
    let sliderOffset = 150 * activeIndex;
    this.setData({
      sliderOffset,
      activeIndex
    });
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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