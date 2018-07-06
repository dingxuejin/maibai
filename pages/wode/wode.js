// pages/wode/wode.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerimage: '../../image/headerimage.png',
    nickname: 'Cody',
    freeState: '申请免押金'

  },
  // 前往登录页
  toLogin() {
    wx.showModal({
      title: '操作提示',
      content: '退出当前账号，可切换其他账号',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.redirectTo({
            url: '../logintype/logintype',
          })
        }
      }
    })
  },
  // 前往押金申请
  toYjsq() {
    // wx.showModal({
    //   title: '操作提示',
    //   content: '免押金功能即将开放',
    // })
    let token = wx.getStorageSync('token')
    http.post('getUserInfo', { token })
      .then(res => {
        let freeDepositStatus = res.data.freeDepositStatus
      
        if (freeDepositStatus == 0) {
          wx.navigateTo({
            url: '../yjsq/yjsq',
          })
        } else {
          wx.navigateTo({
            url: '../myjtg/myjtg',
          })
        }

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

    let that = this;
    let token = wx.getStorageSync('token')
    http.post('getUserInfo', { token })
      .then(res => {
      
        let freeDepositStatus = res.data.freeDepositStatus
        if (freeDepositStatus) {
          let freeState = '申请免押金'
          if (freeDepositStatus == 1) {
            freeState = '已申请免押金'
          }
          else if (freeDepositStatus == 2) {
            freeState = '申请不通过'
          }
          else if (freeDepositStatus == 3) {
            freeState = '申请待审核'
          }
          this.setData({ freeState })
        }
        // 获取用户头像
        if (res.data.headImage) {
          that.setData({
            headerimage: res.data.headImage
          })
        }
        // 获取用户昵称
        if (res.data.nickname) {
          that.setData({
            nickname: res.data.nickname
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