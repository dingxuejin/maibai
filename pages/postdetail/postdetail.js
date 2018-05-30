// pages/postdetail/postdetail.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postDetail: [],
    status:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let token = wx.getStorageSync('token')
    let newParams = {};
    let logisticUrl = wx.getStorageSync('logisticUrl');
    let params = logisticUrl.split('?').slice(1)
    params = params[0].split('&');
    if (params && params.length > 0) {
      params.map(val => {
        let value = val.split('=');
        newParams[value[0]] = value[1]
      })
      console.log(newParams);
      http.post('getPostFlow', { token, post_num: newParams.postid, post_company_code: newParams.type })
        .then(res => {
          if (res.status == 0) {
            this.setData({ postDetail: res.data,status:0 })
          }else{
            this.setData({ status: 1 })
          }
        })
    } else {
      this.setData({ status: 1 })
    }
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