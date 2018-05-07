// pages/detail/detail.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDialog: false,
    isShowZhiding: false,
    array: ['0.00', '0.50', '1.00', '1.50', '2.00'],
    arrindex: 0,
    jingkuangColor: ['黑色', '灰色', '红色', '蓝色', '紫色'],
    jingkuangactive: -1,
    jingpian: ['1.56非球面树脂防蓝光镜片', '1.61非球面树脂翡翠膜镜片', '1.67非球面树脂翡翠膜镜片'],
    jingpianactive: -1,
    baseUrl: http.baseUrl,
    productDetail: {},
    scrollTop: 0
  },
  // 下单支付
  xiadan() {
    wx.navigateTo({
      url: '../queren/queren',
    })
  },
  // picker选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      arrindex: e.detail.value
    })
  },
  // 规格选择效果
  xuanze(e) {
    let active = e.currentTarget.dataset;

    console.log(active)
    this.setData(active)
  },
  stopMaopao() {
    // 取消冒泡
  },
  // dialog关闭
  dialogClose() {
    this.setData({ isDialog: false })
  },
  // 购买
  toShop() {
    let that = this;
    let token = wx.getStorageSync('token')
    http.post('getUserInfo', { token })
      .then(res => {
        let myDeposit = parseFloat(res.data.myDeposit);
        console.log(myDeposit)
        // 押金值判断
        if (myDeposit >= 0) {
          that.setData({ isDialog: true })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您还没缴纳押金，缴纳押金成为麦拜会员 即可免费领取一副眼镜',
            confirmText: '去交押金',
            confirmColor: '#f00',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
  },
  // 一键置顶
  toScrollTop() {
    this.setData({ scrollTop: 0 })
  },
  // 显示一键置顶
  getScrollTop(e) {
    let scrollTop = parseFloat(e.detail.scrollTop);
    if (scrollTop > 300) {
      this.setData({ isShowZhiding: true })
    } else {
      this.setData({ isShowZhiding: false })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    http.post('productDetail', options)
      .then((res) => {
        console.log(res.data);
        this.setData({
          productDetail: res.data
        })

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