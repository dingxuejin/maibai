// pages/yjsq/yjsq.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 申请免押金
  formSubmit(res) {
    let token = wx.getStorageSync('token');
    let params = res.detail.value;
    params.token = token;
    params.gender=parseInt(params.gender)
    console.log(params);
    http.post('applyFreeDeposit',params)
    .then(res=>{
      console.log(res);
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