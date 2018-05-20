// pages/czoldmm/czoldmm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focuseShow: true,
    pwdShow: '',
    pwd: ''
  },
  focuse() {
    this.setData({ focuseShow: true })
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
  queding() {
    let oldPassword = this.data.pwd;
    if (oldPassword.length === 6) {

      let resultPrie = this.data.resultPrie;
      let order = this.data.order;
      wx.navigateTo({
        url: '../czmm/czmm?oldPassword=' + oldPassword + '&&resultPrie=' + resultPrie + ' &&order=' + order,
      })
    } else {
      wx.showToast({
        title: '密码位数不对',
        icon: 'none'
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData(options)
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