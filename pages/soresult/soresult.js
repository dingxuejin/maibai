// pages/soresult/soresult.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    baseUrl: http.baseUrl,
    scrollTop:0,
    tarbar: ['综合', '销量', '人气', '价格'],
    sortType: 0,
    active: 0,
    searchKey: '',
    index: 1,
    searchResult:
    {
      hasNextPage: true,
      list: []
    }

  },
  toDetail(e){
    let searchResult = this.data.searchResult;
    let index=e.currentTarget.dataset.index;
    let id=searchResult.list[index].id;
    wx.navigateTo({
      url: '../detail/detail?id='+id+'&status=1',
    })

  },
  bindClick(e) {
    let active = e.currentTarget.dataset.active;
    let oldActive = this.data.active;
    if (oldActive == active) {
      if (active == 3) {
        let sortType = this.data.sortType;
        if (sortType == 3) {
          this.setData({ sortType: 31 })
          setTimeout(() => {
            this.getSearchResult(1);
          }, 200)
        } else {
          this.setData({ sortType: 3 })
          setTimeout(() => {
            this.getSearchResult(1);
          }, 200)
        }
      }

    } else {
      if (active == 0) {
        this.setData({ sortType: 0, index: 1 })
        setTimeout(() => {
          this.getSearchResult(1);
        }, 200)
      } else if (active == 1) {
        this.setData({ sortType: 1, index: 1 })
        setTimeout(() => {
          this.getSearchResult(1);
        }, 200)
      } else if (active == 2) {
        this.setData({ sortType: 2, index: 1 })
        setTimeout(() => {
          this.getSearchResult(1);
        }, 200)

      } else if (active == 3) {
        this.setData({ sortType: 3, index: 1 })
        setTimeout(() => {
          this.getSearchResult(1);
        }, 200)

      }
    }

    this.setData({ active })

  },
  // 一键置顶
  toScrollTop() {
    this.setData({ scrollTop: 0 })
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
  scrollTolower() {
    let index = this.data.index
    this.getSearchResult(index);
  },
  getSearchResult(index) {

    let searchResult = this.data.searchResult;
    let searchKey = this.data.searchKey;
    let searchType = this.data.searchType;
    let sortType = this.data.sortType;
    if (searchResult.hasNextPage) {
      http.post('searchResult', { searchKey, searchType, sortType, index, size: 15 })
        .then(res => {
          if (index == 1) {
            searchResult = res.data;
            index++;
            this.setData({ searchResult, index });
          } else {
            let newSearchResult = res.data;
            searchResult.hasNextPage = newSearchResult.hasNextPage;
            searchResult.list = searchResult.list.concat(newSearchResult.list);
            index++;
            this.setData({ searchResult, index });
          }
        })
    }



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSearchResult(1);
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