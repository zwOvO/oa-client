// pages/auth/auth.js
const util = require('../../../utils/util.js');
const api = require('../../../utils/api.js');
const userApi = require('../../../services/user.js');
const app = require('../../../app.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
              wx.showToast({
                title: '授权成功',
                icon: 'none',
                duration: 1000
              })
              let data = response;
              wx.showToast({
                title: '身份验证中...',
                icon: 'none',
                duration: 1000
              })
              userApi.checkUserExist(data.openid).then((response) => {
                console.log(response)
                if (response.status == 200) {
                  wx.switchTab({
                    url: '../../test/test'
                  })
                }else{
                  wx.redirectTo({
                    url: '../register/register'
                  })
                }
              }).catch((response) => {
                console.log(response)
                wx.hideLoading()
                wx.showToast({
                  title: '服务器连接失败',
                  icon: 'none',
                  duration: 1000
                })
              });
            }).catch((response) => {
              console.log(response)
              wx.hideLoading()
              wx.showToast({
                title: '授权失败11',
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