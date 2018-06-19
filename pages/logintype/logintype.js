// pages/logintype/logintype.js
import http from '../../utils/http.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isGetUserInfo: false,
    gender: '',
    avatarUrl: ''
  },
  // 前往用户手册
  toxieyi() {
    wx.navigateTo({
      url: `../xieyi/xieyi?show=1`,
    })
  },
  // 获得用户信息授权
  getuserinfo(res) {
    let avatarUrl = res.detail.userInfo.avatarUrl;
    let nickName = res.detail.userInfo.nickName;
    let gender = res.detail.userInfo.gender;
    this.setData({
      isGetUserInfo: true,
      gender,
      nickName,
      avatarUrl

    })
  },
  // 前往手机号登陆
  toPhoneLogin() {
    let nickName = this.data.nickName;
    let avatarUrl = this.data.avatarUrl;

    wx.navigateTo({
      url: '../login/login?nickName=' + nickName + '&avatarUrl' + avatarUrl,
    })
  },
  // 获得用户手机号登陆
  phonenumber(res) {
    let that = this;
    wx.login({
      success: function (res1) {
        let js_code = res1.code;
        http.post('wxLoginForMiniPrograms', { js_code })
          .then(res2 => {
            console.log(res2);
            if (res2.status == 0) {
              let newData = {};
              newData.openid = res2.data.openid;
              newData.session_key = res2.data.session_key;
              newData.encryptedData = res.detail.encryptedData;
              newData.iv = res.detail.iv;
              newData.headImgUrl = that.data.avatarUrl
              newData.nickName = that.data.nickName
              newData.gender = that.data.gender
              newData.userPhone = '';
              console.log(newData);
              http.post('thirdUserlogin', newData)
                .then(res => {
                  console.log(res);
                  if (res.status === 0) {
                    wx.setStorage({
                      key: 'token',
                      data: res.data.token,
                    })
                    wx.reLaunch({
                      url: '../mianfei/mianfei',
                    })
                  } else {
                    wx.showToast({
                      title: '网络错误',
                      icon: 'none'
                    })
                  }
                })
            } else {
              wx.showToast({
                title: res2.message,
                icon: 'none'
              })
            }
          })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token');
    if (token) {
      wx.reLaunch({
        url: '../mianfei/mianfei',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    wx.getSetting({
      success: function (res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，
          wx.getUserInfo({
            success: function (res) {
              let avatarUrl = res.userInfo.avatarUrl;
              let gender = res.userInfo.gender;
              let nickName = res.userInfo.nickName;
              that.setData({
                isGetUserInfo: true,
                gender,
                nickName,
                avatarUrl
              })
            }
          })

        }
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