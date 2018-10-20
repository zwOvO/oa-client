//index.js
//获取应用实例
const app = getApp()
const ServerApi = require('../../utils/api.js')

Page({
  data: {
    motto: 'OA客户端',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: {},
  },
  onLoad: function () {
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },

  scanningCode: function (event) {
    // 登录
    wx.login({
      success: res => {
        let code = res.code
        console.log(res)
        wx.showLoading({
          title: '识别中...',
        })
        wx.scanCode({
          success: (res) => {
            wx.hideLoading()
            console.log(res)
            let uuid = res.result
            wx.navigateTo({url: `../login/login?code=${code}&uuid=${uuid}`})
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
      }
    })
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
    this.setData({
      inputvalue: ""
    })
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
    var that = this;
    var parm = {
      "type": that.data.type,
      "value": that.data.inputvalue
    };
    that.setData({
      inputvalue: ""
    })
    wx.navigateTo({
      url: '../info/info?parm=' + JSON.stringify(parm)
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false,
      showModalWithPicker: false,
    });
  },
  getUserInfo(e) {
    this.setData({
      hasUserInfo: true,
      userInfo: e.detail.userInfo,
    })
    app.globalData.hasUserInfo = true
    app.globalData.userInfo =  e.detail.userInfo
    console.log(app.globalData.userInfo)
  }
})
