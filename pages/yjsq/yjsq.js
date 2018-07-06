// pages/yjsq/yjsq.js
import http from '../../utils/http.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  // 申请免押金
  formSubmit(res) {
    let token = wx.getStorageSync('token');
    let params = res.detail.value;

    params.token = token;
    params.gender = parseInt(params.gender)
  
    if (params.cardId && params.orgName && params.phone && params.realName) {
      // 身份证正则
      let cardIdReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      // 真实姓名正则
      let realNameReg = /^[\u4e00-\u9fa5]{2,4}$/
      // 手机号正则
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (realNameReg.test(params.realName)) {

        if (phoneReg.test(params.phone)) {

          if (cardIdReg.test(params.cardId)) {
            http.post('applyFreeDeposit', params)
              .then(res => {
                if (res.status === 0) {
                  wx.showToast({
                    title: '申请成功',
                    success: function () {
                      wx.redirectTo({
                        url: '../myjtg/myjtg',
                      })
                    }
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
              title: '身份证号不正确',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: '手机号不正确',
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: '必须是真实姓名',
          icon: 'none'
        })
      }




    } else {
      wx.showToast({
        title: '所有项必填',
        icon: 'none'
      })
    }


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