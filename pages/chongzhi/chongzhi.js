// pages/chongzhi/chongzhi.js
import http from '../../utils/http.js'
var MD5Util = require('../../utils/MD5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    xiangmu: [
      { title: '充值199', value: '199' },
      { title: '充值299', value: '299' },
      { title: '充值399', value: '399' }
    ],
    value: '',
    active: -1
  },
  // 前往充值协议
  toxieyi() {
    wx.navigateTo({
      url: `../xieyi/xieyi?show=0`,
    })
  },
  // 输入金额
  tapChongzhi(e) {
    let value = e.detail.value;
    this.setData({ value, active: -1 })
  },
  // 充值
  toChongzhi() {
    let token = wx.getStorageSync('token');
    let payMethod = 1;
    let fee = this.data.value;
    http.post('addBalanceOfMiniPrograms', { token, payMethod, 'type': 1, fee })
      .then(res => {
        let playInfo = res.data;
        let timeStamp = playInfo.timestamp;
        let orderNumber = playInfo.orderNumber;
        console.log(orderNumber)
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
            http.post('getRechargeOrderPayResultForMiniPrograms', { token, orderNumber })
              .then(res => {
                wx.redirectTo({
                  url: '../qianbao/qiaobao',
                })
              })
          },
          fail(err) {
            console.log(err)
          }
        })
      })
  },
  clickActive(e) {
    let active = e.currentTarget.dataset.active;
    let xiangmu = this.data.xiangmu;
    let value = xiangmu[active].value
    this.setData({ active, value })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let balance = options.balance;
    this.setData({ balance })
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