// pages/myjtg/myjtg.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freeDepositStatus:0
  },
  
  toYajin(){
    wx.redirectTo({
      url: '../joinvip/joinvip?isvip=1',
    })
  },
  bindToMyj(){
    wx.redirectTo({
      url: '../yjsq/yjsq',
    })
  },
  bindClick(){
    wx.reLaunch({
      url: '../wode/wode',
    })
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
    http.post('getUserInfo', { token })
      .then(res => {
        let freeDepositStatus = res.data.freeDepositStatus
        this.setData({ freeDepositStatus})
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