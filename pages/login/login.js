
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 验证码登录
  login(e) {
    wx.reLaunch({
      url: '../mianfei/mianfei'
    })
    let userPhone = e.detail.value.userPhone;
    let checkCode = e.detail.value.checkCode;
    http.post('userlogin', { userPhone, checkCode })
      .then(res => {
        if (res.status === 0) {
          // 验证码校验成功
         
       
          wx.setStorage({
            key: "token",
            data: res.data.token
          })
          // 验证成功跳转到免费领取页
          wx.reLaunch({
            url: '../mianfei/mianfei'
          })

        } else {
          // 验证码校验失败
          wx.showModal({
            title: '操作提示',
            content: '验证码输入错误！'
          });
        }
      })
  },
  // 获得验证码
  getCheckCode(e) {
    let userPhone = e.detail.value.userPhone;
    let regexp = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    let isTest = regexp.test(userPhone);
    // 判断手机号
    if (isTest) {
      http.post('getCheckCode', { userPhone })
        .then(res => {
          wx.showLoading({
            title: res.message,
            duration: 10000
          })
          if (res.status === 0) {
            wx.hideLoading;
            wx.showToast({
              title: res.message
            })
            // 验证码获取成功
          } else {
            wx.hideLoading;
            wx.showToast({
              title: res.message
            })
          }
        })
    } else {
      // 手机号错误的提示
      wx.showModal({
        title: '操作提示',
        content: '请您输入正确的手机号！'
      });
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