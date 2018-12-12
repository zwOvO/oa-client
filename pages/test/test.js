//index.js
//获取应用实例
const app = getApp()
const userApi = require('../../services/user.js')

Page({
  data: {
    userInfo: {},
  },
  onLoad: function () {
    console.log(app.globalData.hasLogin)
    if (!app.globalData.hasLogin) {
      wx.redirectTo({
        url: 'auth/auth',
      })
    }
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    console.log()
  },

  scanningCode: function (event) {
    // 登录
    wx.showLoading({
      title: '识别中...',
    })
    wx.scanCode({
      success: (res) => {
        wx.hideLoading()
        console.log(res)
        let uuid = res.result
        wx.navigateTo({ url: `login/login?uuid=${uuid}` })
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          "title": "未找到二维码！",
          "icon": "none",
          "duration": 1000
        });
        console.log(res)
      },
      complete: (res) => {
        console.log(res)
      }
    })
  },
})
