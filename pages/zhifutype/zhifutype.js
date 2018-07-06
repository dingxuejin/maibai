// pages/zhifutype/zhifutype.js
import http from '../../utils/http.js'
var MD5Util = require('../../utils/MD5.js');
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
    if (pwd.cursor === 6) {
      let token = wx.getStorageSync('token');
      let password = pwd.value;
      let orderId = this.data.order.orderId;
      http.post('payByBalance', { token, password, orderId })
        .then(res => {
          if (res.status === 0) {
            wx.showToast({
              title: '支付成功',
              success: function () {
                setTimeout(() => {
                  wx.redirectTo({
                    url: '../payresult/payresult',
                  })
                }, 2000)
              }
            })
          } else {
            wx.showModal({
              title: '余额支付提示',
              content: res.message,
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

    if (payType === '-1') {
      wx.showModal({
        title: '支付操作',
        content: '请您选择支付方式'
      })
    } else if (payType === '0') {
      // 微信支付
      let orderNumber = this.data.order.orderNumber;
      http.post('getPrePayIdOfMiniPrograms', { token, orderNumber, payMethod: 1 })
        .then(res => {
          if (res.status == 0) {
            let playInfo = res.data;
            let timeStamp = playInfo.timestamp;
            let nonceStr = playInfo.nonceStr;
            let prepay_id = 'prepay_id=' + playInfo.prePayId;
            let paySign = MD5Util.MD5(`appId=${http.appId}&nonceStr=${nonceStr}&package=${prepay_id}&signType=MD5&timeStamp=${timeStamp}&key=${http.key}`).toUpperCase();
            wx.requestPayment({
              timeStamp,
              nonceStr,
              'signType': 'MD5',
              'package': prepay_id,
              paySign,
              success(res) {
                wx.showToast({
                  title: '支付成功',
                  success: function () {
                    http.post('getOrderPayResultForMiniPrograms', { token, orderNumber })
                      .then(res => {
                        if (res.status === 0) {
                          setTimeout(() => {
                            wx.redirectTo({
                              url: '../payresult/payresult',
                            })
                          }, 2000)
                        } else {
                          wx.showToast({
                            title: res.msg,
                            icon: 'none'
                          })
                        }
                      })

                  }
                })
              },
              fail(err) {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                })
              }
            })
          } else {
            wx.showModal({
              title: '微信支付提示',
              content: res.message,
            })
          }
        })
    } else if (payType === '1') {
      // 余额支付
      http.post('getUserInfo', { token })
        .then(res => {
          let hasPayPwd = res.data.hasPayPwd;
          if (hasPayPwd === 0) {
            this.toSjyz();
          } else {
            this.setData({ isDialog: true, focuseShow: true });
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
  // 重置密码
  czmm() {
    let resultPrie = this.data.resultPrie;
    let order = this.data.order;
    order = JSON.stringify(order);
    wx.navigateTo({
      url: '../czoldmm/czoldmm?resultPrie=' + resultPrie + '&&order=' + order,
    })

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