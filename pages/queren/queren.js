// pages/queren/queren.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: {},
    postFee: -1,
    feed: '',
    resultPrie: 999999,
    productPrice: 999999,
    dizhi: {},
    baseUrl: http.baseUrl

  },
  // 获取邮费
  getPostFee() {
    let that = this;
    let token = wx.getStorageSync('token')
    let productList = this.data.productList;
    let addressId = this.data.dizhi.id;
    if (addressId) {
      if (productList && productList.length > 0) {
        let productIds = productList.map(val => {
          return val.productId
        })
        productIds = productIds.join(',');
        console.log({ token, productIds, addressId });
        http.post('getPostFee', { token, productIds, addressId })
          .then(res => {
            let productList = that.data.productList;
            let postFee = res.data.fee;
            let productPrice = 0;
            postFee = parseFloat(postFee);
            productList.map(val => {
              let skuPrice = parseFloat(val.skuPrice);
              productPrice += skuPrice;
            })
            productPrice = productPrice.toFixed(2);
            postFee = postFee.toFixed(2);
            let resultPrie = parseFloat(productPrice) + parseFloat(postFee);
            resultPrie = resultPrie.toFixed(2);
            that.setData({ postFee, productPrice, resultPrie });
          })
      }
    } else {
      that.setData({ postFee: -1 });
    }


  },
  // 选择地址
  xzAddress() {
    let productList = this.data.productList;
    productList = JSON.stringify(productList);
    wx.navigateTo({
      url: '../dizhi/dizhi?isBlack=1&&productList=' + productList,
    })
  },
  // 添加地址
  addAddress() {
    let productList = this.data.productList;
    productList = JSON.stringify(productList);
    wx.navigateTo({
      url: '../xzdz/xzdz?isBlack=1&&productList=' + productList,
    })
  },
  // 留言
  changeFeed(e) {
    let value = e.detail.value;
    this.setData({ feed: value })
  },
  // 创建支付订单
  toZhifuType() {
    let productList = this.data.productList
    let productPrice = this.data.productPrice
    let resultPrie = this.data.resultPrie
    let dizhi = this.data.dizhi

    let token = wx.getStorageSync('token');
    let totalFee = this.data.productPrice;
    let addressId = dizhi.id;
    let postFee = this.data.postFee;
    let feed = this.data.feed;
    let productId = productList[0].productId;
    let skuId;
    if (productList[0].glass && productList[0].glass.skuId) {
      skuId = productList[0].glass.skuId;
    } else {
      skuId = productList[0].special.skuId;
    }
    let leftSize = productList[0].myRule.leftSize.val;
    let rightSize = productList[0].myRule.rightSize.val;
    let eyeDistance = productList[0].myRule.eyeDistance.val;
    let leftLightSize = productList[0].myRule.leftLightSize.val;
    let rightLightSize = productList[0].myRule.rightLightSize.val;
    let leftLocal = productList[0].myRule.leftLocal.val;
    let rightLocal = productList[0].myRule.rightLocal.val;
    let ticketUrl = productList[0].myRule.ticketUrl;

    let order = {
      token,
      totalFee,
      addressId,
      postFee,
      feed,
      productList: [
        {
          productId,
          skuId,
          'number': 1,
          myRule: {
            leftSize,
            rightSize,
            eyeDistance,
            leftLightSize,
            rightLightSize,
            leftLocal,
            rightLocal,
            ticketUrl
          }
        }
      ]
    }
    http.post('createOrder', order)
      .then(res => {
        if (res.status === 0) {
          let order = res.data;
          order = JSON.stringify(order);
          wx.navigateTo({
            url: '../zhifutype/zhifutype?resultPrie=' + resultPrie + '&&order=' + order,
          })
        } else {
          wx.showModal({
            title: '购买失败',
            content: res.message,
          })
        }


      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let productList = options.productList;
    productList = JSON.parse(productList);
    this.setData({ productList });
    wx.setNavigationBarTitle({
      title: '确认订单',
    })
    if (options.dizhi) {
      let dizhi = JSON.parse(options.dizhi);
      this.setData({ dizhi })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let token = wx.getStorageSync('token');
    let dizhi = this.data.dizhi;
    if (dizhi.phone) {
      this.getPostFee()
    } else {

      http.post('getMyAddressList', {
        token,
        index: 1,
        size: 20,
      }).then(res => {
        if (res.data && res.data.length > 0) {
          let myAddressList = res.data;
          let dizhi = myAddressList[0];
          this.setData({ dizhi })
        } else {
          let dizhi = {};
          this.setData({ dizhi })
        }

      }).then(() => {
        this.getPostFee()
      })
    }










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