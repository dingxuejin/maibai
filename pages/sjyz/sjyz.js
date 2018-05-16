
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yzm: '获取验证码'
  },
  // 验证码校验
  yanzhen(e) {
    let token = wx.getStorageSync('token')
    let checkCode = e.detail.value.checkCode;
    http.post('setPayPwdAsCheckId', { token, checkCode })
      .then(res => {
        console.log(res);
        if (res.status === 0) {
          // 验证码校验成功


          let resultPrie = this.data.resultPrie;
          let order = this.data.order;
          wx.redirectTo({
            url: '../zfmm/zfmm?resultPrie=' + resultPrie + '&&order=' + order,
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
    let token = wx.getStorageSync("token");
    http.post('settingPayPwdAsCheckCode', { token })
      .then(res => {
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
        } else {
          wx.hideLoading;
          wx.showToast({
            title: '验证码获取失败'
          })
        }
      })

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