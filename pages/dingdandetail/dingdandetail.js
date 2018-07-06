// pages/dingdandetail/dingdandetail.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: http.baseUrl,
    status: -1
  },
  // 跳转到物流详情
  toPostDetail() {
    wx.navigateTo({
      url: '../postdetail/postdetail',
    })
  },
  // 跳转到评论
  toPinglun(e) {

    let orderData = this.data.orderDetail;
    let orderId = orderData.orderId;
    wx.navigateTo({
      url: '../pinglun/pinglun?orderId=' + orderId,
    })
  },
  // 去支付
  toZhifu() {
    let orderData = this.data.orderDetail;
    let resultPrie = orderData.totalFee;
    let order = {
      orderId: orderData.orderId,
      orderNumber: orderData.orderCode
    }
    order = JSON.stringify(order);
    wx.navigateTo({
      url: '../zhifutype/zhifutype?resultPrie=' + resultPrie + '&&order=' + order,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = JSON.parse(options.params);
    let status = parseInt(params.status);
    let orderid = params.orderid;
    this.setData({ status, orderid })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let orderId = this.data.orderid;
    let token = wx.getStorageSync('token')
    http.post('getOrderDetail', { token, orderId })
      .then(result => {
        if (result.status == 0) {
          let res = result.data;
          if (res.productList && res.productList.length > 0)
            res.productList.map(val => {

              if (val.eyeDistance) {
                if (val.eyeDistance <= 0) {
                  val.eyeDistance = '无'
                }
              }
              if (val.leftSize) {
                if (val.leftSize > 0) {
                  val.leftSize = '+' + parseFloat(val.leftSize).toFixed(2);
                } else if (val.leftSize == 0) {
                  val.leftSize = '平光0.00';
                } else {
                  val.leftSize = parseFloat(val.leftSize).toFixed(2);
                }
              }
              if (val.rightSize) {
                if (val.rightSize > 0) {
                  val.rightSize = '+' + parseFloat(val.rightSize).toFixed(2);
                } else if (val.rightSize == 0) {
                  val.rightSize = '平光0.00';
                } else {
                  val.rightSize = parseFloat(val.rightSize).toFixed(2);
                }
              }
              if (val.rightLightSize) {
                if (val.rightLightSize < 0) {
                  val.rightLightSize = parseFloat(val.rightLightSize).toFixed(2);
                } else {
                  val.rightLightSize = '无';
                }
              }
              if (val.leftLocal) {
                if (val.leftLocal == 0) {

                  val.leftLocal = '无';
                }
              }
              if (val.rightLocal) {
                if (val.rightLocal == 0) {

                  val.rightLocal = '无';
                }
              }
              if (val.leftLightSize) {
                if (val.leftLightSize < 0) {
                  val.leftLightSize = parseFloat(val.leftLightSize).toFixed(2);
                } else {
                  val.leftLightSize = '无';
                }
              }
            })
          this.setData({ orderDetail: res })
        } else {
          wx.showToast({
            title: '网络错误，请返回后重新连接',
            icon: 'none'
          })
        }

      })


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