// pages/zhifutype/zhifutype.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "-1",
    isDialog: false,
    focuseShow: false
  },
  stopMaopao() {
    // 取消冒泡
  },
  // 输入密码框的显示处理
  inputPwd(e) {
    let pwd = e.detail;
    let pwdShow = [];
    pwdShow.length = pwd.cursor;
    pwdShow.fill('*');
    this.setData({
      pwdShow,
      pwd: pwd.value
    })
  },
  // 输入密码输入框获得焦点
  focuse() {
    this.setData({ focuseShow: true })
  },
  // dialog打开
  dialogOpen() {
    this.setData({ isDialog: true })
  },
  // dialog关闭
  dialogClose() {
    this.setData({ isDialog: false })
  },
  // 设置支付选择样式
  zhifutype(e) {
    let type = e.currentTarget.dataset;
    this.setData(type)
  },
  // 前往手机验证
  toSjyz() {
    wx.navigateTo({
      url: '../sjyz/sjyz',
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