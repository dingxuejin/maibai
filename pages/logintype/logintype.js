// pages/logintype/logintype.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getuserinfo(res) {
    let userInfo = res.detail.userInfo;
    if (userInfo) {
      wx.setStorage({
        key: 'userInfo',
        data: userInfo,
      })
      wx.login({
        timeout: 20000,
        fail: function () {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          })
        },
        success: function (res) {
          let token = res.code;
          wx.setStorage({
            key: 'token',
            data: token,
          })
        }
      })
      wx.reLaunch({
        url: '../mianfei/mianfei'
      })
    } else {
      wx.showToast({
        title: '用户信息获取失败',
        icon: 'none'
      })
    }



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