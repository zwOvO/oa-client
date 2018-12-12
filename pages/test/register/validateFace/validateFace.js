const app = getApp()
const userApi = require('../../../../services/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  chooseImage() {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        const imageSrc = res.tempFilePaths[0]
        const openId = app.globalData.openid
        wx.showLoading({
          title: '上传中，请稍后...',
        })
        userApi.updateFace(openId, imageSrc).then((response) => {
          wx.hideLoading()
          const faceToken = JSON.parse(response.data).result;
          self.setData({
            imageSrc,
            faceToken
          })
          wx.showToast({
            title: '注册成功！',
            duration: 2000
          })
          setTimeout(
            () => wx.switchTab({
              url: '../../test',
            }),2000
          )
        }).catch((response) => {
          wx.hideLoading()
          wx.showToast({
            title: '认证失败,请重新上传照片',
            icon: 'none',
            duration: 2000
          })
          console.log('失败：' + response);
        });
        wx.hideLoading();


      },

      fail({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },


})