// pages/login/login.js
const app = getApp()
const ServerApi = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid:"",
    code:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      code: options.code,
      uuid: options.uuid,
    });
  },

  formSubmit: function(e){
    wx.showLoading({
      title: '授权中...',
    })
    wx.request({
      url: ServerApi.miniprogramLogin,
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        wx.showToast({ 
          "title": "授权成功！", 
          "icon": "success", 
          "duration": 1000
        });
        console.log(res)
        setTimeout(function () {
          wx.navigateBack({})
        }, 1000) //延迟时间 这里是1秒
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          "title": "授权失败！",
          "icon": "none",
          "duration": 1000
        });
        console.log(res)
        setTimeout(function () {
          wx.navigateBack({})
        }, 1000) //延迟时间 这里是1秒
      },
      complete: (res) => {
        console.log(res)
      }
    })
    console.log(e.detail.value.uuid)
  },

  onCancel: function(){
    wx.navigateBack({})
  },
})