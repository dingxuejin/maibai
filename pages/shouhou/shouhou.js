// pages/shouhou/shouhou.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:http.baseUrl,
    index: 1,
    size: 1000,
    orderList:{
      list:[],
      hasNextPage:true
    }
  },
  tuikuan() {
    wx.showToast({
      icon: 'none',
      title: '请下载APP进行操作',
      duration: 5000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '退货/售后',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let token = wx.getStorageSync('token');
    let index = this.data.index;
    let size = this.data.size;
    let orderList = this.data.orderList;
    if (orderList.hasNextPage)
      http.post('getServiceOrderList', { token, index, size })
        .then(res => {
          let orderList = res.data;

          if (orderList.list)
            orderList.list.map(val => {
              if (val.productList)
                val.productList.map(val => {
                  if (val.eyeDistance) {
                    if (val.eyeDistance <= 0) {
                      val.eyeDistance = '无'
                    }
                  }
                  if (val.leftSize) {
                    if (val.leftSize > 0) {
                      val.leftSize = '+' + parseFloat(val.leftSize).toFixed(2);
                    } else if (val.leftSize == 0) {
                      val.leftSize = '平光0.00';
                    } else {
                      val.leftSize = parseFloat(val.leftSize).toFixed(2);
                    }
                  }
                  if (val.rightSize) {
                    if (val.rightSize > 0) {
                      val.rightSize = '+' + parseFloat(val.rightSize).toFixed(2);
                    } else if (val.rightSize == 0) {
                      val.rightSize = '平光0.00';
                    } else {
                      val.rightSize = parseFloat(val.rightSize).toFixed(2);
                    }
                  }
                  if (val.rightLightSize) {
                    if (val.rightLightSize < 0) {
                      val.rightLightSize = parseFloat(val.rightLightSize).toFixed(2);
                    } else {
                      val.rightLightSize = '无';
                    }
                  }
                  if (val.leftLocal) {
                    if (val.leftLocal == 0) {

                      val.leftLocal = '无';
                    }
                  }
                  if (val.rightLocal) {
                    if (val.rightLocal == 0) {

                      val.rightLocal = '无';
                    }
                  }
                  if (val.leftLightSize) {
                    if (val.leftLightSize < 0) {
                      val.leftLightSize = parseFloat(val.leftLightSize).toFixed(2);
                    } else {
                      val.leftLightSize = '无';
                    }
                  }
                })


            })


          this.setData({ orderList })
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