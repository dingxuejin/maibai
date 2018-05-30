// pages/dingdan/dingdan.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: http.baseUrl,
    all: {
      index: 1,
      size: 10,
      list: []
    },
    daifahuo: {
      index: 1,
      size: 10,
      list: []
    },
    daifukuan: {
      index: 1,
      size: 10,
      list: []
    },
    daishouhuo: {
      index: 1,
      size: 10,
      list: []
    },
    daipinglun: {
      index: 1,
      size: 10,
      list: []
    },
    tabs: ["全部", "待付款", "待发货", "待收货", "待评论"],
    activeIndex: 0,
    sliderOffset: 0,
  },
  tabClick: function (e) {
    let activeIndex = e.currentTarget.id;
    let sliderOffset = 150 * activeIndex;
    this.setData({
      sliderOffset,
      activeIndex
    });
  },
  // 提醒发货
  tixing(){
    wx.showToast({
      title: '已提醒卖家发货',
    })
  },
  // 跳转到物流详情
  toPostDetail(e) {
    let logisticUrl = e.currentTarget.dataset.logisticurl;
    wx.setStorageSync('logisticUrl', logisticUrl)
    wx.navigateTo({
      url: '../postdetail/postdetail',
    })
  },
  // 跳转到售后
  toSouhou() {
    wx.navigateTo({
      url: '../shouhou/shouhou',
    })
  },
  // 跳转到评论
  toPinglun(e) {

    let orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../pinglun/pinglun?orderId=' + orderId,
    })
  },
  // 去支付
  toZhifu(e) {
    let orderData = e.currentTarget.dataset;
    let resultPrie = orderData.resultprie;
    let order = {
      orderId: orderData.orderid,
      orderNumber: orderData.ordernumber
    }
    order = JSON.stringify(order);
    wx.navigateTo({
      url: '../zhifutype/zhifutype?resultPrie=' + resultPrie + '&&order=' + order,
    })
  },

  getOrder() {
    let activeIndex = this.data.activeIndex;
    if (activeIndex == 0) {
      this.getOrderList(activeIndex, this.data.all, "all")
    } else if (activeIndex == 1) {
      this.getOrderList(activeIndex, this.data.daifukuan, "daifukuan")
    } else if (activeIndex == 2) {
      this.getOrderList(activeIndex, this.data.daifahuo, "daifahuo")
    } else if (activeIndex == 3) {
      this.getOrderList(activeIndex, this.data.daishouhuo, "daishouhuo")
    } else if (activeIndex == 4) {
      this.getOrderList(activeIndex, this.data.daipinglun, "daipinglun")
    }

  },
  getOrderList(status, order, str) {
    let token = wx.getStorageSync('token');
    let index = order.index;
    let size = order.size;
    http.post('getOrderList', { token, index, size, status })
      .then(res => {
        if (res.status === 0) {
          let data = res.data;
          let newOrder = {};
          order.index++;
          order.hasNextPage = data.hasNextPage;
          if (data.list)
            data.list.map(val => {
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

          order.list = order.list.concat(data.list);
          newOrder[str] = order;
          console.log(newOrder);
          this.setData(newOrder)
        }


      })

  },
  detelOrder(e) {
    let orderNumber = e.currentTarget.dataset.ordercode;
    let token = wx.getStorageSync('token');
    let activeIndex = this.data.activeIndex;
    http.post('deleteOrder', { token, orderNumber })
      .then(res => {
        if (res.status == 0) {
          wx.showToast({
            title: '删除成功',
            success: function () {
              wx.redirectTo({
                url: '../dingdan/dingdan?active=' + activeIndex,
              })
            }
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let activeIndex = options.active;
    let sliderOffset = 150 * activeIndex;
    this.setData({
      sliderOffset,
      activeIndex
    });
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
  },
  // 前往订单详情
  toDetail(e) {
    // data - logisticurl='{{logisticUrl}}'  data- status='2' data- orderid='{{orderId}}'

    let dataset = e.currentTarget.dataset;
    wx.setStorage({
      key: 'logisticUrl',
      data: dataset.logisticurl,
    })
    let params = {};
    params.orderid=dataset.orderid;
    params.status=dataset.status;
    params = JSON.stringify(params);
    wx.navigateTo({
      url: '../dingdandetail/dingdandetail?params=' + params,
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.getOrderList(0, this.data.all, "all")

    this.getOrderList(1, this.data.daifukuan, "daifukuan")

    this.getOrderList(2, this.data.daifahuo, "daifahuo")

    this.getOrderList(3, this.data.daishouhuo, "daishouhuo")

    this.getOrderList(4, this.data.daipinglun, "daipinglun")

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