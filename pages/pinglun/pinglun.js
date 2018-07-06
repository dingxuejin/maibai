// pages/pinglun/pinglun.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: http.baseUrl,
    orderDetail: {},
    textVal: '',
    tempFilePaths: []
  },
  // 输入的内容
  inputVal(e) {
    let textVal = e.detail.value;
    this.setData({ textVal })
  },
  // 拍照上传
  chooseImage() {
    let that = this;
    wx.chooseImage({
      success: function (file) {
        let tempFilePaths = file.tempFilePaths;
        that.setData({ tempFilePaths })
      },
      fail: function (err) {
        // console.log(err)
      }
    })
  },
  // 提交
  tijiao() {
    let token = wx.getStorageSync('token');
    let orderId = this.data.orderId;
    let comment = this.data.textVal;
    let picturs = this.data.tempFilePaths;
    let productId = this.data.orderDetail.productList[0].productId;
    if (picturs.length > 0) {
      let promiseAll = picturs.map((val, i) => {
        let promise = new Promise((resolve, reject) => {
          wx.uploadFile({
            url: http.baseUrl + 'intf/uploadFile',
            filePath: picturs[i],
            formData: { token },
            name: 'file',
            success: function (res) {
              let data = res.data;
              data = JSON.parse(data).data;
              resolve(data.url)
            }
          })
        })
        return promise;
      })
      Promise.all(promiseAll)
        .then(val => {
          http.post('addComment', { token, orderId, comment, picturs:val, productId })
            .then(res => {
              if (res.status === 0) {
                wx.showToast({
                  title: '评论成功',
                  success: function () {
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '../wode/wode',
                      })
                    }, 2000)
                  }
                })
              } else {
                wx.showToast({
                  title: '评论失败',
                  icon: 'none'
                })
              }
            })
        })


    } else {
      http.post('addComment', { token, orderId, comment, picturs, productId })
        .then(res => {
          if (res.status === 0) {
            wx.showToast({
              title: '评论成功',
              success: function () {
                setTimeout(function () {
                  wx.reLaunch({
                    url: '../wode/wode',
                  })
                }, 2000)
              }
            })
          } else {
            wx.showToast({
              title: '评论失败',
              icon: 'none'
            })
          }
        })
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
    let orderId = this.data.orderId;
    let token = wx.getStorageSync('token')
    http.post('getOrderDetail', { token, orderId })
      .then(result => {
        let res = result.data;
        this.setData({ orderDetail: res })
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