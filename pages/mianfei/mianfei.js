// pages/jingxuan/jingxuan.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: http.baseUrl,
    tabs: ["会员免费", "光学眼镜", "太阳眼镜"],
    bannerList: [],
    freeList:[],
    activeIndex: 0,
    sliderOffset: 0,
  },
  // 获取商品列表
  getProductList:function(){
    http.post('productList', { type: 0, sortType: 0, index: 1, size: 15 })
    .then(res=>{
      console.log(res)
    })

  },
  // navbar的点击样式
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    http.post('viewList', {
      "type": 4,
      "token": wx.getStorageSync("token")
    }).then((res) => {
      that.setData({
        bannerList: res.data.list
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    http.post('freeGiveList')
    .then(res=>{
      let freeList= res.data.freeList;
      console.log(freeList)
      that.setData({
        freeList
      })
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
    this.getProductList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})