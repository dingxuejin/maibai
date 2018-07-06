// pages/dizhi/dizhi.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBlack: 0,
    token: "",
    index: 1,
    size: 20,
    address: []
  },
  // 选择地址
  changeDizhi(e) {
    let dizhi = e.currentTarget.dataset.dizhi;
    let isBlack = this.data.isBlack;
    let productList = this.data.productList;
    if (isBlack === '1') {
      dizhi = JSON.stringify(dizhi);
      wx.redirectTo({
        url: '../queren/queren?dizhi=' + dizhi + '&&productList=' + productList,
      })
    }
    this.setData({ isBlack: 0 })
  },
  // 添加地址
  addAddress() {
    let isBlack = this.data.isBlack;
    if (isBlack === 0) {
      wx.redirectTo({
        url: '../xzdz/xzdz?isBlack=0',
      })
    }
  },
  // 设置收货地址为默认地址
  changeRadio(e) {
    let isBlack = this.data.isBlack;
    if (isBlack === 0) {
      let token = this.data.token;
      let id = e.detail.value;
      http.post('defaultMyAddress', { token, id })
        .then(res => {
          if (res.status === 0) {
            wx.showToast({
              title: '设置成功'

            })
          } else {
            wx.showToast({
              title: '设置失败',
              icon: 'none'
            })
          }
        })

    }

  },
  // 编辑地址
  bianji(e) {
    let isBlack = this.data.isBlack;
    if (isBlack === 0) {
      let address = JSON.stringify(e.currentTarget.dataset.address);
      wx.redirectTo({
        url: '../bjdz/bjdz?address=' + address,
      })
    }


  },
  // 删除地址
  shanchu(e) {
    let isBlack = this.data.isBlack;
    if (isBlack === 0) {
      let that = this;
      let token = this.data.token;
      let id = e.currentTarget.dataset.deleteid;
      wx.showModal({
        title: '删除操作',
        content: '你确定要删除此地址吗？',
        success: function (e) {
          if (e.confirm) {
            http.post('deleteMyAddress', { token, id })
              .then(res => {
                if (res.status === 0) {
                  wx.showToast({
                    title: '删除成功',
                  })
                  that.getMyAddressList();
                } else {
                  wx.showToast({
                    icon: 'none',
                    title: '删除失败',
                    duration: 3000
                  })
                }

              })
          }
        }
      })

    }

  },
  // 获取我的收货地址
  getMyAddressList() {
    let token = this.data.token;
    let index = this.data.index;
    let size = this.data.size;
    http.post('getMyAddressList', { token, index, size })
      .then(res => {
        let address = [];
        if (res.data && res.data.length > 0) {
          address = res.data;
        }
        this.setData({ address })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token')

    if (options.productList) {
      let isBlack = options.isBlack;
      let productList = options.productList;
      this.setData({ productList, isBlack });
    }
    this.setData({ token });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getMyAddressList();
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