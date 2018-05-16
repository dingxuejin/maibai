// pages/zhifutype/zhifutype.js
import http from '../../utils/http.js'
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
    console.log(pwd);
    if (pwd.cursor === 6) {
      let token = wx.getStorageSync('token');
      let password = pwd.value;
      let orderId = this.data.order.orderId;
      http.post('payByBalance', { token, password, orderId })
        .then(res => {
          if (res.statue === 0) {
            wx.redirectTo({
              url: '../payresult/payresult',
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 3000
            })
          }
        })
    }
  },
  // 输入密码输入框获得焦点
  focuse() {
    this.setData({ focuseShow: true })
  },
  // dialog打开
  dialogOpen() {
    let token = wx.getStorageSync('token');

    let payType = this.data.type;
    console.log(payType);
    if (payType === '-1') {
      wx.showModal({
        title: '支付操作',
        content: '请您选择支付方式'
      })
    } else if (payType === '0') {
      // 微信支付
    } else if (payType === '1') {
      // 余额支付
      http.post('getUserInfo', { token })
        .then(res => {
          let hasPayPwd = res.data.hasPayPwd;
          console.log(hasPayPwd);
          if (hasPayPwd === 0) {
            this.toSjyz();
          } else {
            this.setData({ isDialog: true });
          }
        })

    }



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
    let resultPrie = this.data.resultPrie;
    let order = this.data.order;
    order = JSON.stringify(order);
    wx.navigateTo({
      url: '../sjyz/sjyz?resultPrie=' + resultPrie + '&&order=' + order,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let resultPrie = options.resultPrie;
    let order = JSON.parse(options.order);

    this.setData({ resultPrie, order });
    wx.setNavigationBarTitle({
      title: '支付方式',
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