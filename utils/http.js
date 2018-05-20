
let http={};
// 接口时间戳
let getTime = new Date().getTime();
// 接口域名
http.baseUrl = 'http://39.108.76.65:8080/';
// 客服电话
http.phoneNumber = '4006701808';
// 充值说明Url
http.chongzhiUrl ='http://h5.myobye.com:8088/index.html#index?question=3';
// 用户手册Url
http.userUrl ='http://h5.myobye.com:8088/index.html#index?question=12';
http.post = function (method, data = null) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: this.baseUrl + 'intf/' + method,
      method: 'post',
      data: {
        'version': '3.0',
        'platform': 2,
        'timestamp': getTime,
        'method': method,
        'data': data
      },
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}
export default http;