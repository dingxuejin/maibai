// pages/pinglunall/pinglunall.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    baseUrl: http.baseUrl,
    tarbar: ['全部(0)', '有图(0)'],
    allPinglun: {
      hasNextPage: true,
      index: 1,
      size: 10,
      type: 0,
      pinglunList: []
    },
    hasTuPinglun: {
      hasNextPage: true,
      index: 1,
      size: 10,
      type: 1,
      pinglunList: []
    }
  },
  bindClick(e) {
    let active = e.currentTarget.dataset.active;
    if (active == 0) {
      this.getPinglun('allPinglun')
    } else if (active == 1) {
      this.getPinglun('hasTuPinglun')
    }
    this.setData({ active })
  },
  // 获得评论
  getPinglun(e) {
    let pinglun = this.data[e]
    let id = this.data.id;
    let index = pinglun.index;
    let size = pinglun.size;
    let type = pinglun.type;
    if (pinglun.hasNextPage)
      http.post('commentList', { id, index, size, type })
        .then(res => {
          if (res.status == 0) {
            index++
            pinglun.index = index;
            pinglun.hasNextPage = res.data.hasNextPage;
            pinglun.pinglunList = pinglun.pinglunList.concat(res.data.list);
            let newComment = {};
            let tarbar = [`全部(${res.data.commentCount})`, `有图(${res.data.imgCommentCount})`]
            newComment[e] = pinglun;
            newComment.tarbar = tarbar;
            this.setData(newComment)
          }

          console.log(res);
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPinglun('allPinglun')
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
    let active = this.data.active;
    if (active == 0) {
      this.getPinglun('allPinglun')
    } else if (active == 1) {
      this.getPinglun('hasTuPinglun')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})