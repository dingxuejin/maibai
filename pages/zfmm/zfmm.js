// pages/zfmm/zfmm.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repwd: '',
    pwd: '',
    pwdShow: [],
    repwdShow: [],
    focuseReShow: false,
    focuseShow: false
  },
  // 支付密码设置确定
  queding() {
    let that = this;
    if (this.data.pwd.length !== 6 || this.data.repwd.length !== 6) {
      wx.showToast({
        title: '密码长度不对',
        icon: 'loading',
        duration: 2000
      })
    } else {
      if (this.data.pwd === this.data.repwd) {
        let token = wx.getStorageSync('token')
        let payPassword = this.data.pwd
        http.post('settingPayPwdAsAdd', { token, payPassword })
          .then(res => {
            if (res.status === 0) {
              wx.showToast({
                title: '设置成功',
                icon: 'success',
                duration: 2000,
                success() {
                  setTimeout(function () {
                    let resultPrie = that.data.resultPrie;
                    let order = that.data.order;
                    wx.redirectTo({
                      url: '../zhifutype/zhifutype?resultPrie=' + resultPrie + '&&order=' + order,
                    })
                  }, 2000)
                }
              })
            } else {
              wx.showToast({
                title: '网络异常',
                icon: 'none',
                duration: 2000
              })
            }
          })
      } else {
        wx.showToast({
          title: '两次密码必须相同',
          icon: 'loading',
          duration: 2000
        })
      }
    }

  },
  // 重新输入密码输入框获得焦点
  focuseRe() {
    this.setData({ focuseReShow: true })
  },
  // 输入密码输入框获得焦点
  focuse() {
    this.setData({ focuseShow: true })
  },
  // 重新输入密码框的显示处理
  inputRepwd(e) {
    let repwd = e.detail;
    let repwdShow = [];
    repwdShow.length = repwd.cursor;
    repwdShow.fill('*');
    this.setData({
      repwdShow,
      repwd: repwd.value
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options);
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