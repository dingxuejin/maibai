// pages/bjdz/bjdz.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    multiOrignArray: [['省'], ['市'], ['区']],
    multiArray: [['省'], ['市'], ['区']],
    multiIndex: [-1, -1, -1]
  },
  // 新增地址
  addMyAddressList(e) {
    let that = this;
    let value = e.detail.value;
    console.log(value);
    if (value.address[0] === -1) {
      wx.showToast({
        icon: 'none',
        title: '省份必须',
        duration: 2000
      })
    } else if (value.address[1] === -1) {
      wx.showToast({
        icon: 'none',
        title: '城市必须',
        duration: 2000
      })
    } else if (value.address[2] === -1) {
      wx.showToast({
        icon: 'none',
        title: '县区必须',
        duration: 2000
      })
    } else if (value.addressDetail === '') {
      wx.showToast({
        icon: 'none',
        title: '请您输入详细地址',
        duration: 2000
      })
    } else if (value.user === '') {
      wx.showToast({
        icon: 'none',
        title: '请您输入姓名',
        duration: 2000
      })
    } else if (value.iphone === '') {
      wx.showToast({
        icon: 'none',
        title: '请您输入手机号',
        duration: 2000
      })
    } else {
      let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      let test = reg.test(value.iphone);
      console.log(test);
      if (test) {
        let multiOrignArray = this.data.multiOrignArray
        console.log(multiOrignArray);
        let address = value.address;
        let token = this.data.token;
        let name = value.user;
        let phone = value.iphone;
        let detailAddress = value.addressDetail;
        let isDefault = 0;
        let provinceId = multiOrignArray[0][address[0]].provinceId;
        let cityId = multiOrignArray[1][address[1]].addressId;
        let regionId = multiOrignArray[2][address[2]].addressId;
        if (value.moren === '1') {
          isDefault = 1;
        }
        http.post('addMyAddressList', {
          token,
          name,
          phone,
          provinceId,
          cityId,
          regionId,
          detailAddress,
          isDefault
        }).then(res => {
          if (res.status === 0) {
            wx.showToast({
              title: '添加成功',
              duration: 2000,
              success: function () {
                let productList = that.data.productList;
                if (that.data.isBlack === '1') {
                  wx.redirectTo({
                    url: '../queren/queren?productList=' + productList,
                  })

                } else {
                  wx.redirectTo({
                    url: '../dizhi/dizhi',
                  })
                }

              }
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.message,
              duration: 2000
            })
          };
        })

      } else {
        wx.showToast({
          icon: 'none',
          title: '手机号码不正确',
          duration: 2000
        })
      }
    }
  },
  // 滚动列表时数据变化
  bindMultiPickerColumnChange(e) {
    let column = e.detail.column;
    let value = e.detail.value;
    let token = wx.getStorageSync('token');
    let multiArray = this.data.multiArray;
    let multiOrignArray = this.data.multiOrignArray;
    if (column === 0) {
      let masterId = multiOrignArray[0][value].provinceId;
      http.post('getCityList', { token, masterId })
        .then((res) => {
          multiOrignArray[1] = res.data;
          if (multiOrignArray[1] && multiOrignArray[1].length > 0)
            multiArray[1] = multiOrignArray[1].map(val => {
              return val.addressName;
            })
          return new Promise((resolve, reject) => {
            this.setData({ multiOrignArray, multiArray })
            resolve(multiOrignArray);
          }).then(res => {
            let masterId = res[1][0].addressId;
            http.post('getCityList', { token, masterId })
              .then((res) => {
                if (res.data) {
                  multiOrignArray[2] = res.data;
                  multiArray[2] = multiOrignArray[2].map(val => {
                    return val.addressName;
                  })
                  this.setData({ multiOrignArray, multiArray })
                } else {
                  multiOrignArray[2] = [];
                  multiArray[2] = [];
                  this.setData({ multiOrignArray, multiArray })
                }
              })
          })
        })
    } else if (column === 1) {
      let masterId = multiOrignArray[1][value].addressId;
      http.post('getCityList', { token, masterId })
        .then((res) => {
          if (res.data) {
            multiOrignArray[2] = res.data;
            multiArray[2] = multiOrignArray[2].map(val => {
              return val.addressName;
            })
            this.setData({ multiOrignArray, multiArray })
          } else {
            multiOrignArray[2] = [];
            multiArray[2] = [];
            this.setData({ multiOrignArray, multiArray })
          }
        })
    }


  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  // 获得最初省市级信息
  getMultiOrignArray() {
    let token = wx.getStorageSync('token');
    let multiArray = this.data.multiArray;
    let multiOrignArray = this.data.multiOrignArray;
    http.post('getProvinceList', { token })
      .then((res) => {
        multiOrignArray[0] = res.data;
        if (multiOrignArray[0] && multiOrignArray[0].length > 0)
          multiArray[0] = multiOrignArray[0].map(val => {
            return val.provinceName;
          })
        return new Promise((resolve, reject) => {
          this.setData({ multiOrignArray, multiArray })
          resolve(multiOrignArray);
        })
      }).then((res) => {
        let masterId = res[0][0].provinceId;
        http.post('getCityList', { token, masterId })
          .then((res) => {
            multiOrignArray[1] = res.data;
            if (multiOrignArray[1] && multiOrignArray[1].length > 0)
              multiArray[1] = multiOrignArray[1].map(val => {
                return val.addressName;
              })
            return new Promise((resolve, reject) => {
              this.setData({ multiOrignArray, multiArray })
              resolve(multiOrignArray);
            }).then(res => {
              let masterId = res[1][0].addressId;
              http.post('getCityList', { token, masterId })
                .then((res) => {
                  if (res.data) {
                    multiOrignArray[2] = res.data;
                    multiArray[2] = multiOrignArray[2].map(val => {
                      return val.addressName;
                    })
                    this.setData({ multiOrignArray, multiArray })
                  } else {
                    multiOrignArray[2] = [];
                    multiArray[2] = [];
                    this.setData({ multiOrignArray, multiArray })
                  }
                })
            })
          })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    this.setData({
      token,
      isBlack: options.isBlack,
      productList: options.productList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getMultiOrignArray();
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