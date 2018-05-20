// pages/sousuo/sousuo.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: true,
    inputVal: "",
    hisSearch: [],
    hotSearch: []
  },
  hisToSearch(e){
    let searchKey = e.currentTarget.dataset.history;
      wx.navigateTo({
        url: '../soresult/soresult?searchKey=' + searchKey
      })
  },

  inputConfirm() {
    let searchKey = this.data.inputVal;
    let search = wx.getStorageSync('search')
    let hisSearch = this.data.hisSearch;
    hisSearch = hisSearch.filter(val => {
      return val != searchKey
    })
    hisSearch.unshift(searchKey)
    this.setData({ hisSearch })
    wx.setStorage({
      key: 'search',
      data: { value: hisSearch },
    })
    wx.navigateTo({
      url: '../soresult/soresult?searchKey=' + searchKey
    })


  },
  // 清除历史搜索
  clearStorage() {
    let that = this;
    wx.setStorage({
      key: 'search',
      data: { value: [] },
      success: function () {
        that.setData({ hisSearch: [] });
      }
    })
  },
  bindHotSearch(e) {
    let hotSearch = this.data.hotSearch;
    let index = e.currentTarget.dataset.index;
    let searchType = hotSearch[index].tagId;
    wx.navigateTo({
      url: '../soresult/soresult?searchType=' + searchType,
    })
  },
  hideInput: function () {
    this.setData({
      inputVal: ""
    });
    wx.navigateBack();
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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
    http.post('getHotSearch')
      .then(res => {
        let hotSearch = res.data;
        this.setData({ hotSearch })
      })
    wx.getStorage({
      key: 'search',
      success: function (res) {
        let hisSearch = res.data.value;
        that.setData({ hisSearch })
      },
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