// pages/info/info.js
const app = getApp()
const recordApi = require('../../../services/record.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: undefined,
    current: 0,
    size: 10,
    startTime: undefined,
    stopTime: undefined,
    openId: undefined,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      openId : app.globalData.openid,
      startTime: options.startTime + " 00:00:00",
      stopTime: options.stopTime + " 23:59:59",
      recordList:[]
    })
    wx.showLoading({
      title: '加载中',
    })
    recordApi.getRecordList(that.data.openId, that.data.current, that.data.size, that.data.startTime, that.data.stopTime)
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
    if (that.data.hasMore)
    {
      wx.showLoading({
        title: '加载中',
      })
      recordApi.getRecordList(that.data.openId, that.data.current, that.data.size, that.data.startTime, that.data.stopTime).then((response) => {
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
      }).catch((res) =>{
        console.log(res)
        wx.hideLoading();
        wx.showToast({
          title: '加载失败!',
          icon: "none",
          duration:2000
        })
      })
    }
  },
})