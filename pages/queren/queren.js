// pages/queren/queren.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: http.baseUrl,
    myAddressList: []
  },
  addAddress(){
    let productList = this.data.productList;
    productList = JSON.stringify(productList);
    wx.navigateTo({
      url: '../xzdz/xzdz?isBlack=1&&productList=' + productList,
    })
  },
  toZhifuType() {
    wx.navigateTo({
      url: '../zhifutype/zhifutype',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let productList = options.productList;
    productList = JSON.parse(productList);
    console.log(productList)
    this.setData({ productList });
    wx.setNavigationBarTitle({
      title: '确认订单',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let token = wx.getStorageSync('token');
    http.post('getMyAddressList', {
      token,
      index: 1,
      size: 20,
    }).then(res => {
      if (res.data&&res.data.length>0){
        let myAddressList = res.data;
        this.setData({ myAddressList })
      }else{
        let myAddressList = [];
        this.setData({ myAddressList })
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