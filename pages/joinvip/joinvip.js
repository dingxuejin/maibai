// pages/joinvip/joinvip.js
import http from '../../utils/http.js'
var MD5Util = require('../../utils/MD5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yajin: http.yajin
  },
  joinVip() {
    let token = wx.getStorageSync('token');
    let payMethod = 1;
    let fee = this.data.yajin;
    http.post('addBalanceOfMiniPrograms', { token, payMethod, 'type': 2, fee })
      .then(res => {
        let playInfo = res.data;
        let timeStamp = playInfo.timestamp;
        let orderNumber = playInfo.orderNumber;
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
            // console.log(err)
          }
        })
      })
  },
  yajinToYue() {
    let token = wx.getStorageSync('token')
    wx.showModal({
      title: '操作提示',
      content: '将押金充值为余额之后，无法在将余额转回押金，余额不能提现，余额可购买小程序内任意产品',
      success: function (res) {
        if (res.confirm == true) {
          http.post('depositToBalance', { token })
            .then(res => {
              if (res.status == 0) {
                wx.showToast({
                  title: '操作成功',
                  success: function () {
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '../qianbao/qiaobao',
                      })
                    }, 2000)
                  }
                })
              } else {
                wx.showToast({
                  title: '网络错误',
                  icon: 'none'
                })
              }
            })
        }
      }
    })
  },
  tuiyajin() {
    let token = wx.getStorageSync('token')
    wx.showModal({
      title: '操作提示',
      // content: '请下载麦拜眼镜APP进行退押金操作',
      content: '是否确认退押金',
      success: function (res) {
        if (res.confirm == true) {
          http.post('returnMoneyForMiniPrograms', { token, cause: 1 })
            .then(res => {
              if (res.status == 0) {
                wx.showToast({
                  title: '操作成功',
                  success: function () {
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '../qianbao/qiaobao',
                      })
                    }, 2000)
                  }
                })
              } else {
                wx.showToast({
                  title: res.message,
                  icon: 'none'
                })
              }
            })
        }
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