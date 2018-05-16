// pages/detail/detail.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticketUrl:'',
    isPaizhao:true,
    baseUrl: http.baseUrl,
    status: 1,
    isDialog: false,
    guige: [],
    isShowZhiding: false,
    jingpianguige: {},
    jingkuangactive: 0,
    jingpianactive: 0,
    baseUrl: http.baseUrl,
    productDetail: {},
    scrollTop: 0
  },
  // 得到下单眼镜规格
  getGuige() {
    let guige = this.data.guige;
    let jingpianguige = this.data.jingpianguige;
    let jingkuangactive = this.data.jingkuangactive;
    let jingpianactive = this.data.jingpianactive;
    let productDetail = this.data.productDetail;
    let special = guige[jingkuangactive];
    let glass = special.glassList[jingpianactive];
    let ticketUrl = this.data.ticketUrl;
    let skuPrice;
    if (glass && glass.skuPrice) {
      skuPrice = glass.skuPrice
    } else {
      skuPrice = special.skuPrice
    }

    let productList = [
      {
        productId: productDetail.id,
        special,
        skuPrice,
        glass,
        myRule: {
          leftSize: jingpianguige.zuoyandushu[jingpianguige.zyds],
          rightSize: jingpianguige.youyandushu[jingpianguige.yyds],
          eyeDistance: jingpianguige.tongju[jingpianguige.tj],
          leftLightSize: jingpianguige.zuoyansanguang[jingpianguige.zysg],
          rightLightSize: jingpianguige.youyansanguang[jingpianguige.yysg],
          leftLocal: jingpianguige.zuoyanzhouwei[jingpianguige.zyzw],
          rightLocal: jingpianguige.youyanzhouwei[jingpianguige.yyzw],
          ticketUrl
        }
      }
    ]
    productList = JSON.stringify(productList);
    return productList;
  },
  // 下单支付
  xiadan() {
    let productList = this.getGuige();
    wx.navigateTo({
      url: '../queren/queren?productList=' + productList,
    })
  },
  // picker选择
  bindPickerChangeYyds: function (e) {
    let jingpianguige = this.data.jingpianguige;
    jingpianguige.yyds = e.detail.value;
    this.setData({
      jingpianguige
    })
  },
  bindPickerChangeYysg: function (e) {
    let jingpianguige = this.data.jingpianguige;
    jingpianguige.yysg = e.detail.value;
    this.setData({
      jingpianguige
    })
  },
  bindPickerChangeYyzw: function (e) {
    let jingpianguige = this.data.jingpianguige;
    jingpianguige.yyzw = e.detail.value;
    this.setData({
      jingpianguige
    })
  },
  bindPickerChangeZyds: function (e) {
    let jingpianguige = this.data.jingpianguige;
    jingpianguige.zyds = e.detail.value;
    this.setData({
      jingpianguige
    })
  },
  bindPickerChangeZysg: function (e) {
    let jingpianguige = this.data.jingpianguige;
    jingpianguige.zysg = e.detail.value;
    this.setData({
      jingpianguige
    })
  },
  bindPickerChangeZyzw: function (e) {
    let jingpianguige = this.data.jingpianguige;
    jingpianguige.zyzw = e.detail.value;
    this.setData({
      jingpianguige
    })
  },
  bindPickerChangeTj: function (e) {
    let jingpianguige = this.data.jingpianguige;
    jingpianguige.tj = e.detail.value;
    this.setData({
      jingpianguige
    })
  },

  // 规格选择效果
  xuanze(e) {
    let active = e.currentTarget.dataset;
    this.setData(active)
  },
  stopMaopao() {
    // 取消冒泡
  },
  // dialog关闭
  dialogClose() {
    this.setData({ isDialog: false })
  },
  // 购买
  toShop() {
    let that = this;
    let token = wx.getStorageSync('token')
    let id = this.data.productDetail.id;
    that.setData({ isDialog: true })
    http.post('specialList', { id, isCommonGlass: 1 })
      .then(res => {
        let guige = res.data;
        console.log(guige);
        that.setData({
          guige
        })
      })
  },
  // 领取
  toLingqu() {
    let that = this;
    let token = wx.getStorageSync('token')
    http.post('getUserInfo', { token })
      .then(res => {
        let myDeposit = parseFloat(res.data.myDeposit);
        // 押金值判断
        if (myDeposit >= 0) {
          let id = this.data.productDetail.id;
          that.setData({ isDialog: true })
          http.post('specialList', { id, isCommonGlass: 1 })
            .then(res => {
              let guige = res.data;
              console.log(guige);
              that.setData({
                guige
              })
            })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您还没缴纳押金，缴纳押金成为麦拜会员 即可免费领取一副眼镜',
            confirmText: '去交押金',
            confirmColor: '#f00',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
  },
  // 预览验光单
  previewImage(){
    let ticketUrl = this.data.ticketUrl;
    let baseUrl=http.baseUrl;
    let urls=[];
    urls.push(baseUrl + ticketUrl);
    wx.previewImage({
      urls
    })
  },
  // 上传验光单
  chooseImage() {
    let that=this;
    let baseUrl = http.baseUrl;
    let token=wx.getStorageSync('token');
    wx.chooseImage({
      success: function (res) {
        wx.uploadFile({
          url: baseUrl + 'intf/uploadFile',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {token},
          success: function (res) {
            let  ticketUrl=JSON.parse(res.data).data.url;
            that.setData({ isPaizhao: false, ticketUrl})
          }
        })
      }
    })
  },
  // 一键置顶
  toScrollTop() {
    this.setData({ scrollTop: 0 })
  },
  // 分享小程序
  toFengxiang() {

  },
  // 显示一键置顶
  getScrollTop(e) {
    let scrollTop = parseFloat(e.detail.scrollTop);
    if (scrollTop > 300) {
      this.setData({ isShowZhiding: true })
    } else {
      this.setData({ isShowZhiding: false })
    }

  },
  toDetail() {
    let id = this.data.productDetail.id;
    wx.navigateTo({
      url: '../prodetail/prodetail?' + 'weburl=' + http.baseUrl + 'm/product/' + id + '/description'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ status: parseInt(options.status) })
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    http.post('productDetail', options)
      .then((res) => {
        console.log(res);
        this.setData({
          productDetail: res.data
        })

      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 度数
    let jingpianguige = this.data.jingpianguige;
    let dushu = [];
    for (let i = -8; i <= 4; i = i + 0.25) {
      let newVal = {};
      newVal.val = i;
      let item = i.toFixed(2);

      if (item > 0) {
        item = "+" + item;
      }
      newVal.label = item;
      dushu.push(newVal)
    }
    jingpianguige.zuoyandushu = dushu;
    jingpianguige.zyds = 32;
    jingpianguige.youyandushu = dushu;
    jingpianguige.yyds = 32;
    // 瞳距
    let tongju = [{ val: 0, label: '无' }];
    for (let i = 52; i <= 74; i++) {
      let newVal = {};
      newVal.val = i
      newVal.label = i;
      tongju.push(newVal)
    }
    jingpianguige.tongju = tongju;
    jingpianguige.tj = 0;
    // 散光
    let sanguang = [{ val: 0, label: '无' }];
    for (let i = -2; i <= -0.25; i = i + 0.25) {

      let newVal = {};
      newVal.val = i
      let item = i.toFixed(2);
      newVal.label = item;
      sanguang.push(newVal)
    }
    jingpianguige.zuoyansanguang = sanguang;
    jingpianguige.zysg = 0;
    jingpianguige.youyansanguang = sanguang;
    jingpianguige.yysg = 0;

    // 轴位
    let zhouwei = [];
    for (let i = 0; i <= 180; i++) {
      let newVal = {};
      newVal.val = i;
      let item = i;
      if (item <= 0) {
        item = '无';
      }
      newVal.label = item;
      zhouwei.push(newVal)
    }
    jingpianguige.zuoyanzhouwei = zhouwei;
    jingpianguige.zyzw = 0;
    jingpianguige.youyanzhouwei = zhouwei;
    jingpianguige.yyzw = 0;
    this.setData({ jingpianguige })


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