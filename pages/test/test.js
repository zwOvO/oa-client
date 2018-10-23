//index.js
//获取应用实例
const app = getApp()
const userApi = require('../../services/user.js')

Page({
  data: {
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

  bindGetUserInfo: function (e) {
	  const vm = this;
    wx.showLoading({
      title: '授权中...',
      mask: true,
    });
    wx.login({
      success(data) {
        new Promise((resolve, reject) => {
          userApi.login(data.code, e.detail.userInfo).then((response) => {
            wx.hideLoading();
            wx.showToast({
              title: '授权成功',
              icon: 'none',
              duration: 1000
            })
            let data = response;
            console.log(data.userInfo)
            vm.setData({
              hasUserInfo: data.hasUserInfo,
              userInfo: data.userInfo,
            })
            console.log(app.globalData.openid)
            wx.showToast({
              title: '身份验证中...',
              icon: 'none',
              duration: 1000
            })
            console.log('check:' + app.globalData.openid)
            userApi.checkUserExist(app.globalData.openid).then((response) => {
              wx.hideLoading();
              console.log(response)
              if (response.status != 200) {
                wx.redirectTo({
                  url: 'register/register'
                })
              }
            }).catch((response) => {
              console.log(response)
              wx.hideLoading()
              wx.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 1000
              })
            });
          }).catch((response) => {
            wx.hideLoading()
            wx.showToast({
              title: '授权失败',
              icon: 'none',
              duration: 1000
            })
          });
        })
        
        
      },
      fail(err) {
        console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        wx.showToast({
          "title": "授权失败！",
          "icon": "none",
          "duration": 1000
        });
        wx.hideLoading()
      }
    })
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
})
