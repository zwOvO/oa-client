const leaveApi = require('../../../services/leave.js')

// pages/leave/leave.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],
    current: 1,
    size: 10,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    leaveApi.getLeaveList(that.data.current, that.data.size)
      .then((response) => {
        console.log(response)
        wx.hideLoading();
        if (response.status == 200) {
          that.setData({
            recordList: that.data.recordList.concat(response.result),
            current: 1 + that.data.current
          })
        } else if (response.status == 404) {
          wx.showToast({
            title: '已加载到底!',
            icon: "none",
            duration: 2000
          })
          that.setData({
            hasMore: false
          })
        } else {
          wx.showToast({
            title: '加载失败!',
            icon: "none",
            duration: 2000
          })
        }
      }).catch((res) => {
        wx.hideLoading();
        wx.showToast({
          title: '加载失败!',
          icon: "none",
          duration: 2000
        })
      })
  },

  lower: function (e) {
    const that = this;
    if (that.data.hasMore) {
      wx.showLoading({
        title: '加载中',
      })
      leaveApi.getLeaveList(that.data.current, that.data.size).then((response) => {
        if (response.status == 200) {
          that.setData({
            recordList: that.data.recordList.concat(response.result),
            current: 1 + that.data.current
          })
          wx.hideLoading();
        } else if (response.status == 404) {
          wx.showToast({
            title: '已加载到底!',
            icon: "none",
            duration: 2000
          })
          that.setData({
            hasMore: false
          })
        } else {
          console.log(response)
          wx.hideLoading();
          wx.showToast({
            title: '加载失败!',
            icon: "none",
            duration: 2000
          })
        }
      }).catch((res) => {
        console.log(res)
        wx.hideLoading();
        wx.showToast({
          title: '加载失败!',
          icon: "none",
          duration: 2000
        })
      })
    }
  },

  leaveForm: function (event){
    console.log(event.target.dataset.id)
    wx.navigateTo({
      url: `leaveForm/leaveForm?id=${event.target.dataset.id}`,
    })
  }
})