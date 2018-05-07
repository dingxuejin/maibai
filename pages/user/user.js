// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
getUserLogin(){
  console.log(22)
  wx.request({
    url: 'http://app.myobye.com/intf/userlogin',
    method:'post',
    data:{
      'version': '3.0',
      'platform': 2,
      'timestamp': '10232092230',
      'method': 'userlogin',
      'data':{
        userPhone: '12345645445',
        checkCode: '123456'
      }
  
    },
    success(res){
      console.log(res)
    },
    fail(err){
      console.log(err)
    }


  })
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