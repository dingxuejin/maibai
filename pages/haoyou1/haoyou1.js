// pages/haoyou1/haoyou1.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteFriendUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    this.setData({ token })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let token = this.data.token;
    http.post('getShareInfo', { token })
      .then(res => {
        console.log(res);
        let inviteFriendUrl = 'https://' + res.data.inviteFriendUrl;
        this.setData({ inviteFriendUrl })
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