// pages/dingdandetail/dingdandetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:-1
  },
  // 去支付
  toZhifu() {
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
    let status = parseInt(options.status);
    console.log(status);
    this.setData({ status })
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