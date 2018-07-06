
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yzm: '获取验证码'
  },
  // 验证码登录
  login(e) {
    let that = this;
    let userPhone = e.detail.value.userPhone;
    let checkCode = e.detail.value.checkCode;
    let headImgUrl = this.data.avataUrl;
    let nickName = this.data.nickName;
    wx.login({
      success: function (res1) {
        let js_code = res1.code;
        http.post('wxLoginForMiniPrograms', { js_code })
          .then(res => {
            let openid = res.data.openid;
            http.post('thirdUserloginForCheckCode', { userPhone, checkCode, openid, headImgUrl, nickName })
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
          })
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
            let totalTime = 60;
            wx.hideLoading;
            wx.showToast({
              icon: 'none',
              title: '验证码已发送至当前手机'
            })
            let time = setInterval(() => {
              totalTime--;
              this.setData({
                yzm: totalTime + 'S'
              })
              if (totalTime <= 0) {
                clearInterval(time);
                this.setData({
                  yzm: '重新获取'
                })
              }
            }, 1000)
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